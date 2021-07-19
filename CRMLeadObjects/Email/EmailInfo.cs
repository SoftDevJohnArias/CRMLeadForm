using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.Email
{
    public class EmailInfo
    {
        public int Id { get; set; }
        public long RecordId { get; set; }
        public DateTime Created { get; set; }
        public string LanguageId { get; set; }
        public string CompanyId { get; set; }
        //public string _XlstName;
        //public System.Xml.Linq.XElement _XmlData;
        public string EmailTo { get; set; }
        public string EmailFrom { get; set; }
        public string EmailSubject { get; set; }
        public bool HasBeenSent { get; set; }
        public bool HasBeenSentStore { get; set; }
        public bool Scheduled { get; set; }
        public DateTime PivotDate { get; set; }
        public long IntervalSecs { get; set; }
        public DateTime LastSentDate { get; set; }
        public DateTime NextSendDate { get; set; }
        public string Cc { get; set; }
        public string Bcc { get; set; }
        public string ExceptionMessageToQueue { get; set; }
        public string ApplicationName { get; set; }
        public DateTime LastExtractionDate { get; set; }
        public string RequestBody { get; set; }
        public int SmtpId { get; set; }

    }
}
