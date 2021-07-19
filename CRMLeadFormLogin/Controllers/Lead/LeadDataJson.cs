using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace CRMLeadFormLogin.Controllers.Lead
{
  // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 

  public class Dependency
  {
    public List<int> fieldsThatDependsBlock { get; set; }
    public List<int> fieldsThatDependsActive { get; set; }
  }

  public class ValidationType
  {
    public string type { get; set; }
    public List<string> specialCharacters { get; set; }
  }

  public class Rules
  {
    public bool uppercase { get; set; }
    public int minlength { get; set; }
    public int maxlength { get; set; }
    public ValidationType validationType { get; set; }
  }

  public class FieldsHide
  {
    public int step { get; set; }
    public int section { get; set; }
    public int field { get; set; }
  }

  public class FieldsShow
  {
    public int step { get; set; }
    public int section { get; set; }
    public int field { get; set; }

  }

  public class Option
  {
    public int optionId { get; set; }
    public string optionGuid { get; set; }
    public string code { get; set; }

    public string optionValue { get; set; }
    public List<FieldsShow> fieldsShow { get; set; }
    public List<FieldsHide> fieldsHide { get; set; }
    public Dependency dependency { get; set; }
  }

  public class Group
  {
    public int groupId { get; set; }
    public int order { get; set; }
    public string classStyle { get; set; }
  }

  public class GroupSumary
  {
    public int groupId { get; set; }
    public int order { get; set; }
    public string separator { get; set; }
  }

  public class Field
  {
    public int fieldID { get; set; }
    public bool isRequired { get; set; }
    public string label { get; set; }
    public string name { get; set; }
    public string guidValue { get; set; }
    public string fieldType { get; set; }
    public bool showSummary { get; set; }
    public bool isVisible { get; set; }
    public bool hasDependency { get; set; }
    public List<Option> options { get; set; }
    public Group group { get; set; }
    public GroupSumary groupSumary { get; set; }
    public Rules rules { get; set; }
    public int? geographicLevel { get; set; }
    public bool? isBlock { get; set; }
    public string indicative { get; set; }
    public string optionSet { get; set; }
  }

  public class Section
  {
    public int SectionID { get; set; }
    public string SectionName { get; set; }
    public string SubTitle { get; set; }
    public List<Field> fields { get; set; }
  }

  public class Stept
  {
    public int SteptID { get; set; }
    public string SteptName { get; set; }
    public List<Section> Sections { get; set; }
  }

  public class SteptsCompany
  {
    public string CompanyID { get; set; }
    public string CountryID { get; set; }
    public string ContactDocument { get; set; }
    public string CompanyPhone { get; set; }
    public List<Stept> Stepts { get; set; }
  }

  //public class CompanyesFields
  //{
  //  public List<SteptsCompany> MyArray { get; set; }
  //}


}