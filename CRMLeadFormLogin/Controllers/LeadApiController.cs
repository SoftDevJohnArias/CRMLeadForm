using CRMLeadObjects.Request.Leads;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Runtime.Serialization.Json;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using WebGrease;
using Resource = CRMLeadObjects.Resources.Lead;
using Microsoft.AspNetCore.Http;
using System.Web.Caching;
using System.Data;
using CRMLeadObjects.Response.Leads;
using BLL;
using DAL.Processes;
using OfficeOpenXml;
using BLL.Leads;

namespace CRMLeadFormLogin.Controllers.Lead
{

    public class LeadApiController : ApiController
    {
        Cache cache = new Cache();

        string jsonFilePath = $"{HttpRuntime.AppDomainAppPath}Muckps/LeadForm/LevelConfiguration.json";
        List<GeographyLevel> ListGeographyLevel = new List<GeographyLevel>();


        string jsonFilePathCreateJson = $"{HttpRuntime.AppDomainAppPath}Muckps/LeadForm/LevelConfigurationCreateJson.json";

        public void getCache(string jsonLevel)
        {

            CacheDependency cacheLevel = new CacheDependency(jsonLevel);
            string json = File.ReadAllText(jsonLevel);
            cache.Insert("cacheLevels", json, cacheLevel);
        }

        public void readFile(Level level, LevelConfiguration configuration, List<LevelConfiguration> deserializedLevel, bool ExistLevel = false)
        {

            List<Options> listOptions = new List<Options>();
            var package = new ExcelPackage(new FileInfo(@"C:\Users\xcbdgara\OneDrive - Software Broker\Desktop\niveles\GeographicLevel" + level.levelId + ".xlsx"));
            ExcelWorksheet workSheet = package.Workbook.Worksheets[1];
            var start = workSheet.Dimension.Start;
            var end = workSheet.Dimension.End;
            for (int row = start.Row + 1; row <= end.Row; row++)
            {
                int index = 0;
                if (level.levelId == 1 || level.levelId == 2)
                {
                    index = 4;
                }
                if (level.levelId == 3 || level.levelId == 4)
                {
                    index = 5;
                }

                string cellValue = workSheet.Cells[row, index].Text;
                if (cellValue == configuration.companyId)
                {
                    Options Option = new Options();

                    Option.levelReference = level.levelReference;
                    Option.optionGuid = workSheet.Cells[row, 1].Text;
                    Option.optionId = listOptions.Count + 1;
                    Option.optionValue = workSheet.Cells[row, 2].Text;

                    if (level.levelId == 1)
                    {
                        Option.parentOption = 0;
                    }
                    else
                    {
                        string parent = workSheet.Cells[row, 6].Text;
                        var afterLevel = deserializedLevel.Find(x => x.companyId == configuration.companyId).level.Find(y => y.nextLevel == level.levelId);

                        int optionId = ListGeographyLevel.Find(x => x.levelId == afterLevel.levelId).companies.Find(y => y.companyId == configuration.companyId).options.Find(z => z.optionValue == parent).optionId;
                        Option.parentOption = optionId;
                    }
                    listOptions.Add(Option);
                }
            }
            Companies Companie = new Companies();
            Companie.companyId = configuration.companyId;
            Companie.options = listOptions;

            // si ya existe el nivel y el pais lo agregamos ahí
            if (ExistLevel)
            {
                //ListGeographyLevel.Add(GeographyLevel);
                ListGeographyLevel.Find(x => x.levelId == level.levelId).companies.Add(Companie);
            }
            else
            {
                GeographyLevel GeographyLevel = new GeographyLevel();
                GeographyLevel.levelId = level.levelId;
                List<Companies> listCompanies = new List<Companies>();
                listCompanies.Add(Companie);
                GeographyLevel.companies = listCompanies;
                ListGeographyLevel.Add(GeographyLevel);
            }
        }

        [AllowAnonymous]
        [Route("api/CreateFile")]
        [HttpGet]
        public HttpResponseMessage CreateFile()
        {
            try
            {
                string json = File.ReadAllText(jsonFilePathCreateJson);
                var deserializedLevel = JsonConvert.DeserializeObject<List<LevelConfiguration>>(json);

                foreach (var configuration in deserializedLevel)
                {
                    foreach (var level in configuration.level)
                    {
                        if ((!ListGeographyLevel.Exists(x => x.levelId == level.levelId)))// no existe el level
                        {
                            readFile(level, configuration, deserializedLevel);
                        }
                        else
                        {/// existe el nivel, pero no el pais
                            if (!ListGeographyLevel.Find(x => x.levelId == level.levelId).companies.Exists(y => y.companyId == configuration.companyId))
                            {
                                readFile(level, configuration, deserializedLevel, true);
                            }
                        }
                    }
                }
                string JsonResponse = JsonConvert.SerializeObject(ListGeographyLevel);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }





        [AllowAnonymous]
        [Route("api/SteptsSectionsFields/{CompanyID?}")]
        [HttpGet]
        public HttpResponseMessage SteptsSectionsFields(string CompanyID = "XMX")
        {
            try
            {
                GetOptionSet("ph_serviceprovider");
                // Formulario principal
                string jsonFilePath = $"{HttpRuntime.AppDomainAppPath}Muckps/LeadForm/{CompanyID}.json";
                string json = File.ReadAllText(jsonFilePath);

                var CompaniesField = JsonConvert.DeserializeObject<SteptsCompany>(json);
                //var CompaniesField = deserializedSteptsCompany.select(x => x.CompanyID == CompanyID);

                // Configuración de los niveles geográficos por país
                getCache($"{HttpRuntime.AppDomainAppPath}Muckps/LeadForm/LevelConfiguration.json");

                // Niveles geográficos por país
                string jsonFilePathGeography = $"{HttpRuntime.AppDomainAppPath}Muckps/LeadForm/GeographyLevel.json";
                string jsonGeography = File.ReadAllText(jsonFilePathGeography);

                var deserializedGeography = JsonConvert.DeserializeObject<List<GeographyLevel>>(jsonGeography);
                var options = deserializedGeography.SingleOrDefault(x => x.levelId == 1).companies.SingleOrDefault(o => o.companyId == CompanyID).options;

                //Creamos lista de opciones del primer nivel geográfico del país
                List<Option> lstOptions = new List<Option>();

                foreach (var op in options)
                {
                    Option option = new Option();
                    option.optionId = op.optionId;
                    option.optionGuid = op.optionGuid;
                    option.optionValue = op.optionValue;

                    lstOptions.Add(option);
                }

                //Llenamos el field del nivel geográfico 1 con la lista de opciones recuperada anteriormente
                CompaniesField.Stepts.SingleOrDefault(x => x.SteptID == 1).Sections.SingleOrDefault(o => o.SectionID == 1).fields.SingleOrDefault(f => f.geographicLevel == 1).options = lstOptions;

                var countryId = new JProperty("CountryID", CompaniesField.CountryID);
                var companyPhone = new JProperty("companyPhone", CompaniesField.CompanyPhone);
                var contactDocument = new JProperty("ContactDocument", CompaniesField.ContactDocument);


                var jsonObject = new JObject(countryId, companyPhone, contactDocument, new JProperty("stepts", CompaniesField?.Stepts.Select(x => new JObject(
                           new JProperty("SteptID", x.SteptID),
                           new JProperty("SteptName", Resource.Lead.ResourceManager.GetString(x.SteptName)),
                           new JProperty("Sections",
                           new JArray(
                                     x.Sections.Select(s => new JObject(
                                           new JProperty("SectionID", s.SectionID),
                                           new JProperty("SectionName", Resource.Lead.ResourceManager.GetString(s.SectionName)),
                                           new JProperty("SubTitle", s.SubTitle != null ? Resource.Lead.ResourceManager.GetString(s.SubTitle) : null),
                                           new JProperty("fields",
                                           new JArray(
                                     s.fields.Where(y => y.isVisible != false).Select(f => new JObject(
                                           new JProperty("fieldID", f.fieldID),
                                           new JProperty("isRequired", f.isRequired),
                                           new JProperty("label", f.label == "-" ? "" : Resource.Lead.ResourceManager.GetString(f.label)),
                                           new JProperty("name", f.name),
                                           new JProperty("guidValue", f.guidValue),
                                           new JProperty("fieldType", f.fieldType),
                                           new JProperty("showSummary", f.showSummary),
                                           new JProperty("isVisible", f.isVisible),
                                           new JProperty("geographicLevel", f.geographicLevel),
                                           new JProperty("isBlock", f.isBlock),
                                           new JProperty("hasDependency", f.hasDependency),
                                           new JProperty("options", f.optionSet != null ? new JArray(GetOptionSet(f.optionSet).Select(o => new JObject(
                                           new JProperty("optionId", o.optionId),
                                           new JProperty("optionGuid", o.optionGuid),
                                           new JProperty("optionValue", Resource.Lead.ResourceManager.GetString(o.optionValue) != null ? Resource.Lead.ResourceManager.GetString(o.optionValue) : o.optionValue),
                                           new JProperty("dependency", o.dependency != null ?
                                           new JObject(
                                             new JProperty("fieldsThatDependsBlock", o.dependency.fieldsThatDependsBlock),
                                             new JProperty("fieldsThatDependsActive", o.dependency.fieldsThatDependsActive))
                                           : null),
                                           new JProperty("fieldsShow", o.fieldsShow != null ?
                                           new JArray(o.fieldsShow.Select(w => new JObject(
                                             new JProperty("step", w.step),
                                             new JProperty("section", w.section),
                                             new JProperty("field", w.field)))

                                              )
                                           : null),
                                           new JProperty("fieldsHide", o.fieldsHide != null ?
                                           new JArray(o.fieldsHide.Select(z => new JObject(
                                             new JProperty("step", z.step),
                                             new JProperty("section", z.section),
                                             new JProperty("field", z.field)
                                             ))) : null)
                                                   )
                                                 )
                                               ) :
                                           //cargamos los option del json
                                           f.options != null ? new JArray(
                                           f.options.Select(o => new JObject(
                                           new JProperty("optionId", o.optionId),
                                           new JProperty("optionGuid", o.optionGuid),
                                           new JProperty("optionValue", o.optionValue),
                                           new JProperty("dependency", o.dependency != null ?
                                           new JObject(
                                             new JProperty("fieldsThatDependsBlock", o.dependency.fieldsThatDependsBlock),
                                             new JProperty("fieldsThatDependsActive", o.dependency.fieldsThatDependsActive))
                                           : null),
                                           new JProperty("fieldsShow", o.fieldsShow != null ?
                                           new JArray(o.fieldsShow.Select(w => new JObject(
                                             new JProperty("step", w.step),
                                             new JProperty("section", w.section),
                                             new JProperty("field", w.field)))

                                              )
                                           : null),
                                           new JProperty("fieldsHide", o.fieldsHide != null ?
                                           new JArray(o.fieldsHide.Select(z => new JObject(
                                             new JProperty("step", z.step),
                                             new JProperty("section", z.section),
                                             new JProperty("field", z.field)
                                             ))) : null)
                                                   )
                                                 )
                                               ) : null
                                           ),
                                           new JProperty("group", f.group != null ?
                                           new JObject(
                                           new JProperty("groupId", f.group.groupId),
                                           new JProperty("order", f.group.order),
                                           new JProperty("classStyle", f.group.classStyle
                                                    )
                                             ) : null
                                           ),
                                           new JProperty("groupSumary", f.groupSumary != null ?
                                           new JObject(
                                           new JProperty("groupId", f.groupSumary.groupId),
                                           new JProperty("order", f.groupSumary.order),
                                           new JProperty("separator", f.groupSumary.separator)
                                             ) : null
                                           ),
                                           new JProperty("rules", f.rules != null ?
                                           new JObject(
                                             new JProperty("uppercase", f.rules.uppercase),
                                             new JProperty("minlength", f.rules.minlength),
                                             new JProperty("maxlength", f.rules.maxlength),
                                             new JProperty("validationType", f.rules.validationType != null ?
                                             new JObject(
                                               new JProperty("type", f.rules.validationType.type),
                                               new JProperty("specialCharacters", f.rules.validationType.specialCharacters != null ?
                                               new JArray(f.rules.validationType.specialCharacters.Select(t => t))
                                               : null))
                                             : null)
                                             )
                                           : null),
                                        new JProperty("indicative", f.indicative))))))))))).ToList()));

                string jsonConvert = JsonConvert.SerializeObject(jsonObject, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, jsonConvert);
                //return Request.CreateResponse(HttpStatusCode.OK, "");
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [AllowAnonymous]
        [Route("api/GeographyLevel")]
        [HttpPost]
        public HttpResponseMessage GeographyLevel(FieldsRequestGeography fieldsRequestGeography)
        {
            try
            {
                string jsonLevel = (string)cache.Get("cacheLevels");

                var deserializedLevel = JsonConvert.DeserializeObject<List<LevelConfiguration>>(jsonLevel);

                var objLevelConfiguration = deserializedLevel.SingleOrDefault(x => x.companyId == fieldsRequestGeography.companyId).level.Where(p => p.levelId == fieldsRequestGeography.levelId).Select(o =>
                                                      new JObject(
                                                        new JProperty("nextLevel", o.nextLevel),
                                                        new JProperty("levelReference", o.levelReference)
                                                      )).First();

                List<Option> lstOptions = new List<Option>();

                string jsonFilePathGeography = $"{HttpRuntime.AppDomainAppPath}Muckps/LeadForm/GeographyLevel.json";
                string jsonGeography = File.ReadAllText(jsonFilePathGeography);

                var deserializedGeography = JsonConvert.DeserializeObject<List<GeographyLevel>>(jsonGeography);

                var options = deserializedGeography.SingleOrDefault(x => x.levelId == (int)objLevelConfiguration["nextLevel"]).companies.SingleOrDefault(o => o.companyId == fieldsRequestGeography.companyId).options.Where(i => i.parentOption == fieldsRequestGeography.parentOption).ToList();


                //deserializedGeography.SingleOrDefault(x => x.levelId == (int)objLevelConfiguration["nextLevel"]).companies.SingleOrDefault(o => o.companyId == fieldsRequestGeography.companyId).options.Where(i => i.parentOption == fieldsRequestGeography.parentOption ).ToList()

                string optionsSelect = JsonConvert.SerializeObject(options, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, new { optionsSelect, nextLevel = (int)objLevelConfiguration["nextLevel"] });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [AllowAnonymous]
        [Route("api/FieldsShowDependency")]
        [HttpPost]
        public HttpResponseMessage FieldsShowDependency(FieldsRequest fieldsRequest)
        {
            try
            {

                string jsonFilePath = $"{HttpRuntime.AppDomainAppPath}Muckps/LeadForm/{fieldsRequest.companyId}.json";
                string jsonFieldsShow = File.ReadAllText(jsonFilePath);

                var deserializedFieldsShow = JsonConvert.DeserializeObject<SteptsCompany>(jsonFieldsShow);

                //var company = deserializedFieldsShow.Single(companyS => companyS.CompanyID == fieldsRequest.companyId);

                var responseFields = new JArray();

                foreach (var item in fieldsRequest.fieldsShow)
                {
                    var responseObject = new JObject();

                    responseObject["SteptID"] = item.step;
                    responseObject["SectionID"] = item.section;

                    var field = deserializedFieldsShow.Stepts.Single(step => item.step == step.SteptID).
                                         Sections.Single(section => item.section == section.SectionID).
                                         fields.Single(fieldOne => item.field == fieldOne.fieldID);

                    responseObject["fieldID"] = field.fieldID;
                    responseObject["isRequired"] = field.isRequired;
                    responseObject["label"] = field.label == "-" ? "" : Resource.Lead.ResourceManager.GetString(field.label);
                    responseObject["name"] = field.name;
                    responseObject["guidValue"] = field.guidValue;
                    responseObject["fieldType"] = field.fieldType;
                    responseObject["showSummary"] = field.showSummary;
                    responseObject["options"] = field.optionSet != null ? new JArray(
                                        GetOptionSet(field.optionSet).Select(o => new JObject(
                                            new JProperty("optionId", o.optionId),
                                            new JProperty("optionGuid", o.optionGuid),
                                            new JProperty("optionValue", Resource.Lead.ResourceManager.GetString(o.optionValue) != null ? Resource.Lead.ResourceManager.GetString(o.optionValue) : o.optionValue),
                                            new JProperty("dependency", o.dependency != null ?
                                            new JObject(
                                              new JProperty("fieldsThatDependsBlock", o.dependency.fieldsThatDependsBlock),
                                              new JProperty("fieldsThatDependsActive", o.dependency.fieldsThatDependsActive))
                                            : null),
                                            new JProperty("fieldsShow", o.fieldsShow != null ?
                                            new JArray(o.fieldsShow.Select(w => new JObject(
                                              new JProperty("step", w.step),
                                              new JProperty("section", w.section),
                                              new JProperty("field", w.field)))
                                               )
                                            : null),
                                            new JProperty("fieldsHide", o.fieldsHide != null ?
                                            new JArray(o.fieldsHide.Select(z => new JObject(
                                              new JProperty("step", z.step),
                                              new JProperty("section", z.section),
                                              new JProperty("field", z.field)
                                              ))) : null)
                                                    )
                                                  )
                                                ) :
                                    field.options != null ? new JArray(
                                    field.options.Select(o => new JObject(
                                          new JProperty("optionId", o.optionId),
                                          new JProperty("optionGuid", o.optionGuid),
                                          new JProperty("optionValue", o.optionValue),
                                          new JProperty("dependency", o.dependency != null ?
                                          new JObject(
                                            new JProperty("fieldsThatDependsBlock", o.dependency.fieldsThatDependsBlock),
                                            new JProperty("fieldsThatDependsActive", o.dependency.fieldsThatDependsActive))
                                          : null),
                                          new JProperty("fieldsShow", o.fieldsShow != null ?
                                          new JArray(o.fieldsShow.Select(w => new JObject(
                                            new JProperty("step", w.step),
                                            new JProperty("section", w.section),
                                            new JProperty("field", w.field)))

                                             )
                                          : null),
                                          new JProperty("fieldsHide", o.fieldsHide != null ?
                                          new JArray(o.fieldsHide.Select(z => new JObject(
                                            new JProperty("step", z.step),
                                            new JProperty("section", z.section),
                                            new JProperty("field", z.field)
                                            ))) : null)
                                                  )
                                                )
                                              ) : null;



                    responseObject["rules"] = field.rules != null ? new JObject(
                                              new JProperty("uppercase", field.rules.uppercase),
                                              new JProperty("minlength", field.rules.minlength),
                                              new JProperty("maxlength", field.rules.maxlength),
                                              new JProperty("validationType", field.rules.validationType != null ?
                                              new JObject(
                                                 new JProperty("type", field.rules.validationType.type),
                                                 new JProperty("specialCharacters", field.rules.validationType.specialCharacters != null ?
                                                 new JArray(field.rules.validationType.specialCharacters.Select(t => t))
                                                 : null))
                                               : null)
                                               ) : null;
                    responseObject["group"] = field.group != null ? new JObject(
                                            new JProperty("groupId", field.group.groupId),
                                            new JProperty("order", field.group.order),
                                            new JProperty("classStyle", field.group.classStyle
                                                     )
                                              ) : null;
                    responseObject["isVisible"] = field.isVisible;
                    responseObject["hasDependency"] = field.hasDependency;
                    responseObject["geographicLevel"] = field.geographicLevel;
                    responseObject["isBlock"] = field.isBlock;
                    responseObject["indicative"] = field.indicative;


                    responseFields.Add(responseObject);
                }


                string jsonConvert = JsonConvert.SerializeObject(responseFields, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, jsonConvert);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        [AllowAnonymous]
        [Route("api/ValidateExistingEmail")]
        [HttpPost]
        public HttpResponseMessage ValidateExistingEmail([FromBody] string email)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, ValidateExternalServices.ValidateExistingEmail(email));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        private List<Option> GetOptionSet(string name)
        {
            List<Option> optionsSet = new List<Option>();

            //if (optionsSet.Count > 0)
            //return optionsSet;
            //else
            //{
            var option = LeadBLL.GetOptionSetAll().Where(x => x.Description == name).FirstOrDefault().ValueData;
            optionsSet = JsonConvert.DeserializeObject<List<Option>>(option);
            return optionsSet;
            //  }
        }

        [AllowAnonymous]
        [Route("api/GooglereCaptcha")]
        [HttpPost]
        public HttpResponseMessage ValidateToken(Google_reCaptchaResponse Google_reCaptchaResponse)
        {
            try
            {

                Google_response google_response = new Google_response();

                google_response.success = Google_reCaptchaLead.ValidateTokenCaptcha(Google_reCaptchaResponse.token);

                return Request.CreateResponse(HttpStatusCode.OK, google_response);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }


        }

        [AllowAnonymous]
        [Route("api/SendDataLead")]
        [HttpPost]
        public HttpResponseMessage SendDataLead([FromBody] object dataCompany)
        {

            try
            {
                string jsonLevel = (string)cache.Get("cacheLevels");
                var deserializedLevel = JsonConvert.DeserializeObject<List<LevelConfiguration>>(jsonLevel);

                // Niveles geográficos por país
                string jsonFilePathGeography = $"{HttpRuntime.AppDomainAppPath}Muckps/LeadForm/GeographyLevel.json";
                string jsonGeography = File.ReadAllText(jsonFilePathGeography);
                var deserializedGeography = JsonConvert.DeserializeObject<List<GeographyLevel>>(jsonGeography);


                //ProcessesDAL.CreateProcesses("1. SendDataLead");
                string jsonConvert = JsonConvert.SerializeObject(dataCompany, Formatting.Indented);
                //ProcessesDAL.CreateProcesses("2. SerializeObject");
           
                var requestData = JsonConvert.DeserializeObject<RequestCreateLeads>(dataCompany.ToString());

                if (deserializedLevel.SingleOrDefault(x => x.companyId == requestData.parentLead_atributes.ownerid).level.Where(p => p.levelId == 2).Count() == 0)
                {

                    string valueGeograpgy1 = deserializedGeography.SingleOrDefault(x => x.levelId == 1)?.companies.SingleOrDefault(x => x.companyId == requestData.parentLead_atributes.ownerid)?.options.SingleOrDefault(x => x.optionGuid == requestData.parentLead_atributes.geographic_level_1.ToString())?.optionValue;

                    if (valueGeograpgy1 != "" && valueGeograpgy1 != null)
                    {
                        string optionGuid = deserializedGeography.SingleOrDefault(x => x.levelId == 2).companies.SingleOrDefault(x => x.companyId == requestData.parentLead_atributes.ownerid).options.SingleOrDefault(x => x.optionValue == valueGeograpgy1)?.optionGuid;
                        if (optionGuid != "" && optionGuid != null)
                        {
                            requestData.parentLead_atributes.geographic_level_2 = new Guid(optionGuid);
                        }
                    }

                }
                MulesoftBLL mulesoftBLL = new MulesoftBLL();
                var response = mulesoftBLL.CreateLead(requestData);

                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                ProcessesDAL.CreateProcesses(ex.StackTrace);
                ProcessesDAL.CreateProcesses(ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [AllowAnonymous]
        [Route("api/CreateLeadXUS")]
        [HttpPost]
        public HttpResponseMessage CreateLeadXUS(RequestXUS requestXUS)
        {
            try
            {
                MulesoftBLL mulesoftBLL = new MulesoftBLL();
                var response = mulesoftBLL.CreateLeadXUS(requestXUS);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [AllowAnonymous]
        [Route("api/LeadExistence")]
        [HttpPost]
        public HttpResponseMessage leadExistence([FromBody] LeadExistence leadExistence)
        {

            try
            {
                MulesoftBLL mulesoftBLL = new MulesoftBLL();
                var response = mulesoftBLL.leadExistence(leadExistence);

                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex);
            }


        }

    }
}

