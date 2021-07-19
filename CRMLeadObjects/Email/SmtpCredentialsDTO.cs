using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.Email
{
    public class SmtpCredentialsDTO
    {
        public string SmtpUsername { get; set; }
        public string SmtpPassword { get; set; }
        public string SmtpHost { get; set; }
        public int SmtpPort { get; set; }
        public string TemplateBody { get; set; }
    }
}
