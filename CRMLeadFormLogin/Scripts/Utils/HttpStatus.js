const StatusHeep = (() => {
    const GetHttpStatusCodeNumeric = (statusCodeString) => {
        switch (statusCodeString) {
            case "Continue": return 100;
            case "SwitchingProtocols": return 101;
            case "Processing": return 102;
            case "EarlyHints": return 103;
            case "OK": return 200;
            case "Created": return 201;
            case "Accepted": return 202;
            case "Non-AuthoritativeInformation": return 203;
            case "NoContent": return 204;
            case "ResetContent": return 205;
            case "PartialContent": return 206;
            case "Multi-Status": return 207;
            case "AlreadyReported": return 208;
            case "IMUsed": return 226;
            case "MultipleChoices": return 300;
            case "MovedPermanently": return 301;
            case "Found": return 302;
            case "SeeOther": return 303;
            case "NotModified": return 304;
            case "UseProxy": return 305;
            case "(Unused)": return 306;
            case "TemporaryRedirect": return 307;
            case "PermanentRedirect": return 308;
            case "BadRequest": return 400;
            case "Unauthorized": return 401;
            case "PaymentRequired": return 402;
            case "Forbidden": return 403;
            case "NotFound": return 404;
            case "MethodNotAllowed": return 405;
            case "NotAcceptable": return 406;
            case "ProxyAuthenticationRequired": return 407;
            case "RequestTimeout": return 408;
            case "Conflict": return 409;
            case "Gone": return 410;
            case "LengthRequired": return 411;
            case "PreconditionFailed": return 412;
            case "PayloadTooLarge": return 413;
            case "URITooLong": return 414;
            case "UnsupportedMediaType": return 415;
            case "RangeNotSatisfiable": return 416;
            case "ExpectationFailed": return 417;
            case "MisdirectedRequest": return 421;
            case "UnprocessableEntity": return 422;
            case "Locked": return 423;
            case "FailedDependency": return 424;
            case "TooEarly": return 425;
            case "UpgradeRequired": return 426;
            case "PreconditionRequired": return 428;
            case "TooManyRequests": return 429;
            case "RequestHeaderFieldsTooLarge": return 431;
            case "UnavailableForLegalReasons": return 451;
            case "InternalServerError": return 500;
            case "NotImplemented": return 501;
            case "BadGateway": return 502;
            case "ServiceUnavailable": return 503;
            case "GatewayTimeout": return 504;
            case "HTTPVersionNotSupported": return 505;
            case "VariantAlsoNegotiates": return 506;
            case "InsufficientStorage": return 507;
            case "LoopDetected": return 508;
            case "NotExtended": return 510;
            case "NetworkAuthenticationRequired": return 511;
            default: return 0;
        }

    };



    return {
        GetHttpStatusCodeNumeric
    };
})();