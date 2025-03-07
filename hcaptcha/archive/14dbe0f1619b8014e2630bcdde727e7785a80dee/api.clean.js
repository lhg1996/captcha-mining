/* { "version": "1", "hash": "MEUCICqlA3TEM45lf4vUHPxenfVM2Bhvxe6VzqHYgzfrPioyAiEAjI1zQTwuJrBuhJvxijCoVI2gtrvPj5Tnl1N47rM+lcI=" } */
/* https://hcaptcha.com/license */
(function () {
  "use strict";

  function e(e) {
    var t = this.constructor;
    return this.then(function (n) {
      return t.resolve(e()).then(function () {
        return n;
      });
    }, function (n) {
      return t.resolve(e()).then(function () {
        return t.reject(n);
      });
    });
  }
  function t(e) {
    return new this(function (t, n) {
      if (!e || typeof e.length == "undefined") {
        return n(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
      }
      var r = Array.prototype.slice.call(e);
      if (r.length === 0) {
        return t([]);
      }
      var i = r.length;
      function o(e, n) {
        if (n && (typeof n == "object" || typeof n == "function")) {
          var a = n.then;
          if (typeof a == "function") {
            a.call(n, function (t) {
              o(e, t);
            }, function (n) {
              r[e] = {
                status: "rejected",
                reason: n
              };
              if (--i == 0) {
                t(r);
              }
            });
            return;
          }
        }
        r[e] = {
          status: "fulfilled",
          value: n
        };
        if (--i == 0) {
          t(r);
        }
      }
      for (var a = 0; a < r.length; a++) {
        o(a, r[a]);
      }
    });
  }
  var n = setTimeout;
  var r = typeof setImmediate != "undefined" ? setImmediate : null;
  function i(e) {
    return Boolean(e && typeof e.length != "undefined");
  }
  function o() {}
  function a(e) {
    if (!(this instanceof a)) {
      throw new TypeError("Promises must be constructed via new");
    }
    if (typeof e != "function") {
      throw new TypeError("not a function");
    }
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];
    d(e, this);
  }
  function s(e, t) {
    while (e._state === 3) {
      e = e._value;
    }
    if (e._state !== 0) {
      e._handled = true;
      a._immediateFn(function () {
        var n = e._state === 1 ? t.onFulfilled : t.onRejected;
        if (n !== null) {
          var r;
          try {
            r = n(e._value);
          } catch (i) {
            l(t.promise, i);
            return;
          }
          c(t.promise, r);
        } else {
          (e._state === 1 ? c : l)(t.promise, e._value);
        }
      });
    } else {
      e._deferreds.push(t);
    }
  }
  function c(e, t) {
    try {
      if (t === e) {
        throw new TypeError("A promise cannot be resolved with itself.");
      }
      if (t && (typeof t == "object" || typeof t == "function")) {
        var n = t.then;
        if (t instanceof a) {
          e._state = 3;
          e._value = t;
          u(e);
          return;
        }
        if (typeof n == "function") {
          d((r = n, i = t, function () {
            r.apply(i, arguments);
          }), e);
          return;
        }
      }
      e._state = 1;
      e._value = t;
      u(e);
    } catch (o) {
      l(e, o);
    }
    var r;
    var i;
  }
  function l(e, t) {
    e._state = 2;
    e._value = t;
    u(e);
  }
  function u(e) {
    if (e._state === 2 && e._deferreds.length === 0) {
      a._immediateFn(function () {
        if (!e._handled) {
          a._unhandledRejectionFn(e._value);
        }
      });
    }
    for (var t = 0, n = e._deferreds.length; t < n; t++) {
      s(e, e._deferreds[t]);
    }
    e._deferreds = null;
  }
  function h(e, t, n) {
    this.onFulfilled = typeof e == "function" ? e : null;
    this.onRejected = typeof t == "function" ? t : null;
    this.promise = n;
  }
  function d(e, t) {
    var n = false;
    try {
      e(function (e) {
        if (!n) {
          n = true;
          c(t, e);
        }
      }, function (e) {
        if (!n) {
          n = true;
          l(t, e);
        }
      });
    } catch (r) {
      if (n) {
        return;
      }
      n = true;
      l(t, r);
    }
  }
  a.prototype.catch = function (e) {
    return this.then(null, e);
  };
  a.prototype.then = function (e, t) {
    var n = new this.constructor(o);
    s(this, new h(e, t, n));
    return n;
  };
  a.prototype.finally = e;
  a.all = function (e) {
    return new a(function (t, n) {
      if (!i(e)) {
        return n(new TypeError("Promise.all accepts an array"));
      }
      var r = Array.prototype.slice.call(e);
      if (r.length === 0) {
        return t([]);
      }
      var o = r.length;
      function a(e, i) {
        try {
          if (i && (typeof i == "object" || typeof i == "function")) {
            var s = i.then;
            if (typeof s == "function") {
              s.call(i, function (t) {
                a(e, t);
              }, n);
              return;
            }
          }
          r[e] = i;
          if (--o == 0) {
            t(r);
          }
        } catch (c) {
          n(c);
        }
      }
      for (var s = 0; s < r.length; s++) {
        a(s, r[s]);
      }
    });
  };
  a.allSettled = t;
  a.resolve = function (e) {
    if (e && typeof e == "object" && e.constructor === a) {
      return e;
    } else {
      return new a(function (t) {
        t(e);
      });
    }
  };
  a.reject = function (e) {
    return new a(function (t, n) {
      n(e);
    });
  };
  a.race = function (e) {
    return new a(function (t, n) {
      if (!i(e)) {
        return n(new TypeError("Promise.race accepts an array"));
      }
      for (var r = 0, o = e.length; r < o; r++) {
        a.resolve(e[r]).then(t, n);
      }
    });
  };
  a._immediateFn = typeof r == "function" && function (e) {
    r(e);
  } || function (e) {
    n(e, 0);
  };
  a._unhandledRejectionFn = function (e) {
    if (typeof console != "undefined" && console) {
      console.warn("Possible Unhandled Promise Rejection:", e);
    }
  };
  var p = function () {
    if (typeof self != "undefined") {
      return self;
    }
    if (typeof window != "undefined") {
      return window;
    }
    if (typeof global != "undefined") {
      return global;
    }
    throw new Error("unable to locate global object");
  }();
  function f(e, t, n) {
    return t <= e && e <= n;
  }
  function m(e) {
    if (e === undefined) {
      return {};
    }
    if (e === Object(e)) {
      return e;
    }
    throw TypeError("Could not convert argument to dictionary");
  }
  if (typeof p.Promise != "function") {
    p.Promise = a;
  } else {
    p.Promise.prototype.finally ||= e;
    p.Promise.allSettled ||= t;
  }
  function g(e) {
    return e >= 0 && e <= 127;
  }
  var y = -1;
  function v(e) {
    this.tokens = [].slice.call(e);
    this.tokens.reverse();
  }
  v.prototype = {
    endOfStream: function () {
      return !this.tokens.length;
    },
    read: function () {
      if (this.tokens.length) {
        return this.tokens.pop();
      } else {
        return y;
      }
    },
    prepend: function (e) {
      if (Array.isArray(e)) {
        for (var t = e; t.length;) {
          this.tokens.push(t.pop());
        }
      } else {
        this.tokens.push(e);
      }
    },
    push: function (e) {
      if (Array.isArray(e)) {
        for (var t = e; t.length;) {
          this.tokens.unshift(t.shift());
        }
      } else {
        this.tokens.unshift(e);
      }
    }
  };
  var w = -1;
  function b(e, t) {
    if (e) {
      throw TypeError("Decoder error");
    }
    return t || 65533;
  }
  function _(e) {
    e = String(e).trim().toLowerCase();
    if (Object.prototype.hasOwnProperty.call(C, e)) {
      return C[e];
    } else {
      return null;
    }
  }
  var C = {};
  [{
    encodings: [{
      labels: ["unicode-1-1-utf-8", "utf-8", "utf8"],
      name: "UTF-8"
    }],
    heading: "The Encoding"
  }].forEach(function (e) {
    e.encodings.forEach(function (e) {
      e.labels.forEach(function (t) {
        C[t] = e;
      });
    });
  });
  var k;
  var E = {
    "UTF-8": function (e) {
      return new U(e);
    }
  };
  var x = {
    "UTF-8": function (e) {
      return new R(e);
    }
  };
  var V = "utf-8";
  function S(e, t) {
    if (!(this instanceof S)) {
      throw TypeError("Called as a function. Did you forget 'new'?");
    }
    e = e !== undefined ? String(e) : V;
    t = m(t);
    this._encoding = null;
    this._decoder = null;
    this._ignoreBOM = false;
    this._BOMseen = false;
    this._error_mode = "replacement";
    this._do_not_flush = false;
    var n = _(e);
    if (n === null || n.name === "replacement") {
      throw RangeError("Unknown encoding: " + e);
    }
    if (!x[n.name]) {
      throw Error("Decoder not present. Did you forget to include encoding-indexes.js first?");
    }
    var r = this;
    r._encoding = n;
    if (t.fatal) {
      r._error_mode = "fatal";
    }
    if (t.ignoreBOM) {
      r._ignoreBOM = true;
    }
    if (!Object.defineProperty) {
      this.encoding = r._encoding.name.toLowerCase();
      this.fatal = r._error_mode === "fatal";
      this.ignoreBOM = r._ignoreBOM;
    }
    return r;
  }
  function T(e, t) {
    if (!(this instanceof T)) {
      throw TypeError("Called as a function. Did you forget 'new'?");
    }
    t = m(t);
    this._encoding = null;
    this._encoder = null;
    this._do_not_flush = false;
    this._fatal = t.fatal ? "fatal" : "replacement";
    var n = this;
    if (t.NONSTANDARD_allowLegacyEncoding) {
      var r = _(e = e !== undefined ? String(e) : V);
      if (r === null || r.name === "replacement") {
        throw RangeError("Unknown encoding: " + e);
      }
      if (!E[r.name]) {
        throw Error("Encoder not present. Did you forget to include encoding-indexes.js first?");
      }
      n._encoding = r;
    } else {
      n._encoding = _("utf-8");
    }
    if (!Object.defineProperty) {
      this.encoding = n._encoding.name.toLowerCase();
    }
    return n;
  }
  function R(e) {
    var t = e.fatal;
    var n = 0;
    var r = 0;
    var i = 0;
    var o = 128;
    var a = 191;
    this.handler = function (e, s) {
      if (s === y && i !== 0) {
        i = 0;
        return b(t);
      }
      if (s === y) {
        return w;
      }
      if (i === 0) {
        if (f(s, 0, 127)) {
          return s;
        }
        if (f(s, 194, 223)) {
          i = 1;
          n = s & 31;
        } else if (f(s, 224, 239)) {
          if (s === 224) {
            o = 160;
          }
          if (s === 237) {
            a = 159;
          }
          i = 2;
          n = s & 15;
        } else {
          if (!f(s, 240, 244)) {
            return b(t);
          }
          if (s === 240) {
            o = 144;
          }
          if (s === 244) {
            a = 143;
          }
          i = 3;
          n = s & 7;
        }
        return null;
      }
      if (!f(s, o, a)) {
        n = i = r = 0;
        o = 128;
        a = 191;
        e.prepend(s);
        return b(t);
      }
      o = 128;
      a = 191;
      n = n << 6 | s & 63;
      if ((r += 1) !== i) {
        return null;
      }
      var c = n;
      n = i = r = 0;
      return c;
    };
  }
  function U(e) {
    e.fatal;
    this.handler = function (e, t) {
      if (t === y) {
        return w;
      }
      if (g(t)) {
        return t;
      }
      var n;
      var r;
      if (f(t, 128, 2047)) {
        n = 1;
        r = 192;
      } else if (f(t, 2048, 65535)) {
        n = 2;
        r = 224;
      } else if (f(t, 65536, 1114111)) {
        n = 3;
        r = 240;
      }
      var i = [(t >> n * 6) + r];
      while (n > 0) {
        var o = t >> (n - 1) * 6;
        i.push(o & 63 | 128);
        n -= 1;
      }
      return i;
    };
  }
  if (Object.defineProperty) {
    Object.defineProperty(S.prototype, "encoding", {
      get: function () {
        return this._encoding.name.toLowerCase();
      }
    });
    Object.defineProperty(S.prototype, "fatal", {
      get: function () {
        return this._error_mode === "fatal";
      }
    });
    Object.defineProperty(S.prototype, "ignoreBOM", {
      get: function () {
        return this._ignoreBOM;
      }
    });
  }
  S.prototype.decode = function (e, t) {
    var n;
    n = typeof e == "object" && e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e == "object" && "buffer" in e && e.buffer instanceof ArrayBuffer ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : new Uint8Array(0);
    t = m(t);
    if (!this._do_not_flush) {
      this._decoder = x[this._encoding.name]({
        fatal: this._error_mode === "fatal"
      });
      this._BOMseen = false;
    }
    this._do_not_flush = Boolean(t.stream);
    var r;
    var i = new v(n);
    var o = [];
    while (true) {
      var a = i.read();
      if (a === y) {
        break;
      }
      if ((r = this._decoder.handler(i, a)) === w) {
        break;
      }
      if (r !== null) {
        if (Array.isArray(r)) {
          o.push.apply(o, r);
        } else {
          o.push(r);
        }
      }
    }
    if (!this._do_not_flush) {
      do {
        if ((r = this._decoder.handler(i, i.read())) === w) {
          break;
        }
        if (r !== null) {
          if (Array.isArray(r)) {
            o.push.apply(o, r);
          } else {
            o.push(r);
          }
        }
      } while (!i.endOfStream());
      this._decoder = null;
    }
    return function (e) {
      var t;
      var n;
      t = ["UTF-8", "UTF-16LE", "UTF-16BE"];
      n = this._encoding.name;
      if (t.indexOf(n) !== -1 && !this._ignoreBOM && !this._BOMseen) {
        if (e.length > 0 && e[0] === 65279) {
          this._BOMseen = true;
          e.shift();
        } else if (e.length > 0) {
          this._BOMseen = true;
        }
      }
      return function (e) {
        var t = "";
        for (var n = 0; n < e.length; ++n) {
          var r = e[n];
          if (r <= 65535) {
            t += String.fromCharCode(r);
          } else {
            r -= 65536;
            t += String.fromCharCode(55296 + (r >> 10), 56320 + (r & 1023));
          }
        }
        return t;
      }(e);
    }.call(this, o);
  };
  if (Object.defineProperty) {
    Object.defineProperty(T.prototype, "encoding", {
      get: function () {
        return this._encoding.name.toLowerCase();
      }
    });
  }
  T.prototype.encode = function (e, t) {
    e = e === undefined ? "" : String(e);
    t = m(t);
    if (!this._do_not_flush) {
      this._encoder = E[this._encoding.name]({
        fatal: this._fatal === "fatal"
      });
    }
    this._do_not_flush = Boolean(t.stream);
    var n;
    var r = new v(function (e) {
      var t = String(e);
      for (var n = t.length, r = 0, i = []; r < n;) {
        var o = t.charCodeAt(r);
        if (o < 55296 || o > 57343) {
          i.push(o);
        } else if (o >= 56320 && o <= 57343) {
          i.push(65533);
        } else if (o >= 55296 && o <= 56319) {
          if (r === n - 1) {
            i.push(65533);
          } else {
            var a = t.charCodeAt(r + 1);
            if (a >= 56320 && a <= 57343) {
              var s = o & 1023;
              var c = a & 1023;
              i.push(65536 + (s << 10) + c);
              r += 1;
            } else {
              i.push(65533);
            }
          }
        }
        r += 1;
      }
      return i;
    }(e));
    var i = [];
    while (true) {
      var o = r.read();
      if (o === y) {
        break;
      }
      if ((n = this._encoder.handler(r, o)) === w) {
        break;
      }
      if (Array.isArray(n)) {
        i.push.apply(i, n);
      } else {
        i.push(n);
      }
    }
    if (!this._do_not_flush) {
      while ((n = this._encoder.handler(r, r.read())) !== w) {
        if (Array.isArray(n)) {
          i.push.apply(i, n);
        } else {
          i.push(n);
        }
      }
      this._encoder = null;
    }
    return new Uint8Array(i);
  };
  window.TextDecoder ||= S;
  window.TextEncoder ||= T;
  (function (e) {
    if (typeof Promise != "function") {
      throw "Promise support required";
    }
    var t = e.crypto || e.msCrypto;
    if (t) {
      var n = t.subtle || t.webkitSubtle;
      if (n) {
        var r = e.Crypto || t.constructor || Object;
        var i = e.SubtleCrypto || n.constructor || Object;
        if (!e.CryptoKey) {
          e.Key;
        }
        var o = e.navigator.userAgent.indexOf("Edge/") > -1;
        var a = !!e.msCrypto && !o;
        var s = !t.subtle && !!t.webkitSubtle;
        if (a || s) {
          var c = {
            KoZIhvcNAQEB: "1.2.840.113549.1.1.1"
          };
          var l = {
            "1.2.840.113549.1.1.1": "KoZIhvcNAQEB"
          };
          ["generateKey", "importKey", "unwrapKey"].forEach(function (e) {
            var r = n[e];
            n[e] = function (i, o, c) {
              var l;
              var u;
              var h;
              var f;
              var b = [].slice.call(arguments);
              switch (e) {
                case "generateKey":
                  l = m(i);
                  u = o;
                  h = c;
                  break;
                case "importKey":
                  l = m(c);
                  u = b[3];
                  h = b[4];
                  if (i === "jwk") {
                    if (!(o = y(o)).alg) {
                      o.alg = g(l);
                    }
                    o.key_ops ||= o.kty !== "oct" ? "d" in o ? h.filter(x) : h.filter(E) : h.slice();
                    b[1] = v(o);
                  }
                  break;
                case "unwrapKey":
                  l = b[4];
                  u = b[5];
                  h = b[6];
                  b[2] = c._key;
              }
              if (e === "generateKey" && l.name === "HMAC" && l.hash) {
                l.length = l.length || {
                  "SHA-1": 512,
                  "SHA-256": 512,
                  "SHA-384": 1024,
                  "SHA-512": 1024
                }[l.hash.name];
                return n.importKey("raw", t.getRandomValues(new Uint8Array(l.length + 7 >> 3)), l, u, h);
              }
              if (s && e === "generateKey" && l.name === "RSASSA-PKCS1-v1_5" && (!l.modulusLength || l.modulusLength >= 2048)) {
                (i = m(i)).name = "RSAES-PKCS1-v1_5";
                delete i.hash;
                return n.generateKey(i, true, ["encrypt", "decrypt"]).then(function (e) {
                  return Promise.all([n.exportKey("jwk", e.publicKey), n.exportKey("jwk", e.privateKey)]);
                }).then(function (e) {
                  e[0].alg = e[1].alg = g(l);
                  e[0].key_ops = h.filter(E);
                  e[1].key_ops = h.filter(x);
                  return Promise.all([n.importKey("jwk", e[0], l, true, e[0].key_ops), n.importKey("jwk", e[1], l, u, e[1].key_ops)]);
                }).then(function (e) {
                  return {
                    publicKey: e[0],
                    privateKey: e[1]
                  };
                });
              }
              if ((s || a && (l.hash || {}).name === "SHA-1") && e === "importKey" && i === "jwk" && l.name === "HMAC" && o.kty === "oct") {
                return n.importKey("raw", p(d(o.k)), c, b[3], b[4]);
              }
              if (s && e === "importKey" && (i === "spki" || i === "pkcs8")) {
                return n.importKey("jwk", w(o), c, b[3], b[4]);
              }
              if (a && e === "unwrapKey") {
                return n.decrypt(b[3], c, o).then(function (e) {
                  return n.importKey(i, e, b[4], b[5], b[6]);
                });
              }
              try {
                f = r.apply(n, b);
              } catch (_) {
                return Promise.reject(_);
              }
              if (a) {
                f = new Promise(function (e, t) {
                  f.onabort = f.onerror = function (e) {
                    t(e);
                  };
                  f.oncomplete = function (t) {
                    e(t.target.result);
                  };
                });
              }
              return f = f.then(function (e) {
                if (l.name === "HMAC") {
                  l.length ||= e.algorithm.length * 8;
                }
                if (l.name.search("RSA") == 0) {
                  l.modulusLength ||= (e.publicKey || e).algorithm.modulusLength;
                  l.publicExponent ||= (e.publicKey || e).algorithm.publicExponent;
                }
                return e = e.publicKey && e.privateKey ? {
                  publicKey: new k(e.publicKey, l, u, h.filter(E)),
                  privateKey: new k(e.privateKey, l, u, h.filter(x))
                } : new k(e, l, u, h);
              });
            };
          });
          ["exportKey", "wrapKey"].forEach(function (e) {
            var t = n[e];
            n[e] = function (r, i, o) {
              var c;
              var l = [].slice.call(arguments);
              switch (e) {
                case "exportKey":
                  l[1] = i._key;
                  break;
                case "wrapKey":
                  l[1] = i._key;
                  l[2] = o._key;
              }
              if ((s || a && (i.algorithm.hash || {}).name === "SHA-1") && e === "exportKey" && r === "jwk" && i.algorithm.name === "HMAC") {
                l[0] = "raw";
              }
              if (!!s && e === "exportKey" && (r === "spki" || r === "pkcs8")) {
                l[0] = "jwk";
              }
              if (a && e === "wrapKey") {
                return n.exportKey(r, i).then(function (e) {
                  if (r === "jwk") {
                    e = p(unescape(encodeURIComponent(JSON.stringify(y(e)))));
                  }
                  return n.encrypt(l[3], o, e);
                });
              }
              try {
                c = t.apply(n, l);
              } catch (u) {
                return Promise.reject(u);
              }
              if (a) {
                c = new Promise(function (e, t) {
                  c.onabort = c.onerror = function (e) {
                    t(e);
                  };
                  c.oncomplete = function (t) {
                    e(t.target.result);
                  };
                });
              }
              if (e === "exportKey" && r === "jwk") {
                c = c.then(function (e) {
                  if ((s || a && (i.algorithm.hash || {}).name === "SHA-1") && i.algorithm.name === "HMAC") {
                    return {
                      kty: "oct",
                      alg: g(i.algorithm),
                      key_ops: i.usages.slice(),
                      ext: true,
                      k: h(f(e))
                    };
                  } else {
                    if (!(e = y(e)).alg) {
                      e.alg = g(i.algorithm);
                    }
                    e.key_ops ||= i.type === "public" ? i.usages.filter(E) : i.type === "private" ? i.usages.filter(x) : i.usages.slice();
                    return e;
                  }
                });
              }
              if (!!s && e === "exportKey" && (r === "spki" || r === "pkcs8")) {
                c = c.then(function (e) {
                  return e = b(y(e));
                });
              }
              return c;
            };
          });
          ["encrypt", "decrypt", "sign", "verify"].forEach(function (e) {
            var t = n[e];
            n[e] = function (r, i, o, s) {
              if (a && (!o.byteLength || s && !s.byteLength)) {
                throw new Error("Empty input is not allowed");
              }
              var c;
              var l = [].slice.call(arguments);
              var u = m(r);
              if (!!a && (e === "sign" || e === "verify") && (r === "RSASSA-PKCS1-v1_5" || r === "HMAC")) {
                l[0] = {
                  name: r
                };
              }
              if (a && i.algorithm.hash) {
                l[0].hash = l[0].hash || i.algorithm.hash;
              }
              if (a && e === "decrypt" && u.name === "AES-GCM") {
                var h = r.tagLength >> 3;
                l[2] = (o.buffer || o).slice(0, o.byteLength - h);
                r.tag = (o.buffer || o).slice(o.byteLength - h);
              }
              if (a && u.name === "AES-GCM" && l[0].tagLength === undefined) {
                l[0].tagLength = 128;
              }
              l[1] = i._key;
              try {
                c = t.apply(n, l);
              } catch (d) {
                return Promise.reject(d);
              }
              if (a) {
                c = new Promise(function (t, n) {
                  c.onabort = c.onerror = function (e) {
                    n(e);
                  };
                  c.oncomplete = function (n) {
                    n = n.target.result;
                    if (e === "encrypt" && n instanceof AesGcmEncryptResult) {
                      var r = n.ciphertext;
                      var i = n.tag;
                      (n = new Uint8Array(r.byteLength + i.byteLength)).set(new Uint8Array(r), 0);
                      n.set(new Uint8Array(i), r.byteLength);
                      n = n.buffer;
                    }
                    t(n);
                  };
                });
              }
              return c;
            };
          });
          if (a) {
            var u = n.digest;
            n.digest = function (e, t) {
              if (!t.byteLength) {
                throw new Error("Empty input is not allowed");
              }
              var r;
              try {
                r = u.call(n, e, t);
              } catch (i) {
                return Promise.reject(i);
              }
              r = new Promise(function (e, t) {
                r.onabort = r.onerror = function (e) {
                  t(e);
                };
                r.oncomplete = function (t) {
                  e(t.target.result);
                };
              });
              return r;
            };
            e.crypto = Object.create(t, {
              getRandomValues: {
                value: function (e) {
                  return t.getRandomValues(e);
                }
              },
              subtle: {
                value: n
              }
            });
            e.CryptoKey = k;
          }
          if (s) {
            t.subtle = n;
            e.Crypto = r;
            e.SubtleCrypto = i;
            e.CryptoKey = k;
          }
        }
      }
    }
    function h(e) {
      return btoa(e).replace(/\=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function d(e) {
      e = (e += "===").slice(0, -e.length % 4);
      return atob(e.replace(/-/g, "+").replace(/_/g, "/"));
    }
    function p(e) {
      var t = new Uint8Array(e.length);
      for (var n = 0; n < e.length; n++) {
        t[n] = e.charCodeAt(n);
      }
      return t;
    }
    function f(e) {
      if (e instanceof ArrayBuffer) {
        e = new Uint8Array(e);
      }
      return String.fromCharCode.apply(String, e);
    }
    function m(e) {
      var t = {
        name: (e.name || e || "").toUpperCase().replace("V", "v")
      };
      switch (t.name) {
        case "SHA-1":
        case "SHA-256":
        case "SHA-384":
        case "SHA-512":
          break;
        case "AES-CBC":
        case "AES-GCM":
        case "AES-KW":
          if (e.length) {
            t.length = e.length;
          }
          break;
        case "HMAC":
          if (e.hash) {
            t.hash = m(e.hash);
          }
          if (e.length) {
            t.length = e.length;
          }
          break;
        case "RSAES-PKCS1-v1_5":
          if (e.publicExponent) {
            t.publicExponent = new Uint8Array(e.publicExponent);
          }
          if (e.modulusLength) {
            t.modulusLength = e.modulusLength;
          }
          break;
        case "RSASSA-PKCS1-v1_5":
        case "RSA-OAEP":
          if (e.hash) {
            t.hash = m(e.hash);
          }
          if (e.publicExponent) {
            t.publicExponent = new Uint8Array(e.publicExponent);
          }
          if (e.modulusLength) {
            t.modulusLength = e.modulusLength;
          }
          break;
        default:
          throw new SyntaxError("Bad algorithm name");
      }
      return t;
    }
    function g(e) {
      return {
        HMAC: {
          "SHA-1": "HS1",
          "SHA-256": "HS256",
          "SHA-384": "HS384",
          "SHA-512": "HS512"
        },
        "RSASSA-PKCS1-v1_5": {
          "SHA-1": "RS1",
          "SHA-256": "RS256",
          "SHA-384": "RS384",
          "SHA-512": "RS512"
        },
        "RSAES-PKCS1-v1_5": {
          "": "RSA1_5"
        },
        "RSA-OAEP": {
          "SHA-1": "RSA-OAEP",
          "SHA-256": "RSA-OAEP-256"
        },
        "AES-KW": {
          128: "A128KW",
          192: "A192KW",
          256: "A256KW"
        },
        "AES-GCM": {
          128: "A128GCM",
          192: "A192GCM",
          256: "A256GCM"
        },
        "AES-CBC": {
          128: "A128CBC",
          192: "A192CBC",
          256: "A256CBC"
        }
      }[e.name][(e.hash || {}).name || e.length || ""];
    }
    function y(e) {
      if (e instanceof ArrayBuffer || e instanceof Uint8Array) {
        e = JSON.parse(decodeURIComponent(escape(f(e))));
      }
      var t = {
        kty: e.kty,
        alg: e.alg,
        ext: e.ext || e.extractable
      };
      switch (t.kty) {
        case "oct":
          t.k = e.k;
        case "RSA":
          ["n", "e", "d", "p", "q", "dp", "dq", "qi", "oth"].forEach(function (n) {
            if (n in e) {
              t[n] = e[n];
            }
          });
          break;
        default:
          throw new TypeError("Unsupported key type");
      }
      return t;
    }
    function v(e) {
      var t = y(e);
      if (a) {
        t.extractable = t.ext;
        delete t.ext;
      }
      return p(unescape(encodeURIComponent(JSON.stringify(t)))).buffer;
    }
    function w(e) {
      var t = _(e);
      var n = false;
      if (t.length > 2) {
        n = true;
        t.shift();
      }
      var r = {
        ext: true
      };
      if (t[0][0] !== "1.2.840.113549.1.1.1") {
        throw new TypeError("Unsupported key type");
      }
      var i = ["n", "e", "d", "p", "q", "dp", "dq", "qi"];
      var o = _(t[1]);
      if (n) {
        o.shift();
      }
      for (var a = 0; a < o.length; a++) {
        if (!o[a][0]) {
          o[a] = o[a].subarray(1);
        }
        r[i[a]] = h(f(o[a]));
      }
      r.kty = "RSA";
      return r;
    }
    function b(e) {
      var t;
      var n = [["", null]];
      var r = false;
      if (e.kty !== "RSA") {
        throw new TypeError("Unsupported key type");
      }
      for (var i = ["n", "e", "d", "p", "q", "dp", "dq", "qi"], o = [], a = 0; a < i.length && i[a] in e; a++) {
        var s = o[a] = p(d(e[i[a]]));
        if (s[0] & 128) {
          o[a] = new Uint8Array(s.length + 1);
          o[a].set(s, 1);
        }
      }
      if (o.length > 2) {
        r = true;
        o.unshift(new Uint8Array([0]));
      }
      n[0][0] = "1.2.840.113549.1.1.1";
      t = o;
      n.push(new Uint8Array(C(t)).buffer);
      if (r) {
        n.unshift(new Uint8Array([0]));
      } else {
        n[1] = {
          tag: 3,
          value: n[1]
        };
      }
      return new Uint8Array(C(n)).buffer;
    }
    function _(e, t) {
      if (e instanceof ArrayBuffer) {
        e = new Uint8Array(e);
      }
      t ||= {
        pos: 0,
        end: e.length
      };
      if (t.end - t.pos < 2 || t.end > e.length) {
        throw new RangeError("Malformed DER");
      }
      var n;
      var r = e[t.pos++];
      var i = e[t.pos++];
      if (i >= 128) {
        i &= 127;
        if (t.end - t.pos < i) {
          throw new RangeError("Malformed DER");
        }
        var o = 0;
        while (i--) {
          o <<= 8;
          o |= e[t.pos++];
        }
        i = o;
      }
      if (t.end - t.pos < i) {
        throw new RangeError("Malformed DER");
      }
      switch (r) {
        case 2:
          n = e.subarray(t.pos, t.pos += i);
          break;
        case 3:
          if (e[t.pos++]) {
            throw new Error("Unsupported bit string");
          }
          i--;
        case 4:
          n = new Uint8Array(e.subarray(t.pos, t.pos += i)).buffer;
          break;
        case 5:
          n = null;
          break;
        case 6:
          var a = btoa(f(e.subarray(t.pos, t.pos += i)));
          if (!(a in c)) {
            throw new Error("Unsupported OBJECT ID " + a);
          }
          n = c[a];
          break;
        case 48:
          n = [];
          for (var s = t.pos + i; t.pos < s;) {
            n.push(_(e, t));
          }
          break;
        default:
          throw new Error("Unsupported DER tag 0x" + r.toString(16));
      }
      return n;
    }
    function C(e, t) {
      t ||= [];
      var n = 0;
      var r = 0;
      var i = t.length + 2;
      t.push(0, 0);
      if (e instanceof Uint8Array) {
        n = 2;
        r = e.length;
        for (var o = 0; o < r; o++) {
          t.push(e[o]);
        }
      } else if (e instanceof ArrayBuffer) {
        n = 4;
        r = e.byteLength;
        e = new Uint8Array(e);
        for (o = 0; o < r; o++) {
          t.push(e[o]);
        }
      } else if (e === null) {
        n = 5;
        r = 0;
      } else if (typeof e == "string" && e in l) {
        var a = p(atob(l[e]));
        n = 6;
        r = a.length;
        for (o = 0; o < r; o++) {
          t.push(a[o]);
        }
      } else if (e instanceof Array) {
        for (o = 0; o < e.length; o++) {
          C(e[o], t);
        }
        n = 48;
        r = t.length - i;
      } else {
        if (typeof e != "object" || e.tag !== 3 || !(e.value instanceof ArrayBuffer)) {
          throw new Error("Unsupported DER value " + e);
        }
        n = 3;
        r = (e = new Uint8Array(e.value)).byteLength;
        t.push(0);
        for (o = 0; o < r; o++) {
          t.push(e[o]);
        }
        r++;
      }
      if (r >= 128) {
        var s = r;
        r = 4;
        for (t.splice(i, 0, s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, s & 255); r > 1 && !(s >> 24);) {
          s <<= 8;
          r--;
        }
        if (r < 4) {
          t.splice(i, 4 - r);
        }
        r |= 128;
      }
      t.splice(i - 2, 2, n, r);
      return t;
    }
    function k(e, t, n, r) {
      Object.defineProperties(this, {
        _key: {
          value: e
        },
        type: {
          value: e.type,
          enumerable: true
        },
        extractable: {
          value: n === undefined ? e.extractable : n,
          enumerable: true
        },
        algorithm: {
          value: t === undefined ? e.algorithm : t,
          enumerable: true
        },
        usages: {
          value: r === undefined ? e.usages : r,
          enumerable: true
        }
      });
    }
    function E(e) {
      return e === "verify" || e === "encrypt" || e === "wrapKey";
    }
    function x(e) {
      return e === "sign" || e === "decrypt" || e === "unwrapKey";
    }
  })(window);
  Array.prototype.indexOf ||= function (e) {
    return function (t, n) {
      if (this === null || this === undefined) {
        throw TypeError("Array.prototype.indexOf called on null or undefined");
      }
      var r = e(this);
      var i = r.length >>> 0;
      var o = Math.min(n | 0, i);
      if (o < 0) {
        o = Math.max(0, i + o);
      } else if (o >= i) {
        return -1;
      }
      if (t === undefined) {
        for (; o !== i; ++o) {
          if (r[o] === undefined && o in r) {
            return o;
          }
        }
      } else if (t != t) {
        for (; o !== i; ++o) {
          if (r[o] != r[o]) {
            return o;
          }
        }
      } else {
        for (; o !== i; ++o) {
          if (r[o] === t) {
            return o;
          }
        }
      }
      return -1;
    };
  }(Object);
  Array.isArray ||= function (e) {
    return Object.prototype.toString.call(e) === "[object Array]";
  };
  if (!document.getElementsByClassName) {
    window.Element.prototype.getElementsByClassName = document.constructor.prototype.getElementsByClassName = function (e) {
      if (document.querySelectorAll) {
        return document.querySelectorAll("." + e);
      }
      for (var t = document.getElementsByTagName("*"), n = new RegExp("(^|\\s)" + e + "(\\s|$)"), r = [], i = 0; i < t.length; i++) {
        if (n.test(t[i].className)) {
          r.push(t[i]);
        }
      }
      return r;
    };
  }
  String.prototype.startsWith ||= function (e, t) {
    return this.substr(!t || t < 0 ? 0 : +t, e.length) === e;
  };
  String.prototype.endsWith ||= function (e, t) {
    if (t === undefined || t > this.length) {
      t = this.length;
    }
    return this.substring(t - e.length, t) === e;
  };
  try {
    if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
      var M = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
      Object.defineProperty(Element.prototype, "textContent", {
        get: function () {
          return M.get.call(this);
        },
        set: function (e) {
          M.set.call(this, e);
        }
      });
    }
  } catch (zn) {}
  Function.prototype.bind ||= function (e) {
    if (typeof this != "function") {
      throw new TypeError("Function.prototype.bind: Item Can Not Be Bound.");
    }
    var t = Array.prototype.slice.call(arguments, 1);
    var n = this;
    function r() {}
    function i() {
      return n.apply(this instanceof r ? this : e, t.concat(Array.prototype.slice.call(arguments)));
    }
    if (this.prototype) {
      r.prototype = this.prototype;
    }
    i.prototype = new r();
    return i;
  };
  if (typeof Object.create != "function") {
    Object.create = function (e, t) {
      function n() {}
      n.prototype = e;
      if (typeof t == "object") {
        for (var r in t) {
          if (t.hasOwnProperty(r)) {
            n[r] = t[r];
          }
        }
      }
      return new n();
    };
  }
  Date.now ||= function () {
    return new Date().getTime();
  };
  window.console ||= {};
  var O;
  var P;
  var W;
  var N;
  var A = ["error", "info", "log", "show", "table", "trace", "warn"];
  var j = function (e) {};
  for (var F = A.length; --F > -1;) {
    k = A[F];
    window.console[k] ||= j;
  }
  if (window.atob) {
    try {
      window.atob(" ");
    } catch (Kn) {
      window.atob = function (e) {
        function t(t) {
          return e(String(t).replace(/[\t\n\f\r ]+/g, ""));
        }
        t.original = e;
        return t;
      }(window.atob);
    }
  } else {
    var B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var I = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
    window.atob = function (e) {
      e = String(e).replace(/[\t\n\f\r ]+/g, "");
      if (!I.test(e)) {
        throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
      }
      var t;
      var n;
      var r;
      e += "==".slice(2 - (e.length & 3));
      var i = "";
      for (var o = 0; o < e.length;) {
        t = B.indexOf(e.charAt(o++)) << 18 | B.indexOf(e.charAt(o++)) << 12 | (n = B.indexOf(e.charAt(o++))) << 6 | (r = B.indexOf(e.charAt(o++)));
        i += n === 64 ? String.fromCharCode(t >> 16 & 255) : r === 64 ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, t & 255);
      }
      return i;
    };
  }
  Event.prototype.preventDefault ||= function () {
    this.returnValue = false;
  };
  Event.prototype.stopPropagation ||= function () {
    this.cancelBubble = true;
  };
  if (window.Prototype && Array.prototype.toJSON) {
    console.error("[hCaptcha] Custom JSON polyfill detected, please remove to ensure hCaptcha works properly");
    var Z = Array.prototype.toJSON;
    var D = JSON.stringify;
    JSON.stringify = function (e) {
      try {
        delete Array.prototype.toJSON;
        return D(e);
      } finally {
        Array.prototype.toJSON = Z;
      }
    };
  }
  if (!Object.keys) {
    O = Object.prototype.hasOwnProperty;
    P = !Object.prototype.propertyIsEnumerable.call({
      toString: null
    }, "toString");
    N = (W = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length;
    Object.keys = function (e) {
      if (typeof e != "function" && (typeof e != "object" || e === null)) {
        throw new TypeError("Object.keys called on non-object");
      }
      var t;
      var n;
      var r = [];
      for (t in e) {
        if (O.call(e, t)) {
          r.push(t);
        }
      }
      if (P) {
        for (n = 0; n < N; n++) {
          if (O.call(e, W[n])) {
            r.push(W[n]);
          }
        }
      }
      return r;
    };
  }
  (function (e) {
    if (typeof exports == "object" && typeof module != "undefined") {
      module.exports = e();
    } else if (typeof define == "function" && define.amd) {
      define("raven-js", e);
    } else {
      (typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this).Raven = e();
    }
  })(function () {
    return function e(t, n, r) {
      function i(a, s) {
        if (!n[a]) {
          if (!t[a]) {
            var c = typeof require == "function" && require;
            if (!s && c) {
              return c(a, true);
            }
            if (o) {
              return o(a, true);
            }
            var l = new Error("Cannot find module '" + a + "'");
            l.code = "MODULE_NOT_FOUND";
            throw l;
          }
          var u = n[a] = {
            exports: {}
          };
          t[a][0].call(u.exports, function (e) {
            var n = t[a][1][e];
            return i(n || e);
          }, u, u.exports, e, t, n, r);
        }
        return n[a].exports;
      }
      var o = typeof require == "function" && require;
      for (var a = 0; a < r.length; a++) {
        i(r[a]);
      }
      return i;
    }({
      1: [function (e, t, n) {
        function r(e) {
          this.name = "RavenConfigError";
          this.message = e;
        }
        r.prototype = new Error();
        r.prototype.constructor = r;
        t.exports = r;
      }, {}],
      2: [function (e, t, n) {
        var r = e(5);
        t.exports = {
          wrapMethod: function (e, t, n) {
            var i = e[t];
            var o = e;
            if (t in e) {
              var a = t === "warn" ? "warning" : t;
              e[t] = function () {
                var e = [].slice.call(arguments);
                var s = r.safeJoin(e, " ");
                var c = {
                  level: a,
                  logger: "console",
                  extra: {
                    arguments: e
                  }
                };
                if (t === "assert") {
                  if (e[0] === false) {
                    s = "Assertion failed: " + (r.safeJoin(e.slice(1), " ") || "console.assert");
                    c.extra.arguments = e.slice(1);
                    if (n) {
                      n(s, c);
                    }
                  }
                } else if (n) {
                  n(s, c);
                }
                if (i) {
                  Function.prototype.apply.call(i, o, e);
                }
              };
            }
          }
        };
      }, {
        5: 5
      }],
      3: [function (e, t, n) {
        (function (n) {
          function r() {
            return +new Date();
          }
          function i(e, t) {
            if (v(t)) {
              return function (n) {
                return t(n, e);
              };
            } else {
              return t;
            }
          }
          function o() {
            this.a = typeof JSON == "object" && !!JSON.stringify;
            this.b = !y(K);
            this.c = !y(L);
            this.d = null;
            this.e = null;
            this.f = null;
            this.g = null;
            this.h = null;
            this.i = null;
            this.j = {};
            this.k = {
              release: z.SENTRY_RELEASE && z.SENTRY_RELEASE.id,
              logger: "javascript",
              ignoreErrors: [],
              ignoreUrls: [],
              whitelistUrls: [],
              includePaths: [],
              headers: null,
              collectWindowErrors: true,
              captureUnhandledRejections: true,
              maxMessageLength: 0,
              maxUrlLength: 250,
              stackTraceLimit: 50,
              autoBreadcrumbs: true,
              instrument: true,
              sampleRate: 1,
              sanitizeKeys: []
            };
            this.l = {
              method: "POST",
              referrerPolicy: A() ? "origin" : ""
            };
            this.m = 0;
            this.n = false;
            this.o = Error.stackTraceLimit;
            this.p = z.console || {};
            this.q = {};
            this.r = [];
            this.s = r();
            this.t = [];
            this.u = [];
            this.v = null;
            this.w = z.location;
            this.x = this.w && this.w.href;
            this.y();
            for (var e in this.p) {
              this.q[e] = this.p[e];
            }
          }
          var a = e(6);
          var s = e(7);
          var c = e(8);
          var l = e(1);
          var u = e(5);
          var h = u.isErrorEvent;
          var d = u.isDOMError;
          var p = u.isDOMException;
          var f = u.isError;
          var m = u.isObject;
          var g = u.isPlainObject;
          var y = u.isUndefined;
          var v = u.isFunction;
          var w = u.isString;
          var b = u.isArray;
          var _ = u.isEmptyObject;
          var C = u.each;
          var k = u.objectMerge;
          var E = u.truncate;
          var x = u.objectFrozen;
          var V = u.hasKey;
          var S = u.joinRegExp;
          var T = u.urlencode;
          var R = u.uuid4;
          var U = u.htmlTreeAsString;
          var M = u.isSameException;
          var O = u.isSameStacktrace;
          var P = u.parseUrl;
          var W = u.fill;
          var N = u.supportsFetch;
          var A = u.supportsReferrerPolicy;
          var j = u.serializeKeysForMessage;
          var F = u.serializeException;
          var B = u.sanitize;
          var I = e(2).wrapMethod;
          var Z = "source protocol user pass host port path".split(" ");
          var D = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;
          var z = typeof window != "undefined" ? window : n !== undefined ? n : typeof self != "undefined" ? self : {};
          var K = z.document;
          var L = z.navigator;
          o.prototype = {
            VERSION: "3.27.2",
            debug: false,
            TraceKit: a,
            config: function (e, t) {
              var n = this;
              if (n.g) {
                this.z("error", "Error: Raven has already been configured");
                return n;
              }
              if (!e) {
                return n;
              }
              var r = n.k;
              if (t) {
                C(t, function (e, t) {
                  if (e === "tags" || e === "extra" || e === "user") {
                    n.j[e] = t;
                  } else {
                    r[e] = t;
                  }
                });
              }
              n.setDSN(e);
              r.ignoreErrors.push(/^Script error\.?$/);
              r.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/);
              r.ignoreErrors = S(r.ignoreErrors);
              r.ignoreUrls = !!r.ignoreUrls.length && S(r.ignoreUrls);
              r.whitelistUrls = !!r.whitelistUrls.length && S(r.whitelistUrls);
              r.includePaths = S(r.includePaths);
              r.maxBreadcrumbs = Math.max(0, Math.min(r.maxBreadcrumbs || 100, 100));
              var i = {
                xhr: true,
                console: true,
                dom: true,
                location: true,
                sentry: true
              };
              var o = r.autoBreadcrumbs;
              if ({}.toString.call(o) === "[object Object]") {
                o = k(i, o);
              } else if (o !== false) {
                o = i;
              }
              r.autoBreadcrumbs = o;
              var s = {
                tryCatch: true
              };
              var c = r.instrument;
              if ({}.toString.call(c) === "[object Object]") {
                c = k(s, c);
              } else if (c !== false) {
                c = s;
              }
              r.instrument = c;
              a.collectWindowErrors = !!r.collectWindowErrors;
              return n;
            },
            install: function () {
              var e = this;
              if (e.isSetup() && !e.n) {
                a.report.subscribe(function () {
                  e.A.apply(e, arguments);
                });
                if (e.k.captureUnhandledRejections) {
                  e.B();
                }
                e.C();
                if (e.k.instrument && e.k.instrument.tryCatch) {
                  e.D();
                }
                if (e.k.autoBreadcrumbs) {
                  e.E();
                }
                e.F();
                e.n = true;
              }
              Error.stackTraceLimit = e.k.stackTraceLimit;
              return this;
            },
            setDSN: function (e) {
              var t = this;
              var n = t.G(e);
              var r = n.path.lastIndexOf("/");
              var i = n.path.substr(1, r);
              t.H = e;
              t.h = n.user;
              t.I = n.pass && n.pass.substr(1);
              t.i = n.path.substr(r + 1);
              t.g = t.J(n);
              t.K = t.g + "/" + i + "api/" + t.i + "/store/";
              this.y();
            },
            context: function (e, t, n) {
              if (v(e)) {
                n = t || [];
                t = e;
                e = {};
              }
              return this.wrap(e, t).apply(this, n);
            },
            wrap: function (e, t, n) {
              function r() {
                var r = [];
                var o = arguments.length;
                var a = !e || e && e.deep !== false;
                for (n && v(n) && n.apply(this, arguments); o--;) {
                  r[o] = a ? i.wrap(e, arguments[o]) : arguments[o];
                }
                try {
                  return t.apply(this, r);
                } catch (s) {
                  i.L();
                  i.captureException(s, e);
                  throw s;
                }
              }
              var i = this;
              if (y(t) && !v(e)) {
                return e;
              }
              if (v(e)) {
                t = e;
                e = undefined;
              }
              if (!v(t)) {
                return t;
              }
              try {
                if (t.M) {
                  return t;
                }
                if (t.N) {
                  return t.N;
                }
              } catch (o) {
                return t;
              }
              for (var a in t) {
                if (V(t, a)) {
                  r[a] = t[a];
                }
              }
              r.prototype = t.prototype;
              t.N = r;
              r.M = true;
              r.O = t;
              return r;
            },
            uninstall: function () {
              a.report.uninstall();
              this.P();
              this.Q();
              this.R();
              this.S();
              Error.stackTraceLimit = this.o;
              this.n = false;
              return this;
            },
            T: function (e) {
              this.z("debug", "Raven caught unhandled promise rejection:", e);
              this.captureException(e.reason, {
                mechanism: {
                  type: "onunhandledrejection",
                  handled: false
                }
              });
            },
            B: function () {
              this.T = this.T.bind(this);
              if (z.addEventListener) {
                z.addEventListener("unhandledrejection", this.T);
              }
              return this;
            },
            P: function () {
              if (z.removeEventListener) {
                z.removeEventListener("unhandledrejection", this.T);
              }
              return this;
            },
            captureException: function (e, t) {
              t = k({
                trimHeadFrames: 0
              }, t || {});
              if (h(e) && e.error) {
                e = e.error;
              } else {
                if (d(e) || p(e)) {
                  var n = e.name || (d(e) ? "DOMError" : "DOMException");
                  var r = e.message ? n + ": " + e.message : n;
                  return this.captureMessage(r, k(t, {
                    stacktrace: true,
                    trimHeadFrames: t.trimHeadFrames + 1
                  }));
                }
                if (f(e)) {
                  e = e;
                } else {
                  if (!g(e)) {
                    return this.captureMessage(e, k(t, {
                      stacktrace: true,
                      trimHeadFrames: t.trimHeadFrames + 1
                    }));
                  }
                  t = this.U(t, e);
                  e = new Error(t.message);
                }
              }
              this.d = e;
              try {
                var i = a.computeStackTrace(e);
                this.V(i, t);
              } catch (o) {
                if (e !== o) {
                  throw o;
                }
              }
              return this;
            },
            U: function (e, t) {
              var n = Object.keys(t).sort();
              var r = k(e, {
                message: "Non-Error exception captured with keys: " + j(n),
                fingerprint: [c(n)],
                extra: e.extra || {}
              });
              r.extra.W = F(t);
              return r;
            },
            captureMessage: function (e, t) {
              if (!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(e)) {
                var n;
                var r = k({
                  message: e += ""
                }, t = t || {});
                try {
                  throw new Error(e);
                } catch (i) {
                  n = i;
                }
                n.name = null;
                var o = a.computeStackTrace(n);
                var s = b(o.stack) && o.stack[1];
                if (s && s.func === "Raven.captureException") {
                  s = o.stack[2];
                }
                var c = s && s.url || "";
                if ((!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(c)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(c))) {
                  if (this.k.stacktrace || t.stacktrace || r.message === "") {
                    r.fingerprint = r.fingerprint == null ? e : r.fingerprint;
                    (t = k({
                      trimHeadFrames: 0
                    }, t)).trimHeadFrames += 1;
                    var l = this.X(o, t);
                    r.stacktrace = {
                      frames: l.reverse()
                    };
                  }
                  r.fingerprint &&= b(r.fingerprint) ? r.fingerprint : [r.fingerprint];
                  this.Y(r);
                  return this;
                }
              }
            },
            captureBreadcrumb: function (e) {
              var t = k({
                timestamp: r() / 1000
              }, e);
              if (v(this.k.breadcrumbCallback)) {
                var n = this.k.breadcrumbCallback(t);
                if (m(n) && !_(n)) {
                  t = n;
                } else if (n === false) {
                  return this;
                }
              }
              this.u.push(t);
              if (this.u.length > this.k.maxBreadcrumbs) {
                this.u.shift();
              }
              return this;
            },
            addPlugin: function (e) {
              var t = [].slice.call(arguments, 1);
              this.r.push([e, t]);
              if (this.n) {
                this.F();
              }
              return this;
            },
            setUserContext: function (e) {
              this.j.user = e;
              return this;
            },
            setExtraContext: function (e) {
              this.Z("extra", e);
              return this;
            },
            setTagsContext: function (e) {
              this.Z("tags", e);
              return this;
            },
            clearContext: function () {
              this.j = {};
              return this;
            },
            getContext: function () {
              return JSON.parse(s(this.j));
            },
            setEnvironment: function (e) {
              this.k.environment = e;
              return this;
            },
            setRelease: function (e) {
              this.k.release = e;
              return this;
            },
            setDataCallback: function (e) {
              var t = this.k.dataCallback;
              this.k.dataCallback = i(t, e);
              return this;
            },
            setBreadcrumbCallback: function (e) {
              var t = this.k.breadcrumbCallback;
              this.k.breadcrumbCallback = i(t, e);
              return this;
            },
            setShouldSendCallback: function (e) {
              var t = this.k.shouldSendCallback;
              this.k.shouldSendCallback = i(t, e);
              return this;
            },
            setTransport: function (e) {
              this.k.transport = e;
              return this;
            },
            lastException: function () {
              return this.d;
            },
            lastEventId: function () {
              return this.f;
            },
            isSetup: function () {
              return !!this.a && (!!this.g || !(this.ravenNotConfiguredError || (this.ravenNotConfiguredError = true, this.z("error", "Error: Raven has not been configured.")), 1));
            },
            afterLoad: function () {
              var e = z.RavenConfig;
              if (e) {
                this.config(e.dsn, e.config).install();
              }
            },
            showReportDialog: function (e) {
              if (K) {
                if (!(e = k({
                  eventId: this.lastEventId(),
                  dsn: this.H,
                  user: this.j.user || {}
                }, e)).eventId) {
                  throw new l("Missing eventId");
                }
                if (!e.dsn) {
                  throw new l("Missing DSN");
                }
                var t = encodeURIComponent;
                var n = [];
                for (var r in e) {
                  if (r === "user") {
                    var i = e.user;
                    if (i.name) {
                      n.push("name=" + t(i.name));
                    }
                    if (i.email) {
                      n.push("email=" + t(i.email));
                    }
                  } else {
                    n.push(t(r) + "=" + t(e[r]));
                  }
                }
                var o = this.J(this.G(e.dsn));
                var a = K.createElement("script");
                a.async = true;
                a.src = o + "/api/embed/error-page/?" + n.join("&");
                (K.head || K.body).appendChild(a);
              }
            },
            L: function () {
              var e = this;
              this.m += 1;
              setTimeout(function () {
                e.m -= 1;
              });
            },
            $: function (e, t) {
              var n;
              var r;
              if (this.b) {
                t = t || {};
                e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1);
                if (K.createEvent) {
                  (n = K.createEvent("HTMLEvents")).initEvent(e, true, true);
                } else {
                  (n = K.createEventObject()).eventType = e;
                }
                for (r in t) {
                  if (V(t, r)) {
                    n[r] = t[r];
                  }
                }
                if (K.createEvent) {
                  K.dispatchEvent(n);
                } else {
                  try {
                    K.fireEvent("on" + n.eventType.toLowerCase(), n);
                  } catch (i) {}
                }
              }
            },
            _: function (e) {
              var t = this;
              return function (n) {
                t.aa = null;
                if (t.v !== n) {
                  var r;
                  t.v = n;
                  try {
                    r = U(n.target);
                  } catch (i) {
                    r = "<unknown>";
                  }
                  t.captureBreadcrumb({
                    category: "ui." + e,
                    message: r
                  });
                }
              };
            },
            ba: function () {
              var e = this;
              return function (t) {
                var n;
                try {
                  n = t.target;
                } catch (i) {
                  return;
                }
                var r = n && n.tagName;
                if (r && (r === "INPUT" || r === "TEXTAREA" || n.isContentEditable)) {
                  var o = e.aa;
                  if (!o) {
                    e._("input")(t);
                  }
                  clearTimeout(o);
                  e.aa = setTimeout(function () {
                    e.aa = null;
                  }, 1000);
                }
              };
            },
            ca: function (e, t) {
              var n = P(this.w.href);
              var r = P(t);
              var i = P(e);
              this.x = t;
              if (n.protocol === r.protocol && n.host === r.host) {
                t = r.relative;
              }
              if (n.protocol === i.protocol && n.host === i.host) {
                e = i.relative;
              }
              this.captureBreadcrumb({
                category: "navigation",
                data: {
                  to: t,
                  from: e
                }
              });
            },
            C: function () {
              var e = this;
              e.da = Function.prototype.toString;
              Function.prototype.toString = function () {
                if (typeof this == "function" && this.M) {
                  return e.da.apply(this.O, arguments);
                } else {
                  return e.da.apply(this, arguments);
                }
              };
            },
            Q: function () {
              if (this.da) {
                Function.prototype.toString = this.da;
              }
            },
            D: function () {
              function e(e) {
                return function (t, r) {
                  for (var i = new Array(arguments.length), o = 0; o < i.length; ++o) {
                    i[o] = arguments[o];
                  }
                  var a = i[0];
                  if (v(a)) {
                    i[0] = n.wrap({
                      mechanism: {
                        type: "instrument",
                        data: {
                          function: e.name || "<anonymous>"
                        }
                      }
                    }, a);
                  }
                  if (e.apply) {
                    return e.apply(this, i);
                  } else {
                    return e(i[0], i[1]);
                  }
                };
              }
              function t(e) {
                var t = z[e] && z[e].prototype;
                if (t && t.hasOwnProperty && t.hasOwnProperty("addEventListener")) {
                  W(t, "addEventListener", function (t) {
                    return function (r, o, a, s) {
                      try {
                        if (o && o.handleEvent) {
                          o.handleEvent = n.wrap({
                            mechanism: {
                              type: "instrument",
                              data: {
                                target: e,
                                function: "handleEvent",
                                handler: o && o.name || "<anonymous>"
                              }
                            }
                          }, o.handleEvent);
                        }
                      } catch (c) {}
                      var l;
                      var u;
                      var h;
                      if (i && i.dom && (e === "EventTarget" || e === "Node")) {
                        u = n._("click");
                        h = n.ba();
                        l = function (e) {
                          if (e) {
                            var t;
                            try {
                              t = e.type;
                            } catch (n) {
                              return;
                            }
                            if (t === "click") {
                              return u(e);
                            } else if (t === "keypress") {
                              return h(e);
                            } else {
                              return undefined;
                            }
                          }
                        };
                      }
                      return t.call(this, r, n.wrap({
                        mechanism: {
                          type: "instrument",
                          data: {
                            target: e,
                            function: "addEventListener",
                            handler: o && o.name || "<anonymous>"
                          }
                        }
                      }, o, l), a, s);
                    };
                  }, r);
                  W(t, "removeEventListener", function (e) {
                    return function (t, n, r, i) {
                      try {
                        n = n && (n.N ? n.N : n);
                      } catch (o) {}
                      return e.call(this, t, n, r, i);
                    };
                  }, r);
                }
              }
              var n = this;
              var r = n.t;
              var i = this.k.autoBreadcrumbs;
              W(z, "setTimeout", e, r);
              W(z, "setInterval", e, r);
              if (z.requestAnimationFrame) {
                W(z, "requestAnimationFrame", function (e) {
                  return function (t) {
                    return e(n.wrap({
                      mechanism: {
                        type: "instrument",
                        data: {
                          function: "requestAnimationFrame",
                          handler: e && e.name || "<anonymous>"
                        }
                      }
                    }, t));
                  };
                }, r);
              }
              for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], a = 0; a < o.length; a++) {
                t(o[a]);
              }
            },
            E: function () {
              function e(e, n) {
                if (e in n && v(n[e])) {
                  W(n, e, function (n) {
                    return t.wrap({
                      mechanism: {
                        type: "instrument",
                        data: {
                          function: e,
                          handler: n && n.name || "<anonymous>"
                        }
                      }
                    }, n);
                  });
                }
              }
              var t = this;
              var n = this.k.autoBreadcrumbs;
              var r = t.t;
              if (n.xhr && "XMLHttpRequest" in z) {
                var i = z.XMLHttpRequest && z.XMLHttpRequest.prototype;
                W(i, "open", function (e) {
                  return function (n, r) {
                    if (w(r) && r.indexOf(t.h) === -1) {
                      this.ea = {
                        method: n,
                        url: r,
                        status_code: null
                      };
                    }
                    return e.apply(this, arguments);
                  };
                }, r);
                W(i, "send", function (n) {
                  return function () {
                    function r() {
                      if (i.ea && i.readyState === 4) {
                        try {
                          i.ea.status_code = i.status;
                        } catch (e) {}
                        t.captureBreadcrumb({
                          type: "http",
                          category: "xhr",
                          data: i.ea
                        });
                      }
                    }
                    var i = this;
                    for (var o = ["onload", "onerror", "onprogress"], a = 0; a < o.length; a++) {
                      e(o[a], i);
                    }
                    if ("onreadystatechange" in i && v(i.onreadystatechange)) {
                      W(i, "onreadystatechange", function (e) {
                        return t.wrap({
                          mechanism: {
                            type: "instrument",
                            data: {
                              function: "onreadystatechange",
                              handler: e && e.name || "<anonymous>"
                            }
                          }
                        }, e, r);
                      });
                    } else {
                      i.onreadystatechange = r;
                    }
                    return n.apply(this, arguments);
                  };
                }, r);
              }
              if (n.xhr && N()) {
                W(z, "fetch", function (e) {
                  return function () {
                    for (var n = new Array(arguments.length), r = 0; r < n.length; ++r) {
                      n[r] = arguments[r];
                    }
                    var i;
                    var o = n[0];
                    var a = "GET";
                    if (typeof o == "string") {
                      i = o;
                    } else if ("Request" in z && o instanceof z.Request) {
                      i = o.url;
                      if (o.method) {
                        a = o.method;
                      }
                    } else {
                      i = "" + o;
                    }
                    if (i.indexOf(t.h) !== -1) {
                      return e.apply(this, n);
                    }
                    if (n[1] && n[1].method) {
                      a = n[1].method;
                    }
                    var s = {
                      method: a,
                      url: i,
                      status_code: null
                    };
                    return e.apply(this, n).then(function (e) {
                      s.status_code = e.status;
                      t.captureBreadcrumb({
                        type: "http",
                        category: "fetch",
                        data: s
                      });
                      return e;
                    }).catch(function (e) {
                      t.captureBreadcrumb({
                        type: "http",
                        category: "fetch",
                        data: s,
                        level: "error"
                      });
                      throw e;
                    });
                  };
                }, r);
              }
              if (n.dom && this.b) {
                if (K.addEventListener) {
                  K.addEventListener("click", t._("click"), false);
                  K.addEventListener("keypress", t.ba(), false);
                } else if (K.attachEvent) {
                  K.attachEvent("onclick", t._("click"));
                  K.attachEvent("onkeypress", t.ba());
                }
              }
              var o = z.chrome;
              var a = (!o || !o.app || !o.app.runtime) && z.history && z.history.pushState && z.history.replaceState;
              if (n.location && a) {
                var s = z.onpopstate;
                z.onpopstate = function () {
                  var e = t.w.href;
                  t.ca(t.x, e);
                  if (s) {
                    return s.apply(this, arguments);
                  }
                };
                function c(e) {
                  return function (_param, _param2, n) {
                    if (n) {
                      t.ca(t.x, n + "");
                    }
                    return e.apply(this, arguments);
                  };
                }
                W(z.history, "pushState", c, r);
                W(z.history, "replaceState", c, r);
              }
              if (n.console && "console" in z && console.log) {
                function l(e, n) {
                  t.captureBreadcrumb({
                    message: e,
                    level: n.level,
                    category: "console"
                  });
                }
                C(["debug", "info", "warn", "error", "log"], function (e, t) {
                  I(console, t, l);
                });
              }
            },
            R: function () {
              var e;
              while (this.t.length) {
                var t = (e = this.t.shift())[0];
                var n = e[1];
                var r = e[2];
                t[n] = r;
              }
            },
            S: function () {
              for (var e in this.q) {
                this.p[e] = this.q[e];
              }
            },
            F: function () {
              var e = this;
              C(this.r, function (t, n) {
                var r = n[0];
                var i = n[1];
                r.apply(e, [e].concat(i));
              });
            },
            G: function (e) {
              var t = D.exec(e);
              var n = {};
              var r = 7;
              try {
                while (r--) {
                  n[Z[r]] = t[r] || "";
                }
              } catch (i) {
                throw new l("Invalid DSN: " + e);
              }
              if (n.pass && !this.k.allowSecretKey) {
                throw new l("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
              }
              return n;
            },
            J: function (e) {
              var t = "//" + e.host + (e.port ? ":" + e.port : "");
              if (e.protocol) {
                t = e.protocol + ":" + t;
              }
              return t;
            },
            A: function (e, t) {
              (t = t || {}).mechanism = t.mechanism || {
                type: "onerror",
                handled: false
              };
              if (!this.m) {
                this.V(e, t);
              }
            },
            V: function (e, t) {
              var n = this.X(e, t);
              this.$("handle", {
                stackInfo: e,
                options: t
              });
              this.fa(e.name, e.message, e.url, e.lineno, n, t);
            },
            X: function (e, t) {
              var n = this;
              var r = [];
              if (e.stack && e.stack.length && (C(e.stack, function (t, i) {
                var o = n.ga(i, e.url);
                if (o) {
                  r.push(o);
                }
              }), t && t.trimHeadFrames)) {
                for (var i = 0; i < t.trimHeadFrames && i < r.length; i++) {
                  r[i].in_app = false;
                }
              }
              return r = r.slice(0, this.k.stackTraceLimit);
            },
            ga: function (e, t) {
              var n = {
                filename: e.url,
                lineno: e.line,
                colno: e.column,
                function: e.func || "?"
              };
              if (!e.url) {
                n.filename = t;
              }
              n.in_app = (!this.k.includePaths.test || !!this.k.includePaths.test(n.filename)) && !/(Raven|TraceKit)\./.test(n.function) && !/raven\.(min\.)?js$/.test(n.filename);
              return n;
            },
            fa: function (e, t, n, r, i, o) {
              var a;
              var s = (e ? e + ": " : "") + (t || "");
              if ((!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(t) && !this.k.ignoreErrors.test(s)) && (i && i.length ? (n = i[0].filename || n, i.reverse(), a = {
                frames: i
              }) : n && (a = {
                frames: [{
                  filename: n,
                  lineno: r,
                  in_app: true
                }]
              }), (!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(n)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(n)))) {
                var c = k({
                  exception: {
                    values: [{
                      type: e,
                      value: t,
                      stacktrace: a
                    }]
                  },
                  transaction: n
                }, o);
                var l = c.exception.values[0];
                if (l.type == null && l.value === "") {
                  l.value = "Unrecoverable error caught";
                }
                if (!c.exception.mechanism && c.mechanism) {
                  c.exception.mechanism = c.mechanism;
                  delete c.mechanism;
                }
                c.exception.mechanism = k({
                  type: "generic",
                  handled: true
                }, c.exception.mechanism || {});
                this.Y(c);
              }
            },
            ha: function (e) {
              var t = this.k.maxMessageLength;
              e.message &&= E(e.message, t);
              if (e.exception) {
                var n = e.exception.values[0];
                n.value = E(n.value, t);
              }
              var r = e.request;
              if (r) {
                r.url &&= E(r.url, this.k.maxUrlLength);
                r.Referer &&= E(r.Referer, this.k.maxUrlLength);
              }
              if (e.breadcrumbs && e.breadcrumbs.values) {
                this.ia(e.breadcrumbs);
              }
              return e;
            },
            ia: function (e) {
              var t;
              var n;
              var r;
              var i = ["to", "from", "url"];
              for (var o = 0; o < e.values.length; ++o) {
                if ((n = e.values[o]).hasOwnProperty("data") && m(n.data) && !x(n.data)) {
                  r = k({}, n.data);
                  for (var a = 0; a < i.length; ++a) {
                    t = i[a];
                    if (r.hasOwnProperty(t) && r[t]) {
                      r[t] = E(r[t], this.k.maxUrlLength);
                    }
                  }
                  e.values[o].data = r;
                }
              }
            },
            ja: function () {
              if (this.c || this.b) {
                var e = {};
                if (this.c && L.userAgent) {
                  e.headers = {
                    "User-Agent": L.userAgent
                  };
                }
                if (z.location && z.location.href) {
                  e.url = z.location.href;
                }
                if (this.b && K.referrer) {
                  e.headers ||= {};
                  e.headers.Referer = K.referrer;
                }
                return e;
              }
            },
            y: function () {
              this.ka = 0;
              this.la = null;
            },
            ma: function () {
              return this.ka && r() - this.la < this.ka;
            },
            na: function (e) {
              var t = this.e;
              return !!t && e.message === t.message && e.transaction === t.transaction && (e.stacktrace || t.stacktrace ? O(e.stacktrace, t.stacktrace) : e.exception || t.exception ? M(e.exception, t.exception) : !e.fingerprint && !t.fingerprint || Boolean(e.fingerprint && t.fingerprint) && JSON.stringify(e.fingerprint) === JSON.stringify(t.fingerprint));
            },
            oa: function (e) {
              if (!this.ma()) {
                var t = e.status;
                if (t === 400 || t === 401 || t === 429) {
                  var n;
                  try {
                    n = N() ? e.headers.get("Retry-After") : e.getResponseHeader("Retry-After");
                    n = parseInt(n, 10) * 1000;
                  } catch (i) {}
                  this.ka = n || this.ka * 2 || 1000;
                  this.la = r();
                }
              }
            },
            Y: function (e) {
              var t = this.k;
              var n = {
                project: this.i,
                logger: t.logger,
                platform: "javascript"
              };
              var i = this.ja();
              if (i) {
                n.request = i;
              }
              if (e.trimHeadFrames) {
                delete e.trimHeadFrames;
              }
              (e = k(n, e)).tags = k(k({}, this.j.tags), e.tags);
              e.extra = k(k({}, this.j.extra), e.extra);
              e.extra["session:duration"] = r() - this.s;
              if (this.u && this.u.length > 0) {
                e.breadcrumbs = {
                  values: [].slice.call(this.u, 0)
                };
              }
              if (this.j.user) {
                e.user = this.j.user;
              }
              if (t.environment) {
                e.environment = t.environment;
              }
              if (t.release) {
                e.release = t.release;
              }
              if (t.serverName) {
                e.server_name = t.serverName;
              }
              e = this.pa(e);
              Object.keys(e).forEach(function (t) {
                if (e[t] == null || e[t] === "" || _(e[t])) {
                  delete e[t];
                }
              });
              if (v(t.dataCallback)) {
                e = t.dataCallback(e) || e;
              }
              if (e && !_(e) && (!v(t.shouldSendCallback) || t.shouldSendCallback(e))) {
                if (this.ma()) {
                  this.z("warn", "Raven dropped error due to backoff: ", e);
                  return;
                } else {
                  if (typeof t.sampleRate == "number") {
                    if (Math.random() < t.sampleRate) {
                      this.qa(e);
                    }
                  } else {
                    this.qa(e);
                  }
                  return;
                }
              }
            },
            pa: function (e) {
              return B(e, this.k.sanitizeKeys);
            },
            ra: function () {
              return R();
            },
            qa: function (e, t) {
              var n = this;
              var r = this.k;
              if (this.isSetup()) {
                e = this.ha(e);
                if (!this.k.allowDuplicates && this.na(e)) {
                  this.z("warn", "Raven dropped repeat event: ", e);
                  return;
                }
                this.f = e.event_id ||= this.ra();
                this.e = e;
                this.z("debug", "Raven about to send:", e);
                var i = {
                  sentry_version: "7",
                  sentry_client: "raven-js/" + this.VERSION,
                  sentry_key: this.h
                };
                if (this.I) {
                  i.sentry_secret = this.I;
                }
                var o = e.exception && e.exception.values[0];
                if (this.k.autoBreadcrumbs && this.k.autoBreadcrumbs.sentry) {
                  this.captureBreadcrumb({
                    category: "sentry",
                    message: o ? (o.type ? o.type + ": " : "") + o.value : e.message,
                    event_id: e.event_id,
                    level: e.level || "error"
                  });
                }
                var a = this.K;
                (r.transport || this._makeRequest).call(this, {
                  url: a,
                  auth: i,
                  data: e,
                  options: r,
                  onSuccess: function () {
                    n.y();
                    n.$("success", {
                      data: e,
                      src: a
                    });
                    if (t) {
                      t();
                    }
                  },
                  onError: function (r) {
                    n.z("error", "Raven transport failed to send: ", r);
                    if (r.request) {
                      n.oa(r.request);
                    }
                    n.$("failure", {
                      data: e,
                      src: a
                    });
                    r = r || new Error("Raven send failed (no additional details provided)");
                    if (t) {
                      t(r);
                    }
                  }
                });
              }
            },
            _makeRequest: function (e) {
              var t = e.url + "?" + T(e.auth);
              var n = null;
              var r = {};
              if (e.options.headers) {
                n = this.sa(e.options.headers);
              }
              if (e.options.fetchParameters) {
                r = this.sa(e.options.fetchParameters);
              }
              if (N()) {
                r.body = s(e.data);
                var i = k({}, this.l);
                var o = k(i, r);
                if (n) {
                  o.headers = n;
                }
                return z.fetch(t, o).then(function (t) {
                  if (t.ok) {
                    if (e.onSuccess) {
                      e.onSuccess();
                    }
                  } else {
                    var n = new Error("Sentry error code: " + t.status);
                    n.request = t;
                    if (e.onError) {
                      e.onError(n);
                    }
                  }
                }).catch(function () {
                  if (e.onError) {
                    e.onError(new Error("Sentry error code: network unavailable"));
                  }
                });
              }
              var a = z.XMLHttpRequest && new z.XMLHttpRequest();
              if (a) {
                if ("withCredentials" in a || typeof XDomainRequest != "undefined") {
                  if ("withCredentials" in a) {
                    a.onreadystatechange = function () {
                      if (a.readyState === 4) {
                        if (a.status === 200) {
                          if (e.onSuccess) {
                            e.onSuccess();
                          }
                        } else if (e.onError) {
                          var t = new Error("Sentry error code: " + a.status);
                          t.request = a;
                          e.onError(t);
                        }
                      }
                    };
                  } else {
                    a = new XDomainRequest();
                    t = t.replace(/^https?:/, "");
                    if (e.onSuccess) {
                      a.onload = e.onSuccess;
                    }
                    if (e.onError) {
                      a.onerror = function () {
                        var t = new Error("Sentry error code: XDomainRequest");
                        t.request = a;
                        e.onError(t);
                      };
                    }
                  }
                  a.open("POST", t);
                  if (n) {
                    C(n, function (e, t) {
                      a.setRequestHeader(e, t);
                    });
                  }
                  a.send(s(e.data));
                }
              }
            },
            sa: function (e) {
              var t = {};
              for (var n in e) {
                if (e.hasOwnProperty(n)) {
                  var r = e[n];
                  t[n] = typeof r == "function" ? r() : r;
                }
              }
              return t;
            },
            z: function (e) {
              if (this.q[e] && (this.debug || this.k.debug)) {
                Function.prototype.apply.call(this.q[e], this.p, [].slice.call(arguments, 1));
              }
            },
            Z: function (e, t) {
              if (y(t)) {
                delete this.j[e];
              } else {
                this.j[e] = k(this.j[e] || {}, t);
              }
            }
          };
          o.prototype.setUser = o.prototype.setUserContext;
          o.prototype.setReleaseContext = o.prototype.setRelease;
          t.exports = o;
        }).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
      }, {
        1: 1,
        2: 2,
        5: 5,
        6: 6,
        7: 7,
        8: 8
      }],
      4: [function (e, t, n) {
        (function (n) {
          var r = e(3);
          var i = typeof window != "undefined" ? window : n !== undefined ? n : typeof self != "undefined" ? self : {};
          var o = i.Raven;
          var a = new r();
          a.noConflict = function () {
            i.Raven = o;
            return a;
          };
          a.afterLoad();
          t.exports = a;
          t.exports.Client = r;
        }).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
      }, {
        3: 3
      }],
      5: [function (e, t, n) {
        (function (n) {
          function r(e) {
            switch (Object.prototype.toString.call(e)) {
              case "[object Error]":
              case "[object Exception]":
              case "[object DOMException]":
                return true;
              default:
                return e instanceof Error;
            }
          }
          function i(e) {
            return Object.prototype.toString.call(e) === "[object DOMError]";
          }
          function o(e) {
            return e === undefined;
          }
          function a(e) {
            return Object.prototype.toString.call(e) === "[object Object]";
          }
          function s(e) {
            return Object.prototype.toString.call(e) === "[object String]";
          }
          function c(e) {
            return Object.prototype.toString.call(e) === "[object Array]";
          }
          function l() {
            if (!("fetch" in _)) {
              return false;
            }
            try {
              new Headers();
              new Request("");
              new Response();
              return true;
            } catch (e) {
              return false;
            }
          }
          function u(e, t) {
            var n;
            var r;
            if (o(e.length)) {
              for (n in e) {
                if (d(e, n)) {
                  t.call(null, n, e[n]);
                }
              }
            } else if (r = e.length) {
              for (n = 0; n < r; n++) {
                t.call(null, n, e[n]);
              }
            }
          }
          function h(e, t) {
            if (typeof t != "number") {
              throw new Error("2nd argument to `truncate` function should be a number");
            }
            if (typeof e != "string" || t === 0 || e.length <= t) {
              return e;
            } else {
              return e.substr(0, t) + "…";
            }
          }
          function d(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }
          function p(e) {
            var t;
            var n = [];
            for (var r = 0, i = e.length; r < i; r++) {
              if (s(t = e[r])) {
                n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"));
              } else if (t && t.source) {
                n.push(t.source);
              }
            }
            return new RegExp(n.join("|"), "i");
          }
          function f(e) {
            var t;
            var n;
            var r;
            var i;
            var o;
            var a = [];
            if (!e || !e.tagName) {
              return "";
            }
            a.push(e.tagName.toLowerCase());
            if (e.id) {
              a.push("#" + e.id);
            }
            if ((t = e.className) && s(t)) {
              n = t.split(/\s+/);
              o = 0;
              for (; o < n.length; o++) {
                a.push("." + n[o]);
              }
            }
            var c = ["type", "name", "title", "alt"];
            for (o = 0; o < c.length; o++) {
              r = c[o];
              if (i = e.getAttribute(r)) {
                a.push("[" + r + "=\"" + i + "\"]");
              }
            }
            return a.join("");
          }
          function m(e, t) {
            return !!(!!e ^ !!t);
          }
          function g(e, t) {
            if (m(e, t)) {
              return false;
            }
            var n = e.frames;
            var r = t.frames;
            if (n === undefined || r === undefined) {
              return false;
            }
            if (n.length !== r.length) {
              return false;
            }
            var i;
            var o;
            for (var a = 0; a < n.length; a++) {
              i = n[a];
              o = r[a];
              if (i.filename !== o.filename || i.lineno !== o.lineno || i.colno !== o.colno || i.function !== o.function) {
                return false;
              }
            }
            return true;
          }
          function y(e) {
            return function (e) {
              return ~-encodeURI(e).split(/%..|./).length;
            }(JSON.stringify(e));
          }
          function v(e) {
            if (typeof e == "string") {
              return h(e, 40);
            }
            if (typeof e == "number" || typeof e == "boolean" || e === undefined) {
              return e;
            }
            var t = Object.prototype.toString.call(e);
            if (t === "[object Object]") {
              return "[Object]";
            } else if (t === "[object Array]") {
              return "[Array]";
            } else if (t === "[object Function]") {
              if (e.name) {
                return "[Function: " + e.name + "]";
              } else {
                return "[Function]";
              }
            } else {
              return e;
            }
          }
          function w(e, t) {
            if (t === 0) {
              return v(e);
            } else if (a(e)) {
              return Object.keys(e).reduce(function (n, r) {
                n[r] = w(e[r], t - 1);
                return n;
              }, {});
            } else if (Array.isArray(e)) {
              return e.map(function (e) {
                return w(e, t - 1);
              });
            } else {
              return v(e);
            }
          }
          var b = e(7);
          var _ = typeof window != "undefined" ? window : n !== undefined ? n : typeof self != "undefined" ? self : {};
          var C = 3;
          var k = 51200;
          var E = 40;
          t.exports = {
            isObject: function (e) {
              return typeof e == "object" && e !== null;
            },
            isError: r,
            isErrorEvent: function (e) {
              return Object.prototype.toString.call(e) === "[object ErrorEvent]";
            },
            isDOMError: i,
            isDOMException: function (e) {
              return Object.prototype.toString.call(e) === "[object DOMException]";
            },
            isUndefined: o,
            isFunction: function (e) {
              return typeof e == "function";
            },
            isPlainObject: a,
            isString: s,
            isArray: c,
            isEmptyObject: function (e) {
              if (!a(e)) {
                return false;
              }
              for (var t in e) {
                if (e.hasOwnProperty(t)) {
                  return false;
                }
              }
              return true;
            },
            supportsErrorEvent: function () {
              try {
                new ErrorEvent("");
                return true;
              } catch (e) {
                return false;
              }
            },
            supportsDOMError: function () {
              try {
                new DOMError("");
                return true;
              } catch (e) {
                return false;
              }
            },
            supportsDOMException: function () {
              try {
                new DOMException("");
                return true;
              } catch (e) {
                return false;
              }
            },
            supportsFetch: l,
            supportsReferrerPolicy: function () {
              if (!l()) {
                return false;
              }
              try {
                new Request("pickleRick", {
                  referrerPolicy: "origin"
                });
                return true;
              } catch (e) {
                return false;
              }
            },
            supportsPromiseRejectionEvent: function () {
              return typeof PromiseRejectionEvent == "function";
            },
            wrappedCallback: function (e) {
              return function (t, n) {
                var r = e(t) || t;
                return n && n(r) || r;
              };
            },
            each: u,
            objectMerge: function (e, t) {
              if (t) {
                u(t, function (t, n) {
                  e[t] = n;
                });
                return e;
              } else {
                return e;
              }
            },
            truncate: h,
            objectFrozen: function (e) {
              return !!Object.isFrozen && Object.isFrozen(e);
            },
            hasKey: d,
            joinRegExp: p,
            urlencode: function (e) {
              var t = [];
              u(e, function (e, n) {
                t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n));
              });
              return t.join("&");
            },
            uuid4: function () {
              var e = _.crypto || _.msCrypto;
              if (!o(e) && e.getRandomValues) {
                var t = new Uint16Array(8);
                e.getRandomValues(t);
                t[3] = t[3] & 4095 | 16384;
                t[4] = t[4] & 16383 | 32768;
                function n(e) {
                  for (var t = e.toString(16); t.length < 4;) {
                    t = "0" + t;
                  }
                  return t;
                }
                return n(t[0]) + n(t[1]) + n(t[2]) + n(t[3]) + n(t[4]) + n(t[5]) + n(t[6]) + n(t[7]);
              }
              return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                var t = Math.random() * 16 | 0;
                return (e === "x" ? t : t & 3 | 8).toString(16);
              });
            },
            htmlTreeAsString: function (e) {
              for (var t, n = [], r = 0, i = 0, o = " > ".length; e && r++ < 5 && (t = f(e)) !== "html" && (!(r > 1) || !(i + n.length * o + t.length >= 80));) {
                n.push(t);
                i += t.length;
                e = e.parentNode;
              }
              return n.reverse().join(" > ");
            },
            htmlElementAsString: f,
            isSameException: function (e, t) {
              return !m(e, t) && (e = e.values[0], t = t.values[0], e.type === t.type && e.value === t.value && !function (e, t) {
                return o(e) && o(t);
              }(e.stacktrace, t.stacktrace) && g(e.stacktrace, t.stacktrace));
            },
            isSameStacktrace: g,
            parseUrl: function (e) {
              if (typeof e != "string") {
                return {};
              }
              var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
              var n = t[6] || "";
              var r = t[8] || "";
              return {
                protocol: t[2],
                host: t[4],
                path: t[5],
                relative: t[5] + n + r
              };
            },
            fill: function (e, t, n, r) {
              if (e != null) {
                var i = e[t];
                e[t] = n(i);
                e[t].M = true;
                e[t].O = i;
                if (r) {
                  r.push([e, t, i]);
                }
              }
            },
            safeJoin: function (e, t) {
              if (!c(e)) {
                return "";
              }
              var n = [];
              for (var i = 0; i < e.length; i++) {
                try {
                  n.push(String(e[i]));
                } catch (r) {
                  n.push("[value cannot be serialized]");
                }
              }
              return n.join(t);
            },
            serializeException: function x(e, t, n) {
              if (!a(e)) {
                return e;
              }
              n = typeof (t = typeof t != "number" ? C : t) != "number" ? k : n;
              var r = w(e, t);
              if (y(b(r)) > n) {
                return x(e, t - 1);
              } else {
                return r;
              }
            },
            serializeKeysForMessage: function (e, t) {
              if (typeof e == "number" || typeof e == "string") {
                return e.toString();
              }
              if (!Array.isArray(e)) {
                return "";
              }
              if ((e = e.filter(function (e) {
                return typeof e == "string";
              })).length === 0) {
                return "[object has no keys]";
              }
              t = typeof t != "number" ? E : t;
              if (e[0].length >= t) {
                return e[0];
              }
              for (var n = e.length; n > 0; n--) {
                var r = e.slice(0, n).join(", ");
                if (!(r.length > t)) {
                  if (n === e.length) {
                    return r;
                  } else {
                    return r + "…";
                  }
                }
              }
              return "";
            },
            sanitize: function (e, t) {
              if (!c(t) || c(t) && t.length === 0) {
                return e;
              }
              var n;
              var r = p(t);
              var o = "********";
              try {
                n = JSON.parse(b(e));
              } catch (i) {
                return e;
              }
              return function s(e) {
                if (c(e)) {
                  return e.map(function (e) {
                    return s(e);
                  });
                } else if (a(e)) {
                  return Object.keys(e).reduce(function (t, n) {
                    t[n] = r.test(n) ? o : s(e[n]);
                    return t;
                  }, {});
                } else {
                  return e;
                }
              }(n);
            }
          };
        }).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
      }, {
        7: 7
      }],
      6: [function (e, t, n) {
        (function (n) {
          function r() {
            if (typeof document == "undefined" || document.location == null) {
              return "";
            } else {
              return document.location.href;
            }
          }
          var i = e(5);
          var o = {
            collectWindowErrors: true,
            debug: false
          };
          var a = typeof window != "undefined" ? window : n !== undefined ? n : typeof self != "undefined" ? self : {};
          var s = [].slice;
          var c = "?";
          var l = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
          o.report = function () {
            function e(t, n) {
              var r = null;
              if (!n || o.collectWindowErrors) {
                for (var i in p) {
                  if (p.hasOwnProperty(i)) {
                    try {
                      p[i].apply(null, [t].concat(s.call(arguments, 2)));
                    } catch (e) {
                      r = e;
                    }
                  }
                }
                if (r) {
                  throw r;
                }
              }
            }
            function t(t, a, s, u, d) {
              var p = i.isErrorEvent(d) ? d.error : d;
              var f = i.isErrorEvent(t) ? t.message : t;
              if (g) {
                o.computeStackTrace.augmentStackTraceWithInitialElement(g, a, s, f);
                n();
              } else if (p && i.isError(p)) {
                e(o.computeStackTrace(p), true);
              } else {
                var m;
                var y = {
                  url: a,
                  line: s,
                  column: u
                };
                var v = undefined;
                if ({}.toString.call(f) === "[object String]") {
                  if (m = f.match(l)) {
                    v = m[1];
                    f = m[2];
                  }
                }
                y.func = c;
                e({
                  name: v,
                  message: f,
                  url: r(),
                  stack: [y]
                }, true);
              }
              return !!h && h.apply(this, arguments);
            }
            function n() {
              var t = g;
              var n = f;
              f = null;
              g = null;
              m = null;
              e.apply(null, [t, false].concat(n));
            }
            function u(e, t) {
              var r = s.call(arguments, 1);
              if (g) {
                if (m === e) {
                  return;
                }
                n();
              }
              var i = o.computeStackTrace(e);
              g = i;
              m = e;
              f = r;
              setTimeout(function () {
                if (m === e) {
                  n();
                }
              }, i.incomplete ? 2000 : 0);
              if (t !== false) {
                throw e;
              }
            }
            var h;
            var d;
            var p = [];
            var f = null;
            var m = null;
            var g = null;
            u.subscribe = function (e) {
              if (!d) {
                h = a.onerror;
                a.onerror = t;
                d = true;
              }
              p.push(e);
            };
            u.unsubscribe = function (e) {
              for (var t = p.length - 1; t >= 0; --t) {
                if (p[t] === e) {
                  p.splice(t, 1);
                }
              }
            };
            u.uninstall = function () {
              if (d) {
                a.onerror = h;
                d = false;
                h = undefined;
              }
              p = [];
            };
            return u;
          }();
          o.computeStackTrace = function () {
            function e(e) {
              if (typeof e.stack != "undefined" && e.stack) {
                var t;
                var n;
                var i;
                var o = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
                var a = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
                var s = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i;
                var l = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
                var u = /\((\S*)(?::(\d+))(?::(\d+))\)/;
                var h = e.stack.split("\n");
                var d = [];
                for (var p = (/^(.*) is undefined$/.exec(e.message), 0), f = h.length; p < f; ++p) {
                  if (n = o.exec(h[p])) {
                    var m = n[2] && n[2].indexOf("native") === 0;
                    if (n[2] && n[2].indexOf("eval") === 0 && (t = u.exec(n[2]))) {
                      n[2] = t[1];
                      n[3] = t[2];
                      n[4] = t[3];
                    }
                    i = {
                      url: m ? null : n[2],
                      func: n[1] || c,
                      args: m ? [n[2]] : [],
                      line: n[3] ? +n[3] : null,
                      column: n[4] ? +n[4] : null
                    };
                  } else if (n = a.exec(h[p])) {
                    i = {
                      url: n[2],
                      func: n[1] || c,
                      args: [],
                      line: +n[3],
                      column: n[4] ? +n[4] : null
                    };
                  } else {
                    if (!(n = s.exec(h[p]))) {
                      continue;
                    }
                    if (n[3] && n[3].indexOf(" > eval") > -1 && (t = l.exec(n[3]))) {
                      n[3] = t[1];
                      n[4] = t[2];
                      n[5] = null;
                    } else if (p === 0 && !n[5] && typeof e.columnNumber != "undefined") {
                      d[0].column = e.columnNumber + 1;
                    }
                    i = {
                      url: n[3],
                      func: n[1] || c,
                      args: n[2] ? n[2].split(",") : [],
                      line: n[4] ? +n[4] : null,
                      column: n[5] ? +n[5] : null
                    };
                  }
                  if (!i.func && i.line) {
                    i.func = c;
                  }
                  if (i.url && i.url.substr(0, 5) === "blob:") {
                    var g = new XMLHttpRequest();
                    g.open("GET", i.url, false);
                    g.send(null);
                    if (g.status === 200) {
                      var y = g.responseText || "";
                      var v = (y = y.slice(-300)).match(/\/\/# sourceMappingURL=(.*)$/);
                      if (v) {
                        var w = v[1];
                        if (w.charAt(0) === "~") {
                          w = (typeof document == "undefined" || document.location == null ? "" : document.location.origin ? document.location.origin : document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "")) + w.slice(1);
                        }
                        i.url = w.slice(0, -4);
                      }
                    }
                  }
                  d.push(i);
                }
                if (d.length) {
                  return {
                    name: e.name,
                    message: e.message,
                    url: r(),
                    stack: d
                  };
                } else {
                  return null;
                }
              }
            }
            function t(e, t, n, r) {
              var i = {
                url: t,
                line: n
              };
              if (i.url && i.line) {
                e.incomplete = false;
                i.func ||= c;
                if (e.stack.length > 0 && e.stack[0].url === i.url) {
                  if (e.stack[0].line === i.line) {
                    return false;
                  }
                  if (!e.stack[0].line && e.stack[0].func === i.func) {
                    e.stack[0].line = i.line;
                    return false;
                  }
                }
                e.stack.unshift(i);
                e.partial = true;
                return true;
              }
              e.incomplete = true;
              return false;
            }
            function n(e, a) {
              var s;
              var l;
              var u = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i;
              var h = [];
              var d = {};
              for (var p = false, f = n.caller; f && !p; f = f.caller) {
                if (f !== i && f !== o.report) {
                  l = {
                    url: null,
                    func: c,
                    line: null,
                    column: null
                  };
                  if (f.name) {
                    l.func = f.name;
                  } else if (s = u.exec(f.toString())) {
                    l.func = s[1];
                  }
                  if (typeof l.func == "undefined") {
                    try {
                      l.func = s.input.substring(0, s.input.indexOf("{"));
                    } catch (g) {}
                  }
                  if (d["" + f]) {
                    p = true;
                  } else {
                    d["" + f] = true;
                  }
                  h.push(l);
                }
              }
              if (a) {
                h.splice(0, a);
              }
              var m = {
                name: e.name,
                message: e.message,
                url: r(),
                stack: h
              };
              t(m, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description);
              return m;
            }
            function i(t, i) {
              var s = null;
              i = i == null ? 0 : +i;
              try {
                if (s = e(t)) {
                  return s;
                }
              } catch (a) {
                if (o.debug) {
                  throw a;
                }
              }
              try {
                if (s = n(t, i + 1)) {
                  return s;
                }
              } catch (a) {
                if (o.debug) {
                  throw a;
                }
              }
              return {
                name: t.name,
                message: t.message,
                url: r()
              };
            }
            i.augmentStackTraceWithInitialElement = t;
            i.computeStackTraceFromStackProp = e;
            return i;
          }();
          t.exports = o;
        }).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
      }, {
        5: 5
      }],
      7: [function (e, t, n) {
        function r(e, t) {
          for (var n = 0; n < e.length; ++n) {
            if (e[n] === t) {
              return n;
            }
          }
          return -1;
        }
        function i(e, t) {
          var n = [];
          var i = [];
          if (t == null) {
            t = function (e, t) {
              if (n[0] === t) {
                return "[Circular ~]";
              } else {
                return "[Circular ~." + i.slice(0, r(n, t)).join(".") + "]";
              }
            };
          }
          return function (o, a) {
            if (n.length > 0) {
              var s = r(n, this);
              if (~s) {
                n.splice(s + 1);
              } else {
                n.push(this);
              }
              if (~s) {
                i.splice(s, Infinity, o);
              } else {
                i.push(o);
              }
              if (~r(n, a)) {
                a = t.call(this, o, a);
              }
            } else {
              n.push(a);
            }
            if (e == null) {
              if (a instanceof Error) {
                return function (e) {
                  var t = {
                    stack: e.stack,
                    message: e.message,
                    name: e.name
                  };
                  for (var n in e) {
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                      t[n] = e[n];
                    }
                  }
                  return t;
                }(a);
              } else {
                return a;
              }
            } else {
              return e.call(this, o, a);
            }
          };
        }
        n = t.exports = function (e, t, n, r) {
          return JSON.stringify(e, i(t, r), n);
        };
        n.getSerialize = i;
      }, {}],
      8: [function (e, t, n) {
        function r(e, t) {
          var n = (e & 65535) + (t & 65535);
          return (e >> 16) + (t >> 16) + (n >> 16) << 16 | n & 65535;
        }
        function i(e, t, n, i, o, a) {
          return r(function (e, t) {
            return e << t | e >>> 32 - t;
          }(r(r(t, e), r(i, a)), o), n);
        }
        function o(e, t, n, r, o, a, s) {
          return i(t & n | ~t & r, e, t, o, a, s);
        }
        function a(e, t, n, r, o, a, s) {
          return i(t & r | n & ~r, e, t, o, a, s);
        }
        function s(e, t, n, r, o, a, s) {
          return i(t ^ n ^ r, e, t, o, a, s);
        }
        function c(e, t, n, r, o, a, s) {
          return i(n ^ (t | ~r), e, t, o, a, s);
        }
        function l(e, t) {
          e[t >> 5] |= 128 << t % 32;
          e[14 + (t + 64 >>> 9 << 4)] = t;
          var n;
          var i;
          var l;
          var u;
          var h;
          var d = 1732584193;
          var p = -271733879;
          var f = -1732584194;
          var m = 271733878;
          for (n = 0; n < e.length; n += 16) {
            i = d;
            l = p;
            u = f;
            h = m;
            d = o(d, p, f, m, e[n], 7, -680876936);
            m = o(m, d, p, f, e[n + 1], 12, -389564586);
            f = o(f, m, d, p, e[n + 2], 17, 606105819);
            p = o(p, f, m, d, e[n + 3], 22, -1044525330);
            d = o(d, p, f, m, e[n + 4], 7, -176418897);
            m = o(m, d, p, f, e[n + 5], 12, 1200080426);
            f = o(f, m, d, p, e[n + 6], 17, -1473231341);
            p = o(p, f, m, d, e[n + 7], 22, -45705983);
            d = o(d, p, f, m, e[n + 8], 7, 1770035416);
            m = o(m, d, p, f, e[n + 9], 12, -1958414417);
            f = o(f, m, d, p, e[n + 10], 17, -42063);
            p = o(p, f, m, d, e[n + 11], 22, -1990404162);
            d = o(d, p, f, m, e[n + 12], 7, 1804603682);
            m = o(m, d, p, f, e[n + 13], 12, -40341101);
            f = o(f, m, d, p, e[n + 14], 17, -1502002290);
            d = a(d, p = o(p, f, m, d, e[n + 15], 22, 1236535329), f, m, e[n + 1], 5, -165796510);
            m = a(m, d, p, f, e[n + 6], 9, -1069501632);
            f = a(f, m, d, p, e[n + 11], 14, 643717713);
            p = a(p, f, m, d, e[n], 20, -373897302);
            d = a(d, p, f, m, e[n + 5], 5, -701558691);
            m = a(m, d, p, f, e[n + 10], 9, 38016083);
            f = a(f, m, d, p, e[n + 15], 14, -660478335);
            p = a(p, f, m, d, e[n + 4], 20, -405537848);
            d = a(d, p, f, m, e[n + 9], 5, 568446438);
            m = a(m, d, p, f, e[n + 14], 9, -1019803690);
            f = a(f, m, d, p, e[n + 3], 14, -187363961);
            p = a(p, f, m, d, e[n + 8], 20, 1163531501);
            d = a(d, p, f, m, e[n + 13], 5, -1444681467);
            m = a(m, d, p, f, e[n + 2], 9, -51403784);
            f = a(f, m, d, p, e[n + 7], 14, 1735328473);
            d = s(d, p = a(p, f, m, d, e[n + 12], 20, -1926607734), f, m, e[n + 5], 4, -378558);
            m = s(m, d, p, f, e[n + 8], 11, -2022574463);
            f = s(f, m, d, p, e[n + 11], 16, 1839030562);
            p = s(p, f, m, d, e[n + 14], 23, -35309556);
            d = s(d, p, f, m, e[n + 1], 4, -1530992060);
            m = s(m, d, p, f, e[n + 4], 11, 1272893353);
            f = s(f, m, d, p, e[n + 7], 16, -155497632);
            p = s(p, f, m, d, e[n + 10], 23, -1094730640);
            d = s(d, p, f, m, e[n + 13], 4, 681279174);
            m = s(m, d, p, f, e[n], 11, -358537222);
            f = s(f, m, d, p, e[n + 3], 16, -722521979);
            p = s(p, f, m, d, e[n + 6], 23, 76029189);
            d = s(d, p, f, m, e[n + 9], 4, -640364487);
            m = s(m, d, p, f, e[n + 12], 11, -421815835);
            f = s(f, m, d, p, e[n + 15], 16, 530742520);
            d = c(d, p = s(p, f, m, d, e[n + 2], 23, -995338651), f, m, e[n], 6, -198630844);
            m = c(m, d, p, f, e[n + 7], 10, 1126891415);
            f = c(f, m, d, p, e[n + 14], 15, -1416354905);
            p = c(p, f, m, d, e[n + 5], 21, -57434055);
            d = c(d, p, f, m, e[n + 12], 6, 1700485571);
            m = c(m, d, p, f, e[n + 3], 10, -1894986606);
            f = c(f, m, d, p, e[n + 10], 15, -1051523);
            p = c(p, f, m, d, e[n + 1], 21, -2054922799);
            d = c(d, p, f, m, e[n + 8], 6, 1873313359);
            m = c(m, d, p, f, e[n + 15], 10, -30611744);
            f = c(f, m, d, p, e[n + 6], 15, -1560198380);
            p = c(p, f, m, d, e[n + 13], 21, 1309151649);
            d = c(d, p, f, m, e[n + 4], 6, -145523070);
            m = c(m, d, p, f, e[n + 11], 10, -1120210379);
            f = c(f, m, d, p, e[n + 2], 15, 718787259);
            p = c(p, f, m, d, e[n + 9], 21, -343485551);
            d = r(d, i);
            p = r(p, l);
            f = r(f, u);
            m = r(m, h);
          }
          return [d, p, f, m];
        }
        function u(e) {
          var t;
          var n = "";
          var r = e.length * 32;
          for (t = 0; t < r; t += 8) {
            n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
          }
          return n;
        }
        function h(e) {
          var t;
          var n = [];
          n[(e.length >> 2) - 1] = undefined;
          t = 0;
          for (; t < n.length; t += 1) {
            n[t] = 0;
          }
          var r = e.length * 8;
          for (t = 0; t < r; t += 8) {
            n[t >> 5] |= (e.charCodeAt(t / 8) & 255) << t % 32;
          }
          return n;
        }
        function d(e) {
          var t;
          var n;
          var r = "0123456789abcdef";
          var i = "";
          for (n = 0; n < e.length; n += 1) {
            t = e.charCodeAt(n);
            i += r.charAt(t >>> 4 & 15) + r.charAt(t & 15);
          }
          return i;
        }
        function p(e) {
          return unescape(encodeURIComponent(e));
        }
        function f(e) {
          return function (e) {
            return u(l(h(e), e.length * 8));
          }(p(e));
        }
        function m(e, t) {
          return function (e, t) {
            var n;
            var r;
            var i = h(e);
            var o = [];
            var a = [];
            o[15] = a[15] = undefined;
            if (i.length > 16) {
              i = l(i, e.length * 8);
            }
            n = 0;
            for (; n < 16; n += 1) {
              o[n] = i[n] ^ 909522486;
              a[n] = i[n] ^ 1549556828;
            }
            r = l(o.concat(h(t)), 512 + t.length * 8);
            return u(l(a.concat(r), 640));
          }(p(e), p(t));
        }
        t.exports = function (e, t, n) {
          if (t) {
            if (n) {
              return m(t, e);
            } else {
              return function (e, t) {
                return d(m(e, t));
              }(t, e);
            }
          } else if (n) {
            return f(e);
          } else {
            return function (e) {
              return d(f(e));
            }(e);
          }
        };
      }, {}]
    }, {}, [4])(4);
  });
  var z = [{
    family: "UC Browser",
    patterns: ["(UC? ?Browser|UCWEB|U3)[ /]?(\\d+)\\.(\\d+)\\.(\\d+)"]
  }, {
    family: "Opera",
    name_replace: "Opera Mobile",
    patterns: ["(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)", "(Opera)/(\\d+)\\.(\\d+).+Opera Mobi", "Opera Mobi.+(Opera)(?:/|\\s+)(\\d+)\\.(\\d+)", "Opera Mobi", "(?:Mobile Safari).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
  }, {
    family: "Opera",
    name_replace: "Opera Mini",
    patterns: ["(Opera Mini)(?:/att|)/?(\\d+|)(?:\\.(\\d+)|)(?:\\.(\\d+)|)", "(OPiOS)/(\\d+).(\\d+).(\\d+)"]
  }, {
    family: "Opera",
    name_replace: "Opera Neon",
    patterns: ["Chrome/.+( MMS)/(\\d+).(\\d+).(\\d+)"]
  }, {
    name_replace: "Opera",
    patterns: ["(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(?:Chrome).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
  }, {
    family: "Firefox",
    name_replace: "Firefox Mobile",
    patterns: ["(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)", "(Fennec)/(\\d+)\\.(\\d+)(pre)", "(Fennec)/(\\d+)\\.(\\d+)", "(?:Mobile|Tablet);.*(Firefox)/(\\d+)\\.(\\d+)", "(FxiOS)/(\\d+)\\.(\\d+)(\\.(\\d+)|)(\\.(\\d+)|)"]
  }, {
    name_replace: "Coc Coc",
    patterns: ["(coc_coc_browser)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
  }, {
    family: "QQ",
    name_replace: "QQ Mini",
    patterns: ["(MQQBrowser/Mini)(?:(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
  }, {
    family: "QQ",
    name_replace: "QQ Mobile",
    patterns: ["(MQQBrowser)(?:/(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
  }, {
    name_replace: "QQ",
    patterns: ["(QQBrowser)(?:/(\\d+)(?:\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)|)"]
  }, {
    family: "Edge",
    name: "Edge Mobile",
    patterns: ["Windows Phone .*(Edge)/(\\d+)\\.(\\d+)", "(EdgiOS|EdgA)/(\\d+)\\.(\\d+).(\\d+).(\\d+)"]
  }, {
    name_replace: "Edge",
    patterns: ["(Edge|Edg)/(\\d+)(?:\\.(\\d+)|)"]
  }, {
    patterns: ["(Puffin)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
  }, {
    family: "Chrome",
    name_replace: "Chrome Mobile",
    patterns: ["Version/.+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "; wv\\).+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile(?:[ /]|$)", " Mobile .*(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"]
  }, {
    family: "Yandex",
    name_replace: "Yandex Mobile",
    patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+).*Mobile"]
  }, {
    name_replace: "Yandex",
    patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)"]
  }, {
    patterns: ["(Vivaldi)/(\\d+)\\.(\\d+)", "(Vivaldi)/(\\d+)\\.(\\d+)\\.(\\d+)"]
  }, {
    name_replace: "Brave",
    patterns: ["(brave)/(\\d+)\\.(\\d+)\\.(\\d+) Chrome"]
  }, {
    family: "Chrome",
    patterns: ["(Chromium|Chrome)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
  }, {
    name_replace: "Internet Explorer Mobile",
    patterns: ["(IEMobile)[ /](\\d+)\\.(\\d+)"]
  }, {
    family: "Safari",
    name_replace: "Safari Mobile",
    patterns: ["(iPod|iPhone|iPad).+Version/(d+).(d+)(?:.(d+)|).*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).* AppleNews\\/\\d+\\.\\d+\\.\\d+?", "(iPod|iPhone|iPad).+Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile.*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile", "(iPod|iPod touch|iPhone|iPad).* Safari", "(iPod|iPod touch|iPhone|iPad)"]
  }, {
    name_replace: "Safari",
    patterns: ["(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|).*Safari/"]
  }, {
    name_replace: "Internet Explorer",
    patterns: ["(Trident)/(7|8).(0)"],
    major_replace: "11"
  }, {
    name_replace: "Internet Explorer",
    patterns: ["(Trident)/(6)\\.(0)"],
    major_replace: "10"
  }, {
    name_replace: "Internet Explorer",
    patterns: ["(Trident)/(5)\\.(0)"],
    major_replace: "9"
  }, {
    name_replace: "Internet Explorer",
    patterns: ["(Trident)/(4)\\.(0)"],
    major_replace: "8"
  }, {
    family: "Firefox",
    patterns: ["(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)", "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*|)"]
  }];
  var K = [{
    family: "Windows",
    name_replace: "Windows Phone",
    patterns: ["(Windows Phone) (?:OS[ /])?(\\d+)\\.(\\d+)", "^UCWEB.*; (wds) (\\d+)\\.(d+)(?:\\.(\\d+)|);", "^UCWEB.*; (wds) (\\d+)\\.(\\d+)(?:\\.(\\d+)|);"]
  }, {
    family: "Windows",
    name_replace: "Windows Mobile",
    patterns: ["(Windows ?Mobile)"]
  }, {
    name_replace: "Android",
    patterns: ["(Android)[ \\-/](\\d+)(?:\\.(\\d+)|)(?:[.\\-]([a-z0-9]+)|)", "(Android) (d+);", "^UCWEB.*; (Adr) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+)|);", "^(JUC).*; ?U; ?(?:Android|)(\\d+)\\.(\\d+)(?:[\\.\\-]([a-z0-9]+)|)", "(android)\\s(?:mobile\\/)(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)|)|)", "(Silk-Accelerated=[a-z]{4,5})", "Puffin/[\\d\\.]+AT", "Puffin/[\\d\\.]+AP"]
  }, {
    name_replace: "Chrome OS",
    patterns: ["(x86_64|aarch64)\\ (\\d+)\\.(\\d+)\\.(\\d+).*Chrome.*(?:CitrixChromeApp)$", "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
  }, {
    name_replace: "Windows",
    patterns: ["(Windows 10)", "(Windows NT 6\\.4)", "(Windows NT 10\\.0)"],
    major_replace: "10"
  }, {
    name_replace: "Windows",
    patterns: ["(Windows NT 6\\.3; ARM;)", "(Windows NT 6.3)"],
    major_replace: "8",
    minor_replace: "1"
  }, {
    name_replace: "Windows",
    patterns: ["(Windows NT 6\\.2)"],
    major_replace: "8"
  }, {
    name_replace: "Windows",
    patterns: ["(Windows NT 6\\.1)"],
    major_replace: "7"
  }, {
    name_replace: "Windows",
    patterns: ["(Windows NT 6\\.0)"],
    major_replace: "Vista"
  }, {
    name_replace: "Windows",
    patterns: ["(Windows (?:NT 5\\.2|NT 5\\.1))"],
    major_replace: "XP"
  }, {
    name_replace: "Mac OS X",
    patterns: ["((?:Mac[ +]?|; )OS[ +]X)[\\s+/](?:(\\d+)[_.](\\d+)(?:[_.](\\d+)|)|Mach-O)", "\\w+\\s+Mac OS X\\s+\\w+\\s+(\\d+).(\\d+).(\\d+).*", "(?:PPC|Intel) (Mac OS X)"]
  }, {
    name_replace: "Mac OS X",
    patterns: [" (Dar)(win)/(10).(d+).*((?:i386|x86_64))"],
    major_replace: "10",
    minor_replace: "6"
  }, {
    name_replace: "Mac OS X",
    patterns: [" (Dar)(win)/(11).(\\d+).*\\((?:i386|x86_64)\\)"],
    major_replace: "10",
    minor_replace: "7"
  }, {
    name_replace: "Mac OS X",
    patterns: [" (Dar)(win)/(12).(\\d+).*\\((?:i386|x86_64)\\)"],
    major_replace: "10",
    minor_replace: "8"
  }, {
    name_replace: "Mac OS X",
    patterns: [" (Dar)(win)/(13).(\\d+).*\\((?:i386|x86_64)\\)"],
    major_replace: "10",
    minor_replace: "9"
  }, {
    name_replace: "iOS",
    patterns: ["^UCWEB.*; (iPad|iPh|iPd) OS (\\d+)_(\\d+)(?:_(\\d+)|);", "(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(\\d+)[_\\.](\\d+)(?:[_\\.](\\d+)|)", "(iPhone|iPad|iPod); Opera", "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)", "\\b(iOS[ /]|iOS; |iPhone(?:/| v|[ _]OS[/,]|; | OS : |\\d,\\d/|\\d,\\d; )|iPad/)(\\d{1,2})[_\\.](\\d{1,2})(?:[_\\.](\\d+)|)", "\\((iOS);", "(iPod|iPhone|iPad)", "Puffin/[\\d\\.]+IT", "Puffin/[\\d\\.]+IP"]
  }, {
    family: "Chrome",
    name_replace: "Chromecast",
    patterns: ["(CrKey -)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey[ +]armv7l)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey)(?:[/](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)"]
  }, {
    name_replace: "Debian",
    patterns: ["([Dd]ebian)"]
  }, {
    family: "Linux",
    name_replace: "Linux",
    patterns: ["(Linux Mint)(?:/(\\d+)|)"]
  }, {
    family: "Linux",
    patterns: ["(Ubuntu|Kubuntu|Arch Linux|CentOS|Slackware|Gentoo|openSUSE|SUSE|Red Hat|Fedora|PCLinuxOS|Mageia|(?:Free|Open|Net|\\b)BSD)", "(Mandriva)(?: Linux|)/(?:[\\d.-]+m[a-z]{2}(\\d+).(\\d)|)", "(Linux)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "\\(linux-gnu\\)"]
  }, {
    family: "BlackBerry",
    name_replace: "BlackBerry OS",
    patterns: ["(BB10);.+Version/(\\d+)\\.(\\d+)\\.(\\d+)", "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry)"]
  }, {
    patterns: ["(Fedora|Red Hat|PCLinuxOS|Puppy|Ubuntu|Kindle|Bada|Sailfish|Lubuntu|BackTrack|Slackware|(?:Free|Open|Net|\\b)BSD)[/ ](\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
  }];
  var L = navigator.userAgent;
  function H() {
    return L;
  }
  function $(e) {
    return Q(e || L, z);
  }
  function J(e) {
    return Q(e || L, K);
  }
  function G(e, t) {
    try {
      var n = new RegExp(t).exec(e);
      if (n) {
        return {
          name: n[1] || "Other",
          major: n[2] || "0",
          minor: n[3] || "0",
          patch: n[4] || "0"
        };
      } else {
        return null;
      }
    } catch (Kn) {
      return null;
    }
  }
  function Q(e, t) {
    var n = null;
    var r = null;
    for (var i = -1, o = false; ++i < t.length && !o;) {
      n = t[i];
      for (var a = -1; ++a < n.patterns.length && !o;) {
        o = (r = G(e, n.patterns[a])) !== null;
      }
    }
    if (o) {
      r.family = n.family || n.name_replace || r.name;
      if (n.name_replace) {
        r.name = n.name_replace;
      }
      if (n.major_replace) {
        r.major = n.major_replace;
      }
      if (n.minor_replace) {
        r.minor = n.minor_replace;
      }
      if (n.patch_replace) {
        r.minor = n.patch_replace;
      }
      return r;
    } else {
      return {
        family: "Other",
        name: "Other",
        major: "0",
        minor: "0",
        patch: "0"
      };
    }
  }
  function q() {
    var e = this;
    var t = $();
    var n = H();
    this.agent = n.toLowerCase();
    this.language = window.navigator.userLanguage || window.navigator.language;
    this.isCSS1 = (document.compatMode || "") === "CSS1Compat";
    this.width = function () {
      if (window.innerWidth && window.document.documentElement.clientWidth) {
        return Math.min(window.innerWidth, document.documentElement.clientWidth);
      } else {
        return window.innerWidth || window.document.documentElement.clientWidth || document.body.clientWidth;
      }
    };
    this.height = function () {
      return window.innerHeight || window.document.documentElement.clientHeight || document.body.clientHeight;
    };
    this.scrollX = function () {
      if (window.pageXOffset !== undefined) {
        return window.pageXOffset;
      } else if (e.isCSS1) {
        return document.documentElement.scrollLeft;
      } else {
        return document.body.scrollLeft;
      }
    };
    this.scrollY = function () {
      if (window.pageYOffset !== undefined) {
        return window.pageYOffset;
      } else if (e.isCSS1) {
        return document.documentElement.scrollTop;
      } else {
        return document.body.scrollTop;
      }
    };
    this.type = t.family === "Edge" ? "edge" : t.family === "Internet Explorer" ? "ie" : t.family === "Chrome" ? "chrome" : t.family === "Safari" ? "safari" : t.family === "Firefox" ? "firefox" : t.family.toLowerCase();
    this.version = (t.major + "." + t.minor) * 1 || 0;
    this.hasPostMessage = !!window.postMessage;
  }
  q.prototype.hasEvent = function (e, t) {
    return "on" + e in (t || document.createElement("div"));
  };
  q.prototype.getScreenDimensions = function () {
    var e = {};
    for (var t in window.screen) {
      e[t] = window.screen[t];
    }
    delete e.orientation;
    return e;
  };
  q.prototype.getOrientation = function () {
    if (typeof matchMedia == "function") {
      if (matchMedia("(orientation: landscape)").matches) {
        return "landscape";
      } else {
        return "portrait";
      }
    } else if (window.screen.orientation) {
      if (screen.orientation.type.startsWith("landscape")) {
        return "landscape";
      } else {
        return "portrait";
      }
    } else if (this.width() > this.height()) {
      return "landscape";
    } else {
      return "portrait";
    }
  };
  q.prototype.getWindowDimensions = function () {
    return [this.width(), this.height()];
  };
  q.prototype.interrogateNavigator = function () {
    var e = {};
    for (var t in window.navigator) {
      if (t !== "webkitPersistentStorage") {
        try {
          e[t] = window.navigator[t];
        } catch (zn) {}
      }
    }
    delete e.plugins;
    delete e.mimeTypes;
    e.plugins = [];
    if (window.navigator.plugins) {
      for (var n = 0; n < window.navigator.plugins.length; n++) {
        e.plugins[n] = window.navigator.plugins[n].filename;
      }
    }
    return e;
  };
  q.prototype.supportsPST = function () {
    return document.hasPrivateToken !== undefined;
  };
  q.prototype.supportsCanvas = function () {
    var e = document.createElement("canvas");
    return !!e.getContext && !!e.getContext("2d");
  };
  q.prototype.supportsWebAssembly = function () {
    try {
      if (typeof WebAssembly == "object" && typeof WebAssembly.instantiate == "function") {
        var e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
        if (e instanceof WebAssembly.Module) {
          return new WebAssembly.Instance(e) instanceof WebAssembly.Instance;
        }
      }
    } catch (Kn) {
      return false;
    }
  };
  var X = new q();
  var Y = new function () {
    var e;
    var t;
    var n = J();
    var r = H();
    this.mobile = (e = !!("ontouchstart" in window) || !!(navigator.maxTouchPoints > 0) || !!(navigator.msMaxTouchPoints > 0), t = false, n && (t = ["iOS", "Windows Phone", "Windows Mobile", "Android", "BlackBerry OS"].indexOf(n.name) >= 0), e && t);
    this.dpr = function () {
      return window.devicePixelRatio || 1;
    };
    if (this.mobile && n && n.family === "Windows" && r.indexOf("touch") < 0) {
      this.mobile = false;
    }
    this.os = n.family === "iOS" ? "ios" : n.family === "Android" ? "android" : n.family === "Mac OS X" ? "mac" : n.family === "Windows" ? "windows" : n.family === "Linux" ? "linux" : n.family.toLowerCase();
    this.version = function () {
      if (!n) {
        return "unknown";
      }
      var e = n.major;
      if (n.minor) {
        e += "." + n.minor;
      }
      if (n.patch) {
        e += "." + n.patch;
      }
      return e;
    }();
  }();
  var ee = {
    Browser: X,
    System: Y,
    supportsPAT: function () {
      return (Y.os === "mac" || Y.os === "ios") && X.type === "safari" && X.version >= 16.2;
    }
  };
  var te = "challenge-passed";
  var ne = "challenge-escaped";
  var re = "challenge-closed";
  var ie = "challenge-expired";
  var oe = "invalid-data";
  var ae = "bundle-error";
  var se = "rate-limited";
  var ce = "network-error";
  var le = "challenge-error";
  var ue = "incomplete-answer";
  var he = "missing-captcha";
  var de = "missing-sitekey";
  var pe = "invalid-captcha-id";
  var fe = "https://api.hcaptcha.com";
  var me = "https://api2.hcaptcha.com";
  var ge = "auto";
  var ye = {
    host: null,
    file: null,
    sitekey: null,
    a11y_tfe: null,
    pingdom: ee.Browser.type === "safari" && ee.System.os !== "windows" && ee.System.os !== "mac" && ee.System.os !== "ios" && ee.System.os !== "android",
    assetDomain: "https://newassets.hcaptcha.com",
    assetUrl: "https://newassets.hcaptcha.com/captcha/v1/14dbe0f1619b8014e2630bcdde727e7785a80dee/static",
    width: null,
    height: null,
    mobile: null,
    orientation: "portrait",
    challenge_type: null
  };
  var ve = {
    se: null,
    custom: false,
    tplinks: "on",
    language: null,
    reportapi: "https://accounts.hcaptcha.com",
    endpoint: fe,
    pstIssuer: "https://pst-issuer.hcaptcha.com",
    size: "normal",
    theme: "light",
    mode: undefined,
    assethost: null,
    imghost: null,
    recaptchacompat: "true",
    pat: "on",
    confirmNav: false
  };
  var we = "https://30910f52569b4c17b1081ead2dae43b4@sentry.hcaptcha.com/6";
  var be = "14dbe0f1619b8014e2630bcdde727e7785a80dee";
  var _e = "prod";
  function Ce(e, t) {
    e.style.width = "304px";
    e.style.height = "78px";
    e.style.backgroundColor = "#f9e5e5";
    e.style.position = "relative";
    e.innerHTML = "";
    var n = document.createElement("div");
    n.style.width = "284px";
    n.style.position = "absolute";
    n.style.top = "12px";
    n.style.left = "10px";
    n.style.color = "#7c0a06";
    n.style.fontSize = "14px";
    n.style.fontWeight = "normal";
    n.style.lineHeight = "18px";
    n.innerHTML = t || "Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> to complete this captcha.";
    e.appendChild(n);
  }
  function ke(e) {
    for (var t = document.getElementsByClassName("h-captcha"), n = [], r = 0; r < t.length; r++) {
      n.push(t[r]);
    }
    var i = [];
    if (ve.recaptchacompat !== "off") {
      for (var o = document.getElementsByClassName("g-recaptcha"), a = 0; a < o.length; a++) {
        i.push(o[a]);
      }
    }
    for (var s = [].concat(n, i), c = 0; c < s.length; c++) {
      e(s[c]);
    }
  }
  var Ee = "The captcha failed to load.";
  var xe = [];
  function Ve(e) {
    var t = [];
    var n = /(https?|wasm):\/\//;
    var r = /^at /;
    var i = /:\d+:\d+/g;
    for (var o = 0, a = e.length; o < a; o++) {
      var s = e[o];
      if (!n.test(s)) {
        var c = s.trim().replace(r, "").replace(i, "");
        t.push(c);
      }
    }
    return t.join("\n").trim();
  }
  function Se(e) {
    if (e && typeof e == "string" && xe.indexOf(e) === -1 && !(xe.length >= 10)) {
      var t = Ve(e.trim().split("\n").slice(0, 2));
      xe.push(t);
    }
  }
  function Te(e) {
    if (!e || typeof e != "object") {
      e = {
        name: "error",
        message: "",
        stack: ""
      };
    }
    var t = {
      message: e.name + ": " + e.message
    };
    if (e.stack) {
      t.stack_trace = {
        trace: e.stack
      };
    }
    Pe("report error", "internal", "debug", t);
    Me(e.message || "internal error", "error", ye.file, e);
  }
  function Re(e) {
    return function () {
      try {
        return e.apply(this, arguments);
      } catch (zn) {
        Te(zn);
        ke(function (e) {
          Ce(e, Ee);
        });
        throw zn;
      }
    };
  }
  function Ue(e) {
    if (ve.sentry) {
      var t = false;
      var n = false;
      try {
        t = window.location.href.indexOf("chargebee.com") !== -1;
        n = window.location.href.indexOf("kobo") !== -1;
      } catch (Kn) {}
      if (window.Raven) {
        Raven.config(we, {
          release: be,
          environment: _e,
          autoBreadcrumbs: {
            xhr: true,
            dom: true,
            sentry: true
          },
          tags: {
            "site-host": ye.host,
            "site-key": ye.sitekey,
            "endpoint-url": ve.endpoint,
            "asset-url": ye.assetUrl
          },
          sampleRate: t || n ? 1 : 0.01,
          ignoreErrors: ["Cannot set properties of undefined (setting 'data')", "canvas.contentDocument", "Can't find variable: ZiteReader", "Cannot redefine property: hcaptcha", "Cannot redefine property: BetterJsPop", "grecaptcha is not defined", "jQuery is not defined", "$ is not defined", "Script is not a function"]
        });
      }
      if (window.Raven) {
        Raven.setUserContext({
          "Browser-Agent": ee.Browser.agent,
          "Browser-Type": ee.Browser.type,
          "Browser-Version": ee.Browser.version,
          "System-OS": ee.System.os,
          "System-Version": ee.System.version,
          "Is-Mobile": ee.System.mobile
        });
      }
      Pe(ye.file + "_internal", "setup", "info");
      if (e) {
        window.onerror = function (e, t, n, r, i) {
          if (!i || typeof i != "object") {
            i = {};
          }
          var o = i.name || "Error";
          var a = i.stack || "";
          Re(Se)(a);
          if (a.indexOf("chrome-extension://") === -1 && a.indexOf("safari-extension://") === -1 && a.indexOf("moz-extension://") === -1 && a.indexOf("chrome://internal-") === -1 && a.indexOf("/hammerhead.js") === -1 && a.indexOf("eval at buildCode") === -1 && a.indexOf("u.c.b.r.o.w.s.e.r/ucbrowser_script.js") === -1) {
            Pe(e, "global", "debug", {
              name: o,
              url: t,
              line: n,
              column: r,
              stack: a
            });
            Oe("global", i, {
              message: e
            });
          }
        };
      }
    }
  }
  function Me(e, t, n, r) {
    t = t || "error";
    if (ve.sentry) {
      var i = t === "warn" ? "warning" : t;
      if (window.Raven) {
        Raven.captureMessage(e, {
          level: i,
          logger: n,
          extra: r
        });
      }
    }
  }
  function Oe(e, t, n) {
    (n = n || {}).error = t;
    return Me(t && t.message || "Missing error message", "error", e, n);
  }
  function Pe(e, t, n, r) {
    if (ve.sentry && window.Raven) {
      Raven.captureBreadcrumb({
        message: e,
        category: t,
        level: n,
        data: r
      });
    }
  }
  function We() {
    var e = [];
    var t = null;
    var n = false;
    var r = [];
    function i(t) {
      try {
        if (e.length >= 10) {
          return;
        }
        var n = t.stack;
        if (typeof n != "string") {
          return;
        }
        var r = n.trim().split("\n");
        if (r[0] === "Error") {
          r = r.slice(1);
        }
        var i = /extension/;
        for (var o = r.length; o--;) {
          var a = r[o];
          if (i.test(a)) {
            r = [a];
            break;
          }
        }
        if (o < 0) {
          r = r.slice(-2);
        }
        var s = Ve(r);
        if (s && e.indexOf(s) === -1) {
          e.push(s);
        }
      } catch (t) {
        return;
      }
    }
    function o() {
      if (n) {
        try {
          for (var e = 0; e < r.length; e++) {
            r[e]();
          }
          if (t !== null) {
            clearTimeout(t);
          }
        } catch (o) {
          i(o);
        } finally {
          r = [];
          t = null;
          n = false;
        }
      }
    }
    function a(t, a) {
      var s = Object.getOwnPropertyDescriptor(t, a);
      if (!s || s.writable !== false) {
        var c = Object.prototype.hasOwnProperty.call(t, a);
        var l = t[a];
        t[a] = function () {
          if (n) {
            if (e.length >= 10) {
              o();
            }
            i(new Error());
          }
          return l.apply(t, arguments);
        };
        r.push(function () {
          if (c) {
            t[a] = l;
          } else {
            delete t[a];
          }
        });
      }
    }
    return {
      run: function (e) {
        if (!n) {
          n = true;
          if (isFinite(e)) {
            t = setTimeout(function () {
              o();
            }, e);
          }
          try {
            a(document, "getElementsByClassName");
            a(document, "getElementById");
            a(document, "querySelector");
            a(document, "querySelectorAll");
            a(document, "getElementsByTagName");
            a(console, "log");
          } catch (r) {
            o();
            i(r);
          }
        }
      },
      collect: function () {
        return e.concat(xe);
      }
    };
  }
  var Ne = {
    getCookie: function (e) {
      var t = document.cookie.replace(/ /g, "").split(";");
      try {
        for (var n = "", r = t.length; r-- && !n;) {
          if (t[r].indexOf(e) >= 0) {
            n = t[r];
          }
        }
        return n;
      } catch (Kn) {
        return "";
      }
    },
    hasCookie: function (e) {
      return !!Ne.getCookie(e);
    },
    supportsAPI: function () {
      try {
        return "hasStorageAccess" in document && "requestStorageAccess" in document;
      } catch (Kn) {
        return false;
      }
    },
    hasAccess: function () {
      return new Promise(function (e) {
        document.hasStorageAccess().then(function () {
          e(true);
        }).catch(function () {
          e(false);
        });
      });
    },
    requestAccess: function () {
      try {
        return document.requestStorageAccess();
      } catch (Kn) {
        return Promise.resolve();
      }
    }
  };
  var Ae = {
    array: function (e) {
      if (e.length === 0) {
        return e;
      }
      var t;
      var n;
      for (var r = e.length; --r > -1;) {
        n = Math.floor(Math.random() * (r + 1));
        t = e[r];
        e[r] = e[n];
        e[n] = t;
      }
      return e;
    }
  };
  function je(e) {
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.a = 1;
    this.h = 1;
    this.s = 1;
    this.l = 1;
    this.parseString(e);
  }
  function Fe(e, t, n) {
    if (n < 0) {
      n += 1;
    }
    if (n > 1) {
      n -= 1;
    }
    if (n < 1 / 6) {
      return e + (t - e) * 6 * n;
    } else if (n < 0.5) {
      return t;
    } else if (n < 2 / 3) {
      return e + (t - e) * (2 / 3 - n) * 6;
    } else {
      return e;
    }
  }
  je.hasAlpha = function (e) {
    return typeof e == "string" && (e.indexOf("rgba") !== -1 || e.length === 9 && e[0] === "#");
  };
  je.prototype.parseString = function (e) {
    if (e) {
      if (e.indexOf("#") === 0) {
        this.fromHex(e);
      } else if (e.indexOf("rgb") === 0) {
        this.fromRGBA(e);
      }
    }
  };
  je.prototype.fromHex = function (e) {
    var t = 1;
    if (e.length === 9) {
      t = parseInt(e.substr(7, 2), 16) / 255;
    }
    var n = (e = e.substr(1, 6)).replace(/^([a-f\d])([a-f\d])([a-f\d])?$/i, function (e, t, n, r) {
      return t + t + n + n + r + r;
    });
    var r = parseInt(n, 16);
    var i = r >> 16;
    var o = r >> 8 & 255;
    var a = r & 255;
    this.setRGBA(i, o, a, t);
  };
  je.prototype.fromRGBA = function (e) {
    var t = e.indexOf("rgba");
    var n = e.substr(t).replace(/rgba?\(/, "").replace(/\)/, "").replace(/[\s+]/g, "").split(",");
    var r = Math.floor(parseInt(n[0]));
    var i = Math.floor(parseInt(n[1]));
    var o = Math.floor(parseInt(n[2]));
    var a = parseFloat(n[3]);
    this.setRGBA(r, i, o, a);
  };
  je.prototype.setRGB = function (e, t, n) {
    this.setRGBA(e, t, n, 1);
  };
  je.prototype.setRGBA = function (e, t, n, r) {
    this.r = e;
    this.g = t;
    this.b = n;
    this.a = isNaN(r) ? this.a : r;
    this.updateHSL();
  };
  je.prototype.hsl2rgb = function (e, t, n) {
    if (t === 0) {
      var r = Math.round(n * 255);
      this.setRGB(r, r, r);
      return this;
    }
    var i = n <= 0.5 ? n * (1 + t) : n + t - n * t;
    var o = n * 2 - i;
    this.r = Math.round(Fe(o, i, e + 1 / 3) * 255);
    this.g = Math.round(Fe(o, i, e) * 255);
    this.b = Math.round(Fe(o, i, e - 1 / 3) * 255);
    this.h = e;
    this.s = t;
    this.l = n;
    return this;
  };
  je.prototype.updateHSL = function () {
    var e;
    var t = this.r / 255;
    var n = this.g / 255;
    var r = this.b / 255;
    var i = Math.max(t, n, r);
    var o = Math.min(t, n, r);
    var a = null;
    var s = (i + o) / 2;
    if (i === o) {
      a = e = 0;
    } else {
      var c = i - o;
      e = s > 0.5 ? c / (2 - i - o) : c / (i + o);
      switch (i) {
        case t:
          a = (n - r) / c + (n < r ? 6 : 0);
          break;
        case n:
          a = (r - t) / c + 2;
          break;
        case r:
          a = (t - n) / c + 4;
      }
      a /= 6;
    }
    this.h = a;
    this.s = e;
    this.l = s;
    return this;
  };
  je.prototype.getHex = function () {
    return "#" + (16777216 + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
  };
  je.prototype.getRGBA = function () {
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
  };
  je.prototype.clone = function () {
    var e = new je();
    e.setRGBA(this.r, this.g, this.b, this.a);
    return e;
  };
  je.prototype.mix = function (e, t) {
    if (!(e instanceof je)) {
      e = new je(e);
    }
    var n = new je();
    var r = Math.round(this.r + t * (e.r - this.r));
    var i = Math.round(this.g + t * (e.g - this.g));
    var o = Math.round(this.b + t * (e.b - this.b));
    n.setRGB(r, i, o);
    return n;
  };
  je.prototype.blend = function (e, t) {
    var n;
    if (!(e instanceof je)) {
      e = new je(e);
    }
    var r = [];
    for (var i = 0; i < t; i++) {
      n = this.mix.call(this, e, i / t);
      r.push(n);
    }
    return r;
  };
  je.prototype.lightness = function (e) {
    if (e > 1) {
      e /= 100;
    }
    this.hsl2rgb(this.h, this.s, e);
    return this;
  };
  je.prototype.saturation = function (e) {
    if (e > 1) {
      e /= 100;
    }
    this.hsl2rgb(this.h, e, this.l);
    return this;
  };
  je.prototype.hue = function (e) {
    this.hsl2rgb(e / 360, this.s, this.l);
    return this;
  };
  var Be = {
    decode: function (e) {
      try {
        var t = e.split(".");
        return {
          header: JSON.parse(atob(t[0])),
          payload: JSON.parse(atob(t[1])),
          signature: atob(t[2].replace(/_/g, "/").replace(/-/g, "+")),
          raw: {
            header: t[0],
            payload: t[1],
            signature: t[2]
          }
        };
      } catch (Kn) {
        throw new Error("Token is invalid.");
      }
    },
    checkExpiration: function (e) {
      if (new Date(e * 1000) <= new Date(Date.now())) {
        throw new Error("Token is expired.");
      }
      return true;
    }
  };
  var Ie = {
    _setup: false,
    _af: null,
    _fps: 60,
    _singleFrame: 1 / 60,
    _lagThreshold: 500,
    _adjustedLag: 1 / 60 * 2,
    _startTime: 0,
    _lastTime: 0,
    _nextTime: 1 / 60,
    _elapsed: 0,
    _difference: 0,
    _renders: [],
    _paused: false,
    _running: false,
    _tick: false,
    frame: 0,
    time: 0,
    requestFrame: null,
    cancelFrame: null,
    _init: function () {
      var e;
      for (var t = window.requestAnimationFrame, n = window.cancelAnimationFrame, r = ["ms", "moz", "webkit", "o"], i = r.length; --i > -1 && !t;) {
        t = window[r[i] + "RequestAnimationFrame"];
        n = window[r[i] + "CancelAnimationFrame"] || window[r[i] + "CancelRequestAnimationFrame"];
      }
      if (t) {
        Ie.requestFrame = t.bind(window);
        Ie.cancelFrame = n.bind(window);
      } else {
        e = Date.now();
        Ie.requestFrame = function (t) {
          window.setTimeout(function () {
            t(Date.now() - e);
          }, Ie._singleFrame * 1000);
        };
        Ie.cancelFrame = function (e) {
          clearTimeout(e);
          return null;
        };
      }
      Ie._setup = true;
      Ie._startTime = Ie._lastTime = Date.now();
    },
    add: function (e, t) {
      Ie._renders.push({
        callback: e,
        paused: !t == false || false
      });
      if (!t == false) {
        Ie.start();
      }
    },
    remove: function (e) {
      for (var t = Ie._renders.length; --t > -1;) {
        if (Ie._renders[t].callback === e) {
          Ie._renders[t].paused = true;
          Ie._renders.splice(t, 1);
        }
      }
    },
    start: function (e) {
      if (Ie._setup === false) {
        Ie._init();
      }
      if (e) {
        for (var t = Ie._renders.length; --t > -1;) {
          if (Ie._renders[t].callback === e) {
            Ie._renders[t].paused = false;
          }
        }
      }
      if (Ie._running !== true) {
        Ie._paused = false;
        Ie._running = true;
        Ie._af = Ie.requestFrame(Ie._update);
      }
    },
    stop: function (e) {
      if (e) {
        for (var t = Ie._renders.length; --t > -1;) {
          if (Ie._renders[t].callback === e) {
            Ie._renders[t].paused = true;
          }
        }
      } else if (Ie._running !== false) {
        Ie._af = Ie.cancelFrame(Ie._af);
        Ie._paused = true;
        Ie._running = false;
      }
    },
    elapsed: function () {
      return Date.now() - Ie._startTime;
    },
    fps: function (e) {
      if (arguments.length) {
        Ie._fps = e;
        Ie._singleFrame = 1 / (Ie._fps || 60);
        Ie._adjustedLag = Ie._singleFrame * 2;
        Ie._nextTime = Ie.time + Ie._singleFrame;
        return Ie._fps;
      } else {
        return Ie._fps;
      }
    },
    isRunning: function () {
      return Ie._running;
    },
    _update: function () {
      if (!Ie._paused && (Ie._elapsed = Date.now() - Ie._lastTime, Ie._tick = false, Ie._elapsed > Ie._lagThreshold && (Ie._startTime += Ie._elapsed - Ie._adjustedLag), Ie._lastTime += Ie._elapsed, Ie.time = (Ie._lastTime - Ie._startTime) / 1000, Ie._difference = Ie.time - Ie._nextTime, Ie._difference > 0 && (Ie.frame++, Ie._nextTime += Ie._difference + (Ie._difference >= Ie._singleFrame ? Ie._singleFrame / 4 : Ie._singleFrame - Ie._difference), Ie._tick = true), Ie._af = Ie.requestFrame(Ie._update), Ie._tick === true && Ie._renders.length > 0)) {
        for (var e = Ie._renders.length; --e > -1;) {
          if (Ie._renders[e] && Ie._renders[e].paused === false) {
            Ie._renders[e].callback(Ie.time);
          }
        }
      }
    }
  };
  function Ze(e) {
    var t;
    var n;
    var r;
    var i = {};
    for (var o = e ? e.indexOf("&") >= 0 ? e.split("&") : [e] : [], a = 0; a < o.length; a++) {
      if (o[a].indexOf("=") >= 0) {
        t = o[a].split("=");
        n = decodeURIComponent(t[0]);
        if ((r = decodeURIComponent(t[1])) === "false" || r === "true") {
          r = r === "true";
        }
        if (n === "theme" || n === "themeConfig") {
          try {
            r = JSON.parse(r);
          } catch (Kn) {}
        }
        i[n] = r;
      }
    }
    return i;
  }
  function De(e) {
    var t = [];
    for (var n in e) {
      var r = e[n];
      r = typeof r == "object" ? JSON.stringify(r) : r;
      t.push([encodeURIComponent(n), encodeURIComponent(r)].join("="));
    }
    return t.join("&");
  }
  var ze = {
    __proto__: null,
    Decode: Ze,
    Encode: De
  };
  function Ke(e, t, n) {
    return Math.min(Math.max(e, t), n);
  }
  var Le = {
    __proto__: null,
    clamp: Ke,
    range: function (e, t, n, r, i, o) {
      var a = (e - t) * (i - r) / (n - t) + r;
      if (o === false) {
        return a;
      } else {
        return Ke(a, Math.min(r, i), Math.max(r, i));
      }
    },
    toRadians: function (e) {
      return e * (Math.PI / 180);
    },
    toDegrees: function (e) {
      return e * 180 / Math.PI;
    }
  };
  function He(e, t) {
    this._period = e;
    this._interval = t;
    this._date = [];
    this._data = [];
    this._prevTimestamp = 0;
    this._meanPeriod = 0;
    this._medianPeriod = 0;
    this._medianMaxHeapSize = 32;
    this._medianMinHeap = [];
    this._medianMaxHeap = [];
    this._meanCounter = 0;
  }
  function $e(e) {
    var t = [].slice.call(arguments, 1);
    if (typeof e == "string") {
      if (window[e]) {
        if (typeof window[e] == "function") {
          window[e].apply(null, t);
        } else {
          console.log("[hCaptcha] Callback '" + e + "' is not a function.");
        }
      } else {
        console.log("[hCaptcha] Callback '" + e + "' is not defined.");
      }
    } else if (typeof e == "function") {
      e.apply(null, t);
    } else {
      console.log("[hcaptcha] Invalid callback '" + e + "'.");
    }
  }
  function Je() {
    try {
      $e.apply(null, arguments);
    } catch (zn) {
      console.error("[hCaptcha] There was an error in your callback.");
      console.error(zn);
    }
  }
  function Ge(e, t) {
    for (var n = ["hl", "custom", "tplinks", "sitekey", "theme", "type", "size", "tabindex", "callback", "expired-callback", "chalexpired-callback", "error-callback", "open-callback", "close-callback", "endpoint", "challenge-container", "confirm-nav", "orientation", "mode"], r = {}, i = 0; i < n.length; i++) {
      var o = n[i];
      var a = t && t[o];
      a ||= e.getAttribute("data-" + o);
      if (a) {
        r[o] = a;
      }
    }
    return r;
  }
  He.prototype.getMeanPeriod = function () {
    return this._meanPeriod;
  };
  He.prototype.getMedianPeriod = function () {
    return this._medianPeriod;
  };
  He.prototype.getData = function () {
    this._cleanStaleData();
    return this._data;
  };
  He.prototype.getSize = function () {
    this._cleanStaleData();
    return this._data.length;
  };
  He.prototype.getCapacity = function () {
    if (this._period === 0) {
      return this._interval;
    } else {
      return Math.ceil(this._interval / this._period);
    }
  };
  He.prototype.push = function (e, t) {
    this._cleanStaleData();
    var n = this._date.length === 0;
    if (e - (this._date[this._date.length - 1] || 0) >= this._period) {
      this._date.push(e);
      this._data.push(t);
    }
    if (!n) {
      var r = e - this._prevTimestamp;
      this._meanPeriod = (this._meanPeriod * this._meanCounter + r) / (this._meanCounter + 1);
      this._meanCounter++;
      this._medianPeriod = this._calculateMedianPeriod(r);
    }
    this._prevTimestamp = e;
  };
  He.prototype._calculateMedianPeriod = function (e) {
    this._medianMaxHeap ||= [];
    this._medianMinHeap ||= [];
    var t = this._fetchMedianPeriod();
    if (this._medianMaxHeap.length === 0 && this._medianMinHeap.length === 0) {
      this._medianMaxHeap.push(e);
    } else if (e <= t) {
      this._medianMaxHeap.push(e);
      this._medianMaxHeap.sort(function (e, t) {
        return t - e;
      });
    } else {
      this._medianMinHeap.push(e);
      this._medianMinHeap.sort(function (e, t) {
        return e - t;
      });
    }
    this._rebalanceHeaps();
    return this._fetchMedianPeriod();
  };
  He.prototype._rebalanceHeaps = function () {
    var e = null;
    if (this._medianMaxHeap.length > this._medianMinHeap.length + 1) {
      e = this._medianMaxHeap.shift();
      this._medianMinHeap.push(e);
      this._medianMinHeap.sort(function (e, t) {
        return e - t;
      });
    } else if (this._medianMinHeap.length > this._medianMaxHeap.length + 1) {
      e = this._medianMinHeap.shift();
      this._medianMaxHeap.push(e);
      this._medianMaxHeap.sort(function (e, t) {
        return t - e;
      });
    }
    if (this._medianMinHeap.length == this._medianMaxHeap.length && this._medianMaxHeap.length > this._medianMaxHeapSize) {
      this._medianMinHeap.pop();
      this._medianMaxHeap.pop();
    }
  };
  He.prototype._fetchMedianPeriod = function () {
    if (this._medianMaxHeap.length > this._medianMinHeap.length) {
      return this._medianMaxHeap[0];
    } else if (this._medianMinHeap.length > this._medianMaxHeap.length) {
      return this._medianMinHeap[0];
    } else if (this._medianMaxHeap.length !== 0 && this._medianMinHeap.length !== 0) {
      return (this._medianMaxHeap[0] + this._medianMinHeap[0]) / 2;
    } else {
      return -1;
    }
  };
  He.prototype._cleanStaleData = function () {
    var e = Date.now();
    for (var t = this._date.length - 1; t >= 0; t--) {
      if (e - this._date[t] >= this._interval) {
        this._date.splice(0, t + 1);
        this._data.splice(0, t + 1);
        break;
      }
    }
  };
  var Qe;
  var qe = {
    UUID: function (e) {
      return /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(e) || false;
    },
    UUIDv4: function (e) {
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e) || false;
    },
    URL: function (e) {
      var t = new RegExp("^(http|https)://");
      var n = new RegExp("^((?!(data|javascript):).)*$");
      return t.test(e) && n.test(e) && e.indexOf("#") === -1;
    },
    IMAGE: function (e) {
      return (e.indexOf("https://") === 0 || e.indexOf("/") === 0) && e.endsWith(".png");
    }
  };
  function Xe(e) {
    return new Promise(function (t, n) {
      e(t, n, function r() {
        e(t, n, r);
      });
    });
  }
  function Ye(e, t) {
    var n = "attempts" in (t = t || {}) ? t.attempts : 1;
    var r = t.delay || 0;
    var i = t.onFail;
    return Xe(function (t, o, a) {
      e().then(t, function (e) {
        var t = n-- > 0;
        if (i) {
          var s = i(e, n);
          if (s) {
            t = s.retry !== false && t;
            r = s.delay;
          }
        }
        if (t) {
          setTimeout(a, r || 0);
        } else {
          o(e);
        }
      });
    });
  }
  function et(e) {
    var t;
    var n;
    var r = typeof e == "string" ? e : JSON.stringify(e);
    var i = -1;
    Qe = Qe || function () {
      var e;
      var t;
      var n;
      var r = [];
      for (t = 0; t < 256; t++) {
        e = t;
        n = 0;
        for (; n < 8; n++) {
          e = e & 1 ? e >>> 1 ^ 3988292384 : e >>> 1;
        }
        r[t] = e;
      }
      return r;
    }();
    t = 0;
    n = r.length;
    for (; t < n; t += 1) {
      i = i >>> 8 ^ Qe[(i ^ r.charCodeAt(t)) & 255];
    }
    return (i ^ -1) >>> 0;
  }
  var tt = {
    __proto__: null,
    createErrorsAggregator: We,
    uuid: function () {
      return Math.random().toString(36).substr(2);
    },
    Render: Ie,
    JWT: Be,
    Color: je,
    Shuffle: Ae,
    MathUtil: Le,
    Storage: Ne,
    Query: ze,
    TimeBuffer: He,
    _stackTraceSet: xe,
    toRefinedString: Ve,
    reportError: Te,
    errorWrapper: Re,
    initSentry: Ue,
    sentryMessage: Me,
    sentryError: Oe,
    sentryBreadcrumb: Pe,
    renderFallback: Ce,
    forEachCaptchaNode: ke,
    callUserFunction: Je,
    composeParams: Ge,
    is: qe,
    promiseRecursive: Xe,
    promiseRetry: Ye,
    crc32: et,
    TaskContext: {
      container: {},
      set: function (e, t) {
        this.container[e] = t;
      },
      clear: function () {
        this.container = {};
      }
    }
  };
  var nt = {
    eventName: function (e, t) {
      var n = e;
      if (e === "down" || e === "up" || e === "move" || e === "over" || e === "out") {
        n = (!ee.System.mobile || t === "desktop") && t !== "mobile" || e !== "down" && e !== "up" && e !== "move" ? "mouse" + e : e === "down" ? "touchstart" : e === "up" ? "touchend" : "touchmove";
      } else if (e === "enter") {
        n = "keydown";
      }
      return n;
    },
    actionName: function (e) {
      var t = e;
      if (t === "touchstart" || t === "mousedown") {
        t = "down";
      } else if (t === "touchmove" || t === "mousemove") {
        t = "move";
      } else if (t === "touchend" || t === "mouseup") {
        t = "up";
      } else if (t === "mouseover") {
        t = "over";
      } else if (t === "mouseout") {
        t = "out";
      }
      return t;
    },
    eventCallback: function (e, t, n) {
      var r = nt.actionName(e);
      return function (i) {
        i = i || window.event;
        if (r === "down" || r === "move" || r === "up" || r === "over" || r === "out" || r === "click") {
          var o = nt.eventCoords(i);
          if (!o) {
            return;
          }
          var a = n.getBoundingClientRect();
          i.windowX = o.x;
          i.windowY = o.y;
          i.elementX = i.windowX - (a.x || a.left);
          i.elementY = i.windowY - (a.y || a.top);
        }
        i.keyNum = i.which || i.keyCode || 0;
        if (e !== "enter" || i.keyNum === 13 || i.keyNum === 32) {
          i.action = r;
          i.targetElement = n;
          t(i);
        }
      };
    },
    eventCoords: function (e) {
      if (!e) {
        return null;
      }
      var t = e;
      if (e.touches || e.changedTouches) {
        var n = e.touches && e.touches.length >= 1 ? e.touches : e.changedTouches;
        if (n && n[0]) {
          t = n[0];
        }
      }
      if (typeof t.pageX == "number" && typeof t.pageY == "number") {
        return {
          x: t.pageX,
          y: t.pageY
        };
      } else if (typeof t.clientX == "number" && typeof t.clientY == "number") {
        return {
          x: t.clientX,
          y: t.clientY
        };
      } else {
        return null;
      }
    }
  };
  var rt = ["Webkit", "Moz", "ms"];
  var it = document.createElement("div").style;
  var ot = {};
  function at(e) {
    var t = ot[e];
    return t || (e in it ? e : ot[e] = function (e) {
      var t = e[0].toUpperCase() + e.slice(1);
      for (var n = rt.length; n--;) {
        if ((e = rt[n] + t) in it) {
          return e;
        }
      }
    }(e) || e);
  }
  function st(e, t, n) {
    this.dom = null;
    this._clss = [];
    this._nodes = [];
    this._listeners = [];
    this._frag = null;
    if (e && typeof e == "object") {
      this.dom = e;
      var r = [];
      var i = [];
      if (typeof e.className == "string") {
        i = e.className.split(" ");
      }
      for (var o = 0; o < i.length; o++) {
        if (i[o] !== "" && i[o] !== " ") {
          r.push(i[o]);
        }
      }
      this._clss = r;
    } else {
      if (n === undefined || n === null) {
        n = true;
      }
      if (!e || typeof e == "string" && (e.indexOf("#") >= 0 || e.indexOf(".") >= 0)) {
        if (e) {
          t = e;
        }
        e = "div";
      }
      this.dom = document.createElement(e);
      if (t) {
        if (t.indexOf("#") >= 0) {
          this.dom.id = t.split("#")[1];
        } else {
          if (t.indexOf(".") >= 0) {
            t = t.split(".")[1];
          }
          this.addClass.call(this, t);
        }
      }
    }
    if (n === true) {
      this._frag = document.createDocumentFragment();
      this._frag.appendChild(this.dom);
    }
  }
  function ct(e) {
    if (e === null) {
      return "";
    }
    var t = [];
    lt(e, t);
    return t.join("&");
  }
  function lt(e, t) {
    var n;
    var r;
    if (typeof e == "object") {
      for (r in e) {
        if (ut(n = e[r]) === true) {
          lt(n, t);
        } else {
          t[t.length] = ht(r, n);
        }
      }
    } else if (Array.isArray(e) === true) {
      for (var i = 0; i < e.length; i++) {
        if (ut(n = e[i]) === true) {
          lt(e, t);
        } else {
          t[t.length] = ht(r, n);
        }
      }
    } else {
      t[t.length] = ht(e);
    }
  }
  function ut(e) {
    return Array.isArray(e) === true || typeof e == "object";
  }
  function ht(e, t) {
    return encodeURIComponent(e) + "=" + encodeURIComponent(t === null ? "" : t);
  }
  st.prototype.cloneNode = function (e) {
    try {
      return this.dom.cloneNode(e);
    } catch (Kn) {
      Oe("element", Kn);
      return null;
    }
  };
  st.prototype.createElement = function (e, t) {
    try {
      var n = new st(e, t, false);
      this.appendElement.call(this, n);
      this._nodes.push(n);
      return n;
    } catch (Kn) {
      Oe("element", Kn);
      return null;
    }
  };
  st.prototype.appendElement = function (e) {
    if (e === undefined) {
      return Te({
        name: "DomElement Add Child",
        message: "Child Element is undefined"
      });
    }
    var t;
    t = e._frag !== undefined && e._frag !== null ? e._frag : e.dom !== undefined ? e.dom : e;
    try {
      if (e instanceof st) {
        e._parent = this;
      }
      this.dom.appendChild(t);
    } catch (Kn) {
      Te({
        name: "DomElement Add Child",
        message: "Failed to append child."
      });
    }
    return this;
  };
  st.prototype.removeElement = function (e) {
    try {
      var t;
      if (e._nodes) {
        for (t = e._nodes.length; t--;) {
          e.removeElement(e._nodes[t]);
        }
      }
      for (t = this._nodes.length; --t > -1;) {
        if (this._nodes[t] === e) {
          this._nodes.splice(t, 1);
        }
      }
      var n = e instanceof st ? e.dom : e;
      var r = n.parentNode === this.dom ? this.dom : n.parentNode;
      if (r.removeChild) {
        r.removeChild(n);
      }
      if (!r) {
        throw new Error("Child component does not have correct setup");
      }
      if (e.__destroy) {
        e.__destroy();
      }
    } catch (Kn) {
      Te({
        name: "DomElement Remove Child",
        message: Kn.message || "Failed to remove child."
      });
    }
  };
  st.prototype.addClass = function (e) {
    if (this.hasClass.call(this, e) === false) {
      this._clss.push(e);
      this.dom.className = this._clss.join(" ");
    }
    return this;
  };
  st.prototype.hasClass = function (e) {
    for (var t = this.dom.className.split(" ").indexOf(e) !== -1, n = this._clss.length; n-- && !t;) {
      t = this._clss[n] === e;
    }
    return t;
  };
  st.prototype.removeClass = function (e) {
    for (var t = this._clss.length; --t > -1;) {
      if (this._clss[t] === e) {
        this._clss.splice(t, 1);
      }
    }
    this.dom.className = this._clss.join(" ");
    return this;
  };
  st.prototype.text = function (e) {
    if (this && this.dom) {
      if (!e) {
        return this.dom.textContent;
      }
      for (var t, n, r, i, o = /&(.*?);/g, a = /<[a-z][\s\S]*>/i; (t = o.exec(e)) !== null;) {
        if (a.test(t[0]) === false) {
          r = t[0];
          i = undefined;
          (i = document.createElement("div")).innerHTML = r;
          n = i.textContent;
          e = e.replace(new RegExp(t[0], "g"), n);
        } else {
          e = e.replace(t[0], "");
        }
      }
      this.dom.textContent = e;
      return this;
    }
  };
  st.prototype.content = st.prototype.text;
  st.prototype.css = function (e) {
    var t;
    var n = ee.Browser.type === "ie" && ee.Browser.version === 8;
    var r = ee.Browser.type === "safari" && Math.floor(ee.Browser.version) === 12;
    for (var i in e) {
      t = e[i];
      try {
        if (i === "transition" && r) {
          continue;
        }
        if (i !== "opacity" && i !== "zIndex" && i !== "fontWeight" && isFinite(t) && parseFloat(t) === t) {
          t += "px";
        }
        var o = at(i);
        if (n && i === "opacity") {
          this.dom.style.filter = "alpha(opacity=" + t * 100 + ")";
        } else if (n && je.hasAlpha(t)) {
          this.dom.style[o] = new je(t).getHex();
        } else {
          this.dom.style[o] = t;
        }
      } catch (zn) {}
    }
    return this;
  };
  st.prototype.backgroundImage = function (e, t, n, r) {
    var i = t !== undefined && n !== undefined;
    var o = {
      "-ms-high-contrast-adjust": "none"
    };
    if (typeof t == "object") {
      r = t;
    }
    if (r === undefined) {
      r = {};
    }
    if (i) {
      var a = e.width / e.height;
      var s = t;
      var c = s / a;
      if (r.cover && c < n) {
        s = (c = n) * a;
      }
      if (r.contain && c > n) {
        s = (c = n) * a;
      }
      o.width = s;
      o.height = c;
      if (r.center) {
        o.marginLeft = -s / 2;
        o.marginTop = -c / 2;
        o.position = "absolute";
        o.left = "50%";
        o.top = "50%";
      }
      if (r.left || r.right) {
        o.left = r.left || 0;
        o.top = r.top || 0;
      }
    }
    if (ee.Browser.type === "ie" && ee.Browser.version === 8) {
      o.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + e.src + "',sizingMethod='scale')";
    } else {
      o.background = "url(" + e.src + ")";
      o.backgroundPosition = "50% 50%";
      o.backgroundRepeat = "no-repeat";
      o.backgroundSize = i ? s + "px " + c + "px" : r.cover ? "cover" : r.contain ? "contain" : "100%";
    }
    this.css.call(this, o);
  };
  st.prototype.setAttribute = function (e, t) {
    var n;
    if (typeof e == "object") {
      for (var r in e) {
        n = e[r];
        this.dom.setAttribute(r, n);
      }
    } else {
      this.dom.setAttribute(e, t);
    }
  };
  st.prototype.removeAttribute = function (e, t) {
    var n;
    if (typeof e == "object") {
      for (var r in e) {
        n = e[r];
        this.dom.removeAttribute(r, n);
      }
    } else {
      this.dom.removeAttribute(e, t);
    }
  };
  st.prototype.addEventListener = function (e, t, n) {
    var r = {
      event: nt.eventName(e),
      handler: nt.eventCallback(e, t, this.dom),
      callback: t
    };
    this._listeners.push(r);
    if (this.dom.addEventListener) {
      this.dom.addEventListener(r.event, r.handler, n);
    } else {
      this.dom.attachEvent("on" + r.event, r.handler);
    }
    if (e !== r.event && (r.event.indexOf("mouse") >= 0 || r.event.indexOf("touch") >= 0)) {
      var i = r.event.indexOf("touch") >= 0 ? "desktop" : "mobile";
      var o = nt.eventName(e, i);
      if (o === r.event) {
        return;
      }
      this.addEventListener.call(this, o, t, n);
    }
  };
  st.prototype.removeEventListener = function (e, t, n) {
    var r;
    for (var i = this._listeners.length, o = nt.eventName(e); --i > -1;) {
      if ((r = this._listeners[i]).event === o && r.callback === t) {
        this._listeners.splice(i, 1);
        if (this.dom.removeEventListener) {
          this.dom.removeEventListener(r.event, r.handler, n);
        } else {
          this.dom.detachEvent("on" + r.event, r.handler);
        }
      }
    }
  };
  st.prototype.focus = function () {
    this.dom.focus();
  };
  st.prototype.blur = function () {
    this.dom.blur();
  };
  st.prototype.html = function (e) {
    if (e) {
      this.dom.innerHTML = e;
    }
    return this.dom.innerHTML;
  };
  st.prototype.__destroy = function () {
    var e;
    for (var t = this._listeners.length; --t > -1;) {
      e = this._listeners[t];
      this._listeners.splice(t, 1);
      if (this.dom.removeEventListener) {
        this.dom.removeEventListener(e.event, e.handler);
      } else {
        this.dom.detachEvent("on" + e.event, e.handler);
      }
    }
    this.dom = null;
    this._clss = [];
    this._nodes = [];
    this._listeners = [];
    this._frag = null;
    e = null;
    return null;
  };
  st.prototype.isConnected = function () {
    return !!this.dom && ("isConnected" in this.dom ? this.dom.isConnected : !this.dom.ownerDocument || !(this.dom.ownerDocument.compareDocumentPosition(this.dom) & this.dom.DOCUMENT_POSITION_DISCONNECTED));
  };
  var dt = {
    af: "Afrikaans",
    sq: "Albanian",
    am: "Amharic",
    ar: "Arabic",
    hy: "Armenian",
    az: "Azerbaijani",
    eu: "Basque",
    be: "Belarusian",
    bn: "Bengali",
    bg: "Bulgarian",
    bs: "Bosnian",
    my: "Burmese",
    ca: "Catalan",
    ceb: "Cebuano",
    zh: "Chinese",
    "zh-CN": "Chinese Simplified",
    "zh-TW": "Chinese Traditional",
    co: "Corsican",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch",
    en: "English",
    eo: "Esperanto",
    et: "Estonian",
    fi: "Finnish",
    fr: "French",
    fy: "Frisian",
    gd: "Gaelic",
    gl: "Galacian",
    ka: "Georgian",
    de: "German",
    el: "Greek",
    gu: "Gujurati",
    ht: "Haitian",
    ha: "Hausa",
    haw: "Hawaiian",
    he: "Hebrew",
    hi: "Hindi",
    hmn: "Hmong",
    hu: "Hungarian",
    is: "Icelandic",
    ig: "Igbo",
    id: "Indonesian",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    jw: "Javanese",
    kn: "Kannada",
    kk: "Kazakh",
    km: "Khmer",
    rw: "Kinyarwanda",
    ky: "Kirghiz",
    ko: "Korean",
    ku: "Kurdish",
    lo: "Lao",
    la: "Latin",
    lv: "Latvian",
    lt: "Lithuanian",
    lb: "Luxembourgish",
    mk: "Macedonian",
    mg: "Malagasy",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    mi: "Maori",
    mr: "Marathi",
    mn: "Mongolian",
    ne: "Nepali",
    no: "Norwegian",
    ny: "Nyanja",
    or: "Oriya",
    fa: "Persian",
    pl: "Polish",
    "pt-BR": "Portuguese (Brazil)",
    pt: "Portuguese (Portugal)",
    ps: "Pashto",
    pa: "Punjabi",
    ro: "Romanian",
    ru: "Russian",
    sm: "Samoan",
    sn: "Shona",
    sd: "Sindhi",
    si: "Singhalese",
    sr: "Serbian",
    sk: "Slovak",
    sl: "Slovenian",
    so: "Somani",
    st: "Southern Sotho",
    es: "Spanish",
    su: "Sundanese",
    sw: "Swahili",
    sv: "Swedish",
    tl: "Tagalog",
    tg: "Tajik",
    ta: "Tamil",
    tt: "Tatar",
    te: "Teluga",
    th: "Thai",
    tr: "Turkish",
    tk: "Turkmen",
    ug: "Uyghur",
    uk: "Ukrainian",
    ur: "Urdu",
    uz: "Uzbek",
    vi: "Vietnamese",
    cy: "Welsh",
    xh: "Xhosa",
    yi: "Yiddish",
    yo: "Yoruba",
    zu: "Zulu"
  };
  var pt = {
    zh: {
      "I am human": "我是人"
    },
    ar: {
      "I am human": "أنا الإنسان"
    },
    af: {
      "I am human": "Ek is menslike"
    },
    am: {
      "I am human": "እኔ ሰው ነኝ"
    },
    hy: {
      "I am human": "Ես մարդ եմ"
    },
    az: {
      "I am human": "Mən insanam"
    },
    eu: {
      "I am human": "Gizakia naiz"
    },
    bn: {
      "I am human": "আমি মানব নই"
    },
    bg: {
      "I am human": "Аз съм човек"
    },
    ca: {
      "I am human": "Sóc humà"
    },
    hr: {
      "I am human": "Ja sam čovjek"
    },
    cs: {
      "I am human": "Jsem člověk"
    },
    da: {
      "I am human": "Jeg er et menneske"
    },
    nl: {
      "I am human": "Ik ben een mens"
    },
    et: {
      "I am human": "Ma olen inimeste"
    },
    fi: {
      "I am human": "Olen ihminen"
    },
    fr: {
      "I am human": "Je suis humain"
    },
    gl: {
      "I am human": "Eu son humano"
    },
    ka: {
      "I am human": "მე ვარ ადამიანი"
    },
    de: {
      "I am human": "Ich bin ein Mensch"
    },
    el: {
      "I am human": "Είμαι άνθρωπος"
    },
    gu: {
      "I am human": "હું માનવ છું"
    },
    iw: {
      "I am human": ". אני אנושי"
    },
    hi: {
      "I am human": "मैं मानव हूं"
    },
    hu: {
      "I am human": "Nem vagyok robot"
    },
    is: {
      "I am human": "Ég er manneskja"
    },
    id: {
      "I am human": "Aku manusia"
    },
    it: {
      "I am human": "Sono un essere umano"
    },
    ja: {
      "I am human": "私は人間です"
    },
    kn: {
      "I am human": "ನಾನು ಮಾನವನು"
    },
    ko: {
      "I am human": "사람입니다"
    },
    lo: {
      "I am human": "ຂ້ອຍເປັນມະນຸດ"
    },
    lv: {
      "I am human": "Es esmu cilvēks"
    },
    lt: {
      "I am human": "Aš esu žmogaus"
    },
    ms: {
      "I am human": "Saya manusia"
    },
    ml: {
      "I am human": "ഞാൻ മനുഷ്യനാണ്"
    },
    mr: {
      "I am human": "मी मानवी आहे"
    },
    mn: {
      "I am human": "Би бол хүн"
    },
    no: {
      "I am human": "Jeg er menneskelig"
    },
    fa: {
      "I am human": "من انسانی هستم"
    },
    pl: {
      "I am human": "Jestem człowiekiem"
    },
    pt: {
      "I am human": "Sou humano"
    },
    ro: {
      "I am human": "Eu sunt om"
    },
    ru: {
      "I am human": "Я человек"
    },
    sr: {
      "I am human": "Ja sam ljudski"
    },
    si: {
      "I am human": "මම මිනිස්සු"
    },
    sk: {
      "I am human": "Ja som človek"
    },
    sl: {
      "I am human": "Jaz sem človeški"
    },
    es: {
      "I am human": "Soy humano"
    },
    sw: {
      "I am human": "Mimi ni binadamu"
    },
    sv: {
      "I am human": "Jag är människa"
    },
    ta: {
      "I am human": "நான் மனித"
    },
    te: {
      "I am human": "నేను మనిషిని"
    },
    th: {
      "I am human": "ผมมนุษย์"
    },
    tr: {
      "I am human": "Ben bir insanım"
    },
    uk: {
      "I am human": "Я людини"
    },
    ur: {
      "I am human": "میں انسان ہوں"
    },
    vi: {
      "I am human": "Tôi là con người"
    },
    zu: {
      "I am human": "Ngingumuntu"
    }
  };
  var ft = null;
  var mt = {
    translate: function (e, t) {
      var n = mt.getBestTrans(pt);
      var r = n && n[e];
      r = r || e;
      if (t) {
        var i = Object.keys(t);
        for (var o = i.length; o--;) {
          r = r.replace(new RegExp("{{" + i[o] + "}}", "g"), t[i[o]]);
        }
      }
      return r;
    },
    getBestTrans: function (e) {
      var t = mt.getLocale();
      if (t in e) {
        return e[t];
      } else if (mt.getShortLocale(t) in e) {
        return e[mt.getShortLocale(t)];
      } else if ("en" in e) {
        return e.en;
      } else {
        return null;
      }
    },
    resolveLocale: function (e) {
      var t = mt.getShortLocale(e);
      if (t === "in") {
        e = "id";
      }
      if (t === "iw") {
        e = "he";
      }
      if (t === "nb") {
        e = "no";
      }
      if (t === "ji") {
        e = "yi";
      }
      if (e === "zh-CN") {
        e = "zh";
      }
      if (t === "jv") {
        e = "jw";
      }
      if (t === "me") {
        e = "bs";
      }
      if (dt[e]) {
        return e;
      } else if (dt[t]) {
        return t;
      } else {
        return "en";
      }
    },
    getLocale: function () {
      return mt.resolveLocale(ft || window.navigator.userLanguage || window.navigator.language);
    },
    setLocale: function (e) {
      if (e === "zh-Hans") {
        e = "zh-CN";
      } else if (e === "zh-Hant") {
        e = "zh-TW";
      }
      ft = e;
    },
    getShortLocale: function (e) {
      if (e.indexOf("-") >= 0) {
        return e.substring(0, e.indexOf("-"));
      } else {
        return e;
      }
    },
    getLangName: function (e) {
      return dt[e];
    },
    isShortLocale: function (e) {
      return e.length === 2 || e.length === 3;
    },
    addTable: function (e, t) {
      t ||= Object.create(null);
      if (pt[e]) {
        var n = pt[e];
        for (var r in t) {
          n[r] = t[r];
        }
      } else {
        pt[e] = t;
      }
      return pt[e];
    },
    getTable: function (e) {
      return pt[e];
    },
    addTables: function (e) {
      for (var t in e) {
        mt.addTable(t, e[t]);
      }
      return pt;
    },
    getTables: function () {
      return pt;
    }
  };
  var gt = {
    400: "Rate limited or network error. Please retry.",
    429: "Your computer or network has sent too many requests.",
    500: "Cannot contact hCaptcha. Check your connection and try again."
  };
  function yt(e) {
    try {
      return mt.translate(gt[e]);
    } catch (Kn) {
      return false;
    }
  }
  var vt = typeof XDomainRequest != "undefined" && !("withCredentials" in XMLHttpRequest.prototype);
  function wt(e, t, n) {
    n = n || {};
    var r = {
      url: t,
      method: e.toUpperCase(),
      responseType: n.responseType || "string",
      dataType: n.dataType || null,
      withCredentials: n.withCredentials || false,
      headers: n.headers || null,
      data: n.data || null,
      timeout: n.timeout || null,
      pst: n.pst || null
    };
    r.legacy = r.withCredentials && vt;
    var i = "fetch" in window && r.pst ? _t : bt;
    if (n.retry) {
      return Ye(function () {
        if (n.data) {
          r.data = typeof n.data == "function" ? n.data() : n.data;
          if (r.dataType === "json" && typeof r.data == "object") {
            r.data = JSON.stringify(r.data);
          } else if (r.dataType === "query") {
            r.data = ct(r.data);
          }
        }
        return i(r);
      }, n.retry);
    } else {
      if (n.data) {
        r.data = typeof n.data == "function" ? n.data() : n.data;
        if (r.dataType === "json" && typeof r.data == "object") {
          r.data = JSON.stringify(r.data);
        } else if (r.dataType === "query") {
          r.data = ct(r.data);
        }
      }
      return i(r);
    }
  }
  function bt(e) {
    var t = e.legacy ? new XDomainRequest() : new XMLHttpRequest();
    var n = typeof e.url == "function" ? e.url() : e.url;
    return new Promise(function (r, i) {
      var o;
      function a(o) {
        return function () {
          var a = t.response;
          var s = t.statusText || "";
          var c = t.status;
          var l = t.readyState;
          if (!a && (t.responseType === "" || t.responseType === "text")) {
            a = t.responseText;
          }
          if (l === 4 || e.legacy) {
            try {
              if (a) {
                var u = t.contentType;
                if (t.getResponseHeader) {
                  u = t.getResponseHeader("content-type");
                }
                if ("ArrayBuffer" in window && a instanceof ArrayBuffer && u && u.toLowerCase().indexOf("application/json") !== -1) {
                  a = new TextDecoder().decode(new Uint8Array(a));
                }
                if (typeof a == "string") {
                  try {
                    a = JSON.parse(a);
                  } catch (h) {
                    Oe("http", h, {
                      url: n,
                      config: e,
                      responseType: t.responseType,
                      contentType: u,
                      response: a
                    });
                  }
                }
              }
            } catch (h) {
              Oe("http", h, {
                contentType: u
              });
              i({
                event: ce,
                endpoint: n,
                response: a,
                state: l,
                status: c,
                message: yt(c || 400) || s
              });
              return;
            }
            if (o === "error" || c >= 400 && c <= 511) {
              i({
                event: ce,
                endpoint: n,
                response: a,
                state: l,
                status: c,
                message: c === 409 && a.error || yt(c || 400) || s
              });
              return;
            }
            r({
              state: l,
              status: c,
              body: a,
              message: s
            });
          }
        };
      }
      if ((t.onload = a("complete"), t.onerror = t.ontimeout = a("error"), t.open(e.method, n), e.responseType === "arraybuffer" && (!e.legacy && "TextDecoder" in window && "ArrayBuffer" in window ? t.responseType = "arraybuffer" : (e.responseType = "json", e.headers.accept = "application/json")), e.timeout && (t.timeout = typeof e.timeout == "function" ? e.timeout(n) : e.timeout), !e.legacy) && (t.withCredentials = e.withCredentials, e.headers)) {
        for (var s in e.headers) {
          o = e.headers[s];
          t.setRequestHeader(s, o);
        }
      }
      setTimeout(function () {
        t.send(e.data);
      }, 0);
    });
  }
  function _t(e) {
    var t;
    var n = typeof e.url == "function" ? e.url() : e.url;
    var r = new Headers();
    if (e.responseType === "json") {
      r.set("content-type", "application/json");
    }
    if (e.headers) {
      for (var i in e.headers) {
        t = e.headers[i];
        r.set(i, t);
      }
    }
    var o = {
      method: e.method,
      credentials: "include",
      body: e.data,
      headers: r
    };
    if (e.pst) {
      var a = {};
      if (e.pst === "token-request") {
        a = {
          version: 1,
          operation: "token-request"
        };
      } else if (e.pst === "token-redemption") {
        a = {
          version: 1,
          operation: "token-redemption",
          refreshPolicy: "refresh"
        };
      } else if (e.pst === "send-redemption-record") {
        a = {
          version: 1,
          operation: "send-redemption-record",
          issuers: [ve.pstIssuer]
        };
      }
      o.privateToken = a;
    }
    return new Promise(function (t, r) {
      fetch(n, o).then(function (i) {
        if (i.status !== 200) {
          return r({
            event: ce,
            endpoint: n,
            response: i,
            state: 4,
            status: i.status,
            message: yt(i.status || 400)
          });
        } else {
          return (e.responseType === "arraybuffer" ? i.arrayBuffer() : e.responseType === "json" ? i.json() : i.text()).then(function (e) {
            t({
              state: 4,
              status: i.status,
              body: e,
              message: yt(i.status || 400)
            });
          });
        }
      }).catch(function (e) {
        r({
          event: ce,
          endpoint: n,
          response: e.error,
          state: 4,
          status: 400,
          message: yt(400)
        });
      });
    });
  }
  function Ct(e, t) {
    if (typeof e == "object" && t === undefined) {
      e = (t = e).url;
    }
    if (e === null) {
      throw new Error("Url missing");
    }
    return wt("GET", e, t);
  }
  var kt = ["svg", "gif", "png"];
  function Et(e, t) {
    t = t || {};
    var n;
    var r = e;
    if (r.indexOf("data:image") === 0) {
      for (var i = false, o = kt.length, a = -1; a++ < o && !i;) {
        if (i = r.indexOf(kt[a]) >= 0) {
          n = kt[a];
        }
      }
    } else {
      n = r.substr(r.lastIndexOf(".") + 1, r.length);
    }
    if ((!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) && t.fallback) {
      if (t.fallback.indexOf(".") >= 0) {
        n = (r = t.fallback).substr(r.lastIndexOf(".") + 1, r.length);
      } else {
        r = e.substr(0, e.indexOf(n)) + t.fallback;
        n = t.fallback;
      }
    }
    if (t.prefix) {
      r = t.prefix + "/" + r;
    }
    this.attribs = {
      crossOrigin: t.crossOrigin || null
    };
    this.id = r;
    this.src = function (e) {
      if (ve.assethost && e.indexOf(ye.assetDomain) === 0) {
        return ve.assethost + e.replace(ye.assetDomain, "");
      }
      if (ve.imghost && e.indexOf("imgs") >= 0) {
        var t = e.indexOf(".ai") >= 0 ? e.indexOf(".ai") + 3 : e.indexOf(".com") + 4;
        return ve.imghost + e.substr(t, e.length);
      }
      return e;
    }(r);
    this.ext = n;
    this.width = 0;
    this.height = 0;
    this.aspect = 0;
    this.loaded = false;
    this.error = false;
    this.element = null;
    this.cb = {
      load: [],
      error: []
    };
  }
  function xt(e, t, n) {
    var r = e[t];
    for (var i = r.length, o = null; --i > -1;) {
      o = r[i];
      r.splice(i, 1);
      o(n);
    }
    if (t === "error") {
      e.load = [];
    } else {
      e.error = [];
    }
  }
  function Vt(e, t) {
    var n = e;
    t ||= {};
    if (t.prefix) {
      n = t.prefix + "/" + e;
    }
    this.attribs = {
      defer: t.defer || null,
      async: t.async || null,
      crossOrigin: t.crossOrigin || null,
      integrity: t.integrity || null
    };
    this.id = n;
    this.src = function (e) {
      if (ve.assethost && e.indexOf(ye.assetDomain) === 0) {
        return ve.assethost + e.replace(ye.assetDomain, "");
      }
      return e;
    }(n);
    this.loaded = false;
    this.error = false;
    this.element = null;
    this.cb = {
      load: [],
      error: []
    };
  }
  function St(e, t, n) {
    var r = e[t];
    for (var i = r.length, o = null; --i > -1;) {
      o = r[i];
      r.splice(i, 1);
      o(n);
    }
    if (t === "error") {
      e.load = [];
    } else {
      e.error = [];
    }
  }
  function Tt(e, t) {
    var n = e;
    t ||= {};
    if (t.prefix) {
      n = t.prefix + "/" + e;
    }
    this.responseType = t.responseType;
    this.id = n;
    this.src = function (e) {
      if (ve.assethost && e.indexOf(ye.assetDomain) === 0) {
        return ve.assethost + e.replace(ye.assetDomain, "");
      }
      return e;
    }(n);
    this.loaded = false;
    this.error = false;
    this.cb = {
      load: [],
      error: []
    };
    this.data = null;
  }
  function Rt(e, t, n) {
    var r = e[t];
    for (var i = r.length, o = null; --i > -1;) {
      o = r[i];
      r.splice(i, 1);
      o(n);
    }
    if (t === "error") {
      e.load = [];
    } else {
      e.error = [];
    }
  }
  Et.prototype.load = function () {
    return (this.ext === "svg" ? this._loadSvg() : this._loadImg()).catch(function (e) {
      Me("Asset failed", "error", "assets", {
        error: e
      });
      throw e;
    });
  };
  Et.prototype._loadSvg = function () {
    var e;
    var t = this;
    var n = this.src;
    var r = this.id;
    if (n.indexOf("data:image/svg+xml") === 0) {
      var i = n.slice("data:image/svg+xml,".length);
      e = Promise.resolve(decodeURIComponent(i));
    } else {
      e = Ct(n).then(function (e) {
        return e.body;
      });
    }
    return e.then(function (e) {
      var n = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
      var r = parseInt(n.getAttribute("width"));
      var i = parseInt(n.getAttribute("height"));
      t._imgLoaded(n, r, i);
      return t;
    }).catch(function (e) {
      t.error = true;
      var n = (e && e.message ? e.message : e || "Loading Error") + ": " + r;
      xt(t.cb, "error", n);
      throw n;
    });
  };
  Et.prototype._loadImg = function () {
    var e = this;
    var t = this.attribs;
    var n = this.src;
    var r = this.id;
    return new Promise(function (i, o) {
      function a() {
        if (!e.loaded) {
          e._imgLoaded(s, s.width, s.height);
          s.onload = s.onerror = null;
          i(e);
        }
      }
      var s = new Image();
      if (t.crossOrigin) {
        s.crossOrigin = t.crossOrigin;
      }
      s.onerror = function () {
        e.error = true;
        s.onload = s.onerror = null;
        var t = "Loading Error: " + r;
        xt(e.cb, "error", t);
        o(t);
      };
      s.onload = a;
      s.src = n;
      if (s.complete) {
        a();
      }
    });
  };
  Et.prototype._imgLoaded = function (e, t, n) {
    this.element = new st(e);
    this.width = t;
    this.height = n;
    this.aspect = t / n;
    this.loaded = true;
    xt(this.cb, "load", this);
  };
  Et.prototype.onload = function (e) {
    if (!this.error) {
      if (this.loaded) {
        e(this);
      } else {
        this.cb.load.push(e);
      }
    }
  };
  Et.prototype.onerror = function (e) {
    if (!this.loaded || !!this.error) {
      if (this.error) {
        e(this);
      } else {
        this.cb.error.push(e);
      }
    }
  };
  Vt.prototype.load = function () {
    var e = this;
    var t = this.attribs;
    var n = this.src;
    var r = this.id;
    return new Promise(function (i, o) {
      var a = document.createElement("script");
      e.element = a;
      a.onerror = function () {
        e.error = true;
        a.onload = a.onreadystatechange = a.onerror = null;
        var t = "Loading Error: " + r;
        St(e.cb, "error", t);
        o(t);
      };
      a.onload = a.onreadystatechange = function () {
        if (!this.loaded && (!a.readyState || a.readyState === "loaded" || a.readyState === "complete")) {
          e.loaded = true;
          a.onload = a.onreadystatechange = a.onerror = null;
          document.body.removeChild(a);
          St(e.cb, "load", e);
          i(e);
        }
      };
      a.type = "text/javascript";
      a.src = n;
      if (t.crossOrigin) {
        a.crossorigin = t.crossOrigin;
      }
      if (t.async) {
        a.async = true;
      }
      if (t.defer) {
        a.defer = true;
      }
      if (t.integrity) {
        a.integrity = t.integrity;
      }
      document.body.appendChild(a);
      if (a.complete) {
        a.onload();
      }
    });
  };
  Vt.prototype.onload = function (e) {
    if (!this.error) {
      if (this.loaded) {
        e(this);
      } else {
        this.cb.load.push(e);
      }
    }
  };
  Vt.prototype.onerror = function (e) {
    if (!this.loaded || !!this.error) {
      if (this.error) {
        e(this);
      } else {
        this.cb.error.push(e);
      }
    }
  };
  Tt.prototype.load = function () {
    var e = this;
    var t = this.src;
    var n = this.id;
    return new Promise(function (r, i) {
      var o = {};
      if (e.responseType === "arraybuffer") {
        o.responseType = "arraybuffer";
      } else if (t.indexOf("json") >= 0) {
        o.responseType = "json";
      }
      Ct(t, o).then(function (t) {
        e.loaded = true;
        e.data = t.body;
        Rt(e.cb, "load", e);
        r(e);
      }).catch(function (t) {
        e.error = true;
        var r = (t && t.message ? t.message : "Loading Error") + ": " + n;
        Rt(e.cb, "error", r);
        i(r);
      });
    });
  };
  Tt.prototype.onload = function (e) {
    if (!this.error) {
      if (this.loaded) {
        e(this);
      } else {
        this.cb.load.push(e);
      }
    }
  };
  Tt.prototype.onerror = function (e) {
    if (!this.loaded || !!this.error) {
      if (this.error) {
        e(this);
      } else {
        this.cb.error.push(e);
      }
    }
  };
  var Ut = [];
  function Mt(e, t) {
    var n = new Tt(e, t);
    Ut.push(n);
    return n.load();
  }
  function Ot(e) {
    return new Promise(function (t, n) {
      for (var r = Ut.length, i = false, o = null; --r > -1 && !i;) {
        i = (o = Ut[r]).id === e || o.id.indexOf(e[0] === "/" ? "" : "/" + e) !== -1;
      }
      if (!i) {
        return t(null);
      }
      o.onload(t);
      o.onerror(n);
    });
  }
  var Pt = [];
  var Wt = false;
  var Nt = false;
  function At() {
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", Ft);
      window.addEventListener("load", Ft);
    } else {
      document.attachEvent("onreadystatechange", jt);
      window.attachEvent("onload", Ft);
    }
    Wt = true;
  }
  function jt() {
    if (document.readyState === "interactive" || document.readyState === "loaded" || document.readyState === "complete") {
      Ft();
    }
  }
  function Ft() {
    if (Nt === false) {
      for (var e = 0; e < Pt.length; e++) {
        Pt[e].fn.apply(null, Pt[e].args);
      }
      Pt = [];
    }
    Nt = true;
    if (document.removeEventListener) {
      document.removeEventListener("DOMContentLoaded", Ft);
      window.removeEventListener("load", Ft);
    } else {
      document.detachEvent("onreadystatechange", jt);
      window.detachEvent("onload", Ft);
    }
  }
  new st(document);
  var Bt = new st(window);
  var It = {
    touchstart: "ts",
    touchend: "te",
    touchmove: "tm",
    touchcancel: "tc"
  };
  var Zt = {
    mousedown: "md",
    mouseup: "mu",
    mousemove: "mm"
  };
  var Dt = {
    pointermove: "pm"
  };
  var zt = {
    keydown: "kd",
    keyup: "ku"
  };
  var Kt = {
    devicemotion: "dm"
  };
  function Lt(e, t) {
    var n = Zt[e];
    var r = null;
    return function (e) {
      r = function (e) {
        return [e.windowX, e.windowY, Date.now()];
      }(e);
      t(n, r);
    };
  }
  function Ht(e, t) {
    var n = Dt[e];
    var r = null;
    return function (e) {
      r = function (e) {
        var t = [];
        var n = [];
        if (e.getCoalescedEvents) {
          n = e.getCoalescedEvents();
        }
        for (var r = 0; r < n.length; r++) {
          var i = n[r];
          t.push([i.x, i.y, Date.now()]);
        }
        return t;
      }(e);
      for (var i = 0; i < r.length; i++) {
        t(n, r[i]);
      }
    };
  }
  function $t(e, t) {
    var n = It[e];
    var r = null;
    return function (e) {
      r = function (e) {
        var t = [];
        try {
          var n;
          var r;
          if (e.touches && e.touches.length >= 1) {
            n = e.touches;
          } else if (e.changedTouches && e.changedTouches.length >= 1) {
            n = e.changedTouches;
          }
          if (n) {
            for (var i = 0; i < n.length; i++) {
              if (r = nt.eventCoords(n[i])) {
                t.push([n[i].identifier, r.x, r.y]);
              }
            }
            t.push(Date.now());
          }
          return t;
        } catch (Kn) {
          return t;
        }
      }(e);
      t(n, r);
    };
  }
  function Jt(e, t) {
    var n = zt[e];
    var r = null;
    return function (e) {
      r = function (e) {
        return [e.keyNum, Date.now()];
      }(e);
      t(n, r);
    };
  }
  function Gt(e, t) {
    var n = Kt[e];
    var r = null;
    var i = [];
    return function (e) {
      r = function (e, t) {
        if (e.acceleration === undefined || e.acceleration && e.acceleration.x === undefined) {
          e.acceleration = {
            x: 0,
            y: 0,
            z: 0
          };
        }
        if (e.rotationRate === undefined || e.rotationRate && e.rotationRate.alpha === undefined) {
          e.rotationRate = {
            alpha: 0,
            beta: 0,
            gamma: 0
          };
        }
        var n = [e.acceleration.x, e.acceleration.y, e.acceleration.z, e.rotationRate.alpha, e.rotationRate.beta, e.rotationRate.gamma, Date.now()];
        var r = [];
        if (t.length === 0) {
          t = n;
          r = n;
        } else {
          var i;
          var o = 0;
          for (var a = 0; a < 6; a++) {
            i = t[a] - n[a];
            r.push(n[a]);
            o += Math.abs(i);
          }
          r.push(Date.now());
          t = n;
          if (o <= 0) {
            return null;
          }
        }
        return {
          motion: r,
          prevmotion: t
        };
      }(e, i);
      if (r !== null) {
        i = r.prevmotion;
        r = r.motion;
        t(n, r);
      }
    };
  }
  function Qt() {
    this._manifest = {};
    this.state = {
      timeBuffers: {},
      loadTime: Date.now(),
      recording: false,
      initRecord: false,
      record: {
        mouse: true,
        touch: true,
        keys: false,
        motion: false
      }
    };
    this._recordEvent = this._recordEvent.bind(this);
  }
  Qt.prototype.record = function (e, t, n, r) {
    this._manifest.st = Date.now();
    this.state.record.mouse = e === undefined ? this.state.record.mouse : e;
    this.state.record.touch = n === undefined ? this.state.record.touch : n;
    this.state.record.keys = t === undefined ? this.state.record.keys : t;
    this.state.record.motion = r === undefined ? this.state.record.motion : r;
    if (this.state.initRecord === false) {
      var i = new st(document.body);
      if (this.state.record.mouse) {
        i.addEventListener("mousedown", Lt("mousedown", this._recordEvent), true);
        i.addEventListener("mousemove", Lt("mousemove", this._recordEvent), true);
        i.addEventListener("mouseup", Lt("mouseup", this._recordEvent), true);
        i.addEventListener("pointermove", Ht("pointermove", this._recordEvent), true);
      }
      if (this.state.record.keys === true) {
        i.addEventListener("keyup", Jt("keyup", this._recordEvent), true);
        i.addEventListener("keydown", Jt("keydown", this._recordEvent), true);
      }
      if (this.state.record.touch && ee.Browser.hasEvent("touchstart", document.body) === true) {
        i.addEventListener("touchstart", $t("touchstart", this._recordEvent), true);
        i.addEventListener("touchmove", $t("touchmove", this._recordEvent), true);
        i.addEventListener("touchend", $t("touchend", this._recordEvent), true);
      }
      if (this.state.record.motion && ee.Browser.hasEvent("devicemotion", window) === true) {
        i.addEventListener("devicemotion", Gt("devicemotion", this._recordEvent), true);
      }
      this.state.initRecord = true;
    }
    this.state.recording = true;
  };
  Qt.prototype.stop = function () {
    this.state.recording = false;
  };
  Qt.prototype.time = function () {
    return this.state.loadTime;
  };
  Qt.prototype.getData = function () {
    for (var e in this.state.timeBuffers) {
      this._manifest[e] = this.state.timeBuffers[e].getData();
      this._manifest[e + "-mp"] = this.state.timeBuffers[e].getMeanPeriod();
    }
    return this._manifest;
  };
  Qt.prototype.setData = function (e, t) {
    this._manifest[e] = t;
  };
  Qt.prototype.resetData = function () {
    this._manifest = {};
    this.state.timeBuffers = {};
  };
  Qt.prototype.circBuffPush = function (e, t) {
    this._recordEvent(e, t);
  };
  Qt.prototype._recordEvent = function (e, t) {
    if (this.state.recording !== false) {
      try {
        var n = t[t.length - 1];
        this.state.timeBuffers[e] ||= new He(16, 15000);
        this.state.timeBuffers[e].push(n, t);
      } catch (zn) {
        Oe("motion", zn);
      }
    }
  };
  var qt;
  var Xt;
  var Yt;
  var en;
  var tn = new Qt();
  try {
    qt = function () {
      var e = {
        _qUMQMdncNb: 0,
        _pdV5wCgD: 0,
        _8dC5C: [],
        _zSQyx2c: [],
        _rKrQGqS: [],
        _wY4otiT: {},
        _HmMPK5AN4: window,
        _9uLtHD6Qf: [function (e) {
          var t = e._8dC5C.pop();
          var n = e._nn3VZl[e._qUMQMdncNb++];
          var r = e._nn3VZl[e._qUMQMdncNb++];
          e._zSQyx2c[r] = t;
          for (var i = 0; i < n; i++) {
            e._zSQyx2c[e._nn3VZl[e._qUMQMdncNb++]] = t[i];
          }
        }, function (e) {
          e._8dC5C.push(e._HmMPK5AN4);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n < t);
        }, function (e) {
          e._wY4otiT[e._8dC5C[e._8dC5C.length - 1]] = e._8dC5C[e._8dC5C.length - 2];
        }, function (e) {
          e._8dC5C.push(st);
        }, function (e) {
          var t = e._8dC5C.pop();
          e._8dC5C.push(-t);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          var r = n[t];
          if (typeof r == "function") {
            r = r.bind(n);
          }
          e._8dC5C.push(r);
        }, function (e) {
          var t = e._nn3VZl[e._qUMQMdncNb++];
          var n = e._nn3VZl[e._qUMQMdncNb++];
          var r = e._nn3VZl[e._qUMQMdncNb++];
          var i = t == -1 ? e._zSQyx2c : e._rKrQGqS[t];
          if (r) {
            e._8dC5C.push(++i[n]);
          } else {
            e._8dC5C.push(i[n]++);
          }
        }, function (e) {
          var t = e._8dC5C.pop();
          e._8dC5C.push(typeof t);
        }, function (e) {
          for (var t = e._nn3VZl[e._qUMQMdncNb++], n = {}, r = 0; r < t; r++) {
            var i = e._8dC5C.pop();
            n[e._8dC5C.pop()] = i;
          }
          e._8dC5C.push(n);
        }, function (e) {
          var n = e._8dC5C.pop();
          function r() {
            var i = false;
            var o = Array.prototype.slice.call(arguments);
            if (o.length > 0 && o[0]._l) {
              o = o.splice(1, o.length - 1);
            } else {
              i = true;
            }
            var a = e._HmMPK5AN4;
            var s = e._pdV5wCgD;
            var c = e._rKrQGqS;
            e._8dC5C.push(e._qUMQMdncNb);
            e._8dC5C.push(e._HmMPK5AN4);
            e._8dC5C.push(e._zSQyx2c);
            e._8dC5C.push(o);
            e._8dC5C.push(r);
            e._pdV5wCgD = e._qUMQMdncNb;
            e._qUMQMdncNb = n;
            e._HmMPK5AN4 = this;
            e._rKrQGqS = r._r;
            t(e);
            e._HmMPK5AN4 = a;
            e._pdV5wCgD = s;
            e._rKrQGqS = c;
            if (i) {
              return e._8dC5C.pop();
            }
          }
          r._l = {};
          r._r = Array.prototype.slice.call(e._rKrQGqS);
          e._8dC5C.push(r);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          var r = e._8dC5C.pop();
          e._8dC5C.push(n[t] += r);
        }, function (e) {
          e._8dC5C.pop();
          e._8dC5C.push(undefined);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n | t);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n === t);
        }, function (e) {
          e._8dC5C.push(undefined);
        }, function (e) {
          e._8dC5C.push(et);
        }, function (e) {
          e._8dC5C.push(tt);
        }, function (e) {
          var t = e._nn3VZl[e._qUMQMdncNb++];
          var n = e._nn3VZl[e._qUMQMdncNb++];
          var r = e._nn3VZl[e._qUMQMdncNb++];
          for (var i = decodeURIComponent(atob(e._UY0ymJce.slice(t, t + n))), o = "", a = 0; a < i.length; a++) {
            o += String.fromCharCode((256 + i.charCodeAt(a) + r) % 256);
          }
          e._8dC5C.push(o);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          var r = e._8dC5C.pop();
          e._8dC5C.push(n[t] = r);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n * t);
        }, function () {
          var t = e._8dC5C.pop();
          var n = e._nn3VZl[e._qUMQMdncNb++];
          if (e._rKrQGqS[n]) {
            e._zSQyx2c = e._rKrQGqS[n];
          } else {
            e._zSQyx2c = t;
            e._rKrQGqS[n] = t;
          }
        }, function (e) {
          e._8dC5C.pop();
        }, function (e) {
          var t = e._nn3VZl[e._qUMQMdncNb++];
          var n = e._nn3VZl[e._qUMQMdncNb++];
          var r = t == -1 ? e._zSQyx2c : e._rKrQGqS[t];
          e._8dC5C.push(r[n]);
        }, function (e) {
          e._8dC5C.push(tt);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n << t);
        }, function (e) {
          e._qUMQMdncNb = e._8dC5C.splice(e._8dC5C.length - 4, 1)[0];
          e._HmMPK5AN4 = e._8dC5C.splice(e._8dC5C.length - 3, 1)[0];
          e._zSQyx2c = e._8dC5C.splice(e._8dC5C.length - 2, 1)[0];
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._nn3VZl[e._qUMQMdncNb++];
          var r = e._nn3VZl[e._qUMQMdncNb++];
          var i = n == -1 ? e._zSQyx2c : e._rKrQGqS[n];
          e._8dC5C.push(i[r] = t);
        }, function () {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          var r = false;
          if (t._l !== undefined) {
            r = true;
            n.splice(0, 0, {
              _l: {}
            });
          }
          var i = new (Function.prototype.bind.apply(t, [null].concat(n)))();
          if (r) {
            e._8dC5C.pop();
          }
          e._8dC5C.push(i);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._nn3VZl[e._qUMQMdncNb++];
          if (!t) {
            e._qUMQMdncNb = n;
          }
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n - t);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          if (t._l !== undefined) {
            n.splice(0, 0, {
              _l: {}
            });
            t.apply(e._HmMPK5AN4, n);
          } else {
            var r = t.apply(e._HmMPK5AN4, n);
            e._8dC5C.push(r);
          }
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._nn3VZl[e._qUMQMdncNb++];
          var r = e._nn3VZl[e._qUMQMdncNb++];
          var i = n == -1 ? e._zSQyx2c : e._rKrQGqS[n];
          e._8dC5C.push(i[r] |= t);
        }, function (e) {
          var t = e._8dC5C.pop();
          e._8dC5C.push(window[t]);
        }, function (e) {
          for (var t = e._nn3VZl[e._qUMQMdncNb++], n = [], r = 0; r < t; r++) {
            n.push(e._8dC5C.pop());
          }
          e._8dC5C.push(n);
        }, function (e) {
          var t = e._nn3VZl[e._qUMQMdncNb++];
          e._pdV5wCgD = t;
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n instanceof t);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n > t);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n <= t);
        }, function (e) {
          e._8dC5C.push(!!e._nn3VZl[e._qUMQMdncNb++]);
        }, function () {
          var t = e._8dC5C.pop();
          var n = e._nn3VZl[e._qUMQMdncNb++];
          e._zSQyx2c = t;
          e._rKrQGqS[n] = t;
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n >= t);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n in t);
        }, function (e) {
          var n = e._pdV5wCgD;
          var r = e._nn3VZl[e._qUMQMdncNb++];
          try {
            t(e);
          } catch (i) {
            e._8dC5C.push(i);
            e._qUMQMdncNb = r;
            t(e);
          }
          e._pdV5wCgD = n;
        }, function (e) {
          e._8dC5C.push(e._nn3VZl[e._qUMQMdncNb++]);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n + t);
        }, function (e) {
          e._8dC5C.push(e._8dC5C[e._8dC5C.length - 1]);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n !== t);
        }, function (e) {
          var t = e._8dC5C.pop();
          e._8dC5C.push(!t);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._8dC5C.pop();
          e._8dC5C.push(n / t);
        }, function (e) {
          e._8dC5C.push(null);
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._nn3VZl[e._qUMQMdncNb++];
          var r = e._nn3VZl[e._qUMQMdncNb++];
          (n == -1 ? e._zSQyx2c : e._rKrQGqS[n])[r] = t;
        }, function (e) {
          var t = e._8dC5C.pop();
          var n = e._nn3VZl[e._qUMQMdncNb++];
          var r = e._nn3VZl[e._qUMQMdncNb++];
          var i = n == -1 ? e._zSQyx2c : e._rKrQGqS[n];
          e._8dC5C.push(i[r] += t);
        }, function (e) {
          e._8dC5C.push(ee);
        }, function (e) {
          e._8dC5C.push(nt);
        }],
        _nn3VZl: [34, 0, 21, 0, 44, 14, 10, 51, -1, 0, 39, 0, 29, 59, 34, 0, 40, 1, 22, 0, 1, 0, 1, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 23, -1, 1, 18, 2304, 12, 5, 6, 23, -1, 1, 18, 816, 12, 21, 6, 34, 3, 39, 0, 29, 58, 26, 44, 69, 10, 51, -1, 1, 39, 0, 29, 202, 34, 0, 40, 2, 22, 0, 1, 0, 1, 34, 0, 51, -1, 2, 34, 0, 51, -1, 3, 23, -1, 1, 18, 2952, 32, 12, 6, 29, 113, 34, 0, 23, -1, 1, 18, 2952, 32, 12, 6, 31, 27, -1, 3, 22, 44, 0, 51, -1, 4, 23, -1, 4, 23, -1, 3, 18, 4232, 8, -1, 6, 2, 29, 194, 23, -1, 3, 23, -1, 4, 6, 51, -1, 5, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 23, -1, 5, 18, 0, 4, 15, 6, 23, -1, 5, 18, 2236, 4, 4, 6, 34, 3, 34, 1, 23, -1, 2, 18, 3616, 12, 19, 6, 31, 22, 7, -1, 4, 0, 22, 39, 0, 29, 118, 23, -1, 2, 39, 0, 29, 201, 26, 44, 212, 10, 51, -1, 2, 39, 0, 29, 249, 34, 0, 40, 3, 22, 0, 1, 0, 1, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 23, -1, 1, 18, 1996, 16, 18, 6, 34, 2, 39, 0, 29, 248, 26, 44, 259, 10, 51, -1, 3, 39, 0, 29, 521, 34, 0, 40, 4, 22, 0, 1, 0, 1, 34, 0, 51, -1, 2, 43, 501, 23, -1, 1, 18, 208, 12, 4, 6, 46, 29, 303, 22, 23, -1, 1, 18, 208, 12, 4, 6, 18, 4232, 8, -1, 6, 44, 1, 41, 29, 321, 23, -1, 1, 18, 208, 12, 4, 6, 27, -1, 3, 22, 39, 0, 29, 363, 23, -1, 1, 18, 1572, 20, 2, 6, 46, 29, 349, 22, 23, -1, 1, 18, 1572, 20, 2, 6, 18, 4232, 8, -1, 6, 44, 1, 41, 29, 363, 23, -1, 1, 18, 1572, 20, 2, 6, 27, -1, 3, 22, 23, -1, 3, 29, 488, 44, 0, 51, -1, 5, 23, -1, 5, 23, -1, 3, 18, 4232, 8, -1, 6, 2, 29, 463, 23, -1, 3, 23, -1, 5, 6, 34, 1, 54, 18, 3124, 20, -8, 6, 31, 27, -1, 4, 22, 23, -1, 4, 29, 454, 23, -1, 4, 18, 0, 4, 15, 6, 23, -1, 4, 18, 2236, 4, 4, 6, 23, -1, 3, 23, -1, 5, 6, 18, 4216, 16, -5, 6, 34, 3, 34, 1, 23, -1, 2, 18, 3616, 12, 19, 6, 31, 22, 7, -1, 5, 0, 22, 39, 0, 29, 373, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 34, 1, 23, -1, 2, 18, 3616, 12, 19, 6, 31, 22, 23, -1, 2, 39, 0, 29, 520, 35, 497, 39, 0, 29, 511, 51, -1, 6, 23, -1, 2, 39, 0, 29, 520, 18, 3340, 20, 10, 33, 39, 0, 29, 520, 26, 44, 531, 10, 51, -1, 4, 39, 0, 29, 978, 34, 0, 40, 5, 22, 0, 2, 0, 1, 2, 23, -1, 1, 18, 1180, 20, -8, 6, 44, 0, 12, 14, 46, 48, 29, 587, 22, 23, -1, 1, 18, 1180, 20, -8, 6, 46, 29, 587, 22, 23, -1, 1, 18, 1180, 20, -8, 6, 18, 2236, 4, 4, 6, 44, 0, 12, 14, 29, 618, 18, 1120, 4, 2, 44, 0, 18, 0, 4, 15, 44, 0, 18, 2236, 4, 4, 44, 0, 9, 3, 23, -1, 1, 18, 1180, 20, -8, 19, 22, 23, -1, 1, 18, 2540, 64, -21, 6, 44, 0, 12, 14, 46, 48, 29, 664, 22, 23, -1, 1, 18, 2540, 64, -21, 6, 46, 29, 664, 22, 23, -1, 1, 18, 2540, 64, -21, 6, 18, 880, 24, -21, 6, 44, 0, 12, 14, 29, 695, 18, 2200, 8, 8, 44, 0, 18, 3116, 8, 2, 44, 0, 18, 880, 24, -21, 44, 0, 9, 3, 23, -1, 1, 18, 2540, 64, -21, 19, 22, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 23, -1, 1, 18, 2540, 64, -21, 6, 18, 2200, 8, 8, 6, 23, -1, 1, 18, 2540, 64, -21, 6, 18, 3116, 8, 2, 6, 23, -1, 1, 18, 2540, 64, -21, 6, 18, 880, 24, -21, 6, 23, -1, 1, 18, 1180, 20, -8, 6, 18, 1120, 4, 2, 6, 23, -1, 1, 18, 1180, 20, -8, 6, 18, 0, 4, 15, 6, 23, -1, 1, 18, 1180, 20, -8, 6, 18, 2236, 4, 4, 6, 34, 7, 51, -1, 3, 34, 0, 51, -1, 4, 23, -1, 2, 18, 4232, 8, -1, 6, 44, 0, 14, 29, 827, 23, -1, 3, 27, -1, 2, 22, 23, -1, 3, 27, -1, 4, 22, 39, 0, 29, 957, 44, 0, 51, -1, 5, 44, 0, 51, -1, 7, 23, -1, 7, 44, 6, 2, 29, 912, 23, -1, 2, 23, -1, 7, 6, 23, -1, 3, 23, -1, 7, 6, 30, 27, -1, 6, 22, 23, -1, 3, 23, -1, 7, 6, 34, 1, 23, -1, 4, 18, 3616, 12, 19, 6, 31, 22, 23, -1, 6, 34, 1, 18, 4116, 8, 15, 33, 18, 2724, 4, 0, 6, 31, 52, -1, 5, 22, 7, -1, 7, 0, 22, 39, 0, 29, 837, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 34, 1, 23, -1, 4, 18, 3616, 12, 19, 6, 31, 22, 23, -1, 3, 27, -1, 2, 22, 23, -1, 5, 44, 0, 38, 29, 957, 50, 39, 0, 29, 977, 18, 2208, 28, -11, 23, -1, 2, 18, 3544, 12, -9, 23, -1, 4, 9, 2, 39, 0, 29, 977, 26, 44, 988, 10, 51, -1, 5, 39, 0, 29, 1111, 34, 0, 40, 6, 22, 0, 0, 0, 9, 0, 1, 18, 1724, 20, 4, 19, 22, 18, 944, 12, 17, 18, 3544, 12, -9, 39, 0, 18, 56, 16, -10, 39, 0, 18, 3260, 8, 9, 39, 1, 18, 220, 8, 11, 39, 1, 9, 4, 18, 3960, 28, -12, 39, 0, 18, 532, 20, 6, 39, 0, 18, 3668, 16, 22, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 18, 1616, 20, 4, 9, 0, 9, 5, 1, 18, 1172, 8, -1, 19, 22, 1, 34, 1, 1, 18, 3932, 28, 5, 6, 18, 732, 8, 16, 6, 31, 1, 18, 3932, 28, 5, 19, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 1110, 26, 44, 1121, 10, 51, -1, 6, 39, 0, 29, 1303, 34, 0, 40, 7, 22, 0, 1, 0, 1, 34, 0, 23, -1, 1, 18, 1048, 12, 14, 6, 18, 456, 28, 5, 6, 31, 51, -1, 2, 23, -1, 1, 18, 2440, 8, -20, 6, 46, 48, 29, 1166, 22, 18, 2484, 0, 7, 51, -1, 3, 23, -1, 1, 18, 1896, 16, -18, 6, 46, 48, 29, 1186, 22, 18, 2484, 0, 7, 51, -1, 4, 23, -1, 1, 18, 2408, 28, -21, 6, 46, 48, 29, 1206, 22, 18, 2484, 0, 7, 51, -1, 5, 23, -1, 1, 18, 688, 16, 12, 6, 46, 48, 29, 1226, 22, 18, 2484, 0, 7, 51, -1, 6, 23, -1, 1, 18, 3076, 16, -8, 6, 46, 48, 29, 1246, 22, 18, 2484, 0, 7, 51, -1, 7, 23, -1, 1, 34, 1, 23, 0, 7, 31, 51, -1, 8, 23, -1, 2, 23, -1, 3, 45, 23, -1, 4, 45, 23, -1, 5, 45, 23, -1, 6, 45, 23, -1, 7, 45, 23, -1, 8, 45, 51, -1, 9, 23, -1, 9, 34, 1, 16, 31, 39, 0, 29, 1302, 26, 44, 1313, 10, 51, -1, 7, 39, 0, 29, 1678, 34, 0, 40, 8, 22, 0, 1, 0, 1, 23, -1, 1, 18, 2440, 8, -20, 6, 18, 2484, 0, 7, 47, 29, 1359, 18, 3092, 24, 15, 23, -1, 1, 18, 2440, 8, -20, 6, 45, 18, 1636, 8, 22, 45, 39, 0, 29, 1677, 23, -1, 1, 18, 2988, 32, -16, 33, 18, 852, 8, 13, 6, 14, 29, 1383, 18, 4268, 20, -10, 39, 0, 29, 1677, 18, 2484, 0, 7, 51, -1, 2, 23, -1, 1, 18, 2016, 24, 9, 6, 29, 1670, 44, 0, 51, -1, 3, 44, 0, 51, -1, 4, 44, 0, 51, -1, 5, 23, -1, 5, 23, -1, 1, 18, 2016, 24, 9, 6, 18, 3892, 16, -3, 6, 18, 4232, 8, -1, 6, 2, 29, 1511, 23, -1, 1, 18, 2016, 24, 9, 6, 18, 3892, 16, -3, 6, 23, -1, 5, 6, 51, -1, 6, 23, -1, 6, 18, 4124, 20, 9, 6, 23, -1, 1, 18, 4124, 20, 9, 6, 14, 29, 1502, 23, -1, 6, 23, -1, 1, 14, 29, 1497, 23, -1, 3, 44, 1, 45, 27, -1, 4, 22, 7, -1, 3, 0, 22, 7, -1, 5, 0, 22, 39, 0, 29, 1415, 18, 1896, 16, -18, 34, 1, 23, -1, 1, 18, 2788, 24, 1, 6, 31, 46, 29, 1550, 22, 18, 1896, 16, -18, 34, 1, 23, -1, 1, 18, 3992, 28, 9, 6, 31, 18, 2484, 0, 7, 47, 29, 1611, 18, 2480, 4, 3, 34, 0, 23, -1, 1, 18, 4124, 20, 9, 6, 18, 456, 28, 5, 6, 31, 45, 18, 620, 16, 15, 45, 18, 1896, 16, -18, 34, 1, 23, -1, 1, 18, 3992, 28, 9, 6, 31, 45, 18, 1636, 8, 22, 45, 23, -1, 2, 45, 27, -1, 2, 22, 39, 0, 29, 1654, 18, 2480, 4, 3, 34, 0, 23, -1, 1, 18, 4124, 20, 9, 6, 18, 456, 28, 5, 6, 31, 45, 18, 1672, 4, 1, 45, 23, -1, 4, 45, 18, 2448, 4, 4, 45, 23, -1, 2, 45, 27, -1, 2, 22, 23, -1, 1, 18, 2016, 24, 9, 6, 27, -1, 1, 22, 39, 0, 29, 1390, 23, -1, 2, 39, 0, 29, 1677, 26, 44, 1688, 10, 51, -1, 8, 39, 0, 29, 1710, 34, 0, 40, 9, 22, 0, 2, 0, 1, 2, 23, -1, 1, 23, -1, 2, 13, 39, 0, 29, 1709, 26, 44, 1720, 10, 51, -1, 9, 39, 0, 29, 1857, 34, 0, 40, 10, 22, 0, 1, 0, 1, 23, -1, 1, 34, 1, 23, 0, 6, 31, 51, -1, 2, 23, 0, 42, 23, -1, 2, 6, 29, 1761, 23, 0, 42, 23, -1, 2, 6, 39, 0, 29, 1856, 23, -1, 1, 18, 24, 16, 7, 6, 29, 1777, 44, 1, 39, 0, 29, 1779, 44, 0, 23, -1, 1, 18, 40, 16, 13, 6, 29, 1795, 44, 1, 39, 0, 29, 1797, 44, 0, 23, -1, 1, 18, 132, 16, 11, 6, 29, 1813, 44, 1, 39, 0, 29, 1815, 44, 0, 23, -1, 1, 34, 1, 23, 0, 11, 31, 23, -1, 1, 34, 1, 23, 0, 10, 31, 34, 5, 51, -1, 3, 23, -1, 3, 23, 0, 42, 23, -1, 2, 19, 22, 23, -1, 3, 39, 0, 29, 1856, 26, 44, 1867, 10, 51, -1, 10, 39, 0, 29, 2582, 34, 0, 40, 11, 22, 0, 1, 0, 1, 23, -1, 1, 18, 1912, 12, -6, 6, 18, 2780, 8, 13, 6, 29, 1903, 23, 0, 41, 18, 3568, 8, -11, 6, 39, 0, 29, 2581, 23, -1, 1, 18, 2408, 28, -21, 6, 46, 29, 1931, 22, 34, 0, 23, -1, 1, 18, 2408, 28, -21, 6, 18, 456, 28, 5, 6, 31, 51, -1, 2, 34, 0, 23, -1, 1, 18, 1048, 12, 14, 6, 18, 456, 28, 5, 6, 31, 51, -1, 3, 23, -1, 3, 18, 3476, 40, -19, 14, 29, 1975, 23, 0, 41, 18, 72, 8, -15, 6, 39, 0, 29, 2581, 18, 1604, 12, 19, 23, 0, 41, 18, 4156, 16, -11, 6, 18, 3988, 4, 9, 23, 0, 41, 18, 1112, 8, -16, 6, 18, 3748, 8, -7, 23, 0, 41, 18, 4420, 4, -5, 6, 18, 4348, 20, -13, 23, 0, 41, 18, 3516, 12, -13, 6, 18, 720, 12, 2, 23, 0, 41, 18, 932, 12, 14, 6, 18, 420, 12, 6, 23, 0, 41, 18, 4408, 12, -14, 6, 9, 6, 51, -1, 4, 23, -1, 4, 23, -1, 2, 6, 29, 2072, 23, -1, 4, 23, -1, 2, 6, 39, 0, 29, 2581, 34, 0, 23, -1, 1, 18, 1896, 16, -18, 6, 46, 48, 29, 2091, 22, 18, 2484, 0, 7, 18, 456, 28, 5, 6, 31, 51, -1, 5, 34, 0, 23, -1, 1, 18, 2440, 8, -20, 6, 46, 48, 29, 2119, 22, 18, 2484, 0, 7, 18, 456, 28, 5, 6, 31, 51, -1, 6, 34, 0, 23, -1, 1, 18, 3076, 16, -8, 6, 46, 48, 29, 2147, 22, 18, 2484, 0, 7, 18, 456, 28, 5, 6, 31, 51, -1, 7, 34, 0, 23, -1, 1, 18, 688, 16, 12, 6, 46, 48, 29, 2175, 22, 18, 2484, 0, 7, 18, 456, 28, 5, 6, 31, 51, -1, 8, 18, 420, 12, 6, 34, 1, 23, -1, 5, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 46, 48, 29, 2227, 22, 18, 420, 12, 6, 34, 1, 23, -1, 6, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 46, 48, 29, 2251, 22, 18, 420, 12, 6, 34, 1, 23, -1, 7, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 46, 48, 29, 2275, 22, 18, 420, 12, 6, 34, 1, 23, -1, 8, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 29, 2289, 23, 0, 41, 18, 4408, 12, -14, 6, 39, 0, 29, 2581, 18, 720, 12, 2, 34, 1, 23, -1, 5, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 46, 48, 29, 2332, 22, 18, 720, 12, 2, 34, 1, 23, -1, 6, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 46, 48, 29, 2356, 22, 18, 720, 12, 2, 34, 1, 23, -1, 7, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 46, 48, 29, 2380, 22, 18, 720, 12, 2, 34, 1, 23, -1, 8, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 29, 2394, 23, 0, 41, 18, 932, 12, 14, 6, 39, 0, 29, 2581, 18, 2928, 8, -7, 34, 1, 23, -1, 5, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 46, 48, 29, 2437, 22, 18, 2928, 8, -7, 34, 1, 23, -1, 6, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 46, 48, 29, 2461, 22, 18, 2928, 8, -7, 34, 1, 23, -1, 7, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 46, 48, 29, 2485, 22, 18, 2928, 8, -7, 34, 1, 23, -1, 8, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 46, 48, 29, 2509, 22, 18, 3748, 8, -7, 34, 1, 23, -1, 5, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 46, 48, 29, 2533, 22, 18, 3748, 8, -7, 34, 1, 23, -1, 6, 18, 1124, 12, -3, 6, 31, 44, 1, 5, 47, 29, 2547, 23, 0, 41, 18, 4420, 4, -5, 6, 39, 0, 29, 2581, 23, -1, 2, 18, 3800, 28, -17, 14, 29, 2569, 23, 0, 41, 18, 72, 8, -15, 6, 39, 0, 29, 2581, 23, 0, 41, 18, 2056, 12, 17, 6, 39, 0, 29, 2581, 26, 44, 2592, 10, 51, -1, 11, 39, 0, 29, 2724, 34, 0, 40, 12, 22, 0, 1, 0, 1, 18, 3076, 16, -8, 18, 2936, 8, -4, 18, 1896, 16, -18, 18, 2440, 8, -20, 34, 4, 51, -1, 2, 34, 0, 51, -1, 3, 44, 0, 51, -1, 4, 23, -1, 4, 23, -1, 2, 18, 4232, 8, -1, 6, 2, 29, 2716, 23, -1, 2, 23, -1, 4, 6, 51, -1, 5, 23, -1, 5, 34, 1, 23, -1, 1, 18, 2788, 24, 1, 6, 31, 29, 2694, 23, -1, 5, 34, 1, 23, -1, 1, 18, 3992, 28, 9, 6, 31, 34, 1, 16, 31, 39, 0, 29, 2695, 50, 34, 1, 23, -1, 3, 18, 3616, 12, 19, 6, 31, 22, 7, -1, 4, 0, 22, 39, 0, 29, 2632, 23, -1, 3, 39, 0, 29, 2723, 26, 44, 2734, 10, 51, -1, 12, 39, 0, 29, 2837, 34, 0, 40, 13, 22, 0, 1, 0, 1, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 23, -1, 1, 18, 2316, 8, 13, 6, 34, 1, 23, 0, 6, 31, 23, -1, 1, 18, 2304, 12, 5, 6, 29, 2792, 23, -1, 1, 18, 2304, 12, 5, 6, 39, 0, 29, 2800, 23, -1, 1, 18, 336, 12, 4, 6, 23, -1, 1, 18, 816, 12, 21, 6, 29, 2822, 23, -1, 1, 18, 816, 12, 21, 6, 39, 0, 29, 2830, 23, -1, 1, 18, 2900, 16, 5, 6, 34, 4, 39, 0, 29, 2836, 26, 44, 2847, 10, 51, -1, 13, 39, 0, 29, 3174, 34, 0, 40, 14, 22, 0, 1, 0, 1, 44, 0, 51, -1, 2, 23, -1, 1, 18, 2812, 32, -18, 6, 29, 2892, 23, 0, 52, 18, 3628, 16, 3, 6, 23, -1, 2, 34, 2, 23, 0, 8, 31, 27, -1, 2, 22, 23, -1, 1, 18, 2240, 16, 16, 6, 29, 2923, 23, 0, 52, 18, 2180, 20, 20, 6, 23, -1, 2, 34, 2, 23, 0, 8, 31, 27, -1, 2, 22, 23, -1, 1, 18, 96, 8, 21, 6, 29, 2954, 23, 0, 52, 18, 2768, 12, -11, 6, 23, -1, 2, 34, 2, 23, 0, 8, 31, 27, -1, 2, 22, 23, -1, 1, 18, 2256, 28, -14, 6, 29, 2985, 23, 0, 52, 18, 4376, 12, -11, 6, 23, -1, 2, 34, 2, 23, 0, 8, 31, 27, -1, 2, 22, 23, -1, 1, 18, 3032, 16, -17, 6, 18, 3744, 4, 18, 14, 29, 3021, 23, 0, 52, 18, 4144, 12, -17, 6, 23, -1, 2, 34, 2, 23, 0, 8, 31, 27, -1, 2, 22, 23, -1, 1, 18, 3032, 16, -17, 6, 18, 2944, 8, 18, 14, 29, 3057, 23, 0, 52, 18, 80, 16, -8, 6, 23, -1, 2, 34, 2, 23, 0, 8, 31, 27, -1, 2, 22, 23, -1, 1, 18, 3032, 16, -17, 6, 18, 1308, 28, 3, 14, 29, 3093, 23, 0, 52, 18, 636, 20, -3, 6, 23, -1, 2, 34, 2, 23, 0, 8, 31, 27, -1, 2, 22, 23, -1, 1, 18, 3032, 16, -17, 6, 18, 1940, 20, 3, 14, 29, 3129, 23, 0, 52, 18, 3268, 16, -4, 6, 23, -1, 2, 34, 2, 23, 0, 8, 31, 27, -1, 2, 22, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 23, -1, 1, 18, 2316, 8, 13, 6, 34, 1, 23, 0, 6, 31, 23, -1, 2, 23, -1, 1, 18, 4240, 28, -16, 6, 34, 4, 39, 0, 29, 3173, 26, 44, 3184, 10, 51, -1, 14, 39, 0, 29, 3520, 34, 0, 40, 15, 22, 0, 1, 0, 1, 34, 0, 51, -1, 2, 43, 3500, 23, -1, 1, 18, 208, 12, 4, 6, 46, 29, 3228, 22, 23, -1, 1, 18, 208, 12, 4, 6, 18, 4232, 8, -1, 6, 44, 1, 41, 29, 3246, 23, -1, 1, 18, 208, 12, 4, 6, 27, -1, 3, 22, 39, 0, 29, 3288, 23, -1, 1, 18, 1572, 20, 2, 6, 46, 29, 3274, 22, 23, -1, 1, 18, 1572, 20, 2, 6, 18, 4232, 8, -1, 6, 44, 1, 41, 29, 3288, 23, -1, 1, 18, 1572, 20, 2, 6, 27, -1, 3, 22, 23, -1, 3, 29, 3487, 44, 0, 51, -1, 5, 23, -1, 5, 23, -1, 3, 18, 4232, 8, -1, 6, 2, 29, 3436, 23, -1, 3, 23, -1, 5, 6, 34, 1, 54, 18, 3124, 20, -8, 6, 31, 27, -1, 4, 22, 23, -1, 4, 29, 3427, 23, -1, 3, 23, -1, 5, 6, 18, 4216, 16, -5, 6, 34, 1, 23, -1, 2, 18, 3616, 12, 19, 6, 31, 22, 23, -1, 4, 18, 2236, 4, 4, 6, 34, 1, 18, 4116, 8, 15, 33, 18, 3644, 12, -7, 6, 31, 34, 1, 23, -1, 2, 18, 3616, 12, 19, 6, 31, 22, 23, -1, 4, 18, 0, 4, 15, 6, 34, 1, 18, 4116, 8, 15, 33, 18, 3644, 12, -7, 6, 31, 34, 1, 23, -1, 2, 18, 3616, 12, 19, 6, 31, 22, 7, -1, 5, 0, 22, 39, 0, 29, 3298, 23, -1, 1, 18, 2316, 8, 13, 6, 34, 1, 23, 0, 6, 31, 34, 1, 23, -1, 2, 18, 3616, 12, 19, 6, 31, 22, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 34, 1, 23, -1, 2, 18, 3616, 12, 19, 6, 31, 22, 23, -1, 2, 39, 0, 29, 3519, 35, 3496, 39, 0, 29, 3510, 51, -1, 6, 23, -1, 2, 39, 0, 29, 3519, 18, 3340, 20, 10, 33, 39, 0, 29, 3519, 26, 44, 3530, 10, 51, -1, 15, 39, 0, 29, 3573, 34, 0, 40, 16, 22, 0, 1, 0, 1, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 23, -1, 1, 18, 2316, 8, 13, 6, 34, 1, 23, 0, 6, 31, 34, 2, 39, 0, 29, 3572, 26, 44, 3583, 10, 51, -1, 16, 39, 0, 29, 3894, 34, 0, 40, 17, 22, 0, 1, 0, 1, 23, -1, 1, 18, 2316, 8, 13, 6, 51, -1, 2, 23, -1, 1, 18, 2408, 28, -21, 6, 18, 3736, 8, 17, 14, 29, 3630, 23, 0, 53, 18, 2652, 12, 18, 6, 39, 0, 29, 3638, 23, 0, 53, 18, 3464, 12, 3, 6, 51, -1, 3, 23, -1, 2, 18, 2860, 12, 3, 6, 46, 48, 29, 3658, 22, 18, 2484, 0, 7, 51, -1, 4, 18, 3800, 28, -17, 34, 1, 23, -1, 1, 18, 2328, 36, -15, 6, 18, 3704, 12, -5, 6, 31, 51, -1, 5, 44, 0, 51, -1, 6, 23, -1, 3, 23, 0, 53, 18, 3464, 12, 3, 6, 14, 29, 3779, 23, -1, 2, 18, 2872, 28, 9, 6, 44, 0, 34, 2, 23, -1, 4, 18, 2284, 16, -15, 6, 31, 23, -1, 5, 45, 23, -1, 2, 18, 3860, 16, -2, 6, 34, 1, 23, -1, 4, 18, 2284, 16, -15, 6, 31, 45, 51, -1, 7, 23, -1, 5, 18, 4232, 8, -1, 6, 23, -1, 7, 18, 4232, 8, -1, 6, 49, 44, 100, 20, 27, -1, 6, 22, 39, 0, 29, 3833, 23, -1, 2, 18, 3860, 16, -2, 6, 23, -1, 2, 18, 2872, 28, 9, 6, 34, 2, 23, -1, 4, 18, 2284, 16, -15, 6, 31, 51, -1, 8, 23, -1, 8, 18, 4232, 8, -1, 6, 23, -1, 4, 18, 4232, 8, -1, 6, 49, 44, 100, 20, 27, -1, 6, 22, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 23, -1, 2, 34, 1, 23, 0, 6, 31, 23, -1, 3, 23, 0, 53, 18, 3464, 12, 3, 6, 14, 29, 3880, 23, -1, 5, 34, 1, 16, 31, 39, 0, 29, 3881, 50, 23, -1, 6, 23, -1, 3, 34, 5, 39, 0, 29, 3893, 26, 44, 3904, 10, 51, -1, 17, 39, 0, 29, 4121, 34, 0, 40, 18, 22, 0, 1, 0, 1, 44, 0, 51, -1, 2, 23, -1, 1, 18, 2316, 8, 13, 6, 18, 1784, 24, -2, 33, 36, 46, 48, 29, 3951, 22, 23, -1, 1, 18, 2316, 8, 13, 6, 18, 2068, 48, -9, 33, 36, 29, 3979, 23, -1, 1, 18, 2316, 8, 13, 6, 18, 2860, 12, 3, 6, 18, 4232, 8, -1, 6, 27, -1, 2, 22, 39, 0, 29, 4034, 23, -1, 1, 18, 2316, 8, 13, 6, 18, 3312, 28, 18, 33, 36, 46, 29, 4010, 22, 23, -1, 1, 18, 2316, 8, 13, 6, 18, 104, 28, 3, 6, 29, 4034, 23, -1, 1, 18, 2316, 8, 13, 6, 18, 608, 12, 6, 6, 18, 4232, 8, -1, 6, 27, -1, 2, 22, 23, -1, 1, 18, 3692, 12, -14, 6, 29, 4061, 23, -1, 1, 18, 3692, 12, -14, 6, 18, 4232, 8, -1, 6, 39, 0, 29, 4064, 44, 1, 5, 51, -1, 3, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 23, -1, 1, 18, 2316, 8, 13, 6, 34, 1, 23, 0, 6, 31, 23, -1, 1, 18, 2316, 8, 13, 6, 34, 1, 23, 0, 9, 31, 23, -1, 3, 23, -1, 2, 34, 5, 39, 0, 29, 4120, 26, 44, 4131, 10, 51, -1, 18, 39, 0, 29, 4383, 34, 0, 40, 19, 22, 0, 1, 0, 1, 23, -1, 1, 18, 2408, 28, -21, 6, 18, 2040, 16, 2, 14, 46, 29, 4165, 22, 23, -1, 1, 18, 2952, 32, 12, 6, 29, 4300, 34, 0, 23, -1, 1, 18, 2952, 32, 12, 6, 31, 51, -1, 2, 34, 0, 44, 4190, 10, 39, 0, 29, 4275, 34, 0, 40, 20, 51, -1, 0, 0, 1, 1, 2, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 23, -1, 2, 18, 2316, 8, 13, 6, 34, 1, 23, 0, 6, 31, 23, -1, 2, 18, 3144, 28, 21, 6, 23, -1, 2, 18, 1764, 20, 10, 6, 23, -1, 2, 18, 4312, 20, 15, 6, 23, -1, 2, 18, 336, 12, 4, 6, 23, -1, 2, 18, 2900, 16, 5, 6, 34, 7, 39, 0, 29, 4274, 26, 34, 1, 23, -1, 2, 18, 2720, 4, -10, 6, 31, 18, 2920, 8, -11, 6, 31, 39, 0, 29, 4382, 39, 0, 29, 4373, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 23, -1, 1, 18, 2316, 8, 13, 6, 34, 1, 23, 0, 6, 31, 23, -1, 1, 18, 3144, 28, 21, 6, 23, -1, 1, 18, 1764, 20, 10, 6, 23, -1, 1, 18, 4312, 20, 15, 6, 23, -1, 1, 18, 336, 12, 4, 6, 23, -1, 1, 18, 2900, 16, 5, 6, 34, 7, 39, 0, 29, 4382, 18, 3340, 20, 10, 33, 39, 0, 29, 4382, 26, 44, 4393, 10, 51, -1, 19, 39, 0, 29, 4546, 34, 0, 40, 21, 22, 0, 0, 0, 9, 0, 1, 18, 1724, 20, 4, 19, 22, 18, 3668, 16, 22, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 18, 4080, 24, 7, 44, 0, 18, 2484, 16, -6, 9, 0, 18, 716, 4, -12, 9, 0, 18, 1616, 20, 4, 9, 0, 18, 944, 12, 17, 18, 3828, 20, 3, 39, 1, 18, 296, 32, -17, 39, 1, 18, 1596, 8, -2, 39, 1, 18, 3260, 8, 9, 39, 1, 18, 56, 16, -10, 39, 1, 18, 4052, 12, 0, 39, 1, 9, 6, 18, 3960, 28, -12, 39, 0, 18, 532, 20, 6, 39, 0, 9, 8, 1, 18, 1172, 8, -1, 19, 22, 1, 34, 1, 1, 18, 3932, 28, 5, 6, 18, 732, 8, 16, 6, 31, 1, 18, 3932, 28, 5, 19, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 4545, 26, 44, 4556, 10, 51, -1, 20, 39, 0, 29, 4649, 34, 0, 40, 22, 22, 0, 0, 0, 43, 4631, 18, 3528, 16, -8, 34, 1, 18, 1028, 20, 1, 33, 18, 1832, 28, 12, 6, 31, 51, -1, 1, 23, -1, 1, 18, 4232, 8, -1, 6, 44, 0, 37, 29, 4618, 23, -1, 1, 44, 0, 6, 18, 3048, 12, -3, 6, 39, 0, 29, 4648, 39, 0, 29, 4625, 44, 1, 5, 39, 0, 29, 4648, 35, 4627, 39, 0, 29, 4639, 51, -1, 2, 50, 39, 0, 29, 4648, 18, 3340, 20, 10, 33, 39, 0, 29, 4648, 26, 44, 4659, 10, 51, -1, 21, 39, 0, 29, 4712, 34, 0, 40, 23, 22, 0, 0, 0, 43, 4694, 18, 1252, 40, -20, 33, 18, 4240, 28, -16, 6, 18, 1888, 8, 19, 6, 39, 0, 29, 4711, 35, 4690, 39, 0, 29, 4702, 51, -1, 1, 50, 39, 0, 29, 4711, 18, 3340, 20, 10, 33, 39, 0, 29, 4711, 26, 44, 4722, 10, 51, -1, 22, 39, 0, 29, 4771, 34, 0, 40, 24, 22, 0, 0, 0, 43, 4753, 34, 0, 23, 0, 40, 18, 3704, 12, -5, 6, 31, 39, 0, 29, 4770, 35, 4749, 39, 0, 29, 4761, 51, -1, 1, 50, 39, 0, 29, 4770, 18, 3340, 20, 10, 33, 39, 0, 29, 4770, 26, 44, 4781, 10, 51, -1, 23, 39, 0, 29, 4834, 34, 0, 40, 25, 22, 0, 0, 0, 43, 4816, 18, 2988, 32, -16, 33, 18, 4240, 28, -16, 6, 18, 1888, 8, 19, 6, 39, 0, 29, 4833, 35, 4812, 39, 0, 29, 4824, 51, -1, 1, 50, 39, 0, 29, 4833, 18, 3340, 20, 10, 33, 39, 0, 29, 4833, 26, 44, 4844, 10, 51, -1, 24, 39, 0, 29, 4893, 34, 0, 40, 26, 22, 0, 0, 0, 43, 4875, 34, 0, 23, 0, 57, 18, 3704, 12, -5, 6, 31, 39, 0, 29, 4892, 35, 4871, 39, 0, 29, 4883, 51, -1, 1, 50, 39, 0, 29, 4892, 18, 3340, 20, 10, 33, 39, 0, 29, 4892, 26, 44, 4903, 10, 51, -1, 25, 39, 0, 29, 5113, 34, 0, 40, 27, 22, 0, 1, 0, 1, 43, 5100, 23, -1, 1, 18, 3692, 12, -14, 6, 51, -1, 2, 23, -1, 2, 44, 0, 12, 47, 46, 29, 4948, 22, 23, -1, 2, 18, 1592, 4, -6, 6, 44, 0, 12, 47, 29, 5094, 23, -1, 2, 18, 1592, 4, -6, 6, 18, 1200, 4, 5, 14, 29, 5002, 23, -1, 1, 18, 484, 12, -10, 6, 23, -1, 1, 18, 3252, 8, 4, 6, 34, 2, 34, 1, 23, 0, 60, 44, 0, 6, 18, 3616, 12, 19, 6, 31, 22, 39, 0, 29, 5094, 23, -1, 2, 18, 1592, 4, -6, 6, 18, 904, 4, -7, 14, 29, 5046, 23, -1, 1, 18, 484, 12, -10, 6, 23, -1, 1, 18, 3252, 8, 4, 6, 34, 2, 23, 0, 60, 44, 1, 19, 22, 39, 0, 29, 5094, 23, -1, 2, 18, 1592, 4, -6, 6, 18, 2012, 4, -17, 14, 29, 5094, 23, -1, 2, 18, 1200, 4, 5, 6, 23, -1, 2, 18, 1960, 4, 0, 6, 34, 2, 34, 1, 23, 0, 60, 44, 2, 6, 18, 3616, 12, 19, 6, 31, 22, 35, 5096, 39, 0, 29, 5103, 51, -1, 3, 18, 3340, 20, 10, 33, 39, 0, 29, 5112, 26, 44, 5123, 10, 51, -1, 26, 39, 0, 29, 5286, 34, 0, 40, 28, 22, 0, 2, 0, 1, 2, 43, 5273, 23, -1, 1, 18, 3692, 12, -14, 6, 51, -1, 3, 23, -1, 3, 44, 0, 12, 47, 46, 29, 5169, 22, 23, -1, 3, 18, 1592, 4, -6, 6, 44, 0, 12, 47, 29, 5267, 23, -1, 3, 18, 1592, 4, -6, 6, 18, 584, 12, -16, 14, 29, 5267, 34, 0, 23, 0, 27, 31, 22, 18, 3308, 4, 13, 18, 1200, 4, 5, 23, 0, 58, 34, 1, 18, 3556, 12, -17, 33, 18, 860, 20, 14, 6, 31, 34, 1, 23, 0, 28, 31, 18, 1960, 4, 0, 23, -1, 2, 18, 1592, 4, -6, 18, 2012, 4, -17, 18, 3252, 8, 4, 18, 1140, 32, -21, 9, 4, 34, 2, 18, 1252, 40, -20, 33, 18, 4064, 16, 20, 6, 18, 4332, 16, -3, 6, 31, 22, 35, 5269, 39, 0, 29, 5276, 51, -1, 4, 18, 3340, 20, 10, 33, 39, 0, 29, 5285, 26, 44, 5296, 10, 51, -1, 27, 39, 0, 29, 5375, 34, 0, 40, 29, 22, 0, 0, 0, 44, 0, 51, -1, 1, 23, -1, 1, 23, 0, 59, 18, 4232, 8, -1, 6, 2, 29, 5365, 23, 0, 59, 23, -1, 1, 6, 8, 18, 2752, 16, 9, 14, 29, 5356, 34, 0, 23, 0, 59, 23, -1, 1, 6, 31, 23, 0, 58, 23, -1, 1, 19, 22, 7, -1, 1, 0, 22, 39, 0, 29, 5309, 18, 3340, 20, 10, 33, 39, 0, 29, 5374, 26, 44, 5385, 10, 51, -1, 28, 39, 0, 29, 5402, 34, 0, 40, 30, 22, 0, 1, 0, 1, 23, -1, 1, 39, 0, 29, 5401, 26, 44, 5412, 10, 51, -1, 29, 39, 0, 29, 5945, 34, 0, 40, 31, 22, 0, 0, 0, 43, 5885, 34, 0, 23, 0, 27, 31, 22, 44, 0, 51, -1, 1, 23, -1, 1, 23, 0, 60, 44, 0, 6, 18, 4232, 8, -1, 6, 2, 29, 5513, 23, 0, 60, 44, 0, 6, 23, -1, 1, 6, 44, 1, 6, 18, 1592, 4, -6, 18, 584, 12, -16, 18, 3252, 8, 4, 18, 1140, 32, -21, 9, 2, 34, 2, 23, 0, 60, 44, 0, 6, 23, -1, 1, 6, 44, 0, 6, 18, 4332, 16, -3, 6, 31, 22, 7, -1, 1, 0, 22, 39, 0, 29, 5434, 23, 0, 58, 34, 1, 18, 3556, 12, -17, 33, 18, 860, 20, 14, 6, 31, 34, 1, 23, 0, 28, 31, 44, 0, 34, 2, 34, 1, 23, 0, 60, 44, 2, 6, 18, 3616, 12, 19, 6, 31, 22, 44, 5561, 10, 39, 0, 29, 5867, 34, 0, 40, 32, 51, -1, 0, 0, 1, 1, 2, 44, 5582, 10, 51, -1, 3, 39, 0, 29, 5848, 34, 0, 40, 33, 22, 0, 1, 0, 1, 23, 0, 60, 44, 1, 6, 51, -1, 2, 23, 0, 60, 44, 2, 6, 51, -1, 3, 23, -1, 2, 44, 0, 12, 14, 46, 48, 29, 5628, 22, 23, -1, 3, 44, 0, 12, 14, 46, 48, 29, 5644, 22, 23, -1, 3, 18, 4232, 8, -1, 6, 44, 3, 2, 46, 29, 5654, 22, 23, -1, 1, 44, 30, 2, 29, 5726, 23, -1, 1, 44, 10, 2, 29, 5670, 44, 1, 39, 0, 29, 5672, 44, 3, 51, -1, 4, 23, -1, 4, 44, 5685, 10, 39, 0, 29, 5713, 34, 0, 40, 34, 51, -1, 0, 0, 0, 1, 23, 33, 1, 23, 33, 4, 45, 34, 1, 23, 32, 3, 31, 39, 0, 29, 5712, 26, 34, 2, 18, 1872, 16, -5, 33, 31, 22, 39, 0, 29, 5838, 23, -1, 2, 44, 0, 12, 47, 46, 29, 5748, 22, 23, -1, 2, 18, 4232, 8, -1, 6, 44, 2, 14, 29, 5815, 18, 3228, 4, 5, 23, -1, 3, 34, 1, 18, 3556, 12, -17, 33, 18, 860, 20, 14, 6, 31, 18, 1592, 4, -6, 18, 2984, 4, -5, 18, 3252, 8, 4, 18, 1140, 32, -21, 9, 3, 51, -1, 5, 23, -1, 2, 44, 1, 6, 23, -1, 5, 34, 2, 23, -1, 2, 44, 0, 6, 18, 4332, 16, -3, 6, 31, 22, 34, 0, 23, 0, 60, 44, 2, 19, 22, 44, 0, 23, 32, 2, 34, 2, 18, 1872, 16, -5, 33, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 5847, 26, 44, 0, 34, 1, 23, -1, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 5866, 26, 34, 1, 18, 2384, 24, -13, 33, 28, 39, 0, 29, 5944, 35, 5881, 39, 0, 29, 5935, 51, -1, 2, 44, 5895, 10, 39, 0, 29, 5923, 34, 0, 40, 35, 51, -1, 0, 0, 1, 1, 2, 34, 0, 23, -1, 2, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 5922, 26, 34, 1, 18, 2384, 24, -13, 33, 28, 39, 0, 29, 5944, 18, 3340, 20, 10, 33, 39, 0, 29, 5944, 26, 44, 5955, 10, 51, -1, 30, 39, 0, 29, 6156, 34, 0, 40, 36, 22, 0, 1, 0, 1, 23, -1, 1, 44, 0, 14, 29, 5997, 23, 0, 25, 18, 1660, 12, 18, 34, 2, 18, 1252, 40, -20, 33, 18, 228, 36, 5, 6, 31, 22, 39, 0, 29, 6146, 44, 6004, 10, 39, 0, 29, 6038, 34, 0, 40, 37, 51, -1, 0, 0, 1, 1, 2, 23, 36, 1, 23, -1, 2, 34, 2, 23, 0, 26, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 6037, 26, 18, 1660, 12, 18, 34, 2, 18, 1252, 40, -20, 33, 18, 228, 36, 5, 6, 31, 22, 18, 3308, 4, 13, 18, 1592, 4, -6, 18, 1200, 4, 5, 18, 3252, 8, 4, 18, 1140, 32, -21, 9, 2, 34, 2, 18, 1252, 40, -20, 33, 18, 4064, 16, 20, 6, 18, 4332, 16, -3, 6, 31, 22, 23, -1, 1, 44, 2, 14, 29, 6146, 18, 3308, 4, 13, 18, 1592, 4, -6, 18, 904, 4, -7, 18, 3252, 8, 4, 18, 1140, 32, -21, 9, 2, 34, 2, 18, 1252, 40, -20, 33, 18, 4064, 16, 20, 6, 18, 4332, 16, -3, 6, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 6155, 26, 18, 908, 20, 18, 18, 2916, 4, -4, 18, 4388, 20, 8, 18, 3612, 4, 4, 18, 800, 16, 5, 18, 828, 8, -7, 18, 4036, 16, 1, 18, 396, 4, 6, 9, 4, 51, -1, 31, 18, 1680, 44, -16, 18, 1864, 8, -18, 18, 1060, 52, -21, 18, 2436, 4, 7, 18, 748, 12, -2, 18, 1292, 8, -14, 9, 3, 51, -1, 32, 18, 2040, 16, 2, 18, 3908, 8, -15, 9, 1, 51, -1, 33, 18, 1240, 12, -3, 18, 596, 12, -16, 18, 2844, 16, 15, 18, 1676, 4, -10, 9, 2, 51, -1, 34, 18, 956, 64, -19, 18, 1860, 4, 22, 9, 1, 51, -1, 35, 18, 2500, 16, 21, 44, 6280, 10, 39, 0, 29, 6423, 34, 0, 40, 38, 51, -1, 0, 0, 1, 1, 2, 50, 51, -1, 3, 23, 0, 31, 23, -1, 2, 6, 44, 0, 12, 47, 29, 6319, 23, 0, 31, 23, -1, 2, 6, 27, -1, 3, 22, 23, 0, 32, 23, -1, 2, 6, 44, 0, 12, 47, 29, 6343, 23, 0, 32, 23, -1, 2, 6, 27, -1, 3, 22, 23, 0, 33, 23, -1, 2, 6, 44, 0, 12, 47, 29, 6367, 23, 0, 33, 23, -1, 2, 6, 27, -1, 3, 22, 23, 0, 34, 23, -1, 2, 6, 44, 0, 12, 47, 29, 6391, 23, 0, 34, 23, -1, 2, 6, 27, -1, 3, 22, 23, 0, 35, 23, -1, 2, 6, 44, 0, 12, 47, 29, 6415, 23, 0, 35, 23, -1, 2, 6, 27, -1, 3, 22, 23, -1, 3, 39, 0, 29, 6422, 26, 18, 328, 8, 2, 44, 6434, 10, 39, 0, 29, 6563, 34, 0, 40, 39, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 35, 23, -1, 2, 6, 51, -1, 4, 50, 51, -1, 5, 34, 0, 51, -1, 6, 44, 6472, 10, 39, 0, 29, 6558, 34, 0, 40, 40, 51, -1, 0, 0, 1, 1, 2, 23, 39, 6, 23, -1, 2, 34, 2, 23, 0, 4, 31, 27, 39, 5, 22, 23, 39, 5, 50, 14, 29, 6511, 15, 39, 0, 29, 6557, 23, 39, 5, 18, 2208, 28, -11, 6, 27, 39, 6, 22, 23, 39, 5, 18, 3544, 12, -9, 6, 27, 39, 5, 22, 23, 39, 5, 23, 39, 4, 34, 2, 23, 39, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 6557, 26, 39, 0, 29, 6562, 26, 18, 2364, 20, 19, 44, 6574, 10, 39, 0, 29, 6659, 34, 0, 40, 41, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 34, 23, -1, 2, 6, 51, -1, 4, 50, 51, -1, 5, 44, 6607, 10, 39, 0, 29, 6654, 34, 0, 40, 42, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 2, 31, 27, 41, 5, 22, 23, 41, 5, 23, 41, 4, 34, 2, 23, 41, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 6653, 26, 39, 0, 29, 6658, 26, 18, 3260, 8, 9, 44, 6670, 10, 39, 0, 29, 6755, 34, 0, 40, 43, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 31, 23, -1, 2, 6, 51, -1, 4, 50, 51, -1, 5, 44, 6703, 10, 39, 0, 29, 6750, 34, 0, 40, 44, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 3, 31, 27, 43, 5, 22, 23, 43, 5, 23, 43, 4, 34, 2, 23, 43, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 6749, 26, 39, 0, 29, 6754, 26, 18, 2040, 16, 2, 44, 6766, 10, 39, 0, 29, 6883, 34, 0, 40, 45, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 33, 23, -1, 2, 6, 51, -1, 4, 50, 51, -1, 5, 44, 6799, 10, 39, 0, 29, 6878, 34, 0, 40, 46, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 1, 31, 27, 45, 5, 22, 44, 0, 51, -1, 3, 23, -1, 3, 23, 45, 5, 18, 4232, 8, -1, 6, 2, 29, 6868, 23, 45, 5, 23, -1, 3, 6, 23, 45, 4, 34, 2, 23, 45, 3, 31, 22, 7, -1, 3, 0, 22, 39, 0, 29, 6828, 18, 3340, 20, 10, 33, 39, 0, 29, 6877, 26, 39, 0, 29, 6882, 26, 18, 220, 8, 11, 44, 6894, 10, 39, 0, 29, 6979, 34, 0, 40, 47, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 32, 23, -1, 2, 6, 51, -1, 4, 50, 51, -1, 5, 44, 6927, 10, 39, 0, 29, 6974, 34, 0, 40, 48, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 0, 31, 27, 47, 5, 22, 23, 47, 5, 23, 47, 4, 34, 2, 23, 47, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 6973, 26, 39, 0, 29, 6978, 26, 9, 6, 51, -1, 36, 44, 16, 51, -1, 37, 44, 15, 44, 1000, 20, 51, -1, 38, 44, 7004, 10, 39, 0, 29, 7840, 34, 0, 40, 49, 51, -1, 0, 0, 4, 1, 2, 3, 4, 5, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 1, 18, 1724, 20, 4, 6, 18, 928, 4, 8, 19, 22, 23, -1, 2, 44, 0, 12, 14, 29, 7072, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 220, 8, 11, 6, 39, 0, 29, 7075, 23, -1, 2, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 220, 8, 11, 19, 22, 23, -1, 4, 44, 0, 12, 14, 29, 7121, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 3260, 8, 9, 6, 39, 0, 29, 7124, 23, -1, 4, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 3260, 8, 9, 19, 22, 23, -1, 3, 44, 0, 12, 14, 29, 7170, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 56, 16, -10, 6, 39, 0, 29, 7173, 23, -1, 3, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 56, 16, -10, 19, 22, 23, -1, 5, 44, 0, 12, 14, 29, 7219, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 3544, 12, -9, 6, 39, 0, 29, 7222, 23, -1, 5, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 3544, 12, -9, 19, 22, 1, 18, 1172, 8, -1, 6, 18, 3960, 28, -12, 6, 39, 0, 14, 29, 7816, 18, 2988, 32, -16, 33, 18, 852, 8, 13, 6, 34, 1, 4, 28, 51, -1, 6, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 220, 8, 11, 6, 29, 7446, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 748, 12, -2, 34, 2, 23, 0, 36, 18, 220, 8, 11, 6, 31, 18, 748, 12, -2, 34, 3, 23, -1, 6, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 1680, 44, -16, 34, 2, 23, 0, 36, 18, 220, 8, 11, 6, 31, 18, 1680, 44, -16, 34, 3, 23, -1, 6, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 1060, 52, -21, 34, 2, 23, 0, 36, 18, 220, 8, 11, 6, 31, 18, 1060, 52, -21, 34, 3, 23, -1, 6, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 2040, 16, 2, 34, 2, 23, 0, 36, 18, 2040, 16, 2, 6, 31, 18, 2040, 16, 2, 34, 3, 23, -1, 6, 18, 228, 36, 5, 6, 31, 22, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 56, 16, -10, 6, 39, 1, 14, 29, 7545, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 1240, 12, -3, 34, 2, 23, 0, 36, 18, 2364, 20, 19, 6, 31, 18, 1240, 12, -3, 34, 3, 23, -1, 6, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 2844, 16, 15, 34, 2, 23, 0, 36, 18, 2364, 20, 19, 6, 31, 18, 2844, 16, 15, 34, 3, 23, -1, 6, 18, 228, 36, 5, 6, 31, 22, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 3260, 8, 9, 6, 46, 29, 7596, 22, 18, 2988, 32, -16, 33, 18, 852, 8, 13, 6, 18, 4036, 16, 1, 34, 2, 53, 18, 1964, 12, 4, 6, 18, 4196, 20, 5, 6, 31, 39, 1, 14, 29, 7715, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 4036, 16, 1, 34, 2, 23, 0, 36, 18, 3260, 8, 9, 6, 31, 18, 4036, 16, 1, 34, 3, 23, -1, 6, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 4388, 20, 8, 34, 2, 23, 0, 36, 18, 3260, 8, 9, 6, 31, 18, 4388, 20, 8, 34, 3, 23, -1, 6, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 800, 16, 5, 34, 2, 23, 0, 36, 18, 3260, 8, 9, 6, 31, 18, 800, 16, 5, 34, 3, 23, -1, 6, 18, 228, 36, 5, 6, 31, 22, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 3544, 12, -9, 6, 46, 29, 7761, 22, 18, 1252, 40, -20, 33, 18, 956, 64, -19, 34, 2, 53, 18, 1964, 12, 4, 6, 18, 4196, 20, 5, 6, 31, 39, 1, 14, 29, 7802, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 956, 64, -19, 34, 2, 23, 0, 36, 18, 328, 8, 2, 6, 31, 18, 956, 64, -19, 34, 3, 23, -1, 6, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 1172, 8, -1, 6, 18, 3960, 28, -12, 19, 22, 39, 1, 1, 18, 1172, 8, -1, 6, 18, 532, 20, 6, 19, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 7839, 26, 23, -1, 5, 18, 148, 60, -16, 6, 18, 944, 12, 17, 19, 22, 44, 7861, 10, 39, 0, 29, 7895, 34, 0, 40, 50, 51, -1, 0, 0, 0, 1, 39, 0, 1, 18, 1172, 8, -1, 6, 18, 532, 20, 6, 19, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 7894, 26, 23, -1, 5, 18, 148, 60, -16, 6, 18, 2728, 24, -14, 19, 22, 44, 7916, 10, 39, 0, 29, 7942, 34, 0, 40, 51, 51, -1, 0, 0, 0, 1, 1, 18, 1172, 8, -1, 6, 18, 3668, 16, 22, 6, 39, 0, 29, 7941, 26, 23, -1, 5, 18, 148, 60, -16, 6, 18, 1976, 20, -18, 19, 22, 44, 7963, 10, 39, 0, 29, 8128, 34, 0, 40, 52, 51, -1, 0, 0, 0, 1, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 6, 34, 1, 18, 3212, 16, -16, 33, 18, 56, 16, -10, 6, 31, 51, -1, 2, 23, -1, 2, 18, 4232, 8, -1, 6, 51, -1, 3, 44, 0, 51, -1, 4, 23, -1, 4, 23, -1, 3, 2, 29, 8117, 23, -1, 2, 23, -1, 4, 6, 51, -1, 5, 34, 0, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 6, 23, -1, 5, 6, 18, 3704, 12, -5, 6, 31, 1, 18, 1724, 20, 4, 6, 23, -1, 5, 19, 22, 34, 0, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 6, 23, -1, 5, 6, 18, 3172, 40, -16, 6, 31, 1, 18, 1724, 20, 4, 6, 23, -1, 5, 18, 3300, 8, 2, 45, 19, 22, 7, -1, 4, 0, 22, 39, 0, 29, 8016, 1, 18, 1724, 20, 4, 6, 39, 0, 29, 8127, 26, 23, -1, 5, 18, 148, 60, -16, 6, 18, 3704, 12, -5, 19, 22, 44, 8149, 10, 39, 0, 29, 8185, 34, 0, 40, 53, 51, -1, 0, 0, 2, 1, 2, 3, 23, -1, 3, 1, 18, 1724, 20, 4, 6, 23, -1, 2, 19, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 8184, 26, 23, -1, 5, 18, 148, 60, -16, 6, 18, 552, 32, -15, 19, 22, 44, 8206, 10, 39, 0, 29, 8249, 34, 0, 40, 54, 51, -1, 0, 0, 0, 1, 9, 0, 1, 18, 1724, 20, 4, 19, 22, 9, 0, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 19, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 8248, 26, 23, -1, 5, 18, 148, 60, -16, 6, 18, 264, 20, 21, 19, 22, 44, 8270, 10, 39, 0, 29, 8308, 34, 0, 40, 55, 51, -1, 0, 0, 2, 1, 2, 3, 23, -1, 3, 23, -1, 2, 34, 2, 1, 18, 3932, 28, 5, 6, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 8307, 26, 23, -1, 5, 18, 148, 60, -16, 6, 18, 496, 16, -3, 19, 22, 44, 8329, 10, 39, 0, 29, 8503, 34, 0, 40, 56, 51, -1, 0, 0, 2, 1, 2, 3, 1, 18, 1172, 8, -1, 6, 18, 532, 20, 6, 6, 39, 0, 14, 29, 8362, 15, 39, 0, 29, 8502, 43, 8473, 23, -1, 3, 18, 4232, 8, -1, 6, 44, 1, 30, 51, -1, 4, 23, -1, 3, 23, -1, 4, 6, 51, -1, 5, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 6, 23, -1, 2, 6, 48, 29, 8437, 23, 0, 38, 23, 0, 37, 34, 2, 17, 18, 2116, 32, -18, 6, 28, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 6, 23, -1, 2, 19, 22, 23, -1, 3, 23, -1, 5, 34, 2, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 6, 23, -1, 2, 6, 18, 3616, 12, 19, 6, 31, 22, 35, 8469, 39, 0, 29, 8493, 51, -1, 6, 23, -1, 6, 18, 3544, 12, -9, 34, 2, 17, 18, 2516, 16, 12, 6, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 8502, 26, 23, -1, 5, 18, 148, 60, -16, 6, 18, 3932, 28, 5, 19, 22, 34, 0, 23, -1, 5, 28, 51, -1, 39, 23, -1, 39, 51, -1, 40, 18, 3568, 8, -11, 44, 8, 18, 2056, 12, 17, 44, 7, 18, 1112, 8, -16, 44, 6, 18, 4420, 4, -5, 44, 5, 18, 4156, 16, -11, 44, 4, 18, 3516, 12, -13, 44, 3, 18, 72, 8, -15, 44, 2, 18, 932, 12, 14, 44, 1, 18, 4408, 12, -14, 44, 0, 9, 9, 51, -1, 41, 9, 0, 51, -1, 42, 18, 2148, 16, 14, 18, 704, 12, 17, 44, 62, 18, 1204, 4, 3, 44, 61, 18, 3716, 12, 19, 44, 60, 9, 3, 18, 1300, 8, -19, 18, 4288, 24, 6, 44, 53, 18, 4020, 16, 0, 44, 52, 18, 4368, 8, 5, 44, 51, 18, 1300, 8, -19, 44, 50, 9, 4, 18, 1808, 24, 19, 18, 3464, 12, 3, 44, 41, 18, 2652, 12, 18, 44, 40, 9, 2, 18, 3684, 8, 6, 18, 4172, 12, 3, 44, 30, 9, 1, 18, 2532, 8, 8, 18, 1204, 4, 3, 44, 21, 18, 3716, 12, 19, 44, 20, 9, 2, 18, 284, 12, 7, 18, 672, 16, 14, 44, 13, 18, 704, 12, 17, 44, 12, 18, 1204, 4, 3, 44, 11, 18, 3716, 12, 19, 44, 10, 9, 4, 18, 4184, 12, 12, 18, 740, 8, -7, 44, 3, 18, 704, 12, 17, 44, 2, 18, 2300, 4, -19, 44, 1, 18, 3924, 8, -17, 44, 0, 9, 4, 9, 7, 51, -1, 43, 18, 908, 20, 18, 23, -1, 43, 18, 4184, 12, 12, 6, 18, 740, 8, -7, 6, 18, 4388, 20, 8, 23, -1, 43, 18, 4184, 12, 12, 6, 18, 704, 12, 17, 6, 18, 800, 16, 5, 23, -1, 43, 18, 4184, 12, 12, 6, 18, 2300, 4, -19, 6, 18, 4036, 16, 1, 23, -1, 43, 18, 4184, 12, 12, 6, 18, 3924, 8, -17, 6, 9, 4, 51, -1, 44, 18, 3232, 20, 20, 23, -1, 43, 18, 284, 12, 7, 6, 18, 672, 16, 14, 6, 18, 1680, 44, -16, 23, -1, 43, 18, 284, 12, 7, 6, 18, 704, 12, 17, 6, 18, 1060, 52, -21, 23, -1, 43, 18, 284, 12, 7, 6, 18, 1204, 4, 3, 6, 18, 748, 12, -2, 23, -1, 43, 18, 284, 12, 7, 6, 18, 3716, 12, 19, 6, 9, 4, 51, -1, 45, 18, 1240, 12, -3, 23, -1, 43, 18, 2532, 8, 8, 6, 18, 1204, 4, 3, 6, 18, 2844, 16, 15, 23, -1, 43, 18, 2532, 8, 8, 6, 18, 3716, 12, 19, 6, 9, 2, 51, -1, 46, 18, 296, 32, -17, 23, -1, 43, 18, 3684, 8, 6, 6, 18, 4172, 12, 3, 6, 9, 1, 51, -1, 47, 18, 1020, 8, 11, 23, -1, 43, 18, 1808, 24, 19, 6, 18, 3464, 12, 3, 6, 18, 3736, 8, 17, 23, -1, 43, 18, 1808, 24, 19, 6, 18, 2652, 12, 18, 6, 9, 2, 51, -1, 48, 18, 2452, 28, -10, 23, -1, 43, 18, 1300, 8, -19, 6, 18, 4288, 24, 6, 6, 18, 2164, 16, 12, 23, -1, 43, 18, 1300, 8, -19, 6, 18, 4020, 16, 0, 6, 18, 3728, 8, 11, 23, -1, 43, 18, 1300, 8, -19, 6, 18, 4368, 8, 5, 6, 18, 1596, 8, -2, 23, -1, 43, 18, 1300, 8, -19, 6, 18, 1300, 8, -19, 6, 9, 4, 51, -1, 49, 18, 2040, 16, 2, 23, -1, 43, 18, 2148, 16, 14, 6, 18, 704, 12, 17, 6, 18, 512, 20, 14, 23, -1, 43, 18, 2148, 16, 14, 6, 18, 1204, 4, 3, 6, 18, 432, 24, 16, 23, -1, 43, 18, 2148, 16, 14, 6, 18, 3716, 12, 19, 6, 9, 3, 51, -1, 50, 18, 4052, 12, 0, 44, 9149, 10, 39, 0, 29, 9234, 34, 0, 40, 57, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 50, 23, -1, 2, 6, 51, -1, 4, 50, 51, -1, 5, 44, 9182, 10, 39, 0, 29, 9229, 34, 0, 40, 58, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 18, 31, 27, 57, 5, 22, 23, 57, 5, 23, 57, 4, 34, 2, 23, 57, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 9228, 26, 39, 0, 29, 9233, 26, 18, 296, 32, -17, 44, 9245, 10, 39, 0, 29, 9325, 34, 0, 40, 59, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 47, 23, -1, 2, 6, 51, -1, 4, 44, 9274, 10, 39, 0, 29, 9320, 34, 0, 40, 60, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 17, 31, 51, -1, 3, 23, -1, 3, 23, 59, 4, 34, 2, 23, 59, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 9319, 26, 39, 0, 29, 9324, 26, 18, 3828, 20, 3, 44, 9336, 10, 39, 0, 29, 9416, 34, 0, 40, 61, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 48, 23, -1, 2, 6, 51, -1, 4, 44, 9365, 10, 39, 0, 29, 9411, 34, 0, 40, 62, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 16, 31, 51, -1, 3, 23, -1, 3, 23, 61, 4, 34, 2, 23, 61, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 9410, 26, 39, 0, 29, 9415, 26, 18, 1596, 8, -2, 44, 9427, 10, 39, 0, 29, 9512, 34, 0, 40, 63, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 49, 23, -1, 2, 6, 51, -1, 4, 50, 51, -1, 5, 44, 9460, 10, 39, 0, 29, 9507, 34, 0, 40, 64, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 15, 31, 27, 63, 5, 22, 23, 63, 5, 23, 63, 4, 34, 2, 23, 63, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 9506, 26, 39, 0, 29, 9511, 26, 18, 2364, 20, 19, 44, 9523, 10, 39, 0, 29, 9608, 34, 0, 40, 65, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 46, 23, -1, 2, 6, 51, -1, 4, 50, 51, -1, 5, 44, 9556, 10, 39, 0, 29, 9603, 34, 0, 40, 66, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 13, 31, 27, 65, 5, 22, 23, 65, 5, 23, 65, 4, 34, 2, 23, 65, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 9602, 26, 39, 0, 29, 9607, 26, 18, 3260, 8, 9, 44, 9619, 10, 39, 0, 29, 9704, 34, 0, 40, 67, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 44, 23, -1, 2, 6, 51, -1, 4, 50, 51, -1, 5, 44, 9652, 10, 39, 0, 29, 9699, 34, 0, 40, 68, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 14, 31, 27, 67, 5, 22, 23, 67, 5, 23, 67, 4, 34, 2, 23, 67, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 9698, 26, 39, 0, 29, 9703, 26, 18, 220, 8, 11, 44, 9715, 10, 39, 0, 29, 9800, 34, 0, 40, 69, 51, -1, 0, 0, 2, 1, 2, 3, 23, 0, 45, 23, -1, 2, 6, 51, -1, 4, 50, 51, -1, 5, 44, 9748, 10, 39, 0, 29, 9795, 34, 0, 40, 70, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 12, 31, 27, 69, 5, 22, 23, 69, 5, 23, 69, 4, 34, 2, 23, 69, 3, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 9794, 26, 39, 0, 29, 9799, 26, 9, 7, 51, -1, 51, 18, 3268, 16, -4, 44, 1, 44, 7, 25, 18, 636, 20, -3, 44, 1, 44, 6, 25, 18, 80, 16, -8, 44, 1, 44, 5, 25, 18, 4144, 12, -17, 44, 1, 44, 4, 25, 18, 4376, 12, -11, 44, 1, 44, 3, 25, 18, 2768, 12, -11, 44, 1, 44, 2, 25, 18, 2180, 20, 20, 44, 1, 44, 1, 25, 18, 3628, 16, 3, 44, 1, 44, 0, 25, 9, 8, 51, -1, 52, 18, 3464, 12, 3, 44, 1, 18, 2652, 12, 18, 44, 0, 9, 2, 51, -1, 53, 44, 16, 51, -1, 54, 44, 150, 44, 1000, 20, 51, -1, 55, 18, 1808, 24, 19, 44, 1, 44, 5, 25, 18, 3684, 8, 6, 44, 1, 44, 4, 25, 18, 1300, 8, -19, 44, 1, 44, 3, 25, 18, 4184, 12, 12, 44, 1, 44, 2, 25, 18, 3916, 8, -9, 44, 1, 44, 1, 25, 18, 2148, 16, 14, 44, 1, 44, 0, 25, 9, 6, 51, -1, 56, 44, 9978, 10, 39, 0, 29, 10223, 34, 0, 40, 71, 51, -1, 0, 0, 0, 1, 1, 51, -1, 2, 44, 9999, 10, 39, 0, 29, 10159, 34, 0, 40, 72, 51, -1, 0, 0, 1, 1, 2, 44, 10017, 10, 39, 0, 29, 10137, 34, 0, 40, 73, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 18, 2408, 28, -21, 6, 18, 1924, 16, 19, 14, 29, 10127, 44, 0, 51, -1, 3, 23, -1, 3, 23, -1, 2, 18, 2692, 28, -16, 6, 18, 4232, 8, -1, 6, 2, 29, 10127, 23, -1, 2, 18, 2692, 28, -16, 6, 23, -1, 3, 6, 51, -1, 4, 23, -1, 4, 18, 2604, 28, -13, 6, 18, 2632, 8, 21, 33, 18, 3060, 16, -11, 6, 14, 29, 10118, 23, -1, 4, 34, 1, 23, 71, 2, 18, 1208, 32, 12, 6, 31, 22, 7, -1, 3, 0, 22, 39, 0, 29, 10048, 18, 3340, 20, 10, 33, 39, 0, 29, 10136, 26, 34, 1, 23, -1, 2, 18, 3020, 12, -2, 6, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 10158, 26, 34, 1, 18, 348, 24, 11, 33, 28, 1, 18, 400, 20, 5, 19, 22, 18, 2640, 12, 11, 39, 1, 18, 1924, 16, 19, 39, 1, 9, 2, 18, 2988, 32, -16, 33, 18, 852, 8, 13, 6, 34, 2, 1, 18, 400, 20, 5, 6, 18, 836, 16, 21, 6, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 10222, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 3576, 36, 15, 19, 22, 44, 10244, 10, 39, 0, 29, 10390, 34, 0, 40, 74, 51, -1, 0, 0, 0, 1, 9, 0, 51, -1, 2, 1, 18, 1172, 8, -1, 6, 18, 716, 4, -12, 6, 34, 1, 18, 3212, 16, -16, 33, 18, 56, 16, -10, 6, 31, 51, -1, 3, 44, 0, 51, -1, 4, 23, -1, 4, 23, -1, 3, 18, 4232, 8, -1, 6, 2, 29, 10382, 23, -1, 3, 23, -1, 4, 6, 51, -1, 5, 23, -1, 5, 1, 18, 1172, 8, -1, 6, 18, 2484, 16, -6, 6, 42, 29, 10373, 1, 18, 1172, 8, -1, 6, 18, 2484, 16, -6, 6, 23, -1, 5, 6, 51, -1, 6, 1, 18, 1172, 8, -1, 6, 18, 716, 4, -12, 6, 23, -1, 5, 6, 23, -1, 2, 23, -1, 6, 19, 22, 7, -1, 4, 0, 22, 39, 0, 29, 10291, 23, -1, 2, 39, 0, 29, 10389, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 4424, 36, 18, 19, 22, 44, 10411, 10, 39, 0, 29, 10565, 34, 0, 40, 75, 51, -1, 0, 0, 1, 1, 2, 1, 18, 1172, 8, -1, 6, 18, 716, 4, -12, 6, 48, 29, 10450, 9, 0, 1, 18, 1172, 8, -1, 6, 18, 716, 4, -12, 19, 22, 1, 18, 1172, 8, -1, 6, 18, 2484, 16, -6, 6, 48, 29, 10492, 9, 0, 1, 18, 1172, 8, -1, 6, 18, 2484, 16, -6, 19, 22, 44, 0, 1, 18, 1172, 8, -1, 6, 18, 4080, 24, 7, 19, 22, 18, 3360, 104, -15, 34, 1, 23, -1, 2, 18, 3756, 44, -10, 6, 31, 51, -1, 3, 44, 0, 51, -1, 4, 23, -1, 4, 23, -1, 3, 18, 4232, 8, -1, 6, 2, 29, 10555, 23, -1, 3, 23, -1, 4, 6, 34, 1, 1, 18, 372, 24, 19, 6, 31, 22, 7, -1, 4, 0, 22, 39, 0, 29, 10515, 18, 3340, 20, 10, 33, 39, 0, 29, 10564, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 1208, 32, 12, 19, 22, 44, 10586, 10, 39, 0, 29, 10709, 34, 0, 40, 76, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 34, 1, 23, 0, 6, 31, 51, -1, 3, 23, -1, 3, 1, 18, 1172, 8, -1, 6, 18, 716, 4, -12, 6, 42, 48, 29, 10699, 23, -1, 2, 34, 1, 23, 0, 9, 31, 51, -1, 4, 23, -1, 4, 1, 18, 1172, 8, -1, 6, 18, 716, 4, -12, 6, 23, -1, 3, 19, 22, 1, 18, 1172, 8, -1, 6, 18, 4080, 24, 7, 6, 1, 18, 1172, 8, -1, 6, 18, 2484, 16, -6, 6, 23, -1, 3, 19, 22, 44, 1, 1, 18, 1172, 8, -1, 6, 18, 4080, 24, 7, 11, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 10708, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 372, 24, 19, 19, 22, 44, 10730, 10, 39, 0, 29, 11804, 34, 0, 40, 77, 51, -1, 0, 0, 1, 1, 2, 23, -1, 2, 46, 48, 29, 10751, 22, 9, 0, 27, -1, 2, 22, 18, 3828, 20, 3, 23, -1, 2, 18, 3828, 20, 3, 6, 39, 0, 47, 18, 296, 32, -17, 23, -1, 2, 18, 296, 32, -17, 6, 39, 0, 47, 18, 1596, 8, -2, 23, -1, 2, 18, 1596, 8, -2, 6, 39, 0, 47, 18, 3260, 8, 9, 23, -1, 2, 18, 3260, 8, 9, 6, 39, 0, 47, 18, 56, 16, -10, 23, -1, 2, 18, 56, 16, -10, 6, 39, 0, 47, 18, 4052, 12, 0, 23, -1, 2, 18, 4052, 12, 0, 6, 39, 0, 47, 9, 6, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 19, 22, 34, 0, 18, 4104, 12, 7, 33, 18, 1648, 12, -11, 6, 31, 1, 18, 1172, 8, -1, 6, 18, 3284, 16, 1, 19, 22, 1, 18, 1172, 8, -1, 6, 18, 3960, 28, -12, 6, 39, 0, 14, 29, 11780, 18, 2988, 32, -16, 33, 18, 852, 8, 13, 6, 34, 1, 4, 28, 51, -1, 3, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 4052, 12, 0, 6, 29, 11208, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 432, 24, 16, 34, 2, 23, 0, 51, 18, 4052, 12, 0, 6, 31, 18, 432, 24, 16, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 2040, 16, 2, 34, 2, 23, 0, 51, 18, 4052, 12, 0, 6, 31, 18, 2040, 16, 2, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 512, 20, 14, 34, 2, 23, 0, 51, 18, 4052, 12, 0, 6, 31, 18, 512, 20, 14, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 748, 12, -2, 34, 2, 23, 0, 51, 18, 220, 8, 11, 6, 31, 18, 748, 12, -2, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 1680, 44, -16, 34, 2, 23, 0, 51, 18, 220, 8, 11, 6, 31, 18, 1680, 44, -16, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 1060, 52, -21, 34, 2, 23, 0, 51, 18, 220, 8, 11, 6, 31, 18, 1060, 52, -21, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 3232, 20, 20, 34, 2, 23, 0, 51, 18, 220, 8, 11, 6, 31, 18, 3656, 12, -1, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 56, 16, -10, 6, 29, 11304, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 1240, 12, -3, 34, 2, 23, 0, 51, 18, 2364, 20, 19, 6, 31, 18, 1240, 12, -3, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 2844, 16, 15, 34, 2, 23, 0, 51, 18, 2364, 20, 19, 6, 31, 18, 2844, 16, 15, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 3260, 8, 9, 6, 29, 11439, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 4036, 16, 1, 34, 2, 23, 0, 51, 18, 3260, 8, 9, 6, 31, 18, 4036, 16, 1, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 4388, 20, 8, 34, 2, 23, 0, 51, 18, 3260, 8, 9, 6, 31, 18, 4388, 20, 8, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 800, 16, 5, 34, 2, 23, 0, 51, 18, 3260, 8, 9, 6, 31, 18, 800, 16, 5, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 3828, 20, 3, 6, 29, 11535, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 3736, 8, 17, 34, 2, 23, 0, 51, 18, 3828, 20, 3, 6, 31, 18, 3736, 8, 17, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 1020, 8, 11, 34, 2, 23, 0, 51, 18, 3828, 20, 3, 6, 31, 18, 1020, 8, 11, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 296, 32, -17, 6, 29, 11592, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 296, 32, -17, 34, 2, 23, 0, 51, 18, 296, 32, -17, 6, 31, 18, 296, 32, -17, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 18, 1596, 8, -2, 6, 29, 11766, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 1596, 8, -2, 34, 2, 23, 0, 51, 18, 1596, 8, -2, 6, 31, 18, 1596, 8, -2, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 3728, 8, 11, 34, 2, 23, 0, 51, 18, 1596, 8, -2, 6, 31, 18, 3728, 8, 11, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 2164, 16, 12, 34, 2, 23, 0, 51, 18, 1596, 8, -2, 6, 31, 18, 2164, 16, 12, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 3932, 28, 5, 6, 18, 2452, 28, -10, 34, 2, 23, 0, 51, 18, 1596, 8, -2, 6, 31, 18, 2452, 28, -10, 34, 3, 23, -1, 3, 18, 228, 36, 5, 6, 31, 22, 39, 1, 1, 18, 1172, 8, -1, 6, 18, 3960, 28, -12, 19, 22, 39, 1, 1, 18, 1172, 8, -1, 6, 18, 532, 20, 6, 19, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 11803, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 944, 12, 17, 19, 22, 44, 11825, 10, 39, 0, 29, 11882, 34, 0, 40, 78, 51, -1, 0, 0, 0, 1, 1, 18, 400, 20, 5, 6, 29, 11858, 34, 0, 1, 18, 400, 20, 5, 6, 18, 3876, 16, 13, 6, 31, 22, 39, 0, 1, 18, 1172, 8, -1, 6, 18, 532, 20, 6, 19, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 11881, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 2728, 24, -14, 19, 22, 44, 11903, 10, 39, 0, 29, 12059, 34, 0, 40, 79, 51, -1, 0, 0, 0, 1, 9, 0, 51, -1, 2, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 6, 34, 1, 18, 3212, 16, -16, 33, 18, 56, 16, -10, 6, 31, 51, -1, 3, 23, -1, 3, 18, 4232, 8, -1, 6, 51, -1, 4, 44, 0, 51, -1, 5, 23, -1, 5, 23, -1, 4, 2, 29, 12020, 23, -1, 3, 23, -1, 5, 6, 51, -1, 6, 34, 0, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 6, 23, -1, 6, 6, 18, 3704, 12, -5, 6, 31, 23, -1, 2, 23, -1, 6, 19, 22, 7, -1, 5, 0, 22, 39, 0, 29, 11961, 1, 18, 1172, 8, -1, 6, 18, 3284, 16, 1, 6, 34, 0, 1, 18, 4424, 36, 18, 6, 31, 23, -1, 2, 34, 0, 1, 18, 760, 40, 16, 6, 31, 34, 4, 39, 0, 29, 12058, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 3704, 12, -5, 19, 22, 44, 12080, 10, 39, 0, 29, 12116, 34, 0, 40, 80, 51, -1, 0, 0, 2, 1, 2, 3, 23, -1, 3, 1, 18, 1724, 20, 4, 6, 23, -1, 2, 19, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 12115, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 552, 32, -15, 19, 22, 44, 12137, 10, 39, 0, 29, 12180, 34, 0, 40, 81, 51, -1, 0, 0, 0, 1, 9, 0, 1, 18, 1724, 20, 4, 19, 22, 9, 0, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 19, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 12179, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 264, 20, 21, 19, 22, 44, 12201, 10, 39, 0, 29, 12650, 34, 0, 40, 82, 51, -1, 0, 0, 2, 1, 2, 3, 1, 18, 1172, 8, -1, 6, 18, 532, 20, 6, 6, 39, 0, 14, 29, 12234, 15, 39, 0, 29, 12649, 43, 12620, 44, 10, 23, -1, 2, 34, 2, 18, 1744, 20, 18, 33, 31, 27, -1, 2, 22, 23, -1, 3, 18, 4232, 8, -1, 6, 44, 1, 30, 51, -1, 4, 23, -1, 3, 23, -1, 4, 6, 51, -1, 5, 23, -1, 3, 23, -1, 3, 18, 4232, 8, -1, 6, 44, 2, 30, 6, 51, -1, 6, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 6, 23, -1, 2, 6, 48, 29, 12344, 23, 0, 55, 23, 0, 54, 34, 2, 24, 18, 2116, 32, -18, 6, 28, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 6, 23, -1, 2, 19, 22, 23, -1, 2, 23, 0, 43, 18, 3684, 8, 6, 6, 18, 4172, 12, 3, 6, 41, 46, 29, 12382, 22, 23, -1, 2, 23, 0, 43, 18, 1808, 24, 19, 6, 18, 2652, 12, 18, 6, 2, 29, 12442, 23, -1, 3, 44, 2, 6, 51, -1, 7, 23, -1, 7, 1, 18, 1172, 8, -1, 6, 18, 716, 4, -12, 6, 23, -1, 6, 19, 22, 23, -1, 3, 44, 4, 6, 23, -1, 3, 44, 3, 6, 23, -1, 3, 44, 1, 6, 23, -1, 3, 44, 0, 6, 34, 4, 27, -1, 3, 22, 23, -1, 3, 18, 4232, 8, -1, 6, 44, 1, 30, 27, -1, 4, 22, 23, -1, 3, 23, -1, 4, 6, 1, 18, 1172, 8, -1, 6, 18, 3284, 16, 1, 6, 30, 23, -1, 3, 23, -1, 4, 19, 22, 23, -1, 3, 18, 4232, 8, -1, 6, 44, 2, 30, 51, -1, 8, 1, 18, 1172, 8, -1, 6, 18, 2484, 16, -6, 6, 23, -1, 6, 6, 51, -1, 9, 23, -1, 9, 23, -1, 3, 23, -1, 8, 19, 22, 1, 18, 1172, 8, -1, 6, 18, 716, 4, -12, 6, 23, -1, 6, 6, 51, -1, 10, 23, -1, 10, 48, 29, 12556, 15, 39, 0, 29, 12649, 23, -1, 10, 44, 0, 6, 51, -1, 11, 23, -1, 11, 23, 0, 41, 18, 2056, 12, 17, 6, 14, 29, 12584, 15, 39, 0, 29, 12649, 23, -1, 3, 23, -1, 5, 34, 2, 1, 18, 1172, 8, -1, 6, 18, 1616, 20, 4, 6, 23, -1, 2, 6, 18, 3616, 12, 19, 6, 31, 22, 35, 12616, 39, 0, 29, 12640, 51, -1, 12, 23, -1, 12, 18, 2664, 28, -16, 34, 2, 24, 18, 2516, 16, 12, 6, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 12649, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 3932, 28, 5, 19, 22, 44, 12671, 10, 39, 0, 29, 12709, 34, 0, 40, 83, 51, -1, 0, 0, 2, 1, 2, 3, 23, -1, 3, 23, -1, 2, 34, 2, 1, 18, 3932, 28, 5, 6, 31, 22, 18, 3340, 20, 10, 33, 39, 0, 29, 12708, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 3848, 12, -4, 19, 22, 44, 12730, 10, 39, 0, 29, 12899, 34, 0, 40, 84, 51, -1, 0, 0, 0, 1, 44, 0, 51, -1, 2, 1, 18, 1172, 8, -1, 6, 18, 944, 12, 17, 6, 51, -1, 3, 23, -1, 3, 18, 4052, 12, 0, 6, 29, 12781, 23, 0, 56, 18, 2148, 16, 14, 6, 32, -1, 2, 22, 23, -1, 3, 18, 56, 16, -10, 6, 29, 12803, 23, 0, 56, 18, 3916, 8, -9, 6, 32, -1, 2, 22, 23, -1, 3, 18, 3260, 8, 9, 6, 29, 12825, 23, 0, 56, 18, 4184, 12, 12, 6, 32, -1, 2, 22, 23, -1, 3, 18, 1596, 8, -2, 6, 29, 12847, 23, 0, 56, 18, 1300, 8, -19, 6, 32, -1, 2, 22, 23, -1, 3, 18, 296, 32, -17, 6, 29, 12869, 23, 0, 56, 18, 3684, 8, 6, 6, 32, -1, 2, 22, 23, -1, 3, 18, 3828, 20, 3, 6, 29, 12891, 23, 0, 56, 18, 1808, 24, 19, 6, 32, -1, 2, 22, 23, -1, 2, 39, 0, 29, 12898, 26, 23, -1, 19, 18, 148, 60, -16, 6, 18, 760, 40, 16, 19, 22, 34, 0, 23, -1, 19, 28, 51, -1, 57, 18, 1336, 236, -9, 44, 1, 5, 34, 0, 23, -1, 23, 31, 44, 1, 5, 34, 0, 23, -1, 21, 31, 34, 0, 23, -1, 20, 31, 34, 6, 51, -1, 58, 44, 12962, 10, 39, 0, 29, 12977, 34, 0, 40, 85, 22, 0, 0, 0, 34, 0, 23, 0, 24, 31, 26, 50, 44, 12985, 10, 39, 0, 29, 13000, 34, 0, 40, 86, 22, 0, 0, 0, 34, 0, 23, 0, 22, 31, 26, 50, 50, 34, 5, 51, -1, 59, 34, 0, 44, 0, 12, 34, 0, 34, 3, 51, -1, 60, 23, -1, 57, 18, 1644, 4, 2, 3, 23, -1, 40, 18, 1136, 4, -11, 3, 23, -1, 29, 18, 2324, 4, 5, 3, 23, -1, 30, 18, 656, 16, -11, 3, 23, -1, 29, 18, 4, 20, -2, 3],
        _UY0ymJce: "ag==dXdkb2t2VnFLcHVyZ212ayU1RVolNURIZ2VyVyU1Q2ZUVV9YVw==dW8lQzIlODMlN0Q=Y1RnYw==TE1UTSU1Q01nU01hTFdfNlBkZnAlNDBsa3Fia3FCYWZxJTVFX2liZ1pmaiU1RWdaWQ==JUMyJTgwJUMyJTgyJTdGJUMyJTg0JTdGJUMyJTg0JUMyJTg5JUMyJTgwdQ==cGtxX2Rhbw==YmRqaFo=JTVDX18lNDBxJTYwaW9HZG5vJTYwaSU2MG0=JTVEUCU1RVBfJTJGTF9MRkhOTCUzRQ==eiU3RiVDMiU4MSVDMiU4NiVDMiU4NQ==YmN0Z2FjX2hlYWpwVQ==QmppVmklNUVkY0RXaFpna1pnTlFRMyU1Q19aMllSWlIlNUJhbm0=WmolNURuJTYwbXElNjBtX2clNUJjZg==JTYwX1klNUVkVWJUX2clNUU=b2pHanIlNjBtJTNFJTVDbiU2MA==eSU3Q3Nxc3g=Zmx1ZkV4aWlTeHZrYmElNUIlNjBmV2RnYg==bF8lNURpbCU1RWNoYQ==JUMyJTgydCVDMiU4M1NwJUMyJTgzcA==JUMyJTgycw==JTdCJUMyJTg1Y2hoX2xOX3JuTDFfUiU1RVYuJTEzRURGTlZTREZIYk5IJTVDfiU3RmwlN0QlN0Y=NjUlM0UlM0I1JTNEVyU2MFVnZ0JVYVk=JTNDJTNFRTQ=cnk=bl9xcXVtcGI=UlklNUVUSkhVSkxTb3F3dWdmcXlwT1UlNUVTX1RVM18lNUVWWVdEXzJZZFYlNUNRV2M=b2pwJTVFYyU2MGlfYlRZT1piQw==JTdCbA==Wk0lNUVQJTVEYVA=VWJXbA==ZWZkJTVCJTYwWSU1QlhrdiVDMiU4MSVDMiU4NSU3RHY=eXA=YiU1RGNRVlFPJTVDUVNaa2w=QjNFRUlBRDY=YVRSJTVFYVM=d3glQzIlODklN0N2eCVDMiU4MCVDMiU4MiVDMiU4NyU3QyVDMiU4MiVDMiU4MQ==ZVZoaVo=b2RxZW5xbCU2MG1iZA==ZlNZJTQwU19XJUMyJTgyJUMyJTg0JUMyJThBJUMyJTg4eiVDMiU4QSVDMiU4NQ==ZWIlNUM=eA==bHFnaCU3QlJpeA==JTdEeHYlQzIlODUlQzIlODl4JTdEdg==dHVidWY=aWtrbXRtemklN0Nxd3Y=bQ==Uk0=ZFVmZ1lCWWslM0FjZmE5JTYwWWFZYmhnbmglN0N4cw==JUMyJThCJTdEJUMyJTgyeCVDMiU4MyVDMiU4Qg==JTdCcg==WWJWaGY=JTNGJTVFJTYwaHBtJTVFJTYwYg==cVhQWG8lQzIlODMlN0ZVTSU1RSUzRCU1QyVDMiU4MXZ4S1clM0FzJUMyJTgzdHFzUzRSV2FtWVh5NFlCJTdDJUMyJTgzYU5XOFFVJTVDOCU3Q2wlNUU0WHl0bFpidXAlQzIlODN5bXglM0IlM0RjdXB1YyVDMiU4MnpKVFI5WDRZQSU1Q1VweSVDMiU4M29ZSk9sJTVCelYlNUNaQmxXbnMlNDBKOXY5UlYlM0JiRg==YWZfbGVjYlJtc2FmY3E=eg==aHFld3U=JTYwUk5fUFU=cGVpYSUzRXFiYmFubw==JTBDRw==JTYweXolQzIlODI=JTVCU2FhT1VTWg==dW4=JTdEJTdGJUMyJTg1JUMyJTgzdSU3RCU3RiVDMiU4NnU=JTVCaSU1RGplYmFvcA==JTVFTyU2MGFTNyU1Q2I=ZmVfZGolNUJoJTNGWg==SlZPTktwcnd2R25nb2dwdg==MDk2JTNEJTJGJTNDLiUzRjE=JTVCWWg5YmhmJTVEWWc2bUhtZFk=Tlc=JTdGJTdGeGp5WW5yanR6eQ==VV9SUw==JUMyJTgwcyU3Rnc=amd6Z3lreg==UFVWWVE5ViU2MGE=JTQwJTVFbXBJbCU2MGg=Zg==JTNFbmtzb2FuJUMyJTg2JTdCJTdGdw==WVNnJTNDYyU1Qg==dA==Z1hpJTVDZWtFZiU1QiU1Qw==bm1nbHJjcGttdGM=JTNFQzc0QQ==USU1RFZVJTVEbiVDMiU4MSU3REolN0Juak51bnZudyU3RA==ZiU3QiU3RndUJUMyJTg3eHh3JUMyJTg0QkElM0IlNDBGN0Q=YWNpZ1lZYmhZZg==JTNGNDUyJTQwSzcxRQ==X1llZVk=JTdCJTdEcCVDMiU4MXh6JTdGdHp5dA==Y1hZVmQlM0JVaQ==JTdCcyVDMiU4Mm9ZcyVDMiU4Nw==JUMyJTgyJTdCeHJ0WGFXcmRpX2pyVA==Z1RlWlhnbg==ciU3QnglN0ZxfnAlQzIlODFzU3AlQzIlODNwWFJmJTVEX1IlNjAlNjA=JTVEJTdGJTdDenYlQzIlODByJUMyJTg5JUMyJThFJUMyJTg1eg==Zm4=JTdEeA==WQ==d3klN0YlN0Rvdm9rJUMyJTgwbw==JTJDbHNlbmd5bmVzZ3Y=UlBfMGFQWV8uWk9QZ1liaGZtOWZmY2Y=QyUzRFE=JUMyJTg3JUMyJTg0JUMyJTg5diVDMiU4OX4lQzIlODQlQzIlODNndiVDMiU4OXo=JTdCJTdDcXJhJUMyJTg2JTdEcg==OVpPUA==aGpXaWdaWg==MSUzRCUzRUc=UlklNUQlN0YlQzIlODR5JTdGfg==cXR0dXQlNUUlN0Z0dSVDMiU4Mw==d2t6YWJzJUMyJTgxJUMyJTgyJTdEfg==JTVEbGVaayU2MGZlTFdfalZQZA==Z1hmZw==ZyU2MHIlNDBzc3FoYXRzZA==dSVDMiU4NiVDMiU4NH4lNUR3JUMyJThCJTVDVmpVJTYwaF8=cyU1RWlyYg==aiU1Q2MlNUNaayU2MGZlSmtYaWs=JTVFZ2QlNjBpb1M=eGc=cXdsJTdGd292dWw=Z3Bld3c=MlNaU2JTJTVCWWg3Y1UlNjBZZ1dZWDlqWWJoZw==aQ==dCU3RnMlQzIlODUlN0R1fiVDMiU4NA==aHF0R2Nlag==JTdDdiVDMiU4QQ==Z3h1ZHdscnE=UFdQWFBZX2pZWk9QeHRpa21wd3RsbXo=JTIwJTIwJTFCTDFaVS4lMTM=JTYwY3JfbX5tdiU3Q0t3d3psJTdCJTVCJTVEUCU1RSU1RSU2MCU1RFA=d3UlQzIlODQlNUR1cX4lNjB1JUMyJTgyeSU3RnQ=X3J6dXMlQzIlODQ=aw==UCU1QmFOWFFPWFVPVw==b2txbl9ha2ZsWl8=R0VUV2NPSSU1RA==cWRibnFjU2hsZA==JTJCa24=JTFENkIlM0IlM0EzWlMlNUJTJTVDYg==a2RaJTVCJTVDX2QlNUJaeCU3RCU3RiVDMiU4NCVDMiU4MyUzQiUyRiVDMiU4MnQlN0J0ciVDMiU4MyUzQiUyRiVDMiU4M3QlQzIlODclQzIlODNwJUMyJTgxdHA=TSUzRVBRQg==JUMyJTg3eCVDMiU4QiVDMiU4N3QlQzIlODV4dA==JTVCYlpPUl8=dml+cW9pJTdDcXd2dnglN0RyeHc=JTVCZCU2MF8=X1AlNUVfWl9aZSUzRWZlUmVaJTYwXyU0MFNkVmNnVmM=cGk=JTVEYiU2MFU=JTQwUU9JJTVDSEJWeXYlN0N1aw==ZWNtZG1qZGw=VllLTiUzRVNXTw==Q0hKT04=cm8lQzIlODJvbGp5SWZ5Zg==MSUzQ0QlM0I=V2FqZw==UiU1RV9oQk9QJTdCbHM=JTdCJTdGbyU3QyVDMiU4MyU1RG92b21+eSU3Q0t2dg==JUMyJTg1diVDMiU4OSVDMiU4NQ==JTYwaWZtX2wlNUVvYQ==dHl3bEl6aXJ4dWduZ2V2a3FwR3BmVyU1Q2ZWYmFhWFZnZmtsb2dRcmdodg==JTdGJTdDVE5iJTVDZGVSY2U=Wm0lNjAlNUVqbV8lNDBxJTYwaW8=dXp1JUMyJTgwJTVFcW8lN0J+cA==bGljJTVFJTVDazhra2klNjBZbGslNUM=TU9VU0VFTlRFUg==c250YmdycyU2MHFzcG9pbnRlcg==JTVDTSU1RVFaJTYwX2ZYYVpsYVhiZyU1RCU1RXE=JTNEWm0lNUU=JTNFUmVZZWYlNUIlNUNFWGQlNUM=ZVJTcCU1Q1ZqJTVFUEwlNUROUw==JTNFTU1JVg==SENJNyUzQw==YyU1Q24lNDBxJTYwaW8=bmlqc3lua25qdw==bWZvaHVpJTdDJTdGc3ElQzIlODR5JTdGfg==OXJ+d3Y5bHluJUMyJTgzR0lPTSUzRkYlM0YlM0JQJTNGYSU2MFpfZVZjRWphVg==c3J2d1BodnZkamg=JTdCJUMyJTgyem9yJTdGJTNER1BNWFBfTGpWUGQ=bGdtJTVCJTYwZWduJTVEUyU1Qk9XWg==WUpRVVNiNCU1QkFiT2JTRVdiVjclNUNSV1FTYQ=="
      };
      function t(e) {
        while (e._qUMQMdncNb !== e._pdV5wCgD) {
          var t = e._nn3VZl[e._qUMQMdncNb++];
          e._9uLtHD6Qf[t](e);
        }
      }
      e._pdV5wCgD = e._nn3VZl.length;
      t(e);
      return e._wY4otiT;
    }();
    Xt = qt.s;
    Yt = qt.m;
    qt.b;
    en = qt.start;
  } catch (Ln) {
    Me("ob-error", "error", "api", {
      message: Ln.message
    });
    function nn() {}
    Xt = function () {
      return Promise.resolve();
    };
    Yt = {
      record: nn,
      resetData: nn,
      setData: nn,
      stop: nn,
      circBuffPush: nn
    };
    ({
      record: nn,
      stop: nn
    });
    en = nn;
  }
  function rn(e, t) {
    this.cause = e;
    this.message = t;
  }
  function on(e) {
    rn.call(this, pe, "Invalid hCaptcha id: " + e);
  }
  function an() {
    rn.call(this, he, "No hCaptcha exists.");
  }
  function sn() {
    rn.call(this, de, "Missing sitekey - https://docs.hcaptcha.com/configuration#javascript-api");
  }
  rn.prototype = Error.prototype;
  var cn = [];
  var ln = [];
  var un = {
    add: function (e) {
      cn.push(e);
    },
    remove: function (e) {
      for (var t = false, n = cn.length; --n > -1 && t === false;) {
        if (cn[n].id === e.id) {
          t = cn[n];
          cn.splice(n, 1);
        }
      }
      return t;
    },
    each: function (e) {
      for (var t = -1; ++t < cn.length;) {
        e(cn[t]);
      }
    },
    isValidId: function (e) {
      for (var t = false, n = -1; ++n < cn.length && t === false;) {
        if (cn[n].id === e) {
          t = true;
        }
      }
      return t;
    },
    getByIndex: function (e) {
      for (var t = false, n = -1; ++n < cn.length && t === false;) {
        if (n === e) {
          t = cn[n];
        }
      }
      return t;
    },
    getById: function (e) {
      for (var t = false, n = -1; ++n < cn.length && t === false;) {
        if (cn[n].id === e) {
          t = cn[n];
        }
      }
      return t;
    },
    getCaptchaIdList: function () {
      var e = [];
      un.each(function (t) {
        e.push(t.id);
      });
      return e;
    },
    pushSession: function (e, t) {
      ln.push([e, t]);
      if (ln.length > 10) {
        ln.splice(0, ln.length - 10);
      }
    },
    getSession: function () {
      return ln;
    }
  };
  function hn(e, t) {
    if (typeof e == "object" && !t) {
      t = e;
      e = null;
    }
    var n;
    var r;
    var i;
    var o = (t = t || {}).async === true;
    var a = new Promise(function (e, t) {
      r = e;
      i = t;
    });
    a.resolve = r;
    a.reject = i;
    if (n = e ? un.getById(e) : un.getByIndex(0)) {
      Pe("Execute called", "hCaptcha", "info");
      tn.setData("exec", "api");
      Yt.setData("exec", "api");
      if (o) {
        n.setPromise(a);
      }
      n.onReady(n.initChallenge, t);
    } else if (e) {
      if (!o) {
        throw new on(e);
      }
      a.reject(pe);
    } else {
      if (!o) {
        throw new an();
      }
      a.reject(he);
    }
    if (o) {
      return a;
    }
  }
  function dn(e) {
    var t = "";
    var n = null;
    n = e ? un.getById(e) : un.getByIndex(0);
    try {
      var r = un.getSession();
      for (var i = r.length, o = false; --i > -1 && !o;) {
        if (o = r[i][1] === n.id) {
          t = r[i][0];
        }
      }
    } catch (Ln) {
      t = "";
    }
    return t;
  }
  function pn(e, t, n) {
    this.target = e;
    this.setTargetOrigin(n);
    this.id = t;
    this.messages = [];
    this.incoming = [];
    this.waiting = [];
    this.isReady = true;
    this.queue = [];
  }
  pn.prototype._sendMessage = function (e, t) {
    var n = e instanceof HTMLIFrameElement;
    try {
      if (n) {
        e.contentWindow.postMessage(JSON.stringify(t), this.targetOrigin);
      } else {
        e.postMessage(JSON.stringify(t), this.targetOrigin);
      }
    } catch (zn) {
      Oe("messaging", zn);
      if (this.targetOrigin !== "*") {
        this.setTargetOrigin("*");
        this._sendMessage(e, t);
      }
    }
  };
  pn.prototype.setReady = function (e) {
    var t = this;
    t.isReady = e;
    if (t.isReady && t.queue.length) {
      t.queue.forEach(function (e) {
        t._sendMessage.apply(t, e);
      });
      t.clearQueue();
    }
  };
  pn.prototype.clearQueue = function () {
    this.queue = [];
  };
  pn.prototype.setID = function (e) {
    this.id = e;
  };
  pn.prototype.setTargetOrigin = function (e) {
    this.targetOrigin = "*";
  };
  pn.prototype.contact = function (e, t) {
    if (!this.id) {
      throw new Error("Chat requires unique id to communicate between windows");
    }
    var n = this;
    var r = Math.random().toString(36).substr(2);
    var i = {
      source: "hcaptcha",
      label: e,
      id: this.id,
      promise: "create",
      lookup: r
    };
    if (t) {
      if (typeof t != "object") {
        throw new Error("Message must be an object.");
      }
      i.contents = t;
    }
    return new Promise(function (t, o) {
      n.waiting.push({
        label: e,
        reject: o,
        resolve: t,
        lookup: r
      });
      n._addToQueue(n.target, i);
    });
  };
  pn.prototype.listen = function (e, t) {
    if (!this.id) {
      throw new Error("Chat requires unique id to communicate between windows");
    }
    for (var n = this.messages.length, r = false; --n > -1 && r === false;) {
      if (this.messages[n].label === e) {
        r = this.messages[n];
      }
    }
    if (r === false) {
      r = {
        label: e,
        listeners: []
      };
      this.messages.push(r);
    }
    r.listeners.push(t);
  };
  pn.prototype.answer = function (e, t) {
    if (!this.id) {
      throw new Error("Chat requires unique id to communicate between windows");
    }
    for (var n = this.incoming.length, r = false; --n > -1 && r === false;) {
      if (this.incoming[n].label === e) {
        r = this.incoming[n];
      }
    }
    if (r === false) {
      r = {
        label: e,
        listeners: []
      };
      this.incoming.push(r);
    }
    r.listeners.push(t);
  };
  pn.prototype.send = function (e, t) {
    var n = this;
    if (!n.id) {
      throw new Error("Chat requires unique id to communicate between windows");
    }
    var r = {
      source: "hcaptcha",
      label: e,
      id: n.id
    };
    if (t) {
      if (typeof t != "object") {
        throw new Error("Message must be an object.");
      }
      r.contents = t;
    }
    n._addToQueue(n.target, r);
  };
  pn.prototype.check = function (e, t) {
    for (var n = [].concat.apply([], [this.messages, this.incoming, this.waiting]), r = [], i = -1; ++i < n.length;) {
      if (n[i].label === e) {
        if (t && n[i].lookup && t !== n[i].lookup) {
          continue;
        }
        r.push(n[i]);
      }
    }
    return r;
  };
  pn.prototype.respond = function (e) {
    var t;
    var n;
    for (var r = -1, i = 0, o = [].concat.apply([], [this.messages, this.incoming, this.waiting]); ++r < o.length;) {
      if (o[r].label === e.label) {
        if (e.lookup && o[r].lookup && e.lookup !== o[r].lookup) {
          continue;
        }
        var a = [];
        t = o[r];
        if (e.error) {
          a.push(e.error);
        }
        if (e.contents) {
          a.push(e.contents);
        }
        if (e.promise && e.promise !== "create") {
          t[e.promise].apply(t[e.promise], a);
          for (var s = this.waiting.length, c = false; --s > -1 && c === false;) {
            if (this.waiting[s].label === t.label && this.waiting[s].lookup === t.lookup) {
              c = true;
              this.waiting.splice(s, 1);
            }
          }
          continue;
        }
        for (i = 0; i < t.listeners.length; i++) {
          n = t.listeners[i];
          if (e.promise === "create") {
            var l = this._contactPromise(t.label, e.lookup);
            a.push(l);
          }
          n.apply(n, a);
        }
      }
    }
    o = null;
  };
  pn.prototype.destroy = function () {
    this.clearQueue();
    this.messages = null;
    this.incoming = null;
    this.waiting = null;
    this.isReady = false;
    return null;
  };
  pn.prototype._contactPromise = function (e, t) {
    var n = this;
    var r = {};
    var i = new Promise(function (e, t) {
      r.resolve = e;
      r.reject = t;
    });
    var o = {
      source: "hcaptcha",
      label: e,
      id: n.id,
      promise: null,
      lookup: t
    };
    i.then(function (e) {
      o.promise = "resolve";
      if (e !== null) {
        o.contents = e;
      }
      n._addToQueue(n.target, o);
    }).catch(function (e) {
      o.promise = "reject";
      if (e !== null) {
        o.error = e;
      }
      n._addToQueue(n.target, o);
    });
    return r;
  };
  pn.prototype._addToQueue = function (e, t) {
    if (this.isReady) {
      this._sendMessage(e, t);
    } else {
      this.queue.push([e, t]);
    }
  };
  var fn = {
    chats: [],
    messages: [],
    globalEnabled: false,
    isSupported: function () {
      return !!window.postMessage;
    },
    createChat: function (e, t, n) {
      var r = new pn(e, t, n);
      fn.chats.push(r);
      return r;
    },
    addChat: function (e) {
      fn.chats.push(e);
    },
    removeChat: function (e) {
      for (var t = false, n = fn.chats.length; --n > -1 && t === false;) {
        if (e.id === fn.chats[n].id && e.target === fn.chats[n].target) {
          t = fn.chats[n];
          fn.chats.splice(n, 1);
        }
      }
      return t;
    },
    consumeMessages: function () {
      var e = fn.messages;
      fn.messages = [];
      return e;
    },
    handleGlobal: function (e) {
      if (fn.globalEnabled) {
        var t = fn.messages;
        if (t.length >= 10) {
          fn.globalEnabled = false;
        } else {
          var n = t.some(function (t) {
            return JSON.stringify(t.data) === JSON.stringify(e.data);
          });
          if (!n) {
            t.push(e);
          }
        }
      }
    },
    handle: function (e) {
      var t = e.data;
      var n = typeof t == "string" && t.indexOf("hcaptcha") >= 0 || typeof t == "object" && JSON.stringify(t).indexOf("hcaptcha") >= 0;
      try {
        if (!n) {
          fn.handleGlobal(e);
          return;
        }
        if (typeof t == "string") {
          t = JSON.parse(t);
        }
        if (t.t === "d") {
          fn.messages.push(e);
        }
        var r;
        for (var i = fn.chats, o = -1; ++o < i.length;) {
          var a = (r = i[o]).targetOrigin === "*" || e.origin === r.targetOrigin;
          if (r.id === t.id && a) {
            r.respond(t);
          }
        }
      } catch (zn) {
        Pe("postMessage handler error", "postMessage", "debug", {
          event: e,
          error: zn
        });
      }
    }
  };
  function mn(e) {
    var t = e ? un.getById(e) : un.getByIndex(0);
    if (!t) {
      throw e ? new on(e) : new an();
    }
    un.remove(t);
    t.destroy();
    t = null;
  }
  function gn() {
    try {
      return Object.keys(window).sort().join(",");
    } catch (Kn) {
      return null;
    }
  }
  if (window.addEventListener) {
    window.addEventListener("message", fn.handle);
  } else {
    window.attachEvent("onmessage", fn.handle);
  }
  var yn = We();
  function vn(e, t) {
    for (var n in t) {
      var r = t[n];
      switch (typeof r) {
        case "string":
          e[n] = r;
          break;
        case "object":
          e[n] = e[n] || {};
          vn(e[n], r);
          break;
        default:
          throw new Error("Source theme contains invalid data types. Only string and object types are supported.");
      }
    }
  }
  function wn(e, t) {
    try {
      return e in t;
    } catch (n) {
      return false;
    }
  }
  function bn(e) {
    return !!e && typeof e == "object";
  }
  function _n(e) {
    if (bn(e)) {
      return Cn({}, e);
    } else {
      return e;
    }
  }
  function Cn(e, t) {
    var n;
    var r = {};
    var i = Object.keys(e);
    for (n = 0; n < i.length; n++) {
      r[i[n]] = _n(e[i[n]]);
    }
    var o;
    var a;
    var s = Object.keys(t);
    for (n = 0; n < s.length; n++) {
      var c = s[n];
      if (!!wn(o = c, a = e) && (!Object.hasOwnProperty.call(a, o) || !Object.propertyIsEnumerable.call(a, o))) {
        return;
      }
      if (wn(c, e) && bn(e[c])) {
        r[c] = Cn(e[c], t[c]);
      } else {
        r[c] = _n(t[c]);
      }
    }
    return r;
  }
  var kn = {
    transparent: "transparent",
    white: "#ffffff",
    black: "#000000"
  };
  var En = {
    100: "#fafafa",
    200: "#f5f5f5",
    300: "#E0E0E0",
    400: "#D7D7D7",
    500: "#BFBFBF",
    600: "#919191",
    700: "#555555",
    800: "#333333",
    900: "#222222",
    1000: "#14191F"
  };
  var xn = "#4DE1D2";
  var Vn = "#00838F";
  var Sn = {
    mode: "light",
    grey: En,
    primary: {
      main: Vn
    },
    secondary: {
      main: xn
    },
    warn: {
      light: "#BF1722",
      main: "#BF1722",
      dark: "#9D1B1B"
    },
    text: {
      heading: En[700],
      body: En[700]
    }
  };
  var Tn = {
    mode: "dark",
    grey: En,
    primary: {
      main: Vn
    },
    secondary: {
      main: xn
    },
    text: {
      heading: En[200],
      body: En[200]
    }
  };
  function Rn(e, t) {
    if (t === "dark" && e in Tn) {
      return Tn[e];
    } else {
      return Sn[e];
    }
  }
  function Un() {
    this._themes = Object.create(null);
    this._active = "light";
    this.add("light", {});
    this.add("dark", {
      palette: {
        mode: "dark"
      }
    });
  }
  Un.prototype.get = function (e) {
    if (!e) {
      return this._themes[this._active];
    }
    var t = this._themes[e];
    if (!t) {
      throw new Error("Cannot find theme with name: " + e);
    }
    return t;
  };
  Un.prototype.use = function (e) {
    if (this._themes[e]) {
      this._active = e;
    } else {
      console.error("Cannot find theme with name: " + e);
    }
  };
  Un.prototype.active = function () {
    return this._active;
  };
  Un.prototype.add = function (e, t) {
    t ||= {};
    t.palette = function (e) {
      e ||= {};
      var t = e.mode || "light";
      var n = e.primary || Rn("primary", t);
      var r = e.secondary || Rn("secondary", t);
      var i = e.warn || Rn("warn", t);
      var o = e.grey || Rn("grey", t);
      var a = e.text || Rn("text", t);
      return Cn({
        common: kn,
        mode: t,
        primary: n,
        secondary: r,
        grey: o,
        warn: i,
        text: a
      }, e);
    }(t.palette);
    t.component = t.component || Object.create(null);
    this._themes[e] = t;
  };
  Un.prototype.extend = function (e, t) {
    if (typeof t == "string") {
      t = JSON.parse(t);
    }
    var n = JSON.parse(JSON.stringify(this.get(e)));
    vn(n, t);
    return n;
  };
  Un.merge = function (e, t) {
    return Cn(e, t || {});
  };
  var Mn = ["light", "dark", "contrast", "grey-red"];
  var On = new Un();
  On.add("contrast", {});
  On.add("grey-red", {
    component: {
      challenge: {
        main: {
          border: "#6a6a6a"
        }
      }
    }
  });
  function Pn(e, t) {
    var n = this;
    this.id = e;
    this.width = null;
    this.height = null;
    this.mobile = false;
    this.ready = false;
    this.listeners = [];
    this.config = t;
    this._visible = false;
    this._selected = false;
    this.$iframe = new st("iframe");
    this._host = ye.host || window.location.hostname;
    var r = ye.assetUrl;
    if (ve.assethost) {
      r = ve.assethost + ye.assetUrl.replace(ye.assetDomain, "");
    }
    var i = r.match(/^.+\:\/\/[^\/]+/);
    var o = i ? i[0] : null;
    var a = r + "/hcaptcha.html#frame=challenge&id=" + this.id + "&host=" + this._host + (t ? "&" + De(this.config) : "");
    var s = ee.Browser.supportsPST();
    this.setupParentContainer(t);
    this.chat = fn.createChat(this.$iframe.dom, e, o);
    this.chat.setReady(false);
    this._timeoutFailedToInitialize = setTimeout(function () {
      if (n.$iframe && n.$iframe.isConnected()) {
        Me("Failed to initialize. Iframe attached", "error", "frame:challenge", {
          contentWindow: !!n.$iframe.dom.contentWindow,
          iframeSrc: a,
          supportsPST: s,
          customContainer: n._hasCustomContainer
        });
      } else {
        Me("Failed to initialize. Iframe detached", "error", "frame:challenge");
      }
    }, 60000);
    this.$iframe.dom.src = a;
    this.$iframe.dom.frameBorder = 0;
    this.$iframe.dom.scrolling = "no";
    if (ee.Browser.supportsPST()) {
      this.$iframe.dom.allow = "private-state-token-issuance 'src'; private-state-token-redemption 'src'";
    }
    this.translate();
    if (this._hasCustomContainer) {
      this._hideIframe();
      this._parent.appendChild(this.$iframe.dom);
    } else {
      this.$container = new st("div");
      this.$wrapper = this.$container.createElement("div");
      this.$overlay = this.$container.createElement("div");
      this.$arrow = this.$container.createElement("div");
      this.$arrow.fg = this.$arrow.createElement("div");
      this.$arrow.bg = this.$arrow.createElement("div");
      this.style.call(this);
      this.$wrapper.appendElement(this.$iframe);
      this._parent.appendChild(this.$container.dom);
      this.$container.setAttribute("aria-hidden", true);
    }
    this.style();
  }
  Pn.prototype.setupParentContainer = function (e) {
    var t;
    var n = e["challenge-container"];
    if (n) {
      t = typeof n == "string" ? document.getElementById(n) : n;
    }
    if (t) {
      this._hasCustomContainer = true;
      this._parent = t;
    } else {
      this._hasCustomContainer = false;
      this._parent = document.body;
    }
  };
  Pn.prototype._hideIframe = function () {
    var e = {};
    if (ee.Browser.type !== "ie" || ee.Browser.type === "ie" && ee.Browser.version !== 8) {
      e.opacity = 0;
      e.visibility = "hidden";
    } else {
      e.display = "none";
    }
    this.$iframe.setAttribute("aria-hidden", true);
    this.$iframe.css(e);
  };
  Pn.prototype._showIframe = function () {
    var e = {};
    if (ee.Browser.type !== "ie" || ee.Browser.type === "ie" && ee.Browser.version !== 8) {
      e.opacity = 1;
      e.visibility = "visible";
    } else {
      e.display = "block";
    }
    this.$iframe.removeAttribute("aria-hidden");
    this.$iframe.css(e);
  };
  Pn.prototype.style = function () {
    var e = function (e) {
      var t = e.palette;
      var n = e.component;
      return Un.merge({
        main: {
          fill: t.common.white,
          border: t.grey[400]
        }
      }, n.challenge);
    }(On.get());
    if (this._hasCustomContainer) {
      this.$iframe.css({
        border: 0,
        position: "relative",
        backgroundColor: e.main.fill
      });
    } else {
      var t = {
        backgroundColor: e.main.fill,
        border: "1px solid " + e.main.border,
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 4px",
        borderRadius: 4,
        left: "auto",
        top: -10000,
        zIndex: -9999999999999,
        position: "absolute",
        pointerEvents: "auto"
      };
      if (ee.Browser.type !== "ie" || ee.Browser.type === "ie" && ee.Browser.version !== 8) {
        t.transition = "opacity 0.15s ease-out";
        t.opacity = 0;
        t.visibility = "hidden";
      } else {
        t.display = "none";
      }
      this.$container.css(t);
      this.$wrapper.css({
        position: "relative",
        zIndex: 1
      });
      this.$overlay.css({
        width: "100%",
        height: "100%",
        position: "fixed",
        pointerEvents: "none",
        top: 0,
        left: 0,
        zIndex: 0,
        backgroundColor: e.main.fill,
        opacity: 0.05
      });
      this.$arrow.css({
        borderWidth: 11,
        position: "absolute",
        pointerEvents: "none",
        marginTop: -11,
        zIndex: 1,
        right: "100%"
      });
      this.$arrow.fg.css({
        borderWidth: 10,
        borderStyle: "solid",
        borderColor: "transparent rgb(255, 255, 255) transparent transparent",
        position: "relative",
        top: 10,
        zIndex: 1
      });
      this.$arrow.bg.css({
        borderWidth: 11,
        borderStyle: "solid",
        borderColor: "transparent " + e.main.border + " transparent transparent",
        position: "relative",
        top: -11,
        zIndex: 0
      });
      this.$iframe.css({
        border: 0,
        zIndex: 2000000000,
        position: "relative"
      });
    }
  };
  Pn.prototype.setup = function (e) {
    return this.chat.send("create-challenge", e);
  };
  Pn.prototype.sendTranslation = function (e) {
    var t = {
      locale: e,
      table: mt.getTable(e) || {}
    };
    if (this.chat) {
      this.chat.send("challenge-translate", t);
    }
    this.translate();
  };
  Pn.prototype.translate = function () {
    this.$iframe.dom.title = mt.translate("Main content of the hCaptcha challenge");
  };
  Pn.prototype.isVisible = function () {
    return this._visible;
  };
  Pn.prototype.getDimensions = function (e, t) {
    if (this._visible) {
      return this.chat.contact("resize-challenge", {
        width: e,
        height: t
      });
    } else {
      return Promise.resolve(null);
    }
  };
  Pn.prototype.show = function () {
    if (this._visible !== true) {
      this._visible = true;
      if (this._hasCustomContainer) {
        this._showIframe();
      } else {
        var e = {
          zIndex: 9999999999999,
          display: "block"
        };
        if (ee.Browser.type !== "ie" || ee.Browser.type === "ie" && ee.Browser.version !== 8) {
          e.opacity = 1;
          e.visibility = "visible";
        }
        this.$container.css(e);
        this.$container.removeAttribute("aria-hidden");
        this.$overlay.css({
          pointerEvents: "auto",
          cursor: "pointer"
        });
      }
    }
  };
  Pn.prototype.focus = function () {
    this.$iframe.dom.focus();
  };
  Pn.prototype.close = function (e) {
    if (this._visible !== false) {
      this._visible = false;
      if (this._hasCustomContainer) {
        this._hideIframe();
        this.chat.send("close-challenge", {
          event: e
        });
        return;
      }
      var t = {
        left: "auto",
        top: -10000,
        zIndex: -9999999999999
      };
      if (ee.Browser.type !== "ie" || ee.Browser.type === "ie" && ee.Browser.version !== 8) {
        t.opacity = 0;
        t.visibility = "hidden";
      } else {
        t.display = "none";
      }
      this.$container.css(t);
      if (!this._hasCustomContainer) {
        this.$overlay.css({
          pointerEvents: "none",
          cursor: "default"
        });
      }
      this.chat.send("close-challenge", {
        event: e
      });
      this.$container.setAttribute("aria-hidden", true);
    }
  };
  Pn.prototype.size = function (e, t, n) {
    this.width = e;
    this.height = t;
    this.mobile = n;
    this.$iframe.css({
      width: e,
      height: t
    });
    if (!this._hasCustomContainer) {
      this.$wrapper.css({
        width: e,
        height: t
      });
      if (n) {
        this.$overlay.css({
          opacity: 0.5
        });
      } else {
        this.$overlay.css({
          opacity: 0.05
        });
      }
    }
  };
  Pn.prototype.position = function (e) {
    if (!this._hasCustomContainer && e) {
      var t = 10;
      var n = window.document.documentElement;
      var r = ee.Browser.scrollY();
      var i = ee.Browser.width();
      var o = ee.Browser.height();
      var a = this.mobile || this.config.size === "invisible" || e.offset.left + e.tick.x <= e.tick.width / 2;
      var s = Math.round(e.bounding.top) + r !== e.offset.top;
      var c = a ? (i - this.width) / 2 : e.bounding.left + e.tick.right + 10;
      if (c + this.width + t > i || c < 0) {
        c = (i - this.width) / 2;
        a = true;
      }
      var l = (n.scrollHeight < n.clientHeight ? n.clientHeight : n.scrollHeight) - this.height - t;
      var u = a ? (o - this.height) / 2 + r : e.bounding.top + e.tick.y + r - this.height / 2;
      if (s && u < r) {
        u = r + t;
      }
      if (s && u + this.height >= r + o) {
        u = r + o - (this.height + t);
      }
      u = Math.max(Math.min(u, l), 10);
      var h = e.bounding.top + e.tick.y + r - u - 10;
      var d = this.height - 10 - 30;
      h = Math.max(Math.min(h, d), t);
      this.$container.css({
        left: c,
        top: u
      });
      this.$arrow.fg.css({
        display: a ? "none" : "block"
      });
      this.$arrow.bg.css({
        display: a ? "none" : "block"
      });
      this.$arrow.css({
        top: h
      });
      this.top = u;
      this.$container.dom.getBoundingClientRect();
    }
  };
  Pn.prototype.destroy = function () {
    if (this._timeoutFailedToInitialize) {
      clearTimeout(this._timeoutFailedToInitialize);
      this._timeoutFailedToInitialize = null;
    }
    if (this._visible) {
      this.close.call(this);
    }
    fn.removeChat(this.chat);
    this.chat = this.chat.destroy();
    if (this._hasCustomContainer) {
      this._parent.removeChild(this.$iframe.dom);
    } else {
      this._parent.removeChild(this.$container.dom);
      this.$container = this.$container.__destroy();
    }
    this.$iframe = this.$iframe.__destroy();
  };
  Pn.prototype.setReady = function () {
    var e;
    if (this._timeoutFailedToInitialize) {
      clearTimeout(this._timeoutFailedToInitialize);
      this._timeoutFailedToInitialize = null;
    }
    if (this.chat) {
      this.chat.setReady(true);
    }
    this.ready = true;
    for (var t = this.listeners.length; --t > -1;) {
      e = this.listeners[t];
      this.listeners.splice(t, 1);
      e();
    }
  };
  Pn.prototype.onReady = function (e) {
    var t = Array.prototype.slice.call(arguments, 1);
    function n() {
      e.apply(null, t);
    }
    if (this.ready) {
      n();
    } else {
      this.listeners.push(n);
    }
  };
  Pn.prototype.onOverlayClick = function (e) {
    if (!this._hasCustomContainer) {
      this.$overlay.addEventListener("click", e);
    }
  };
  Pn.prototype.setData = function (e) {
    if (this.chat) {
      this.chat.send("challenge-data", e);
    }
  };
  function Wn(e, t, n) {
    var r = this;
    this.id = t;
    this.response = null;
    this.location = {
      tick: null,
      offset: null,
      bounding: null
    };
    this.config = n;
    this._ticked = true;
    this.$container = e instanceof st ? e : new st(e);
    this._host = ye.host || window.location.hostname;
    this.$iframe = new st("iframe");
    var i = ye.assetUrl;
    if (ve.assethost) {
      i = ve.assethost + ye.assetUrl.replace(ye.assetDomain, "");
    }
    var o = i.match(/^.+\:\/\/[^\/]+/);
    var a = o ? o[0] : null;
    var s = i + "/hcaptcha.html#frame=checkbox&id=" + this.id + "&host=" + this._host + (n ? "&" + De(this.config) : "");
    this.chat = fn.createChat(this.$iframe.dom, t, a);
    this.chat.setReady(false);
    this._timeoutFailedToInitialize = setTimeout(function () {
      if (r.$iframe && r.$iframe.isConnected()) {
        Me("Failed to initialize. Iframe attached", "error", "frame:checkbox", {
          contentWindow: !!r.$iframe.dom.contentWindow,
          iframeSrc: s
        });
      } else {
        Me("Failed to initialize. Iframe detached", "error", "frame:checkbox");
      }
    }, 60000);
    this.$iframe.dom.src = s;
    this.$iframe.dom.tabIndex = this.config.tabindex || 0;
    this.$iframe.dom.frameBorder = "0";
    this.$iframe.dom.scrolling = "no";
    if (ee.Browser.supportsPST()) {
      this.$iframe.dom.allow = "private-state-token-issuance 'src'; private-state-token-redemption 'src'";
    }
    this.translate();
    if (this.config.size && this.config.size === "invisible") {
      this.$iframe.setAttribute("aria-hidden", "true");
    }
    this.$iframe.setAttribute("data-hcaptcha-widget-id", t);
    this.$iframe.setAttribute("data-hcaptcha-response", "");
    this.$container.appendElement(this.$iframe);
    if (ve.recaptchacompat !== "off") {
      this.$textArea0 = this.$container.createElement("textarea", "#g-recaptcha-response-" + t);
      this.$textArea0.dom.name = "g-recaptcha-response";
      this.$textArea0.css({
        display: "none"
      });
    }
    this.$textArea1 = this.$container.createElement("textarea", "#h-captcha-response-" + t);
    this.$textArea1.dom.name = "h-captcha-response";
    this.$textArea1.css({
      display: "none"
    });
    this.ready = new Promise(function (e) {
      r.chat.listen("checkbox-ready", e);
    }).then(function () {
      if (r._timeoutFailedToInitialize) {
        clearTimeout(r._timeoutFailedToInitialize);
        r._timeoutFailedToInitialize = null;
      }
      if (r.chat) {
        r.chat.setReady(true);
      }
    });
    this.clearLoading = this.clearLoading.bind(this);
    this.style();
  }
  function Nn(e, t, n) {
    this.id = t;
    this.response = null;
    this.location = {
      tick: null,
      offset: null,
      bounding: null
    };
    this.config = n;
    this.$container = e instanceof st ? e : new st(e);
    this.$iframe = new st("iframe");
    this.$iframe.setAttribute("aria-hidden", "true");
    this.$iframe.css({
      display: "none"
    });
    this.$iframe.setAttribute("data-hcaptcha-widget-id", t);
    this.$iframe.setAttribute("data-hcaptcha-response", "");
    var r = ye.assetUrl;
    if (ve.assethost) {
      r = ve.assethost + ye.assetUrl.replace(ye.assetDomain, "");
    }
    this.$iframe.dom.src = r + "/hcaptcha.html#frame=checkbox-invisible";
    this.$container.appendElement(this.$iframe);
    if (ve.recaptchacompat !== "off") {
      this.$textArea0 = this.$container.createElement("textarea", "#g-recaptcha-response-" + t);
      this.$textArea0.dom.name = "g-recaptcha-response";
      this.$textArea0.css({
        display: "none"
      });
    }
    this.$textArea1 = this.$container.createElement("textarea", "#h-captcha-response-" + t);
    this.$textArea1.dom.name = "h-captcha-response";
    this.$textArea1.css({
      display: "none"
    });
  }
  function An(e, t, n) {
    if (!n.sitekey) {
      throw new sn();
    }
    this.id = t;
    this.visible = false;
    this.overflow = {
      override: false,
      cssUsed: true,
      value: null,
      scroll: 0
    };
    this.onError = null;
    this.onPass = null;
    this.onExpire = null;
    this.onChalExpire = null;
    this.onOpen = null;
    this.onClose = null;
    this._ready = false;
    this._active = false;
    this._listeners = [];
    this.config = n;
    if (Mn.indexOf(n.theme) >= 0) {
      On.use(n.theme);
    }
    this._state = {
      escaped: false,
      passed: false,
      expiredChallenge: false,
      expiredResponse: false
    };
    this._origData = null;
    this._langSet = false;
    this._promise = null;
    this._responseTimer = null;
    this.initChallenge = this.initChallenge.bind(this);
    this.closeChallenge = this.closeChallenge.bind(this);
    this.displayChallenge = this.displayChallenge.bind(this);
    this.getGetCaptchaManifest = this.getGetCaptchaManifest.bind(this);
    this.challenge = new Pn(t, n);
    if (this.config.size === "invisible") {
      Pe("Invisible mode is set", "hCaptcha", "info");
      this.checkbox = new Nn(e, t, n);
    } else {
      this.checkbox = new Wn(e, t, n);
    }
  }
  function jn(e) {
    if (e === "en") {
      return Promise.resolve();
    }
    var t = e + ".json";
    return new Promise(function (n, r) {
      Ot(t).then(function (n) {
        return n || Mt(t, {
          prefix: "https://newassets.hcaptcha.com/captcha/v1/14dbe0f1619b8014e2630bcdde727e7785a80dee/static/i18n"
        }).then(function (t) {
          mt.addTable(e, t.data);
          return t;
        });
      }).then(function (e) {
        n(e.data);
      }).catch(function (e) {
        r(e);
      });
    });
  }
  Wn.prototype.setResponse = function (e) {
    this.response = e;
    this.$iframe.dom.setAttribute("data-hcaptcha-response", e);
    if (ve.recaptchacompat !== "off") {
      this.$textArea0.dom.value = e;
    }
    this.$textArea1.dom.value = e;
  };
  Wn.prototype.style = function () {
    var e = this.config.size;
    this.$iframe.css({
      pointerEvents: "auto",
      backgroundColor: "rgba(255,255,255,0)"
    });
    switch (e) {
      case "compact":
        this.$iframe.css({
          width: 164,
          height: 144
        });
        break;
      case "invisible":
        this.$iframe.css({
          display: "none"
        });
        break;
      default:
        this.$iframe.css({
          width: 303,
          height: 78,
          overflow: "hidden"
        });
    }
  };
  Wn.prototype.reset = function () {
    this._ticked = false;
    if (this.$iframe && this.$iframe.dom.contentWindow && this.chat) {
      this.chat.send("checkbox-reset");
    }
  };
  Wn.prototype.clearLoading = function () {
    if (this.chat) {
      this.chat.send("checkbox-clear");
    }
  };
  Wn.prototype.sendTranslation = function (e) {
    var t = {
      locale: e,
      table: mt.getTable(e) || {}
    };
    if (this.chat) {
      this.chat.send("checkbox-translate", t);
    }
    this.translate();
  };
  Wn.prototype.translate = function () {
    this.$iframe.dom.title = mt.translate("Widget containing checkbox for hCaptcha security challenge");
  };
  Wn.prototype.status = function (e, t) {
    if (this.$iframe && this.$iframe.dom.contentWindow && this.chat) {
      this.chat.send("checkbox-status", {
        text: e || null,
        a11yOnly: t || false
      });
    }
  };
  Wn.prototype.tick = function () {
    this._ticked = true;
    if (this.chat) {
      this.chat.send("checkbox-tick");
    }
  };
  Wn.prototype.getTickLocation = function () {
    return this.chat.contact("checkbox-location");
  };
  Wn.prototype.getOffset = function () {
    var e = this.$iframe.dom;
    if (!e.offsetParent) {
      e = e.parentElement;
    }
    var t = 0;
    var n = 0;
    while (e) {
      t += e.offsetLeft;
      n += e.offsetTop;
      e = e.offsetParent;
    }
    return {
      top: n,
      left: t
    };
  };
  Wn.prototype.getBounding = function () {
    return this.$iframe.dom.getBoundingClientRect();
  };
  Wn.prototype.destroy = function () {
    if (this._timeoutFailedToInitialize) {
      clearTimeout(this._timeoutFailedToInitialize);
      this._timeoutFailedToInitialize = null;
    }
    if (this._ticked) {
      this.reset();
    }
    fn.removeChat(this.chat);
    this.chat = this.chat.destroy();
    this.$container.removeElement(this.$iframe);
    this.$container.removeElement(this.$textArea1);
    if (ve.recaptchacompat !== "off") {
      this.$container.removeElement(this.$textArea0);
      this.$textArea0 = this.$textArea0.__destroy();
    }
    this.$textArea1 = this.$textArea1.__destroy();
    this.$container = this.$container.__destroy();
    this.$iframe = this.$iframe.__destroy();
  };
  Nn.prototype.setResponse = function (e) {
    this.response = e;
    this.$iframe.dom.setAttribute("data-hcaptcha-response", e);
    if (ve.recaptchacompat !== "off") {
      this.$textArea0.dom.value = e;
    }
    this.$textArea1.dom.value = e;
  };
  Nn.prototype.reset = function () {};
  Nn.prototype.clearLoading = function () {};
  Nn.prototype.sendTranslation = function (e) {};
  Nn.prototype.status = function (e, t) {};
  Nn.prototype.tick = function () {};
  Nn.prototype.getTickLocation = function () {
    return Promise.resolve({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0
    });
  };
  Nn.prototype.getOffset = function () {
    var e = this.$iframe.dom;
    if (!e.offsetParent) {
      e = e.parentElement;
    }
    var t = 0;
    var n = 0;
    while (e) {
      t += e.offsetLeft;
      n += e.offsetTop;
      e = e.offsetParent;
    }
    return {
      top: n,
      left: t
    };
  };
  Nn.prototype.getBounding = function () {
    return this.$iframe.dom.getBoundingClientRect();
  };
  Nn.prototype.destroy = function () {
    if (this._ticked) {
      this.reset();
    }
    this.$container.removeElement(this.$iframe);
    this.$container.removeElement(this.$textArea1);
    if (ve.recaptchacompat !== "off") {
      this.$container.removeElement(this.$textArea0);
      this.$textArea0 = this.$textArea0.__destroy();
    }
    this.$textArea1 = this.$textArea1.__destroy();
    this.$container = this.$container.__destroy();
    this.$iframe = this.$iframe.__destroy();
  };
  An.prototype._resetTimer = function () {
    if (this._responseTimer !== null) {
      clearTimeout(this._responseTimer);
      this._responseTimer = null;
    }
  };
  An.prototype.initChallenge = function (e) {
    e ||= {};
    Pe("Initiate challenge", "hCaptcha", "info");
    this._origData = e;
    var t = this.getGetCaptchaManifest();
    var n = e.charity || null;
    var r = e.a11yChallenge || false;
    var i = e.link || null;
    var o = e.action || "";
    var a = e.rqdata || null;
    var s = e.errors || [];
    var c = ee.Browser.width();
    var l = ee.Browser.height();
    this._active = true;
    this._resetTimer();
    this._resetState();
    this.checkbox.setResponse("");
    this.challenge.setup({
      a11yChallenge: r,
      manifest: t,
      width: c,
      height: l,
      charity: n,
      link: i,
      action: o,
      rqdata: a,
      wdata: gn(),
      errors: s.concat(yn.collect())
    });
  };
  An.prototype.getGetCaptchaManifest = function () {
    var e = (this._origData || {}).manifest || null;
    if (!e) {
      (e = Object.create(null)).st = Date.now();
    }
    e.v = 1;
    e.topLevel = tn.getData();
    e.session = un.getSession();
    e.widgetList = un.getCaptchaIdList();
    e.widgetId = this.id;
    e.href = window.location.href;
    e.prev = JSON.parse(JSON.stringify(this._state));
    return e;
  };
  An.prototype.displayChallenge = function (e) {
    if (this._active) {
      var t = this;
      this.visible = true;
      var n = this.checkbox;
      var r = this.challenge;
      var i = ee.Browser.height();
      if (ee.Browser.type !== "ie" || ee.Browser.version !== 8) {
        var o = window.getComputedStyle(document.body).getPropertyValue("overflow-y");
        this.overflow.override = o === "hidden";
        if (this.overflow.override) {
          this.overflow.cssUsed = document.body.style.overflow === "" && document.body.style.overflowY === "";
          if (!this.overflow.cssUsed) {
            this.overflow.value = o === "" ? "auto" : o;
          }
          this.overflow.scroll = ee.Browser.scrollY();
          document.body.style.overflowY = "auto";
        }
      }
      return new Promise(function (o) {
        n.status();
        n.getTickLocation().then(function (a) {
          if (t._active) {
            r.size(e.width, e.height, e.mobile);
            r.show();
            n.clearLoading();
            n.location.bounding = n.getBounding();
            n.location.tick = a;
            n.location.offset = n.getOffset();
            r.position(n.location);
            r.focus();
            if (r.height > window.document.documentElement.clientHeight) {
              (window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = Math.abs(r.height - i) + r.top;
            }
            o();
          }
        });
      }).then(function () {
        Pe("Challenge is displayed", "hCaptcha", "info");
        if (t.onOpen) {
          Je(t.onOpen);
        }
      });
    }
  };
  An.prototype.resize = function (e, t, n) {
    var r = this;
    var i = this.checkbox;
    var o = this.challenge;
    o.getDimensions(e, t).then(function (e) {
      if (e) {
        o.size(e.width, e.height, e.mobile);
      }
      i.location.bounding = i.getBounding();
      i.location.offset = i.getOffset();
      if (!ee.System.mobile || !!n) {
        o.position(i.location);
      }
    }).catch(function (e) {
      r.closeChallenge.call(r, {
        event: le,
        message: "Captcha resize caused error.",
        error: e
      });
    });
  };
  An.prototype.position = function () {
    var e = this.checkbox;
    var t = this.challenge;
    if (!ee.System.mobile) {
      e.location.bounding = e.getBounding();
      t.position(e.location);
    }
  };
  An.prototype.reset = function () {
    Pe("Captcha Reset", "hCaptcha", "info");
    try {
      this.checkbox.reset();
      this.checkbox.setResponse("");
      this._resetTimer();
      this._resetState();
    } catch (Ln) {
      Oe("hCaptcha", Ln);
    }
  };
  An.prototype._resetState = function () {
    for (var e in this._state) {
      this._state[e] = false;
    }
  };
  An.prototype.closeChallenge = function (e) {
    this.visible = false;
    this._active = false;
    var t = this;
    var n = this.checkbox;
    var r = this.challenge;
    if (this.overflow.override) {
      (window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll;
      this.overflow.override = false;
      this.overflow.scroll = 0;
      document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value;
    }
    var i = e.response || "";
    n.setResponse(i);
    r.close(e.event);
    n.$iframe.dom.focus();
    Pe("Challenge has closed", "hCaptcha", "info", {
      event: e.event,
      response: e.response,
      message: e.message
    });
    switch (e.event) {
      case ne:
        this._state.escaped = true;
        n.reset();
        if (t.onClose) {
          Je(t.onClose);
        }
        if (t._promise) {
          t._promise.reject(re);
        }
        break;
      case ie:
        this._state.expiredChallenge = true;
        n.reset();
        n.status("hCaptcha window closed due to timeout.", true);
        if (t.onChalExpire) {
          Je(t.onChalExpire);
        }
        if (t._promise) {
          t._promise.reject(ie);
        }
        break;
      case le:
      case ae:
      case ce:
        var o = e.event;
        n.reset();
        if (e.event === ce) {
          n.status(e.message);
          if (e.status === 429) {
            o = se;
          } else if (e.message === "invalid-data") {
            o = oe;
          } else if (e.message === "client-fail") {
            o = le;
          }
        } else if (e.event === ae) {
          o = le;
        } else if (e.event === le && e.message === "Answers are incomplete") {
          o = ue;
        }
        Me("Failed to execute", "error", "hCaptcha", {
          error: o,
          event: e.event,
          message: e.message
        });
        if (this.onError) {
          Je(this.onError, o);
        }
        if (t._promise) {
          t._promise.reject(o);
        }
        break;
      case te:
        this._state.passed = true;
        n.tick();
        if (this.onPass) {
          Je(this.onPass, i);
        }
        if (t._promise) {
          t._promise.resolve({
            response: i,
            key: dn(this.id)
          });
        }
        if (typeof e.expiration == "number") {
          t._resetTimer();
          t._responseTimer = setTimeout(function () {
            try {
              if (n.$iframe) {
                if (n.$iframe.dom.contentWindow) {
                  n.reset();
                  n.setResponse("");
                  n.status("hCaptcha security token has expired. Please complete the challenge again.", true);
                } else {
                  mn(t.id);
                }
              }
            } catch (zn) {
              Oe("global", zn);
            }
            if (t.onExpire) {
              Je(t.onExpire);
            }
            t._responseTimer = null;
            t._state.expiredResponse = true;
          }, e.expiration * 1000);
        }
    }
    t._promise = null;
  };
  An.prototype.updateTranslation = function (e) {
    this.config.hl = e;
    this._langSet = true;
    if (this.checkbox) {
      this.checkbox.sendTranslation(e);
    }
    if (this.challenge) {
      this.challenge.sendTranslation(e);
    }
  };
  An.prototype.isLangSet = function () {
    return this._langSet;
  };
  An.prototype.isReady = function () {
    return this._ready;
  };
  An.prototype.setReady = function (e) {
    this._ready = e;
    if (this._ready) {
      var t;
      Pe("Instance is ready", "hCaptcha", "info");
      for (var n = this._listeners.length; --n > -1;) {
        t = this._listeners[n];
        this._listeners.splice(n, 1);
        t();
      }
    }
  };
  An.prototype.setPromise = function (e) {
    this._promise = e;
  };
  An.prototype.onReady = function (e) {
    var t = Array.prototype.slice.call(arguments, 1);
    function n() {
      e.apply(null, t);
    }
    if (this._ready) {
      n();
    } else {
      this._listeners.push(n);
    }
  };
  An.prototype.destroy = function () {
    Pe("Captcha Destroy", "hCaptcha", "info");
    this._resetTimer();
    if (this.overflow.override) {
      (window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll;
      this.overflow.override = false;
      this.overflow.scroll = 0;
      document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value;
    }
    this.challenge.destroy();
    this.checkbox.destroy();
    this.challenge = null;
    this.checkbox = null;
  };
  An.prototype.setSiteConfig = function (e) {
    var t = this;
    if ("ok" in e) {
      var n = e.ok.features || {};
      if (this.config.themeConfig && n.custom_theme) {
        var r = "custom-" + this.id;
        On.add(r, On.extend(On.active(), this.config.themeConfig));
        On.use(r);
        this.challenge.style();
      }
    }
    if (this.config.size === "invisible") {
      if ("err" in e) {
        console.error("[hCaptcha] " + e.err.message);
      }
      return Promise.resolve();
    } else {
      return this.checkbox.ready.then(function () {
        t.checkbox.chat.send("site-setup", e);
        return new Promise(function (e) {
          t.checkbox.chat.listen("checkbox-loaded", function () {
            e();
          });
        });
      });
    }
  };
  var Fn = 0;
  var Bn = ["hl", "custom", "tplinks", "sitekey", "theme", "size", "tabindex", "challenge-container", "confirm-nav", "orientation", "mode"];
  function In(e, t) {
    if (e) {
      try {
        e.updateTranslation(t);
      } catch (zn) {
        Oe("translation", zn);
      }
    }
  }
  function Zn(e, t) {
    return new Promise(function (n, r) {
      var i = setTimeout(function () {
        r(new Error("timeout"));
      }, t);
      e.then(function (e) {
        clearTimeout(i);
        n(e);
      }).catch(function (e) {
        clearTimeout(i);
        r(e);
      });
    });
  }
  var Dn = {
    render: function (e, t) {
      if (typeof e == "string") {
        e = document.getElementById(e);
      }
      if (e && e.nodeType === 1) {
        if (function (e) {
          if (!e || !("challenge-container" in e)) {
            return true;
          }
          var t = e["challenge-container"];
          if (typeof t == "string") {
            t = document.getElementById(t);
          }
          return !!t && t.nodeType === 1;
        }(t)) {
          if (fn.isSupported() !== false) {
            for (var n, r, i = e.getElementsByTagName("iframe"), o = -1; ++o < i.length && !n;) {
              if (r = i[o].getAttribute("data-hcaptcha-widget-id")) {
                n = true;
              }
            }
            if (n) {
              console.error("Only one captcha is permitted per parent container.");
              return r;
            }
            Pe("Render instance", "hCaptcha", "info");
            var a = Ge(e, t);
            var s = Fn++ + Math.random().toString(36).substr(2);
            var c = Object.create(null);
            c.sentry = ve.sentry;
            c.reportapi = ve.reportapi;
            c.recaptchacompat = ve.recaptchacompat;
            c.custom = ve.custom;
            if (ve.language !== null) {
              c.hl = mt.getLocale();
            }
            if (ve.assethost) {
              c.assethost = ve.assethost;
            }
            if (ve.imghost) {
              c.imghost = ve.imghost;
            }
            if (ve.tplinks) {
              c.tplinks = ve.tplinks;
            }
            if (ve.se) {
              c.se = ve.se;
            }
            if (ve.pat === "off") {
              c.pat = ve.pat;
            }
            c.pstissuer = ve.pstIssuer;
            if (ve.orientation === "landscape") {
              c.orientation = ve.orientation;
            }
            for (var l = 0; l < Bn.length; l++) {
              var u = Bn[l];
              if (u in a) {
                c[u] = a[u];
              }
            }
            var h = ve.endpoint;
            var d = c.sitekey;
            if (d === "78c843a4-f80d-4a14-b3e5-74b492762487") {
              h = me;
            }
            if (h === fe && ["pt-BR", "es-BR"].indexOf(navigator.language) === -1 && Math.random() < 0.001 && d && d.indexOf("-0000-0000-0000-") === -1) {
              h = me;
            }
            if (h !== fe) {
              c.endpoint = h;
            }
            c.theme = ve.theme;
            var p = window.location;
            var f = p.origin || p.protocol + "//" + p.hostname + (p.port ? ":" + p.port : "");
            if (f !== "null") {
              c.origin = f;
            }
            if (a.theme) {
              try {
                var m = a.theme;
                if (typeof m == "string") {
                  m = JSON.parse(m);
                }
                c.themeConfig = m;
                c.custom = true;
              } catch (Kn) {
                c.theme = m;
              }
            }
            if (e instanceof HTMLButtonElement || e instanceof HTMLInputElement) {
              var g = new st("div", ".h-captcha");
              g.css({
                display: "none"
              });
              var y = null;
              for (var v = 0; v < e.attributes.length; v++) {
                if ((y = e.attributes[v]).name.startsWith("data-")) {
                  g.setAttribute(y.name, y.value);
                }
              }
              var w = e.tagName.toLowerCase() + "[data-hcaptcha-widget-id='" + s + "']";
              e.setAttribute("data-hcaptcha-widget-id", s);
              g.setAttribute("data-hcaptcha-source-id", w);
              e.parentNode.insertBefore(g.dom, e);
              e.onclick = function (e) {
                e.preventDefault();
                Pe("User initiated", "hCaptcha", "info");
                return hn(s);
              };
              e = g;
              c.size = "invisible";
            }
            if (c.mode === ge && c.size === "invisible") {
              console.warn("[hCaptcha] mode='auto' cannot be used in combination with size='invisible'.");
              delete c.mode;
            }
            try {
              var b = new An(e, s, c);
            } catch (zn) {
              var _ = "Your browser plugins or privacy policies are blocking the hCaptcha service. Please disable them for hCaptcha.com";
              if (zn instanceof sn) {
                _ = "hCaptcha has failed to initialize. Please see the developer tools console for more information.";
                console.error(zn.message);
              }
              Ce(e, _);
              Oe("api", zn);
              return;
            }
            if (a.callback) {
              b.onPass = a.callback;
            }
            if (a["expired-callback"]) {
              b.onExpire = a["expired-callback"];
            }
            if (a["chalexpired-callback"]) {
              b.onChalExpire = a["chalexpired-callback"];
            }
            if (a["open-callback"]) {
              b.onOpen = a["open-callback"];
            }
            if (a["close-callback"]) {
              b.onClose = a["close-callback"];
            }
            if (a["error-callback"]) {
              b.onError = a["error-callback"];
            }
            try {
              tn.setData("inv", c.size === "invisible");
              tn.setData("size", c.size);
              tn.setData("theme", et(c.themeConfig || c.theme));
              tn.setData("pel", (e.outerHTML || "").replace(e.innerHTML, ""));
              Yt.setData("inv", c.size === "invisible");
              Yt.setData("size", c.size);
              Yt.setData("theme", et(c.themeConfig || c.theme));
              Yt.setData("pel", (e.outerHTML || "").replace(e.innerHTML, ""));
            } catch (Ln) {
              Oe("api", Ln);
            }
            (function (e, t) {
              if (t.size === "invisible") {
                return;
              }
              e.checkbox.chat.listen("checkbox-selected", function (t) {
                Pe("User initiated", "hCaptcha", "info");
                Zn(Xt(), 100).finally(function () {
                  var n = t.action === "enter" ? "kb" : "m";
                  tn.setData("exec", n);
                  Yt.setData("exec", n);
                  e.onReady(e.initChallenge, t);
                }).catch(function (e) {
                  Oe("submitvm", e);
                });
              });
              e.checkbox.chat.listen("checkbox-loaded", function (n) {
                Pe("Loaded", "frame:checkbox", "info");
                e.checkbox.location.bounding = e.checkbox.getBounding();
                e.checkbox.location.tick = n;
                e.checkbox.location.offset = e.checkbox.getOffset();
                e.checkbox.sendTranslation(t.hl);
              });
              if (t.mode === ge) {
                e.onReady(function () {
                  hn(e.id);
                }, t);
              }
            })(b, c);
            (function (e, t) {
              function n(t, n) {
                if (t.locale) {
                  var r = mt.resolveLocale(t.locale);
                  jn(r).then(function () {
                    if (n) {
                      In(e, r);
                    } else {
                      mt.setLocale(r);
                      un.each(function (e) {
                        In(e, r);
                      });
                    }
                  }).catch(function (e) {
                    Oe("api", e, {
                      locale: r
                    });
                  });
                }
              }
              e.challenge.chat.listen("site-setup", function (t) {
                var n = e.setSiteConfig(t);
                e.challenge.onReady(function () {
                  n.then(function () {
                    e.setReady(true);
                  });
                });
              });
              e.challenge.chat.listen("challenge-loaded", function () {
                Pe("Loaded", "frame:challenge", "info");
                e.challenge.setReady();
                e.challenge.sendTranslation(t.hl);
              });
              e.challenge.chat.answer("challenge-ready", function (t, n) {
                e.displayChallenge(t).then(n.resolve);
              });
              e.challenge.chat.listen("challenge-resize", function () {
                var t = ee.Browser.width();
                var n = ee.Browser.height();
                e.resize(t, n);
              });
              e.challenge.chat.listen(re, function (t) {
                tn.setData("lpt", Date.now());
                Yt.setData("lpt", Date.now());
                e.closeChallenge(t);
              });
              e.challenge.chat.answer("get-url", function (e) {
                e.resolve(window.location.href);
              });
              e.challenge.chat.answer("getcaptcha-manifest", function (t) {
                t.resolve(e.getGetCaptchaManifest());
              });
              e.challenge.chat.answer("check-api", function (e) {
                Zn(Xt(), 100).finally(function () {
                  e.resolve(tn.getData());
                }).catch(function (e) {
                  Oe("submitvm", e);
                });
              });
              e.challenge.chat.listen("challenge-key", function (t) {
                un.pushSession(t.key, e.id);
              });
              e.challenge.onOverlayClick(function () {
                e.closeChallenge({
                  event: ne
                });
              });
              e.challenge.chat.listen("challenge-language", n);
              n({
                locale: t.hl
              }, true);
              e.challenge.chat.answer("get-ac", function (e) {
                e.resolve(Ne.hasCookie("hc_accessibility"));
              });
            })(b, c);
            un.add(b);
            return s;
          }
          Ce(e, "Your browser is missing or has disabled Cross-Window Messaging. Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> or enable it for hCaptcha.com");
        } else {
          console.log("[hCaptcha] render: invalid challenge container '" + t["challenge-container"] + "'.");
        }
      } else {
        console.log("[hCaptcha] render: invalid container '" + e + "'.");
      }
    },
    reset: function (e) {
      var t;
      if (e) {
        if (!(t = un.getById(e))) {
          throw new on(e);
        }
        t.reset();
      } else {
        if (!(t = un.getByIndex(0))) {
          throw new an();
        }
        t.reset();
      }
    },
    remove: mn,
    execute: hn,
    getResponse: function (e) {
      var t;
      var n;
      if (n = e ? un.getById(e) : un.getByIndex(0)) {
        t = n.checkbox.response || "";
      }
      if (t !== undefined) {
        return t;
      }
      throw e ? new on(e) : new an();
    },
    getRespKey: dn,
    close: function (e) {
      var t = false;
      if (!(t = e ? un.getById(e) : un.getByIndex(0))) {
        throw e ? new on(e) : new an();
      }
      t.closeChallenge({
        event: ne
      });
    },
    setData: function (e, t) {
      if (typeof e == "object" && !t) {
        t = e;
        e = null;
      }
      if (!t || typeof t != "object") {
        throw Error("[hCaptcha] invalid data supplied");
      }
      var n = false;
      if (!(n = e ? un.getById(e) : un.getByIndex(0))) {
        throw e ? new on(e) : new an();
      }
      Pe("Set data", "hCaptcha", "info");
      var r = n.challenge.setData.bind(n.challenge);
      n.onReady(r, t);
    },
    nodes: un
  };
  (function (e) {
    en(0);
    ye.file = "hcaptcha";
    var t = document.currentScript;
    var n = false;
    var r = false;
    var i = "on";
    var o = ee.Browser.width() / ee.Browser.height();
    var a = !!window.hcaptcha && !!window.hcaptcha.render;
    function s() {
      var e = ee.Browser.width();
      var t = ee.Browser.height();
      var n = ee.System.mobile && o !== e / t;
      o = e / t;
      u();
      Dn.nodes.each(function (r) {
        if (r.visible) {
          r.resize(e, t, n);
        }
      });
    }
    function c(e) {
      l();
      Dn.nodes.each(function (e) {
        if (e.visible) {
          e.position();
        }
      });
    }
    function l() {
      var e = [ee.Browser.scrollX(), ee.Browser.scrollY(), document.documentElement.clientWidth / ee.Browser.width(), Date.now()];
      tn.circBuffPush("xy", e);
      Yt.circBuffPush("xy", e);
    }
    function u() {
      var e = [ee.Browser.width(), ee.Browser.height(), ee.System.dpr(), Date.now()];
      tn.circBuffPush("wn", e);
    }
    window.hcaptcha = {
      render: function () {
        if (!a) {
          console.warn("[hCaptcha] should not render before js api is fully loaded. `render=explicit` should be used in combination with `onload`.");
        }
        return Dn.render.apply(this, arguments);
      },
      remove: Dn.remove,
      execute: Dn.execute,
      reset: Dn.reset,
      close: Dn.close,
      setData: Dn.setData,
      getResponse: Dn.getResponse,
      getRespKey: Dn.getRespKey
    };
    yn.run(3000);
    (function (e) {
      var t = Array.prototype.slice.call(arguments, 1);
      if (Nt !== true && document.readyState !== "interactive" && document.readyState !== "loaded" && document.readyState !== "complete") {
        Pt.push({
          fn: e,
          args: t
        });
        if (Wt === false) {
          At();
        }
      } else {
        setTimeout(function () {
          e(t);
        }, 1);
      }
    })(function () {
      (function () {
        var o;
        o = t ? [t] : document.getElementsByTagName("script");
        var a = -1;
        var s = false;
        var c = null;
        var l = null;
        while (++a < o.length && s === false) {
          if (o[a] && o[a].src) {
            l = (c = o[a].src.split("?"))[0];
            if (/\/(hcaptcha|1\/api)\.js$/.test(l)) {
              s = o[a];
              if (l && l.toLowerCase().indexOf("www.") !== -1) {
                console.warn("[hCaptcha] JS API is being loaded from www.hcaptcha.com. Please use https://js.hcaptcha.com/1/api.js");
              }
            }
          }
        }
        if (s === false) {
          return;
        }
        e = e || Ze(c[1]);
        n = e.onload || false;
        r = e.render || false;
        if (e.tplinks === "off") {
          i = "off";
        }
        ve.tplinks = i;
        ve.language = e.hl || null;
        if (e.endpoint) {
          ve.endpoint = e.endpoint;
        }
        ve.reportapi = e.reportapi || ve.reportapi;
        ve.imghost = e.imghost || null;
        ve.custom = e.custom || ve.custom;
        ve.se = e.se || null;
        ve.pat = e.pat || ve.pat;
        ve.pstIssuer = e.pstissuer || ve.pstIssuer;
        ve.orientation = e.orientation || null;
        if (e.assethost) {
          if (qe.URL(e.assethost)) {
            ve.assethost = e.assethost;
          } else {
            console.error("Invalid assethost uri.");
          }
        }
        ve.recaptchacompat = e.recaptchacompat || ve.recaptchacompat;
        ye.host = e.host || window.location.hostname;
        ve.sentry = e.sentry !== false;
        Ue(false);
        ve.language = ve.language || window.navigator.userLanguage || window.navigator.language;
        mt.setLocale(ve.language);
        if (ve.recaptchacompat === "off") {
          console.log("recaptchacompat disabled");
        } else {
          window.grecaptcha = window.hcaptcha;
        }
      })();
      if (n) {
        setTimeout(function () {
          Je(n);
        }, 1);
      }
      if (!a) {
        a = true;
        (function () {
          var e = mt.getLocale();
          if (e === "en") {
            return;
          }
          jn(e).then(function () {
            Dn.nodes.each(function (t) {
              if (t) {
                try {
                  if (!t.isLangSet()) {
                    t.updateTranslation(e);
                  }
                } catch (zn) {
                  Oe("translation", zn);
                }
              }
            });
          }).catch(function (t) {
            Oe("api", t, {
              locale: e
            });
          });
        })();
        if (r === false || r === "onload") {
          ke(Dn.render);
        } else if (r !== "explicit") {
          console.log("hcaptcha: invalid render parameter '" + r + "', using 'explicit' instead.");
        }
        (function () {
          try {
            tn.record();
            Yt.record();
            tn.setData("sc", ee.Browser.getScreenDimensions());
            tn.setData("or", ee.Browser.getOrientation());
            tn.setData("wi", ee.Browser.getWindowDimensions());
            tn.setData("nv", ee.Browser.interrogateNavigator());
            tn.setData("dr", document.referrer);
            Yt.setData("sc", ee.Browser.getScreenDimensions());
            Yt.setData("wi", ee.Browser.getWindowDimensions());
            Yt.setData("nv", ee.Browser.interrogateNavigator());
            Yt.setData("or", ee.Browser.getOrientation());
            Yt.setData("dr", document.referrer);
            u();
            l();
          } catch (zn) {
            Oe("motion", zn);
          }
        })();
        Bt.addEventListener("resize", s);
        Bt.addEventListener("scroll", c);
      }
    });
  })();
})();