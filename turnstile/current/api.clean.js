"use strict";

(function () {
  function Ht(e, t, a, o, c, l, v) {
    try {
      var h = e[l](v);
      var s = h.value;
    } catch (p) {
      a(p);
      return;
    }
    if (h.done) {
      t(s);
    } else {
      Promise.resolve(s).then(o, c);
    }
  }
  function qt(e) {
    return function () {
      var t = this;
      var a = arguments;
      return new Promise(function (o, c) {
        var l = e.apply(t, a);
        function v(s) {
          Ht(l, o, c, v, h, "next", s);
        }
        function h(s) {
          Ht(l, o, c, v, h, "throw", s);
        }
        v(undefined);
      });
    };
  }
  function V(e, t) {
    if (t != null && typeof Symbol != "undefined" && t[Symbol.hasInstance]) {
      return !!t[Symbol.hasInstance](e);
    } else {
      return V(e, t);
    }
  }
  function De(e, t, a) {
    if (t in e) {
      Object.defineProperty(e, t, {
        value: a,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      e[t] = a;
    }
    return e;
  }
  function Ve(e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t] ?? {};
      var o = Object.keys(a);
      if (typeof Object.getOwnPropertySymbols == "function") {
        o = o.concat(Object.getOwnPropertySymbols(a).filter(function (c) {
          return Object.getOwnPropertyDescriptor(a, c).enumerable;
        }));
      }
      o.forEach(function (c) {
        De(e, c, a[c]);
      });
    }
    return e;
  }
  function Ir(e, t) {
    var a = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      if (t) {
        o = o.filter(function (c) {
          return Object.getOwnPropertyDescriptor(e, c).enumerable;
        });
      }
      a.push.apply(a, o);
    }
    return a;
  }
  function it(e, t) {
    t = t ?? {};
    if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(e, Object.getOwnPropertyDescriptors(t));
    } else {
      Ir(Object(t)).forEach(function (a) {
        Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(t, a));
      });
    }
    return e;
  }
  function zt(e) {
    if (Array.isArray(e)) {
      return e;
    }
  }
  function Bt(e, t) {
    var a = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (a != null) {
      var o = [];
      var c = true;
      var l = false;
      var v;
      var h;
      try {
        for (a = a.call(e); !(c = (v = a.next()).done) && (o.push(v.value), !t || o.length !== t); c = true);
      } catch (s) {
        l = true;
        h = s;
      } finally {
        try {
          if (!c && a.return != null) {
            a.return();
          }
        } finally {
          if (l) {
            throw h;
          }
        }
      }
      return o;
    }
  }
  function Gt() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ot(e, t) {
    if (t == null || t > e.length) {
      t = e.length;
    }
    for (var a = 0, o = new Array(t); a < t; a++) {
      o[a] = e[a];
    }
    return o;
  }
  function Xt(e, t) {
    if (e) {
      if (typeof e == "string") {
        return ot(e, t);
      }
      var a = Object.prototype.toString.call(e).slice(8, -1);
      if (a === "Object" && e.constructor) {
        a = e.constructor.name;
      }
      if (a === "Map" || a === "Set") {
        return Array.from(a);
      }
      if (a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)) {
        return ot(e, t);
      }
    }
  }
  function Ie(e, t) {
    return zt(e) || Bt(e, t) || Xt(e, t) || Gt();
  }
  function F(e) {
    "@swc/helpers - typeof";

    if (e && typeof Symbol != "undefined" && e.constructor === Symbol) {
      return "symbol";
    } else {
      return typeof e;
    }
  }
  function Pe(e, t) {
    var a = {
      label: 0,
      sent: function () {
        if (l[0] & 1) {
          throw l[1];
        }
        return l[1];
      },
      trys: [],
      ops: []
    };
    var o;
    var c;
    var l;
    var v;
    v = {
      next: h(0),
      throw: h(1),
      return: h(2)
    };
    if (typeof Symbol == "function") {
      v[Symbol.iterator] = function () {
        return this;
      };
    }
    return v;
    function h(p) {
      return function (_) {
        return s([p, _]);
      };
    }
    function s(p) {
      if (o) {
        throw new TypeError("Generator is already executing.");
      }
      while (v && (v = 0, p[0] && (a = 0)), a) {
        try {
          o = 1;
          if (c && (l = p[0] & 2 ? c.return : p[0] ? c.throw || ((l = c.return) && l.call(c), 0) : c.next) && !(l = l.call(c, p[1])).done) {
            return l;
          }
          c = 0;
          if (l) {
            p = [p[0] & 2, l.value];
          }
          switch (p[0]) {
            case 0:
            case 1:
              l = p;
              break;
            case 4:
              a.label++;
              return {
                value: p[1],
                done: false
              };
            case 5:
              a.label++;
              c = p[1];
              p = [0];
              continue;
            case 7:
              p = a.ops.pop();
              a.trys.pop();
              continue;
            default:
              l = a.trys;
              if (!(l = l.length > 0 && l[l.length - 1]) && (p[0] === 6 || p[0] === 2)) {
                a = 0;
                continue;
              }
              if (p[0] === 3 && (!l || p[1] > l[0] && p[1] < l[3])) {
                a.label = p[1];
                break;
              }
              if (p[0] === 6 && a.label < l[1]) {
                a.label = l[1];
                l = p;
                break;
              }
              if (l && a.label < l[2]) {
                a.label = l[2];
                a.ops.push(p);
                break;
              }
              if (l[2]) {
                a.ops.pop();
              }
              a.trys.pop();
              continue;
          }
          p = t.call(e, a);
        } catch (_) {
          p = [6, _];
          c = 0;
        } finally {
          o = l = 0;
        }
      }
      if (p[0] & 5) {
        throw p[1];
      }
      return {
        value: p[0] ? p[1] : undefined,
        done: true
      };
    }
  }
  var Yt = {
    code: 200500,
    internalRepr: "iframe_load_err",
    public: true,
    retryable: false,
    description: "Turnstile's api.js was loaded, but the iframe under challenges.cloudflare.com could not be loaded. Has the visitor blocked some parts of challenges.cloudflare.com or are they self-hosting api.js?"
  };
  var Qt = 300020;
  var We = 300030;
  var Ue = 300031;
  var q;
  (function (e) {
    e.Managed = "managed";
    e.NonInteractive = "non-interactive";
    e.Invisible = "invisible";
  })(q ||= {});
  var M;
  (function (e) {
    e.Normal = "normal";
    e.Compact = "compact";
    e.Invisible = "invisible";
    e.Flexible = "flexible";
  })(M ||= {});
  var je;
  (function (e) {
    e.Auto = "auto";
    e.Light = "light";
    e.Dark = "dark";
  })(je ||= {});
  var Ce;
  (function (e) {
    e.Verifying = "verifying";
    e.VerifyingHavingTroubles = "verifying-having-troubles";
    e.VerifyingOverrun = "verifying-overrun";
    e.FailureWoHavingTroubles = "failure-wo-having-troubles";
    e.FailureHavingTroubles = "failure-having-troubles";
    e.FailureFeedback = "failure-feedback";
    e.FailureFeedbackCode = "failure-feedback-code";
    e.ExpiredNeverRefresh = "expired-never-refresh";
    e.ExpiredManualRefresh = "expired-manual-refresh";
    e.TimeoutNeverRefresh = "timeout-never-refresh";
    e.TimeoutManualRefresh = "timeout-manual-refresh";
    e.InteractivityRequired = "interactivity-required";
    e.UnsupportedBrowser = "unsupported-browser";
    e.TimeCheckCachedWarning = "time-check-cached-warning";
    e.InvalidDomain = "invalid-domain";
  })(Ce ||= {});
  var ve;
  (function (e) {
    e.Never = "never";
    e.Auto = "auto";
  })(ve ||= {});
  var ee;
  (function (e) {
    e.Never = "never";
    e.Manual = "manual";
    e.Auto = "auto";
  })(ee ||= {});
  var ce;
  (function (e) {
    e.Never = "never";
    e.Manual = "manual";
    e.Auto = "auto";
  })(ce ||= {});
  var Q;
  (function (e) {
    e.Always = "always";
    e.Execute = "execute";
    e.InteractionOnly = "interaction-only";
  })(Q ||= {});
  var me;
  (function (e) {
    e.Render = "render";
    e.Execute = "execute";
  })(me ||= {});
  var ue;
  (function (e) {
    e.Execute = "execute";
  })(ue ||= {});
  var z;
  (function (e) {
    e.New = "new";
    e.CrashedRetry = "crashed_retry";
    e.FailureRetry = "failure_retry";
    e.StaleExecute = "stale_execute";
    e.AutoExpire = "auto_expire";
    e.AutoTimeout = "auto_timeout";
    e.ManualRefresh = "manual_refresh";
    e.Api = "api";
    e.CheckDelays = "check_delays";
    e.TimeCheckCachedWarningAux = "time_check_cached_warning_aux";
    e.JsCookiesMissingAux = "js_cookies_missing_aux";
    e.RedirectingTextOverrun = "redirecting_text_overrun";
  })(z ||= {});
  var He;
  (function (e) {
    e.Failure = "failure";
    e.Verifying = "verifying";
    e.Overruning = "overrunning";
    e.Custom = "custom";
  })(He ||= {});
  function L(e, t) {
    return e.indexOf(t) !== -1;
  }
  function ct(e) {
    return L(["auto", "dark", "light"], e);
  }
  function ut(e) {
    return L(["auto", "never"], e);
  }
  function lt(e) {
    return e > 0 && e < 900000;
  }
  function st(e) {
    return e > 0 && e < 360000;
  }
  var Cr = /^[0-9A-Za-z_-]{3,100}$/;
  function Kt(e) {
    return Cr.test(e);
  }
  var Or = /^[a-z0-9_-]{0,32}$/i;
  function dt(e) {
    if (e === undefined) {
      return true;
    } else {
      return typeof e == "string" && Or.test(e);
    }
  }
  var kr = /^[a-z0-9_\-=]{0,255}$/i;
  function ft(e) {
    if (e === undefined) {
      return true;
    } else {
      return typeof e == "string" && kr.test(e);
    }
  }
  function pt(e) {
    return L([M.Normal, M.Compact, M.Invisible, M.Flexible], e);
  }
  function vt(e) {
    return L(["auto", "manual", "never"], e);
  }
  function mt(e) {
    return L(["auto", "manual", "never"], e);
  }
  var Nr = /^[a-z]{2,3}([-_][a-z]{2})?$/i;
  function gt(e) {
    return e === "auto" || Nr.test(e);
  }
  function yt(e) {
    return L(["always", "execute", "interaction-only"], e);
  }
  function $t(e) {
    return L(["true", "false"], e);
  }
  function ht(e) {
    return L(["render", "execute"], e);
  }
  var Jt = 300;
  var Zt = 10;
  function _t(e) {
    var t = new URLSearchParams();
    if (e.params._debugSitekeyOverrides) {
      if (e.params._debugSitekeyOverrides.offlabel !== "default") {
        t.set("offlabel", e.params._debugSitekeyOverrides.offlabel);
      }
      if (e.params._debugSitekeyOverrides.clearanceLevel !== "default") {
        t.set("clearance_level", e.params._debugSitekeyOverrides.clearanceLevel);
      }
    }
    if (window.__cfDebugTurnstileOutcome) {
      t.set("__cfDebugTurnstileOutcome", String(window.__cfDebugTurnstileOutcome));
    }
    if (t.size !== 0) {
      return t.toString();
    }
  }
  var qe = "cf-chl-widget-";
  var P = "cloudflare-challenge";
  var er = ".cf-turnstile";
  var tr = ".cf-challenge";
  var rr = ".g-recaptcha";
  var bt = "cf_challenge_response";
  var xt = "cf-turnstile-response";
  var wt = "g-recaptcha-response";
  var ar = 8000;
  var Et = "private-token";
  var nr = 3;
  var ir = 500;
  var or = 500;
  var K = "";
  var Mr = ["bg-bg", "da-dk", "de-de", "el-gr", "ja-jp", "ms-my", "ru-ru", "sk-sk", "sl-si", "sr-ba", "tl-ph", "uk-ua"];
  var Lr = ["ar-eg", "es-es", "cs-cz", "fa-ir", "fr-fr", "hr-hr", "hu-hu", "id-id", "it-it", "lt-lt", "nb-no", "nl-nl", "pl-pl", "pt-br", "th-th", "tr-tr", "ro-ro"];
  function Tt(e, t) {
    var a = "https://challenges.cloudflare.com";
    if (t) {
      a = e["base-url"] ?? a;
    }
    return a;
  }
  function Rt(e, t, a, o, c, l, v, h) {
    var s = Tt(a, c);
    var p = l ? `h/${l}/` : "";
    var _ = h ? `?${h}` : "";
    var A = a["feedback-enabled"] === false ? "fbD" : "fbE";
    return `${s}/cdn-cgi/challenge-platform/${p}turnstile/if/ov2/av0/rcv${o}/${e}/${t}/${a.theme}/${A}/${v}/${a.size}/${a.language}/${_}`;
  }
  function St(e) {
    var t;
    var a;
    var o = window.innerWidth < 400;
    var c = e.state === Ce.FailureFeedback || e.state === Ce.FailureHavingTroubles;
    var v = L(Mr, ((t = e.displayLanguage) === null || t === undefined ? undefined : t.toLowerCase()) ?? "nonexistent");
    var s = L(Lr, ((a = e.displayLanguage) === null || a === undefined ? undefined : a.toLowerCase()) ?? "nonexistent");
    if (o) {
      return Fr({
        isModeratelyVerbose: s,
        isVerboseLanguage: v,
        isSmallerFeedback: c
      });
    } else if (c && v) {
      return "630px";
    } else if (c && s) {
      return "620px";
    } else if (c) {
      return "600px";
    } else if (v) {
      return "690px";
    } else {
      return "680px";
    }
  }
  function Fr(e) {
    var t = e.isVerboseLanguage;
    var a = e.isSmallerFeedback;
    var o = e.isModeratelyVerbose;
    if (a && t) {
      return "540px";
    } else if (a && o) {
      return "500px";
    } else if (a) {
      return "480px";
    } else if (t) {
      return "650px";
    } else if (o) {
      return "590px";
    } else {
      return "570px";
    }
  }
  function ze(e) {
    if (e === undefined) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return e;
  }
  function cr(e, t) {
    if (!V(e, t)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function te(e, t) {
    te = Object.setPrototypeOf || function (o, c) {
      o.__proto__ = c;
      return o;
    };
    return te(e, t);
  }
  function ur(e, t) {
    if (typeof t != "function" && t !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        writable: true,
        configurable: true
      }
    });
    if (t) {
      te(e, t);
    }
  }
  function Be() {
    if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) {
      return false;
    }
    if (typeof Proxy == "function") {
      return true;
    }
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function Oe(e, t, a) {
    if (Be()) {
      Oe = Reflect.construct;
    } else {
      Oe = function (c, l, v) {
        var h = [null];
        h.push.apply(h, l);
        var s = Function.bind.apply(c, h);
        var p = new s();
        if (v) {
          te(p, v.prototype);
        }
        return p;
      };
    }
    return Oe.apply(null, arguments);
  }
  function le(e) {
    le = Object.setPrototypeOf ? Object.getPrototypeOf : function (a) {
      return a.__proto__ || Object.getPrototypeOf(a);
    };
    return le(e);
  }
  function lr(e) {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  }
  function Ge(e) {
    var t = typeof Map == "function" ? new Map() : undefined;
    Ge = function (o) {
      if (o === null || !lr(o)) {
        return o;
      }
      if (typeof o != "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof t != "undefined") {
        if (t.has(o)) {
          return t.get(o);
        }
        t.set(o, c);
      }
      function c() {
        return Oe(o, arguments, le(this).constructor);
      }
      c.prototype = Object.create(o.prototype, {
        constructor: {
          value: c,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return te(c, o);
    };
    return Ge(e);
  }
  function sr(e, t) {
    if (t && (F(t) === "object" || typeof t == "function")) {
      return t;
    } else {
      return ze(e);
    }
  }
  function dr(e) {
    var t = Be();
    return function () {
      var o = le(e);
      var c;
      if (t) {
        var l = le(this).constructor;
        c = Reflect.construct(o, arguments, l);
      } else {
        c = o.apply(this, arguments);
      }
      return sr(this, c);
    };
  }
  var fr = function (e) {
    "use strict";

    ur(a, e);
    var t = dr(a);
    function a(o, c) {
      cr(this, a);
      var l;
      l = t.call(this, o);
      De(ze(l), "code", undefined);
      l.name = "TurnstileError";
      l.code = c;
      return l;
    }
    return a;
  }(Ge(Error));
  function g(e, t) {
    var a = `[Cloudflare Turnstile] ${e}.`;
    throw new fr(a, t);
  }
  function x(e) {
    console.warn(`[Cloudflare Turnstile] ${e}`);
  }
  function Xe(e) {
    if (e.startsWith(qe)) {
      return e.substring(qe.length);
    } else {
      return null;
    }
  }
  function $(e) {
    return `${qe}${e}`;
  }
  function At() {
    var e = /\/turnstile\/v0(\/.*)?\/api\.js/;
    var t = document.currentScript;
    if (V(t, HTMLScriptElement) && e.test(t.src)) {
      return t;
    }
    for (var a = document.querySelectorAll("script"), o = 0, c; c = a[o]; o++) {
      if (V(c, HTMLScriptElement) && e.test(c.src)) {
        return c;
      }
    }
  }
  function pr() {
    var e = At();
    if (!e) {
      g("Could not find Turnstile script tag, some features may not be available", 43777);
    }
    var t = e.src;
    var a = {
      loadedAsync: false,
      params: new URLSearchParams(),
      src: t
    };
    if (e.async || e.defer) {
      a.loadedAsync = true;
    }
    var o = t.split("?");
    if (o.length > 1) {
      a.params = new URLSearchParams(o[1]);
    }
    return a;
  }
  function W() {
    if (typeof performance != "undefined" && performance.now) {
      return performance.now();
    } else {
      return Date.now();
    }
  }
  function It(e, t, a) {
    var o = Tt(t.params, false);
    var c = `h/g/`;
    var l;
    var h = `${o}/cdn-cgi/challenge-platform/${c}feedback-reports/${Xe(e)}/${t.displayLanguage}/${t.params.theme ?? t.theme}/${a}`;
    if (!t.wrapper.parentNode) {
      g(`Cannot initialize Widget, Element not found (#${e}).`, 3074);
    }
    var s = document.createElement("div");
    s.style.position = "fixed";
    s.style.zIndex = "2147483646";
    s.style.width = "100vw";
    s.style.height = "100vh";
    s.style.top = "0";
    s.style.left = "0";
    s.style.transformOrigin = "center center";
    s.style.overflowX = "hidden";
    s.style.overflowY = "auto";
    s.style.background = "rgba(0,0,0,0.4)";
    var p = document.createElement("div");
    p.style.display = "table-cell";
    p.style.verticalAlign = "middle";
    p.style.width = "100vw";
    p.style.height = "100vh";
    var _ = document.createElement("div");
    _.className = "cf-turnstile-feedback";
    _.id = "cf-fr-id";
    _.style.width = "100vw";
    _.style.maxWidth = "450px";
    _.style.height = St(t);
    _.style.position = "relative";
    _.style.zIndex = "2147483647";
    _.style.backgroundColor = "#ffffff";
    _.style.borderRadius = "5px";
    _.style.left = "0px";
    _.style.top = "0px";
    _.style.overflow = "hidden";
    _.style.margin = "0px auto";
    var A = document.createElement("iframe");
    A.id = `${e}-fr`;
    A.setAttribute("src", h);
    A.setAttribute("allow", "cross-origin-isolated; fullscreen");
    A.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms");
    A.setAttribute("scrolling", "no");
    A.style.borderWidth = "0px";
    A.style.width = "100%";
    A.style.height = "100%";
    A.style.overflow = "hidden";
    var T = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    T.setAttribute("tabindex", "0");
    T.setAttribute("role", "img");
    T.setAttribute("aria-label", "Close button icon");
    T.style.position = "absolute";
    T.style.width = "26px";
    T.style.height = "26px";
    T.style.zIndex = "2147483647";
    T.style.cursor = "pointer";
    if (t.displayRtl) {
      T.style.left = "2px";
    } else {
      T.style.right = "6px";
    }
    T.style.top = "5px";
    T.setAttribute("width", "20");
    T.setAttribute("height", "20");
    T.addEventListener("click", function () {
      var R;
      if ((R = s.parentNode) !== null && R !== undefined) {
        R.removeChild(s);
      }
    });
    T.addEventListener("keydown", function (R) {
      if (R.key === "Enter" || R.key === " ") {
        var G;
        if ((G = s.parentNode) !== null && G !== undefined) {
          G.removeChild(s);
        }
      }
    });
    var k = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    k.setAttribute("ry", "12");
    k.setAttribute("rx", "12");
    k.setAttribute("cy", "12");
    k.setAttribute("cx", "12");
    k.setAttribute("fill", "none");
    k.setAttribute("stroke-width", "0");
    T.appendChild(k);
    var O = document.createElementNS("http://www.w3.org/2000/svg", "line");
    O.setAttribute("stroke-width", "1");
    O.setAttribute("stroke", "#999");
    O.setAttribute("fill", "none");
    O.setAttribute("x1", "6");
    O.setAttribute("x2", "18");
    O.setAttribute("y1", "18");
    O.setAttribute("y2", "5");
    T.appendChild(O);
    var N = document.createElementNS("http://www.w3.org/2000/svg", "line");
    N.setAttribute("stroke-width", "1");
    N.setAttribute("stroke", "#999");
    N.setAttribute("fill", "none");
    N.setAttribute("x1", "6");
    N.setAttribute("x2", "18");
    N.setAttribute("y1", "5");
    N.setAttribute("y2", "18");
    T.appendChild(N);
    _.appendChild(A);
    _.appendChild(T);
    p.appendChild(_);
    s.appendChild(p);
    s.addEventListener("click", function () {
      var R;
      if ((R = s.parentNode) !== null && R !== undefined) {
        R.removeChild(s);
      }
    });
    t.wrapper.parentNode.appendChild(s);
    window.addEventListener("resize", function () {
      _.style.height = St(t);
    });
  }
  function vr(e) {
    var t;
    var a;
    var o;
    if ((o = document.getElementById(e)) !== null && o !== undefined && (a = o.parentElement) !== null && a !== undefined && (t = a.parentElement) !== null && t !== undefined) {
      t.remove();
    }
  }
  function Ct(e, t = 3) {
    if (e.length > t) {
      return e.substring(0, t);
    } else {
      return e;
    }
  }
  function mr(e) {
    if (!e) {
      return "-";
    }
    function t(a, o) {
      if (!a || a.tagName === "BODY") {
        return o;
      }
      var c = 1;
      for (var l = a.previousElementSibling; l;) {
        if (l.tagName === a.tagName) {
          c++;
        }
        l = l.previousElementSibling;
      }
      var v = Ct(a.tagName.toLowerCase());
      var h = `${v}[${c}]`;
      return t(a.parentNode, `/${h}${o}`);
    }
    return t(e, "");
  }
  function gr(e, t, a) {
    for (var o = "", c = 0, l = document.createNodeIterator(e, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
        acceptNode: function (A) {
          if (c > t || o.length > a) {
            return NodeFilter.FILTER_REJECT;
          } else {
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      }), v; (v = l.nextNode()) !== null && o.length < a;) {
      if (v.nodeType === Node.ELEMENT_NODE) {
        var h = v;
        o += `${Ct(h.tagName.toLowerCase())}`;
        for (var s = 0; s < h.attributes.length; s++) {
          var p = h.attributes[s];
          o += `_${Ct(p.name, 2)}`;
        }
        o += ">";
      } else if (v.nodeType === Node.TEXT_NODE) {
        o += "-t";
      }
      var _ = v.parentNode;
      for (c = 0; _ !== e && _ !== null;) {
        c++;
        _ = _.parentNode;
      }
    }
    return o.substring(0, a);
  }
  function yr(e) {
    if (typeof e != "string") {
      throw new Error(`djb2: expected string, got ${typeof e == "undefined" ? "undefined" : F(e)}`);
    }
    var t = 5381;
    for (var a = 0; a < e.length; a++) {
      var o = e.charCodeAt(a);
      t = t * 33 ^ o;
    }
    return t >>> 0;
  }
  function hr(e, t) {
    var a;
    t.upgradeAttempts++;
    var o = At();
    if (!!o && !!o.parentNode) {
      var c = o == null ? undefined : o.nonce;
      e._pState = t;
      var l = new URL(o.src);
      var v = document.createElement("script");
      l.searchParams.set("_upgrade", "true");
      l.searchParams.set("_cb", String(Date.now()));
      v.async = true;
      if (c) {
        v.nonce = c;
      }
      v.setAttribute("crossorigin", "anonymous");
      v.src = l.toString();
      if (o != null && (a = o.parentNode) !== null && a !== undefined) {
        a.replaceChild(v, o);
      }
    }
  }
  function _r(e, t) {
    var a = e._pState;
    if (a) {
      t.isReady = a.isReady;
      t.isRecaptchaCompatibilityMode = a.isRecaptchaCompatibilityMode;
      t.lastWidgetIdx = a.lastWidgetIdx;
      t.scriptWasLoadedAsync = a.scriptWasLoadedAsync;
      t.upgradeAttempts = a.upgradeAttempts;
      t.upgradeCompletedCount = a.upgradeCompletedCount + 1;
      t.turnstileLoadInitTimeMs = W();
      t.watchCatInterval = null;
      t.watchCatSeq = a.watchCatSeq;
      t.widgetMap = a.widgetMap;
      return true;
    } else {
      return false;
    }
  }
  var Dr = 900;
  var Vr = 10;
  var Pr = 50;
  function Wr(e) {
    e.watchCatSeq++;
    var t = true;
    var a = false;
    var o = undefined;
    try {
      for (var c = e.widgetMap[Symbol.iterator](), l; !(t = (l = c.next()).done); t = true) {
        var v = Ie(l.value, 2);
        var h = v[0];
        var s = v[1];
        var p;
        s.watchcat.seq = e.watchCatSeq;
        if (s.watchcat.lastAckedSeq === 0) {
          s.watchcat.lastAckedSeq = e.watchCatSeq;
        }
        var _ = $(h);
        if (!_ || !s.shadow) {
          if (!s.watchcat.missingWidgetWarning) {
            x(`Cannot find Widget ${_}, consider using turnstile.remove() to clean up a widget.`);
            s.watchcat.missingWidgetWarning = true;
          }
          continue;
        }
        var A = s.shadow.querySelector(`#${_}`);
        if (!A) {
          if (!s.watchcat.missingWidgetWarning) {
            x(`Cannot find Widget ${_}, consider using turnstile.remove() to clean up a widget.`);
            s.watchcat.missingWidgetWarning = true;
          }
          continue;
        }
        if (!s.isComplete && !s.isFailed) {
          var T = s.watchcat.seq - 1 - Vr;
          var k = s.watchcat.lastAckedSeq < T;
          var O = s.watchcat.seq - 1 - Pr;
          var N = s.isOverrunning && s.watchcat.overrunBeginSeq < O;
          if ((s.isExecuting || !s.isInitialized || s.isInitialized && !s.isStale && !s.isExecuted) && s.watchcat.lastAckedSeq !== 0 && k || N) {
            var R;
            s.watchcat.lastAckedSeq = 0;
            s.watchcat.seq = 0;
            s.isExecuting = false;
            function G(r, u) {
              console.log(`Turnstile Widget seem to have ${r}: `, u);
            }
            G(k ? "hung" : "crashed", h);
            var b = k ? We : Ue;
            var n;
            if ((R = e.msgHandler) !== null && R !== undefined) {
              R.call(e, {
                data: {
                  source: P,
                  widgetId: h,
                  code: b,
                  event: "fail",
                  rcV: (n = s.nextRcV) !== null && n !== undefined ? n : K
                }
              });
            }
            if (0) {
              var i;
            }
            continue;
          }
          if ((p = A.contentWindow) !== null && p !== undefined) {
            p.postMessage({
              source: P,
              widgetId: h,
              seq: e.watchCatSeq,
              event: "meow"
            }, "*");
          }
        }
      }
    } catch (r) {
      a = true;
      o = r;
    } finally {
      try {
        if (!t && c.return != null) {
          c.return();
        }
      } finally {
        if (a) {
          throw o;
        }
      }
    }
  }
  function Ot(e) {
    if (e.watchCatInterval === null) {
      e.watchCatInterval = setInterval(function () {
        Wr(e);
      }, Dr);
    }
  }
  function kt(e, t = false) {
    if (e.watchCatInterval !== null && (e.widgetMap.size === 0 || t)) {
      clearInterval(e.watchCatInterval);
    }
  }
  var y = {
    turnstileLoadInitTimeMs: W(),
    isRecaptchaCompatibilityMode: false,
    scriptWasLoadedAsync: false,
    scriptUrl: "undefined",
    isReady: false,
    widgetMap: new Map(),
    lastWidgetIdx: 0,
    upgradeAttempts: 0,
    upgradeCompletedCount: 0,
    apiVersion: 1,
    watchCatInterval: null,
    watchCatSeq: 0
  };
  function Nt(e) {
    Tr(e, "");
  }
  function Ft() {
    var e = [er, tr];
    if (y.isRecaptchaCompatibilityMode) {
      e.push(rr);
    }
    document.querySelectorAll(e.join(", ")).forEach(function (t) {
      return Dt.render(t);
    });
  }
  var Vt = [];
  function br() {
    y.isReady = true;
    var e = true;
    var t = false;
    var a = undefined;
    try {
      for (var o = Vt[Symbol.iterator](), c; !(e = (c = o.next()).done); e = true) {
        var l = c.value;
        l();
      }
    } catch (v) {
      t = true;
      a = v;
    } finally {
      try {
        if (!e && o.return != null) {
          o.return();
        }
      } finally {
        if (t) {
          throw a;
        }
      }
    }
  }
  function Ur(e) {
    var t = y.widgetMap.get(e);
    if (t !== undefined && !t.hasResponseParamEl) {
      t.hasResponseParamEl = true;
      var o = t.params["response-field"] ?? true;
      if (o) {
        var c = document.createElement("input");
        c.type = "hidden";
        c.name = t.params["response-field-name"] ?? xt;
        c.id = `${e}_response`;
        t.wrapper.appendChild(c);
        if (typeof t.params["response-field-name"] != "string" && Rr(t.params.sitekey ?? "")) {
          var h = document.createElement("input");
          h.type = "hidden";
          h.name = bt;
          h.id = `${e}_legacy_response`;
          t.wrapper.appendChild(h);
        }
      }
      if (y.isRecaptchaCompatibilityMode) {
        var s = document.createElement("input");
        s.type = "hidden";
        s.name = wt;
        s.id = `${e}_g_response`;
        t.wrapper.appendChild(s);
      }
    }
  }
  function Tr(e, t) {
    Ur(e);
    var a = document.getElementById(`${e}_response`);
    if (a !== null && V(a, HTMLInputElement)) {
      a.value = t;
    }
    var o = document.getElementById(`${e}_legacy_response`);
    if (o !== null && V(o, HTMLInputElement)) {
      o.value = t;
    }
    if (y.isRecaptchaCompatibilityMode) {
      var c = document.getElementById(`${e}_g_response`);
      if (c !== null && V(c, HTMLInputElement)) {
        c.value = t;
      }
    }
  }
  function Mt(e, t) {
    var a = t.params;
    var o = a.size;
    var c = o === undefined ? "normal" : o;
    var l = t.mode;
    switch (l) {
      case q.NonInteractive:
      case q.Managed:
        switch (c) {
          case M.Compact:
            e.style.width = "150px";
            e.style.height = "140px";
            break;
          case M.Invisible:
            g(`Invalid value for parameter "size", expected "${M.Compact}" or "${M.Normal}", got "${c}"`, 2817);
          case M.Normal:
            e.style.width = "300px";
            e.style.height = "65px";
            break;
          case M.Flexible:
            e.style.width = "100%";
            e.style.maxWidth = "100vw";
            e.style.minWidth = "300px";
            e.style.height = "65px";
            break;
          default:
            break;
        }
        break;
      case q.Invisible:
        e.style.width = "0";
        e.style.height = "0";
        e.style.position = "absolute";
        e.style.visibility = "hidden";
        e.setAttribute("tabindex", "-1");
        e.setAttribute("aria-hidden", "true");
        break;
      default:
        g(`Invalid value for parameter "mode", expected "${q.NonInteractive}", "${q.Managed}" or "${q.Invisible}", got "${l}"`, 2818);
    }
  }
  function xr(e) {
    e.style.width = "0";
    e.style.height = "0";
  }
  function jr(e, t) {
    var a = t.get("turnstile_iframe_alt");
    if (a) {
      e.title = a;
    }
  }
  function Hr(e) {
    if (e.origin) {
      return e.origin === "https://challenges.cloudflare.com" || e.origin === "https://challenges-staging.cloudflare.com";
    } else {
      return true;
    }
  }
  function Rr(e) {
    return e.startsWith("0x4AAAAAAAAAA") || e.startsWith("0x4AAAAAAAAj");
  }
  function wr() {
    for (var e = window; e && e.top !== e && !e.location.href.startsWith("http");) {
      e = e.top;
    }
    if (e == null) {
      return undefined;
    } else {
      return e.location.href;
    }
  }
  var Dt = function () {
    function e(n, i, r, u) {
      return O.apply(this, arguments);
    }
    function t(n, i, r) {
      if (n.params.retry === ve.Auto || r) {
        if (n.isExecuted) {
          n.msgQueue.push(ue.Execute);
          n.isExecuted = true;
          n.isExecuting = true;
        }
        var d = r ? 0 : 2000 + (n.params["retry-interval"] ?? 0);
        n.retryTimeout = window.setTimeout(function () {
          var m = r ? z.CrashedRetry : z.FailureRetry;
          _(m, i);
        }, d);
      }
    }
    function a(n, i, r) {
      var u;
      if (n.response === undefined) {
        g("[Internal Error] Widget was completed but no response was given", 1362);
      }
      n.isExecuting = false;
      n.isComplete = true;
      Tr(i, n.response);
      if ((u = n.cbSuccess) !== null && u !== undefined) {
        u.call(n, n.response, r);
      }
    }
    function o(n) {
      if (!n) {
        return [];
      }
      var i = n.attributes;
      for (var r = i.length, u = new Array(r), d = 0; d < r; d++) {
        u[d] = i[d].name;
      }
      return u;
    }
    function c(n, i, r) {
      n.rcV = i;
      if (0) {
        var u;
      }
    }
    function l() {
      var n = "abcdefghijklmnopqrstuvwxyz0123456789";
      var i = n.length;
      var r = "";
      do {
        r = "";
        for (var u = 0; u < 5; u++) {
          r += n.charAt(Math.floor(Math.random() * i));
        }
      } while (y.widgetMap.has(r));
      return r;
    }
    function v(n) {
      var i = true;
      var r = false;
      var u = undefined;
      try {
        for (var d = y.widgetMap[Symbol.iterator](), m; !(i = (m = d.next()).done); i = true) {
          var w = Ie(m.value, 2);
          var E = w[0];
          var S = w[1];
          if (S.wrapper.parentElement === n) {
            return E;
          }
        }
      } catch (I) {
        r = true;
        u = I;
      } finally {
        try {
          if (!i && d.return != null) {
            d.return();
          }
        } finally {
          if (r) {
            throw u;
          }
        }
      }
      return null;
    }
    function h(n, i, r) {
      while (n.msgQueue.length > 0) {
        var u;
        var d = n.msgQueue.pop();
        if ((u = r.contentWindow) !== null && u !== undefined) {
          u.postMessage({
            source: P,
            widgetId: i,
            event: d
          }, "*");
        }
      }
    }
    function s(n, i) {
      if (i) {
        var r = ["retry-interval", "retry", "size", "theme", "tabindex", "execution", "refresh-expired", "refresh-timeout", "response-field-name", "response-field", "language", "base-url", "appearance", "sitekey", "feedback-enabled"];
        var u = [];
        var d = true;
        var m = false;
        var w = undefined;
        try {
          for (var E = r[Symbol.iterator](), S; !(d = (S = E.next()).done); d = true) {
            var I = S.value;
            if (i[I] && i[I] !== n.params[I]) {
              u.push(I);
            }
          }
        } catch (D) {
          m = true;
          w = D;
        } finally {
          try {
            if (!d && E.return != null) {
              E.return();
            }
          } finally {
            if (m) {
              throw w;
            }
          }
        }
        if (u.length > 0) {
          g(`The parameters ${r.join(",")} is/are not allowed be changed between the calls of render() and execute() of a widget.
    Consider rendering a new widget if you want to change the following parameters ${u.join(",")}`, 3618);
        }
        if (i.action) {
          if (!dt(i.action)) {
            g(`Invalid input for optional parameter "action", got "${i.action}"`, 3604);
          }
          n.action = i.action;
        }
        if (i.cData) {
          if (!ft(i.cData)) {
            g(`Invalid input for optional parameter "cData", got "${i.cData}"`, 3605);
          }
          n.cData = i.cData;
        }
        if (i["after-interactive-callback"]) {
          n.cbAfterInteractive = i["after-interactive-callback"];
        }
        if (i["before-interactive-callback"]) {
          n.cbBeforeInteractive = i["before-interactive-callback"];
        }
        if (i.callback) {
          n.cbSuccess = i.callback;
        }
        if (i["expired-callback"]) {
          n.cbExpired = i["expired-callback"];
        }
        if (i["timeout-callback"]) {
          n.cbTimeout = i["timeout-callback"];
        }
        if (i["error-callback"]) {
          n.cbError = i["error-callback"];
        }
        if (i["unsupported-callback"]) {
          n.cbUnsupported = i["unsupported-callback"];
        }
        if (i.chlPageData) {
          n.chlPageData = i.chlPageData;
        }
      }
    }
    function p(n) {
      _(z.Api, n);
    }
    function _(n, i) {
      var r = R(i);
      if (!r) {
        g("Nothing to reset found for provided container", 3329);
      }
      var u = y.widgetMap.get(r);
      if (u) {
        var d;
        u.isResetting = true;
        u.response = undefined;
        u.mode = undefined;
        u.msgQueue = [];
        u.isComplete = false;
        u.isExecuting = false;
        u.isExpired = false;
        u.isFailed = false;
        u.isInitialized = false;
        u.isStale = false;
        u.watchcat.lastAckedSeq = 0;
        u.watchcat.seq = 0;
        if (u.params.execution === me.Render) {
          u.msgQueue.push(ue.Execute);
          u.isExecuted = true;
          u.isExecuting = true;
        }
        var m = $(r);
        var w = u.shadow.querySelector(`#${m}`);
        if (!m || !w) {
          g(`Widget ${r} to reset was not found.`, 3330);
        }
        if (u.params.appearance === Q.InteractionOnly) {
          xr(w);
        }
        if (u.params.sitekey === null) {
          g("Unexpected Error: Sitekey is null", 3347);
        }
        var E = w.cloneNode();
        E.src = Rt(r, u.params.sitekey, u.params, u.rcV ?? K, false, "g", n, _t(u));
        if ((d = w.parentNode) !== null && d !== undefined) {
          d.replaceChild(E, w);
        }
        Nt(m);
        if (u.retryTimeout) {
          window.clearTimeout(u.retryTimeout);
        }
      } else {
        g(`Widget ${r} to reset was not found.`, 3331);
      }
    }
    function A(n) {
      var r = R(n);
      if (!r || !y.widgetMap.has(r)) {
        x("Nothing to remove found for the provided container.");
        return;
      }
      var u = $(r);
      var d = [`input#${u}_response`, `input#${u}_legacy_response`, `input#${u}_g_response`];
      document.querySelectorAll(d.join(", ")).forEach(function (E) {
        return E.remove();
      });
      var m = y.widgetMap.get(r);
      if (m != null) {
        m.shadow.querySelectorAll(d.join(", ")).forEach(function (E) {
          return E.remove();
        });
      }
      if (m != null) {
        m.wrapper.remove();
      }
      var w = y.widgetMap.get(r)?.retryTimeout;
      if (w) {
        window.clearTimeout(w);
      }
      y.widgetMap.delete(r);
      kt(y);
    }
    function T(n, i) {
      var r;
      var u;
      var d = W();
      var m;
      if (typeof n == "string") {
        try {
          var w = document.querySelector(n);
          if (!w) {
            g(`Unable to find a container for "${n}"`, 3585);
          }
          m = w;
        } catch (jt) {
          g(`Invalid type for "container", expected "selector" or an implementation of "HTMLElement", got "${n}"`, 3586);
        }
      } else if (V(n, HTMLElement)) {
        m = n;
      } else {
        g("Invalid type for parameter \"container\", expected \"string\" or an implementation of \"HTMLElement\"", 3587);
      }
      var E = true;
      var S = false;
      var I = undefined;
      try {
        for (var D = y.widgetMap.values()[Symbol.iterator](), U; !(E = (U = D.next()).done); E = true) {
          var X = U.value;
          if (m.contains(X.wrapper)) {
            x("Turnstile has already been rendered in this container. Did you mean to render it multiple times?");
            break;
          }
        }
      } catch (jt) {
        S = true;
        I = jt;
      } finally {
        try {
          if (!E && D.return != null) {
            D.return();
          }
        } finally {
          if (S) {
            throw I;
          }
        }
      }
      var J = qr(m);
      if (J) {
        var f = Object.assign(J, i);
        var he = f.action;
        var re = f.cData;
        var ke = f.chlPageData;
        var j = f.sitekey;
        f.theme = f.theme ?? je.Auto;
        f.retry = f.retry ?? ve.Auto;
        f.execution = f.execution ?? me.Render;
        f.appearance = f.appearance ?? Q.Always;
        f["retry-interval"] = Number(f["retry-interval"] ?? ar);
        f["expiry-interval"] = Number(f["expiry-interval"] ?? (Jt - Zt) * 1000);
        f.size = f.size ?? M.Normal;
        var xe = f.callback;
        var we = f["expired-callback"];
        var Ne = f["timeout-callback"];
        var Ee = f["after-interactive-callback"];
        var Te = f["before-interactive-callback"];
        var Y = f["error-callback"];
        var Je = f["unsupported-callback"];
        if (typeof j != "string") {
          g(`Invalid or missing type for parameter "sitekey", expected "string", got "${typeof j == "undefined" ? "undefined" : F(j)}"`, 3588);
        }
        if (!Kt(j)) {
          g(`Invalid input for parameter "sitekey", got "${j}"`, 3589);
        }
        if (!pt(f.size)) {
          g(`Invalid type for parameter "size", expected normal|compact, got "${f.size}" ${F(f.size)}`, 3590);
        }
        if (!ct(f.theme)) {
          g(`Invalid type for parameter "theme", expected dark|light|auto, got "${f.theme}" ${F(f.theme)}`, 3591);
        }
        if (!ut(f.retry)) {
          g(`Invalid type for parameter "retry", expected never|auto, got "${f.retry}" ${F(f.retry)}`, 3592);
        }
        f.language ||= "auto";
        if (!gt(f.language)) {
          x(`Invalid language value: "${f.language}, expected either: auto, or an ISO 639-1 two-letter language code (e.g. en) or language and country code (e.g. en-US).`);
          f.language = "auto";
        }
        if (!yt(f.appearance)) {
          g(`Unknown appearance value: "${f.appearance}, expected either: 'always', 'execute', or 'interaction-only'.`, 3600);
        }
        if (!ht(f.execution)) {
          g(`Unknown execution value: "${f.execution}, expected either: 'render' or 'execute'.`, 3601);
        }
        if (!lt(f["retry-interval"])) {
          g(`Invalid retry-interval value: "${f["retry-interval"]}, expected an integer value > 0 and < 900000"`, 3602);
        }
        if (!st(f["expiry-interval"])) {
          g(`Invalid expiry-interval value: "${f["expiry-interval"]}, expected an integer value > 0 and < 360000"`, 3602);
        }
        var Z = f["refresh-expired"] ?? ee.Auto;
        if (vt(Z)) {
          f["refresh-expired"] = Z;
        } else {
          g(`Invalid type for parameter "refresh-expired", expected never|manual|auto, got "${Z}" ${typeof Z == "undefined" ? "undefined" : F(Z)}`, 3603);
        }
        var oe = f["refresh-timeout"] ?? ce.Auto;
        if (mt(Z)) {
          f["refresh-timeout"] = oe;
        } else {
          g(`Invalid type for parameter "refresh-timeout", expected never|manual|auto, got "${oe}" ${typeof oe == "undefined" ? "undefined" : F(oe)}`, 3603);
        }
        var H = document.createElement("iframe");
        var fe = document.createElement("div");
        var Pt = fe.attachShadow({
          mode: "closed"
        });
        if (!dt(he)) {
          g(`Invalid input for optional parameter "action", got "${he}"`, 3604);
        }
        if (!ft(re)) {
          g(`Invalid input for optional parameter "cData", got "${re}"`, 3605);
        }
        var Ae = l();
        var pe = $(Ae);
        if (!!Ae && !!pe) {
          var Wt = [];
          var Ze = f.execution === me.Render;
          if (Ze) {
            Wt.push(ue.Execute);
          }
          y.lastWidgetIdx++;
          var Sr = {};
          y.widgetMap.set(Ae, it(Ve({
            idx: y.lastWidgetIdx,
            action: he,
            cData: re,
            chlPageData: ke,
            cbSuccess: xe,
            cbError: Y,
            cbExpired: we,
            cbTimeout: Ne,
            cbUnsupported: Je,
            cbAfterInteractive: Ee,
            cbBeforeInteractive: Te,
            params: f,
            isStale: false,
            isComplete: false,
            isExpired: false,
            isExecuting: Ze,
            isFailed: false,
            isResetting: false,
            isExecuted: Ze,
            isInitialized: false,
            hasResponseParamEl: false,
            msgQueue: Wt,
            rcV: K,
            watchcat: {
              seq: 0,
              lastAckedSeq: 0,
              missingWidgetWarning: false,
              overrunBeginSeq: 0
            }
          }, Sr), {
            widgetRenderStartTimeMs: d,
            widgetRenderEndTimeMs: 0,
            widgetParamsStartTimeMs: 0,
            widgetInitStartTimeMs: 0,
            shadow: Pt,
            wrapper: fe,
            isOverrunning: false
          }));
          Ot(y);
          var et = y.widgetMap.get(Ae);
          if (!et) {
            g("Turnstile Initialization Error ", 3606);
          }
          H.style.display = "none";
          H.style.border = "none";
          H.style.overflow = "hidden";
          H.setAttribute("src", Rt(Ae, j, f, K, false, "g", z.New, _t(et)));
          H.onerror = function () {
            if (Y) {
              if (Y != null) {
                Y(String(Yt.code));
              }
              return;
            }
            g("Could not load challenge from challenges.cloudflare.com.", 161);
          };
          var Ut = ["cross-origin-isolated", "fullscreen", "autoplay"];
          if (L(((u = document.featurePolicy) === null || u === undefined || (r = u.features) === null || r === undefined ? undefined : r.call(u)) ?? [], Et)) {
            Ut.push(Et);
          }
          H.setAttribute("allow", Ut.join("; "));
          H.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups");
          H.id = pe;
          H.tabIndex = f.tabindex ?? 0;
          H.title = "Widget containing a Cloudflare security challenge";
          Pt.appendChild(H);
          var Ar = f["response-field"] ?? true;
          if (Ar) {
            var Me = document.createElement("input");
            Me.type = "hidden";
            Me.name = f["response-field-name"] ?? xt;
            Me.id = `${pe}_response`;
            fe.appendChild(Me);
            if (typeof f["response-field-name"] != "string" && Rr(j)) {
              var Le = document.createElement("input");
              Le.type = "hidden";
              Le.name = bt;
              Le.id = `${pe}_legacy_response`;
              fe.appendChild(Le);
            }
          }
          if (y.isRecaptchaCompatibilityMode) {
            var Fe = document.createElement("input");
            Fe.type = "hidden";
            Fe.name = wt;
            Fe.id = `${pe}_g_response`;
            fe.appendChild(Fe);
          }
          m.appendChild(fe);
          et.widgetRenderEndTimeMs = W();
          return pe;
        }
      }
    }
    function k() {
      var n;
      var i = -1;
      var r = true;
      var u = false;
      var d = undefined;
      try {
        for (var m = y.widgetMap[Symbol.iterator](), w; !(r = (w = m.next()).done); r = true) {
          var E = Ie(w.value, 2);
          var S = E[0];
          var I = E[1];
          if (i < I.idx) {
            n = S;
            i = I.idx;
          }
        }
      } catch (D) {
        u = true;
        d = D;
      } finally {
        try {
          if (!r && m.return != null) {
            m.return();
          }
        } finally {
          if (u) {
            throw d;
          }
        }
      }
      if (i === -1) {
        g("Could not find widget", 43778);
      }
      return n;
    }
    function O() {
      O = qt(function (b, n, i, r) {
        var u;
        var d;
        var m;
        var w;
        var E;
        var S;
        var I;
        var D;
        var U;
        var X;
        var J;
        return Pe(this, function (f) {
          switch (f.label) {
            case 0:
              u = b.params.sitekey;
              d = wr();
              if (!d) {
                x("Cannot determine Turnstile's embedded location, aborting clearance redemption.");
                a(b, n, false);
                return [2];
              }
              m = `h/g/`;
              w = new URL(d);
              E = "https";
              S = "";
              D = `${E}://${w.host}/cdn-cgi/challenge-platform/${m}rc/${r}${S}`;
              f.label = 1;
            case 1:
              f.trys.push([1, 6,, 7]);
              return [4, fetch(D, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                redirect: "manual",
                body: JSON.stringify({
                  sitekey: u,
                  secondaryToken: i
                })
              })];
            case 2:
              U = f.sent();
              if (U.status === 200) {
                return [3, 3];
              } else {
                x("Cannot determine Turnstile's embedded location, aborting clearance redemption, are you running Turnstile on a Cloudflare Zone?");
                a(b, n, false);
                return [3, 5];
              }
            case 3:
              return [4, U.json()];
            case 4:
              X = f.sent();
              if ("status" in X && X.status === "redeemed") {
                a(b, n, true);
                return [2];
              }
              f.label = 5;
            case 5:
              return [3, 7];
            case 6:
              J = f.sent();
              x("Error contacting Turnstile, aborting clearance remdeption.");
              a(b, n, false);
              return [3, 7];
            case 7:
              return [2];
          }
        });
      });
      return O.apply(this, arguments);
    }
    function N(b) {
      var n = b.data;
      if (n.source === P) {
        if (!Hr(b)) {
          x(`Ignored message from wrong origin: ${b.origin}.`);
          return;
        }
        if (!!n.widgetId && !!y.widgetMap.has(n.widgetId)) {
          var i = $(n.widgetId);
          var r = y.widgetMap.get(n.widgetId);
          if (!!i && !!r) {
            switch (n.event) {
              case "init":
                {
                  var u;
                  r.widgetInitStartTimeMs = W();
                  var d = r.shadow.getElementById(i);
                  if (!d) {
                    g(`Cannot initialize Widget, Element not found (#${i}).`, 3074);
                  }
                  r.mode = n.mode;
                  r.nextRcV = n.nextRcV;
                  if (r.mode === q.Invisible && r.params["refresh-expired"] === ee.Manual) {
                    x(`refresh-expired=manual is impossible in invisible mode, consider using '${ee.Auto}' or '${ee.Never}.'`);
                  }
                  if (r.mode !== q.Managed && r.params["refresh-timeout"] !== ce.Auto) {
                    x("setting refresh-timeout has no effect on an invisible/non-interactive widget and will be ignored.");
                  }
                  if (r.params.appearance === Q.Always || r.isExecuting && r.params.appearance === Q.Execute) {
                    Mt(d, r);
                  } else {
                    xr(d);
                  }
                  d.style.display = "";
                  var m = r.shadow.querySelector(`#${i}`);
                  if (!m) {
                    g(`Received state for an unknown widget: ${n.widgetId}`, 3078);
                  }
                  if ((u = m.contentWindow) !== null && u !== undefined) {
                    u.postMessage({
                      source: P,
                      widgetId: n.widgetId,
                      event: "init"
                    }, "*");
                  }
                  break;
                }
              case "translationInit":
                {
                  var w = r.shadow.getElementById(i);
                  if (!w) {
                    g(`Cannot initialize Widget, Element not found (#${i}).`, 3074);
                  }
                  var E = new Map();
                  r.displayLanguage = n.displayLanguage;
                  Object.keys(n.translationData).forEach(function (oe) {
                    E.set(oe, n.translationData[oe]);
                  });
                  jr(w, E);
                  break;
                }
              case "languageUnsupported":
                {
                  x(`Language ${r.params.language} is not supported, falling back to: ${n.fallback}.`);
                  r.displayLanguage = n.fallback;
                  break;
                }
              case "reject":
                {
                  var S = r.shadow.getElementById(i);
                  r.isExecuting = false;
                  if (!S) {
                    g(`Cannot initialize Widget, Element not found (#${i}).`, 3075);
                  }
                  if (n.reason === "unsupported_browser") {
                    var I;
                    if ((I = r.cbUnsupported) !== null && I !== undefined) {
                      I.call(r);
                    }
                  }
                  break;
                }
              case "food":
                {
                  if (r.watchcat && n.seq > r.watchcat.lastAckedSeq) {
                    r.watchcat.lastAckedSeq = n.seq;
                  }
                  break;
                }
              case "overrunBegin":
                {
                  r.isOverrunning = true;
                  if (r.watchcat) {
                    r.watchcat.overrunBeginSeq = r.watchcat.lastAckedSeq;
                  }
                  break;
                }
              case "overrunEnd":
                {
                  r.isOverrunning = false;
                  break;
                }
              case "complete":
                {
                  c(r, K, n.widgetId);
                  r.response = n.token;
                  if (n.sToken) {
                    e(r, i, n.sToken, n.chlId);
                  } else {
                    a(r, i, false);
                  }
                  break;
                }
              case "fail":
                {
                  if (n.rcV) {
                    c(r, n.rcV, n.widgetId);
                  }
                  if (n.cfChlOut) {
                    r.cfChlOut = n.cfChlOut;
                  }
                  if (n.cfChlOutS) {
                    r.cfChlOutS = n.cfChlOutS;
                  }
                  if (n.code) {
                    r.errorCode = n.code;
                  }
                  r.isExecuting = false;
                  r.isFailed = true;
                  r.isInitialized = true;
                  Nt(i);
                  var D = r.cbError;
                  var U = n.code === We || n.code === Ue;
                  if (U) {
                    var X;
                    var J = r.shadow.querySelector(`#${i}`);
                    if (J != null && (X = J.contentWindow) !== null && X !== undefined) {
                      X.postMessage({
                        source: P,
                        widgetId: n.widgetId,
                        event: "forceFail"
                      }, "*");
                    }
                  }
                  if (D) {
                    if (D(String(n.code ?? Qt))) {
                      if (r.params.retry === ve.Auto && !r.isResetting) {
                        t(r, i, U);
                      }
                    } else {
                      if (n.code) {
                        x(`Error: ${n.code}.`);
                      }
                      t(r, i, U);
                    }
                  } else if (n.code) {
                    t(r, i, U);
                    g(`Error: ${n.code}`, 3076);
                  } else {
                    t(r, i, false);
                  }
                  break;
                }
              case "feedbackInit":
                {
                  var he = r.wrapper.querySelector(`#${i}-fr`);
                  if (he) {
                    x("A feedback report form is already opened for this widget.");
                    return;
                  }
                  It(i, r, n.feedbackOrigin);
                  break;
                }
              case "requestFeedbackData":
                {
                  var re;
                  var ke = r.shadow.querySelector(`#${i}`);
                  if (!ke) {
                    g(`Received state for an unknown widget: #${i} / ${n.widgetId}`, 3078);
                  }
                  if ((re = ke.contentWindow) !== null && re !== undefined) {
                    re.postMessage({
                      source: P,
                      widgetId: n.widgetId,
                      event: "requestTurnstileResults"
                    }, "*");
                  }
                  break;
                }
              case "turnstileResults":
                {
                  var j;
                  var ae;
                  var se = (j = r.wrapper.parentNode) === null || j === undefined ? undefined : j.querySelector(`#${i}-fr`);
                  if (!se) {
                    g(`Received state for an unknown widget: ${n.widgetId}`, 3078);
                  }
                  if ((ae = se.contentWindow) !== null && ae !== undefined) {
                    ae.postMessage({
                      source: P,
                      widgetId: n.widgetId,
                      event: "feedbackData",
                      rayId: n.rayId,
                      rcV: n.rcV,
                      cfChlOut: r.cfChlOut,
                      cfChlOutS: r.cfChlOutS,
                      errorCode: r.errorCode,
                      sitekey: n.sitekey,
                      mode: n.mode,
                      issuanceUserAgent: n.issuanceUserAgent,
                      ip: n.ip
                    }, "*");
                  }
                  break;
                }
              case "closeFeedbackReportIframe":
                {
                  var ne;
                  var _e = (ne = r.wrapper.parentNode) === null || ne === undefined ? undefined : ne.querySelector(`#${i}-fr`);
                  if (!_e) {
                    g(`Received state for an unknown widget: ${n.widgetId}`, 3078);
                  }
                  vr(`${i}-fr`);
                  break;
                }
              case "tokenExpired":
                {
                  var ie;
                  var be = n.token;
                  r.isExpired = true;
                  if ((ie = r.cbExpired) !== null && ie !== undefined) {
                    ie.call(r, be);
                  }
                  if (r.params["refresh-expired"] === ee.Auto && !r.isResetting) {
                    _(z.AutoExpire, i);
                  }
                  break;
                }
              case "interactiveTimeout":
                {
                  c(r, K, n.widgetId);
                  Nt(i);
                  var de = r.cbTimeout;
                  if (de) {
                    de();
                  } else if (r.params["refresh-timeout"] === ce.Never && !r.isResetting) {
                    x("The widget encountered an interactive timeout and is set to never refresh. Consider defining a timeout handler and resetting the widget upon timeout as solving a widget in a timed-out state is going to fail.");
                  }
                  if (r.params["refresh-timeout"] === ce.Auto && !r.isResetting) {
                    var xe = r.cbAfterInteractive;
                    if (xe != null) {
                      xe();
                    }
                    _(z.AutoTimeout, i);
                  }
                  break;
                }
              case "refreshRequest":
                {
                  c(r, K, n.widgetId);
                  _(z.ManualRefresh, i);
                  break;
                }
              case "reloadRequest":
                {
                  c(r, n.nextRcV, n.widgetId);
                  _(n.trigger, i);
                  break;
                }
              case "interactiveBegin":
                {
                  var we;
                  var Ne = r.shadow.getElementById(i);
                  if (!Ne) {
                    g(`Cannot layout widget, Element not found (#${i}).`, 3076);
                  }
                  if ((we = r.cbBeforeInteractive) !== null && we !== undefined) {
                    we.call(r);
                  }
                  if (r.params.appearance === Q.InteractionOnly) {
                    Mt(Ne, r);
                  }
                  break;
                }
              case "interactiveEnd":
                {
                  var Ee;
                  if ((Ee = r.cbAfterInteractive) !== null && Ee !== undefined) {
                    Ee.call(r);
                  }
                  break;
                }
              case "widgetStale":
                {
                  r.isStale = true;
                  break;
                }
              case "requestExtraParams":
                {
                  var Te;
                  r.widgetParamsStartTimeMs = W();
                  var Y = r.shadow.querySelector(`#${i}`);
                  if (!Y) {
                    g(`Received state for an unknown widget: ${n.widgetId}`, 3078);
                  }
                  r.isResetting = false;
                  var Je = {};
                  var Re = W();
                  var Z = {
                    "w.iW": window.innerWidth,
                    "ht.atrs": o(document.body.parentNode),
                    pi: {
                      xp: mr(r.wrapper).substring(0, or),
                      pfp: gr(document, nr, ir),
                      sL: document.scripts.length,
                      ssL: document.styleSheets.length,
                      mL: document.getElementsByTagName("meta").length,
                      t: yr(document.title),
                      tL: document.getElementsByTagName("*").length,
                      lH: window.location.href,
                      sR: r.wrapper.shadowRoot === null
                    }
                  };
                  var Se = W() - Re;
                  if ((Te = Y.contentWindow) !== null && Te !== undefined) {
                    Te.postMessage(Ve({
                      source: P,
                      widgetId: n.widgetId,
                      event: "extraParams",
                      action: r.action,
                      cData: r.cData,
                      chlPageData: r.chlPageData,
                      rcV: r.rcV,
                      ch: "f3b948d8acb8",
                      au: y.scriptUrl,
                      url: wr(),
                      retry: r.params.retry,
                      "expiry-interval": r.params["expiry-interval"],
                      "retry-interval": r.params["retry-interval"],
                      "refresh-expired": r.params["refresh-expired"],
                      "refresh-timeout": r.params["refresh-timeout"],
                      language: r.params.language,
                      execution: r.params.execution,
                      appearance: r.params.appearance,
                      wPr: Z,
                      turnstileAgeMs: W() - y.turnstileLoadInitTimeMs,
                      widgetAgeMs: W() - r.widgetRenderStartTimeMs,
                      upgradeAttempts: y.upgradeAttempts,
                      upgradeCompletedCount: y.upgradeCompletedCount,
                      timeRenderMs: r.widgetRenderEndTimeMs - r.widgetRenderStartTimeMs,
                      timeToInitMs: r.widgetInitStartTimeMs - r.widgetRenderEndTimeMs,
                      timeToParamsMs: r.widgetParamsStartTimeMs - r.widgetInitStartTimeMs,
                      tiefTimeMs: Se
                    }, Je), "*");
                  }
                  h(r, n.widgetId, Y);
                  r.isInitialized = true;
                  break;
                }
              default:
                break;
            }
          }
        }
      }
    }
    y.msgHandler = N;
    window.addEventListener("message", N);
    function R(b) {
      if (typeof b == "string") {
        var n = Xe(b);
        if (n && y.widgetMap.has(n)) {
          return n;
        }
        if (y.widgetMap.has(b)) {
          return b;
        }
        try {
          var i = document.querySelector(b);
          if (i) {
            return R(i);
          } else {
            return null;
          }
        } catch (r) {
          return null;
        }
      }
      if (V(b, Element)) {
        return v(b);
      } else if (b || y.widgetMap.size === 0) {
        return null;
      } else {
        return y.widgetMap.keys().next().value;
      }
    }
    var G = {};
    return it(Ve({}, G), {
      ready: function (n) {
        if (y.scriptWasLoadedAsync) {
          x("turnstile.ready() would break if called *before* the Turnstile api.js script is loaded by visitors.");
          g("Remove async/defer from the Turnstile api.js script tag before using turnstile.ready().", 3857);
        }
        if (typeof n != "function") {
          g(`turnstile.ready() expected a "function" argument, got "${typeof n == "undefined" ? "undefined" : F(n)}"`, 3841);
        }
        if (y.isReady) {
          n();
          return;
        }
        Vt.push(n);
      },
      implicitRender: Ft,
      execute: function (n, i) {
        var r = R(n);
        if (!r) {
          if (i === undefined) {
            g("Please provide 2 parameters to execute: container and parameters", 43521);
          }
          var u = T(n, i);
          if (!u) {
            g("Failed to render widget", 43522);
          }
          r = u;
        }
        var d = y.widgetMap.get(r);
        if (d) {
          s(d, i);
          var m = $(r);
          if (d.isExecuting) {
            x(`Call to execute() on a widget that is already executing (${m}), consider using reset() before execute().`);
            return;
          }
          d.isExecuting = true;
          if (d.response) {
            var w;
            d.isExecuting = false;
            x(`Call to execute() on a widget that was already executed (${m}), execute() will return the previous token obtained. Consider using reset() before execute() to obtain a fresh token.`);
            if ((w = d.cbSuccess) !== null && w !== undefined) {
              w.call(d, d.response, false);
            }
            return;
          }
          if (d.isExpired) {
            x(`Call to execute on a expired-widget (${m}), consider using reset() before.`);
          }
          if (d.isStale) {
            _(z.StaleExecute, m);
            d.isExecuting = true;
          }
          d.msgQueue.push(ue.Execute);
          d.isExecuted = true;
          var E = d.shadow.querySelector(`#${m}`);
          if (!E) {
            d.isExecuting = false;
            g(`Widget ${m} to execute was not found`, 43522);
          }
          if (d.isResetting) {
            return;
          }
          if (d.isInitialized) {
            h(d, r, E);
          }
          if (d.isInitialized && d.params.appearance === Q.Execute) {
            Mt(E, d);
          }
          if (d.isExecuting) {
            var S;
            var I = d.shadow.querySelector(`#${m}`);
            if (!I) {
              g(`Received state for an unknown widget: ${r}`, 3078);
            }
            if ((S = I.contentWindow) !== null && S !== undefined) {
              S.postMessage({
                source: P,
                widgetId: r,
                event: "execute"
              }, "*");
            }
          }
        }
      },
      render: T,
      reset: p,
      remove: A,
      _private: {
        showFeedback: function (n) {
          var i = R(n);
          if (i) {
            var r = $(i);
            if (r) {
              var u = y.widgetMap.get(i);
              if (u) {
                It(r, u, He.Custom);
              }
            }
          }
        }
      },
      getResponse: function (n) {
        if (typeof n == "undefined") {
          var r = k();
          if (r) {
            var d = y.widgetMap.get(r);
            if (d != null && d.isExpired) {
              x("Call to getResponse on a widget that expired, consider refreshing the widget.");
            }
            return y.widgetMap.get(r)?.response;
          }
          g("Could not find a widget", 43794);
        }
        var m = R(n);
        if (!m) {
          g("Could not find widget for provided container", 43778);
        }
        return y.widgetMap.get(m)?.response;
      },
      isExpired: function (n) {
        if (typeof n == "undefined") {
          var r = k();
          if (r) {
            return y.widgetMap.get(r)?.isExpired ?? false;
          }
          g("Could not find a widget", 43794);
        }
        var m = R(n);
        if (!m) {
          g("Could not find widget for provided container", 43778);
        }
        return y.widgetMap.get(m)?.isExpired ?? false;
      }
    });
  }();
  function qr(e) {
    var t = e.getAttribute("data-sitekey");
    var a = {
      sitekey: t
    };
    var o = e.getAttribute("data-tabindex");
    if (o) {
      a.tabindex = Number.parseInt(o, 10);
    }
    var c = e.getAttribute("data-theme");
    if (c) {
      if (ct(c)) {
        a.theme = c;
      } else {
        x(`Unknown data-theme value: "${c}".`);
      }
    }
    var l = e.getAttribute("data-size");
    if (l) {
      if (pt(l)) {
        a.size = l;
      } else {
        x(`Unknown data-size value: "${l}".`);
      }
    }
    if (0) {
      var v;
    }
    var h = e.getAttribute("data-action");
    if (typeof h == "string") {
      a.action = h;
    }
    var s = e.getAttribute("data-cdata");
    if (typeof s == "string") {
      a.cData = s;
    }
    var p = e.getAttribute("data-retry");
    if (p) {
      if (ut(p)) {
        a.retry = p;
      } else {
        x(`Invalid data-retry value: "${p}, expected either 'never' or 'auto'".`);
      }
    }
    var _ = e.getAttribute("data-retry-interval");
    if (_) {
      var A = Number.parseInt(_, 10);
      if (lt(A)) {
        a["retry-interval"] = A;
      } else {
        x(`Invalid data-retry-interval value: "${_}, expected an integer value > 0 and < 900000".`);
      }
    }
    var T = e.getAttribute("data-expiry-interval");
    if (T) {
      var k = Number.parseInt(T, 10);
      if (st(k)) {
        a["expiry-interval"] = k;
      } else {
        x(`Invalid data-expiry-interval value: "${k}, expected an integer value > 0 and < 360000".`);
      }
    }
    var O = e.getAttribute("data-refresh-expired");
    if (O) {
      if (vt(O)) {
        a["refresh-expired"] = O;
      } else {
        x(`Unknown data-refresh-expired value: "${O}, expected either: 'never', 'auto' or 'manual'.`);
      }
    }
    var N = e.getAttribute("data-refresh-timeout");
    if (N) {
      if (mt(N)) {
        a["refresh-timeout"] = N;
      } else {
        x(`Unknown data-refresh-timeout value: "${N}, expected either: 'never', 'auto' or 'manual'.`);
      }
    }
    var R = e.getAttribute("data-language");
    if (R) {
      if (gt(R)) {
        a.language = R;
      } else {
        x(`Invalid data-language value: "${R}, expected either: auto, or an ISO 639-1 two-letter language code (e.g. en) or language and country code (e.g. en-US).`);
      }
    }
    function G(w) {
      var E = e.getAttribute(w);
      if (E && window[E]) {
        return window[E];
      } else {
        return undefined;
      }
    }
    var b = ["error-callback", "unsupported-callback", "callback", "expired-callback", "timeout-callback", "after-interactive-callback", "before-interactive-callback"];
    b.forEach(function (w) {
      a[w] = G(`data-${w}`);
    });
    var n = e.getAttribute("data-feedback-enabled");
    if (n) {
      if (!$t(n)) {
        x(`Invalid data-feedback-enabled value: "${n}, expected either: 'true' or 'false'. Value is ignored.`);
      }
      a["feedback-enabled"] = n === "true";
    } else {
      a["feedback-enabled"] = true;
    }
    var r = e.getAttribute("data-response-field") ?? "true";
    a["response-field"] = r === "true";
    var u = e.getAttribute("data-response-field-name");
    if (u) {
      a["response-field-name"] = u;
    }
    var d = e.getAttribute("data-execution");
    if (d) {
      if (ht(d)) {
        a.execution = d;
      } else {
        x(`Unknown data-execution value: "${d}, expected either: 'render' or 'execute'.`);
      }
    }
    var m = e.getAttribute("data-appearance");
    if (m) {
      if (yt(m)) {
        a.appearance = m;
      } else {
        x(`Unknown data-appearance value: "${m}, expected either: 'always', 'execute', or 'interaction-only'.`);
      }
    }
    return a;
  }
  function zr() {
    var e = true;
    kt(y, e);
    if (y.msgHandler) {
      window.removeEventListener("message", y.msgHandler);
    }
    hr(window.turnstile, y);
  }
  ge = false;
  C = pr();
  y.scriptWasLoadedAsync = (C == null ? undefined : C.loadedAsync) ?? false;
  y.scriptUrl = (C == null ? undefined : C.src) ?? "undefined";
  if (C != null && C.params) {
    ye = C.params.get("compat");
    if ((ye == null ? undefined : ye.toLowerCase()) === "recaptcha") {
      if (window.grecaptcha) {
        x("grecaptcha is already defined. The compatibility layer will not be enabled.");
      } else {
        x("Compatibility layer enabled.");
        y.isRecaptchaCompatibilityMode = true;
        window.grecaptcha = Dt;
      }
    } else if (ye !== null) {
      x(`Unknown value for api.js?compat: "${ye}", ignoring.`);
    }
    C.params.forEach(function (e, t) {
      if (!L(["onload", "compat", "_cb", "_upgrade", "_reload", "render"], t)) {
        x(`Unknown parameter passed to api.js: "?${t}=...", ignoring.`);
      }
    });
    ge = C.params.get("_upgrade") === "true";
    B = C.params.get("onload");
    if (B && !ge) {
      setTimeout(function () {
        if (typeof window[B] == "function") {
          window[B]();
        } else {
          x(`Unable to find onload callback '${B}' immediately after loading, expected 'function', got '${F(window[B])}'.`);
          setTimeout(function () {
            if (typeof window[B] == "function") {
              window[B]();
            } else {
              x(`Unable to find onload callback '${B}' after 1 second, expected 'function', got '${F(window[B])}'.`);
            }
          }, 1000);
        }
      }, 0);
    }
  }
  Lt = "turnstile" in window;
  if (Lt && !ge) {
    x("Turnstile already has been loaded. Was Turnstile imported multiple times?");
  } else {
    if (Lt && ge) {
      _r(window.turnstile, y);
      Ot(y);
      if ((C == null || (Ke = C.params) === null || Ke === undefined ? undefined : Ke.get("render")) !== "explicit") {
        setTimeout(Ft, 0);
      }
    }
    window.turnstile = Dt;
    if (!ge) {
      if ((C == null || ($e = C.params) === null || $e === undefined ? undefined : $e.get("render")) !== "explicit") {
        Vt.push(Ft);
      }
      if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(br, 0);
      } else {
        window.addEventListener("DOMContentLoaded", br);
      }
    }
  }
  Er = 86400000;
  window.setTimeout(zr, Er);
  var ge;
  var C;
  var ye;
  var B;
  var Lt;
  var Ke;
  var $e;
  var Er;
})();