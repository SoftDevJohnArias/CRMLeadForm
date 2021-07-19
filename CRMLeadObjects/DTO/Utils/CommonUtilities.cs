using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.Utils
{
  public static class CommonUtilities
  {

    /// <summary>
    /// Get Descripcion Option enum
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="e"></param>
    /// <returns></returns>
    public static string GetDescription<T>(this T e) where T : IConvertible
    {
      if (e is Enum)
      {
        Type type = e.GetType();
        Array values = System.Enum.GetValues(type);

        foreach (int val in values)
        {
          if (val == e.ToInt32(CultureInfo.InvariantCulture))
          {
            var memInfo = type.GetMember(type.GetEnumName(val));
            var descriptionAttribute = memInfo[0]
                .GetCustomAttributes(typeof(DescriptionAttribute), false)
                .FirstOrDefault() as DescriptionAttribute;

            if (descriptionAttribute != null)
            {
              return descriptionAttribute.Description;
            }
          }
        }
      }

      return null;
    }


    public static string GetResourceValue<T>(this string resourceName) where T : class
    {
      var resourceManager = (ResourceManager)null;
      resourceManager = new ResourceManager(typeof(T));

      if (resourceName != null)
      {
        return resourceManager.GetString(resourceName, CultureInfo.CurrentCulture);
      }
      else
      {
        return "Resource not found";
      }
    }

  }
}
