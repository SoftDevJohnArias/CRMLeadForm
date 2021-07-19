using DAL;
using CRMLeadObjects.DTO.IWSPortal.Email;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
  public class EmailBLL
  {

    private const string _USER = "User";
 


    public static void SendEmail(string emailTo, string templateHtml, int templateId, string tempalteName = "CatalogGenerate")
    {
      string Rpt = string.Empty;
      bool? success = false;
      string emailFrom = ConfigurationManager.AppSettings.Get("EmailFromIWSPortaIncomext");
      string emailBcc = ConfigurationManager.AppSettings.Get("DevelopmentMails");
      EmailDAL.CreateEmailQueue(null, tempalteName, false,
            "IWS", templateHtml, $"{_USER} {emailTo};", emailFrom, emailBcc,
            "code lead", templateId, ref Rpt, ref success);
    }

    public static void GetEmails()
    {
      var result = EmailDAL.GetEmailQueue();
      foreach (var item in result)
      {
        if (item.RequestBody != null)
        {
          string EmailsTo = item.EmailTo.Remove(item.EmailTo.Length - 1);
          string EmailsBcc = item.Bcc == null ? item.Bcc : item.Bcc.Remove(item.Bcc.Length - 1);
          bool ResultSend = false;
          ResultSend = SendEmail(EmailsTo, item.RequestBody, item.EmailFrom, EmailsBcc, item.EmailSubject, item.SmtpId);
          if (ResultSend)
          {
            // Hacemos la actualización del estado 
            var response = EmailDAL.UpdateEmailQueue(item.Id);
          }
        }
      }
    }
    public static bool SendEmail(string EmailsTo, string RequestBody, string Emailsfrom, string EmailsBcc, string EmailSubject, int SmtpId)
    {
      var credenciales = EmailDAL.GetSmtpCredentials(SmtpId).First();
      string SMTP_USERNAME = credenciales.SmtpUsername;
      string SMTP_PASSWORD = credenciales.SmtpPassword;
      string HOST = credenciales.SmtpHost;
      int PORT = credenciales.SmtpPort;

      MailMessage message = new MailMessage();
      message.IsBodyHtml = true;

      if (Emailsfrom != null)
      {
        string[] fromArray = Emailsfrom.Split(new[] { ";;" }, StringSplitOptions.None);
        message.From = new MailAddress(fromArray[1], fromArray[0]);
      }


      message.Subject = EmailSubject;

      SmtpClient client = new SmtpClient(HOST, PORT);

      client.Credentials = new NetworkCredential(SMTP_USERNAME, SMTP_PASSWORD);
      if (SMTP_USERNAME != null)
        client.EnableSsl = true;
      try
      {
        string[] lstEmailTo = EmailsTo.Split(';');
        foreach (var emailItem in lstEmailTo)
        {
          string[] item = emailItem.Split(' ');
          message.To.Add(new MailAddress(item[1], item[0]));
        }
        if (EmailsBcc != null)
        {
          string[] lstEmailBcc = EmailsBcc.Split(';');
          foreach (var emailItem in lstEmailBcc)
          {
            string[] item = emailItem.Split(' ');
            message.Bcc.Add(new MailAddress(item[1], item[0]));
          }
        }

        message.Body = RequestBody;
        client.Send(message);
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }


  }
}
