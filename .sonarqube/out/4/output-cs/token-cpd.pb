�
]C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\ActionFilters\NoCacheAttribute.cs
	namespace 	
CRMLeadFormLogin
 
. 
ActionFilters (
{ 
[		 
AttributeUsage		 
(		 
AttributeTargets		 $
.		$ %
Class		% *
|		+ ,
AttributeTargets		- =
.		= >
Method		> D
)		D E
]		E F
public

 

class

 
NoCacheAttribute

 !
:

" #!
ActionFilterAttribute

$ 9
{

= >
public 
override 
void 
OnResultExecuting .
(. /"
ResultExecutingContext/ E
filterContextF S
)S T
{ 	
filterContext 
. 
HttpContext %
.% &
Response& .
.. /
Cache/ 4
.4 5

SetExpires5 ?
(? @
DateTime@ H
.H I
UtcNowI O
.O P
AddDaysP W
(W X
-X Y
$numY Z
)Z [
)[ \
;\ ]
filterContext 
. 
HttpContext %
.% &
Response& .
.. /
Cache/ 4
.4 5 
SetValidUntilExpires5 I
(I J
falseJ O
)O P
;P Q
filterContext 
. 
HttpContext %
.% &
Response& .
.. /
Cache/ 4
.4 5
SetRevalidation5 D
(D E!
HttpCacheRevalidationE Z
.Z [
	AllCaches[ d
)d e
;e f
filterContext 
. 
HttpContext %
.% &
Response& .
.. /
Cache/ 4
.4 5
SetCacheability5 D
(D E
HttpCacheabilityE U
.U V
NoCacheV ]
)] ^
;^ _
filterContext 
. 
HttpContext %
.% &
Response& .
.. /
Cache/ 4
.4 5

SetNoStore5 ?
(? @
)@ A
;A B
base 
. 
OnResultExecuting "
(" #
filterContext# 0
)0 1
;1 2
} 	
} 
} �
UC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\App_Start\BundleConfig.cs
	namespace 	
CRMLeadFormLogin
 
{ 
public 

class 
BundleConfig 
{ 
public 
static 
void 
RegisterBundles *
(* +
BundleCollection+ ;
bundles< C
)C D
{		 	
bundles 
. 
Add 
( 
new 
ScriptBundle (
(( )
$str) ;
); <
.< =
Include= D
(D E
$str 7
)7 8
)8 9
;9 :
bundles 
. 
Add 
( 
new 
ScriptBundle (
(( )
$str) >
)> ?
.? @
Include@ G
(G H
$str 4
)4 5
)5 6
;6 7
bundles 
. 
Add 
( 
new 
ScriptBundle (
(( )
$str) >
)> ?
.? @
Include@ G
(G H
$str /
)/ 0
)0 1
;1 2
bundles 
. 
Add 
( 
new 
ScriptBundle (
(( )
$str) >
)> ?
.? @
Include@ G
(G H
$str .
). /
)/ 0
;0 1
bundles 
. 
Add 
( 
new 
ScriptBundle (
(( )
$str) @
)@ A
.A B
IncludeB I
(I J
$str 9
,9 :
$str 1
,1 2
$str )
) 
) 
; 
bundles 
. 
Add 
( 
new 
ScriptBundle (
(( )
$str) B
)B C
.C D
IncludeD K
(K L
$str   %
,  % &
$str!!	 )
,!!) *
$str""	 ;
,""; <
$str##	 3
)$$	 

)$$
 
;$$ 
bundles(( 
.(( 
Add(( 
((( 
new(( 
StyleBundle(( '
(((' (
$str((( 7
)((7 8
.((8 9
Include((9 @
(((@ A
$str)) /
,))/ 0
$str** *
)*** +
)**+ ,
;**, -
bundles,, 
.,, 
Add,, 
(,, 
new,, 
StyleBundle,, '
(,,' (
$str,,( D
),,D E
.,,E F
Include,,F M
(,,M N
$str-- @
,--@ A
$str.. <
,..< =
$str// ,
)//, -
)//- .
;//. /
BundleTable44 
.44 
EnableOptimizations44 +
=44, -
false44. 3
;443 4
}:: 	
};; 
}@@ �
UC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\App_Start\FilterConfig.cs
	namespace 	
CRMLeadFormLogin
 
{ 
public 

class 
FilterConfig 
{ 
public 
static 
void !
RegisterGlobalFilters 0
(0 1"
GlobalFilterCollection1 G
filtersH O
)O P
{		 	
filters

 
.

 
Add

 
(

 
new

  
HandleErrorAttribute

 0
(

0 1
)

1 2
)

2 3
;

3 4
} 	
} 
} �
TC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\App_Start\RouteConfig.cs
	namespace		 	
CRMLeadFormLogin		
 
{

 
public 

class 
RouteConfig 
{ 
public 
static 
void 
RegisterRoutes )
() *
RouteCollection* 9
routes: @
)@ A
{ 	
routes 
. 
IgnoreRoute 
( 
$str ;
); <
;< =
routes 
. 
MapRoute 
( 
name 
: 
$str $
,$ %
url 
: 
$str 1
,1 2
defaults 
: 
new "
{# $
language% -
=. / 
ConfigurationManager0 D
.D E
AppSettingsE P
[P Q
$strQ b
]b c
,c d

controllere o
=p q
$strr {
,{ |
action	} �
=
� �
$str
� �
}
� �
) 
; 
routes 
. 
MapRoute 
( 
name 
: 
$str (
,( )
url 
: 
$str 7
,7 8
defaults 
: 
new 
{  
language! )
=* + 
ConfigurationManager, @
.@ A
AppSettingsA L
[L M
$strM ^
]^ _
,_ `

controllera k
=l m
$strn w
,w x
actiony 
=
� �
$str
� �
}
� �
,
� �
constraints 
: 
new "
{ 
language 
=  
$str! .
} 
) 
; 
routes 
. 
MapRoute 
( 
name   
:   
$str   &
,  & '
url!! 
:!! 
$str!! 9
,!!9 :
defaults"" 
:"" 
new"" 
{"" 
language"" &
=""' ( 
ConfigurationManager"") =
.""= >
AppSettings""> I
[""I J
$str""J [
]""[ \
,""\ ]
id""^ `
=""a b
UrlParameter""c o
.""o p
Optional""p x
,""x y
}""z {
,""{ |

namespaces## 
:## 
new## 
string## $
[##$ %
]##% &
{$$ 
$str%% =
}&& 
)'' 
;'' 
}(( 	
})) 
}** �k
UC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\App_Start\Startup.Auth.cs
	namespace 	
CRMLeadFormLogin
 
{ 
public 

partial 
class 
Startup  
{ 
public 
static 
string 
ClientId %
=& ' 
ConfigurationManager( <
.< =
AppSettings= H
[H I
$strI W
]W X
;X Y
public   
static   
string   
WellKnownMetadata   .
=  / 0 
ConfigurationManager  1 E
.  E F
AppSettings  F Q
[  Q R
$str  R h
]  h i
;  i j
public!! 
static!! 
string!! 
RedirectUri!! (
=!!) * 
ConfigurationManager!!+ ?
.!!? @
AppSettings!!@ K
[!!K L
$str!!L ]
]!!] ^
;!!^ _
public$$ 
static$$ 
string$$  
SignUpSignInPolicyId$$ 1
=$$2 3 
ConfigurationManager$$4 H
.$$H I
AppSettings$$I T
[$$T U
$str$$U o
]$$o p
;$$p q
public%% 
static%% 
string%% 
EditProfilePolicyId%% 0
=%%1 2 
ConfigurationManager%%3 G
.%%G H
AppSettings%%H S
[%%S T
$str%%T m
]%%m n
;%%n o
public&& 
static&& 
string&& !
ResetPasswordPolicyId&& 2
=&&3 4 
ConfigurationManager&&5 I
.&&I J
AppSettings&&J U
[&&U V
$str&&V q
]&&q r
;&&r s
public(( 
static(( 
string(( 
DefaultPolicy(( *
=((+ , 
SignUpSignInPolicyId((- A
;((A B
public,, 
void,, 
ConfigureAuth,, !
(,,! "
IAppBuilder,," -
app,,. 1
),,1 2
{-- 	
ServicePointManager// 
.//  
SecurityProtocol//  0
=//1 2 
SecurityProtocolType//3 G
.//G H
Tls12//H M
;//M N
app11 
.11 0
$SetDefaultSignInAsAuthenticationType11 4
(114 5(
CookieAuthenticationDefaults115 Q
.11Q R
AuthenticationType11R d
)11d e
;11e f
app33 
.33 #
UseCookieAuthentication33 '
(33' (
new33( +'
CookieAuthenticationOptions33, G
(33G H
)33H I
)33I J
;33J K
app55 
.55 *
UseOpenIdConnectAuthentication55 .
(55. /
new66 .
"OpenIdConnectAuthenticationOptions66 6
{77 
MetadataAddress99 #
=99$ %
WellKnownMetadata99& 7
,997 8
ClientId<< 
=<< 
ClientId<< '
,<<' (
RedirectUri== 
===  !
RedirectUri==" -
,==- .!
PostLogoutRedirectUri>> )
=>>* +
RedirectUri>>, 7
,>>7 8
NotificationsAA !
=AA" #
newAA$ '4
(OpenIdConnectAuthenticationNotificationsAA( P
{BB &
RedirectToIdentityProviderCC 2
=CC3 4(
OnRedirectToIdentityProviderCC5 Q
,CCQ R 
AuthenticationFailedDD ,
=DD- ."
OnAuthenticationFailedDD/ E
,DDE F%
AuthorizationCodeReceivedEE 1
=EE2 3'
OnAuthorizationCodeReceivedEE4 O
,EEO P!
SecurityTokenReceivedFF -
=FF. /#
OnSecurityTokenReceivedFF0 G
}GG 
,GG %
TokenValidationParametersJJ -
=JJ. /
newJJ0 3%
TokenValidationParametersJJ4 M
{KK 
NameClaimTypeLL %
=LL& '
$strLL( .
,LL. /
ValidateIssuerMM &
=MM' (
falseMM) .
}NN 
,NN 
ScopeQQ 
=QQ 
OpenIdConnectScopeQQ .
.QQ. /
OpenIdProfileQQ/ <
}RR 
)SS 
;SS 
}TT 	
privateZZ 
TaskZZ (
OnRedirectToIdentityProviderZZ 1
(ZZ1 22
&RedirectToIdentityProviderNotificationZZ2 X
<ZZX Y 
OpenIdConnectMessageZZY m
,ZZm n/
"OpenIdConnectAuthenticationOptions	ZZo �
>
ZZ� �
notification
ZZ� �
)
ZZ� �
{[[ 	
var\\ 
isAuthenticationReq\\ #
=\\$ %
notification\\& 2
.\\2 3
ProtocolMessage\\3 B
.\\B C
RequestType\\C N
==\\O Q$
OpenIdConnectRequestType\\R j
.\\j k
Authentication\\k y
;\\y z
if]] 
(]] 
isAuthenticationReq]] #
&&]]$ &
IsAjaxRequest]]' 4
(]]4 5
notification]]5 A
.]]A B
Request]]B I
)]]I J
)]]J K
{^^ 
notification__ 
.__ 
HandleResponse__ +
(__+ ,
)__, -
;__- .
}`` 
elseaa 
{bb 
varcc 
policycc 
=cc 
notificationcc )
.cc) *
OwinContextcc* 5
.cc5 6
Getcc6 9
<cc9 :
stringcc: @
>cc@ A
(ccA B
$strccB J
)ccJ K
;ccK L
ifee 
(ee 
!ee 
stringee 
.ee 
IsNullOrEmptyee )
(ee) *
policyee* 0
)ee0 1
&&ee2 4
!ee5 6
policyee6 <
.ee< =
Equalsee= C
(eeC D
DefaultPolicyeeD Q
)eeQ R
)eeR S
{ff 
notificationgg  
.gg  !
ProtocolMessagegg! 0
.gg0 1
Scopegg1 6
=gg7 8
OpenIdConnectScopegg9 K
.ggK L
OpenIdggL R
;ggR S
notificationhh  
.hh  !
ProtocolMessagehh! 0
.hh0 1
ResponseTypehh1 =
=hh> ?%
OpenIdConnectResponseTypehh@ Y
.hhY Z
IdTokenhhZ a
;hha b
notificationii  
.ii  !
ProtocolMessageii! 0
.ii0 1
IssuerAddressii1 >
=ii? @
notificationiiA M
.iiM N
ProtocolMessageiiN ]
.ii] ^
IssuerAddressii^ k
.iik l
ToLoweriil s
(iis t
)iit u
.iiu v
Replaceiiv }
(ii} ~
DefaultPolicy	ii~ �
.
ii� �
ToLower
ii� �
(
ii� �
)
ii� �
,
ii� �
policy
ii� �
.
ii� �
ToLower
ii� �
(
ii� �
)
ii� �
)
ii� �
;
ii� �
}jj 
}kk 
notificationll 
.ll 
ProtocolMessagell (
.ll( )
	UiLocalesll) 2
=ll3 4
Threadll5 ;
.ll; <
CurrentThreadll< I
.llI J
CurrentUICulturellJ Z
.llZ [
Namell[ _
.ll_ `
	Substringll` i
(lli j
$numllj k
,llk l
$numllm n
)lln o
;llo p
returnmm 
Taskmm 
.mm 

FromResultmm "
(mm" #
$nummm# $
)mm$ %
;mm% &
}nn 	
privatess 
Taskss "
OnAuthenticationFailedss +
(ss+ ,,
 AuthenticationFailedNotificationss, L
<ssL M 
OpenIdConnectMessagessM a
,ssa b/
"OpenIdConnectAuthenticationOptions	ssc �
>
ss� �
notification
ss� �
)
ss� �
{tt 	
notificationuu 
.uu 
HandleResponseuu '
(uu' (
)uu( )
;uu) *
ifyy 
(yy 
notificationyy 
.yy 
ProtocolMessageyy ,
.yy, -
ErrorDescriptionyy- =
!=yy> @
nullyyA E
&&yyF H
notificationyyI U
.yyU V
ProtocolMessageyyV e
.yye f
ErrorDescriptionyyf v
.yyv w
Containsyyw 
(	yy �
$str
yy� �
)
yy� �
)
yy� �
{zz 
notification|| 
.|| 
Response|| %
.||% &
Redirect||& .
(||. /
$str||/ G
)||G H
;||H I
}}} 
else~~ 
if~~ 
(~~ 
notification~~ !
.~~! "
	Exception~~" +
.~~+ ,
Message~~, 3
==~~4 6
$str~~7 F
)~~F G
{ 
notification
�� 
.
�� 
Response
�� %
.
��% &
Redirect
��& .
(
��. /
$str
��/ 2
)
��2 3
;
��3 4
}
�� 
else
�� 
{
�� 
notification
�� 
.
�� 
Response
�� %
.
��% &
Redirect
��& .
(
��. /
$str
��/ ?
)
��? @
;
��@ A
}
�� 
return
�� 
Task
�� 
.
�� 

FromResult
�� "
(
��" #
$num
��# $
)
��$ %
;
��% &
}
�� 	
private
�� 
Task
�� )
OnAuthorizationCodeReceived
�� 0
(
��0 13
%AuthorizationCodeReceivedNotification
��1 V
notification
��W c
)
��c d
{
�� 	
try
�� 
{
�� 
ContextAuth
�� 
.
�� 
Init
��  
(
��  !
notification
��! -
.
��- .
JwtSecurityToken
��. >
.
��> ?
RawData
��? F
)
��F G
;
��G H
notification
�� 
.
�� 
Response
�� %
.
��% &
Redirect
��& .
(
��. /
$str
��/ ?
)
��? @
;
��@ A
return
�� 
Task
�� 
.
�� 

FromResult
�� &
(
��& '
$num
��' (
)
��( )
;
��) *
}
�� 
catch
�� 
(
�� 
	Exception
�� 
ex
�� 
)
��  
{
�� 
throw
�� 
new
�� #
HttpResponseException
�� /
(
��/ 0
new
��0 3!
HttpResponseMessage
��4 G
{
�� 

StatusCode
�� 
=
��  
HttpStatusCode
��! /
.
��/ 0

BadRequest
��0 :
,
��: ;
ReasonPhrase
��  
=
��! "
$"
��# %
$str
��% F
{
��F G
ex
��G I
.
��I J
Message
��J Q
}
��Q R
$str
��R S
"
��S T
}
�� 
)
�� 
;
�� 
}
�� 
}
�� 	
private
�� 
Task
�� %
OnSecurityTokenReceived
�� ,
(
��, -/
!SecurityTokenReceivedNotification
��- N
<
��N O"
OpenIdConnectMessage
��O c
,
��c d1
"OpenIdConnectAuthenticationOptions��e �
>��� �
notification��� �
)��� �
{
�� 	
try
�� 
{
�� 
ContextAuth
�� 
.
�� 
Init
��  
(
��  !
notification
��! -
.
��- .
ProtocolMessage
��. =
.
��= >
IdToken
��> E
)
��E F
;
��F G
notification
�� 
.
�� 
Response
�� %
.
��% &
Redirect
��& .
(
��. /
$str
��/ ?
)
��? @
;
��@ A
return
�� 
Task
�� 
.
�� 

FromResult
�� &
(
��& '
$num
��' (
)
��( )
;
��) *
}
�� 
catch
�� 
(
�� 
	Exception
�� 
ex
�� 
)
��  
{
�� 
throw
�� 
new
�� #
HttpResponseException
�� /
(
��/ 0
new
��0 3!
HttpResponseMessage
��4 G
{
�� 

StatusCode
�� 
=
��  
HttpStatusCode
��! /
.
��/ 0

BadRequest
��0 :
,
��: ;
ReasonPhrase
��  
=
��! "
$"
��# %
$str
��% F
{
��F G
ex
��G I
.
��I J
Message
��J Q
}
��Q R
$str
��R S
"
��S T
}
�� 
)
�� 
;
�� 
}
�� 
}
�� 	
private
�� 
static
�� 
bool
�� 
IsAjaxRequest
�� )
(
��) *
IOwinRequest
��* 6
request
��7 >
)
��> ?
{
�� 	
if
�� 
(
�� 
request
�� 
==
�� 
null
�� 
)
��  
{
�� 
throw
�� 
new
�� #
ArgumentNullException
�� /
(
��/ 0
$str
��0 9
)
��9 :
;
��: ;
}
�� 
IHeaderDictionary
�� 
headers
�� %
=
��& '
request
��( /
.
��/ 0
Headers
��0 7
;
��7 8
if
�� 
(
�� 
headers
�� 
!=
�� 
null
�� 
)
��  
{
�� 
var
�� 
contentType
�� 
=
��  !
headers
��" )
[
��) *
$str
��* 8
]
��8 9
;
��9 :
if
�� 
(
�� 
contentType
�� 
!=
��  "
null
��# '
)
��' (
{
�� 
return
�� 
true
�� 
;
��  
}
�� 
}
�� 
return
�� 
false
�� 
;
�� 
}
�� 	
}
�� 
}�� �
UC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\App_Start\WebApiConfig.cs
	namespace		 	
CRMLeadFormLogin		
 
{

 
public 

static 
class 
WebApiConfig $
{ 
public 
static 
void 
Register #
(# $
HttpConfiguration$ 5
config6 <
)< =
{ 	
config 
. 
Filters 
. 
Add 
( 
new "
AuthorizeAttribute# 5
(5 6
)6 7
)7 8
;8 9
List 
< 
DelegatingHandler "
>" #
listaHandlers$ 1
=2 3
new4 7
List8 <
<< =
DelegatingHandler= N
>N O
(O P
)P Q
;Q R
listaHandlers 
. 
Add 
( 
new !
Globals" )
.) *%
RequestAndResponseHandler* C
(C D
)D E
)E F
;F G
config 
. "
MapHttpAttributeRoutes )
() *
)* +
;+ ,
var 
cors 
= 
new 
EnableCorsAttribute .
(. /
$str/ 2
,2 3
$str4 7
,7 8
$str9 <
)< =
;= >
config 
. 

EnableCors 
( 
cors "
)" #
;# $
config 
. 
Routes 
. 
MapHttpRoute &
(& '
name 
: 
$str !
,! "
routeTemplate 
: 
$str 1
,1 2
defaults 
: 
new 
{ 

controller 
=  
$str! +
,+ ,
action 
= 
$str +
}   
,   
handler!! 
:!! 
HttpClientFactory!! *
.!!* +
CreatePipeline!!+ 9
(!!9 :
new"" $
HttpControllerDispatcher"" 0
(""0 1
config""1 7
)""7 8
,""8 9
listaHandlers## !
)##! "
,##" #
constraints$$ 
:$$ 
null$$ !
)$$! "
;$$" #
config&& 
.&& 
Routes&& 
.&& 
MapHttpRoute&& &
(&&& '
name'' 
:'' 
$str'' "
,''" #
routeTemplate(( 
:(( 
$str(( 6
,((6 7
defaults)) 
:)) 
new)) 
{)) 
id))  "
=))# $
RouteParameter))% 3
.))3 4
Optional))4 <
}))= >
)** 
;** 
}++ 	
},, 
}-- �
`C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Areas\Admin\AdminAreaRegistration.cs
	namespace 	
CRMLeadFormLogin
 
. 
Areas  
.  !
Admin! &
{ 
public 

class !
AdminAreaRegistration &
:' (
AreaRegistration) 9
{ 
public 
override 
string 
AreaName '
{		 	
get

 
{ 
return 
$str 
; 
} 
} 	
public 
override 
void 
RegisterArea )
() *#
AreaRegistrationContext* A
contextB I
)I J
{ 	
context 
. 
MapRoute 
( 
name 
: 
$str $
,$ %
url 
: 
$str 6
,6 7
defaults 
: 
new 
{ 
language 
=  
ConfigurationManager 2
.2 3
AppSettings3 >
[> ?
$str? P
]P Q
,Q R

controller 
= 
$str  7
,7 8
action 
= 
$str #
,# $
id 
= 
UrlParameter $
.$ %
Optional% -
,- .
area 
= 
$str !
} 
, 

namespaces 
: 
new 
string  &
[& '
]' (
{) *
$str+ U
}V W
)   
;   
context## 
.## 
MapRoute## 
(## 
name$$ 
:$$ 
$str$$ ,
,$$, -
url%% 
:%% 
$str%% H
,%%H I
defaults&& 
:&& 
new&&  #
{'' 
language(( "
=((# $ 
ConfigurationManager((% 9
.((9 :
AppSettings((: E
[((E F
$str((F W
]((W X
,((X Y

controller)) $
=))% &
$str))' >
,))> ?
action**  
=**! "
$str**# *
,*** +
id++ 
=++ 
UrlParameter++ +
.+++ ,
Optional++, 4
,++4 5
area,, 
=,,  
$str,,! (
}-- 
,-- 

namespaces.. !
:..! "
new..# &
string..' -
[..- .
]... /
{..0 1
$str..2 \
}..] ^
,..^ _
constraints// "
://" #
new//$ '
{//( )
language//* 2
=//3 4
$str//5 B
}//C D
)11 
;11 
}33 	
}44 
}55 �!
vC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Areas\Admin\Controllers\AccountActiveDiretoryController.cs
	namespace 	
CRMLeadFormLogin
 
. 
Areas  
.  !
Admin! &
.& '
Controllers' 2
{ 
public 
class	 +
AccountActiveDiretoryController .
:/ 0
MainController1 ?
{ 
public 

ActionResult 
Login 
( 
) 
{ 
return 
View 
( 
) 
; 
} 
[!! 
HttpPost!! 
]!! 
public"" 


JsonResult"" 
SignIn"" 
("" 
FormCollection"" +
form"", 0
)""0 1
{## 
Login$$ 
userRequest$$ 
=$$ 
new$$ 
Login$$ #
{%% 
User&& 
=&& 
form&& 
[&& 
$str&& 
]&& 
,&& 
Password'' 
='' 
form'' 
['' 
$str'' "
]''" #
}(( 
;(( 
try)) 	
{** 
string,,  
groupActiveDirectory,, #
=,,$ %#
WebConfigurationManager,,& =
.,,= >
AppSettings,,> I
[,,I J
$str,,J a
],,a b
;,,b c
string-- 
error-- 
=-- 
string-- 
.-- 
Empty-- #
;--# $
var.. "
objUserActiveDirectory.. "
=..# $
new..% (
UserInfo..) 1
(..1 2
)..2 3
...3 4
SignActiveDirectory..4 G
(..G H
userRequest..H S
,..S T 
groupActiveDirectory..U i
,..i j
ref..k n
error..o t
)..t u
;..u v
if00 

(00 
!00 
string00 
.00 
IsNullOrEmpty00 !
(00! "
error00" '
)00' (
)00( )
{11 	
return22
 
Json22 
(22 
new22 
{33
 
success44 
=44 
false44 
,44 
messagge55 
=55 
error55 
,55 
}66
 
)66 
;66 
}77 	
if88 

(88 "
objUserActiveDirectory88 "
==88# %
null88& *
)88* +
{99 	
return::
 
Json:: 
(:: 
new:: 
{;;
 
success<< 
=<< 
false<< 
,<< 
messagge== 
=== 
CRMLeadObjects== %
.==% &
	Resources==& /
.==/ 0
General==0 7
.==7 8
General==8 ?
.==? @
GeneralError==@ L
,==L M
}>>
 
)>> 
;>> 
}@@ 	"
objUserActiveDirectoryBB 
.BB 
GroupsBB %
=BB& '"
objUserActiveDirectoryBB( >
.BB> ?
GroupsBB? E
.BBE F
SplitBBF K
(BBK L
$charBBL O
)BBO P
.BBP Q
FirstBBQ V
(BBV W
itemBBW [
=>BB\ ^
itemBB_ c
==BBd f 
groupActiveDirectoryBBg {
)BB{ |
;BB| }
SessionCC 
[CC 
$strCC $
]CC$ %
=CC& '"
objUserActiveDirectoryCC( >
;CC> ?
returnDD 
JsonDD 
(DD 
newDD 
{EE 	
successFF
 
=FF 
trueFF 
,FF 
userGG
 
=GG "
objUserActiveDirectoryGG '
,GG' (
messaggeHH
 
=HH 
$strHH (
,HH( )
}II 	
)II	 

;II
 
}KK 
catchLL 
(LL 
	ExceptionLL 
exLL 
)LL 
{MM 
returnRR 
JsonRR 
(RR 
newRR 
{SS 	
successTT
 
=TT 
falseTT 
,TT 
messaggeUU
 
=UU 
$strUU 
,UUH I
}VV 	
)VV	 

;VV
 
}XX 
}YY 
}ZZ 
}[[ �O
nC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Areas\Admin\Controllers\CustomerAdminController.cs
	namespace 	
CRMLeadFormLogin
 
. 
Areas  
.  !
Admin! &
.& '
Controllers' 2
{ 
[ 
AllowAnonymous 
] 
public 
class	 #
CustomerAdminController &
:' (

Controller) 3
{ 
static 

readonly 
double 
sessionTime &
=' (
Convert) 0
.0 1
ToDouble1 9
(9 : 
ConfigurationManager: N
.N O
AppSettingsO Z
[Z [
$str[ h
]h i
.i j
ToStringj r
(r s
)s t
)t u
;u v
static 

readonly 
double 
ExpiresCookie (
=) *
Convert+ 2
.2 3
ToDouble3 ;
(; < 
ConfigurationManager< P
.P Q
AppSettingsQ \
[\ ]
$str] l
]l m
.m n
ToStringn v
(v w
)w x
)x y
;y z
private 
const 
string 
_AccessToken %
=& '
$str( 6
;6 7
[ 
HttpGet 
] 
public 


JsonResult 
GetSimulateCustomer )
() *
string* 0
customer1 9
,9 :
string; A
languageB J
)J K
{   
try!! 	
{"" 
var## 
user## 
=## 
new## 
BLL## 
.## 
UserInfo## #
(### $
)##$ %
.##% &!
GetCustomerByUserName##& ;
(##; <
customer##< D
)##D E
;##E F
if$$ 

($$ 
user$$ 
==$$ 
null$$ 
)$$ 
{%% 	
return&&
 
Json&& 
(&& 
new&& 
{''
 
success(( 
=(( 
false(( 
,(( 
messagge)) 
=)) 
$str)) 3
,))3 4
}**
 
,** 
JsonRequestBehavior**  
.**  !
AllowGet**! )
)**) *
;*** +
}++ 	
UserActiveDirectory.. 
dataActiveDirectory.. /
=..0 1
new..2 5
UserActiveDirectory..6 I
(..I J
)..J K
;..K L
if// 

(// 
Session// 
[// 
$str// (
]//( )
!=//* ,
null//- 1
)//1 2
{00 	
dataActiveDirectory11
 
=11 
(11  !
UserActiveDirectory11! 4
)114 5
Session115 <
[11< =
$str11= Q
]11Q R
;11R S
}33 	
SettingsCustomerBLL55 
settingsCustomerBLL55 /
=550 1
new552 5
SettingsCustomerBLL556 I
(55I J
)55J K
;55K L
var77 
customerInfo77 
=77 
settingsCustomerBLL77 .
.77. /
GetCustomerById77/ >
(77> ?
customer77? G
)77G H
;77H I
var88 
customerSettings88 
=88 
settingsCustomerBLL88 2
.882 3
SetDictSettings883 B
(88B C
settingsCustomerBLL88C V
.88V W
GetCustomerSettings88W j
(88j k
customer88k s
)88s t
)88t u
;88u v
if99 

(99 
customerInfo99 
.99 
Customer99 !
.99! "
Status99" (
!=99) +
$str99, /
)99/ 0
{:: 	
return;;
 
Json;; 
(;; 
new;; 
{<<
 
success== 
=== 
false== 
,== 
messagge>> 
=>> 
$str>> :
,>>: ;
}??
 
,?? 
JsonRequestBehavior??  
.??  !
AllowGet??! )
)??) *
;??* +
}@@ 	$
CustomPrincipalSerializeBB  
SerializeModelBB! /
=BB0 1
newBB2 5$
CustomPrincipalSerializeBB6 N
(BBN O
)BBO P
{CC 	
EmailDD
 
=DD 
userDD 
.DD 
e_mailDD 
,DD 
FirtNameEE
 
=EE 
userEE 
.EE 
NAMEEE 
,EE 
UserIdFF
 
=FF 
customerInfoFF 
.FF  
CustomerFF  (
.FF( )

CustomerIdFF) 3
,FF3 4 
LoginActiveDirectoryGG
 
=GG  
dataActiveDirectoryGG! 4
.GG4 5
UserGG5 9
,GG9 :!
GroupsActiveDirectoryHH
 
=HH  !
dataActiveDirectoryHH" 5
.HH5 6
GroupsHH6 <
,HH< =
	CompanyIdII
 
=II 
customerInfoII "
?II" #
.II# $
CustomerII$ ,
?II, -
.II- .
	CompanyIdII. 7
,II7 8
ApiKeyJJ
 
=JJ 
customerInfoJJ 
.JJ  
CustomerJJ  (
.JJ( )
ApiKeyJJ) /
,JJ/ 0

CurrencyIdKK
 
=KK 
customerInfoKK #
.KK# $
CustomerKK$ ,
.KK, -

CurrencyIdKK- 7
,KK7 8
ValueSettingLL
 
=LL 
customerSettingsLL )
}MM 	
;MM	 
 
JavaScriptSerializerPP 

serializerPP '
=PP( )
newPP* - 
JavaScriptSerializerPP. B
(PPB C
)PPC D
;PPD E
varRR 

jsonObjectRR 
=RR 
JsonConvertRR $
.RR$ %
SerializeObjectRR% 4
(RR4 5
SerializeModelRR5 C
)RRC D
;RRD E%
FormsAuthenticationTicketUU !

AuthticketUU" ,
=UU- .
newUU/ 2%
FormsAuthenticationTicketUU3 L
(UUL M
$numVV 
,VV 
userWW 
.WW 
NAMEWW 
,WW 
DateTimeXX 
.XX 
NowXX 
,XX 
DateTimeYY 
.YY 
NowYY 
.YY 

AddMinutesYY #
(YY# $
sessionTimeYY$ /
)YY/ 0
,YY0 1
falseZZ 
,ZZ 

jsonObject[[ 
)[[ 
;[[ 
string\\ 
EncriptedTicket\\ 
=\\  
FormsAuthentication\\! 4
.\\4 5
Encrypt\\5 <
(\\< =

Authticket\\= G
)\\G H
;\\H I

HttpCookie]] 
Cookie]] 
=]] 
new]] 

HttpCookie]]  *
(]]* +
FormsAuthentication]]+ >
.]]> ?
FormsCookieName]]? N
,]]N O
EncriptedTicket]]P _
)]]_ `
;]]` a
Response^^ 
.^^ 
Cookies^^ 
.^^ 
Add^^ 
(^^ 
Cookie^^ #
)^^# $
;^^$ %
Listaa 
<aa 
Claimaa 
>aa 
infoUseraa 
=aa 
newaa "
Listaa# '
<aa' (
Claimaa( -
>aa- .
(aa. /
)aa/ 0
{aa1 2
newbb
 
Claimbb 
(bb 
$strbb 
,bb 

jsonObjectbb &
.bb& '
ToStringbb' /
(bb/ 0
)bb0 1
)bb1 2
,bb2 3
}cc	 

;cc
 
varee 
tokenee 
=ee 

JwtManageree 
.ee 
GenerateTokenIwsee /
(ee/ 0
infoUseree0 8
)ee8 9
;ee9 :
vargg 
objJsongg 
=gg 
JsonConvertgg !
.gg! "
SerializeObjectgg" 1
(gg1 2
newgg2 5
{hh 	

accesTokenii
 
=ii 
tokenii 
,ii 
}jj 	
)jj	 

;jj
 

HttpCookienn 
CookieTokennn 
=nn  
newnn! $

HttpCookienn% /
(nn/ 0
_AccessTokennn0 <
,nn< =
objJsonnn> E
)nnE F
;nnF G
Cookieoo 
.oo 
Expiresoo 
=oo 
DateTimeoo !
.oo! "
Nowoo" %
.oo% &

AddMinutesoo& 0
(oo0 1
ExpiresCookieoo1 >
)oo> ?
;oo? @
Responsepp 
.pp 
Cookiespp 
.pp 
Addpp 
(pp 
CookieTokenpp (
)pp( )
;pp) *
returnrr 
Jsonrr 
(rr 
newrr 
{ss 	
successtt
 
=tt 
truett 
,tt 
messaggeuu
 
=uu 
$struu 0
,uu0 1
urlRedirectvv
 
=vv 
Urlvv 
.vv 
Actionvv "
(vv" #
$strvv# *
,vv* +
$strvv, 7
,vv7 8
newvv9 <
{vv= >
languagevv? G
,vvG H
areavvI M
=vvN O
stringvvP V
.vvV W
EmptyvvW \
}vv] ^
)vv^ _
}ww 	
,ww	 

JsonRequestBehaviorww 
.ww 
AllowGetww '
)ww' (
;ww( )
}xx 
catchyy 
(yy 
	Exceptionyy 
exyy 
)yy 
{zz 
return{{ 
Json{{ 
({{ 
new{{ 
{|| 	
success}}
 
=}} 
false}} 
,}} 
messagge~~
 
=~~ 
	Resources~~ 
.~~ 
Account~~ &
.~~& '
Login~~' ,
.~~, -
UserNotFound~~- 9
,~~9 :
} 	
,	 

JsonRequestBehavior 
. 
AllowGet '
)' (
;( )
}
�� 
}
�� 
}
�� 
}�� �
fC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Areas\Admin\Controllers\IndexController.cs
	namespace 	
CRMLeadFormLogin
 
. 
Areas  
.  !
Admin! &
.& '
Controllers' 2
{		 
public

 

class

 
IndexController

  
:

! "
MainController

# 1
{ 
public 
ActionResult 
Index !
(! "
)" #
{ 	
return 
View 
( 
) 
; 
} 	
} 
} �
UC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\ContextApp\ContextAuth.cs
	namespace 	
CRMLeadFormLogin
 
. 

ContextApp %
{ 
public 
class	 
ContextAuth 
{		 
public

 

static

 
ContextAuth

 
Instance

 &
{

' (
get

) ,
;

, -
private

. 5
set

6 9
;

9 :
}

; <
public 

string 
jwt 
{ 
get 
; 
set  
;  !
}" #
private 
ContextAuth 
( 
string 
jwt "
)" #
{ 
this 

.
 
jwt 
= 
jwt 
; 
} 
public 

static 
void 
Init 
( 
string "
jwt# &
)& '
{ 
Instance 
= 
new 
ContextAuth  
(  !
jwt! $
)$ %
;% &
} 
public 

static 
void 
Clear 
( 
) 
{ 
Instance 
= 
null 
; 
} 
}   
}!! ��
\C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\AccountController.cs
	namespace!! 	
CRMLeadFormLogin!!
 
.!! 
Controllers!! &
{"" 
public$$ 

class$$ 
AccountController$$ "
:$$# $
MainController$$% 3
{%% 
static&& 
readonly&& 
double&& 
sessionTime&& *
=&&+ ,
Convert&&- 4
.&&4 5
ToDouble&&5 =
(&&= > 
ConfigurationManager&&> R
.&&R S
AppSettings&&S ^
[&&^ _
$str&&_ l
]&&l m
.&&m n
ToString&&n v
(&&v w
)&&w x
)&&x y
;&&y z
static'' 
readonly'' 
double'' 
ExpiresCookie'' ,
=''- .
Convert''/ 6
.''6 7
ToDouble''7 ?
(''? @ 
ConfigurationManager''@ T
.''T U
AppSettings''U `
[''` a
$str''a p
]''p q
.''q r
ToString''r z
(''z {
)''{ |
)''| }
;''} ~
static(( 
readonly(( 
string(( 
singleSignOnActive(( 1
=((2 3 
ConfigurationManager((4 H
.((H I
AppSettings((I T
[((T U
$str((U i
]((i j
;((j k
private** 
const** 
string** 
_AccessToken** )
=*** +
$str**, :
;**: ;
public++ 
void++ 
SignUpSignIn++  
(++  !
string++! '
redirectUrl++( 3
)++3 4
{,, 	
redirectUrl-- 
=-- 
redirectUrl-- %
??--& (
$str--) ,
;--, -
HttpContext22 
.22 
GetOwinContext22 &
(22& '
)22' (
.22( )
Authentication22) 7
.227 8
	Challenge228 A
(22A B
new22B E$
AuthenticationProperties22F ^
{22_ `
RedirectUri22a l
=22m n
redirectUrl22o z
}22{ |
)22| }
;22} ~
return33 
;33 
}44 	
public77 
ActionResult77 
Login77 !
(77! "
)77" #
{88 	
try99 
{:: 
Session>> 
[>> 
$str>> 
]>>  
=>>! "
$str>># %
;>>% &
var@@ 
jwt@@ 
=@@ 
ContextAuth@@ %
.@@% &
Instance@@& .
?@@. /
.@@/ 0
jwt@@0 3
;@@3 4
varBB 
emailBB 
=BB 
(BB 
(BB 
SystemBB $
.BB$ %
SecurityBB% -
.BB- .
ClaimsBB. 4
.BB4 5
ClaimsIdentityBB5 C
)BBC D
UserBBD H
.BBH I
IdentityBBI Q
)BBQ R
.BBR S
	FindFirstBBS \
(BB\ ]
$strBB] e
)BBe f
;BBf g
ifDD 
(DD 
jwtDD 
==DD 
nullDD 
||DD  "
emailDD# (
==DD) +
nullDD, 0
)DD0 1
{EE 
returnFF 
ViewFF 
(FF  
)FF  !
;FF! "
}GG 

HttpCookieII 
authCookieTII &
=II' (
RequestII) 0
.II0 1
CookiesII1 8
[II8 9
_AccessTokenII9 E
]IIE F
;IIF G
varKK 

userResultKK 
=KK  
newKK! $
UserInfoKK% -
(KK- .
)KK. /
.KK/ 0
GetInfoTraxAuthKK0 ?
(KK? @
emailKK@ E
.KKE F
ValueKKF K
)KKK L
;KKL M
stringLL 

customerIdLL !
=LL" #

userResultLL$ .
?LL. /
.LL/ 0
dataLL0 4
.LL4 5
userLL5 9
.LL9 :
user_idLL: A
;LLA B

customerIdMM 
=MM 
$strMM )
;MM) *
ifNN 
(NN 
!NN 
stringNN 
.NN 
IsNullOrEmptyNN )
(NN) *

customerIdNN* 4
)NN4 5
)NN5 6
{OO 
SettingsCustomerBLLPP '
settingsCustomerBLLPP( ;
=PP< =
newPP> A
SettingsCustomerBLLPPB U
(PPU V
)PPV W
;PPW X
varQQ 
userQQ 
=QQ 
newQQ "
BLLQQ# &
.QQ& '
UserInfoQQ' /
(QQ/ 0
)QQ0 1
.QQ1 2!
GetCustomerByUserNameQQ2 G
(QQG H

customerIdQQH R
)QQR S
;QQS T
varRR 
customerInfoRR $
=RR% &
settingsCustomerBLLRR' :
.RR: ;
GetCustomerByIdRR; J
(RRJ K

customerIdRRK U
)RRU V
;RRV W
varSS 
customerSettingsSS (
=SS) *
settingsCustomerBLLSS+ >
.SS> ?
SetDictSettingsSS? N
(SSN O
settingsCustomerBLLSSO b
.SSb c
GetCustomerSettingsSSc v
(SSv w

customerId	SSw �
)
SS� �
)
SS� �
;
SS� �
ifVV 
(VV 
authCookieTVV #
==VV$ &
nullVV' +
||VV, .
authCookieTVV/ :
.VV: ;
ExpiresVV; B
<VVC D
DateTimeVVE M
.VVM N
UtcNowVVN T
)VVT U
{WW  
JavaScriptSerializerXX ,

serializerXX- 7
=XX8 9
newXX: = 
JavaScriptSerializerXX> R
(XXR S
)XXS T
;XXT U
stringYY 
userDataYY '
=YY( )

serializerYY* 4
.YY4 5
	SerializeYY5 >
(YY> ?
newYY? B
{ZZ 

accesToken[[ &
=[[' (
jwt[[) ,
,[[, -
Email\\ !
=\\" #
user\\$ (
.\\( )
e_mail\\) /
,\\/ 0
FirtName]] $
=]]% &
user]]' +
.]]+ ,
NAME]], 0
,]]0 1
UserId^^ "
=^^# $
customerInfo^^% 1
.^^1 2
Customer^^2 :
.^^: ;

CustomerId^^; E
,^^E F 
LoginActiveDirectory__ 0
=__1 2
string__3 9
.__9 :
Empty__: ?
,__? @!
GroupsActiveDirectory`` 1
=``2 3
string``4 :
.``: ;
Empty``; @
,``@ A
	CompanyIdaa %
=aa& '
customerInfoaa( 4
?aa4 5
.aa5 6
Customeraa6 >
?aa> ?
.aa? @
	CompanyIdaa@ I
,aaI J
ApiKeybb "
=bb# $
customerInfobb% 1
.bb1 2
Customerbb2 :
.bb: ;
ApiKeybb; A
,bbA B

CurrencyIdcc &
=cc' (
customerInfocc) 5
.cc5 6
Customercc6 >
.cc> ?

CurrencyIdcc? I
,ccI J
ValueSettingdd (
=dd) *
customerSettingsdd+ ;
,dd; <
	SessionIdee %
=ee& '
stringee( .
.ee. /
Emptyee/ 4
}ff 
)ff 
;ff 

HttpCookiehh "
Cookiehh# )
=hh* +
newhh, /

HttpCookiehh0 :
(hh: ;
_AccessTokenhh; G
,hhG H
userDatahhI Q
)hhQ R
;hhR S
Cookieii 
.ii 
Expiresii &
=ii' (
DateTimeii) 1
.ii1 2
Nowii2 5
.ii5 6

AddMinutesii6 @
(ii@ A
ExpiresCookieiiA N
)iiN O
;iiO P
Responsejj  
.jj  !
Cookiesjj! (
.jj( )
Addjj) ,
(jj, -
Cookiejj- 3
)jj3 4
;jj4 5
}kk 
}ll 
elsemm 
{nn 
Sessionoo 
[oo 
$stroo #
]oo# $
=oo% &
$stroo' S
;ooS T
}pp 
}rr 
catchss 
(ss 
	Exceptionss 
exss 
)ss  
{tt 
Sessionvv 
[vv 
$strvv 
]vv  
=vv! "
$strvv# 6
+vv7 8
$strvv9 <
+vv= >
exvv? A
.vvA B
MessagevvB I
;vvI J
}ww 
returnxx 
RedirectToActionxx #
(xx# $
$strxx$ +
,xx+ ,
$strxx- 8
)xx8 9
;xx9 :
}
�� 	
public
�� 
void
�� 
ResetPassword
�� !
(
��! "
)
��" #
{
�� 	
HttpContext
�� 
.
�� 
GetOwinContext
�� &
(
��& '
)
��' (
.
��( )
Set
��) ,
(
��, -
$str
��- 5
,
��5 6
Startup
��7 >
.
��> ?#
ResetPasswordPolicyId
��? T
)
��T U
;
��U V
var
�� &
authenticationProperties
�� (
=
��) *
new
��+ .&
AuthenticationProperties
��/ G
{
��H I
RedirectUri
��J U
=
��V W
$str
��X [
}
��\ ]
;
��] ^
HttpContext
�� 
.
�� 
GetOwinContext
�� &
(
��& '
)
��' (
.
��( )
Authentication
��) 7
.
��7 8
	Challenge
��8 A
(
��A B&
authenticationProperties
��B Z
)
��Z [
;
��[ \
return
�� 
;
�� 
}
�� 	
[
�� 	
HttpPost
��	 
]
�� 
[
�� 	&
ValidateAntiForgeryToken
��	 !
]
��! "
public
�� 
ActionResult
�� 
ValidateUser
�� (
(
��( )
Login
��) .
userRequest
��/ :
)
��: ;
{
�� 	
UserInfo
�� 
userInfo
�� 
=
�� 
new
��  #
UserInfo
��$ ,
(
��, -
)
��- .
;
��. /
LoginResponse
�� 
user
�� 
=
��  
userInfo
��! )
.
��) *
Login
��* /
(
��/ 0
userRequest
��0 ;
)
��; <
;
��< =
if
�� 
(
�� 
user
�� 
.
�� 
	SessionId
�� 
==
�� !
null
��" &
)
��& '
{
�� 
ViewBag
�� 
.
�� 
error
�� 
=
�� 
CRMLeadObjects
��  .
.
��. /
	Resources
��/ 8
.
��8 9
Account
��9 @
.
��@ A
Login
��A F
.
��F G
UserOrPassWord
��G U
;
��U V
ViewBag
�� 
.
�� 
error
�� 
=
�� 
CRMLeadObjects
��  .
.
��. /
	Resources
��/ 8
.
��8 9
Account
��9 @
.
��@ A
Login
��A F
.
��F G
UserOrPassWord
��G U
;
��U V
return
�� 
View
�� 
(
�� 
$str
�� #
)
��# $
;
��$ %
}
�� !
SettingsCustomerBLL
�� !
settingsCustomerBLL
��  3
=
��4 5
new
��6 9!
SettingsCustomerBLL
��: M
(
��M N
)
��N O
;
��O P
var
�� 
customerInfo
�� 
=
�� !
settingsCustomerBLL
�� 2
.
��2 3
GetCustomerById
��3 B
(
��B C
user
��C G
.
��G H
UserData
��H P
.
��P Q
USER_ID
��Q X
)
��X Y
;
��Y Z
var
�� 
customerSettings
��  
=
��! "!
settingsCustomerBLL
��# 6
.
��6 7
SetDictSettings
��7 F
(
��F G!
settingsCustomerBLL
��G Z
.
��Z [!
GetCustomerSettings
��[ n
(
��n o
customerInfo
��o {
.
��{ |
Customer��| �
.��� �

CustomerId��� �
)��� �
)��� �
;��� �
var
�� 
	userModel
�� 
=
�� 
new
�� &
CustomPrincipalSerialize
��  8
(
��8 9
)
��9 :
{
�� 
	SessionId
�� 
=
�� 
user
��  
.
��  !
	SessionId
��! *
,
��* +
Email
�� 
=
�� 
user
�� 
.
�� 
UserData
�� %
.
��% &
e_mail
��& ,
,
��, -
FirtName
�� 
=
�� 
user
�� 
.
��  
UserData
��  (
.
��( )
NAME
��) -
,
��- .
UserId
�� 
=
�� 
user
�� 
.
�� 
UserData
�� &
.
��& '
custid
��' -
,
��- ."
LoginActiveDirectory
�� $
=
��% &
string
��' -
.
��- .
Empty
��. 3
,
��3 4#
GroupsActiveDirectory
�� %
=
��& '
string
��( .
.
��. /
Empty
��/ 4
,
��4 5
ApiKey
�� 
=
�� 
customerInfo
�� %
.
��% &
Customer
��& .
.
��. /
ApiKey
��/ 5
,
��5 6

CurrencyId
�� 
=
�� 
customerInfo
�� )
.
��) *
Customer
��* 2
.
��2 3

CurrencyId
��3 =
,
��= >
ValueSetting
�� 
=
�� 
customerSettings
�� /
,
��/ 0
	CompanyId
�� 
=
�� 
customerInfo
�� (
.
��( )
Customer
��) 1
.
��1 2
	CompanyId
��2 ;
}
�� 
;
�� 
var
�� 

jsonObject
�� 
=
�� 
JsonConvert
�� (
.
��( )
SerializeObject
��) 8
(
��8 9
	userModel
��9 B
)
��B C
;
��C D'
FormsAuthenticationTicket
�� %

Authticket
��& 0
=
��1 2
new
��3 6'
FormsAuthenticationTicket
��7 P
(
��P Q
$num
�� 
,
�� 
user
�� 
.
�� 
UserData
�� 
.
�� 
NAME
�� "
,
��" #
DateTime
�� 
.
�� 
Now
�� 
,
�� 
DateTime
�� 
.
�� 
Now
�� 
.
�� 

AddMinutes
�� '
(
��' (
sessionTime
��( 3
)
��3 4
,
��4 5
false
�� 
,
�� 

jsonObject
�� 
)
�� 
;
�� 
string
�� 
EncriptedTicket
�� "
=
��# $!
FormsAuthentication
��% 8
.
��8 9
Encrypt
��9 @
(
��@ A

Authticket
��A K
)
��K L
;
��L M

HttpCookie
�� 
Cookie
�� 
=
�� 
new
��  #

HttpCookie
��$ .
(
��. /!
FormsAuthentication
��/ B
.
��B C
FormsCookieName
��C R
,
��R S
EncriptedTicket
��T c
)
��c d
;
��d e
Response
�� 
.
�� 
Cookies
�� 
.
�� 
Add
��  
(
��  !
Cookie
��! '
)
��' (
;
��( )
List
�� 
<
�� 
Claim
�� 
>
�� 
infoUser
��  
=
��! "
new
��# &
List
��' +
<
��+ ,
Claim
��, 1
>
��1 2
(
��2 3
)
��3 4
{
��5 6
new
��
 
Claim
�� 
(
�� 
$str
�� 
,
�� 

jsonObject
�� &
.
��& '
ToString
��' /
(
��/ 0
)
��0 1
)
��1 2
,
��2 3
}
�� 
;
�� 
var
�� 
token
�� 
=
�� 

JwtManager
�� "
.
��" #
GenerateTokenIws
��# 3
(
��3 4
infoUser
��4 <
)
��< =
;
��= >
var
�� 
objJson
�� 
=
�� 
JsonConvert
�� %
.
��% &
SerializeObject
��& 5
(
��5 6
new
��6 9
{
�� 

accesToken
�� 
=
�� 
token
�� "
,
��" #
}
�� 
)
�� 
;
�� 

HttpCookie
�� 
CookieToken
�� "
=
��# $
new
��% (

HttpCookie
��) 3
(
��3 4
_AccessToken
��4 @
,
��@ A
objJson
��B I
)
��I J
;
��J K
Cookie
�� 
.
�� 
Expires
�� 
=
�� 
DateTime
�� %
.
��% &
Now
��& )
.
��) *

AddMinutes
��* 4
(
��4 5
ExpiresCookie
��5 B
)
��B C
;
��C D
Response
�� 
.
�� 
Cookies
�� 
.
�� 
Add
��  
(
��  !
CookieToken
��! ,
)
��, -
;
��- .
return
�� 
RedirectToAction
�� #
(
��# $
$str
��$ +
,
��+ ,
$str
��- 8
)
��8 9
;
��9 :
}
�� 	
[
�� 	
HttpGet
��	 
]
�� 
public
�� 
ActionResult
�� 
Logout
�� "
(
��" #
)
��# $
{
�� 	

HttpCookie
�� 
myCookie
�� 
=
��  !
new
��" %

HttpCookie
��& 0
(
��0 1
_AccessToken
��1 =
)
��= >
;
��> ?
myCookie
�� 
.
�� 
Expires
�� 
=
�� 
DateTime
�� '
.
��' (
UtcNow
��( .
.
��. /
AddDays
��/ 6
(
��6 7
-
��7 8
$num
��8 9
)
��9 :
;
��: ;
HttpContext
�� 
.
�� 
Request
�� 
.
��  
Cookies
��  '
.
��' (
Clear
��( -
(
��- .
)
��. /
;
��/ 0
bool
�� 
.
�� 
TryParse
�� 
(
��  
singleSignOnActive
�� ,
,
��, -
out
��. 1
var
��2 5
isSingleSignOn
��6 D
)
��D E
;
��E F
ContextAuth
�� 
.
�� 
Clear
�� 
(
�� 
)
�� 
;
��  
if
�� 
(
�� 
!
�� 
isSingleSignOn
�� 
)
��  
{
�� !
FormsAuthentication
�� #
.
��# $
SignOut
��$ +
(
��+ ,
)
��, -
;
��- .
if
�� 
(
�� 
Session
�� 
[
�� 
$str
�� 0
]
��0 1
!=
��2 4
null
��5 9
)
��9 :
{
�� 
Session
�� 
[
�� 
$str
�� 0
]
��0 1
=
��2 3
null
��4 8
;
��8 9
return
�� 
RedirectToAction
�� +
(
��+ ,
$str
��, 3
,
��3 4
$str
��5 L
,
��L M
new
��N Q
{
��R S
Area
��T X
=
��Y Z
$str
��[ b
}
��c d
)
��d e
;
��e f
}
�� 
else
�� 
return
�� 
RedirectToAction
�� +
(
��+ ,
$str
��, 3
,
��3 4
$str
��5 >
)
��> ?
;
��? @
}
�� 
else
�� 
{
�� 
HttpContext
�� 
.
�� 
GetOwinContext
�� *
(
��* +
)
��+ ,
.
��, -
Authentication
��- ;
.
��; <
SignOut
��< C
(
��C D
new
�� &
AuthenticationProperties
�� 0
{
��1 2
RedirectUri
��3 >
=
��? @
CRMLeadFormLogin
��A Q
.
��Q R
Utils
��R W
.
��W X
Globals
��X _
.
��_ `
RedirectUriLogout
��` q
}
��r s
,
��s t1
#OpenIdConnectAuthenticationDefaults
�� 7
.
��7 8 
AuthenticationType
��8 J
,
��J K*
CookieAuthenticationDefaults
�� 0
.
��0 1 
AuthenticationType
��1 C
)
��C D
;
��D E
return
�� 
RedirectToAction
�� '
(
��' (
$str
��( /
,
��/ 0
$str
��1 :
)
��: ;
;
��; <
}
�� 
}
�� 	
public
�� 
async
�� 
Task
�� 

EndSession
�� $
(
��$ %
)
��% &
{
�� 	
await
�� 
MsalAppBuilder
��  
.
��  !!
ClearUserTokenCache
��! 4
(
��4 5
)
��5 6
;
��6 7
IEnumerable
�� 
<
�� '
AuthenticationDescription
�� 1
>
��1 2
	authTypes
��3 <
=
��= >
HttpContext
��? J
.
��J K
GetOwinContext
��K Y
(
��Y Z
)
��Z [
.
��[ \
Authentication
��\ j
.
��j k%
GetAuthenticationTypes��k �
(��� �
)��� �
;��� �
HttpContext
�� 
.
�� 
GetOwinContext
�� &
(
��& '
)
��' (
.
��( )
Authentication
��) 7
.
��7 8
SignOut
��8 ?
(
��? @
	authTypes
��@ I
.
��I J
Select
��J P
(
��P Q
t
��Q R
=>
��S U
t
��V W
.
��W X 
AuthenticationType
��X j
)
��j k
.
��k l
ToArray
��l s
(
��s t
)
��t u
)
��u v
;
��v w
Request
�� 
.
�� 
GetOwinContext
�� "
(
��" #
)
��# $
.
��$ %
Authentication
��% 3
.
��3 4$
GetAuthenticationTypes
��4 J
(
��J K
)
��K L
;
��L M
}
�� 	
}
�� 
}�� �
YC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\HomeController.cs
	namespace 	
CRMLeadFormLogin
 
. 
Controllers &
{ 
public 
class	 
HomeController 
: 
MainController  .
{ 
[ 
	Authorize 
] 
public 

ActionResult 
Index 
( 
) 
{ 
return 
View 
( 
) 
; 
} 
public 

ActionResult 
About 
( 
) 
{ 
ViewBag 
. 
Message 
= 
$str <
;< =
return 
View 
( 
) 
; 
} 
public 

ActionResult 
Contact 
(  
)  !
{ 
ViewBag 
. 
Message 
= 
$str ,
;, -
return   
View   
(   
)   
;   
}!! 
public## 

ActionResult## 
Diseno## 
(## 
)##  
{$$ 
try** 	
{++ 
return-- 
View-- 
(-- 
)-- 
;-- 
}// 
catch00 
{11 
throw22 
;22 
}33 
}55 
public77 

ActionResult77 
Orders77 
(77 
)77  
{88 
return99 
View99 
(99 
)99 
;99 
};; 
[>> 
OutputCache>> 
(>> 
Duration>> 
=>> 
$num>>  
,>>  !
VaryByParam>>" -
=>>. /
$str>>0 6
)>>6 7
]>>7 8
public?? 

PartialViewResult?? 
NavigationMenu?? +
(??+ ,
string??, 2
lang??3 7
)??7 8
{@@ 
varAA 	
menuAA
 
=AA 
newAA 
NavigationMenuBLLAA &
(AA& '
)AA' (
.AA( )
GetMenuAA) 0
(AA0 1
MenuTypeAA1 9
.AA9 :
NavigationMenuAA: H
)AAH I
;AAI J
returnCC 
PartialViewCC 
(CC 
$strCC *
,CC* +
menuCC, 0
)CC0 1
;CC1 2
}DD 
publicFF 

PartialViewResultFF 
AccountMenuFF (
(FF( )
)FF) *
{GG 
varHH 	
menuHH
 
=HH 
newHH 
NavigationMenuBLLHH &
(HH& '
)HH' (
.HH( )
GetMenuHH) 0
(HH0 1
MenuTypeHH1 9
.HH9 :
AccountMenuHH: E
)HHE F
;HHF G
returnII 
PartialViewII 
(II 
$strII '
,II' (
menuII) -
)II- .
;II. /
}JJ 
}MM 
}NN ��
\C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\LeadApiController.cs
	namespace!! 	
CRMLeadFormLogin!!
 
.!! 
Controllers!! &
.!!& '
Lead!!' +
{"" 
public$$ 

class$$ 
LeadApiController$$ "
:$$# $
ApiController$$% 2
{%% 
Cache&& 
cache&& 
=&& 
new&& 
Cache&& 
(&&  
)&&  !
;&&! "
string(( 
jsonFilePath(( 
=(( 
$"((  
{((  !
HttpRuntime((! ,
.((, -
AppDomainAppPath((- =
}((= >
$str((> e
"((e f
;((f g
List)) 
<)) 
GeographyLevel)) 
>)) 
ListGeographyLevel)) /
=))0 1
new))2 5
List))6 :
<)): ;
GeographyLevel)); I
>))I J
())J K
)))K L
;))L M
string,, "
jsonFilePathCreateJson,, %
=,,& '
$",,( *
{,,* +
HttpRuntime,,+ 6
.,,6 7
AppDomainAppPath,,7 G
},,G H
$str,,H y
",,y z
;,,z {
public.. 
void.. 
getCache.. 
(.. 
string.. #
	jsonLevel..$ -
)..- .
{// 	
CacheDependency11 

cacheLevel11 &
=11' (
new11) ,
CacheDependency11- <
(11< =
	jsonLevel11= F
)11F G
;11G H
string22 
json22 
=22 
File22 
.22 
ReadAllText22 *
(22* +
	jsonLevel22+ 4
)224 5
;225 6
cache33 
.33 
Insert33 
(33 
$str33 &
,33& '
json33( ,
,33, -

cacheLevel33. 8
)338 9
;339 :
}44 	
public66 
void66 
readFile66 
(66 
Level66 "
level66# (
,66( )
LevelConfiguration66* <
configuration66= J
,66J K
List66L P
<66P Q
LevelConfiguration66Q c
>66c d
deserializedLevel66e v
,66v w
bool66x |

ExistLevel	66} �
=
66� �
false
66� �
)
66� �
{77 	
List99 
<99 
Options99 
>99 
listOptions99 %
=99& '
new99( +
List99, 0
<990 1
Options991 8
>998 9
(999 :
)99: ;
;99; <
var:: 
package:: 
=:: 
new:: 
ExcelPackage:: *
(::* +
new::+ .
FileInfo::/ 7
(::7 8
$str	::8 �
+
::� �
level
::� �
.
::� �
levelId
::� �
+
::� �
$str
::� �
)
::� �
)
::� �
;
::� �
ExcelWorksheet;; 
	workSheet;; $
=;;% &
package;;' .
.;;. /
Workbook;;/ 7
.;;7 8

Worksheets;;8 B
[;;B C
$num;;C D
];;D E
;;;E F
var<< 
start<< 
=<< 
	workSheet<< !
.<<! "
	Dimension<<" +
.<<+ ,
Start<<, 1
;<<1 2
var== 
end== 
=== 
	workSheet== 
.==  
	Dimension==  )
.==) *
End==* -
;==- .
for>> 
(>> 
int>> 
row>> 
=>> 
start>>  
.>>  !
Row>>! $
+>>% &
$num>>' (
;>>( )
row>>* -
<=>>. 0
end>>1 4
.>>4 5
Row>>5 8
;>>8 9
row>>: =
++>>= ?
)>>? @
{?? 
int@@ 
index@@ 
=@@ 
$num@@ 
;@@ 
ifAA 
(AA 
levelAA 
.AA 
levelIdAA !
==AA" $
$numAA% &
||AA' )
levelAA* /
.AA/ 0
levelIdAA0 7
==AA8 :
$numAA; <
)AA< =
{BB 
indexCC 
=CC 
$numCC 
;CC 
}DD 
ifEE 
(EE 
levelEE 
.EE 
levelIdEE !
==EE" $
$numEE% &
||EE' )
levelEE* /
.EE/ 0
levelIdEE0 7
==EE8 :
$numEE; <
)EE< =
{FF 
indexGG 
=GG 
$numGG 
;GG 
}HH 
stringJJ 
	cellValueJJ  
=JJ! "
	workSheetJJ# ,
.JJ, -
CellsJJ- 2
[JJ2 3
rowJJ3 6
,JJ6 7
indexJJ8 =
]JJ= >
.JJ> ?
TextJJ? C
;JJC D
ifKK 
(KK 
	cellValueKK 
==KK  
configurationKK! .
.KK. /
	companyIdKK/ 8
)KK8 9
{LL 
OptionsMM 
OptionMM "
=MM# $
newMM% (
OptionsMM) 0
(MM0 1
)MM1 2
;MM2 3
OptionOO 
.OO 
levelReferenceOO )
=OO* +
levelOO, 1
.OO1 2
levelReferenceOO2 @
;OO@ A
OptionPP 
.PP 

optionGuidPP %
=PP& '
	workSheetPP( 1
.PP1 2
CellsPP2 7
[PP7 8
rowPP8 ;
,PP; <
$numPP= >
]PP> ?
.PP? @
TextPP@ D
;PPD E
OptionQQ 
.QQ 
optionIdQQ #
=QQ$ %
listOptionsQQ& 1
.QQ1 2
CountQQ2 7
+QQ8 9
$numQQ: ;
;QQ; <
OptionRR 
.RR 
optionValueRR &
=RR' (
	workSheetRR) 2
.RR2 3
CellsRR3 8
[RR8 9
rowRR9 <
,RR< =
$numRR> ?
]RR? @
.RR@ A
TextRRA E
;RRE F
ifTT 
(TT 
levelTT 
.TT 
levelIdTT %
==TT& (
$numTT) *
)TT* +
{UU 
OptionVV 
.VV 
parentOptionVV +
=VV, -
$numVV. /
;VV/ 0
}WW 
elseXX 
{YY 
stringZZ 
parentZZ %
=ZZ& '
	workSheetZZ( 1
.ZZ1 2
CellsZZ2 7
[ZZ7 8
rowZZ8 ;
,ZZ; <
$numZZ= >
]ZZ> ?
.ZZ? @
TextZZ@ D
;ZZD E
var[[ 

afterLevel[[ &
=[[' (
deserializedLevel[[) :
.[[: ;
Find[[; ?
([[? @
x[[@ A
=>[[B D
x[[E F
.[[F G
	companyId[[G P
==[[Q S
configuration[[T a
.[[a b
	companyId[[b k
)[[k l
.[[l m
level[[m r
.[[r s
Find[[s w
([[w x
y[[x y
=>[[z |
y[[} ~
.[[~ 
	nextLevel	[[ �
==
[[� �
level
[[� �
.
[[� �
levelId
[[� �
)
[[� �
;
[[� �
int]] 
optionId]] $
=]]% &
ListGeographyLevel]]' 9
.]]9 :
Find]]: >
(]]> ?
x]]? @
=>]]A C
x]]D E
.]]E F
levelId]]F M
==]]N P

afterLevel]]Q [
.]][ \
levelId]]\ c
)]]c d
.]]d e
	companies]]e n
.]]n o
Find]]o s
(]]s t
y]]t u
=>]]v x
y]]y z
.]]z {
	companyId	]]{ �
==
]]� �
configuration
]]� �
.
]]� �
	companyId
]]� �
)
]]� �
.
]]� �
options
]]� �
.
]]� �
Find
]]� �
(
]]� �
z
]]� �
=>
]]� �
z
]]� �
.
]]� �
optionValue
]]� �
==
]]� �
parent
]]� �
)
]]� �
.
]]� �
optionId
]]� �
;
]]� �
Option^^ 
.^^ 
parentOption^^ +
=^^, -
optionId^^. 6
;^^6 7
}__ 
listOptions`` 
.``  
Add``  #
(``# $
Option``$ *
)``* +
;``+ ,
}aa 
}bb 
	Companiescc 
Companiecc 
=cc  
newcc! $
	Companiescc% .
(cc. /
)cc/ 0
;cc0 1
Companiedd 
.dd 
	companyIddd 
=dd  
configurationdd! .
.dd. /
	companyIddd/ 8
;dd8 9
Companieee 
.ee 
optionsee 
=ee 
listOptionsee *
;ee* +
ifhh 
(hh 

ExistLevelhh 
)hh 
{ii 
ListGeographyLevelkk "
.kk" #
Findkk# '
(kk' (
xkk( )
=>kk* ,
xkk- .
.kk. /
levelIdkk/ 6
==kk7 9
levelkk: ?
.kk? @
levelIdkk@ G
)kkG H
.kkH I
	companieskkI R
.kkR S
AddkkS V
(kkV W
CompaniekkW _
)kk_ `
;kk` a
}ll 
elsemm 
{nn 
GeographyLeveloo 
GeographyLeveloo -
=oo. /
newoo0 3
GeographyLeveloo4 B
(ooB C
)ooC D
;ooD E
GeographyLevelpp 
.pp 
levelIdpp &
=pp' (
levelpp) .
.pp. /
levelIdpp/ 6
;pp6 7
Listqq 
<qq 
	Companiesqq 
>qq 
listCompaniesqq  -
=qq. /
newqq0 3
Listqq4 8
<qq8 9
	Companiesqq9 B
>qqB C
(qqC D
)qqD E
;qqE F
listCompaniesrr 
.rr 
Addrr !
(rr! "
Companierr" *
)rr* +
;rr+ ,
GeographyLevelss 
.ss 
	companiesss (
=ss) *
listCompaniesss+ 8
;ss8 9
ListGeographyLeveltt "
.tt" #
Addtt# &
(tt& '
GeographyLeveltt' 5
)tt5 6
;tt6 7
}uu 
}vv 	
[xx 	
AllowAnonymousxx	 
]xx 
[yy 	
Routeyy	 
(yy 
$stryy 
)yy  
]yy  !
[zz 	
HttpGetzz	 
]zz 
public{{ 
HttpResponseMessage{{ "

CreateFile{{# -
({{- .
){{. /
{|| 	
try}} 
{~~ 
string 
json 
= 
File "
." #
ReadAllText# .
(. /"
jsonFilePathCreateJson/ E
)E F
;F G
var
�� 
deserializedLevel
�� %
=
��& '
JsonConvert
��( 3
.
��3 4
DeserializeObject
��4 E
<
��E F
List
��F J
<
��J K 
LevelConfiguration
��K ]
>
��] ^
>
��^ _
(
��_ `
json
��` d
)
��d e
;
��e f
foreach
�� 
(
�� 
var
�� 
configuration
�� *
in
��+ -
deserializedLevel
��. ?
)
��? @
{
�� 
foreach
�� 
(
�� 
var
��  
level
��! &
in
��' )
configuration
��* 7
.
��7 8
level
��8 =
)
��= >
{
�� 
if
�� 
(
�� 
(
�� 
!
��  
ListGeographyLevel
�� 0
.
��0 1
Exists
��1 7
(
��7 8
x
��8 9
=>
��: <
x
��= >
.
��> ?
levelId
��? F
==
��G I
level
��J O
.
��O P
levelId
��P W
)
��W X
)
��X Y
)
��Y Z
{
�� 
readFile
�� $
(
��$ %
level
��% *
,
��* +
configuration
��, 9
,
��9 :
deserializedLevel
��; L
)
��L M
;
��M N
}
�� 
else
�� 
{
�� 
if
�� 
(
��  
!
��  ! 
ListGeographyLevel
��! 3
.
��3 4
Find
��4 8
(
��8 9
x
��9 :
=>
��; =
x
��> ?
.
��? @
levelId
��@ G
==
��H J
level
��K P
.
��P Q
levelId
��Q X
)
��X Y
.
��Y Z
	companies
��Z c
.
��c d
Exists
��d j
(
��j k
y
��k l
=>
��m o
y
��p q
.
��q r
	companyId
��r {
==
��| ~
configuration�� �
.��� �
	companyId��� �
)��� �
)��� �
{
�� 
readFile
��  (
(
��( )
level
��) .
,
��. /
configuration
��0 =
,
��= >
deserializedLevel
��? P
,
��P Q
true
��R V
)
��V W
;
��W X
}
�� 
}
�� 
}
�� 
}
�� 
string
�� 
JsonResponse
�� #
=
��$ %
JsonConvert
��& 1
.
��1 2
SerializeObject
��2 A
(
��A B 
ListGeographyLevel
��B T
)
��T U
;
��U V
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =
OK
��= ?
)
��? @
;
��@ A
}
�� 
catch
�� 
(
�� 
	Exception
�� 
ex
�� 
)
��  
{
�� 
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =!
InternalServerError
��= P
,
��P Q
ex
��R T
.
��T U
Message
��U \
)
��\ ]
;
��] ^
}
�� 
}
�� 	
[
�� 	
AllowAnonymous
��	 
]
�� 
[
�� 	
Route
��	 
(
�� 
$str
�� 6
)
��6 7
]
��7 8
[
�� 	
HttpGet
��	 
]
�� 
public
�� !
HttpResponseMessage
�� ""
SteptsSectionsFields
��# 7
(
��7 8
string
��8 >
	CompanyID
��? H
=
��I J
$str
��K P
)
��P Q
{
�� 	
try
�� 
{
�� 
GetOptionSet
�� 
(
�� 
$str
�� 1
)
��1 2
;
��2 3
string
�� 
jsonFilePath
�� #
=
��$ %
$"
��& (
{
��( )
HttpRuntime
��) 4
.
��4 5
AppDomainAppPath
��5 E
}
��E F
$str
��F V
{
��V W
	CompanyID
��W `
}
��` a
$str
��a f
"
��f g
;
��g h
string
�� 
json
�� 
=
�� 
File
�� "
.
��" #
ReadAllText
��# .
(
��. /
jsonFilePath
��/ ;
)
��; <
;
��< =
var
�� 
CompaniesField
�� "
=
��# $
JsonConvert
��% 0
.
��0 1
DeserializeObject
��1 B
<
��B C
SteptsCompany
��C P
>
��P Q
(
��Q R
json
��R V
)
��V W
;
��W X
getCache
�� 
(
�� 
$"
�� 
{
�� 
HttpRuntime
�� '
.
��' (
AppDomainAppPath
��( 8
}
��8 9
$str
��9 `
"
��` a
)
��a b
;
��b c
string
�� #
jsonFilePathGeography
�� ,
=
��- .
$"
��/ 1
{
��1 2
HttpRuntime
��2 =
.
��= >
AppDomainAppPath
��> N
}
��N O
$str
��O r
"
��r s
;
��s t
string
�� 
jsonGeography
�� $
=
��% &
File
��' +
.
��+ ,
ReadAllText
��, 7
(
��7 8#
jsonFilePathGeography
��8 M
)
��M N
;
��N O
var
�� #
deserializedGeography
�� )
=
��* +
JsonConvert
��, 7
.
��7 8
DeserializeObject
��8 I
<
��I J
List
��J N
<
��N O
GeographyLevel
��O ]
>
��] ^
>
��^ _
(
��_ `
jsonGeography
��` m
)
��m n
;
��n o
var
�� 
options
�� 
=
�� #
deserializedGeography
�� 3
.
��3 4
SingleOrDefault
��4 C
(
��C D
x
��D E
=>
��F H
x
��I J
.
��J K
levelId
��K R
==
��S U
$num
��V W
)
��W X
.
��X Y
	companies
��Y b
.
��b c
SingleOrDefault
��c r
(
��r s
o
��s t
=>
��u w
o
��x y
.
��y z
	companyId��z �
==��� �
	CompanyID��� �
)��� �
.��� �
options��� �
;��� �
List
�� 
<
�� 
Option
�� 
>
�� 

lstOptions
�� '
=
��( )
new
��* -
List
��. 2
<
��2 3
Option
��3 9
>
��9 :
(
��: ;
)
��; <
;
��< =
foreach
�� 
(
�� 
var
�� 
op
�� 
in
��  "
options
��# *
)
��* +
{
�� 
Option
�� 
option
�� !
=
��" #
new
��$ '
Option
��( .
(
��. /
)
��/ 0
;
��0 1
option
�� 
.
�� 
optionId
�� #
=
��$ %
op
��& (
.
��( )
optionId
��) 1
;
��1 2
option
�� 
.
�� 

optionGuid
�� %
=
��& '
op
��( *
.
��* +

optionGuid
��+ 5
;
��5 6
option
�� 
.
�� 
optionValue
�� &
=
��' (
op
��) +
.
��+ ,
optionValue
��, 7
;
��7 8

lstOptions
�� 
.
�� 
Add
�� "
(
��" #
option
��# )
)
��) *
;
��* +
}
�� 
CompaniesField
�� 
.
�� 
Stepts
�� %
.
��% &
SingleOrDefault
��& 5
(
��5 6
x
��6 7
=>
��8 :
x
��; <
.
��< =
SteptID
��= D
==
��E G
$num
��H I
)
��I J
.
��J K
Sections
��K S
.
��S T
SingleOrDefault
��T c
(
��c d
o
��d e
=>
��f h
o
��i j
.
��j k
	SectionID
��k t
==
��u w
$num
��x y
)
��y z
.
��z {
fields��{ �
.��� �
SingleOrDefault��� �
(��� �
f��� �
=>��� �
f��� �
.��� �
geographicLevel��� �
==��� �
$num��� �
)��� �
.��� �
options��� �
=��� �

lstOptions��� �
;��� �
var
�� 
	countryId
�� 
=
�� 
new
��  #
	JProperty
��$ -
(
��- .
$str
��. 9
,
��9 :
CompaniesField
��; I
.
��I J
	CountryID
��J S
)
��S T
;
��T U
var
�� 
companyPhone
��  
=
��! "
new
��# &
	JProperty
��' 0
(
��0 1
$str
��1 ?
,
��? @
CompaniesField
��A O
.
��O P
CompanyPhone
��P \
)
��\ ]
;
��] ^
var
�� 
contactDocument
�� #
=
��$ %
new
��& )
	JProperty
��* 3
(
��3 4
$str
��4 E
,
��E F
CompaniesField
��G U
.
��U V
ContactDocument
��V e
)
��e f
;
��f g
var
�� 

jsonObject
�� 
=
��  
new
��! $
JObject
��% ,
(
��, -
	countryId
��- 6
,
��6 7
companyPhone
��8 D
,
��D E
contactDocument
��F U
,
��U V
new
��W Z
	JProperty
��[ d
(
��d e
$str
��e m
,
��m n
CompaniesField
��o }
?
��} ~
.
��~ 
Stepts�� �
.��� �
Select��� �
(��� �
x��� �
=>��� �
new��� �
JObject��� �
(��� �
new
�� 
	JProperty
�� (
(
��( )
$str
��) 2
,
��2 3
x
��4 5
.
��5 6
SteptID
��6 =
)
��= >
,
��> ?
new
�� 
	JProperty
�� (
(
��( )
$str
��) 4
,
��4 5
Resource
��6 >
.
��> ?
Lead
��? C
.
��C D
ResourceManager
��D S
.
��S T
	GetString
��T ]
(
��] ^
x
��^ _
.
��_ `
	SteptName
��` i
)
��i j
)
��j k
,
��k l
new
�� 
	JProperty
�� (
(
��( )
$str
��) 3
,
��3 4
new
�� 
JArray
�� %
(
��% &
x
��% &
.
��& '
Sections
��' /
.
��/ 0
Select
��0 6
(
��6 7
s
��7 8
=>
��9 ;
new
��< ?
JObject
��@ G
(
��G H
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 D
,
��D E
s
��F G
.
��G H
	SectionID
��H Q
)
��Q R
,
��R S
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 F
,
��F G
Resource
��H P
.
��P Q
Lead
��Q U
.
��U V
ResourceManager
��V e
.
��e f
	GetString
��f o
(
��o p
s
��p q
.
��q r
SectionName
��r }
)
��} ~
)
��~ 
,�� �
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 C
,
��C D
s
��E F
.
��F G
SubTitle
��G O
!=
��P R
null
��S W
?
��X Y
Resource
��Z b
.
��b c
Lead
��c g
.
��g h
ResourceManager
��h w
.
��w x
	GetString��x �
(��� �
s��� �
.��� �
SubTitle��� �
)��� �
:��� �
null��� �
)��� �
,��� �
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 A
,
��A B
new
��+ .
JArray
��/ 5
(
��5 6
s
��% &
.
��& '
fields
��' -
.
��- .
Where
��. 3
(
��3 4
y
��4 5
=>
��6 8
y
��9 :
.
��: ;
	isVisible
��; D
!=
��E G
false
��H M
)
��M N
.
��N O
Select
��O U
(
��U V
f
��V W
=>
��X Z
new
��[ ^
JObject
��_ f
(
��f g
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 B
,
��B C
f
��D E
.
��E F
fieldID
��F M
)
��M N
,
��N O
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 E
,
��E F
f
��G H
.
��H I

isRequired
��I S
)
��S T
,
��T U
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 @
,
��@ A
f
��B C
.
��C D
label
��D I
==
��J L
$str
��M P
?
��Q R
$str
��S U
:
��V W
Resource
��X `
.
��` a
Lead
��a e
.
��e f
ResourceManager
��f u
.
��u v
	GetString
��v 
(�� �
f��� �
.��� �
label��� �
)��� �
)��� �
,��� �
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 ?
,
��? @
f
��A B
.
��B C
name
��C G
)
��G H
,
��H I
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 D
,
��D E
f
��F G
.
��G H
	guidValue
��H Q
)
��Q R
,
��R S
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 D
,
��D E
f
��F G
.
��G H
	fieldType
��H Q
)
��Q R
,
��R S
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 F
,
��F G
f
��H I
.
��I J
showSummary
��J U
)
��U V
,
��V W
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 D
,
��D E
f
��F G
.
��G H
	isVisible
��H Q
)
��Q R
,
��R S
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 J
,
��J K
f
��L M
.
��M N
geographicLevel
��N ]
)
��] ^
,
��^ _
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 B
,
��B C
f
��D E
.
��E F
isBlock
��F M
)
��M N
,
��N O
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 H
,
��H I
f
��J K
.
��K L
hasDependency
��L Y
)
��Y Z
,
��Z [
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 B
,
��B C
f
��D E
.
��E F
	optionSet
��F O
!=
��P R
null
��S W
?
��X Y
new
��Z ]
JArray
��^ d
(
��d e
GetOptionSet
��e q
(
��q r
f
��r s
.
��s t
	optionSet
��t }
)
��} ~
.
��~ 
Select�� �
(��� �
o��� �
=>��� �
new��� �
JObject��� �
(��� �
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 C
,
��C D
o
��E F
.
��F G
optionId
��G O
)
��O P
,
��P Q
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 E
,
��E F
o
��G H
.
��H I

optionGuid
��I S
)
��S T
,
��T U
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 F
,
��F G
Resource
��H P
.
��P Q
Lead
��Q U
.
��U V
ResourceManager
��V e
.
��e f
	GetString
��f o
(
��o p
o
��p q
.
��q r
optionValue
��r }
)
��} ~
!=�� �
null��� �
?��� �
Resource��� �
.��� �
Lead��� �
.��� �
ResourceManager��� �
.��� �
	GetString��� �
(��� �
o��� �
.��� �
optionValue��� �
)��� �
:��� �
o��� �
.��� �
optionValue��� �
)��� �
,��� �
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 E
,
��E F
o
��G H
.
��H I

dependency
��I S
!=
��T V
null
��W [
?
��\ ]
new
��+ .
JObject
��/ 6
(
��6 7
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; S
,
��S T
o
��U V
.
��V W

dependency
��W a
.
��a b$
fieldsThatDependsBlock
��b x
)
��x y
,
��y z
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; T
,
��T U
o
��V W
.
��W X

dependency
��X b
.
��b c%
fieldsThatDependsActive
��c z
)
��z {
)
��{ |
:
��+ ,
null
��- 1
)
��1 2
,
��2 3
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 E
,
��E F
o
��G H
.
��H I

fieldsShow
��I S
!=
��T V
null
��W [
?
��\ ]
new
��+ .
JArray
��/ 5
(
��5 6
o
��6 7
.
��7 8

fieldsShow
��8 B
.
��B C
Select
��C I
(
��I J
w
��J K
=>
��L N
new
��O R
JObject
��S Z
(
��Z [
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; A
,
��A B
w
��C D
.
��D E
step
��E I
)
��I J
,
��J K
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; D
,
��D E
w
��F G
.
��G H
section
��H O
)
��O P
,
��P Q
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; B
,
��B C
w
��D E
.
��E F
field
��F K
)
��K L
)
��L M
)
��M N
)
��. /
:
��+ ,
null
��- 1
)
��1 2
,
��2 3
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 E
,
��E F
o
��G H
.
��H I

fieldsHide
��I S
!=
��T V
null
��W [
?
��\ ]
new
��+ .
JArray
��/ 5
(
��5 6
o
��6 7
.
��7 8

fieldsHide
��8 B
.
��B C
Select
��C I
(
��I J
z
��J K
=>
��L N
new
��O R
JObject
��S Z
(
��Z [
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; A
,
��A B
z
��C D
.
��D E
step
��E I
)
��I J
,
��J K
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; D
,
��D E
z
��F G
.
��G H
section
��H O
)
��O P
,
��P Q
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; B
,
��B C
z
��D E
.
��E F
field
��F K
)
��K L
)
��- .
)
��. /
)
��/ 0
:
��1 2
null
��3 7
)
��7 8
)
��3 4
)
��1 2
)
��/ 0
:
��1 2
f
��+ ,
.
��, -
options
��- 4
!=
��5 7
null
��8 <
?
��= >
new
��? B
JArray
��C I
(
��I J
f
��+ ,
.
��, -
options
��- 4
.
��4 5
Select
��5 ;
(
��; <
o
��< =
=>
��> @
new
��A D
JObject
��E L
(
��L M
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 C
,
��C D
o
��E F
.
��F G
optionId
��G O
)
��O P
,
��P Q
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 E
,
��E F
o
��G H
.
��H I

optionGuid
��I S
)
��S T
,
��T U
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 F
,
��F G
o
��H I
.
��I J
optionValue
��J U
)
��U V
,
��V W
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 E
,
��E F
o
��G H
.
��H I

dependency
��I S
!=
��T V
null
��W [
?
��\ ]
new
��+ .
JObject
��/ 6
(
��6 7
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; S
,
��S T
o
��U V
.
��V W

dependency
��W a
.
��a b$
fieldsThatDependsBlock
��b x
)
��x y
,
��y z
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; T
,
��T U
o
��V W
.
��W X

dependency
��X b
.
��b c%
fieldsThatDependsActive
��c z
)
��z {
)
��{ |
:
��+ ,
null
��- 1
)
��1 2
,
��2 3
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 E
,
��E F
o
��G H
.
��H I

fieldsShow
��I S
!=
��T V
null
��W [
?
��\ ]
new
��+ .
JArray
��/ 5
(
��5 6
o
��6 7
.
��7 8

fieldsShow
��8 B
.
��B C
Select
��C I
(
��I J
w
��J K
=>
��L N
new
��O R
JObject
��S Z
(
��Z [
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; A
,
��A B
w
��C D
.
��D E
step
��E I
)
��I J
,
��J K
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; D
,
��D E
w
��F G
.
��G H
section
��H O
)
��O P
,
��P Q
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; B
,
��B C
w
��D E
.
��E F
field
��F K
)
��K L
)
��L M
)
��M N
)
��. /
:
��+ ,
null
��- 1
)
��1 2
,
��2 3
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 E
,
��E F
o
��G H
.
��H I

fieldsHide
��I S
!=
��T V
null
��W [
?
��\ ]
new
��+ .
JArray
��/ 5
(
��5 6
o
��6 7
.
��7 8

fieldsHide
��8 B
.
��B C
Select
��C I
(
��I J
z
��J K
=>
��L N
new
��O R
JObject
��S Z
(
��Z [
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; A
,
��A B
z
��C D
.
��D E
step
��E I
)
��I J
,
��J K
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; D
,
��D E
z
��F G
.
��G H
section
��H O
)
��O P
,
��P Q
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; B
,
��B C
z
��D E
.
��E F
field
��F K
)
��K L
)
��- .
)
��. /
)
��/ 0
:
��1 2
null
��3 7
)
��7 8
)
��3 4
)
��1 2
)
��/ 0
:
��1 2
null
��3 7
)
��+ ,
,
��, -
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 @
,
��@ A
f
��B C
.
��C D
group
��D I
!=
��J L
null
��M Q
?
��R S
new
��+ .
JObject
��/ 6
(
��6 7
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 B
,
��B C
f
��D E
.
��E F
group
��F K
.
��K L
groupId
��L S
)
��S T
,
��T U
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 @
,
��@ A
f
��B C
.
��C D
group
��D I
.
��I J
order
��J O
)
��O P
,
��P Q
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 E
,
��E F
f
��G H
.
��H I
group
��I N
.
��N O

classStyle
��O Y
)
��4 5
)
��- .
:
��/ 0
null
��1 5
)
��+ ,
,
��, -
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 F
,
��F G
f
��H I
.
��I J
groupSumary
��J U
!=
��V X
null
��Y ]
?
��^ _
new
��+ .
JObject
��/ 6
(
��6 7
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 B
,
��B C
f
��D E
.
��E F
groupSumary
��F Q
.
��Q R
groupId
��R Y
)
��Y Z
,
��Z [
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 @
,
��@ A
f
��B C
.
��C D
groupSumary
��D O
.
��O P
order
��P U
)
��U V
,
��V W
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 D
,
��D E
f
��F G
.
��G H
groupSumary
��H S
.
��S T
	separator
��T ]
)
��] ^
)
��- .
:
��/ 0
null
��1 5
)
��+ ,
,
��, -
new
��+ .
	JProperty
��/ 8
(
��8 9
$str
��9 @
,
��@ A
f
��B C
.
��C D
rules
��D I
!=
��J L
null
��M Q
?
��R S
new
��+ .
JObject
��/ 6
(
��6 7
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; F
,
��F G
f
��H I
.
��I J
rules
��J O
.
��O P
	uppercase
��P Y
)
��Y Z
,
��Z [
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; F
,
��F G
f
��H I
.
��I J
rules
��J O
.
��O P
	minlength
��P Y
)
��Y Z
,
��Z [
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; F
,
��F G
f
��H I
.
��I J
rules
��J O
.
��O P
	maxlength
��P Y
)
��Y Z
,
��Z [
new
��- 0
	JProperty
��1 :
(
��: ;
$str
��; K
,
��K L
f
��M N
.
��N O
rules
��O T
.
��T U
validationType
��U c
!=
��d f
null
��g k
?
��l m
new
��- 0
JObject
��1 8
(
��8 9
new
��/ 2
	JProperty
��3 <
(
��< =
$str
��= C
,
��C D
f
��E F
.
��F G
rules
��G L
.
��L M
validationType
��M [
.
��[ \
type
��\ `
)
��` a
,
��a b
new
��/ 2
	JProperty
��3 <
(
��< =
$str
��= P
,
��P Q
f
��R S
.
��S T
rules
��T Y
.
��Y Z
validationType
��Z h
.
��h i
specialCharacters
��i z
!=
��{ }
null��~ �
?��� �
new
��/ 2
JArray
��3 9
(
��9 :
f
��: ;
.
��; <
rules
��< A
.
��A B
validationType
��B P
.
��P Q
specialCharacters
��Q b
.
��b c
Select
��c i
(
��i j
t
��j k
=>
��l n
t
��o p
)
��p q
)
��q r
:
��/ 0
null
��1 5
)
��5 6
)
��6 7
:
��- .
null
��/ 3
)
��3 4
)
��- .
:
��+ ,
null
��- 1
)
��1 2
,
��2 3
new
��( +
	JProperty
��, 5
(
��5 6
$str
��6 B
,
��B C
f
��D E
.
��E F

indicative
��F P
)
��P Q
)
��Q R
)
��R S
)
��S T
)
��T U
)
��U V
)
��V W
)
��W X
)
��X Y
)
��Y Z
)
��Z [
.
��[ \
ToList
��\ b
(
��b c
)
��c d
)
��d e
)
��e f
;
��f g
string
�� 
jsonConvert
�� "
=
��# $
JsonConvert
��% 0
.
��0 1
SerializeObject
��1 @
(
��@ A

jsonObject
��A K
,
��K L

Formatting
��M W
.
��W X
Indented
��X `
)
��` a
;
��a b
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =
OK
��= ?
,
��? @
jsonConvert
��A L
)
��L M
;
��M N
}
�� 
catch
�� 
(
�� 
	Exception
�� 
ex
�� 
)
��  
{
�� 
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =!
InternalServerError
��= P
,
��P Q
ex
��R T
.
��T U
Message
��U \
)
��\ ]
;
��] ^
}
�� 
}
�� 	
[
�� 	
AllowAnonymous
��	 
]
�� 
[
�� 	
Route
��	 
(
�� 
$str
�� #
)
��# $
]
��$ %
[
�� 	
HttpPost
��	 
]
�� 
public
�� !
HttpResponseMessage
�� "
GeographyLevel
��# 1
(
��1 2$
FieldsRequestGeography
��2 H$
fieldsRequestGeography
��I _
)
��_ `
{
�� 	
try
�� 
{
�� 
string
�� 
	jsonLevel
��  
=
��! "
(
��# $
string
��$ *
)
��* +
cache
��+ 0
.
��0 1
Get
��1 4
(
��4 5
$str
��5 B
)
��B C
;
��C D
var
�� 
deserializedLevel
�� %
=
��& '
JsonConvert
��( 3
.
��3 4
DeserializeObject
��4 E
<
��E F
List
��F J
<
��J K 
LevelConfiguration
��K ]
>
��] ^
>
��^ _
(
��_ `
	jsonLevel
��` i
)
��i j
;
��j k
var
�� #
objLevelConfiguration
�� )
=
��* +
deserializedLevel
��, =
.
��= >
SingleOrDefault
��> M
(
��M N
x
��N O
=>
��P R
x
��S T
.
��T U
	companyId
��U ^
==
��_ a$
fieldsRequestGeography
��b x
.
��x y
	companyId��y �
)��� �
.��� �
level��� �
.��� �
Where��� �
(��� �
p��� �
=>��� �
p��� �
.��� �
levelId��� �
==��� �&
fieldsRequestGeography��� �
.��� �
levelId��� �
)��� �
.��� �
Select��� �
(��� �
o��� �
=>��� �
new
��6 9
JObject
��: A
(
��A B
new
��8 ;
	JProperty
��< E
(
��E F
$str
��F Q
,
��Q R
o
��S T
.
��T U
	nextLevel
��U ^
)
��^ _
,
��_ `
new
��8 ;
	JProperty
��< E
(
��E F
$str
��F V
,
��V W
o
��X Y
.
��Y Z
levelReference
��Z h
)
��h i
)
��6 7
)
��7 8
.
��8 9
First
��9 >
(
��> ?
)
��? @
;
��@ A
List
�� 
<
�� 
Option
�� 
>
�� 

lstOptions
�� '
=
��( )
new
��* -
List
��. 2
<
��2 3
Option
��3 9
>
��9 :
(
��: ;
)
��; <
;
��< =
string
�� #
jsonFilePathGeography
�� ,
=
��- .
$"
��/ 1
{
��1 2
HttpRuntime
��2 =
.
��= >
AppDomainAppPath
��> N
}
��N O
$str
��O r
"
��r s
;
��s t
string
�� 
jsonGeography
�� $
=
��% &
File
��' +
.
��+ ,
ReadAllText
��, 7
(
��7 8#
jsonFilePathGeography
��8 M
)
��M N
;
��N O
var
�� #
deserializedGeography
�� )
=
��* +
JsonConvert
��, 7
.
��7 8
DeserializeObject
��8 I
<
��I J
List
��J N
<
��N O
GeographyLevel
��O ]
>
��] ^
>
��^ _
(
��_ `
jsonGeography
��` m
)
��m n
;
��n o
var
�� 
options
�� 
=
�� #
deserializedGeography
�� 3
.
��3 4
SingleOrDefault
��4 C
(
��C D
x
��D E
=>
��F H
x
��I J
.
��J K
levelId
��K R
==
��S U
(
��V W
int
��W Z
)
��Z [#
objLevelConfiguration
��[ p
[
��p q
$str
��q |
]
��| }
)
��} ~
.
��~ 
	companies�� �
.��� �
SingleOrDefault��� �
(��� �
o��� �
=>��� �
o��� �
.��� �
	companyId��� �
==��� �&
fieldsRequestGeography��� �
.��� �
	companyId��� �
)��� �
.��� �
options��� �
.��� �
Where��� �
(��� �
i��� �
=>��� �
i��� �
.��� �
parentOption��� �
==��� �&
fieldsRequestGeography��� �
.��� �
parentOption��� �
)��� �
.��� �
ToList��� �
(��� �
)��� �
;��� �
string
�� 
optionsSelect
�� $
=
��% &
JsonConvert
��' 2
.
��2 3
SerializeObject
��3 B
(
��B C
options
��C J
,
��J K

Formatting
��L V
.
��V W
Indented
��W _
)
��_ `
;
��` a
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =
OK
��= ?
,
��? @
new
��A D
{
��E F
optionsSelect
��G T
,
��T U
	nextLevel
��V _
=
��` a
(
��b c
int
��c f
)
��f g#
objLevelConfiguration
��g |
[
��| }
$str��} �
]��� �
}��� �
)��� �
;��� �
}
�� 
catch
�� 
(
�� 
	Exception
�� 
ex
�� 
)
��  
{
�� 
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =!
InternalServerError
��= P
,
��P Q
ex
��R T
.
��T U
Message
��U \
)
��\ ]
;
��] ^
}
�� 
}
�� 	
[
�� 	
AllowAnonymous
��	 
]
�� 
[
�� 	
Route
��	 
(
�� 
$str
�� )
)
��) *
]
��* +
[
�� 	
HttpPost
��	 
]
�� 
public
�� !
HttpResponseMessage
�� ""
FieldsShowDependency
��# 7
(
��7 8
FieldsRequest
��8 E
fieldsRequest
��F S
)
��S T
{
�� 	
try
�� 
{
�� 
string
�� 
jsonFilePath
�� #
=
��$ %
$"
��& (
{
��( )
HttpRuntime
��) 4
.
��4 5
AppDomainAppPath
��5 E
}
��E F
$str
��F V
{
��V W
fieldsRequest
��W d
.
��d e
	companyId
��e n
}
��n o
$str
��o t
"
��t u
;
��u v
string
�� 
jsonFieldsShow
�� %
=
��& '
File
��( ,
.
��, -
ReadAllText
��- 8
(
��8 9
jsonFilePath
��9 E
)
��E F
;
��F G
var
�� $
deserializedFieldsShow
�� *
=
��+ ,
JsonConvert
��- 8
.
��8 9
DeserializeObject
��9 J
<
��J K
SteptsCompany
��K X
>
��X Y
(
��Y Z
jsonFieldsShow
��Z h
)
��h i
;
��i j
var
�� 
responseFields
�� "
=
��# $
new
��% (
JArray
��) /
(
��/ 0
)
��0 1
;
��1 2
foreach
�� 
(
�� 
var
�� 
item
�� !
in
��" $
fieldsRequest
��% 2
.
��2 3

fieldsShow
��3 =
)
��= >
{
�� 
var
�� 
responseObject
�� &
=
��' (
new
��) ,
JObject
��- 4
(
��4 5
)
��5 6
;
��6 7
responseObject
�� "
[
��" #
$str
��# ,
]
��, -
=
��. /
item
��0 4
.
��4 5
step
��5 9
;
��9 :
responseObject
�� "
[
��" #
$str
��# .
]
��. /
=
��0 1
item
��2 6
.
��6 7
section
��7 >
;
��> ?
var
�� 
field
�� 
=
�� $
deserializedFieldsShow
��  6
.
��6 7
Stepts
��7 =
.
��= >
Single
��> D
(
��D E
step
��E I
=>
��J L
item
��M Q
.
��Q R
step
��R V
==
��W Y
step
��Z ^
.
��^ _
SteptID
��_ f
)
��f g
.
��g h
Sections
��) 1
.
��1 2
Single
��2 8
(
��8 9
section
��9 @
=>
��A C
item
��D H
.
��H I
section
��I P
==
��Q S
section
��T [
.
��[ \
	SectionID
��\ e
)
��e f
.
��f g
fields
��) /
.
��/ 0
Single
��0 6
(
��6 7
fieldOne
��7 ?
=>
��@ B
item
��C G
.
��G H
field
��H M
==
��N P
fieldOne
��Q Y
.
��Y Z
fieldID
��Z a
)
��a b
;
��b c
responseObject
�� "
[
��" #
$str
��# ,
]
��, -
=
��. /
field
��0 5
.
��5 6
fieldID
��6 =
;
��= >
responseObject
�� "
[
��" #
$str
��# /
]
��/ 0
=
��1 2
field
��3 8
.
��8 9

isRequired
��9 C
;
��C D
responseObject
�� "
[
��" #
$str
��# *
]
��* +
=
��, -
field
��. 3
.
��3 4
label
��4 9
==
��: <
$str
��= @
?
��A B
$str
��C E
:
��F G
Resource
��H P
.
��P Q
Lead
��Q U
.
��U V
ResourceManager
��V e
.
��e f
	GetString
��f o
(
��o p
field
��p u
.
��u v
label
��v {
)
��{ |
;
��| }
responseObject
�� "
[
��" #
$str
��# )
]
��) *
=
��+ ,
field
��- 2
.
��2 3
name
��3 7
;
��7 8
responseObject
�� "
[
��" #
$str
��# .
]
��. /
=
��0 1
field
��2 7
.
��7 8
	guidValue
��8 A
;
��A B
responseObject
�� "
[
��" #
$str
��# .
]
��. /
=
��0 1
field
��2 7
.
��7 8
	fieldType
��8 A
;
��A B
responseObject
�� "
[
��" #
$str
��# 0
]
��0 1
=
��2 3
field
��4 9
.
��9 :
showSummary
��: E
;
��E F
responseObject
�� "
[
��" #
$str
��# ,
]
��, -
=
��. /
field
��0 5
.
��5 6
	optionSet
��6 ?
!=
��@ B
null
��C G
?
��H I
new
��J M
JArray
��N T
(
��T U
GetOptionSet
��( 4
(
��4 5
field
��5 :
.
��: ;
	optionSet
��; D
)
��D E
.
��E F
Select
��F L
(
��L M
o
��M N
=>
��O Q
new
��R U
JObject
��V ]
(
��] ^
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: D
,
��D E
o
��F G
.
��G H
optionId
��H P
)
��P Q
,
��Q R
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: F
,
��F G
o
��H I
.
��I J

optionGuid
��J T
)
��T U
,
��U V
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: G
,
��G H
Resource
��I Q
.
��Q R
Lead
��R V
.
��V W
ResourceManager
��W f
.
��f g
	GetString
��g p
(
��p q
o
��q r
.
��r s
optionValue
��s ~
)
��~ 
!=��� �
null��� �
?��� �
Resource��� �
.��� �
Lead��� �
.��� �
ResourceManager��� �
.��� �
	GetString��� �
(��� �
o��� �
.��� �
optionValue��� �
)��� �
:��� �
o��� �
.��� �
optionValue��� �
)��� �
,��� �
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: F
,
��F G
o
��H I
.
��I J

dependency
��J T
!=
��U W
null
��X \
?
��] ^
new
��, /
JObject
��0 7
(
��7 8
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< T
,
��T U
o
��V W
.
��W X

dependency
��X b
.
��b c$
fieldsThatDependsBlock
��c y
)
��y z
,
��z {
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< U
,
��U V
o
��W X
.
��X Y

dependency
��Y c
.
��c d%
fieldsThatDependsActive
��d {
)
��{ |
)
��| }
:
��, -
null
��. 2
)
��2 3
,
��3 4
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: F
,
��F G
o
��H I
.
��I J

fieldsShow
��J T
!=
��U W
null
��X \
?
��] ^
new
��, /
JArray
��0 6
(
��6 7
o
��7 8
.
��8 9

fieldsShow
��9 C
.
��C D
Select
��D J
(
��J K
w
��K L
=>
��M O
new
��P S
JObject
��T [
(
��[ \
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< B
,
��B C
w
��D E
.
��E F
step
��F J
)
��J K
,
��K L
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< E
,
��E F
w
��G H
.
��H I
section
��I P
)
��P Q
,
��Q R
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< C
,
��C D
w
��E F
.
��F G
field
��G L
)
��L M
)
��M N
)
��N O
)
��/ 0
:
��, -
null
��. 2
)
��2 3
,
��3 4
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: F
,
��F G
o
��H I
.
��I J

fieldsHide
��J T
!=
��U W
null
��X \
?
��] ^
new
��, /
JArray
��0 6
(
��6 7
o
��7 8
.
��8 9

fieldsHide
��9 C
.
��C D
Select
��D J
(
��J K
z
��K L
=>
��M O
new
��P S
JObject
��T [
(
��[ \
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< B
,
��B C
z
��D E
.
��E F
step
��F J
)
��J K
,
��K L
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< E
,
��E F
z
��G H
.
��H I
section
��I P
)
��P Q
,
��Q R
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< C
,
��C D
z
��E F
.
��F G
field
��G L
)
��L M
)
��. /
)
��/ 0
)
��0 1
:
��2 3
null
��4 8
)
��8 9
)
��4 5
)
��2 3
)
��0 1
:
��2 3
field
��$ )
.
��) *
options
��* 1
!=
��2 4
null
��5 9
?
��: ;
new
��< ?
JArray
��@ F
(
��F G
field
��$ )
.
��) *
options
��* 1
.
��1 2
Select
��2 8
(
��8 9
o
��9 :
=>
��; =
new
��> A
JObject
��B I
(
��I J
new
��* -
	JProperty
��. 7
(
��7 8
$str
��8 B
,
��B C
o
��D E
.
��E F
optionId
��F N
)
��N O
,
��O P
new
��* -
	JProperty
��. 7
(
��7 8
$str
��8 D
,
��D E
o
��F G
.
��G H

optionGuid
��H R
)
��R S
,
��S T
new
��* -
	JProperty
��. 7
(
��7 8
$str
��8 E
,
��E F
o
��G H
.
��H I
optionValue
��I T
)
��T U
,
��U V
new
��* -
	JProperty
��. 7
(
��7 8
$str
��8 D
,
��D E
o
��F G
.
��G H

dependency
��H R
!=
��S U
null
��V Z
?
��[ \
new
��* -
JObject
��. 5
(
��5 6
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: R
,
��R S
o
��T U
.
��U V

dependency
��V `
.
��` a$
fieldsThatDependsBlock
��a w
)
��w x
,
��x y
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: S
,
��S T
o
��U V
.
��V W

dependency
��W a
.
��a b%
fieldsThatDependsActive
��b y
)
��y z
)
��z {
:
��* +
null
��, 0
)
��0 1
,
��1 2
new
��* -
	JProperty
��. 7
(
��7 8
$str
��8 D
,
��D E
o
��F G
.
��G H

fieldsShow
��H R
!=
��S U
null
��V Z
?
��[ \
new
��* -
JArray
��. 4
(
��4 5
o
��5 6
.
��6 7

fieldsShow
��7 A
.
��A B
Select
��B H
(
��H I
w
��I J
=>
��K M
new
��N Q
JObject
��R Y
(
��Y Z
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: @
,
��@ A
w
��B C
.
��C D
step
��D H
)
��H I
,
��I J
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: C
,
��C D
w
��E F
.
��F G
section
��G N
)
��N O
,
��O P
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: A
,
��A B
w
��C D
.
��D E
field
��E J
)
��J K
)
��K L
)
��L M
)
��- .
:
��* +
null
��, 0
)
��0 1
,
��1 2
new
��* -
	JProperty
��. 7
(
��7 8
$str
��8 D
,
��D E
o
��F G
.
��G H

fieldsHide
��H R
!=
��S U
null
��V Z
?
��[ \
new
��* -
JArray
��. 4
(
��4 5
o
��5 6
.
��6 7

fieldsHide
��7 A
.
��A B
Select
��B H
(
��H I
z
��I J
=>
��K M
new
��N Q
JObject
��R Y
(
��Y Z
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: @
,
��@ A
z
��B C
.
��C D
step
��D H
)
��H I
,
��I J
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: C
,
��C D
z
��E F
.
��F G
section
��G N
)
��N O
,
��O P
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: A
,
��A B
z
��C D
.
��D E
field
��E J
)
��J K
)
��, -
)
��- .
)
��. /
:
��0 1
null
��2 6
)
��6 7
)
��2 3
)
��0 1
)
��. /
:
��0 1
null
��2 6
;
��6 7
responseObject
�� "
[
��" #
$str
��# *
]
��* +
=
��, -
field
��. 3
.
��3 4
rules
��4 9
!=
��: <
null
��= A
?
��B C
new
��D G
JObject
��H O
(
��O P
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< G
,
��G H
field
��I N
.
��N O
rules
��O T
.
��T U
	uppercase
��U ^
)
��^ _
,
��_ `
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< G
,
��G H
field
��I N
.
��N O
rules
��O T
.
��T U
	minlength
��U ^
)
��^ _
,
��_ `
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< G
,
��G H
field
��I N
.
��N O
rules
��O T
.
��T U
	maxlength
��U ^
)
��^ _
,
��_ `
new
��. 1
	JProperty
��2 ;
(
��; <
$str
��< L
,
��L M
field
��N S
.
��S T
rules
��T Y
.
��Y Z
validationType
��Z h
!=
��i k
null
��l p
?
��q r
new
��. 1
JObject
��2 9
(
��9 :
new
��1 4
	JProperty
��5 >
(
��> ?
$str
��? E
,
��E F
field
��G L
.
��L M
rules
��M R
.
��R S
validationType
��S a
.
��a b
type
��b f
)
��f g
,
��g h
new
��1 4
	JProperty
��5 >
(
��> ?
$str
��? R
,
��R S
field
��T Y
.
��Y Z
rules
��Z _
.
��_ `
validationType
��` n
.
��n o 
specialCharacters��o �
!=��� �
null��� �
?��� �
new
��1 4
JArray
��5 ;
(
��; <
field
��< A
.
��A B
rules
��B G
.
��G H
validationType
��H V
.
��V W
specialCharacters
��W h
.
��h i
Select
��i o
(
��o p
t
��p q
=>
��r t
t
��u v
)
��v w
)
��w x
:
��1 2
null
��3 7
)
��7 8
)
��8 9
:
��/ 0
null
��1 5
)
��5 6
)
��/ 0
:
��1 2
null
��3 7
;
��7 8
responseObject
�� "
[
��" #
$str
��# *
]
��* +
=
��, -
field
��. 3
.
��3 4
group
��4 9
!=
��: <
null
��= A
?
��B C
new
��D G
JObject
��H O
(
��O P
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: C
,
��C D
field
��E J
.
��J K
group
��K P
.
��P Q
groupId
��Q X
)
��X Y
,
��Y Z
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: A
,
��A B
field
��C H
.
��H I
group
��I N
.
��N O
order
��O T
)
��T U
,
��U V
new
��, /
	JProperty
��0 9
(
��9 :
$str
��: F
,
��F G
field
��H M
.
��M N
group
��N S
.
��S T

classStyle
��T ^
)
��5 6
)
��. /
:
��0 1
null
��2 6
;
��6 7
responseObject
�� "
[
��" #
$str
��# .
]
��. /
=
��0 1
field
��2 7
.
��7 8
	isVisible
��8 A
;
��A B
responseObject
�� "
[
��" #
$str
��# 2
]
��2 3
=
��4 5
field
��6 ;
.
��; <
hasDependency
��< I
;
��I J
responseObject
�� "
[
��" #
$str
��# 4
]
��4 5
=
��6 7
field
��8 =
.
��= >
geographicLevel
��> M
;
��M N
responseObject
�� "
[
��" #
$str
��# ,
]
��, -
=
��. /
field
��0 5
.
��5 6
isBlock
��6 =
;
��= >
responseObject
�� "
[
��" #
$str
��# /
]
��/ 0
=
��1 2
field
��3 8
.
��8 9

indicative
��9 C
;
��C D
responseFields
�� "
.
��" #
Add
��# &
(
��& '
responseObject
��' 5
)
��5 6
;
��6 7
}
�� 
string
�� 
jsonConvert
�� "
=
��# $
JsonConvert
��% 0
.
��0 1
SerializeObject
��1 @
(
��@ A
responseFields
��A O
,
��O P

Formatting
��Q [
.
��[ \
Indented
��\ d
)
��d e
;
��e f
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =
OK
��= ?
,
��? @
jsonConvert
��A L
)
��L M
;
��M N
}
�� 
catch
�� 
(
�� 
	Exception
�� 
ex
�� 
)
��  
{
�� 
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =!
InternalServerError
��= P
,
��P Q
ex
��R T
.
��T U
Message
��U \
)
��\ ]
;
��] ^
}
�� 
}
�� 	
[
�� 	
AllowAnonymous
��	 
]
�� 
[
�� 	
Route
��	 
(
�� 
$str
�� *
)
��* +
]
��+ ,
[
�� 	
HttpPost
��	 
]
�� 
public
�� !
HttpResponseMessage
�� "#
ValidateExistingEmail
��# 8
(
��8 9
[
��9 :
FromBody
��: B
]
��B C
string
��D J
email
��K P
)
��P Q
{
�� 	
try
�� 
{
�� 
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =
OK
��= ?
,
��? @&
ValidateExternalServices
��A Y
.
��Y Z#
ValidateExistingEmail
��Z o
(
��o p
email
��p u
)
��u v
)
��v w
;
��w x
}
�� 
catch
�� 
(
�� 
	Exception
�� 
ex
�� 
)
��  
{
�� 
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =!
InternalServerError
��= P
,
��P Q
ex
��R T
.
��T U
Message
��U \
)
��\ ]
;
��] ^
}
�� 
}
�� 	
private
�� 
List
�� 
<
�� 
Option
�� 
>
�� 
GetOptionSet
�� )
(
��) *
string
��* 0
name
��1 5
)
��5 6
{
�� 	
List
�� 
<
�� 
Option
�� 
>
�� 

optionsSet
�� #
=
��$ %
new
��& )
List
��* .
<
��. /
Option
��/ 5
>
��5 6
(
��6 7
)
��7 8
;
��8 9
var
�� 
option
�� 
=
�� 
LeadBLL
��  
.
��  !
GetOptionSetAll
��! 0
(
��0 1
)
��1 2
.
��2 3
Where
��3 8
(
��8 9
x
��9 :
=>
��; =
x
��> ?
.
��? @
Description
��@ K
==
��L N
name
��O S
)
��S T
.
��T U
FirstOrDefault
��U c
(
��c d
)
��d e
.
��e f
	ValueData
��f o
;
��o p

optionsSet
�� 
=
�� 
JsonConvert
�� $
.
��$ %
DeserializeObject
��% 6
<
��6 7
List
��7 ;
<
��; <
Option
��< B
>
��B C
>
��C D
(
��D E
option
��E K
)
��K L
;
��L M
return
�� 

optionsSet
�� 
;
�� 
}
�� 	
[
�� 	
AllowAnonymous
��	 
]
�� 
[
�� 	
Route
��	 
(
�� 
$str
�� $
)
��$ %
]
��% &
[
�� 	
HttpPost
��	 
]
�� 
public
�� !
HttpResponseMessage
�� "
ValidateToken
��# 0
(
��0 1&
Google_reCaptchaResponse
��1 I&
Google_reCaptchaResponse
��J b
)
��b c
{
�� 	
try
�� 
{
�� 
Google_response
�� 
google_response
��  /
=
��0 1
new
��2 5
Google_response
��6 E
(
��E F
)
��F G
;
��G H
google_response
�� 
.
��  
success
��  '
=
��( )"
Google_reCaptchaLead
��* >
.
��> ?"
ValidateTokenCaptcha
��? S
(
��S T&
Google_reCaptchaResponse
��T l
.
��l m
token
��m r
)
��r s
;
��s t
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =
OK
��= ?
,
��? @
google_response
��A P
)
��P Q
;
��Q R
}
�� 
catch
�� 
(
�� 
	Exception
�� 
ex
�� 
)
��  
{
�� 
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =!
InternalServerError
��= P
,
��P Q
ex
��R T
.
��T U
Message
��U \
)
��\ ]
;
��] ^
}
�� 
}
�� 	
[
�� 	
AllowAnonymous
��	 
]
�� 
[
�� 	
Route
��	 
(
�� 
$str
�� !
)
��! "
]
��" #
[
�� 	
HttpPost
��	 
]
�� 
public
�� !
HttpResponseMessage
�� "
SendDataLead
��# /
(
��/ 0
[
��0 1
FromBody
��1 9
]
��9 :
object
��; A
dataCompany
��B M
)
��M N
{
�� 	
try
�� 
{
�� 
string
�� 
	jsonLevel
��  
=
��! "
(
��# $
string
��$ *
)
��* +
cache
��+ 0
.
��0 1
Get
��1 4
(
��4 5
$str
��5 B
)
��B C
;
��C D
var
�� 
deserializedLevel
�� %
=
��& '
JsonConvert
��( 3
.
��3 4
DeserializeObject
��4 E
<
��E F
List
��F J
<
��J K 
LevelConfiguration
��K ]
>
��] ^
>
��^ _
(
��_ `
	jsonLevel
��` i
)
��i j
;
��j k
string
�� #
jsonFilePathGeography
�� ,
=
��- .
$"
��/ 1
{
��1 2
HttpRuntime
��2 =
.
��= >
AppDomainAppPath
��> N
}
��N O
$str
��O r
"
��r s
;
��s t
string
�� 
jsonGeography
�� $
=
��% &
File
��' +
.
��+ ,
ReadAllText
��, 7
(
��7 8#
jsonFilePathGeography
��8 M
)
��M N
;
��N O
var
�� #
deserializedGeography
�� )
=
��* +
JsonConvert
��, 7
.
��7 8
DeserializeObject
��8 I
<
��I J
List
��J N
<
��N O
GeographyLevel
��O ]
>
��] ^
>
��^ _
(
��_ `
jsonGeography
��` m
)
��m n
;
��n o
string
�� 
jsonConvert
�� "
=
��# $
JsonConvert
��% 0
.
��0 1
SerializeObject
��1 @
(
��@ A
dataCompany
��A L
,
��L M

Formatting
��N X
.
��X Y
Indented
��Y a
)
��a b
;
��b c
MulesoftBLL
�� 
mulesoftBLL
�� '
=
��( )
new
��* -
MulesoftBLL
��. 9
(
��9 :
)
��: ;
;
��; <
var
�� 
requestData
�� 
=
��  !
JsonConvert
��" -
.
��- .
DeserializeObject
��. ?
<
��? @ 
RequestCreateLeads
��@ R
>
��R S
(
��S T
dataCompany
��T _
.
��_ `
ToString
��` h
(
��h i
)
��i j
)
��j k
;
��k l
if
�� 
(
�� 
deserializedLevel
�� %
.
��% &
SingleOrDefault
��& 5
(
��5 6
x
��6 7
=>
��8 :
x
��; <
.
��< =
	companyId
��= F
==
��G I
requestData
��J U
.
��U V"
parentLead_atributes
��V j
.
��j k
ownerid
��k r
)
��r s
.
��s t
level
��t y
.
��y z
Where
��z 
(�� �
p��� �
=>��� �
p��� �
.��� �
levelId��� �
==��� �
$num��� �
)��� �
.��� �
Count��� �
(��� �
)��� �
==��� �
$num��� �
)��� �
{
�� 
string
�� 
valueGeograpgy1
�� *
=
��+ ,#
deserializedGeography
��- B
.
��B C
SingleOrDefault
��C R
(
��R S
x
��S T
=>
��U W
x
��X Y
.
��Y Z
levelId
��Z a
==
��b d
$num
��e f
)
��f g
?
��g h
.
��h i
	companies
��i r
.
��r s
SingleOrDefault��s �
(��� �
x��� �
=>��� �
x��� �
.��� �
	companyId��� �
==��� �
requestData��� �
.��� �$
parentLead_atributes��� �
.��� �
ownerid��� �
)��� �
?��� �
.��� �
options��� �
.��� �
SingleOrDefault��� �
(��� �
x��� �
=>��� �
x��� �
.��� �

optionGuid��� �
==��� �
requestData��� �
.��� �$
parentLead_atributes��� �
.��� �"
geographic_level_1��� �
.��� �
ToString��� �
(��� �
)��� �
)��� �
?��� �
.��� �
optionValue��� �
;��� �
if
�� 
(
�� 
valueGeograpgy1
�� '
!=
��( *
$str
��+ -
&&
��. 0
valueGeograpgy1
��1 @
!=
��A C
null
��D H
)
��H I
{
�� 
string
�� 

optionGuid
�� )
=
��* +#
deserializedGeography
��, A
.
��A B
SingleOrDefault
��B Q
(
��Q R
x
��R S
=>
��T V
x
��W X
.
��X Y
levelId
��Y `
==
��a c
$num
��d e
)
��e f
.
��f g
	companies
��g p
.
��p q
SingleOrDefault��q �
(��� �
x��� �
=>��� �
x��� �
.��� �
	companyId��� �
==��� �
requestData��� �
.��� �$
parentLead_atributes��� �
.��� �
ownerid��� �
)��� �
.��� �
options��� �
.��� �
SingleOrDefault��� �
(��� �
x��� �
=>��� �
x��� �
.��� �
optionValue��� �
==��� �
valueGeograpgy1��� �
)��� �
?��� �
.��� �

optionGuid��� �
;��� �
if
�� 
(
�� 

optionGuid
�� &
!=
��' )
$str
��* ,
&&
��- /

optionGuid
��0 :
!=
��; =
null
��> B
)
��B C
{
�� 
requestData
�� '
.
��' ("
parentLead_atributes
��( <
.
��< = 
geographic_level_2
��= O
=
��P Q
new
��R U
Guid
��V Z
(
��Z [

optionGuid
��[ e
)
��e f
;
��f g
}
�� 
}
�� 
}
�� 
var
�� 
response
�� 
=
�� 
mulesoftBLL
�� *
.
��* +

CreateLead
��+ 5
(
��5 6
requestData
��6 A
)
��A B
;
��B C
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =
OK
��= ?
,
��? @
response
��A I
)
��I J
;
��J K
}
�� 
catch
�� 
(
�� 
	Exception
�� 
ex
�� 
)
��  
{
�� 
ProcessesDAL
�� 
.
�� 
CreateProcesses
�� ,
(
��, -
ex
��- /
.
��/ 0

StackTrace
��0 :
)
��: ;
;
��; <
ProcessesDAL
�� 
.
�� 
CreateProcesses
�� ,
(
��, -
ex
��- /
.
��/ 0
Message
��0 7
)
��7 8
;
��8 9
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =!
InternalServerError
��= P
,
��P Q
ex
��R T
.
��T U
Message
��U \
)
��\ ]
;
��] ^
}
�� 
}
�� 	
[
�� 	
AllowAnonymous
��	 
]
�� 
[
�� 	
Route
��	 
(
�� 
$str
�� "
)
��" #
]
��# $
[
�� 	
HttpPost
��	 
]
�� 
public
�� !
HttpResponseMessage
�� "
CreateLeadXUS
��# 0
(
��0 1

RequestXUS
��1 ;

requestXUS
��< F
)
��F G
{
�� 	
try
�� 
{
�� 
MulesoftBLL
�� 
mulesoftBLL
�� '
=
��( )
new
��* -
MulesoftBLL
��. 9
(
��9 :
)
��: ;
;
��; <
var
�� 
response
�� 
=
�� 
mulesoftBLL
�� *
.
��* +
CreateLeadXUS
��+ 8
(
��8 9

requestXUS
��9 C
)
��C D
;
��D E
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =
OK
��= ?
,
��? @
response
��A I
)
��I J
;
��J K
}
�� 
catch
�� 
(
�� 
	Exception
�� 
ex
�� 
)
��  
{
�� 
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =!
InternalServerError
��= P
,
��P Q
ex
��R T
.
��T U
Message
��U \
)
��\ ]
;
��] ^
}
�� 
}
�� 	
[
�� 	
AllowAnonymous
��	 
]
�� 
[
�� 	
Route
��	 
(
�� 
$str
�� "
)
��" #
]
��# $
[
�� 	
HttpPost
��	 
]
�� 
public
�� !
HttpResponseMessage
�� "
leadExistence
��# 0
(
��0 1
[
��1 2
FromBody
��2 :
]
��: ;
LeadExistence
��< I
leadExistence
��J W
)
��W X
{
�� 	
try
�� 
{
�� 
MulesoftBLL
�� 
mulesoftBLL
�� '
=
��( )
new
��* -
MulesoftBLL
��. 9
(
��9 :
)
��: ;
;
��; <
var
�� 
response
�� 
=
�� 
mulesoftBLL
�� *
.
��* +
leadExistence
��+ 8
(
��8 9
leadExistence
��9 F
)
��F G
;
��G H
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =
OK
��= ?
,
��? @
response
��A I
)
��I J
;
��J K
}
�� 
catch
�� 
(
�� 
	Exception
�� 
ex
�� 
)
��  
{
�� 
return
�� 
Request
�� 
.
�� 
CreateResponse
�� -
(
��- .
HttpStatusCode
��. <
.
��< =
OK
��= ?
,
��? @
ex
��A C
)
��C D
;
��D E
}
�� 
}
�� 	
}
�� 
}�� �
`C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\Lead\Google_reCaptcha.cs
	namespace 	
CRMLeadFormLogin
 
. 
Controllers &
.& '
Lead' +
{ 
public 
class	 
Google_reCaptcha 
:  !
ApiController" /
{ 
}33 
}44 �R
\C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\Lead\LeadDataJson.cs
	namespace 	
CRMLeadFormLogin
 
. 
Controllers &
.& '
Lead' +
{ 
public 
class	 

Dependency 
{ 
public 

List 
< 
int 
> "
fieldsThatDependsBlock +
{, -
get. 1
;1 2
set3 6
;6 7
}8 9
public 

List 
< 
int 
> #
fieldsThatDependsActive ,
{- .
get/ 2
;2 3
set4 7
;7 8
}9 :
} 
public 
class	 
ValidationType 
{ 
public 

string 
type 
{ 
get 
; 
set !
;! "
}# $
public 

List 
< 
string 
> 
specialCharacters )
{* +
get, /
;/ 0
set1 4
;4 5
}6 7
} 
public 
class	 
Rules 
{ 
public 

bool 
	uppercase 
{ 
get 
;  
set! $
;$ %
}& '
public 

int 
	minlength 
{ 
get 
; 
set  #
;# $
}% &
public 

int 
	maxlength 
{ 
get 
; 
set  #
;# $
}% &
public 

ValidationType 
validationType (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
} 
public 
class	 

FieldsHide 
{   
public!! 

int!! 
step!! 
{!! 
get!! 
;!! 
set!! 
;!! 
}!!  !
public"" 

int"" 
section"" 
{"" 
get"" 
;"" 
set"" !
;""! "
}""# $
public## 

int## 
field## 
{## 
get## 
;## 
set## 
;##  
}##! "
}$$ 
public&& 
class&&	 

FieldsShow&& 
{'' 
public(( 

int(( 
step(( 
{(( 
get(( 
;(( 
set(( 
;(( 
}((  !
public)) 

int)) 
section)) 
{)) 
get)) 
;)) 
set)) !
;))! "
}))# $
public** 

int** 
field** 
{** 
get** 
;** 
set** 
;**  
}**! "
},, 
public.. 
class..	 
Option.. 
{// 
public00 

int00 
optionId00 
{00 
get00 
;00 
set00 "
;00" #
}00$ %
public11 

string11 

optionGuid11 
{11 
get11 "
;11" #
set11$ '
;11' (
}11) *
public22 

string22 
code22 
{22 
get22 
;22 
set22 !
;22! "
}22# $
public44 

string44 
optionValue44 
{44 
get44  #
;44# $
set44% (
;44( )
}44* +
public55 

List55 
<55 

FieldsShow55 
>55 

fieldsShow55 &
{55' (
get55) ,
;55, -
set55. 1
;551 2
}553 4
public66 

List66 
<66 

FieldsHide66 
>66 

fieldsHide66 &
{66' (
get66) ,
;66, -
set66. 1
;661 2
}663 4
public77 


Dependency77 

dependency77  
{77! "
get77# &
;77& '
set77( +
;77+ ,
}77- .
}88 
public:: 
class::	 
Group:: 
{;; 
public<< 

int<< 
groupId<< 
{<< 
get<< 
;<< 
set<< !
;<<! "
}<<# $
public== 

int== 
order== 
{== 
get== 
;== 
set== 
;==  
}==! "
public>> 

string>> 

classStyle>> 
{>> 
get>> "
;>>" #
set>>$ '
;>>' (
}>>) *
}?? 
publicAA 
classAA	 
GroupSumaryAA 
{BB 
publicCC 

intCC 
groupIdCC 
{CC 
getCC 
;CC 
setCC !
;CC! "
}CC# $
publicDD 

intDD 
orderDD 
{DD 
getDD 
;DD 
setDD 
;DD  
}DD! "
publicEE 

stringEE 
	separatorEE 
{EE 
getEE !
;EE! "
setEE# &
;EE& '
}EE( )
}FF 
publicHH 
classHH	 
FieldHH 
{II 
publicJJ 

intJJ 
fieldIDJJ 
{JJ 
getJJ 
;JJ 
setJJ !
;JJ! "
}JJ# $
publicKK 

boolKK 

isRequiredKK 
{KK 
getKK  
;KK  !
setKK" %
;KK% &
}KK' (
publicLL 

stringLL 
labelLL 
{LL 
getLL 
;LL 
setLL "
;LL" #
}LL$ %
publicMM 

stringMM 
nameMM 
{MM 
getMM 
;MM 
setMM !
;MM! "
}MM# $
publicNN 

stringNN 
	guidValueNN 
{NN 
getNN !
;NN! "
setNN# &
;NN& '
}NN( )
publicOO 

stringOO 
	fieldTypeOO 
{OO 
getOO !
;OO! "
setOO# &
;OO& '
}OO( )
publicPP 

boolPP 
showSummaryPP 
{PP 
getPP !
;PP! "
setPP# &
;PP& '
}PP( )
publicQQ 

boolQQ 
	isVisibleQQ 
{QQ 
getQQ 
;QQ  
setQQ! $
;QQ$ %
}QQ& '
publicRR 

boolRR 
hasDependencyRR 
{RR 
getRR  #
;RR# $
setRR% (
;RR( )
}RR* +
publicSS 

ListSS 
<SS 
OptionSS 
>SS 
optionsSS 
{SS  !
getSS" %
;SS% &
setSS' *
;SS* +
}SS, -
publicTT 

GroupTT 
groupTT 
{TT 
getTT 
;TT 
setTT !
;TT! "
}TT# $
publicUU 

GroupSumaryUU 
groupSumaryUU "
{UU# $
getUU% (
;UU( )
setUU* -
;UU- .
}UU/ 0
publicVV 

RulesVV 
rulesVV 
{VV 
getVV 
;VV 
setVV !
;VV! "
}VV# $
publicWW 

intWW 
?WW 
geographicLevelWW 
{WW  !
getWW" %
;WW% &
setWW' *
;WW* +
}WW, -
publicXX 

boolXX 
?XX 
isBlockXX 
{XX 
getXX 
;XX 
setXX  #
;XX# $
}XX% &
publicYY 

stringYY 

indicativeYY 
{YY 
getYY "
;YY" #
setYY$ '
;YY' (
}YY) *
publicZZ 

stringZZ 
	optionSetZZ 
{ZZ 
getZZ !
;ZZ! "
setZZ# &
;ZZ& '
}ZZ( )
}[[ 
public]] 
class]]	 
Section]] 
{^^ 
public__ 

int__ 
	SectionID__ 
{__ 
get__ 
;__ 
set__  #
;__# $
}__% &
public`` 

string`` 
SectionName`` 
{`` 
get``  #
;``# $
set``% (
;``( )
}``* +
publicaa 

stringaa 
SubTitleaa 
{aa 
getaa  
;aa  !
setaa" %
;aa% &
}aa' (
publicbb 

Listbb 
<bb 
Fieldbb 
>bb 
fieldsbb 
{bb 
getbb  #
;bb# $
setbb% (
;bb( )
}bb* +
}cc 
publicee 
classee	 
Steptee 
{ff 
publicgg 

intgg 
SteptIDgg 
{gg 
getgg 
;gg 
setgg !
;gg! "
}gg# $
publichh 

stringhh 
	SteptNamehh 
{hh 
gethh !
;hh! "
sethh# &
;hh& '
}hh( )
publicii 

Listii 
<ii 
Sectionii 
>ii 
Sectionsii !
{ii" #
getii$ '
;ii' (
setii) ,
;ii, -
}ii. /
}jj 
publicll 
classll	 
SteptsCompanyll 
{mm 
publicnn 

stringnn 
	CompanyIDnn 
{nn 
getnn !
;nn! "
setnn# &
;nn& '
}nn( )
publicoo 

stringoo 
	CountryIDoo 
{oo 
getoo !
;oo! "
setoo# &
;oo& '
}oo( )
publicpp 

stringpp 
ContactDocumentpp !
{pp" #
getpp$ '
;pp' (
setpp) ,
;pp, -
}pp. /
publicqq 

stringqq 
CompanyPhoneqq 
{qq  
getqq! $
;qq$ %
setqq& )
;qq) *
}qq+ ,
publicrr 

Listrr 
<rr 
Steptrr 
>rr 
Steptsrr 
{rr 
getrr  #
;rr# $
setrr% (
;rr( )
}rr* +
}ss 
}{{ �
bC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\Lead\LeadGeographyLevel.cs
	namespace 	
CRMLeadFormLogin
 
. 
Controllers &
.& '
Lead' +
{ 
public 
class	 
Options 
{		 
public

 

int

 
optionId

 
{

 
get

 
;

 
set

 "
;

" #
}

$ %
public 

string 

optionGuid 
{ 
get "
;" #
set$ '
;' (
}) *
public 

string 
optionValue 
{ 
get  #
;# $
set% (
;( )
}* +
public 

int 
parentOption 
{ 
get !
;! "
set# &
;& '
}( )
public 

string 
levelReference  
{! "
get# &
;& '
set( +
;+ ,
}- .
} 
public 
class	 
	Companies 
{ 
public 

string 
	companyId 
{ 
get !
;! "
set# &
;& '
}( )
public 

List 
< 
Options 
> 
options  
{! "
get# &
;& '
set( +
;+ ,
}- .
} 
public 
class	 
GeographyLevel 
{ 
public 

int 
levelId 
{ 
get 
; 
set !
;! "
}# $
public 

List 
< 
	Companies 
> 
	companies $
{% &
get' *
;* +
set, /
;/ 0
}1 2
} 
} �
fC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\Lead\LeadLevelConfiguration.cs
	namespace 	
CRMLeadFormLogin
 
. 
Controllers &
.& '
Lead' +
{ 
public 
class	 
Level 
{		 
public

 

int

 
levelId

 
{

 
get

 
;

 
set

 !
;

! "
}

# $
public 

string 
tableSQL 
{ 
get  
;  !
set" %
;% &
}' (
public 

int 
	nextLevel 
{ 
get 
; 
set  #
;# $
}% &
public 

string 
levelReference  
{! "
get# &
;& '
set( +
;+ ,
}- .
} 
public 
class	 
LevelConfiguration !
{ 
public 

string 
	companyId 
{ 
get !
;! "
set# &
;& '
}( )
public 

List 
< 
Level 
> 
level 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} �
fC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\Lead\LeadRegisterController.cs
	namespace		 	
CRMLeadObjects		
 
.		 
Controllers		 $
.		$ %
Lead		% )
{

 
public 
class	 "
LeadRegisterController %
:& '
MainController( 6
{ 
public 

ActionResult 
Index 
( 
) 
{ 
return 
View 
( 
) 
; 
} 
} 
} �
fC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\Lead\OptionSetApiController.cs
	namespace 	
CRMLeadObjects
 
. 
Controllers $
.$ %
Lead% )
{ 
public 
class	 "
OptionSetApiController %
:& '
ApiController( 5
{ 
[ 
AllowAnonymous 
] 
[ 
Route 

(
 
$str #
)# $
]$ %
[ 
HttpGet 
] 
public 

HttpResponseMessage 
GetOptionSetByName 1
(1 2
)2 3
{ 
try 	
{ 
string 
	CompanyID 
= 
$str  
;  !
var 
response 
= %
GetOptionSetByDescription 0
(0 1
	CompanyID1 :
+; <
$str= O
)O P
;P Q
string 
jsonConvert 
= 
JsonConvert (
.( )
SerializeObject) 8
(8 9
response9 A
.A B
	ValueDataB K
,K L

FormattingM W
.W X
IndentedX `
)` a
;a b
JObject 
o 
= 
JObject 
. 
Parse !
(! "
response" *
.* +
	ValueData+ 4
)4 5
;5 6
return   
Request   
.   
CreateResponse   %
(  % &
HttpStatusCode  & 4
.  4 5
OK  5 7
,  7 8
jsonConvert  9 D
)  D E
;  E F
}!! 
catch"" 
("" 
	Exception"" 
ex"" 
)"" 
{## 
return$$ 
Request$$ 
.$$ 
CreateResponse$$ %
($$% &
HttpStatusCode$$& 4
.$$4 5
InternalServerError$$5 H
)$$H I
;$$I J
}&& 
}'' 
private)) 
	OptionSet)) %
GetOptionSetByDescription)) /
())/ 0
string))0 6
name))7 ;
))); <
{** 
List++ 

<++
 
Option++ 
>++ 

optionsSet++ 
=++ 
new++  #
List++$ (
<++( )
Option++) /
>++/ 0
(++0 1
)++1 2
;++2 3
var,, 	
	OptionSet,,
 
=,, 
LeadBLL,, 
.,, 
GetOptionSetAll,, -
(,,- .
),,. /
.,,/ 0
Where,,0 5
(,,5 6
x,,6 7
=>,,8 :
x,,; <
.,,< =
Description,,= H
==,,I K
name,,L P
),,P Q
.,,Q R
FirstOrDefault,,R `
(,,` a
),,a b
;,,b c
return-- 
	OptionSet-- 
;-- 
}.. 
}// 
}00 �
aC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\Lead\testingController.cs
	namespace 	
CRMLeadFormLogin
 
. 
Controllers &
.& '
Lead' +
{ 
public		 

class		 
testingController		 "
:		# $

Controller		% /
{

 
public 
ActionResult 
Index !
(! "
)" #
{ 	
return 
View 
( 
) 
; 
} 	
} 
} �"
mC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\Lead\ValidateCodeLeadApiController.cs
	namespace

 	
CRMLeadFormLogin


 
.

 
Controllers

 &
.

& '
Lead

' +
{ 
[ 
AllowAnonymous 
] 
public 
class	 )
ValidateCodeLeadApiController ,
:- .
ApiController/ <
{ 
[ 
Route 

(
 
$str  
)  !
]! "
[ 
HttpPost 
] 
public 

HttpResponseMessage 
CreateEmailCode .
(. /"
CreateEmailCodeRequest/ E"
createEmailCodeRequestF \
)\ ]
{ 
try 	
{ 
var 
result 
= 
ValidateCodeLead %
.% &
CreateEmailCode& 5
(5 6"
createEmailCodeRequest6 L
.L M
emailM R
,R S
(T U
boolU Y
)Y Z"
createEmailCodeRequestZ p
.p q
	sendEmailq z
,z {#
createEmailCodeRequest	| �
.
� �
LanguageEmail
� �
,
� �$
createEmailCodeRequest
� �
.
� �
ValidityTime
� �
)
� �
;
� �
return 
Request 
. 
CreateResponse %
(% &
HttpStatusCode& 4
.4 5
OK5 7
,7 8
result9 ?
)? @
;@ A
} 
catch 
( 
	Exception 
ex 
) 
{ 
return 
Request 
. 
CreateResponse %
(% &
HttpStatusCode& 4
.4 5
InternalServerError5 H
,H I
exJ L
.L M
MessageM T
)T U
;U V
} 
} 
[ 
Route 

(
 
$str  
)  !
]! "
[   
HttpPost   
]   
public!! 

HttpResponseMessage!! 
VerifyEmailCode!! .
(!!. /$
ValidateEmailCodeRequest!!/ G$
validateEmailCodeRequest!!H `
)!!` a
{"" 
try## 	
{$$ 
var%% 
result%% 
=%% 
ValidateCodeLead%% %
.%%% &
VerifyEmailCode%%& 5
(%%5 6$
validateEmailCodeRequest%%6 N
)%%N O
;%%O P
return&& 
Request&& 
.&& 
CreateResponse&& %
(&&% &
HttpStatusCode&&& 4
.&&4 5
OK&&5 7
,&&7 8
result&&9 ?
)&&? @
;&&@ A
}'' 
catch(( 
((( 
	Exception(( 
ex(( 
)(( 
{)) 
return** 
Request** 
.** 
CreateResponse** %
(**% &
HttpStatusCode**& 4
.**4 5
InternalServerError**5 H
,**H I
ex**J L
.**L M
Message**M T
)**T U
;**U V
}++ 
},, 
[.. 
Route.. 

(..
 
$str.. 
).. 
]..  
[// 
HttpPost// 
]// 
public00 

HttpResponseMessage00 
ValidateEmail00 ,
(00, -
string00- 3
email004 9
)009 :
{11 
try22 	
{33 
var44 
result44 
=44 
true44 
;44 
return55 
Request55 
.55 
CreateResponse55 %
(55% &
HttpStatusCode55& 4
.554 5
OK555 7
,557 8
result559 ?
)55? @
;55@ A
}66 
catch77 
(77 
	Exception77 
ex77 
)77 
{88 
return99 
Request99 
.99 
CreateResponse99 %
(99% &
HttpStatusCode99& 4
.994 5
InternalServerError995 H
,99H I
ex99J L
.99L M
Message99M T
)99T U
;99U V
}:: 
};; 
}== 
}>> �'
YC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\MainController.cs
	namespace 	
CRMLeadFormLogin
 
. 
Controllers &
{ 
[ 
NoCacheAttribute 
( 
) 
] 
public 
class	 
MainController 
: 

Controller  *
{ 
	protected 
override 
void 
OnActionExecuting -
(- ."
ActionExecutingContext. D
filterContextE R
)R S
{ 
string 

controller 
= 
( 
string !
)! "
this" &
.& '
	RouteData' 0
.0 1
Values1 7
[7 8
$str8 D
]D E
;E F
string 
action 
= 
( 
string 
) 
this "
." #
	RouteData# ,
., -
Values- 3
[3 4
$str4 <
]< =
;= >
if 
(	 

User
 
. 
Identity 
. 
IsAuthenticated '
)' (
{ 
var 
menu 
= 
new 
NavigationMenuBLL (
(( )
)) *
.* +
GetOptionsMenu+ 9
(9 :
MenuType: B
.B C
NavigationMenuC Q
)Q R
;R S
if 

( 
( 
action 
!= 
$str 
&& !

controller" ,
!=- /
$str0 9
)9 :
&&; =
(   
action   
!=   
$str   '
&&  ( *

controller  + 5
!=  6 8
$str  9 ?
)  ? @
)  @ A
{!! 	
if$$
 
($$ 

controller$$ 
!=$$ 
$str$$ *
&&$$+ -
($$. /
menu$$/ 3
.$$3 4
Where$$4 9
($$9 :
x$$: ;
=>$$< >
x$$? @
.$$@ A
Accion$$A G
==$$H J
action$$K Q
&&$$R T
x$$U V
.$$V W
Controlador$$W b
==$$c e

controller$$f p
)$$p q
.$$q r
Count$$r w
($$w x
)$$x y
<$$z {
$num$$| }
)$$} ~
)$$~ 
{%%
 
filterContext&& 
.&& 
Result&&  
=&&! "
RedirectToAction&&# 3
(&&3 4
$str&&4 >
,&&> ?
$str&&@ K
)&&K L
;&&L M
throw(( 
new(( 
HttpException(( #
(((# $
$num(($ '
,((' (
$str(() R
)((R S
;((S T
}))
 
}** 	
}++ 
if-- 
(--	 

!--
 
ValidarIdioma-- 
(-- 
(-- 
string--  
)--  !
this--! %
.--% &
	RouteData--& /
.--/ 0
Values--0 6
[--6 7
$str--7 A
]--A B
)--B C
)--C D
{.. 
throw// 
new// 
HttpException// 
(//  
$num//  #
,//# $
$str//% N
)//N O
;//O P
}11 
else22 

{33 
MapaRutaURL44 
ObjMapaRutaURL44 "
=44# $
new44% (
MapaRutaURL44) 4
(444 5
(445 6
string446 <
)44< =
this44= A
.44A B
	RouteData44B K
.44K L
Values44L R
[44R S
$str44S ]
]44] ^
,44^ _

controller44` j
,44j k
action44l r
)44r s
;44s t
GeneralSettings66 
.66  

setCulture66  *
(66* +
ObjMapaRutaURL66+ 9
.669 :
currentLanguageId66: K
)66K L
;66L M
}II 
}MM 
publicOO 

boolOO 
ValidarIdiomaOO 
(OO 
stringOO $
idiomaOO% +
)OO+ ,
{PP 
ifQQ 
(QQ	 

idiomaQQ
 
!=QQ 
nullQQ 
)QQ 
{RR 
ifSS 

(SS 
idiomaSS 
.SS 
EqualsSS 
(SS 
$strSS 
)SS 
||SS  "
idiomaSS# )
.SS) *
EqualsSS* 0
(SS0 1
$strSS1 5
)SS5 6
||SS7 9
idiomaSS: @
.SS@ A
EqualsSSA G
(SSG H
$strSSH L
)SSL M
)SSM N
{TT 	
returnUU
 
trueUU 
;UU 
}VV 	
elseWW 
{XX 	
returnYY
 
falseYY 
;YY 
}ZZ 	
}[[ 
else\\ 

{]] 
return^^ 
true^^ 
;^^ 
}__ 
}`` 
}aa 
}bb �
_C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Controllers\PagesErrorController.cs
	namespace 	
CRMLeadFormLogin
 
. 
Controllers &
{ 
public		 

class		  
PagesErrorController		 %
:		& '

Controller		( 2
{

 
public 
ActionResult 
Error404 $
($ %
)% &
{ 	
return 
View 
( 
) 
; 
} 	
} 
} � 
JC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Global.asax.cs
	namespace 	
CRMLeadFormLogin
 
{ 
public 

class 
MvcApplication 
:  !
System" (
.( )
Web) ,
., -
HttpApplication- <
{ 
	protected 
void 
Application_Start (
(( )
)) *
{ 	
GlobalConfiguration 
.  
Configuration  -
.- .

Formatters. 8
.8 9
Remove9 ?
(? @
GlobalConfiguration@ S
.S T
ConfigurationT a
.a b

Formattersb l
.l m
XmlFormatterm y
)y z
;z {
AreaRegistration 
. 
RegisterAllAreas -
(- .
). /
;/ 0
GlobalConfiguration 
.  
	Configure  )
() *
WebApiConfig* 6
.6 7
Register7 ?
)? @
;@ A
FilterConfig 
. !
RegisterGlobalFilters .
(. /
GlobalFilters/ <
.< =
Filters= D
)D E
;E F
RouteConfig 
. 
RegisterRoutes &
(& '

RouteTable' 1
.1 2
Routes2 8
)8 9
;9 :
BundleConfig 
. 
RegisterBundles (
(( )
BundleTable) 4
.4 5
Bundles5 <
)< =
;= >
} 	
	protected 
void /
#Application_PostAuthenticateRequest :
(: ;
Object; A
senderB H
,H I
	EventArgsJ S
eT U
)U V
{ 	

HttpCookie   

authCookie   !
=  " #
Request  $ +
.  + ,
Cookies  , 3
[  3 4
FormsAuthentication  4 G
.  G H
FormsCookieName  H W
]  W X
;  X Y
if"" 
("" 

authCookie"" 
!="" 
null"" "
)""" #
{## %
FormsAuthenticationTicket$$ )

authTicket$$* 4
=$$5 6
FormsAuthentication$$7 J
.$$J K
Decrypt$$K R
($$R S

authCookie$$S ]
.$$] ^
Value$$^ c
)$$c d
;$$d e 
JavaScriptSerializer&& $

serializer&&% /
=&&0 1
new&&2 5 
JavaScriptSerializer&&6 J
(&&J K
)&&K L
;&&L M$
CustomPrincipalSerialize(( (
serializeModel(() 7
=((8 9

serializer((: D
.((D E
Deserialize((E P
<((P Q$
CustomPrincipalSerialize((Q i
>((i j
(((j k

authTicket((k u
.((u v
UserData((v ~
)((~ 
;	(( �
CustomPrincipal** 
newUser**  '
=**( )
new*** -
CustomPrincipal**. =
(**= >

authTicket**> H
.**H I
Name**I M
)**M N
;**N O
newUser++ 
.++ 
	SessionId++ !
=++" #
serializeModel++$ 2
.++2 3
	SessionId++3 <
;++< =
newUser,, 
.,, 
Email,, 
=,, 
serializeModel,,  .
.,,. /
Email,,/ 4
;,,4 5
newUser-- 
.-- 
FirtName--  
=--! "
serializeModel--# 1
.--1 2
FirtName--2 :
;--: ;
newUser.. 
... 
UserId.. 
=..  
serializeModel..! /
.../ 0
UserId..0 6
;..6 7
newUser// 
.// 
	CompanyId// !
=//" #
serializeModel//$ 2
.//2 3
	CompanyId//3 <
;//< =
HttpContext11 
.11 
Current11 #
.11# $
User11$ (
=11) *
newUser11+ 2
;112 3
}22 
}33 	
}44 
}55 �
NC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Globals\Context.cs
	namespace 	
CRMLeadFormLogin
 
. 
Globals "
{ 
public		 

class		 
Context		 
:		 
IContext		 #
{

 
public 
HttpRequestMessage !
Request" )
{* +
get, /
;/ 0
set1 4
;4 5
}6 7
public 
Guid 
? 
CallId 
{ 
get !
;! "
set# &
;& '
}( )
public 
string 
ClientIp 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
string 

CacheValue  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
	Exception 
	Exception "
{# $
get% (
;( )
set* -
;- .
}/ 0
public 
Guid 
? 
	Reference 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
Context 
( 
HttpRequestMessage )
request* 1
)1 2
{ 	
Request 
= 
request 
; 
} 	
internal 
static 
Context 
GetCurrentContext  1
(1 2
HttpRequestMessage2 D&
requestToLoadIfUnavailableE _
)_ `
{ 	
Context 
context 
= 
null "
;" #
if 
( 
HttpContext 
. 
Current #
!=$ &
null' +
&&, .
HttpContext/ :
.: ;
Current; B
.B C
ItemsC H
.H I
ContainsI Q
(Q R
$strR [
)[ \
&&] _
HttpContext` k
.k l
Currentl s
.s t
Itemst y
[y z
$str	z �
]
� �
!=
� �
null
� �
)
� �
{ 
context 
= 
( 
Context "
)" #
HttpContext# .
.. /
Current/ 6
.6 7
Items7 <
[< =
$str= F
]F G
;G H
}   
else!! 
if!! 
(!! &
requestToLoadIfUnavailable!! /
!=!!0 2
null!!3 7
)!!7 8
{"" 
context## 
=## 
new## 
Context## %
(##% &&
requestToLoadIfUnavailable##& @
)##@ A
;##A B
HttpContext$$ 
.$$ 
Current$$ #
.$$# $
Items$$$ )
[$$) *
$str$$* 3
]$$3 4
=$$5 6
context$$7 >
;$$> ?
}%% 
return'' 
context'' 
;'' 
}(( 	
internal** 
static** 
Context** 
GetCurrentContext**  1
(**1 2
)**2 3
=>**4 6
GetCurrentContext**7 H
(**H I
null**I M
)**M N
;**N O
},, 
}-- �
OC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Globals\IContext.cs
	namespace 	
CRMLeadFormLogin
 
. 
Globals "
{ 
public		 

	interface		 
IContext		 
{

 
HttpRequestMessage 
Request "
{# $
get% (
;( )
set* -
;- .
}/ 0
Guid 
? 
CallId 
{ 
get 
; 
set 
;  
}! "
string 
ClientIp 
{ 
get 
; 
set "
;" #
}$ %
string 

CacheValue 
{ 
get 
;  
set! $
;$ %
}& '
	Exception 
	Exception 
{ 
get !
;! "
set# &
;& '
}( )
Guid 
? 
	Reference 
{ 
get 
; 
set "
;" #
}$ %
} 
} �(
`C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Globals\RequestAndResponseHandler.cs
	namespace 	
CRMLeadFormLogin
 
. 
Globals "
{ 
public 

class %
RequestAndResponseHandler *
:+ ,
DelegatingHandler- >
{ 
ApiLog 
	BLLApiLog 
= 
new 
ApiLog %
(% &
)& '
;' (
	protected 
override 
async  
Task! %
<% &
HttpResponseMessage& 9
>9 :
	SendAsync; D
(D E
HttpRequestMessageE W
requestX _
,_ `
CancellationTokena r
cancellationToken	s �
)
� �
{ 	
var 
uri 
= 
request 
. 

RequestUri (
;( )
var 
host 
= 
uri 
. 
Host 
;  
var 
method 
= 
request  
.  !
Method! '
;' (
var 
requestOperation  
=! "
$str# 1
;1 2
var 
requestBodyTxt 
=  
await! &
request' .
.. /
Content/ 6
.6 7
ReadAsStringAsync7 H
(H I
)I J
;J K
var 
requestBody 
= 
new ! 
JavaScriptSerializer" 6
(6 7
)7 8
.8 9
Deserialize9 D
<D E
AddmailQueueE Q
>Q R
(R S
requestBodyTxtS a
)a b
;b c
var 
context 
= 
System  
.  !
Web! $
.$ %
HttpContext% 0
.0 1
Current1 8
;8 9
var 
clientIp 
= 
context "
." #
Request# *
.* +
ServerVariables+ :
[: ;
$str; H
]H I
;I J
var 
response 
= 
await  
base! %
.% &
	SendAsync& /
(/ 0
request0 7
,7 8
cancellationToken9 J
)J K
;K L
var 

statusCode 
= 
response %
.% &

StatusCode& 0
.0 1
ToString1 9
(9 :
): ;
;; <
var 
responseTxt 
= 
await #
response$ ,
., -
Content- 4
.4 5
ReadAsStringAsync5 F
(F G
)G H
;H I
var 

apiVersion 
= 
typeof #
(# $%
RequestAndResponseHandler$ =
)= >
.> ?
Assembly? G
.G H
GetNameH O
(O P
)P Q
.Q R
VersionR Y
.Y Z
ToStringZ b
(b c
)c d
;d e
;f g
var 

customerId 
= 
requestBody (
.( )

CustomerId) 3
;3 4
var   
orderNumber   
=   
requestBody   )
.  ) *
OrderNumber  * 5
;  5 6
var!! 
localSku!! 
=!! 
$str!! 
;!! 
var"" 

controller"" 
="" 
$str"" '
;""' (
var## 

cacheValue## 
=## 
$str## 
;##  
var$$ 
	exception$$ 
=$$ 
$str$$ 
;$$ 
Guid%% 
	reference%% 
=%% 
new%%  
Guid%%! %
(%%% &
)%%& '
;%%' (
var&& 
	userAgent&& 
=&& 
context&& #
.&&# $
Request&&$ +
.&&+ ,
	UserAgent&&, 5
;&&5 6
	BLLApiLog'' 
.'' 
CreateApiLog'' "
(''" #
method''# )
.'') *
ToString''* 2
(''2 3
)''3 4
,''4 5
uri''6 9
.''9 :
AbsoluteUri'': E
,''E F
requestOperation''G W
,''W X
requestBodyTxt(( 
,(( 
host((  $
,(($ %
clientIp((& .
,((. /

statusCode((0 :
,((: ;
responseTxt((< G
,((G H

apiVersion((I S
,((S T

customerId((U _
,((_ `
orderNumber((a l
,((l m
localSku)) 
,)) 

controller)) $
,))$ %

cacheValue))& 0
,))0 1
	exception))2 ;
,)); <
	reference))= F
,))F G
	userAgent))H Q
)))Q R
;))R S
return** 
response** 
;** 
}++ 	
},, 
}-- �
UC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Models\CustomPrincipal.cs
	namespace 	
CRMLeadFormLogin
 
. 
Models !
{ 
public 

class 
CustomPrincipal  
:! "

IPrincipal# -
{		 
public

 
	IIdentity

 
Identity

 !
{

" #
get

$ '
;

' (
private

) 0
set

1 4
;

4 5
}

6 7
public 
bool 
IsInRole 
( 
string #
role$ (
)( )
{* +
return, 2
false3 8
;8 9
}: ;
public 
CustomPrincipal 
( 
string %
name& *
)* +
{ 	
this 
. 
Identity 
= 
new 
GenericIdentity  /
(/ 0
name0 4
)4 5
;5 6
} 	
public 
string 
	SessionId 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
FirtName 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
string 
Email 
{ 
get !
;! "
set# &
;& '
}( )
public 
string 
UserId 
{ 
get "
;" #
set$ '
;' (
}) *
public 
string  
LoginActiveDirectory *
{+ ,
get- 0
;0 1
set2 5
;5 6
}7 8
public 
string !
GroupsActiveDirectory +
{, -
get. 1
;1 2
set3 6
;6 7
}8 9
public 
Guid 
ApiKey 
; 
public 
string 

CurrencyId  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
string 
	CompanyId 
{  !
get" %
;% &
set' *
;* +
}, -
}   
}!! �
^C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Models\CustomPrincipalSerialize.cs
	namespace 	
CRMLeadFormLogin
 
. 
Models !
{ 
public 
class	 $
CustomPrincipalSerialize '
{ 
public		 

string		 
	SessionId		 
{		 
get		 !
;		! "
set		# &
;		& '
}		( )
public

 

string

 
FirtName

 
{

 
get

  
;

  !
set

" %
;

% &
}

' (
public 

string 
Email 
{ 
get 
; 
set "
;" #
}$ %
public 

string 
UserId 
{ 
get 
; 
set  #
;# $
}% &
public 

string  
LoginActiveDirectory &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 

string !
GroupsActiveDirectory '
{( )
get* -
;- .
set/ 2
;2 3
}4 5
public 

string 
	CompanyId 
{ 
get !
;! "
set# &
;& '
}( )
public 

Guid 
ApiKey 
{ 
get 
; 
set !
;! "
}# $
public 

string 

CurrencyId 
{ 
get "
;" #
set$ '
;' (
}) *
public 


Dictionary 
< 
string 
, 
string #
># $
ValueSetting% 1
{1 2
get3 6
;6 7
set8 ;
;; <
}= >
} 
} �
QC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Models\MapaRutaURL.cs
	namespace 	
CRMLeadFormLogin
 
. 
Models !
{ 
public 

class 
MapaRutaURL 
{		 
public

 
string

 
currentLanguageId

 '
{

( )
get

* -
;

- .
set

/ 2
;

2 3
}

4 5
public 
string 
currentController '
{( )
get* -
;- .
set/ 2
;2 3
}4 5
public 
string 
currentAction #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
MapaRutaURL 
( 
) 
{ 	
} 	
public 
MapaRutaURL 
( 
string !
currentLanguageId" 3
,3 4
string5 ;
currentController< M
,M N
stringO U
currentActionV c
)c d
{ 	
this 
. 
currentLanguageId "
=# $
currentLanguageId% 6
;6 7
this 
. 
currentController "
=# $
currentController% 6
;6 7
this 
. 
currentAction 
=  
currentAction! .
;. /
} 	
} 
} �
VC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Properties\AssemblyInfo.cs
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
["" 
assembly"" 	
:""	 

AssemblyVersion"" 
("" 
$str"" $
)""$ %
]""% &
[## 
assembly## 	
:##	 

AssemblyFileVersion## 
(## 
$str## (
)##( )
]##) *�	
FC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Startup.cs
[ 
assembly 	
:	 

OwinStartup 
( 
typeof 
( 
CRMLeadFormLogin .
.. /
Startup/ 6
)6 7
)7 8
]8 9
	namespace		 	
CRMLeadFormLogin		
 
{

 
public 
partial	 
class 
Startup 
{ 
static 

readonly 
string 
singleSignOnActive -
=. / 
ConfigurationManager0 D
.D E
AppSettingsE P
[P Q
$strQ e
]e f
;f g
public 

void 
Configuration 
( 
IAppBuilder )
app* -
)- .
{ 
if 
(	 

Convert
 
. 
	ToBoolean 
( 
singleSignOnActive .
). /
)/ 0
ConfigureAuth 
( 
app 
) 
; 
} 
} 
} � 
]C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Utils\ClaimsPrincipalExtension.cs
	namespace 	
CRMLeadFormLogin
 
. 
Utils  
{   
public!! 

static!! 
class!! $
ClaimsPrincipalExtension!! 0
{"" 
public(( 
static(( 
string(( 
GetB2CMsalAccountId(( 0
(((0 1
this((1 5
ClaimsPrincipal((6 E
claimsPrincipal((F U
)((U V
{)) 	
string** 	
userObjectId**
 
=** 
GetObjectId** $
(**$ %
claimsPrincipal**% 4
)**4 5
;**5 6
string++ 	
tenantId++
 
=++ 
Globals++ 
.++ 
TenantId++ %
;++% &
if-- 
(-- 
!-- 
string-- 
.-- 
IsNullOrWhiteSpace-- !
(--! "
userObjectId--" .
)--. /
&&--0 2
!--3 4
string--4 :
.--: ;
IsNullOrWhiteSpace--; M
(--M N
tenantId--N V
)--V W
)--W X
{.. 
return// 

$"// 
{// 
userObjectId// 
}// 
$str// 
{// 
tenantId// %
}//% &
"//& '
;//' (
}00 
return22 	
null22
 
;22 
}33 
public:: 
static::	 
string:: 
GetObjectId:: "
(::" #
this::# '
ClaimsPrincipal::( 7
claimsPrincipal::8 G
)::G H
{;; 	
var<< 

objIdclaim<< 
=<< 
claimsPrincipal<< ,
.<<, -
	FindFirst<<- 6
(<<6 7

ClaimTypes<<7 A
.<<A B
NameIdentifier<<B P
)<<P Q
;<<Q R
if>> 
(>> 

objIdclaim>> 
==>> 
null>> "
)>>" #
{?? 

objIdclaim@@ 
=@@ 
claimsPrincipal@@ ,
.@@, -
	FindFirst@@- 6
(@@6 7
$str@@7 <
)@@< =
;@@= >
}AA 
returnCC 

objIdclaimCC 
!=CC  
nullCC! %
?CC& '

objIdclaimCC( 2
.CC2 3
ValueCC3 8
:CC9 :
stringCC; A
.CCA B
EmptyCCB G
;CCG H
}DD 	
publicKK 
staticKK 
ClaimsPrincipalKK %
ToClaimsPrincipalKK& 7
(KK7 8
thisKK8 <
IAccountKK= E
accountKKF M
)KKM N
{LL 	
ifMM 
(MM 
accountMM 
!=MM 
nullMM 
)MM  
{NN 
varOO 
identityOO 
=OO 
newOO "
ClaimsIdentityOO# 1
(OO1 2
)OO2 3
;OO3 4
identityPP 
.PP 
AddClaimPP !
(PP! "
newPP" %
ClaimPP& +
(PP+ ,
ClaimConstantsPP, :
.PP: ;
ObjectIdPP; C
,PPC D
accountPPE L
.PPL M
HomeAccountIdPPM Z
.PPZ [
ObjectIdPP[ c
)PPc d
)PPd e
;PPe f
identityQQ 
.QQ 
AddClaimQQ !
(QQ! "
newQQ" %
ClaimQQ& +
(QQ+ ,
ClaimConstantsQQ, :
.QQ: ;
TenantIdQQ; C
,QQC D
accountQQE L
.QQL M
HomeAccountIdQQM Z
.QQZ [
TenantIdQQ[ c
)QQc d
)QQd e
;QQe f
identityRR 
.RR 
AddClaimRR !
(RR! "
newRR" %
ClaimRR& +
(RR+ ,

ClaimTypesRR, 6
.RR6 7
UpnRR7 :
,RR: ;
accountRR< C
.RRC D
UsernameRRD L
)RRL M
)RRM N
;RRN O
returnSS 
newSS 
ClaimsPrincipalSS *
(SS* +
identitySS+ 3
)SS3 4
;SS4 5
}TT 
returnVV 
nullVV 
;VV 
}WW 	
}XX 
}YY �
[C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Utils\DeserializeValueCookie.cs
	namespace

 	
CRMLeadFormLogin


 
.

 
Utils

  
{ 
public 
static	 
class "
DeserializeValueCookie ,
{ 
public 

static $
CustomPrincipalSerialize *
Deserialize+ 6
(6 7
string7 =
valueCookie> I
)I J
{ 
string 
singleSignOnActive 
=  ! 
ConfigurationManager" 6
.6 7
AppSettings7 B
[B C
$strC W
]W X
;X Y
bool 

.
 
TryParse 
( 
singleSignOnActive &
,& '
out( +
var, /
isSingleSignOn0 >
)> ?
;? @
System 
. 
Web 
. 
Script 
. 
Serialization %
.% & 
JavaScriptSerializer& :

serializer; E
=F G
newH K 
JavaScriptSerializerL `
(` a
)a b
;b c
if 
(	 

isSingleSignOn
 
) 
return 

serializer 
. 
Deserialize %
<% &$
CustomPrincipalSerialize& >
>> ?
(? @
valueCookie@ K
)K L
;L M
else 

{ 
var 
valueCookieDecrypt 
=  
System! '
.' (
Web( +
.+ ,
Security, 4
.4 5
FormsAuthentication5 H
.H I
DecryptI P
(P Q
valueCookieQ \
)\ ]
;] ^
return 

serializer 
. 
Deserialize %
<% &$
CustomPrincipalSerialize& >
>> ?
(? @
valueCookieDecrypt@ R
.R S
UserDataS [
)[ \
;\ ]
} 
} 
}!! 
}"" �%
LC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Utils\Globals.cs
	namespace 	
CRMLeadFormLogin
 
. 
Utils  
{ 
public 
static 
class 
Globals 
{ 
public 
static 
string 
ClientId %
=& ' 
ConfigurationManager( <
.< =
AppSettings= H
[H I
$strI W
]W X
;X Y
public		 
static		 
string		 
ClientSecret		 )
=		* + 
ConfigurationManager		, @
.		@ A
AppSettings		A L
[		L M
$str		M _
]		_ `
;		` a
public

 
static

 
string

 
AadInstance

 (
=

) * 
ConfigurationManager

+ ?
.

? @
AppSettings

@ K
[

K L
$str

L ]
]

] ^
;

^ _
public 
static 
string 
Tenant #
=$ % 
ConfigurationManager& :
.: ;
AppSettings; F
[F G
$strG S
]S T
;T U
public 
static	 
string 
TenantId 
=  ! 
ConfigurationManager" 6
.6 7
AppSettings7 B
[B C
$strC Q
]Q R
;R S
public 
static	 
string 
RedirectUri "
=# $ 
ConfigurationManager% 9
.9 :
AppSettings: E
[E F
$strF W
]W X
;X Y
public 
static 
string 

ServiceUrl '
=( ) 
ConfigurationManager* >
.> ?
AppSettings? J
[J K
$strK _
]_ `
;` a
public 
static 
string  
SignUpSignInPolicyId 1
=2 3 
ConfigurationManager4 H
.H I
AppSettingsI T
[T U
$strU o
]o p
;p q
public 
static 
string 
EditProfilePolicyId 0
=1 2 
ConfigurationManager3 G
.G H
AppSettingsH S
[S T
$strT m
]m n
;n o
public 
static 
string !
ResetPasswordPolicyId 2
=3 4 
ConfigurationManager5 I
.I J
AppSettingsJ U
[U V
$strV q
]q r
;r s
public 
static 
string 
DefaultPolicy *
=+ , 
SignUpSignInPolicyId- A
;A B
public 
static 
string 
RedirectUriLogout .
=/ 0 
ConfigurationManager1 E
.E F
AppSettingsF Q
[Q R
$strR i
]i j
;j k
public 

static 
string 
ApiIdentifier &
=' ( 
ConfigurationManager) =
.= >
AppSettings> I
[I J
$strJ ]
]] ^
;^ _
public 
static 
string 
ReadTasksScope +
=, -
ApiIdentifier. ;
+< = 
ConfigurationManager> R
.R S
AppSettingsS ^
[^ _
$str_ n
]n o
;o p
public 
static 
string 
WriteTasksScope ,
=- .
ApiIdentifier/ <
+= > 
ConfigurationManager? S
.S T
AppSettingsT _
[_ `
$str` p
]p q
;q r
public 
static 
string 
[ 
] 
Scopes %
=& '
new( +
string, 2
[2 3
]3 4
{5 6
ReadTasksScope7 E
,E F
WriteTasksScopeG V
}W X
;X Y
public 
const 
string 
ObjectIdElement +
=, -
$str. t
;t u
public"" 

static"" 
string"" 
B2CAuthority"" %
=""& '
string""( .
."". /
Format""/ 5
(""5 6
AadInstance""6 A
,""A B
Tenant""C I
,""I J
DefaultPolicy""K X
)""X Y
;""Y Z
public## 
static## 
string## 
WellKnownMetadata## .
=##/ 0
$"##1 3
{##3 4
AadInstance##4 ?
}##? @
$str##@ f
"##f g
;##g h
}%% 
}&& �M
OC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Utils\JwtManager.cs
	namespace 	
CRMLeadObjects
 
. 
Utils 
{ 
public 

static 
class 

JwtManager "
{ 
private 
static 
byte 
[ 
] 
secret $
=% &
null' +
;+ ,
static 

JwtManager 
( 
) 
{ 	
var 
hmac 
= 
new 

HMACSHA512 %
(% &
)& '
;' (
secret 
= 
hmac 
. 
Key 
; 
} 	
public 
static 
ClaimsPrincipal %
GetPrincipal& 2
(2 3
string3 9
token: ?
)? @
{ 	
try 
{ 
string   
policyId   
=    ! 
ConfigurationManager  " 6
.  6 7
AppSettings  7 B
[  B C
$str  C ]
]  ] ^
;  ^ _
string!! 
myTenant!! 
=!!  ! 
ConfigurationManager!!" 6
.!!6 7
AppSettings!!7 B
[!!B C
$str!!C Q
]!!Q R
;!!R S
var"" 
audience"" 
=""  
ConfigurationManager"" 3
.""3 4
AppSettings""4 ?
[""? @
$str""@ N
]""N O
;""O P
var## 
issuer## 
=##  
ConfigurationManager## 1
.##1 2
AppSettings##2 =
[##= >
$str##> F
]##F G
;##G H
var$$ 
secret$$ 
=$$  
ConfigurationManager$$ 1
.$$1 2
AppSettings$$2 =
[$$= >
$str$$> P
]$$P Q
;$$Q R
var%% 
securityKey%% 
=%%  !
new%%" % 
SymmetricSecurityKey%%& :
(%%: ;
Encoding%%; C
.%%C D
ASCII%%D I
.%%I J
GetBytes%%J R
(%%R S
secret%%S Y
)%%Y Z
)%%Z [
;%%[ \
var&&  
stsDiscoveryEndpoint&& (
=&&) *
String&&+ 1
.&&1 2
Format&&2 8
(&&8 9
CultureInfo&&9 D
.&&D E
InvariantCulture&&E U
,&&U V
$str	&&W �
,
&&� �
myTenant
&&� �
,
&&� �
policyId
&&� �
)
&&� �
;
&&� �
var'' 
configManager'' !
=''" #
new''$ ' 
ConfigurationManager''( <
<''< =&
OpenIdConnectConfiguration''= W
>''W X
(''X Y 
stsDiscoveryEndpoint''Y m
,''m n
new''o r0
#OpenIdConnectConfigurationRetriever	''s �
(
''� �
)
''� �
)
''� �
;
''� �
var(( 
config(( 
=(( 
configManager(( *
.((* +!
GetConfigurationAsync((+ @
(((@ A
)((A B
.((B C
ContinueWith((C O
(((O P
t((P Q
=>((R T
t((U V
.((V W
Result((W ]
)((] ^
;((^ _
config)) 
.)) 
Wait)) 
()) 
))) 
;)) 
var++ 
tokenHandler++  
=++! "
new++# &#
JwtSecurityTokenHandler++' >
(++> ?
)++? @
;++@ A
var--  
validationParameters-- (
=--) *
new--+ .%
TokenValidationParameters--/ H
{.. 
ValidAudience// !
=//" #
audience//$ ,
,//, -
ValidIssuer00 
=00  !
issuer00" (
,00( )
IssuerSigningKeys11 %
=11& '
config11( .
.11. /
Result11/ 5
.115 6
SigningKeys116 A
,11A B
IssuerSigningKey22 $
=22% &
securityKey22' 2
,222 3
ValidateLifetime33 $
=33% &
true33' +
,33+ ,
LifetimeValidator44 %
=44& '#
CustomLifetimeValidator44( ?
,44? @!
RequireExpirationTime55 )
=55* +
true55, 0
,550 1
}66 
;66 
var88 
validatedToken88 "
=88# $
(88% &
SecurityToken88& 3
)883 4
new884 7
JwtSecurityToken888 H
(88H I
)88I J
;88J K
var;; 
	principal;; 
=;; 
tokenHandler;;  ,
.;;, -
ValidateToken;;- :
(;;: ;
token;;; @
,;;@ A 
validationParameters;;B V
,;;V W
out;;X [
validatedToken;;\ j
);;j k
;;;k l
return<< 
	principal<<  
;<<  !
}>> 
catch@@ 
(@@ 
	Exception@@ 
ex@@ 
)@@  
{AA 
returnBB 
nullBB 
;BB 
}CC 
}DD 	
privateFF 
staticFF 
boolFF #
CustomLifetimeValidatorFF 3
(FF3 4
DateTimeFF4 <
?FF< =
	notBeforeFF> G
,FFG H
DateTimeFFI Q
?FFQ R
expiresFFS Z
,FFZ [
SecurityTokenFF\ i
tokenToValidateFFj y
,FFy z&
TokenValidationParameters	FF{ �
@param
FF� �
)
FF� �
{GG 	
ifHH 
(HH 
expiresHH 
!=HH 
nullHH 
)HH  
{II 
returnJJ 
expiresJJ 
>JJ  
DateTimeJJ! )
.JJ) *
UtcNowJJ* 0
;JJ0 1
}KK 
returnLL 
falseLL 
;LL 
}MM 	
publicVV 
staticVV 
stringVV 
GenerateTokenIwsVV -
(VV- .
IEnumerableVV. 9
<VV9 :
ClaimVV: ?
>VV? @
infoUserVVA I
,VVI J
intVVK N
expireMinutesVVO \
=VV] ^
$numVV_ a
)VVa b
{WW 	
varXX 
tokenHandlerXX 
=XX 
newXX "#
JwtSecurityTokenHandlerXX# :
(XX: ;
)XX; <
;XX< =
varYY 
nowYY 
=YY 
DateTimeYY 
.YY 
UtcNowYY %
;YY% &
varZZ 
tokenDescriptorZZ 
=ZZ  !
newZZ" %#
SecurityTokenDescriptorZZ& =
{[[ 
Subject\\ 
=\\ 
new\\ 
ClaimsIdentity\\ ,
(\\, -
infoUser\\- 5
)\\5 6
,\\6 7
Expires^^ 
=^^ 
now^^ 
.^^ 

AddMinutes^^ (
(^^( )
Convert^^) 0
.^^0 1
ToInt32^^1 8
(^^8 9
expireMinutes^^9 F
)^^F G
)^^G H
,^^H I
SigningCredentials`` "
=``# $
new``% (
SigningCredentials``) ;
(``; <
newaa  
SymmetricSecurityKeyaa ,
(aa, -
secretaa- 3
)aa3 4
,aa4 5
SecurityAlgorithmsbb &
.bb& '
HmacSha256Signaturebb' :
)bb: ;
,bb; <
}dd 
;dd 
varff 
stokenff 
=ff 
tokenHandlerff %
.ff% &
CreateTokenff& 1
(ff1 2
tokenDescriptorff2 A
)ffA B
;ffB C
vargg 
tokengg 
=gg 
tokenHandlergg $
.gg$ %

WriteTokengg% /
(gg/ 0
stokengg0 6
)gg6 7
;gg7 8
returnii 
tokenii 
;ii 
}jj 	
publicqq 
staticqq 
ClaimsPrincipalqq %
ValidateTokenIwsqq& 6
(qq6 7
stringqq7 =
tokenqq> C
)qqC D
{rr 	
tryss 
{tt 
varuu 
tokenHandleruu  
=uu! "
newuu# &#
JwtSecurityTokenHandleruu' >
(uu> ?
)uu? @
;uu@ A
varvv 
jwtTokenvv 
=vv 
tokenHandlervv +
.vv+ ,
	ReadTokenvv, 5
(vv5 6
tokenvv6 ;
)vv; <
asvv= ?
JwtSecurityTokenvv@ P
;vvP Q
ifxx 
(xx 
jwtTokenxx 
==xx 
nullxx  $
)xx$ %
returnyy 
nullyy 
;yy  
var{{  
validationParameters{{ (
={{) *
new{{+ .%
TokenValidationParameters{{/ H
({{H I
){{I J
{|| !
RequireExpirationTime}} )
=}}* +
true}}, 0
,}}0 1
ValidateIssuer~~ "
=~~# $
false~~% *
,~~* +
ValidateAudience $
=% &
false' ,
,, -
IssuerSigningKey
�� $
=
��% &
new
��' *"
SymmetricSecurityKey
��+ ?
(
��? @
secret
��@ F
)
��F G
}
�� 
;
�� 
SecurityToken
�� 
securityToken
�� +
;
��+ ,
var
�� 
	principal
�� 
=
�� 
tokenHandler
��  ,
.
��, -
ValidateToken
��- :
(
��: ;
token
��; @
,
��@ A"
validationParameters
��B V
,
��V W
out
��X [
securityToken
��\ i
)
��i j
;
��j k
return
�� 
	principal
��  
;
��  !
}
�� 
catch
�� 
(
�� 
	Exception
�� 
)
�� 
{
�� 
return
�� 
null
�� 
;
�� 
}
�� 
}
�� 	
}
�� 
}�� �
SC:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Utils\MsalAppBuilder.cs
	namespace 	
CRMLeadFormLogin
 
. 
Utils  
{   
public!! 
static!! 
class!! 
MsalAppBuilder!! #
{"" 
public'' 
static''	 *
IConfidentialClientApplication'' ..
"BuildConfidentialClientApplication''/ Q
(''Q R
)''R S
{(( 
return)) 	.
"BuildConfidentialClientApplication))
 ,
()), -
ClaimsPrincipal))- <
.))< =
Current))= D
)))D E
;))E F
}** 
public00 
static00	 *
IConfidentialClientApplication00 ..
"BuildConfidentialClientApplication00/ Q
(00Q R
ClaimsPrincipal00R a
currentUser00b m
)00m n
{11 *
IConfidentialClientApplication22 !
	clientapp22" +
=22, -0
$ConfidentialClientApplicationBuilder22. R
.22R S
Create22S Y
(22Y Z
Globals22Z a
.22a b
ClientId22b j
)22j k
.33 
WithClientSecret33 
(33 
Globals33 
.33  
ClientSecret33  ,
)33, -
.44 
WithRedirectUri44 
(44 
Globals44 
.44 
RedirectUri44 *
)44* +
.55 
WithB2CAuthority55 
(55 
Globals55 
.55  
B2CAuthority55  ,
)55, -
.66 
Build66 
(66 
)66 
;66 '
MSALPerUserMemoryTokenCache88 
userTokenCache88 -
=88. /
new880 3'
MSALPerUserMemoryTokenCache884 O
(88O P
	clientapp88P Y
.88Y Z
UserTokenCache88Z h
,88h i
currentUser88j u
??88v x
ClaimsPrincipal	88y �
.
88� �
Current
88� �
)
88� �
;
88� �
return99 	
	clientapp99
 
;99 
}:: 
public@@ 
static@@	 
async@@ 
Task@@ 
ClearUserTokenCache@@ .
(@@. /
)@@/ 0
{AA *
IConfidentialClientApplicationBB !
	clientappBB" +
=BB, -0
$ConfidentialClientApplicationBuilderBB. R
.BBR S
CreateBBS Y
(BBY Z
GlobalsBBZ a
.BBa b
ClientIdBBb j
)BBj k
.CC 
WithB2CAuthorityCC 
(CC 
GlobalsCC 
.CC 
B2CAuthorityCC *
)CC* +
.DD 
WithClientSecretDD 
(DD 
GlobalsDD 
.DD 
ClientSecretDD *
)DD* +
.EE 
WithRedirectUriEE 
(EE 
GlobalsEE 
.EE 
RedirectUriEE (
)EE( )
.FF 
BuildFF 

(FF
 
)FF 
;FF '
MSALPerUserMemoryTokenCacheII 
userTokenCacheII -
=II. /
newII0 3'
MSALPerUserMemoryTokenCacheII4 O
(IIO P
	clientappIIP Y
.IIY Z
UserTokenCacheIIZ h
)IIh i
;IIi j
varJJ 
userAccountsJJ 
=JJ 
awaitJJ 
	clientappJJ %
.JJ% &
GetAccountsAsyncJJ& 6
(JJ6 7
)JJ7 8
;JJ8 9
foreachLL 

(LL 
varLL 
accountLL 
inLL 
userAccountsLL '
)LL' (
{MM 
awaitOO 	
	clientappOO
 
.OO 
RemoveAsyncOO 
(OO  
accountOO  '
)OO' (
;OO( )
}PP 
}SS 	
}TT 
}UU �=
`C:\Users\jaria304\source\repos\CRMLeadForm\CRMLeadFormLogin\Utils\MSALPerUserMemoryTokenCache.cs
	namespace 	
CRMLeadObjects
 
. 
Utils 
{   
public!! 
class!! '
MSALPerUserMemoryTokenCache!! )
{"" 
internal&& 

readonly&& 
MemoryCache&& 
memoryCache&&  +
=&&, -
MemoryCache&&. 9
.&&9 :
Default&&: A
;&&A B
private++ 	
readonly++
 
DateTimeOffset++ !
cacheDuration++" /
=++0 1
DateTimeOffset++2 @
.++@ A
Now++A D
.++D E
AddHours++E M
(++M N
$num++N P
)++P Q
;++Q R
internal00 

ClaimsPrincipal00 
SignedInUser00 '
;00' (
public66 '
MSALPerUserMemoryTokenCache66	 $
(66$ %
ITokenCache66% 0

tokenCache661 ;
)66; <
{77 
this88 
.88 

Initialize88 
(88 

tokenCache88 
,88 
ClaimsPrincipal88 .
.88. /
Current88/ 6
)886 7
;887 8
}99 
public@@ '
MSALPerUserMemoryTokenCache@@	 $
(@@$ %
ITokenCache@@% 0

tokenCache@@1 ;
,@@; <
ClaimsPrincipal@@= L
user@@M Q
)@@Q R
{AA 
thisBB 
.BB 

InitializeBB 
(BB 

tokenCacheBB 
,BB 
userBB #
)BB# $
;BB$ %
}CC 
privateHH 	
voidHH
 

InitializeHH 
(HH 
ITokenCacheHH %

tokenCacheHH& 0
,HH0 1
ClaimsPrincipalHH2 A
userHHB F
)HHF G
{II 
thisJJ 
.JJ 
SignedInUserJJ 
=JJ 
userJJ 
;JJ 

tokenCacheLL 
.LL 
SetBeforeAccessLL 
(LL 
thisLL "
.LL" #2
&UserTokenCacheBeforeAccessNotificationLL# I
)LLI J
;LLJ K

tokenCacheMM 
.MM 
SetAfterAccessMM 
(MM 
thisMM !
.MM! "1
%UserTokenCacheAfterAccessNotificationMM" G
)MMG H
;MMH I

tokenCacheNN 
.NN 
SetBeforeWriteNN %
(NN% &
thisNN& *
.NN* +1
%UserTokenCacheBeforeWriteNotificationNN+ P
)NNP Q
;NNQ R
ifPP 
(PP 
thisPP 
.PP 
SignedInUserPP 
==PP 
nullPP  
)PP  !
{QQ 
returnSS 

;SS
 
}TT 
}UU 
internal[[ 

string[[ 
GetMsalAccountId[[ "
([[" #
)[[# $
{\\ 
if]] 
(]] 
this]] 
.]] 
SignedInUser]] 
!=]] 
null]]  
)]]  !
{^^ 
return__ 

this__ 
.__ 
SignedInUser__ 
.__ 
GetB2CMsalAccountId__ 0
(__0 1
)__1 2
;__2 3
}`` 
returnaa 	
nullaa
 
;aa 
}bb 
privategg 	
voidgg
 (
LoadUserTokenCacheFromMemorygg +
(gg+ ,!
ITokenCacheSerializergg, A

tokenCacheggB L
)ggL M
{hh 
stringii 	
cacheKeyii
 
=ii 
thisii 
.ii 
GetMsalAccountIdii *
(ii* +
)ii+ ,
;ii, -
ifkk 
(kk 
stringkk 
.kk 
IsNullOrWhiteSpacekk  
(kk  !
cacheKeykk! )
)kk) *
)kk* +
returnll 

;ll
 
byteoo 
[oo 
]oo 	
tokenCacheBytesoo
 
=oo 
(oo 
byteoo !
[oo! "
]oo" #
)oo# $
thisoo$ (
.oo( )
memoryCacheoo) 4
.oo4 5
Getoo5 8
(oo8 9
thisoo9 =
.oo= >
GetMsalAccountIdoo> N
(ooN O
)ooO P
)ooP Q
;ooQ R

tokenCachepp 
.pp 
DeserializeMsalV3pp (
(pp( )
tokenCacheBytespp) 8
)pp8 9
;pp9 :
}qq 
privatevv 	
voidvv
 !
PersistUserTokenCachevv $
(vv$ %!
ITokenCacheSerializervv% :

tokenCachevv; E
)vvE F
{ww 
stringxx 	
cacheKeyxx
 
=xx 
thisxx 
.xx 
GetMsalAccountIdxx *
(xx* +
)xx+ ,
;xx, -
ifzz 
(zz 
stringzz 
.zz 
IsNullOrWhiteSpacezz  
(zz  !
cacheKeyzz! )
)zz) *
)zz* +
return{{ 

;{{
 
this~~ 
.~~ 
memoryCache~~ 
.~~ 
Set~~ 
(~~ 
this~~ 
.~~ 
GetMsalAccountId~~ -
(~~- .
)~~. /
,~~/ 0

tokenCache~~1 ;
.~~; <
SerializeMsalV3~~< K
(~~K L
)~~L M
,~~M N
this~~O S
.~~S T
cacheDuration~~T a
)~~a b
;~~b c
} 
public
�� 
void
��	 
Clear
�� 
(
�� 
)
�� 
{
�� 
this
�� 
.
�� 
memoryCache
�� 
.
�� 
Remove
�� 
(
�� 
this
�� 
.
��  
GetMsalAccountId
��  0
(
��0 1
)
��1 2
)
��2 3
;
��3 4
}
�� 
private
�� 	
void
��
 3
%UserTokenCacheAfterAccessNotification
�� 4
(
��4 5(
TokenCacheNotificationArgs
��5 O
args
��P T
)
��T U
{
�� 
this
�� 
.
�� 1
#SetSignedInUserFromNotificationArgs
�� +
(
��+ ,
args
��, 0
)
��0 1
;
��1 2
if
�� 
(
�� 
args
�� 
.
�� 
HasStateChanged
�� 
)
�� 
{
�� 
this
�� 
.
�� 	#
PersistUserTokenCache
��	 
(
�� 
args
�� #
.
��# $

TokenCache
��$ .
)
��. /
;
��/ 0
}
�� 
}
�� 
private
�� 	
void
��
 4
&UserTokenCacheBeforeAccessNotification
�� 5
(
��5 6(
TokenCacheNotificationArgs
��6 P
args
��Q U
)
��U V
{
�� 
this
�� 
.
�� *
LoadUserTokenCacheFromMemory
�� $
(
��$ %
args
��% )
.
��) *

TokenCache
��* 4
)
��4 5
;
��5 6
}
�� 
private
�� 	
void
��
 3
%UserTokenCacheBeforeWriteNotification
�� 4
(
��4 5(
TokenCacheNotificationArgs
��5 O
args
��P T
)
��T U
{
�� 
}
�� 
private
�� 	
void
��
 1
#SetSignedInUserFromNotificationArgs
�� 2
(
��2 3(
TokenCacheNotificationArgs
��3 M
args
��N R
)
��R S
{
�� 
if
�� 
(
�� 
this
�� 
.
�� 
SignedInUser
�� 
==
�� 
null
��  
&&
��! #
args
��$ (
.
��( )
Account
��) 0
!=
��1 3
null
��4 8
)
��8 9
{
�� 
this
�� 
.
�� 	
SignedInUser
��	 
=
�� 
args
�� 
.
�� 
Account
�� $
.
��$ %
ToClaimsPrincipal
��% 6
(
��6 7
)
��7 8
;
��8 9
}
�� 
}
�� 
}
�� 
}�� 