using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraxServices.TraxModels
{
  public class ResponseAuth
  {
    public string cid { get; set; }

    public data data { get; set; }


  }

  public class User
  {
    public string user_id { get; set; }
  }

  public class data
  {
    public User user { get; set; }
    public session session { get; set; }
  }

  public class session
  {
    public string session_id { get; set; }
  }
}



