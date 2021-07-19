using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CRMLeadObjects.Common
{
  public static class ExtensionMethods
  {
    /// <summary>
    /// This methods makes partitions of agiven size
    /// from a given IEnumerable
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="enumerable"></param>
    /// <param name="size"></param>
    /// <returns></returns>
    public static IEnumerable<T[]> ChunkBySize<T>(this IEnumerable<T> enumerable, int size)
    {
      if (enumerable == null)
        throw new ArgumentNullException("Enumerable should not be null");
      var current = enumerable.Take(size).ToArray();
      var following = enumerable.Skip(size);
      while (current.Length > 0)
      {
        yield return current;
        current = following.Take(size).ToArray();
        following = following.Skip(size);
      }
    }

    public static string getKeyPropsObject<T>(this T obj)
    {
      string key = string.Empty;
      var props = obj.GetType().GetProperties();

      foreach (var prop in props)
      {
        var value = prop.GetValue(obj);
        if (value != null)
        {
          key += value.ToString();

        }
      }

      return key;

    }


    public static DateTime ConvertDateToLocalTime(
                        this DateTime date,
                        string standardTime)
    {
      TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById(standardTime.Trim());
      return TimeZoneInfo.ConvertTimeFromUtc(date , timeZoneInfo);
    }


    public static string GetDescription<T>(this T enumValue)
        where T : struct, IConvertible
    {
      if (!typeof(T).IsEnum)
        return null;

      var description = enumValue.ToString();
      var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());

      if (fieldInfo != null)
      {
        var attrs = fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), true);
        if (attrs != null && attrs.Length > 0)
        {
          description = ((DescriptionAttribute)attrs[0]).Description;
        }
      }

      return description;
    }

  }
}
