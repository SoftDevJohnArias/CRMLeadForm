using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.Utils
{
    public abstract class ResultStoreProcedure<T>
    {
        public abstract int TotalResults { get; set; }
        public abstract List<T> ListResults { get; set; }
        public abstract bool Success { get; set; }
        public abstract string Message { get; set; }
    }
}
