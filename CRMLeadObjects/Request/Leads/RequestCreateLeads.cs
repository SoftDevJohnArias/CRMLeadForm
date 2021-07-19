using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.Request.Leads
{
  public class ParentLeadAtributes
  {
    //public string firstname { get; set; }
    //public string middlename { get; set; }
    //public string lastname { get; set; }
    //public string ph_secondlastname { get; set; }
    public Guid? company_type_id { get; set; }
    public Guid geographic_level_1 { get; set; }
    public Guid geographic_level_2 { get; set; }
    public Guid geographic_level_3 { get; set; }
    public Guid geographic_level_4 { get; set; }
    public Guid? document_type_id { get; set; }
    public Guid? ph_maritalstatusid { get; set; }
    public Guid? MarketsSegment1 { get; set; }
    public Guid? MarketsSegment2 { get; set; }
    public Guid? MarketsSegment3 { get; set; }
    public Guid? MarketsSegment4 { get; set; }
    public Guid? MarketsSegment5 { get; set; }
    public Guid? MarketsSegment6 { get; set; }
    public Guid? BusinessDivisions1 { get; set; }
    public Guid? BusinessDivisions2 { get; set; }
    public Guid? BusinessDivisions3 { get; set; }
    public Guid? BusinessDivisions4 { get; set; }
    public Guid? BusinessDivisions5 { get; set; }
    public Guid? BusinessDivisions6 { get; set; }
    public Guid? BusinessDivisions7 { get; set; }
    public Guid? BusinessDivisions8 { get; set; }
    public Guid? BusinessDivisions9 { get; set; }
    public Guid? BusinessDivisions10 { get; set; }
    public Guid? BusinessDivisions11 { get; set; }
    public Guid? BusinessDivisions12 { get; set; }
    public Guid? BusinessDivisions13 { get; set; }
    public Guid? BusinessDivisions14 { get; set; }
    public Guid? BusinessDivisions15 { get; set; }
    public Guid? BusinessDivisions16 { get; set; }
    public Guid? BusinessDivisions17 { get; set; }
    public Guid? BusinessDivisions18 { get; set; }
    public Guid? BusinessDivisions19 { get; set; }
    public Guid? business_line_id { get; set; }
    public Guid? country_id { get; set; }
    public Guid? ph_branchid { get; set; }
    public Guid? payment_methods_id { get; set; }
    public Guid? marital_status_id { get; set; }
    public Guid? branch_id { get; set; }
    
    public string telephone1 { get; set; }
    public string ph_companyidentification { get; set; }
    public string ph_dv { get; set; }
    public string companyname { get; set; }
    public string ph_commercialname { get; set; }
    public string address1_name { get; set; }
    public string telephone2 { get; set; }
    public string emailaddress2 { get; set; }
    public string emailaddress1 { get; set; }
    public string emailaddress3 { get; set; }
    public string address1_postalcode { get; set; }
    public string address1_line1 { get; set; }
    public string address1_line2 { get; set; }
    public string address1_line3 { get; set; }
    public string ph_invoiceemail { get; set; }
    public string ownerid  { get; set; }
    public string ph_lastdigits { get; set; }
    public string ph_urlfilesharepoint { get; set; }
    public string ph_specifyfundsourceanddestination { get; set; }
    public string ph_politicalties { get; set; }
    public string ph_roadnumber { get; set; }
    public string ph_roadnumber2 { get; set; }
    public string ph_dui { get; set; }
    public string ph_nrc { get; set; }
    public string ph_acceptterms { get; set; }
    public bool ph_acceptsarlaft { get; set; }
    public string ph_buildingnumber { get; set; }
    public bool ph_agreepersonaldatause { get; set; }
    public bool? ph_politicallyexposed { get; set; }
    public bool? ph_ivataxpayer { get; set; }
    public int? ph_purchaseintention { get; set; }
    public int? ph_salesrange { get; set; }
    public int? ph_voluntarydeclarationfundsource { get; set; }
    public int? ph_taxinvoicerequired { get; set; }
    public int? ph_serviceprovider { get; set; }
    public int? ph_roadtype { get; set; }
    public int? ph_buildingtype { get; set; }
    public Guid? GuidElectronicBilling { get; set; }
    public bool? IsValidOTP { get; set; }

  }

  public class ChildLeadAttribute
  {
    public int id { get; set; }
    public string type { get; set; }
    public string ocupation { get; set; }
    public string fullName { get; set; }
    public string firstname { get; set; }
    public string middlename { get; set; }
    public string lastname { get; set; }
    public string ownerid { get; set; }
    public string ph_secondlastname { get; set; }   
    public string ph_identification { get; set; }
    public string jobtitle { get; set; }
    public string mobilephone { get; set; }
    public string emailaddress1 { get; set; }
    public string emailaddress3 { get; set; }
    public Guid? SelectFeatures1 { get; set; }
    public Guid? SelectFeatures2 { get; set; }
    public Guid? SelectFeatures3 { get; set; }
    public Guid? SelectFeatures4 { get; set; }
    public Guid? SelectFeatures5 { get; set; }
    public Guid? SelectFeatures6 { get; set; }
    public Guid? SelectFeatures7 { get; set; }
    public Guid? SelectFeatures8 { get; set; }
    public Guid? SelectFeatures9 { get; set; }
    public Guid? country_id { get; set; }
    public Guid? contact_document_type_id { get; set; }
    public Guid? GuidElectronicBilling { get; set; }

  }
  public class Document
  {
    public byte[] document { get; set; }
    public string document_name { get; set; }
    public string document_name_summary { get; set; }
  }

  public class RequestCreateLeads
  {
    public ParentLeadAtributes parentLead_atributes { get; set; }
    public List<ChildLeadAttribute> childLead_attributes { get; set; }
    public List<Document> documents { get; set; }
  }

}
