�8
XC:\Users\jaria304\source\repos\CRMLeadForm\ExternalServices\ActiveDirectoryConnection.cs
	namespace 	
ExternalServices
 
{		 
public

 

class

 %
ActiveDirectoryConnection

 *
{ 
private 
string 
UrlActiveDirectory )
;) *
public %
ActiveDirectoryConnection (
(( )
string) /
urlActiveDirectory0 B
)B C
{ 	
this 
. 
UrlActiveDirectory #
=$ %
urlActiveDirectory& 8
;8 9
} 	
public 
string 
GetUser 
( 
string $
userName% -
,- .
string/ 5
password6 >
,> ?
ref@ C
stringD J
errorK P
)P Q
{ 	
DirectoryEntry 
entry  
=! "
null# '
;' (
try 
{ 
entry 
= 
new 
DirectoryEntry *
(* +
this+ /
./ 0
UrlActiveDirectory0 B
,B C
userNameD L
,L M
passwordN V
,V W
AuthenticationTypesX k
.k l
Securel r
)r s
;s t
using 
( 
DirectorySearcher ( 
objDirectorySearcher) =
=> ?
new@ C
DirectorySearcherD U
(U V
entryV [
)[ \
)\ ]
{ 
return   
null   
;    
}!! 
}## 
catch$$ 
($$ 
System$$ 
.$$ 
DirectoryServices$$ +
.$$+ ,)
DirectoryServicesCOMException$$, I
ex$$J L
)$$L M
{%% 
error&& 
=&& 
ex&& 
.&& 
	ErrorCode&& $
.&&$ %
ToString&&% -
(&&- .
)&&. /
;&&/ 0
return'' 
null'' 
;'' 
}(( 
finally)) 
{** 
if++ 
(++ 
entry++ 
!=++ 
null++ !
)++! "
{,, 
entry-- 
.-- 
Close-- 
(--  
)--  !
;--! "
entry.. 
... 
Dispose.. !
(..! "
).." #
;..# $
}// 
}00 
}11 	
public33 
string33 
	GetGroups33 
(33  
string33  &
displayName33' 2
,332 3
string334 :
userName33; C
,33C D
string33E K
password33L T
,33T U
string33V \
groups33] c
)33c d
{44 	
DirectoryEntry55 
entry55  
=55! "
null55# '
;55' (
try77 
{88 
var99 
validGroups99 
=99  !
groups99" (
.99( )
Split99) .
(99. /
$char99/ 2
)992 3
;993 4
StringBuilder:: 

groupNames:: (
=::) *
new::+ .
StringBuilder::/ <
(::< =
)::= >
;::> ?
entry;; 
=;; 
new;; 
DirectoryEntry;; *
(;;* +
this;;+ /
.;;/ 0
UrlActiveDirectory;;0 B
,;;B C
userName;;D L
,;;L M
password;;N V
,;;V W
AuthenticationTypes;;X k
.;;k l
Secure;;l r
);;r s
;;;s t
using<< 
(<< 
DirectorySearcher<< (
search<<) /
=<<0 1
new<<2 5
DirectorySearcher<<6 G
(<<G H
entry<<H M
)<<M N
)<<N O
{== 
search>> 
.>> 
Filter>> !
=>>" #
$str>>$ *
+>>+ ,
displayName>>- 8
+>>9 :
$str>>; >
;>>> ?
search?? 
.?? 
PropertiesToLoad?? +
.??+ ,
Add??, /
(??/ 0
$str??0 :
)??: ;
;??; <
SearchResult@@  
result@@! '
=@@( )
search@@* 0
.@@0 1
FindOne@@1 8
(@@8 9
)@@9 :
;@@: ;
forBB 
(BB 
intBB 
iBB 
=BB  
$numBB! "
;BB" #
iBB$ %
<BB& '
resultBB( .
.BB. /

PropertiesBB/ 9
[BB9 :
$strBB: D
]BBD E
.BBE F
CountBBF K
;BBK L
iBBM N
++BBN P
)BBP Q
{CC 
stringDD 
memberOfDD '
=DD( )
(DD* +
stringDD+ 1
)DD1 2
resultDD2 8
.DD8 9

PropertiesDD9 C
[DDC D
$strDDD N
]DDN O
[DDO P
iDDP Q
]DDQ R
;DDR S
varFF 
equalsIndexFF '
=FF( )
memberOfFF* 2
.FF2 3
IndexOfFF3 :
(FF: ;
$strFF; >
,FF> ?
$numFF@ A
)FFA B
;FFB C
varGG 

commaIndexGG &
=GG' (
memberOfGG) 1
.GG1 2
IndexOfGG2 9
(GG9 :
$strGG: =
,GG= >
$numGG? @
)GG@ A
;GGA B

groupNamesII "
.II" #
AppendII# )
(II) *
memberOfII* 2
.II2 3
	SubstringII3 <
(II< =
(II= >
equalsIndexII> I
+IIJ K
$numIIL M
)IIM N
,IIN O
(IIP Q

commaIndexIIQ [
-II\ ]
equalsIndexII^ i
)IIi j
-IIk l
$numIIm n
)IIn o
)IIo p
;IIp q

groupNamesJJ "
.JJ" #
AppendJJ# )
(JJ) *
$strJJ* -
)JJ- .
;JJ. /
}KK 
}LL 
returnMM 
validGroupsMM "
.MM" #
AnyMM# &
(MM& '
grMM' )
=>MM* ,

groupNamesMM- 7
.MM7 8
ToStringMM8 @
(MM@ A
)MMA B
.MMB C
ContainsMMC K
(MMK L
grMML N
)MMN O
)MMO P
?MMQ R

groupNamesMMS ]
.MM] ^
ToStringMM^ f
(MMf g
)MMg h
:MMi j
stringMMk q
.MMq r
EmptyMMr w
;MMw x
}NN 
catchOO 
(OO 
SystemOO 
.OO 
DirectoryServicesOO +
.OO+ ,)
DirectoryServicesCOMExceptionOO, I
exOOJ L
)OOL M
{PP 
throwQQ 
exQQ 
;QQ 
}RR 
finallySS 
{TT 
ifUU 
(UU 
entryUU 
!=UU 
nullUU !
)UU! "
{VV 
entryWW 
.WW 
CloseWW 
(WW  
)WW  !
;WW! "
entryXX 
.XX 
DisposeXX !
(XX! "
)XX" #
;XX# $
}YY 
}ZZ 
}[[ 	
}\\ 
}]] �
LC:\Users\jaria304\source\repos\CRMLeadForm\ExternalServices\IWS\FacadeIWS.cs
	namespace 	
TraxServices
 
. 
IWS 
{ 
public 

enum 
IWSCatalogStatus  
{ 
Unknown 
, 
Active 
, 
Successfull 
, 
Error 
, 
} 
public 

static 
class 
	FacadeIWS !
{ 
static 
readonly 

HttpClient "
client# )
=* +
new, /

HttpClient0 :
(: ;
); <
;< =
static 
readonly 
string 
urlAdminapi *
=+ ,#
WebConfigurationManager- D
.D E
AppSettingsE P
[P Q
$strQ ^
]^ _
;_ `
} 
}   ��
ZC:\Users\jaria304\source\repos\CRMLeadForm\ExternalServices\MuleSoft\MulesoftProcessApi.cs
	namespace 	
TraxServices
 
. 
TraxProcess "
{ 
public 

static 
class 
MulesoftProcessApi *
{ 
public 
static 
string 
GetInfoTraxAuth ,
(, -
string- 3
email4 9
)9 :
{ 	
email 
= 
$str .
;. /
Object 
requestBody 
=  
(! "
new" %
{ 
email 
} 
) 
; 
string 

urlApiAuth 
= !
WebServiceSettingsDAL  5
.5 6!
GetWebServiceSettings6 K
(K L
$strL \
)\ ]
?] ^
.^ _
First_ d
(d e
)e f
.f g
Valueg l
;l m
return 
SendPostMulesoft #
(# $
requestBody$ /
,/ 0

urlApiAuth1 ;
,; <
$str= T
,T U
$strV g
)g h
.h i
resultContenti v
;v w
} 	
public!!	 
static!! 
ResponseMulesoft!! '

CreateLead!!( 2
(!!2 3
Object!!3 9
obj!!: =
,!!= >
string!!? E
	CompanyId!!F O
)!!O P
{"" 	
string## 
ApiMule## 
=##  
ConfigurationManager## 1
.##1 2
AppSettings##2 =
[##= >
$str##> K
]##K L
;##L M
return$$ 
SendPostMulesoft$$ #
($$# $
obj$$$ '
,$$' (
ApiMule$$) 0
,$$0 1
$str$$2 E
,$$E F
$str$$G S
,$$S T
	CompanyId$$U ^
)$$^ _
;$$_ `
}%% 	
public&& 
static&& 
ResponseMulesoft&& &
CreateLeadXUS&&' 4
(&&4 5
Object&&5 ;
obj&&< ?
,&&? @
string&&A G
	CompanyId&&H Q
)&&Q R
{'' 	
string(( 
ApiMule(( 
=((  
ConfigurationManager(( 1
.((1 2
AppSettings((2 =
[((= >
$str((> K
]((K L
;((L M
return)) 
SendPostMulesoft)) #
())# $
obj))$ '
,))' (
ApiMule))) 0
,))0 1
$str))2 E
,))E F
$str))G S
,))S T
	CompanyId))U ^
)))^ _
;))_ `
}** 	
public,, 
static,, 
string,, 
leadExistence,, *
(,,* +
LeadExistence,,+ 8
leadExistence,,9 F
),,F G
{-- 	
string.. 
url.. 
=..  
ConfigurationManager.. -
...- .
AppSettings... 9
[..9 :
$str..: M
]..M N
;..N O
string// 
totalUrl// 
=// 
url// !
+//" #
$str//$ 4
+//5 6
leadExistence//7 D
.//D E
emailaddress1//E R
+//S T
$str//U q
+//r s
leadExistence	//t �
.
//� �&
ph_companyidentification
//� �
+
//� �
$str
//� �
+
//� �
leadExistence
//� �
.
//� �
ph_identification
//� �
+
//� �
$str
//� �
+
//� �
leadExistence
//� �
.
//� �
emailaddress2
//� �
;
//� �
return00 
SendGetMulesoft00 "
(00" #
$str00# 2
,002 3
totalUrl004 <
)00< =
;00= >
}11 	
public22 
static22 
string22 
SendGetMulesoft22 ,
(22, -
string22- 3
RestService224 ?
,22? @
string22A G
url22H K
,22K L
string22M S
IdServiceSettings22T e
=22f g
null22h l
)22l m
{33 	
string44 
resultContent44  
=44! "
string44# )
.44) *
Empty44* /
;44/ 0
string55 
Rpt55 
=55 
$str55 
;55 
bool66 
?66 
success66 
=66 
false66 !
;66! "
DateTime77 
StartTimeStamp77 #
=77$ %
DateTime77& .
.77. /
Now77/ 2
;772 3
var99 
IsAuthHeaders99 
=99 
false99  %
;99% &
if:: 
(:: 
IdServiceSettings:: !
!=::" $
null::% )
)::) *
{;; 
bool<< 
.<< 
TryParse<< 
(<< !
WebServiceSettingsDAL<< 3
.<<3 4!
GetWebServiceSettings<<4 I
(<<I J
IdServiceSettings<<J [
)<<[ \
?<<\ ]
.<<] ^
First<<^ c
(<<c d
)<<d e
.<<e f
Value<<f k
,<<k l
out<<m p
IsAuthHeaders<<q ~
)<<~ 
;	<< �
}== 
ResponseMulesoft?? 
ResponseMulesoftob?? /
=??0 1
new??2 5
ResponseMulesoft??6 F
(??F G
)??G H
;??H I
usingAA 
(AA 
varAA 
clientAA 
=AA 
newAA  #

HttpClientAA$ .
(AA. /
)AA/ 0
)AA0 1
{BB 
ifCC 
(CC 
IsAuthHeadersCC !
)CC! "
{DD 
clientEE 
.EE !
DefaultRequestHeadersEE 0
.EE0 1
AddEE1 4
(EE4 5
$strEE5 @
,EE@ A!
WebServiceSettingsDALEEB W
.EEW X!
GetWebServiceSettingsEEX m
(EEm n
$strEEn ~
)EE~ 
?	EE �
.
EE� �
First
EE� �
(
EE� �
)
EE� �
.
EE� �
Value
EE� �
)
EE� �
;
EE� �
clientFF 
.FF !
DefaultRequestHeadersFF 0
.FF0 1
AddFF1 4
(FF4 5
$strFF5 D
,FFD E!
WebServiceSettingsDALFFF [
.FF[ \!
GetWebServiceSettingsFF\ q
(FFq r
$str	FFr �
)
FF� �
?
FF� �
.
FF� �
First
FF� �
(
FF� �
)
FF� �
.
FF� �
Value
FF� �
)
FF� �
;
FF� �
}GG 
clientII 
.II 
TimeoutII 
=II  
TimeSpanII! )
.II) *
FromMinutesII* 5
(II5 6
$numII6 7
)II7 8
;II8 9
varJJ 
responseJJ 
=JJ 
clientJJ %
.JJ% &
GetAsyncJJ& .
(JJ. /
newJJ/ 2
UriJJ3 6
(JJ6 7
urlJJ7 :
)JJ: ;
)JJ; <
.JJ< =
ResultJJ= C
;JJC D
resultContentKK 
=KK 
responseKK  (
.KK( )
ContentKK) 0
.KK0 1
ReadAsStringAsyncKK1 B
(KKB C
)KKC D
.KKD E
ResultKKE K
;KKK L
ResponseMulesoftobMM "
.MM" #
resultContentMM# 0
=MM1 2
responseMM3 ;
.MM; <
ContentMM< C
.MMC D
ReadAsStringAsyncMMD U
(MMU V
)MMV W
.MMW X
ResultMMX ^
;MM^ _
RestCallLogNN 
RestCallLogobjNN *
=NN+ ,
newNN- 0
RestCallLogNN1 <
(NN< =
RestServiceNN= H
,NNH I
nullNNJ N
,NNN O
nullNNP T
,NNT U
nullNNV Z
,NNZ [
$strNN\ a
,NNa b
urlNNc f
,NNf g
clientNNh n
.NNn o"
DefaultRequestHeaders	NNo �
.
NN� �
ToString
NN� �
(
NN� �
)
NN� �
,
NN� �
null
NN� �
,
NN� �
response
NN� �
.
NN� �!
IsSuccessStatusCode
NN� �
,
NN� �
response
NN� �
.
NN� �

StatusCode
NN� �
.
NN� �
ToString
NN� �
(
NN� �
)
NN� �
,
NN� � 
ResponseMulesoftob
NN� �
?
NN� �
.
NN� �
resultContent
NN� �
?
NN� �
.
NN� �
ToString
NN� �
(
NN� �
)
NN� �
,
NN� �
StartTimeStamp
NN� �
,
NN� �
DateTime
NN� �
.
NN� �
Now
NN� �
,
NN� �
(
NN� �
DateTime
NN� �
.
NN� �
Now
NN� �
-
NN� �
StartTimeStamp
NN� �
)
NN� �
.
NN� �
ToString
NN� �
(
NN� �
)
NN� �
,
NN� �
null
NN� �
)
NN� �
;
NN� �
DALOO 
.OO 
RestCallLogDALOO "
.OO" #
CreateCallLogOO# 0
(OO0 1
RestCallLogobjOO1 ?
,OO? @
refOOA D
RptOOE H
,OOH I
refOOJ M
successOON U
)OOU V
;OOV W
}QQ 
returnRR 
resultContentRR  
;RR  !
}SS 	
publicTT 
staticTT 
ResponseMulesoftTT &
SendPostMulesoftTT' 7
(TT7 8
ObjectTT8 >
requestBodyTT? J
,TTJ K
stringTTL R
urlTTS V
,TTV W
stringTTX ^
IdServiceSettingsTT_ p
,TTp q
stringTTr x
RestService	TTy �
,
TT� �
string
TT� �
	CompanyId
TT� �
=
TT� �
null
TT� �
)
TT� �
{UU 	
stringWW 
RptWW 
=WW 
$strWW 
;WW 
boolXX 
?XX 
successXX 
=XX 
falseXX !
;XX! "
DateTimeYY 
StartTimeStampYY #
=YY$ %
DateTimeYY& .
.YY. /
NowYY/ 2
;YY2 3
var\\ !
IsBasicApiAuthProcess\\ %
=\\& '
true\\( ,
;\\, -
bool]] 
.]] 
TryParse]] 
(]] !
WebServiceSettingsDAL]] /
.]]/ 0!
GetWebServiceSettings]]0 E
(]]E F
IdServiceSettings]]F W
)]]W X
?]]X Y
.]]Y Z
First]]Z _
(]]_ `
)]]` a
.]]a b
Value]]b g
,]]g h
out]]i l"
IsBasicApiAuthProcess	]]m �
)
]]� �
;
]]� �
string__ 
resultContent__  
=__! "
string__# )
.__) *
Empty__* /
;__/ 0
var`` 
jsonData`` 
=`` 
JsonConvert`` &
.``& '
SerializeObject``' 6
(``6 7
requestBody``7 B
)``B C
;``C D
varaa 
stringContentaa 
=aa 
newaa  #
StringContentaa$ 1
(aa1 2
jsonDataaa2 :
,aa: ;
UnicodeEncodingaa< K
.aaK L
UTF8aaL P
,aaP Q
$straaR d
)aad e
;aae f
ResponseMulesoftcc 
ResponseMulesoftobcc /
=cc0 1
newcc2 5
ResponseMulesoftcc6 F
(ccF G
)ccG H
;ccH I
usingee 
(ee 

HttpClientee 
clientee $
=ee% &
newee' *

HttpClientee+ 5
(ee5 6
)ee6 7
)ee7 8
{ff 
ifgg 
(gg !
IsBasicApiAuthProcessgg )
)gg) *
{hh 
clientii 
.ii !
DefaultRequestHeadersii 0
.ii0 1
Addii1 4
(ii4 5
$strii5 D
,iiD E
$striiF N
+iiO P
ConvertiiQ X
.iiX Y
ToBase64StringiiY g
(iig h
Encodingiih p
.iip q
UTF8iiq u
.iiu v
GetBytesiiv ~
(ii~ 
$"	ii �
{
ii� �#
WebServiceSettingsDAL
ii� �
.
ii� �#
GetWebServiceSettings
ii� �
(
ii� �
$str
ii� �
)
ii� �
?
ii� �
.
ii� �
First
ii� �
(
ii� �
)
ii� �
.
ii� �
Value
ii� �
}
ii� �
$str
ii� �
{
ii� �#
WebServiceSettingsDAL
ii� �
.
ii� �#
GetWebServiceSettings
ii� �
(
ii� �
$str
ii� �
)
ii� �
?
ii� �
.
ii� �
First
ii� �
(
ii� �
)
ii� �
.
ii� �
Value
ii� �
}
ii� �
"
ii� �
)
ii� �
)
ii� �
)
ii� �
;
ii� �
}jj 
elsekk 
{ll 
clientmm 
.mm !
DefaultRequestHeadersmm 0
.mm0 1
Addmm1 4
(mm4 5
$strmm5 @
,mm@ A!
WebServiceSettingsDALmmB W
.mmW X!
GetWebServiceSettingsmmX m
(mmm n
$strmmn ~
)mm~ 
.	mm �
First
mm� �
(
mm� �
)
mm� �
.
mm� �
Value
mm� �
)
mm� �
;
mm� �
clientnn 
.nn !
DefaultRequestHeadersnn 0
.nn0 1
Addnn1 4
(nn4 5
$strnn5 D
,nnD E!
WebServiceSettingsDALnnF [
.nn[ \!
GetWebServiceSettingsnn\ q
(nnq r
$str	nnr �
)
nn� �
.
nn� �
First
nn� �
(
nn� �
)
nn� �
.
nn� �
Value
nn� �
)
nn� �
;
nn� �
}oo 
clientpp 
.pp 
Timeoutpp 
=pp  
TimeSpanpp! )
.pp) *
FromMinutespp* 5
(pp5 6
$numpp6 7
)pp7 8
;pp8 9
varqq 
responseqq 
=qq 
clientqq %
.qq% &
	PostAsyncqq& /
(qq/ 0
urlqq0 3
,qq3 4
stringContentqq5 B
)qqB C
.qqC D
ResultqqD J
;qqJ K
ResponseMulesoftobrr "
.rr" #
responserr# +
=rr, -
responserr. 6
;rr6 7
ifss 
(ss 
responsess 
.ss 

StatusCodess '
!=ss( *
Systemss+ 1
.ss1 2
Netss2 5
.ss5 6
HttpStatusCodess6 D
.ssD E
OKssE G
)ssG H
{tt 
ResponseMulesoftobvv &
.vv& '
resultContentvv' 4
=vv5 6
responsevv7 ?
.vv? @
Contentvv@ G
.vvG H
ReadAsStringAsyncvvH Y
(vvY Z
)vvZ [
.vv[ \
Resultvv\ b
;vvb c
RestCallLogww 
RestCallLogobjww  .
=ww/ 0
newww1 4
RestCallLogww5 @
(ww@ A
RestServicewwA L
,wwL M
nullwwN R
,wwR S
nullwwT X
,wwX Y
nullwwZ ^
,ww^ _
$strww` f
,wwf g
urlwwh k
,wwk l
clientwwm s
.wws t"
DefaultRequestHeaders	wwt �
.
ww� �
ToString
ww� �
(
ww� �
)
ww� �
,
ww� �
jsonData
ww� �
.
ww� �
ToString
ww� �
(
ww� �
)
ww� �
,
ww� �
false
ww� �
,
ww� �
response
ww� �
.
ww� �

StatusCode
ww� �
.
ww� �
ToString
ww� �
(
ww� �
)
ww� �
,
ww� � 
ResponseMulesoftob
ww� �
?
ww� �
.
ww� �
resultContent
ww� �
?
ww� �
.
ww� �
ToString
ww� �
(
ww� �
)
ww� �
,
ww� �
StartTimeStamp
ww� �
,
ww� �
DateTime
ww� �
.
ww� �
Now
ww� �
,
ww� �
(
ww� �
DateTime
ww� �
.
ww� �
Now
ww� �
-
ww� �
StartTimeStamp
ww� �
)
ww� �
.
ww� �
ToString
ww� �
(
ww� �
)
ww� �
,
ww� �
	CompanyId
ww� �
)
ww� �
;
ww� �
DALyy 
.yy 
RestCallLogDALyy &
.yy& '
CreateCallLogyy' 4
(yy4 5
RestCallLogobjyy5 C
,yyC D
refyyE H
RptyyI L
,yyL M
refyyN Q
successyyR Y
)yyY Z
;yyZ [
}{{ 
else|| 
{}} 
ResponseMulesoftob~~ &
.~~& '
resultContent~~' 4
=~~5 6
response~~7 ?
.~~? @
Content~~@ G
.~~G H
ReadAsStringAsync~~H Y
(~~Y Z
)~~Z [
.~~[ \
Result~~\ b
;~~b c
RestCallLog 
RestCallLogobj  .
=/ 0
new1 4
RestCallLog5 @
(@ A
RestServiceA L
,L M
nullN R
,R S
nullT X
,X Y
nullZ ^
,^ _
$str` f
,f g
urlh k
,k l
clientm s
.s t"
DefaultRequestHeaders	t �
.
� �
ToString
� �
(
� �
)
� �
,
� �
jsonData
� �
?
� �
.
� �
ToString
� �
(
� �
)
� �
,
� �
true
� �
,
� �
response
� �
.
� �

StatusCode
� �
.
� �
ToString
� �
(
� �
)
� �
,
� � 
ResponseMulesoftob
� �
?
� �
.
� �
resultContent
� �
?
� �
.
� �
ToString
� �
(
� �
)
� �
,
� �
StartTimeStamp
� �
,
� �
DateTime
� �
.
� �
Now
� �
,
� �
(
� �
DateTime
� �
.
� �
Now
� �
-
� �
StartTimeStamp
� �
)
� �
.
� �
ToString
� �
(
� �
)
� �
,
� �
	CompanyId
� �
)
� �
;
� �
DAL
�� 
.
�� 
RestCallLogDAL
�� &
.
��& '
CreateCallLog
��' 4
(
��4 5
RestCallLogobj
��5 C
,
��C D
ref
��E H
Rpt
��I L
,
��L M
ref
��N Q
success
��R Y
)
��Y Z
;
��Z [
}
�� 
}
�� 
return
��  
ResponseMulesoftob
�� %
;
��% &
}
�� 	
public
�� 
static
�� 
bool
�� #
ValidateExistingEmail
�� 0
(
��0 1
string
��1 7
email
��8 =
)
��= >
{
�� 	
return
�� 
true
�� 
;
�� 
}
�� 	
}
�� 
}�� �
VC:\Users\jaria304\source\repos\CRMLeadForm\ExternalServices\Properties\AssemblyInfo.cs
[ 
assembly 	
:	 

AssemblyTitle 
( 
$str +
)+ ,
], -
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
$str -
)- .
]. /
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
]$$) *�
VC:\Users\jaria304\source\repos\CRMLeadForm\ExternalServices\TraxModels\ResponseAuth.cs
	namespace 	
TraxServices
 
. 

TraxModels !
{ 
public		 
class			 
ResponseAuth		 
{

 
public 

string 
cid 
{ 
get 
; 
set  
;  !
}" #
public 

data 
data 
{ 
get 
; 
set 
;  
}! "
} 
public 
class	 
User 
{ 
public 

string 
user_id 
{ 
get 
;  
set! $
;$ %
}& '
} 
public 
class	 
data 
{ 
public 

User 
user 
{ 
get 
; 
set 
;  
}! "
public 

session 
session 
{ 
get  
;  !
set" %
;% &
}' (
} 
public 
class	 
session 
{ 
public 

string 

session_id 
{ 
get "
;" #
set$ '
;' (
}) *
}   
}!! �
YC:\Users\jaria304\source\repos\CRMLeadForm\ExternalServices\TraxModels\ResponseWebUser.cs
	namespace 	
ExternalServices
 
{ 
public		 

class		 
ResponseWebUser		  
{

 
public 
bool 
	IsSuccess 
{ 
get  #
;# $
set% (
;( )
}* +
public 
ExternalServices 
.  

WSTraxProd  *
.* +#
getWebuser_tweb_userRow+ B
[B C
]C D
UserInfoE M
{N O
getP S
;S T
setU X
;X Y
}Z [
} 
} �'
NC:\Users\jaria304\source\repos\CRMLeadForm\ExternalServices\WSTraxProdClass.cs
	namespace 	
ExternalServices
 
{ 
public 

class 
WSTraxProdClass  
{ 
ExternalServices 
. 

WSTraxProd #
.# $
WSTraxProdObjClient$ 7
client8 >
=? @
newA D
ExternalServicesE U
.U V

WSTraxProdV `
.` a
WSTraxProdObjClienta t
(t u
)u v
;v w
public 
ResponseWebUser 

getWebuser )
() *
string* 0
User1 5
)5 6
{ 	
var 
a 
= 
new 
ExternalServices (
.( )

WSTraxProd) 3
.3 4
getWebuserResponse4 F
(F G
)G H
;H I
var 
b 
= 
new 
ResponseWebUser '
(' (
)( )
;) *
client 
. 

getWebuser 
( 
User "
," #
out$ '
a( )
.) *
	tweb_user* 3
)3 4
;4 5
b 
. 
	IsSuccess 
= 
true 
; 
b 
. 
UserInfo 
= 
a 
. 
	tweb_user $
;$ %
return 
b 
; 
} 	
public 
ExternalServices 
.  

WSTraxProd  *
.* +
login2Response+ 9
Login: ?
(? @
string@ F
UserG K
,K L
stringM S
PassT X
)X Y
{ 	
var 
a 
= 
new 
ExternalServices (
.( )

WSTraxProd) 3
.3 4
login2Response4 B
(B C
)C D
;D E
client 
. 
login2 
( 
User 
, 
Pass  $
,$ %
out& )
a* +
.+ ,
login2_results, :
): ;
;; <
return   
a   
;   
}!! 	
public$$ 
string$$ 
getprafs31sd$$ "
($$" #
string$$# )

localRecno$$* 4
,$$4 5
string$$6 <
sesionId$$= E
)$$E F
{%% 	
ExternalServices&& 
.&& 

WSTraxProd&& '
.&&' (!
getprafs31sd_prodsRow&&( =
[&&= >
]&&> ?
products&&@ H
=&&I J
new&&K N
ExternalServices&&O _
.&&_ `

WSTraxProd&&` j
.&&j k"
getprafs31sd_prodsRow	&&k �
[
&&� �
$num
&&� �
]
&&� �
;
&&� �
ExternalServices'' 
.'' 

WSTraxProd'' '
.''' (!
getprafs31sd_prodsRow''( =
product''> E
=''F G
new''H K
ExternalServices''L \
.''\ ]

WSTraxProd''] g
.''g h!
getprafs31sd_prodsRow''h }
(''} ~
)''~ 
;	'' �
product(( 
.(( 
	prodrecno(( 
=(( 

localRecno((  *
;((* +
products)) 
[)) 
$num)) 
])) 
=)) 
product)) !
;))! "+
getprafs3sd_resultsProdresultbf** +
[**+ ,
]**, -
outs**. 2
;**2 3
client++ 
.++ 
getprafs31sd++ 
(++  
products++  (
,++( )
$str++* ,
,++, -
sesionId++. 6
,++6 7
$num++8 9
,++9 :
out++; >
outs++? C
)++C D
;++D E
if,, 
(,, 
outs,, 
.,, 
Length,, 
>,, 
$num,, 
),,  
{-- 
return.. 
Convert.. 
... 
ToInt32.. &
(..& '
outs..' +
[..+ ,
$num.., -
]..- .
.... /
afsresultbf../ :
...: ;
Sum..; >
(..> ?
x..? @
=>..A C
x..D E
...E F
afs..F I
)..I J
)..J K
...K L
ToString..L T
(..T U
)..U V
+..W X
$str..Y \
+..] ^
outs.._ c
[..c d
$num..d e
]..e f
...f g
price..g l
...l m
ToString..m u
(..u v
)..v w
+..x y
$str..z }
+..~ 
outs
..� �
[
..� �
$num
..� �
]
..� �
.
..� �
currid
..� �
;
..� �
}// 
else00 
{00 
return11 
$str11  
;11  !
}22 
}44 	
}55 
}66 