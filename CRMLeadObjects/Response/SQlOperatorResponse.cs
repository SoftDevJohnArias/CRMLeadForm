using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IWSPortalObjects.Response
{
    public class SQlOperatorResponse
    {
        public int IdOperator { get; set; }
        public string OperatorValue { get; set; }
        public string OperatorText { get; set; }
        public char OperatorType { get; set; }
        public bool SearchId { get; set; }

        public bool ShouldQuote { get; set; }
    }
}
