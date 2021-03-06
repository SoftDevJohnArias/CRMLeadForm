var FormValidate = function (i) {
  var r = {};

  function s(e) {
    if (r[e]) return r[e].exports;
    var t = r[e] = {
      i: e,
      l: !1,
      exports: {}
    };
    return i[e].call(t.exports, t, t.exports, s), t.l = !0, t.exports
  }
  return s.m = i, s.c = r, s.d = function (e, t, i) {
    s.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: i
    })
  }, s.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, s.t = function (t, e) {
    if (1 & e && (t = s(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var i = Object.create(null);
    if (s.r(i), Object.defineProperty(i, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t)
      for (var r in t) s.d(i, r, function (e) {
        return t[e]
      }.bind(null, r));
    return i
  }, s.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return s.d(t, "a", t), t
  }, s.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, s.p = "/dist/", s(s.s = 0)
}([function (e, t, i) {
  "use strict";
  var r = i(1).default;
  e.exports = r
}, function (e, t, i) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function () {
    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
    }
    return function (e, t, i) {
      return t && r(e.prototype, t), i && r(e, i), e
    }
  }();
  var s = function () {
    function h(e) {
      var t = e.formSelector,
        i = e.inputGroupClass,
        r = void 0 === i ? "form-group" : i,
        s = e.validClass,
        a = void 0 === s ? "valid" : s,
        d = e.invalidClass,
        l = void 0 === d ? "invalid" : d,
        n = e.msgClass,
        u = void 0 === n ? "input-msg" : n;
      if (function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, h), !(t instanceof window.Element)) throw new TypeError("formSelector should a valid selector");
      this.form = t, this.inputGroupClass = r, this.validClass = a, this.invalidClass = l, this.msgClass = u, this.regexEmail = /^[a-zA-Z0-9][a-zA-Z0-9._-]+@([a-zA-Z0-9._-]+\.)[a-zA-Z-0-9]{2,3}$/, this.regexPhone = /^(?:\()?(1[1-9]|2[12478]|3[1234578]|4[1-9]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])(?:\))?(?:\s)?(9)?(\d{4})(?:-)?(\d{4})$/, this.regexCPF = /^(\d{3})(\.)?(\d{3})(\.)?(\d{3})(-)?(\d{2})$/, this.regexRG = /^(\d{2})(\.)?(\d{3})(\.)?(\d{3})(-)?(\d{1})$/, this.regexCEP = /^(\d{5})(-)?(\d{3})$/, this.regexUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/, this.regexInitialWhiteSpace = /^(\s+)/, this.regexLastWhiteSpace = /(\s+)$/, this.addError = this.addError.bind(this), this.addSuccess = this.addSuccess.bind(this), this.validation = this.validation.bind(this), this.trigger = this.trigger.bind(this), this.checkValidFields = this.checkValidFields.bind(this), this.reset = this.reset.bind(this), this.submit = this.submit.bind(this), this.getValues = this.getValues.bind(this), this.init = this.init.bind(this)
    }
    return r(h, [{
      key: "addError",
      value: function (e, DoNotValidate = false) {
        if (!DoNotValidate) {
          e.classList.remove(this.validClass), e.classList.add(this.invalidClass);
          var t = document.createElement("span");
          t.classList.add(this.msgClass), t.innerText = validationMessages.getMessageWarning(e, t);
          var i = e.closest("." + this.inputGroupClass);
          i.querySelector("." + this.msgClass) || i.appendChild(t)
        }
      }
    }, {
      key: "addSuccess",
        value: function (e, isError=false) {
          if (!isError) {
            e.classList.remove(this.invalidClass), e.classList.add(this.validClass);
            var t = e.closest(".form-group") || e.parentNode,
              i = t.querySelector("." + this.msgClass);
            i && t.removeChild(i)
          }
       
      }
    }, {
      key: "cpfIsValid",
      value: function (e) {
        var t = void 0,
          i = void 0,
          r = void 0,
          s = void 0,
          a = void 0;
        if (a = 1, (e = e.replace(/[.-]/g, "")).length < 11) return !1;
        for (s = 0; s < e.length - 1; s++)
          if (e.charAt(s) !== e.charAt(s + 1)) {
            a = 0;
            break
          } if (a) return !1;
        for (t = e.substring(0, 9), i = e.substring(9), r = 0, s = 10; 1 < s; s--) r += t.charAt(10 - s) * s;
        if ((r % 11 < 2 ? 0 : 11 - r % 11) !== parseInt(i.charAt(0))) return !1;
        for (t = e.substring(0, 10), r = 0, s = 11; 1 < s; s--) r += t.charAt(11 - s) * s;
        return (r % 11 < 2 ? 0 : 11 - r % 11) === parseInt(i.charAt(1))
      }
    }, {
      key: "validation",
      value: function (e) {
        var t = e.target || e,
          i = t.getAttribute("data-validate-regex"),
          r = !!i && new RegExp(i);
        if ("email" === t.getAttribute("data-validate-rule")) return this.regexEmail.test(t.value) ? (this.addSuccess(t), this.checkValidFields(e), !0) : (this.addError(t), this.checkValidFields(e), !1);
        if ("phone" === t.getAttribute("data-validate-rule")) return this.regexPhone.test(t.value) ? (this.addSuccess(t), this.checkValidFields(e), !0) : (this.addError(t), this.checkValidFields(e), !1);
        if ("cpf" === t.getAttribute("data-validate-rule")) return t.setAttribute("maxlength", 14), this.regexCPF.test(t.value) && this.cpfIsValid(t.value) ? (this.addSuccess(t), this.checkValidFields(e), !0) : (this.addError(t), this.checkValidFields(e), !1);
        if ("rg" === t.getAttribute("data-validate-rule")) return t.setAttribute("maxlength", 12), this.regexRG.test(t.value) ? (this.addSuccess(t), this.checkValidFields(e), !0) : (this.addError(t), this.checkValidFields(e), !1);
        if ("cep" === t.getAttribute("data-validate-rule")) return t.setAttribute("maxlength", 9), this.regexCEP.test(t.value) ? (this.addSuccess(t), this.checkValidFields(e), !0) : (this.addError(t), this.checkValidFields(e), !1);
        if ("url" === t.getAttribute("data-validate-rule")) return this.regexUrl.test(t.value) ? (this.addSuccess(t), this.checkValidFields(e), !0) : (this.addError(t), this.checkValidFields(e), !1);
        if ("radio" !== t.type && "checkbox" !== t.type) return r ? r.test(t.value) ? (this.addSuccess(t, e.currentTarget.getAttribute("IsError") === "true"), this.checkValidFields(e), !0) : (this.addError(t, e.currentTarget.getAttribute("DoNotValidate") === "true"), this.checkValidFields(e), !1) : 0 === t.value.length || this.regexInitialWhiteSpace.test(t.value) || this.regexLastWhiteSpace.test(t.value) ? (this.addError(t), this.checkValidFields(e), !1) : (this.addSuccess(t), this.checkValidFields(e), !0);
        var s = t.parentNode.parentNode;
        return (t = s.querySelector("[type=radio]:checked") || s.querySelector("[type=checkbox]:checked")) ? (this.addSuccess(s), this.checkValidFields(e), !0) : (this.addError(s), this.checkValidFields(e), !1)
      }
    }, {
      key: "trigger",
      value: function () {
        var e = void 0,
          t = this.form.querySelectorAll("input"),
          i = new window.Event("change", {
            bubbles: !0
          });
        for (e = 0; e < t.length; e++) t[e].dispatchEvent(i);
        return !0
      }
    }, {
      key: "checkValidFields",
      value: function () {
        var e = this.form.querySelectorAll("[data-required]"),
          t = this.form.querySelectorAll("[data-required]." + this.validClass);
        return e.length === t.length
      }
    }, {
      key: "reset",
      value: function () {
        var e = void 0,
          t = this.form.querySelectorAll("[data-required]");
        for (e = 0; e < t.length; e++) t[e].classList.remove(this.validClass);
        this.form.reset()
      }
    }, {
      key: "submit",
      value: function () {
        if (this.checkValidFields()) return !0;
        var e = void 0,
          t = void 0,
          i = document.querySelectorAll("[data-required]:not(." + this.validClass + ")");
        for (e = 0; e < i.length; e++) t = i[e], this.addError(t);
        return i[0].focus(), !1
      }
    }, {
      key: "getValues",
      value: function () {
        var e = void 0,
          t = void 0,
          i = {},
          r = this.form.elements;
        for (e = 0; e < r.length; e++)
          if ("radio" !== (t = r[e]).type && "checkbox" !== t.type && "submit" !== t.type && (i[t.name] = t.value), "radio" === t.type || "checkbox" === t.type) {
            var s = t.closest("." + this.inputGroupClass),
              a = s.querySelector("[type=radio]:checked") || s.querySelector("[type=checkbox]:checked");
            a ? i[a.name] = "true" === a.value ? !!a.value : a.value : i[t.name] = null
          } return i
      }
    }, {
      key: "init",
      value: function () {
        var t = this,
          e = void 0,
          i = void 0,
          r = this.form.querySelectorAll("[data-required]");
        for (e = 0; e < r.length; e++)(i = r[e]).addEventListener("keyup", this.validation), i.addEventListener("input", this.validation), i.addEventListener("change", this.validation);
        var s = this.form.querySelectorAll("[type=radio]");
        for (e = 0; e < s.length; e++) s[e].addEventListener("change", this.validation);
        var a = this.form.querySelectorAll("[type=checkbox]");
        for (e = 0; e < a.length; e++) a[e].addEventListener("change", this.validation);
        return this.form.addEventListener("submit", function (e) {
          e.preventDefault(), t.submit()
        }), !0
      }
    }]), h
  }();
  t.default = s
}]);