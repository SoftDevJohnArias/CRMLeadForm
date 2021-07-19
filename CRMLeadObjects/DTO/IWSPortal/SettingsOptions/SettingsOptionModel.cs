using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.IWSPortal.SettingsOptions
{
    public class SettingsOptionModel
    {
        public string Id { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Contexts { get; set; }
        public char DataType { get; set; }
        public char Status { get; set; }
        public string DefaultValue { get; set; }
        public string ValuesList { get; set; }
    }
}
