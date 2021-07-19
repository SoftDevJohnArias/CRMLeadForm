using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IWSPortalObjects.Response
{
    public class FilterResponse
    {
        public List<ProductsFilterResponse> products;
        public int pageNumber { get; set; }
        public int total { get; set; }

        public int perPage { get; set; }

        public int totalPage { get; set; }


    }
}
