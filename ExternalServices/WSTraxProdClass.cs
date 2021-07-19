
using Nelibur.ObjectMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExternalServices.WSTraxProd;


namespace ExternalServices
{
    public class WSTraxProdClass
    {
        ExternalServices.WSTraxProd.WSTraxProdObjClient client = new ExternalServices.WSTraxProd.WSTraxProdObjClient();
        public ResponseWebUser getWebuser(string User)
        {

            var a = new ExternalServices.WSTraxProd.getWebuserResponse();
            var b = new ResponseWebUser();

            client.getWebuser(User, out a.tweb_user);
            b.IsSuccess = true;
            b.UserInfo = a.tweb_user;
            return b;
        }

        public ExternalServices.WSTraxProd.login2Response Login(string User, string Pass)
        {
            var a = new ExternalServices.WSTraxProd.login2Response();
            client.login2(User, Pass, out a.login2_results);
            return a;
        }


        public string getprafs31sd(string localRecno, string sesionId)
        {
            ExternalServices.WSTraxProd.getprafs31sd_prodsRow[] products = new ExternalServices.WSTraxProd.getprafs31sd_prodsRow[1];
            ExternalServices.WSTraxProd.getprafs31sd_prodsRow product = new ExternalServices.WSTraxProd.getprafs31sd_prodsRow();
            product.prodrecno = localRecno;
            products[0] = product;
            getprafs3sd_resultsProdresultbf[] outs;
            client.getprafs31sd(products, "", sesionId, 3, out outs);
            if (outs.Length > 1)
            {
                return Convert.ToInt32(outs[1].afsresultbf.Sum(x => x.afs)).ToString() + "@" + outs[1].price.ToString() + "@" + outs[1].currid;
            }
            else {
                return "0@0,0@0";
            }
            
        }
    }
}
