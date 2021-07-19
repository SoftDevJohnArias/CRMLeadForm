using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.Leads
{
  public class RestCallLog
  {
    public string RestService { get; set; }
    public Guid? RelatedIwsCallId { get; set; }
    public string Host { get; set; } 

    public string ClientIp { get; set; }
    public string HttpMethod { get; set; }
    public string Request { get; set; }
    public string RequestHeaders { get; set; }
    public string RequestBody { get; set; }
    public bool? Success { get; set; }
    public string ResponseStatusCode { get; set; }
    public string Response { get; set; }
    public DateTime? StartTimeStamp { get; set; }
    public DateTime? EndTimeStamp { get; set; }
    public string ElapsedTime { get; set; }

    public string CompanyId { get; set; }

    public RestCallLog(string RestService_, Guid? RelatedIwsCallId_, string Host_, string ClientIp_, string HttpMethod_, string Request_, string RequestHeaders_, string RequestBody_, bool? Success_, string ResponseStatusCode_, string Response_, DateTime? StartTimeStamp_, DateTime? EndTimeStamp_, string ElapsedTime_, string CompanyId_)
    {
      this.RestService = RestService_;
      this.RelatedIwsCallId = RelatedIwsCallId_;
      this.Host = Host_;
      this.ClientIp = ClientIp_;
      this.HttpMethod = HttpMethod_;
      this.Request = Request_;
      this.RequestHeaders = RequestHeaders_;
      this.RequestBody = RequestBody_;
      this.Success = Success_;
      this.ResponseStatusCode = ResponseStatusCode_;
      this.Response = Response_;
      this.StartTimeStamp = StartTimeStamp_;
      this.EndTimeStamp = EndTimeStamp_;
      this.ElapsedTime = ElapsedTime_;
      this.CompanyId = CompanyId_;
    }

  }
}
