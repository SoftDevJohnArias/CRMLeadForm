using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO
{
    public class SPQueryResult<T>
    {
        public int TotalResults { get; set; }
        public List<T> ListResults { get; set; }
    }
}
