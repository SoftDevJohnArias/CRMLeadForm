�
8C:\Users\jaria304\source\repos\CRMLeadForm\BLL\ApiLog.cs
	namespace 	
BLL
 
{ 
public 

class 
ApiLog 
{ 
public		 
StateResultSP		 
CreateApiLog		 )
(		) *
string		* 0

httpMethod		1 ;
,		; <
string

 
request

 
,

 
string

 "
requestOperation

# 3
,

3 4
string

5 ;
requestBody

< G
,

G H
string

I O
host

P T
,

T U
string 
clientIp 
, 
string #

statusCode$ .
,. /
string0 6
response7 ?
,? @
stringA G

apiVersionH R
,R S
string 

customerID 
, 
string %
orderNumber& 1
,1 2
string3 9
localSku: B
,B C
stringD J

controllerK U
,U V
string 

cacheValue 
, 
string %
	exception& /
,/ 0
Guid1 5
	reference6 ?
,? @
stringA G
	userAgentH Q
)Q R
{ 	
return 
new 
	ApiLogDAL  
(  !
)! "
." #
CreateApiLog# /
(/ 0

httpMethod0 :
,: ;
request 
, 
requestOperation +
,+ ,
requestBody- 8
,8 9
host: >
,> ?
clientIp 
, 

statusCode !
,! "
response# +
,+ ,

apiVersion- 7
,7 8

customerID 
, 
orderNumber $
,$ %
localSku& .
,. /

controller0 :
,: ;

cacheValue 
, 
	exception "
," #
	reference$ -
,- .
	userAgent/ 8
)8 9
;9 :
} 	
} 
} �
AC:\Users\jaria304\source\repos\CRMLeadForm\BLL\GeneralSettings.cs
	namespace		 	
BLL		
 
{

 
public 

static 
class 
GeneralSettings '
{ 
public 
static 
CultureInfo !

setCulture" ,
(, -
string- 3
locale4 :
): ;
{ 	
CultureInfo 
culture 
=  !
null" &
;& '
switch 
( 
locale 
) 
{ 
case 
$str 
: 
culture 
= 
CultureInfo )
.) *!
CreateSpecificCulture* ?
(? @
$str@ G
)G H
;H I
break 
; 
case 
$str 
: 
culture 
= 
CultureInfo )
.) *!
CreateSpecificCulture* ?
(? @
$str@ G
)G H
;H I
break 
; 
default 
: 
culture 
= 
CultureInfo )
.) *!
CreateSpecificCulture* ?
(? @
$str@ G
)G H
;H I
break 
; 
} 
CultureInfo 
. '
DefaultThreadCurrentCulture 3
=4 5
culture6 =
;= >
CultureInfo 
. )
DefaultThreadCurrentUICulture 5
=6 7
culture8 ?
;? @
Thread 
. 
CurrentThread  
.  !
CurrentCulture! /
=0 1
culture2 9
;9 :
Thread 
. 
CurrentThread  
.  !
CurrentUICulture! 1
=2 3
culture4 ;
;; <
return   
culture   
;   
}!! 	
}## 
}%% �
LC:\Users\jaria304\source\repos\CRMLeadForm\BLL\Leads\Google_reCaptchaLead.cs
	namespace		 	
BLL		
 
.		 
Leads		 
{

 
public 
static	 
class  
Google_reCaptchaLead *
{ 
public 

static 
bool  
ValidateTokenCaptcha +
(+ ,
string, 2
token3 8
)8 9
{ 
try 	
{ 
using 
( 
var 
client 
= 
new 

HttpClient  *
(* +
)+ ,
), -
{ 	
var
 
url 
= 
System 
. 
Configuration (
.( ) 
ConfigurationManager) =
.= >
AppSettings> I
[I J
$strJ X
]X Y
;Y Z
var
 
values 
= 
new 

Dictionary %
<% &
string& ,
,, -
string. 4
>4 5
{ 	
{
 
$str 
, 
System 
. 
Configuration *
.* + 
ConfigurationManager+ ?
.? @
AppSettings@ K
[K L
$strL `
]` a
}a b
,b c
{
 
$str 
, 
token 
} 
} 	
;	 

var
 
content 
= 
new !
FormUrlEncodedContent 1
(1 2
values2 8
)8 9
;9 :
var
 
	verifyUrl 
= 
client  
.  !
	PostAsync! *
(* +
url+ .
,. /
content0 7
)7 8
.8 9
Result9 ?
;? @
var
 "
captchaResponseContent $
=% &
	verifyUrl' 0
.0 1
Content1 8
;8 9
string
 
captchaResult 
=  "
captchaResponseContent! 7
.7 8
ReadAsStringAsync8 I
(I J
)J K
.K L
ResultL R
;R S
JObject!!
 
json!! 
=!! 
JObject!!  
.!!  !
Parse!!! &
(!!& '
captchaResult!!' 4
)!!4 5
;!!5 6
return##
 
(## 
bool## 
)## 
json## 
[## 
$str## %
]##% &
;##& '
}$$ 	
}%% 
catch&& 
(&& 
	Exception&& 
ex&& 
)&& 
{'' 
return(( 
false(( 
;(( 
})) 
}++ 
}-- 
}.. �
?C:\Users\jaria304\source\repos\CRMLeadForm\BLL\Leads\LeadBLL.cs
	namespace

 	
BLL


 
.

 
Leads

 
{ 
public 
static	 
class 
LeadBLL 
{ 
private 
static 
CacheConfig 
< 
List #
<# $
	OptionSet$ -
>- .
>. /
_cacheOption0 <
== >
new? B
CacheConfigC N
<N O
ListO S
<S T
	OptionSetT ]
>] ^
>^ _
(_ `
)` a
;a b
public 

static 
List 
< 
	OptionSet  
>  !
GetOptionSetAll" 1
(1 2
)2 3
{ 
return 
LeadDAL 
. 
GetOptionSetAll $
($ %
)% &
;& '
} 
} 
} �8
HC:\Users\jaria304\source\repos\CRMLeadForm\BLL\Leads\ValidateCodeLead.cs
	namespace 	
BLL
 
. 
Leads 
{ 
public 
class	 
ValidateCodeLead 
{ 
public 

static %
ValidateEmailCodeResponse +
CreateEmailCode, ;
(; <
string< B
emailC H
,H I
boolJ N
	sendEmailO X
,X Y
stringZ `
languagea i
,i j
intk n
?n o
validityTimep |
)| }
{ 
Guid 


hiddenCode 
= 
Guid 
. 
NewGuid $
($ %
)% &
;& '
	EmailCode 
	emailCode 
= 
new 
	EmailCode  )
{ 
Email 
= 
email 
,  
VisibleGeneratedCode 
= 
GenerateCodeRandom 1
(1 2
$num2 3
)3 4
,4 5
HiddenGeneratedCode 
= 

hiddenCode (
,( )
Language 
= 
language 
, 
ValidityTime 
= 
validityTime !
}!! 
;!! 
var## 	
result##
 
=## 
ValidateCodeLeadDAL## &
.##& '
CreateEmailCode##' 6
(##6 7
	emailCode##7 @
)##@ A
;##A B%
ValidateEmailCodeResponse$$ %
validateEmailCodeResponse$$  9
=$$: ;
new$$< ?%
ValidateEmailCodeResponse$$@ Y
{%% 
Success&& 
=&& 
result&& 
.&& 
Success&&  
,&&  !
HiddenGeneratedCode'' 
='' 
result'' $
.''$ %
Success''% ,
?''- .

hiddenCode''/ 9
:'': ;
(''< =
Guid''= A
?''A B
)''B C
null''C G
}(( 
;(( 
return,, %
validateEmailCodeResponse,, &
;,,& '
}-- 
public.. 

static.. 
StateResultSP.. 
VerifyEmailCode..  /
(../ 0$
ValidateEmailCodeRequest..0 H
validateEmailCode..I Z
)..Z [
{// 
string00 
company00 
=00 
$str00 
;00 
var11 	
response11
 
=11 
ValidateCodeLeadDAL11 (
.11( )
GetEmailCode11) 5
(115 6
validateEmailCode116 G
.11G H
HiddenGeneratedCode11H [
)11[ \
;11\ ]
if33 
(33	 

response33
 
!=33 
null33 
&&44
 
response44 
.44 
HiddenGeneratedCode44 )
==44* ,
validateEmailCode44- >
.44> ?
HiddenGeneratedCode44? R
&&55
 
response55 
.55  
VisibleGeneratedCode55 *
==55+ -
validateEmailCode55. ?
.55? @
InputLeadCode55@ M
&&66
 
!66 
ExpiratedCode66 
(66 
response66 $
.66$ %
GenerateDate66% 1
,661 2
company663 :
)66: ;
)66; <
{77 
ValidateCodeLeadDAL99 
.99 
ComfirmCodeLead99 +
(99+ ,
response99, 4
)994 5
;995 6
return:: 
new:: 
StateResultSP::  
{;; 	
Message<<
 
=<< 
$str<< (
,<<( )
Success==
 
=== 
true== 
,== 
}>> 	
;>>	 

}?? 
returnAA 
newAA 
StateResultSPAA 
{BB 
SuccessCC 
=CC 
falseCC 
,CC 
MessageDD 
=DD 
$strDD U
,DDU V
}EE 
;EE 
}FF 
privateGG 
staticGG 
boolGG 
ExpiratedCodeGG %
(GG% &
DateTimeGG& .
generateDateGG/ ;
,GG; <
stringGG= C
companyGGD K
=GGL M
$strGGN S
)GGS T
{HH 
varII 	
timeExpirationII
 
=II  
ConfigurationManagerII /
.II/ 0
AppSettingsII0 ;
[II; <
$strII< N
]IIN O
;IIO P
EnumJJ 

.JJ
 
TryParseJJ 
(JJ 
companyJJ 
,JJ 
outJJ  %
StandartTimeEnumByCompanyJJ! :
zoneJJ; ?
)JJ? @
;JJ@ A
varKK 	
standarTimeKK
 
=KK 
zoneKK 
.KK 
GetDescriptionKK +
(KK+ ,
)KK, -
;KK- .
ifMM 
(MM	 

stringMM
 
.MM 
IsNullOrEmptyMM 
(MM 
timeExpirationMM -
)MM- .
)MM. /
{NN 
throwOO 
newOO '
ArgumentOutOfRangeExceptionOO -
(OO- .
$strOO. J
)OOJ K
;OOK L
}PP 
varSS 	

differenceSS
 
=SS 
DateTimeSS 
.SS  
UtcNowSS  &
.SS& '"
ConvertDateToLocalTimeSS' =
(SS= >
standarTimeSS> I
)SSI J
.SSJ K
SubtractSSK S
(SSS T
generateDateSST `
)SS` a
;SSa b
doubleUU 
.UU 
TryParseUU 
(UU 
timeExpirationUU $
,UU$ %
outUU& )
doubleUU* 0
timeMinutesUU1 <
)UU< =
;UU= >
returnVV 
timeMinutesVV 
<VV 

differenceVV %
.VV% &
TotalMinutesVV& 2
;VV2 3
}WW 
privateYY 
staticYY 
stringYY 
GenerateCodeRandomYY ,
(YY, -
intYY- 0
sizeYY1 5
)YY5 6
{ZZ 
const[[ 
string[[ 
src[[ 
=[[ 
$str[[ %
;[[% &
var\\ 	
sb\\
 
=\\ 
new\\ 
StringBuilder\\  
(\\  !
)\\! "
;\\" #
Random]] 
RNG]] 
=]] 
new]] 
Random]] 
(]] 
)]] 
;]]  
for^^ 	
(^^
 
var^^ 
i^^ 
=^^ 
$num^^ 
;^^ 
i^^ 
<^^ 
size^^ 
;^^ 
i^^  !
++^^! #
)^^# $
{__ 
var`` 
c`` 
=`` 
src`` 
[`` 
RNG`` 
.`` 
Next`` 
(`` 
$num`` 
,`` 
src``  #
.``# $
Length``$ *
)``* +
]``+ ,
;``, -
sbaa 

.aa
 
Appendaa 
(aa 
caa 
)aa 
;aa 
}bb 
returndd 
sbdd 
.dd 
ToStringdd 
(dd 
)dd 
;dd 
}ee 
}ff 
}gg �
PC:\Users\jaria304\source\repos\CRMLeadForm\BLL\Leads\ValidateExternalServices.cs
	namespace 	
BLL
 
. 
Leads 
{		 
public

 
static

	 
class

 $
ValidateExternalServices

 .
{ 
public 

static 
bool !
ValidateExistingEmail ,
(, -
string- 3
email4 9
)9 :
{ 
return 
false 
; 
} 
} 
} ��
=C:\Users\jaria304\source\repos\CRMLeadForm\BLL\MulesoftBLL.cs
	namespace 	
BLL
 
{ 
public 

class 
MulesoftBLL 
{ 
public 
IDictionary 
< 
string !
,! "
Object# )
>) *%
CreateParentLeadAtributes+ D
(D E

RequestXUSE O

requestXUSP Z
)Z [
{ 	
var &
dynamicParentLeadAtributes *
=+ ,
new- 0
System1 7
.7 8
Dynamic8 ?
.? @
ExpandoObject@ M
(M N
)N O
asP R
IDictionaryS ^
<^ _
string_ e
,e f
Objectg m
>m n
;n o&
dynamicParentLeadAtributes &
.& '
Add' *
(* +
$str+ 8
,8 9

requestXUS: D
.D E
companynameE P
)P Q
;Q R&
dynamicParentLeadAtributes   &
.  & '
Add  ' *
(  * +
$str  + E
,  E F

requestXUS  G Q
.  Q R$
ph_companyidentification  R j
)  j k
;  k l&
dynamicParentLeadAtributes!! &
.!!& '
Add!!' *
(!!* +
$str!!+ :
,!!: ;

requestXUS!!< F
.!!F G
address1_name!!G T
)!!T U
;!!U V&
dynamicParentLeadAtributes"" &
.""& '
Add""' *
(""* +
$str""+ 7
,""7 8

requestXUS""9 C
.""C D

country_id""D N
)""N O
;""O P&
dynamicParentLeadAtributes## &
.##& '
Add##' *
(##* +
$str##+ @
,##@ A

requestXUS##B L
.##L M
address1_postalcode##M `
)##` a
;##a b&
dynamicParentLeadAtributes$$ &
.$$& '
Add$$' *
($$* +
$str$$+ :
,$$: ;

requestXUS$$< F
.$$F G
emailaddress1$$G T
)$$T U
;$$U V&
dynamicParentLeadAtributes%% &
.%%& '
Add%%' *
(%%* +
$str%%+ 7
,%%7 8

requestXUS%%9 C
.%%C D

telephone1%%D N
)%%N O
;%%O P&
dynamicParentLeadAtributes&& &
.&&& '
Add&&' *
(&&* +
$str&&+ A
,&&A B

requestXUS&&C M
.&&M N 
ph_purchaseintention&&N b
)&&b c
;&&c d&
dynamicParentLeadAtributes'' &
.''& '
Add''' *
(''* +
$str''+ 6
,''6 7

requestXUS''8 B
.''B C
	firstname''C L
)''L M
;''M N&
dynamicParentLeadAtributes(( &
.((& '
Add((' *
(((* +
$str((+ 8
,((8 9

requestXUS((: D
.((D E
mobilephone((E P
)((P Q
;((Q R&
dynamicParentLeadAtributes)) &
.))& '
Add))' *
())* +
$str))+ 4
,))4 5

requestXUS))6 @
.))@ A
ownerid))A H
)))H I
;))I J&
dynamicParentLeadAtributes** &
.**& '
Add**' *
(*** +
$str**+ 5
,**5 6

requestXUS**7 A
.**A B
lastname**B J
)**J K
;**K L&
dynamicParentLeadAtributes++ &
.++& '
Add++' *
(++* +
$str+++ N
,++N O

requestXUS++P Z
.++Z [-
!ph_voluntarydeclarationfundsource++[ |
)++| }
;++} ~
return-- &
dynamicParentLeadAtributes-- -
;--- .
}// 	
public11 
IDictionary11 
<11 
string11 !
,11! "
Object11# )
>11) *
ParentLeadAtributes11+ >
(11> ?
ParentLeadAtributes11? R 
parentLead_atributes11S g
,11g h
List11i m
<11m n
ChildLeadAttribute	11n �
>
11� �#
lstChildLeadAttribute
11� �
)
11� �
{22 	
var33 &
dynamicParentLeadAtributes33 *
=33+ ,
new33- 0
System331 7
.337 8
Dynamic338 ?
.33? @
ExpandoObject33@ M
(33M N
)33N O
as33P R
IDictionary33S ^
<33^ _
string33_ e
,33e f
Object33g m
>33m n
;33n o
List44 
<44 
Guid44 
>44 
listMarketsSegment44 )
=44* +
new44, /
List440 4
<444 5
Guid445 9
>449 :
(44: ;
)44; <
;44< =
List55 
<55 
Guid55 
>55 "
listaBusinessDivisions55 -
=55. /
new550 3
List554 8
<558 9
Guid559 =
>55= >
(55> ?
)55? @
;55@ A
List66 
<66 
Guid66 
>66 
listcontactypeGuid66 )
=66* +
new66, /
List660 4
<664 5
Guid665 9
>669 :
(66: ;
)66; <
;66< =
if88 
(88 
string88 
.88 
IsNullOrEmpty88 $
(88$ % 
parentLead_atributes88% 9
.889 :
ph_invoiceemail88: I
)88I J
)88J K 
parentLead_atributes99 $
.99$ %
ph_invoiceemail99% 4
=995 6 
parentLead_atributes997 K
.99K L
emailaddress299L Y
;99Y Z
foreach<< 
(<< 
PropertyInfo<< !
propertyInfo<<" .
in<</ 1 
parentLead_atributes<<2 F
.<<F G
GetType<<G N
(<<N O
)<<O P
.<<P Q
GetProperties<<Q ^
(<<^ _
)<<_ `
)<<` a
{== 
var>> 
name>> 
=>> 
propertyInfo>> '
.>>' (
Name>>( ,
;>>, -
var?? 
value?? 
=?? 
propertyInfo?? (
.??( )
GetValue??) 1
(??1 2 
parentLead_atributes??2 F
,??F G
null??H L
)??L M
;??M N
if@@ 
(@@ 
value@@ 
!=@@ 
null@@ !
&&@@" $
name@@% )
!=@@* ,
null@@- 1
)@@1 2
{AA 
ifBB 
(BB 
!BB 
nameBB 
.BB 
ContainsBB &
(BB& '
$strBB' 7
)BB7 8
&&BB9 ;
!BB< =
nameBB= A
.BBA B
ContainsBBB J
(BBJ K
$strBBK ^
)BB^ _
)BB_ `
{CC 
ifII 
(II 
nameII  
.II  !
ContainsII! )
(II) *
$strII* D
)IID E
)IIE F
{JJ 
stringKK "
valueReplaceKK# /
=KK0 1
valueKK2 7
.KK7 8
ToStringKK8 @
(KK@ A
)KKA B
;KKB C
valueLL !
=LL" #
valueReplaceLL$ 0
.LL0 1
ReplaceLL1 8
(LL8 9
$strLL9 <
,LL< =
$strLL> @
)LL@ A
.LLA B
ReplaceLLB I
(LLI J
$strLLJ M
,LLM N
$strLLO Q
)LLQ R
.LLR S
ReplaceLLS Z
(LLZ [
$strLL[ ^
,LL^ _
$strLL` b
)LLb c
.LLc d
ToUpperLLd k
(LLk l
)LLl m
;LLm n&
dynamicParentLeadAtributesNN 6
.NN6 7
AddNN7 :
(NN: ;
nameNN; ?
,NN? @
valueNNA F
)NNF G
;NNG H
}OO 
elsePP 
{QQ 
ifRR 
(RR  
nameRR  $
.RR$ %
ContainsRR% -
(RR- .
$strRR. @
)RR@ A
)RRA B
{SS 
ifTT  "
(TT# $
GuidTT$ (
.TT( )
ParseTT) .
(TT. /
valueTT/ 4
.TT4 5
ToStringTT5 =
(TT= >
)TT> ?
)TT? @
!=TTA C
GuidTTD H
.TTH I
EmptyTTI N
)TTN O
{UU  !&
dynamicParentLeadAtributesVV$ >
.VV> ?
AddVV? B
(VVB C
nameVVC G
,VVG H
valueVVI N
)VVN O
;VVO P
}WW  !
}XX 
elseYY  
{ZZ &
dynamicParentLeadAtributes[[  :
.[[: ;
Add[[; >
([[> ?
name[[? C
,[[C D
value[[E J
)[[J K
;[[K L
}\\ 
}]] 
}^^ 
else__ 
{`` 
ifaa 
(aa 
nameaa  
.aa  !
Containsaa! )
(aa) *
$straa* :
)aa: ;
)aa; <
{bb 
listMarketsSegmentcc .
.cc. /
Addcc/ 2
(cc2 3
Guidcc3 7
.cc7 8
Parsecc8 =
(cc= >
valuecc> C
.ccC D
ToStringccD L
(ccL M
)ccM N
)ccN O
)ccO P
;ccP Q
}dd 
ifee 
(ee 
nameee  
.ee  !
Containsee! )
(ee) *
$stree* =
)ee= >
)ee> ?
{ff "
listaBusinessDivisionsgg 2
.gg2 3
Addgg3 6
(gg6 7
Guidgg7 ;
.gg; <
Parsegg< A
(ggA B
valueggB G
.ggG H
ToStringggH P
(ggP Q
)ggQ R
)ggR S
)ggS T
;ggT U
}hh 
}ii 
}jj 
}kk 
varoo  
contactAdministratoroo $
=oo% &!
lstChildLeadAttributeoo' <
.oo< =
Whereoo= B
(ooB C
xooC D
=>ooE G
xooH I
.ooI J
typeooJ N
==ooO Q
$strooR b
)oob c
.ooc d
FirstOrDefaultood r
(oor s
)oos t
;oot u&
dynamicParentLeadAtributespp &
.pp& '
Addpp' *
(pp* +
$strpp+ 6
,pp6 7 
contactAdministratorpp8 L
.ppL M
	firstnameppM V
)ppV W
;ppW X&
dynamicParentLeadAtributesqq &
.qq& '
Addqq' *
(qq* +
$strqq+ 5
,qq5 6 
contactAdministratorqq7 K
.qqK L
lastnameqqL T
)qqT U
;qqU V&
dynamicParentLeadAtributesrr &
.rr& '
Addrr' *
(rr* +
$strrr+ >
,rr> ? 
contactAdministratorrr@ T
.rrT U
ph_identificationrrU f
.rrf g
ToUpperrrg n
(rrn o
)rro p
)rrp q
;rrq r&
dynamicParentLeadAtributesss &
.ss& '
Addss' *
(ss* +
$strss+ :
,ss: ; 
contactAdministratorss< P
.ssP Q
emailaddress1ssQ ^
)ss^ _
;ss_ `&
dynamicParentLeadAtributestt &
.tt& '
Addtt' *
(tt* +
$strtt+ E
,ttE F 
contactAdministratorttG [
.tt[ \$
contact_document_type_idtt\ t
)ttt u
;ttu v
ifvv 
(vv 
!vv 
stringvv 
.vv 
IsNullOrEmptyvv %
(vv% & 
contactAdministratorvv& :
.vv: ;
emailaddress3vv; H
)vvH I
)vvI J&
dynamicParentLeadAtributesww *
.ww* +
Addww+ .
(ww. /
$strww/ >
,ww> ? 
contactAdministratorww@ T
.wwT U
emailaddress3wwU b
)wwb c
;wwc d
ifyy 
(yy 
!yy 
stringyy 
.yy 
IsNullOrEmptyyy %
(yy% & 
contactAdministratoryy& :
.yy: ;
jobtitleyy; C
)yyC D
)yyD E&
dynamicParentLeadAtributeszz *
.zz* +
Addzz+ .
(zz. /
$strzz/ 9
,zz9 : 
contactAdministratorzz; O
.zzO P
jobtitlezzP X
)zzX Y
;zzY Z
if|| 
(|| 
!|| 
string|| 
.|| 
IsNullOrEmpty|| %
(||% & 
contactAdministrator||& :
.||: ;

middlename||; E
)||E F
)||F G&
dynamicParentLeadAtributes}} *
.}}* +
Add}}+ .
(}}. /
$str}}/ ;
,}}; < 
contactAdministrator}}= Q
.}}Q R

middlename}}R \
)}}\ ]
;}}] ^
if 
( 
! 
string 
. 
IsNullOrEmpty %
(% & 
contactAdministrator& :
.: ;
ph_secondlastname; L
)L M
)M N(
dynamicParentLeadAtributes
�� *
.
��* +
Add
��+ .
(
��. /
$str
��/ B
,
��B C"
contactAdministrator
��D X
.
��X Y
ph_secondlastname
��Y j
)
��j k
;
��k l
if
�� 
(
�� 
!
�� 
string
�� 
.
�� 
IsNullOrEmpty
�� %
(
��% &"
contactAdministrator
��& :
.
��: ;
mobilephone
��; F
)
��F G
)
��G H(
dynamicParentLeadAtributes
�� *
.
��* +
Add
��+ .
(
��. /
$str
��/ <
,
��< ="
contactAdministrator
��> R
.
��R S
mobilephone
��S ^
)
��^ _
;
��_ `(
dynamicParentLeadAtributes
�� &
.
��& '
Add
��' *
(
��* +
$str
��+ 8
,
��8 9
true
��: >
)
��> ?
;
��? @
foreach
�� 
(
�� 
PropertyInfo
�� !
propertyInfo
��" .
in
��/ 1"
contactAdministrator
��2 F
.
��F G
GetType
��G N
(
��N O
)
��O P
.
��P Q
GetProperties
��Q ^
(
��^ _
)
��_ `
)
��` a
{
�� 
var
�� 
value
�� 
=
�� 
propertyInfo
�� (
.
��( )
GetValue
��) 1
(
��1 2"
contactAdministrator
��2 F
,
��F G
null
��H L
)
��L M
;
��M N
if
�� 
(
�� 
(
�� 
propertyInfo
�� !
.
��! "
Name
��" &
.
��& '
Contains
��' /
(
��/ 0
$str
��0 @
)
��@ A
)
��A B
&&
��C E
(
��F G
value
��G L
!=
��M O
null
��P T
)
��T U
)
��U V 
listcontactypeGuid
�� &
.
��& '
Add
��' *
(
��* +
Guid
��+ /
.
��/ 0
Parse
��0 5
(
��5 6
value
��6 ;
.
��; <
ToString
��< D
(
��D E
)
��E F
)
��F G
)
��G H
;
��H I
}
��  
listcontactypeGuid
�� 
.
�� 
Add
�� "
(
��" #
Guid
��# '
.
��' (
Parse
��( -
(
��- .
$str
��. T
)
��T U
)
��U V
;
��V W(
dynamicParentLeadAtributes
�� &
.
��& '
Add
��' *
(
��* +
$str
��+ ;
,
��; < 
listcontactypeGuid
��= O
.
��O P

ConvertAll
��P Z
(
��Z [
new
��[ ^
	Converter
��_ h
<
��h i
Guid
��i m
,
��m n
string
��o u
>
��u v
(
��v w
x
��w x
=>
��y {
x
��| }
.
��} ~
ToString��~ �
(��� �
)��� �
)��� �
)��� �
.��� �
ToArray��� �
(��� �
)��� �
)��� �
;��� �(
dynamicParentLeadAtributes
�� &
.
��& '
Add
��' *
(
��* +
$str
��+ ?
,
��? @ 
listMarketsSegment
��A S
.
��S T

ConvertAll
��T ^
(
��^ _
new
��_ b
	Converter
��c l
<
��l m
Guid
��m q
,
��q r
string
��s y
>
��y z
(
��z {
x
��{ |
=>
��} 
x��� �
.��� �
ToString��� �
(��� �
)��� �
)��� �
)��� �
.��� �
ToArray��� �
(��� �
)��� �
)��� �
;��� �(
dynamicParentLeadAtributes
�� &
.
��& '
Add
��' *
(
��* +
$str
��+ B
,
��B C$
listaBusinessDivisions
��D Z
.
��Z [

ConvertAll
��[ e
(
��e f
new
��f i
	Converter
��j s
<
��s t
Guid
��t x
,
��x y
string��z �
>��� �
(��� �
x��� �
=>��� �
x��� �
.��� �
ToString��� �
(��� �
)��� �
)��� �
)��� �
.��� �
ToArray��� �
(��� �
)��� �
)��� �
;��� �
return
�� (
dynamicParentLeadAtributes
�� -
;
��- .
}
�� 	
public
�� 
List
�� 
<
�� 
dynamic
�� 
>
�� !
ChildLeadAttributes
�� 0
(
��0 1
List
��1 5
<
��5 6 
ChildLeadAttribute
��6 H
>
��H I#
lstChildLeadAttribute
��J _
)
��_ `
{
�� 	
List
�� 
<
�� 
dynamic
�� 
>
�� %
listParentLeadAtributes
�� 1
=
��2 3
new
��4 7
List
��8 <
<
��< =
dynamic
��= D
>
��D E
(
��E F
)
��F G
;
��G H
var
�� (
dynamicParentLeadAtributes
�� *
=
��+ ,
new
��- 0
System
��1 7
.
��7 8
Dynamic
��8 ?
.
��? @
ExpandoObject
��@ M
(
��M N
)
��N O
as
��P R
IDictionary
��S ^
<
��^ _
string
��_ e
,
��e f
Object
��g m
>
��m n
;
��n o#
lstChildLeadAttribute
�� !
=
��" ##
lstChildLeadAttribute
��$ 9
.
��9 :
Where
��: ?
(
��? @
x
��@ A
=>
��B D
x
��E F
.
��F G
type
��G K
!=
��L N
$str
��O _
)
��_ `
.
��` a
ToList
��a g
(
��g h
)
��h i
;
��i j
foreach
�� 
(
�� 
var
�� 
Child
�� 
in
�� !#
lstChildLeadAttribute
��" 7
)
��7 8
{
�� 
List
�� 
<
�� 
Guid
�� 
>
��  
listcontactypeGuid
�� -
=
��. /
new
��0 3
List
��4 8
<
��8 9
Guid
��9 =
>
��= >
(
��> ?
)
��? @
;
��@ A(
dynamicParentLeadAtributes
�� *
=
��+ ,
new
��- 0
System
��1 7
.
��7 8
Dynamic
��8 ?
.
��? @
ExpandoObject
��@ M
(
��M N
)
��N O
as
��P R
IDictionary
��S ^
<
��^ _
string
��_ e
,
��e f
Object
��g m
>
��m n
;
��n o
foreach
�� 
(
�� 
PropertyInfo
�� %
propertyInfo
��& 2
in
��3 5
Child
��6 ;
.
��; <
GetType
��< C
(
��C D
)
��D E
.
��E F
GetProperties
��F S
(
��S T
)
��T U
)
��U V
{
�� 
var
�� 
name
�� 
=
�� 
propertyInfo
�� +
.
��+ ,
Name
��, 0
;
��0 1
var
�� 
value
�� 
=
�� 
propertyInfo
��  ,
.
��, -
GetValue
��- 5
(
��5 6
Child
��6 ;
,
��; <
null
��= A
)
��A B
;
��B C
if
�� 
(
�� 
value
�� 
!=
��  
null
��! %
&&
��& (
name
��) -
!=
��. 0
null
��1 5
)
��5 6
{
�� 
if
�� 
(
�� 
!
�� 
name
�� !
.
��! "
Contains
��" *
(
��* +
$str
��+ ;
)
��; <
)
��< =
{
�� (
dynamicParentLeadAtributes
�� 6
.
��6 7
Add
��7 :
(
��: ;
name
��; ?
,
��? @
value
��A F
)
��F G
;
��G H
}
�� 
else
�� 
{
�� 
if
�� 
(
��  
name
��  $
.
��$ %
Contains
��% -
(
��- .
$str
��. >
)
��> ?
)
��? @
{
��  
listcontactypeGuid
��  2
.
��2 3
Add
��3 6
(
��6 7
Guid
��7 ;
.
��; <
Parse
��< A
(
��A B
value
��B G
.
��G H
ToString
��H P
(
��P Q
)
��Q R
)
��R S
)
��S T
;
��T U
}
�� 
}
�� 
}
�� 
}
�� (
dynamicParentLeadAtributes
�� *
.
��* +
Add
��+ .
(
��. /
$str
��/ ?
,
��? @ 
listcontactypeGuid
��A S
.
��S T

ConvertAll
��T ^
(
��^ _
new
��_ b
	Converter
��c l
<
��l m
Guid
��m q
,
��q r
string
��s y
>
��y z
(
��z {
x
��{ |
=>
��} 
x��� �
.��� �
ToString��� �
(��� �
)��� �
)��� �
)��� �
.��� �
ToArray��� �
(��� �
)��� �
)��� �
;��� �%
listParentLeadAtributes
�� '
.
��' (
Add
��( +
(
��+ ,(
dynamicParentLeadAtributes
��, F
)
��F G
;
��G H
}
�� 
return
�� %
listParentLeadAtributes
�� *
;
��* +
}
�� 	
public
�� 
List
�� 
<
�� 
dynamic
�� 
>
�� 
	documents
�� &
(
��& '
List
��' +
<
��+ ,
Document
��, 4
>
��4 5
lstDocument
��6 A
)
��A B
{
�� 	
List
�� 
<
�� 
dynamic
�� 
>
�� 
listDocument
�� &
=
��' (
new
��) ,
List
��- 1
<
��1 2
dynamic
��2 9
>
��9 :
(
��: ;
)
��; <
;
��< =
var
�� 
dynamicDocument
�� 
=
��  !
new
��" %
System
��& ,
.
��, -
Dynamic
��- 4
.
��4 5
ExpandoObject
��5 B
(
��B C
)
��C D
as
��E G
IDictionary
��H S
<
��S T
string
��T Z
,
��Z [
Object
��\ b
>
��b c
;
��c d
foreach
�� 
(
�� 
var
�� 
document
�� !
in
��" $
lstDocument
��% 0
)
��0 1
{
�� 
dynamicDocument
�� 
=
��  !
new
��" %
System
��& ,
.
��, -
Dynamic
��- 4
.
��4 5
ExpandoObject
��5 B
(
��B C
)
��C D
as
��E G
IDictionary
��H S
<
��S T
string
��T Z
,
��Z [
Object
��\ b
>
��b c
;
��c d
foreach
�� 
(
�� 
PropertyInfo
�� %
propertyInfo
��& 2
in
��3 5
document
��6 >
.
��> ?
GetType
��? F
(
��F G
)
��G H
.
��H I
GetProperties
��I V
(
��V W
)
��W X
)
��X Y
{
�� 
var
�� 
name
�� 
=
�� 
propertyInfo
�� +
.
��+ ,
Name
��, 0
;
��0 1
var
�� 
value
�� 
=
�� 
propertyInfo
��  ,
.
��, -
GetValue
��- 5
(
��5 6
document
��6 >
,
��> ?
null
��@ D
)
��D E
;
��E F
if
�� 
(
�� 
value
�� 
!=
��  
null
��! %
&&
��& (
name
��) -
!=
��. 0
null
��1 5
)
��5 6
{
�� 
if
�� 
(
�� 
name
��  
==
��! #
$str
��$ .
)
��. /
{
�� 
byte
��  
[
��  !
]
��! "
	bytesData
��# ,
=
��- .
ObjectToByteArray
��/ @
(
��@ A
value
��A F
)
��F G
;
��G H
string
�� "
temp_inBase64
��# 0
=
��1 2
Convert
��3 :
.
��: ;
ToBase64String
��; I
(
��I J
	bytesData
��J S
)
��S T
;
��T U
dynamicDocument
�� +
.
��+ ,
Add
��, /
(
��/ 0
name
��0 4
,
��4 5
$str
��6 W
+
��X Y
temp_inBase64
��Z g
)
��g h
;
��h i
}
�� 
else
�� 
{
�� 
dynamicDocument
�� +
.
��+ ,
Add
��, /
(
��/ 0
name
��0 4
,
��4 5
value
��6 ;
)
��; <
;
��< =
}
�� 
}
�� 
}
�� 
listDocument
�� 
.
�� 
Add
��  
(
��  !
dynamicDocument
��! 0
)
��0 1
;
��1 2
}
�� 
return
�� 
listDocument
�� 
;
��  
}
�� 	
private
�� 
byte
�� 
[
�� 
]
�� 
ObjectToByteArray
�� (
(
��( )
object
��) /
obj
��0 3
)
��3 4
{
�� 	
if
�� 
(
�� 
obj
�� 
==
�� 
null
�� 
)
�� 
return
�� 
null
�� 
;
�� 
BinaryFormatter
�� 
bf
�� 
=
��  
new
��! $
BinaryFormatter
��% 4
(
��4 5
)
��5 6
;
��6 7
using
�� 
(
�� 
MemoryStream
�� 
ms
��  "
=
��# $
new
��% (
MemoryStream
��) 5
(
��5 6
)
��6 7
)
��7 8
{
�� 
bf
�� 
.
�� 
	Serialize
�� 
(
�� 
ms
�� 
,
��  
obj
��! $
)
��$ %
;
��% &
return
�� 
ms
�� 
.
�� 
ToArray
�� !
(
��! "
)
��" #
;
��# $
}
�� 
}
�� 	
public
�� 
StateResultSP
�� 

CreateLead
�� '
(
��' ( 
RequestCreateLeads
��( :
requestData
��; F
)
��F G
{
�� 	
var
�� 
createLeadRequest
�� !
=
��" #
new
��$ '
System
��( .
.
��. /
Dynamic
��/ 6
.
��6 7
ExpandoObject
��7 D
(
��D E
)
��E F
as
��G I
IDictionary
��J U
<
��U V
string
��V \
,
��\ ]
Object
��^ d
>
��d e
;
��e f
var
�� 

requestLog
�� 
=
�� 
new
��  
System
��! '
.
��' (
Dynamic
��( /
.
��/ 0
ExpandoObject
��0 =
(
��= >
)
��> ?
as
��@ B
IDictionary
��C N
<
��N O
string
��O U
,
��U V
Object
��W ]
>
��] ^
;
��^ _
createLeadRequest
�� 
.
�� 
Add
�� !
(
��! "
$str
��" 8
,
��8 9!
ParentLeadAtributes
��: M
(
��M N
requestData
��N Y
.
��Y Z"
parentLead_atributes
��Z n
,
��n o
requestData
��p {
.
��{ |#
childLead_attributes��| �
)��� �
)��� �
;��� �

requestLog
�� 
.
�� 
Add
�� 
(
�� 
$str
�� 1
,
��1 2!
ParentLeadAtributes
��3 F
(
��F G
requestData
��G R
.
��R S"
parentLead_atributes
��S g
,
��g h
requestData
��i t
.
��t u#
childLead_attributes��u �
)��� �
)��� �
;��� �
if
�� 
(
�� 
requestData
�� 
.
�� "
childLead_attributes
�� 0
.
��0 1
Count
��1 6
>
��7 8
$num
��9 :
)
��: ;
{
�� 
createLeadRequest
�� !
.
��! "
Add
��" %
(
��% &
$str
��& <
,
��< =!
ChildLeadAttributes
��> Q
(
��Q R
requestData
��R ]
.
��] ^"
childLead_attributes
��^ r
)
��r s
)
��s t
;
��t u

requestLog
�� 
.
�� 
Add
�� 
(
�� 
$str
�� 5
,
��5 6!
ChildLeadAttributes
��7 J
(
��J K
requestData
��K V
.
��V W"
childLead_attributes
��W k
)
��k l
)
��l m
;
��m n
}
�� 
createLeadRequest
�� 
.
�� 
Add
�� !
(
��! "
$str
��" -
,
��- .
	documents
��/ 8
(
��8 9
requestData
��9 D
.
��D E
	documents
��E N
)
��N O
)
��O P
;
��P Q
ResponseMulesoft
�� !
ResponseMulesoftobj
�� 0
=
��1 2 
MulesoftProcessApi
��3 E
.
��E F

CreateLead
��F P
(
��P Q
createLeadRequest
��Q b
,
��b c
requestData
��d o
.
��o p#
parentLead_atributes��p �
.��� �
ownerid��� �
)��� �
;��� �
StateResultSP
�� 
stateResult
�� %
=
��& '
new
��( +
StateResultSP
��, 9
(
��9 :
)
��: ;
;
��; <
var
�� 
jobject
�� 
=
�� 
new
�� 
JObject
�� %
(
��% &
)
��& '
;
��' (
var
�� 
jsonData
�� 
=
�� 
JsonConvert
�� &
.
��& '
SerializeObject
��' 6
(
��6 7

requestLog
��7 A
)
��A B
;
��B C
if
�� 
(
�� !
ResponseMulesoftobj
�� #
.
��# $
response
��$ ,
.
��, -

StatusCode
��- 7
!=
��8 :
System
��; A
.
��A B
Net
��B E
.
��E F
HttpStatusCode
��F T
.
��T U
OK
��U W
)
��W X
{
�� 
}
�� 
else
�� 
{
�� 
if
�� 
(
�� 
!
�� 
String
�� 
.
�� 
IsNullOrEmpty
�� )
(
��) *!
ResponseMulesoftobj
��* =
.
��= >
resultContent
��> K
)
��K L
)
��L M
{
�� 
jobject
�� 
=
�� 
JObject
�� %
.
��% &
Parse
��& +
(
��+ ,!
ResponseMulesoftobj
��, ?
.
��? @
resultContent
��@ M
)
��M N
;
��N O
}
�� 
else
�� 
{
�� 
jobject
�� 
=
�� 
null
�� "
;
��" #
}
�� 
}
�� 
if
�� 
(
�� 
jobject
�� 
[
�� 
$str
��  
]
��  !
?
��! "
.
��" #
ToString
��# +
(
��+ ,
)
��, -
==
��. 0
$str
��1 :
)
��: ;
{
�� 
stateResult
�� 
.
�� 
Success
�� #
=
��$ %
true
��& *
;
��* +
}
�� 
else
�� 
{
�� 
stateResult
�� 
.
�� 
Success
�� #
=
��$ %
false
��& +
;
��+ ,
}
�� 
return
�� 
stateResult
�� 
;
�� 
}
�� 	
public
�� 
StateResultSP
�� 
CreateLeadXUS
�� *
(
��* +

RequestXUS
��+ 5
requestData
��6 A
)
��A B
{
�� 	
StateResultSP
�� 
stateResultSP
�� '
=
��( )
new
��* -
StateResultSP
��. ;
(
��; <
)
��< =
;
��= >
var
�� 
createLeadRequest
�� !
=
��" #
new
��$ '
System
��( .
.
��. /
Dynamic
��/ 6
.
��6 7
ExpandoObject
��7 D
(
��D E
)
��E F
as
��G I
IDictionary
��J U
<
��U V
string
��V \
,
��\ ]
Object
��^ d
>
��d e
;
��e f
createLeadRequest
�� 
.
�� 
Add
�� !
(
��! "
$str
��" 8
,
��8 9'
CreateParentLeadAtributes
��: S
(
��S T
requestData
��T _
)
��_ `
)
��` a
;
��a b
ResponseMulesoft
�� !
ResponseMulesoftobj
�� 0
=
��1 2 
MulesoftProcessApi
��3 E
.
��E F
CreateLeadXUS
��F S
(
��S T
createLeadRequest
��T e
,
��e f
$str
��g l
)
��l m
;
��m n
var
�� 
jobject
�� 
=
�� 
new
�� 
JObject
�� %
(
��% &
)
��& '
;
��' (
jobject
�� 
=
�� 
JObject
�� 
.
�� 
Parse
�� #
(
��# $!
ResponseMulesoftobj
��$ 7
.
��7 8
resultContent
��8 E
)
��E F
;
��F G
if
�� 
(
�� 
jobject
�� 
[
�� 
$str
��  
]
��  !
?
��! "
.
��" #
ToString
��# +
(
��+ ,
)
��, -
==
��. 0
$str
��1 :
)
��: ;
{
�� 
stateResultSP
�� 
.
�� 
Success
�� %
=
��& '
true
��( ,
;
��, -
}
�� 
else
�� 
{
�� 
stateResultSP
�� 
.
�� 
Success
�� %
=
��& '
false
��( -
;
��- .
}
�� 
return
�� 
stateResultSP
��  
;
��  !
}
�� 	
public
�� 
byte
�� 
[
�� 
]
�� 
StringToBytes
�� #
(
��# $
String
��$ *
cadena
��+ 1
)
��1 2
{
�� 	
System
�� 
.
�� 
Text
�� 
.
�� 
ASCIIEncoding
�� %
codificador
��& 1
=
��2 3
new
��4 7
System
��8 >
.
��> ?
Text
��? C
.
��C D
ASCIIEncoding
��D Q
(
��Q R
)
��R S
;
��S T
return
�� 
codificador
�� 
.
�� 
GetBytes
�� '
(
��' (
cadena
��( .
)
��. /
;
��/ 0
}
�� 	
public
�� 
StateResultSP
�� 
leadExistence
�� *
(
��* +
LeadExistence
��+ 8
leadExistence
��9 F
)
��F G
{
�� 	
StateResultSP
�� 
stateResult
�� %
=
��& '
new
��( +
StateResultSP
��, 9
(
��9 :
)
��: ;
;
��; <
var
�� 
response
�� 
=
��  
MulesoftProcessApi
�� -
.
��- .
leadExistence
��. ;
(
��; <
leadExistence
��< I
)
��I J
;
��J K
var
�� 
jObjectResponse
�� 
=
��  !
JObject
��" )
.
��) *
Parse
��* /
(
��/ 0
response
��0 8
)
��8 9
;
��9 :
var
�� 
status
�� 
=
�� 
jObjectResponse
�� (
[
��( )
$str
��) 1
]
��1 2
.
��2 3
ToString
��3 ;
(
��; <
)
��< =
;
��= >
if
�� 
(
�� 
status
�� 
==
�� 
$str
�� #
)
��# $
{
�� 
var
�� 
responseLead
��  
=
��! "
JsonConvert
��# .
.
��. /
DeserializeObject
��/ @
<
��@ A#
LeadExistenceResponse
��A V
>
��V W
(
��W X
response
��X `
)
��` a
;
��a b
string
�� 
message
�� 
=
��  
$str
��! #
;
��# $
if
�� 
(
�� 
leadExistence
�� !
.
��! "
emailaddress1
��" /
!=
��0 2
$str
��3 5
||
��6 8
leadExistence
��9 F
.
��F G
emailaddress2
��G T
!=
��U W
$str
��X Z
)
��Z [
{
�� 
message
�� 
=
�� 
MessageEmail
�� *
(
��* +
responseLead
��+ 7
)
��7 8
;
��8 9
}
�� 
if
�� 
(
�� 
leadExistence
�� !
.
��! "&
ph_companyidentification
��" :
!=
��; =
$str
��> @
||
��A C
leadExistence
��D Q
.
��Q R
ph_identification
��R c
!=
��d f
$str
��g i
)
��i j
{
�� 
message
�� 
=
�� 
MessageDocument
�� -
(
��- .
responseLead
��. :
)
��: ;
;
��; <
}
�� 
stateResult
�� 
.
�� 
Message
�� #
=
��$ %
message
��& -
;
��- .
stateResult
�� 
.
�� 
Success
�� #
=
��$ %
true
��& *
;
��* +
}
�� 
else
�� 
{
�� 
stateResult
�� 
.
�� 
Success
�� #
=
��$ %
false
��& +
;
��+ ,
}
�� 
return
�� 
stateResult
�� 
;
�� 
}
�� 	
public
�� 
static
�� 
string
�� 
MessageDocument
�� ,
(
��, -#
LeadExistenceResponse
��- B
responseLead
��C O
)
��O P
{
�� 	
List
�� 
<
�� 
Datum
�� 
>
�� 
	arrayData
�� !
=
��" #
new
��$ '
List
��( ,
<
��, -
Datum
��- 2
>
��2 3
(
��3 4
)
��4 5
;
��5 6
string
�� 
message
�� 
=
�� 
$str
�� 
;
��  
int
�� 

cantEntity
�� 
=
�� 
responseLead
�� )
.
��) *
data
��* .
.
��. /
Count
��/ 4
(
��4 5
)
��5 6
;
��6 7
foreach
�� 
(
�� 
var
�� 
item
�� 
in
��  
responseLead
��! -
.
��- .
data
��. 2
)
��2 3
{
�� 
	arrayData
�� 
.
�� 
Add
�� 
(
�� 
item
�� "
)
��" #
;
��# $
}
�� 
switch
�� 
(
�� 

cantEntity
�� 
)
�� 
{
�� 
case
�� 
$num
�� 
:
�� 
string
�� 
entity
�� !
=
��" #
responseLead
��$ 0
.
��0 1
data
��1 5
[
��5 6
$num
��6 7
]
��7 8
.
��8 9
message
��9 @
.
��@ A
ToString
��A I
(
��I J
)
��J K
;
��K L
if
�� 
(
�� 
entity
�� 
.
�� 
Contains
�� '
(
��' (
$str
��( 1
)
��1 2
||
��3 5
entity
��6 <
.
��< =
Contains
��= E
(
��E F
$str
��F O
)
��O P
)
��P Q
{
�� 
message
�� 
=
��  !
Resource
��" *
.
��* +
Lead
��+ /
.
��/ 0
ResourceManager
��0 ?
.
��? @
	GetString
��@ I
(
��I J
$str
��J k
)
��k l
;
��l m
}
�� 
else
�� 
if
�� 
(
�� 
entity
�� #
.
��# $
Contains
��$ ,
(
��, -
$str
��- 3
)
��3 4
)
��4 5
{
�� 
message
�� 
=
��  !
Resource
��" *
.
��* +
Lead
��+ /
.
��/ 0
ResourceManager
��0 ?
.
��? @
	GetString
��@ I
(
��I J
$str
��J a
)
��a b
;
��b c
}
�� 
break
�� 
;
�� 
case
�� 
$num
�� 
:
�� 
foreach
�� 
(
�� 
var
��  
item
��! %
in
��& (
	arrayData
��) 2
)
��2 3
{
�� 
string
�� 

entityType
�� )
=
��* +
item
��, 0
.
��0 1
message
��1 8
;
��8 9
if
�� 
(
�� 

entityType
�� &
.
��& '
Contains
��' /
(
��/ 0
$str
��0 6
)
��6 7
)
��7 8
{
�� 
message
�� #
=
��$ %
Resource
��& .
.
��. /
Lead
��/ 3
.
��3 4
ResourceManager
��4 C
.
��C D
	GetString
��D M
(
��M N
$str
��N e
)
��e f
;
��f g
}
�� 
else
�� 
if
�� 
(
��  !

entityType
��! +
.
��+ ,
Contains
��, 4
(
��4 5
$str
��5 >
)
��> ?
||
��@ B

entityType
��C M
.
��M N
Contains
��N V
(
��V W
$str
��W `
)
��` a
)
��a b
{
�� 
message
�� #
=
��$ %
Resource
��& .
.
��. /
Lead
��/ 3
.
��3 4
ResourceManager
��4 C
.
��C D
	GetString
��D M
(
��M N
$str
��N o
)
��o p
;
��p q
}
�� 
}
�� 
break
�� 
;
�� 
case
�� 
$num
�� 
:
�� 
message
�� 
=
�� 
Resource
�� &
.
��& '
Lead
��' +
.
��+ ,
ResourceManager
��, ;
.
��; <
	GetString
��< E
(
��E F
$str
��F g
)
��g h
;
��h i
break
�� 
;
�� 
default
�� 
:
�� 
break
�� 
;
�� 
}
�� 
return
�� 
message
�� 
;
�� 
}
�� 	
public
�� 
static
�� 
string
�� 
MessageEmail
�� )
(
��) *#
LeadExistenceResponse
��* ?
responseLead
��@ L
)
��L M
{
�� 	
List
�� 
<
�� 
Datum
�� 
>
�� 
	arrayData
�� !
=
��" #
new
��$ '
List
��( ,
<
��, -
Datum
��- 2
>
��2 3
(
��3 4
)
��4 5
;
��5 6
string
�� 
message
�� 
=
�� 
$str
�� 
;
��  
int
�� 

cantEntity
�� 
=
�� 
responseLead
�� )
.
��) *
data
��* .
.
��. /
Count
��/ 4
(
��4 5
)
��5 6
;
��6 7
foreach
�� 
(
�� 
var
�� 
item
�� 
in
��  
responseLead
��! -
.
��- .
data
��. 2
)
��2 3
{
�� 
	arrayData
�� 
.
�� 
Add
�� 
(
�� 
item
�� "
)
��" #
;
��# $
}
�� 
switch
�� 
(
�� 

cantEntity
�� 
)
�� 
{
�� 
case
�� 
$num
�� 
:
�� 
string
�� 
entity
�� !
=
��" #
responseLead
��$ 0
.
��0 1
data
��1 5
[
��5 6
$num
��6 7
]
��7 8
.
��8 9
message
��9 @
.
��@ A
ToString
��A I
(
��I J
)
��J K
;
��K L
if
�� 
(
�� 
entity
�� 
.
�� 
Contains
�� '
(
��' (
$str
��( 1
)
��1 2
||
��3 5
entity
��6 <
.
��< =
Contains
��= E
(
��E F
$str
��F O
)
��O P
)
��P Q
{
�� 
message
�� 
=
��  !
Resource
��" *
.
��* +
Lead
��+ /
.
��/ 0
ResourceManager
��0 ?
.
��? @
	GetString
��@ I
(
��I J
$str
��J h
)
��h i
;
��i j
message
�� 
=
��  !
message
��" )
+
��* +
$str
��, 6
;
��6 7
}
�� 
else
�� 
if
�� 
(
�� 
entity
�� #
.
��# $
Contains
��$ ,
(
��, -
$str
��- 3
)
��3 4
)
��4 5
{
�� 
message
�� 
=
��  !
Resource
��" *
.
��* +
Lead
��+ /
.
��/ 0
ResourceManager
��0 ?
.
��? @
	GetString
��@ I
(
��I J
$str
��J ^
)
��^ _
;
��_ `
message
�� 
=
��  !
message
��" )
+
��* +
$str
��, 3
;
��3 4
}
�� 
break
�� 
;
�� 
case
�� 
$num
�� 
:
�� 
foreach
�� 
(
�� 
var
��  
item
��! %
in
��& (
	arrayData
��) 2
)
��2 3
{
�� 
string
�� 

entityType
�� )
=
��* +
item
��, 0
.
��0 1
message
��1 8
;
��8 9
if
�� 
(
�� 

entityType
�� &
.
��& '
Contains
��' /
(
��/ 0
$str
��0 6
)
��6 7
)
��7 8
{
�� 
message
�� #
=
��$ %
Resource
��& .
.
��. /
Lead
��/ 3
.
��3 4
ResourceManager
��4 C
.
��C D
	GetString
��D M
(
��M N
$str
��N b
)
��b c
;
��c d
message
�� #
=
��$ %
message
��& -
+
��. /
$str
��0 7
;
��7 8
}
�� 
else
�� 
if
�� 
(
��  !

entityType
��! +
.
��+ ,
Contains
��, 4
(
��4 5
$str
��5 >
)
��> ?
||
��@ B

entityType
��C M
.
��M N
Contains
��N V
(
��V W
$str
��W `
)
��` a
)
��a b
{
�� 
message
�� #
=
��$ %
Resource
��& .
.
��. /
Lead
��/ 3
.
��3 4
ResourceManager
��4 C
.
��C D
	GetString
��D M
(
��M N
$str
��N l
)
��l m
;
��m n
message
�� #
=
��$ %
message
��& -
+
��. /
$str
��0 :
;
��: ;
}
�� 
}
�� 
break
�� 
;
�� 
case
�� 
$num
�� 
:
�� 
message
�� 
=
�� 
Resource
�� &
.
��& '
Lead
��' +
.
��+ ,
ResourceManager
��, ;
.
��; <
	GetString
��< E
(
��E F
$str
��F d
)
��d e
;
��e f
message
�� 
=
�� 
message
�� %
+
��& '
$str
��( 2
;
��2 3
break
�� 
;
�� 
default
�� 
:
�� 
break
�� 
;
�� 
}
�� 
return
�� 
message
�� 
;
�� 
}
�� 	
}
�� 
}�� �"
CC:\Users\jaria304\source\repos\CRMLeadForm\BLL\NavigationMenuBLL.cs
	namespace

 	
BLL


 
{ 
public 

class 
NavigationMenuBLL "
{ 
public 
ICollection 
< #
NavigationMenuViewModel 2
>2 3
GetMenu4 ;
(; <
MenuType< D
menuTypeE M
)M N
{ 	
var 
	dalObject 
= 
new 
NavigationMenuDAL  1
(1 2
)2 3
;3 4
var 
queryResults 
= 
	dalObject (
.( )
GetNavigationMenu) :
(: ;
menuType; C
)C D
;D E
var 
menu 
= 1
%CreateMenuViewModelFromNavigationMenu <
(< =
queryResults= I
.I J
ListResultsJ U
)U V
;V W
return 
menu 
; 
} 	
public 
IEnumerable 
< 
NavigationMenu )
>) *
GetOptionsMenu+ 9
(9 :
MenuType: B
menuTypeC K
)K L
{ 	
var 
	dalObject 
= 
new 
NavigationMenuDAL  1
(1 2
)2 3
;3 4
return 
( 
IEnumerable 
<  
NavigationMenu  .
>. /
)/ 0
	dalObject0 9
.9 :
GetNavigationMenu: K
(K L
menuTypeL T
)T U
.U V
ListResultsV a
;a b
} 	
public #
NavigationMenuViewModel &
CreateViewModelItem' :
(: ;
NavigationMenu; I
currentJ Q
)Q R
{ 	
var 
newItem 
= 
new #
NavigationMenuViewModel 5
{   
	IdRecurso!! 
=!! 
current!! #
.!!# $
	IdRecurso!!$ -
,!!- .
Text"" 
="" 
current"" 
."" 
Texto"" $
,""$ %
Action## 
=## 
current##  
.##  !
Accion##! '
,##' (
Children$$ 
=$$ 
new$$ 
List$$ #
<$$# $#
NavigationMenuViewModel$$$ ;
>$$; <
($$< =
)$$= >
,$$> ?

Controller%% 
=%% 
current%% $
.%%$ %
Controlador%%% 0
,%%0 1
Icon&& 
=&& 
current&& 
.&& 
Icono&& $
}'' 
;'' 
return(( 
newItem(( 
;(( 
})) 	
public-- 
ICollection-- 
<-- #
NavigationMenuViewModel-- 2
>--2 31
%CreateMenuViewModelFromNavigationMenu.. 1
(..1 2
IEnumerable// 
<// 
NavigationMenu// *
>//* +
navMenu//, 3
,//3 4
int00 
?00 
rootId00 
=00 
null00 "
)00" #
{11 	
var22 
Items22 
=22 
navMenu33 
.33 
Where44 
(44 
item44 
=>44 
item44 "
.44" #
IdPadre44# *
==44+ -
rootId44. 4
)444 5
.445 6
OrderBy55 
(55 
item55 
=>55 
item55  $
.55$ %
OrdenRenderizado55% 5
)555 6
.556 7
Select66 
(66 
current66 
=>66 !
{77 
var88 
newItem88 
=88  !
CreateViewModelItem88" 5
(885 6
current886 =
)88= >
;88> ?
newItem99 
.99 
Children99 $
=99% &1
%CreateMenuViewModelFromNavigationMenu99' L
(99L M
navMenu99M T
,99T U
current99V ]
.99] ^
Id99^ `
)99` a
;99a b
return:: 
newItem:: "
;::" #
};; 
);; 
.;; 
ToList<< 
(<< 
)<< 
;<< 
return>> 
Items>> 
;>> 
}?? 	
}@@ 
}AA �
IC:\Users\jaria304\source\repos\CRMLeadForm\BLL\Properties\AssemblyInfo.cs
[ 
assembly 	
:	 

AssemblyTitle 
( 
$str 
) 
]  
[		 
assembly		 	
:			 

AssemblyDescription		 
(		 
$str		 !
)		! "
]		" #
[

 
assembly

 	
:

	 
!
AssemblyConfiguration

  
(

  !
$str

! #
)

# $
]

$ %
[ 
assembly 	
:	 

AssemblyCompany 
( 
$str 
) 
] 
[ 
assembly 	
:	 

AssemblyProduct 
( 
$str  
)  !
]! "
[ 
assembly 	
:	 

AssemblyCopyright 
( 
$str 0
)0 1
]1 2
[ 
assembly 	
:	 

AssemblyTrademark 
( 
$str 
)  
]  !
[ 
assembly 	
:	 

AssemblyCulture 
( 
$str 
) 
] 
[ 
assembly 	
:	 


ComVisible 
( 
false 
) 
] 
[ 
assembly 	
:	 

Guid 
( 
$str 6
)6 7
]7 8
[## 
assembly## 	
:##	 

AssemblyVersion## 
(## 
$str## $
)##$ %
]##% &
[$$ 
assembly$$ 	
:$$	 

AssemblyFileVersion$$ 
($$ 
$str$$ (
)$$( )
]$$) *�-
EC:\Users\jaria304\source\repos\CRMLeadForm\BLL\SettingsCustomerBLL.cs
	namespace 	
BLL
 
{ 
public 
class	 
SettingsCustomerBLL "
{ 
public 
%
SettingsCustomerViewModel $
GetCustomerById% 4
(4 5
string5 ;

customerId< F
)F G
{ 
var 	
result
 
= 
new 
SettingsCustomerDAL *
(* +
)+ ,
., -
GetCustomerById- <
(< =

customerId= G
,G H
OptionsSettingsI X
.X Y
CatalogY `
.` a
GetDescriptiona o
(o p
)p q
)q r
;r s
return 
new %
SettingsCustomerViewModel *
{ 
Customer 
= 
result 
. 
ListResults %
.% &
FirstOrDefault& 4
(4 5
)5 6
} 
; 
} 
public 

StateResultSP 
UpdateToken $
($ %
string% +

customerId, 6
,6 7
	TypeToken8 A
	typeTokenB K
,K L
outM P
GuidQ U
tokenV [
)[ \
{ 
token   
=   
Guid   
.   
NewGuid   
(   
)   
;   
return!! 
new!! 
SettingsCustomerDAL!! $
(!!$ %
)!!% &
.!!& '
UpdateToken!!' 2
(!!2 3
token!!3 8
,!!8 9

customerId!!: D
,!!D E
	typeToken!!F O
)!!O P
;!!P Q
}"" 
public$$ 

CRMLeadObjects$$ 
.$$ 
DTO$$ 
.$$ 
	IWSPortal$$ '
.$$' (
SPQueryResult$$( 5
<$$5 6
CRMLeadObjects$$6 D
.$$D E
DTO$$E H
.$$H I
	IWSPortal$$I R
.$$R S
SettingsOptions$$S b
.$$b c
SettingsOptionModel$$c v
>$$v w-
 GetSettingsOptionsProductCatalog	$$x �
(
$$� �
)
$$� �
{%% 
return&& 
new&& 
SettingsCustomerDAL&& $
(&&$ %
)&&% &
.&&& '"
GetSettingsOptionsById&&' =
(&&= >
OptionsSettings&&> M
.&&M N
Catalog&&N U
.&&U V
GetDescription&&V d
(&&d e
)&&e f
)&&f g
;&&g h
}'' 
public)) 

StateResultSP)) "
UpdateCustomerSettings)) /
())/ 0
CRMLeadObjects))0 >
.))> ?
DTO))? B
.))B C
	IWSPortal))C L
.))L M
SettingsCustomer))M ]
.))] ^!
CustomerSettingsModel))^ s
customerSettings	))t �
)
))� �
{** 
return++ 
new++ 
SettingsCustomerDAL++ $
(++$ %
)++% &
.++& '"
UpdateCustomerSettings++' =
(++= >
customerSettings++> N
)++N O
;++O P
},, 
public.. 

List.. 
<.. !
CustomerSettingsModel.. %
>..% &
GetCustomerSettings..' :
(..: ;
string..; A

customerId..B L
)..L M
{// 
string00 
configSetting00 
=00  
ConfigurationManager00 1
.001 2
AppSettings002 =
.00= >
Get00> A
(00A B
$str00B Q
)00Q R
;00R S
var11 	
result11
 
=11 
new11 
SettingsCustomerDAL11 *
(11* +
)11+ ,
.11, -
GetCustomerSettings11- @
(11@ A

customerId11A K
,11K L
configSetting11M Z
)11Z [
;11[ \
return22 
result22 
.22 
ListResults22 
;22  
}33 
private44 
string44 
CustomerKeysSetting44 &
(44& '
)44' (
{55 
string77 
[77 
]77 
	settarray77 
=77  
ConfigurationManager77 /
.77/ 0
AppSettings770 ;
.77; <
Get77< ?
(77? @
$str77@ O
)77O P
.77P Q
Split77Q V
(77V W
$char77W Z
)77Z [
;77[ \
string88 

settingIds88 
=88 
$str88 
;88 
foreach99 
(99 
string99 
elm99 
in99 
	settarray99 &
)99& '
{:: 

settingIds;; 
+=;; 
$str;; 
+;; 
elm;; 
+;;  !
$str;;" &
;;;& '
}<< 
return>> 

settingIds>> 
.>> 
	Substring>> !
(>>! "
$num>>" #
,>># $

settingIds>>% /
.>>/ 0
Length>>0 6
->>7 8
$num>>9 :
)>>: ;
;>>; <
}?? 
publicAA 


DictionaryAA 
<AA 
stringAA 
,AA 
stringAA $
>AA$ %
SetDictSettingsAA& 5
(AA5 6
ListAA6 :
<AA: ;!
CustomerSettingsModelAA; P
>AAP Q"
customerSettingsModelsAAR h
)AAh i
{BB 
returnCC "
customerSettingsModelsCC #
.CC# $
ToDictionaryCC$ 0
(CC0 1
xCC1 2
=>CC3 5
xCC6 7
.CC7 8
	SettingIdCC8 A
,CCA B
xCCC D
=>CCE G
xCCH I
.CCI J
ValueCCJ O
)CCO P
;CCP Q
}DD 
}EE 
}FF �O
:C:\Users\jaria304\source\repos\CRMLeadForm\BLL\UserInfo.cs
	namespace 	
BLL
 
{ 
public 

class 
UserInfo 
{ 
DAL 
. 
TraxUser 
Get 
= 
new 
DAL "
." #
TraxUser# +
(+ ,
), -
;- .
WSTraxProdClass 
trax 
= 
new "
WSTraxProdClass# 2
(2 3
)3 4
;4 5
public 
LoginResponse 
Login "
(" #
Login# (
login) .
). /
{ 	
try 
{ 
var 
res 
= 
trax 
. 
Login $
($ %
login% *
.* +
User+ /
,/ 0
login1 6
.6 7
Password7 ?
)? @
.@ A
login2_resultsA O
;O P
if 
( 
res 
. 
wsResult  
[  !
$num! "
]" #
.# $
ErrorNo$ +
==, .
$num/ 0
)0 1
{ 
CRMLeadObjects "
." #
DTO# &
.& '
TraxUser' /
./ 0
UserInfo0 8
UserData9 A
=B C
GetUserD K
(K L
loginL Q
.Q R
UserR V
)V W
;W X
return   
new   
LoginResponse   ,
(  , -
$num  - .
,  . /
res  0 3
.  3 4
Login  4 9
[  9 :
$num  : ;
]  ; <
.  < =
	SessionId  = F
.  F G
ToString  G O
(  O P
)  P Q
,  Q R
UserData  S [
)  [ \
;  \ ]
}!! 
else"" 
{## 
return$$ 
new$$ 
LoginResponse$$ ,
($$, -
res$$- 0
.$$0 1
wsResult$$1 9
[$$9 :
$num$$: ;
]$$; <
.$$< =
ErrorNo$$= D
,$$D E
Error$$F K
:$$K L
res$$M P
.$$P Q
wsResult$$Q Y
[$$Y Z
$num$$Z [
]$$[ \
.$$\ ]
Description$$] h
.$$h i
ToString$$i q
($$q r
)$$r s
)$$s t
;$$t u
}%% 
}&& 
catch'' 
('' 
TimeoutException'' #
e''$ %
)''% &
{(( 
return)) 
new)) 
LoginResponse)) (
())( )
$num))) ,
,)), -
Error)). 3
:))3 4
e))5 6
.))6 7
Message))7 >
)))> ?
;))? @
}** 
catch++ 
(++ 
	Exception++ 
e++ 
)++ 
{,, 
return-- 
new-- 
LoginResponse-- (
(--( )
$num--) ,
,--, -
Error--. 3
:--3 4
e--5 6
.--6 7
Message--7 >
)--> ?
;--? @
}.. 
}// 	
public11 
CRMLeadObjects11 
.11 
DTO11 !
.11! "
TraxUser11" *
.11* +
UserInfo11+ 3
GetUser114 ;
(11; <
string11< B
Id11C E
)11E F
{22 	
var33 
responseGetWebuser33 "
=33# $
trax33% )
.33) *

getWebuser33* 4
(334 5
Id335 7
)337 8
.338 9
UserInfo339 A
?33A B
.33B C
FirstOrDefault33C Q
(33Q R
)33R S
;33S T
return44 
new44 
CRMLeadObjects44 %
.44% &
DTO44& )
.44) *
TraxUser44* 2
.442 3
UserInfo443 ;
(44; <
responseGetWebuser44< N
.44N O
USER_ID44O V
,44V W
responseGetWebuser44X j
.44j k
e_mail44k q
,44q r
responseGetWebuser	44s �
.
44� �
custid
44� �
,
44� � 
responseGetWebuser
44� �
.
44� �
NAME
44� �
,
44� �
(
44� �
bool
44� �
)
44� � 
responseGetWebuser
44� �
.
44� �
ACTIVE
44� �
,
44� �
(
44� �
bool
44� �
)
44� � 
responseGetWebuser
44� �
.
44� �
admin
44� �
)
44� �
;
44� �
}55 	
public77 
string77 
getprafs31sd77 "
(77" #
string77# )

localRecno77* 4
,774 5
string776 <
sesionId77= E
)77E F
{88 	
return99 
trax99 
.99 
getprafs31sd99 $
(99$ %

localRecno99% /
,99/ 0
sesionId991 9
)999 :
;99: ;
}:: 	
public;; 
UserActiveDirectory;; "
SignActiveDirectory;;# 6
(;;6 7
Login;;7 <
objLogin;;= E
,;;E F
string;;G M
group;;N S
,;;S T
ref;;U X
string;;Y _
error;;` e
);;e f
{<< 	
UserActiveDirectory== "
objUserActiveDirectory==  6
===7 8
null==9 =
;=== >
string>> 
urlActiveDirectory>> %
=>>& ' 
ConfigurationManager>>( <
.>>< =
AppSettings>>= H
[>>H I
$str>>I ]
]>>] ^
;>>^ _
if?? 
(?? 
string?? 
.?? 
IsNullOrEmpty?? $
(??$ %
urlActiveDirectory??% 7
)??7 8
||??9 ;
string??< B
.??B C
IsNullOrEmpty??C P
(??P Q
group??Q V
)??V W
)??W X
throw@@ 
new@@ !
ArgumentNullException@@ /
(@@/ 0
$str@@0 O
)@@O P
;@@P Q%
ActiveDirectoryConnectionBB %(
objActiveDirectoryConnectionBB& B
=BBC D
newBBE H%
ActiveDirectoryConnectionBBI b
(BBb c
urlActiveDirectoryBBc u
)BBu v
;BBv w
varDD 
	loginUserDD 
=DD (
objActiveDirectoryConnectionDD 8
.DD8 9
GetUserDD9 @
(DD@ A
objLoginDDA I
.DDI J
UserDDJ N
,DDN O
objLoginDDP X
.DDX Y
PasswordDDY a
,DDa b
refDDc f
errorDDg l
)DDl m
;DDm n
ifEE 
(EE 
!EE 
stringEE 
.EE 
IsNullOrEmptyEE %
(EE% &
errorEE& +
)EE+ ,
)EE, -
{FF 
errorGG 
=GG 
errorGG 
.GG 
EqualsGG $
(GG$ %
$strGG% 2
)GG2 3
?GG4 5
ResorcesGG6 >
.GG> ?
AccountGG? F
.GGF G
LoginGGG L
.GGL M
UserOrPassWordGGM [
:GG\ ]
ResorcesGG^ f
.GGf g
GeneralGGg n
.GGn o
GeneralGGo v
.GGv w
GeneralError	GGw �
;
GG� �
returnHH 
nullHH 
;HH 
}II 
ifKK 
(KK 
!KK 
stringKK 
.KK 
IsNullOrEmptyKK %
(KK% &
	loginUserKK& /
)KK/ 0
)KK0 1
{LL 
varMM 
groupsMM 
=MM (
objActiveDirectoryConnectionMM 9
.MM9 :
	GetGroupsMM: C
(MMC D
	loginUserMMD M
,MMM N
objLoginMMO W
.MMW X
UserMMX \
,MM\ ]
objLoginMM^ f
.MMf g
PasswordMMg o
,MMo p
groupMMq v
)MMv w
;MMw x
ifNN 
(NN 
!NN 
stringNN 
.NN 
IsNullOrEmptyNN )
(NN) *
groupsNN* 0
)NN0 1
)NN1 2
{OO "
objUserActiveDirectoryPP *
=PP+ ,
newPP- 0
UserActiveDirectoryPP1 D
{QQ 
UserNameRR  
=RR! "
	loginUserRR# ,
,RR, -
GroupsSS 
=SS  
groupsSS! '
,SS' (
UserTT 
=TT 
objLoginTT '
.TT' (
UserTT( ,
}UU 
;UU 
}VV 
elseWW 
{XX 
errorYY 
=YY 
ResorcesYY $
.YY$ %
AccountYY% ,
.YY, -
LoginYY- 2
.YY2 3
ErrorAccessDeniedYY3 D
;YYD E
}ZZ 
}[[ 
return^^ "
objUserActiveDirectory^^ )
;^^) *
}__ 	
publicaa 
CRMLeadObjectsaa 
.aa 
DTOaa !
.aa! "
TraxUseraa" *
.aa* +
UserInfoaa+ 3!
GetCustomerByUserNameaa4 I
(aaI J
stringaaJ P
userNameaaQ Y
)aaY Z
{bb 	
returncc 
GetUsercc 
(cc 
userNamecc #
)cc# $
;cc$ %
}dd 	
publicee 
CRMLeadObjectsee 
.ee 
DTOee !
.ee! "
TraxUseree" *
.ee* +
TraxUseree+ 3
GetInfoTraxAuthee4 C
(eeC D
stringeeD J
emaileeK P
)eeP Q
{ff 	
vargg 
responseAuthgg 
=gg 
MulesoftProcessApigg 1
.gg1 2
GetInfoTraxAuthgg2 A
(ggA B
emailggB G
)ggG H
;ggH I
returnhh 
JsonConverthh 
.hh 
DeserializeObjecthh 0
<hh0 1
CRMLeadObjectshh1 ?
.hh? @
DTOhh@ C
.hhC D
TraxUserhhD L
.hhL M
TraxUserhhM U
>hhU V
(hhV W
responseAuthhhW c
)hhc d
;hhd e
;hhf g
}ii 	
}jj 
}kk 