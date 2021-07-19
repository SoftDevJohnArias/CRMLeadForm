using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IWSPortalObjects.Response
{
    public class RulesResponse
    {
        public int RuleId { get; set; }
        public int? LeftBranch { get; set; }
        public int? RightBranch { get; set; }
        public string FieldName { get; set; }
        public string FieldValue { get; set; }
        public SQlOperatorResponse sqlOperatorResponse { get; set; }
    }
}
