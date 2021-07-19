using DAL;
using DAL.Processes;
using CRMLeadObjects.DTO;
using CRMLeadObjects.Request.Leads;
using CRMLeadObjects.Response.Leads;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using Resource = CRMLeadObjects.Resources.Lead;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;
using TraxServices.TraxProcess;
using System.Configuration;
using System.Net.Http.Headers;
using CRMLeadObjects.DTO.Leads;

namespace BLL
{
    public class MulesoftBLL
    {

        public IDictionary<string, Object> CreateParentLeadAtributes(RequestXUS requestXUS)
        {
            var dynamicParentLeadAtributes = new System.Dynamic.ExpandoObject() as IDictionary<string, Object>;
            dynamicParentLeadAtributes.Add("companyname", requestXUS.companyname);
            dynamicParentLeadAtributes.Add("ph_companyidentification", requestXUS.ph_companyidentification);
            dynamicParentLeadAtributes.Add("address1_name", requestXUS.address1_name);
            dynamicParentLeadAtributes.Add("country_id", requestXUS.country_id);
            dynamicParentLeadAtributes.Add("address1_postalcode", requestXUS.address1_postalcode);
            dynamicParentLeadAtributes.Add("emailaddress1", requestXUS.emailaddress1);
            dynamicParentLeadAtributes.Add("telephone1", requestXUS.telephone1);
            dynamicParentLeadAtributes.Add("ph_purchaseintention", requestXUS.ph_purchaseintention);
            dynamicParentLeadAtributes.Add("firstname", requestXUS.firstname);
            dynamicParentLeadAtributes.Add("mobilephone", requestXUS.mobilephone);
            dynamicParentLeadAtributes.Add("ownerid", requestXUS.ownerid);
            dynamicParentLeadAtributes.Add("lastname", requestXUS.lastname);
            dynamicParentLeadAtributes.Add("ph_voluntarydeclarationfundsource", requestXUS.ph_voluntarydeclarationfundsource);

            return dynamicParentLeadAtributes;

        }

        public IDictionary<string, Object> ParentLeadAtributes(ParentLeadAtributes parentLead_atributes, List<ChildLeadAttribute> lstChildLeadAttribute)
        {
            var dynamicParentLeadAtributes = new System.Dynamic.ExpandoObject() as IDictionary<string, Object>;
            List<Guid> listMarketsSegment = new List<Guid>();
            List<Guid> listaBusinessDivisions = new List<Guid>();
            List<Guid> listcontactypeGuid = new List<Guid>();

            if (string.IsNullOrEmpty(parentLead_atributes.ph_invoiceemail))
                parentLead_atributes.ph_invoiceemail = parentLead_atributes.emailaddress2;


            foreach (PropertyInfo propertyInfo in parentLead_atributes.GetType().GetProperties())
            {
                var name = propertyInfo.Name;
                var value = propertyInfo.GetValue(parentLead_atributes, null);
                if (value != null && name != null)
                {
                    if (!name.Contains("MarketsSegment") && !name.Contains("BusinessDivisions"))
                    {
                        //if (name.Contains("ph_politicalties")) {
                        //  if (value != null) {
                        //    dynamicParentLeadAtributes.Add(name, value);
                        //  }
                        //}
                        if (name.Contains("ph_companyidentification"))
                        {
                            string valueReplace = value.ToString();
                            value = valueReplace.Replace(".", "").Replace("-", "").Replace(" ", "").ToUpper();

                            dynamicParentLeadAtributes.Add(name, value);
                        }
                        else
                        {
                            if (name.Contains("geographic_level"))
                            {
                                if (Guid.Parse(value.ToString()) != Guid.Empty)
                                {
                                    dynamicParentLeadAtributes.Add(name, value);
                                }
                            }
                            else
                            {
                                dynamicParentLeadAtributes.Add(name, value);
                            }
                        }
                    }
                    else
                    {
                        if (name.Contains("MarketsSegment"))
                        {
                            listMarketsSegment.Add(Guid.Parse(value.ToString()));
                        }
                        if (name.Contains("BusinessDivisions"))
                        {
                            listaBusinessDivisions.Add(Guid.Parse(value.ToString()));
                        }
                    }
                }
            }


            //principal contact
            var contactAdministrator = lstChildLeadAttribute.Where(x => x.type == "representative").FirstOrDefault();
            dynamicParentLeadAtributes.Add("firstname", contactAdministrator.firstname);
            dynamicParentLeadAtributes.Add("lastname", contactAdministrator.lastname);
            dynamicParentLeadAtributes.Add("ph_identification", contactAdministrator.ph_identification.ToUpper());
            dynamicParentLeadAtributes.Add("emailaddress1", contactAdministrator.emailaddress1);
            dynamicParentLeadAtributes.Add("contact_document_type_id", contactAdministrator.contact_document_type_id);

            if (!string.IsNullOrEmpty(contactAdministrator.emailaddress3))
                dynamicParentLeadAtributes.Add("emailaddress3", contactAdministrator.emailaddress3);

            if (!string.IsNullOrEmpty(contactAdministrator.jobtitle))
                dynamicParentLeadAtributes.Add("jobtitle", contactAdministrator.jobtitle);

            if (!string.IsNullOrEmpty(contactAdministrator.middlename))
                dynamicParentLeadAtributes.Add("middlename", contactAdministrator.middlename);

            if (!string.IsNullOrEmpty(contactAdministrator.ph_secondlastname))
                dynamicParentLeadAtributes.Add("ph_secondlastname", contactAdministrator.ph_secondlastname);

            if (!string.IsNullOrEmpty(contactAdministrator.mobilephone))
                dynamicParentLeadAtributes.Add("mobilephone", contactAdministrator.mobilephone);

            dynamicParentLeadAtributes.Add("ph_adminweb", true);

            foreach (PropertyInfo propertyInfo in contactAdministrator.GetType().GetProperties())
            {
                var value = propertyInfo.GetValue(contactAdministrator, null);
                if ((propertyInfo.Name.Contains("SelectFeatures")) && (value != null))
                    listcontactypeGuid.Add(Guid.Parse(value.ToString()));
            }

            listcontactypeGuid.Add(Guid.Parse("8fdb1228-b21c-eb11-a813-000d3a33a5cc"));//guid representante legal
            dynamicParentLeadAtributes.Add("contactypeGuid", listcontactypeGuid.ConvertAll(new Converter<Guid, string>(x => x.ToString())).ToArray());

            //
            dynamicParentLeadAtributes.Add("marketsegmentsGuid", listMarketsSegment.ConvertAll(new Converter<Guid, string>(x => x.ToString())).ToArray());
            dynamicParentLeadAtributes.Add("businessdivisionsGuid", listaBusinessDivisions.ConvertAll(new Converter<Guid, string>(x => x.ToString())).ToArray());
            return dynamicParentLeadAtributes;
        }

        public List<dynamic> ChildLeadAttributes(List<ChildLeadAttribute> lstChildLeadAttribute)
        {
            //creamos un array de contactos , poenemos los contactypeGuid en un arreglo
            List<dynamic> listParentLeadAtributes = new List<dynamic>();
            //
            var dynamicParentLeadAtributes = new System.Dynamic.ExpandoObject() as IDictionary<string, Object>;
            lstChildLeadAttribute = lstChildLeadAttribute.Where(x => x.type != "representative").ToList();

            foreach (var Child in lstChildLeadAttribute)
            {// lstChildLeadAttribute
                List<Guid> listcontactypeGuid = new List<Guid>();
                dynamicParentLeadAtributes = new System.Dynamic.ExpandoObject() as IDictionary<string, Object>;

                foreach (PropertyInfo propertyInfo in Child.GetType().GetProperties())
                {
                    var name = propertyInfo.Name;
                    var value = propertyInfo.GetValue(Child, null);
                    if (value != null && name != null)
                    {
                        if (!name.Contains("SelectFeatures"))
                        {
                            dynamicParentLeadAtributes.Add(name, value);
                        }
                        else
                        {
                            if (name.Contains("SelectFeatures"))
                            {
                                listcontactypeGuid.Add(Guid.Parse(value.ToString()));
                            }
                        }
                    }
                }
                dynamicParentLeadAtributes.Add("contactypeGuid", listcontactypeGuid.ConvertAll(new Converter<Guid, string>(x => x.ToString())).ToArray());
                listParentLeadAtributes.Add(dynamicParentLeadAtributes);
            }

            return listParentLeadAtributes;

        }

        public List<dynamic> documents(List<Document> lstDocument)
        {
            //creamos un array de contactos , poenemos los contactypeGuid en un arreglo
            List<dynamic> listDocument = new List<dynamic>();

            var dynamicDocument = new System.Dynamic.ExpandoObject() as IDictionary<string, Object>;

            foreach (var document in lstDocument)
            {
                dynamicDocument = new System.Dynamic.ExpandoObject() as IDictionary<string, Object>;

                foreach (PropertyInfo propertyInfo in document.GetType().GetProperties())
                {
                    var name = propertyInfo.Name;
                    var value = propertyInfo.GetValue(document, null);
                    if (value != null && name != null)
                    {
                        if (name == "document")
                        {
                            byte[] bytesData = ObjectToByteArray(value);
                            string temp_inBase64 = Convert.ToBase64String(bytesData);
                            dynamicDocument.Add(name, "data:application/msword;base64," + temp_inBase64);
                        }
                        else
                        {
                            dynamicDocument.Add(name, value);
                        }
                    }
                }
                listDocument.Add(dynamicDocument);
            }
            return listDocument;
        }

        private byte[] ObjectToByteArray(object obj)
        {
            if (obj == null)
                return null;
            BinaryFormatter bf = new BinaryFormatter();
            using (MemoryStream ms = new MemoryStream())
            {
                bf.Serialize(ms, obj);
                return ms.ToArray();
            }
        }



    public StateResultSP CreateLead(RequestCreateLeads requestData)
    {
      var createLeadRequest = new System.Dynamic.ExpandoObject() as IDictionary<string, Object>;
      var requestLog = new System.Dynamic.ExpandoObject() as IDictionary<string, Object>;

            // creamos estrucutra de parentLead_atributes
            createLeadRequest.Add("parentLead_atributes", ParentLeadAtributes(requestData.parentLead_atributes, requestData.childLead_attributes));
            requestLog.Add("parentLead_atributes", ParentLeadAtributes(requestData.parentLead_atributes, requestData.childLead_attributes));

            // creamos estrucutra de childLead_attributes
            if (requestData.childLead_attributes.Count > 1)
            {
                createLeadRequest.Add("childLead_attributes", ChildLeadAttributes(requestData.childLead_attributes));
                requestLog.Add("childLead_attributes", ChildLeadAttributes(requestData.childLead_attributes));
            }
            // creamos estrucutra de documents
            createLeadRequest.Add("documents", documents(requestData.documents));

            ResponseMulesoft ResponseMulesoftobj = MulesoftProcessApi.CreateLead(createLeadRequest, requestData.parentLead_atributes.ownerid);
            StateResultSP stateResult = new StateResultSP();

            var jobject = new JObject();


            var jsonData = JsonConvert.SerializeObject(requestLog);
            if (ResponseMulesoftobj.response.StatusCode != System.Net.HttpStatusCode.OK)
            {

            }
            else
            {
                if (!String.IsNullOrEmpty(ResponseMulesoftobj.resultContent))
                {
                    jobject = JObject.Parse(ResponseMulesoftobj.resultContent);
                }
                else
                {
                    jobject = null;
                }

            }

            if (jobject["status"]?.ToString() == "success")
            {
                stateResult.Success = true;
            }
            else
            {
                stateResult.Success = false;
            }
            return stateResult;
        }

        public StateResultSP CreateLeadXUS(RequestXUS requestData)
        {
            StateResultSP stateResultSP = new StateResultSP();
            var createLeadRequest = new System.Dynamic.ExpandoObject() as IDictionary<string, Object>;
            createLeadRequest.Add("parentLead_atributes", CreateParentLeadAtributes(requestData));


            ResponseMulesoft ResponseMulesoftobj = MulesoftProcessApi.CreateLeadXUS(createLeadRequest, "XUS");
            var jobject = new JObject();
            jobject = JObject.Parse(ResponseMulesoftobj.resultContent);


            if (jobject["status"]?.ToString() == "success")
            {
                stateResultSP.Success = true;
            }
            else
            {
                stateResultSP.Success = false;
            }
            return stateResultSP;

        }

        public byte[] StringToBytes(String cadena)
        {
            System.Text.ASCIIEncoding codificador = new System.Text.ASCIIEncoding();
            return codificador.GetBytes(cadena);
        }

        
        public StateResultSP leadExistence(LeadExistence leadExistence)
        {
            StateResultSP stateResult = new StateResultSP();

            //var authValue = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.UTF8.GetBytes($"{user}:{password}")));
            var response = MulesoftProcessApi.leadExistence(leadExistence);

            var jObjectResponse = JObject.Parse(response);

            var status = jObjectResponse["status"].ToString();

            if (status == "success")
            {
                var responseLead = JsonConvert.DeserializeObject<LeadExistenceResponse>(response);
                string message = "";

                if (leadExistence.emailaddress1 != "" || leadExistence.emailaddress2 != "")
                {
                    message = MessageEmail(responseLead);
                }
                if (leadExistence.ph_companyidentification != "" || leadExistence.ph_identification != "")
                {
                    message = MessageDocument(responseLead);
                }

                stateResult.Message = message;
                stateResult.Success = true;
            }
            else
            {
                stateResult.Success = false;
            }

            return stateResult;
        }

        //public StateResultSPprueba leadExistence(LeadExistence leadExistence)
        //{
        //  StateResultSPprueba stateResult = new StateResultSPprueba();

        //  var response = MulesoftProcessApi.leadExistence(leadExistence);

        //  var jObjectResponse = JObject.Parse(response);

        //  var status = jObjectResponse["status"].ToString();

        //  if (status == "success")
        //  {
        //    var responseLead = JsonConvert.DeserializeObject<LeadExistenceResponse>(response);
        //    var responseMessage = "";

        //    if (leadExistence.emailaddress1 != "" || leadExistence.emailaddress2 != "")
        //    {
        //      responseMessage = MessageEmail(responseLead);
        //    }
        //    if (leadExistence.ph_companyidentification != "" || leadExistence.ph_identification != "")
        //    {
        //      responseMessage = MessageDocument(responseLead);
        //    }

        //    stateResult.Message = responseMessage;
        //    stateResult.Success = true;
        //    stateResult.Type = "contact";
        //  }
        //  else
        //  {
        //    stateResult.Success = false;
        //  }

        //  return stateResult;
        //}

        public static string MessageDocument(LeadExistenceResponse responseLead)
        {
            List<Datum> arrayData = new List<Datum>();
            string message = "";
            int cantEntity = responseLead.data.Count();

            foreach (var item in responseLead.data)
            {
                arrayData.Add(item);
            }

            switch (cantEntity)
            {
                case 1:
                    string entity = responseLead.data[0].message.ToString();
                    if (entity.Contains("Account") || entity.Contains("Contact"))
                    {
                        message = Resource.Lead.ResourceManager.GetString("DocumentExistenceContactAccount");
                    }
                    else if (entity.Contains("Lead"))
                    {
                        message = Resource.Lead.ResourceManager.GetString("DocumentExistenceLead");
                    }
                    break;
                case 2:
                    foreach (var item in arrayData)
                    {
                        string entityType = item.message;
                        if (entityType.Contains("Lead"))
                        {
                            message = Resource.Lead.ResourceManager.GetString("DocumentExistenceLead");
                        }
                        else if (entityType.Contains("Contact") || entityType.Contains("Account"))
                        {
                            message = Resource.Lead.ResourceManager.GetString("DocumentExistenceContactAccount");
                        }
                    }
                    break;
                case 3:
                    message = Resource.Lead.ResourceManager.GetString("DocumentExistenceContactAccount");
                    break;
                default:
                    break;
            }

            return message;
        }

        public static string MessageEmail(LeadExistenceResponse responseLead)
        {
            List<Datum> arrayData = new List<Datum>();
            string message = "";
            int cantEntity = responseLead.data.Count();

            foreach (var item in responseLead.data)
            {
                arrayData.Add(item);
            }

            switch (cantEntity)
            {
                case 1:
                    string entity = responseLead.data[0].message.ToString();
                    if (entity.Contains("Account") || entity.Contains("Contact"))
                    {
                        message = Resource.Lead.ResourceManager.GetString("EmailExistenceContactAccount");
                        message = message + "-Account";
                    }
                    else if (entity.Contains("Lead"))
                    {
                        message = Resource.Lead.ResourceManager.GetString("EmailExistenceLead");
                        message = message + "-Lead";
                    }
                    break;
                case 2:
                    foreach (var item in arrayData)
                    {
                        string entityType = item.message;
                        if (entityType.Contains("Lead"))
                        {
                            message = Resource.Lead.ResourceManager.GetString("EmailExistenceLead");
                            message = message + "-Lead";
                        }
                        else if (entityType.Contains("Contact") || entityType.Contains("Account"))
                        {
                            message = Resource.Lead.ResourceManager.GetString("EmailExistenceContactAccount");
                            message = message + "-Account";
                        }
                    }
                    break;
                case 3:
                    message = Resource.Lead.ResourceManager.GetString("EmailExistenceContactAccount");
                    message = message + "-Account";
                    break;
                default:
                    break;
            }

            return message;
        }
    }
}