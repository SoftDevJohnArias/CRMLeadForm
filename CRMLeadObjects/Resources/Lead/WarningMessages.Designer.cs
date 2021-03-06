//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.42000
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CRMLeadObjects.Resources.Lead {
    using System;
    
    
    /// <summary>
    ///   Clase de recurso fuertemente tipado, para buscar cadenas traducidas, etc.
    /// </summary>
    // StronglyTypedResourceBuilder generó automáticamente esta clase
    // a través de una herramienta como ResGen o Visual Studio.
    // Para agregar o quitar un miembro, edite el archivo .ResX y, a continuación, vuelva a ejecutar ResGen
    // con la opción /str o recompile su proyecto de VS.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class WarningMessages {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal WarningMessages() {
        }
        
        /// <summary>
        ///   Devuelve la instancia de ResourceManager almacenada en caché utilizada por esta clase.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("CRMLeadObjects.Resources.Lead.WarningMessages", typeof(WarningMessages).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Reemplaza la propiedad CurrentUICulture del subproceso actual para todas las
        ///   búsquedas de recursos mediante esta clase de recurso fuertemente tipado.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Debe tener al menos XXXX caracteres.
        /// </summary>
        public static string AtLeastCharacters {
            get {
                return ResourceManager.GetString("AtLeastCharacters", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Este campo es requerido.
        /// </summary>
        public static string FieldRequired {
            get {
                return ResourceManager.GetString("FieldRequired", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a El formato del archivo no es válido. Por favor utiliza archivos en formato Word o PDF..
        /// </summary>
        public static string FormatInvalid {
            get {
                return ResourceManager.GetString("FormatInvalid", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Documento inválido.
        /// </summary>
        public static string InvalidDocument {
            get {
                return ResourceManager.GetString("InvalidDocument", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a El correo electrónico no es válido.
        /// </summary>
        public static string InvalidEmail {
            get {
                return ResourceManager.GetString("InvalidEmail", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Identificación inválida.
        /// </summary>
        public static string InvalidId {
            get {
                return ResourceManager.GetString("InvalidId", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Código postal inválido.
        /// </summary>
        public static string InvalidZipCode {
            get {
                return ResourceManager.GetString("InvalidZipCode", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Si tu identificación NO comienza con dos números, por favor primero escribe un &apos;0&apos;..
        /// </summary>
        public static string MessageIdentification {
            get {
                return ResourceManager.GetString("MessageIdentification", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Debe tener XXXX caracteres.
        /// </summary>
        public static string MustBeCharacters {
            get {
                return ResourceManager.GetString("MustBeCharacters", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Debe iniciar con XXXX.
        /// </summary>
        public static string MustBegin {
            get {
                return ResourceManager.GetString("MustBegin", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Debe iniciar con 9XXXXXXX.
        /// </summary>
        public static string NineNumbers {
            get {
                return ResourceManager.GetString("NineNumbers", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a XXXX no válido.
        /// </summary>
        public static string NoValid {
            get {
                return ResourceManager.GetString("NoValid", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Solo se permiten letras.
        /// </summary>
        public static string OnlyLetters {
            get {
                return ResourceManager.GetString("OnlyLetters", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Solo se permiten letras y números.
        /// </summary>
        public static string OnlyLettersNumbers {
            get {
                return ResourceManager.GetString("OnlyLettersNumbers", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Busca una cadena traducida similar a Solo se permiten números.
        /// </summary>
        public static string OnlyNumbers {
            get {
                return ResourceManager.GetString("OnlyNumbers", resourceCulture);
            }
        }
    }
}
