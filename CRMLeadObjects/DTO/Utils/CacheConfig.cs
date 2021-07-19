using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.Utils
{
  public class CacheConfig<TItem>
  {

    private MemoryCache _cache = new MemoryCache(new MemoryCacheOptions());
    private ConcurrentDictionary<object, SemaphoreSlim> _locks = new ConcurrentDictionary<object, SemaphoreSlim>();

    public async Task<TItem> GetOrCreate(object key, Func<Task<TItem>> createItem)
    {
      TItem cacheEntry;

      if (!_cache.TryGetValue(key, out cacheEntry))// Look for cache key.
      {
        SemaphoreSlim mylock = _locks.GetOrAdd(key, k => new SemaphoreSlim(1, 1));

        await mylock.WaitAsync();
        try
        {
          if (!_cache.TryGetValue(key, out cacheEntry))
          {
            // Key not in cache, so get data.
            cacheEntry = await createItem();

            var cacheEntryOptions = new MemoryCacheEntryOptions()
              //Priority on removing when reaching size limit (memory pressure)
              .SetPriority(CacheItemPriority.High)
              // Keep in cache for this time, reset time if accessed.
              .SetSlidingExpiration(TimeSpan.FromSeconds(10))
              // Remove from cache after this time, regardless of sliding expiration
              .SetAbsoluteExpiration(TimeSpan.FromSeconds(60));
            _cache.Set(key, cacheEntry, cacheEntryOptions);
          }
        }
        finally
        {
          mylock.Release();
        }
      }
      return cacheEntry;
    }
  }
}
