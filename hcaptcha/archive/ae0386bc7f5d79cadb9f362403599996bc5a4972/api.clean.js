/* { "version": "1", "hash": "MEQCIA/WDv7RuAN4EVQ0ZX2KI4nm/kfxWe9KEMF7Mz6HmO8JAiAXjyPsQnTSHnEU3NlOtfJN8nm7bwBs9zxpVi7Y2Oh2Lg==" } */
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
    p(e, this);
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
          p((r = n, i = t, function () {
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
  function p(e, t) {
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
  var d = function () {
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
  if (typeof d.Promise != "function") {
    d.Promise = a;
  } else {
    d.Promise.prototype.finally ||= e;
    d.Promise.allSettled ||= t;
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
    if (Object.prototype.hasOwnProperty.call(V, e)) {
      return V[e];
    } else {
      return null;
    }
  }
  var V = {};
  [{
    encodings: [{
      labels: ["unicode-1-1-utf-8", "utf-8", "utf8"],
      name: "UTF-8"
    }],
    heading: "The Encoding"
  }].forEach(function (e) {
    e.encodings.forEach(function (e) {
      e.labels.forEach(function (t) {
        V[t] = e;
      });
    });
  });
  var x;
  var k = {
    "UTF-8": function (e) {
      return new U(e);
    }
  };
  var E = {
    "UTF-8": function (e) {
      return new N(e);
    }
  };
  var T = "utf-8";
  function S(e, t) {
    if (!(this instanceof S)) {
      throw TypeError("Called as a function. Did you forget 'new'?");
    }
    e = e !== undefined ? String(e) : T;
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
    if (!E[n.name]) {
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
  function R(e, t) {
    if (!(this instanceof R)) {
      throw TypeError("Called as a function. Did you forget 'new'?");
    }
    t = m(t);
    this._encoding = null;
    this._encoder = null;
    this._do_not_flush = false;
    this._fatal = t.fatal ? "fatal" : "replacement";
    var n = this;
    if (t.NONSTANDARD_allowLegacyEncoding) {
      var r = _(e = e !== undefined ? String(e) : T);
      if (r === null || r.name === "replacement") {
        throw RangeError("Unknown encoding: " + e);
      }
      if (!k[r.name]) {
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
  function N(e) {
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
      this._decoder = E[this._encoding.name]({
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
    Object.defineProperty(R.prototype, "encoding", {
      get: function () {
        return this._encoding.name.toLowerCase();
      }
    });
  }
  R.prototype.encode = function (e, t) {
    e = e === undefined ? "" : String(e);
    t = m(t);
    if (!this._do_not_flush) {
      this._encoder = k[this._encoding.name]({
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
  window.TextEncoder ||= R;
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
                    o.key_ops ||= o.kty !== "oct" ? "d" in o ? h.filter(E) : h.filter(k) : h.slice();
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
                  e[0].key_ops = h.filter(k);
                  e[1].key_ops = h.filter(E);
                  return Promise.all([n.importKey("jwk", e[0], l, true, e[0].key_ops), n.importKey("jwk", e[1], l, u, e[1].key_ops)]);
                }).then(function (e) {
                  return {
                    publicKey: e[0],
                    privateKey: e[1]
                  };
                });
              }
              if ((s || a && (l.hash || {}).name === "SHA-1") && e === "importKey" && i === "jwk" && l.name === "HMAC" && o.kty === "oct") {
                return n.importKey("raw", d(p(o.k)), c, b[3], b[4]);
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
                  publicKey: new x(e.publicKey, l, u, h.filter(k)),
                  privateKey: new x(e.privateKey, l, u, h.filter(E))
                } : new x(e, l, u, h);
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
                    e = d(unescape(encodeURIComponent(JSON.stringify(y(e)))));
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
                    e.key_ops ||= i.type === "public" ? i.usages.filter(k) : i.type === "private" ? i.usages.filter(E) : i.usages.slice();
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
              } catch (p) {
                return Promise.reject(p);
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
            e.CryptoKey = x;
          }
          if (s) {
            t.subtle = n;
            e.Crypto = r;
            e.SubtleCrypto = i;
            e.CryptoKey = x;
          }
        }
      }
    }
    function h(e) {
      return btoa(e).replace(/\=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function p(e) {
      e = (e += "===").slice(0, -e.length % 4);
      return atob(e.replace(/-/g, "+").replace(/_/g, "/"));
    }
    function d(e) {
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
      return d(unescape(encodeURIComponent(JSON.stringify(t)))).buffer;
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
        var s = o[a] = d(p(e[i[a]]));
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
      n.push(new Uint8Array(V(t)).buffer);
      if (r) {
        n.unshift(new Uint8Array([0]));
      } else {
        n[1] = {
          tag: 3,
          value: n[1]
        };
      }
      return new Uint8Array(V(n)).buffer;
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
    function V(e, t) {
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
        var a = d(atob(l[e]));
        n = 6;
        r = a.length;
        for (o = 0; o < r; o++) {
          t.push(a[o]);
        }
      } else if (e instanceof Array) {
        for (o = 0; o < e.length; o++) {
          V(e[o], t);
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
    function x(e, t, n, r) {
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
    function k(e) {
      return e === "verify" || e === "encrypt" || e === "wrapKey";
    }
    function E(e) {
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
      var D = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
      Object.defineProperty(Element.prototype, "textContent", {
        get: function () {
          return D.get.call(this);
        },
        set: function (e) {
          D.set.call(this, e);
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
  var C;
  var O;
  var W;
  var M;
  var P = ["error", "info", "log", "show", "table", "trace", "warn"];
  var F = function (e) {};
  for (var A = P.length; --A > -1;) {
    x = P[A];
    window.console[x] ||= F;
  }
  if (window.atob) {
    try {
      window.atob(" ");
    } catch (Zn) {
      window.atob = function (e) {
        function t(t) {
          return e(String(t).replace(/[\t\n\f\r ]+/g, ""));
        }
        t.original = e;
        return t;
      }(window.atob);
    }
  } else {
    var j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var H = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
    window.atob = function (e) {
      e = String(e).replace(/[\t\n\f\r ]+/g, "");
      if (!H.test(e)) {
        throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
      }
      var t;
      var n;
      var r;
      e += "==".slice(2 - (e.length & 3));
      var i = "";
      for (var o = 0; o < e.length;) {
        t = j.indexOf(e.charAt(o++)) << 18 | j.indexOf(e.charAt(o++)) << 12 | (n = j.indexOf(e.charAt(o++))) << 6 | (r = j.indexOf(e.charAt(o++)));
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
    var B = Array.prototype.toJSON;
    var I = JSON.stringify;
    JSON.stringify = function (e) {
      try {
        delete Array.prototype.toJSON;
        return I(e);
      } finally {
        Array.prototype.toJSON = B;
      }
    };
  }
  if (!Object.keys) {
    C = Object.prototype.hasOwnProperty;
    O = !Object.prototype.propertyIsEnumerable.call({
      toString: null
    }, "toString");
    M = (W = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length;
    Object.keys = function (e) {
      if (typeof e != "function" && (typeof e != "object" || e === null)) {
        throw new TypeError("Object.keys called on non-object");
      }
      var t;
      var n;
      var r = [];
      for (t in e) {
        if (C.call(e, t)) {
          r.push(t);
        }
      }
      if (O) {
        for (n = 0; n < M; n++) {
          if (C.call(e, W[n])) {
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
            this.b = !y(Z);
            this.c = !y(K);
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
              referrerPolicy: P() ? "origin" : ""
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
          var p = u.isDOMError;
          var d = u.isDOMException;
          var f = u.isError;
          var m = u.isObject;
          var g = u.isPlainObject;
          var y = u.isUndefined;
          var v = u.isFunction;
          var w = u.isString;
          var b = u.isArray;
          var _ = u.isEmptyObject;
          var V = u.each;
          var x = u.objectMerge;
          var k = u.truncate;
          var E = u.objectFrozen;
          var T = u.hasKey;
          var S = u.joinRegExp;
          var R = u.urlencode;
          var N = u.uuid4;
          var U = u.htmlTreeAsString;
          var D = u.isSameException;
          var C = u.isSameStacktrace;
          var O = u.parseUrl;
          var W = u.fill;
          var M = u.supportsFetch;
          var P = u.supportsReferrerPolicy;
          var F = u.serializeKeysForMessage;
          var A = u.serializeException;
          var j = u.sanitize;
          var H = e(2).wrapMethod;
          var B = "source protocol user pass host port path".split(" ");
          var I = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;
          var z = typeof window != "undefined" ? window : n !== undefined ? n : typeof self != "undefined" ? self : {};
          var Z = z.document;
          var K = z.navigator;
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
                V(t, function (e, t) {
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
                o = x(i, o);
              } else if (o !== false) {
                o = i;
              }
              r.autoBreadcrumbs = o;
              var s = {
                tryCatch: true
              };
              var c = r.instrument;
              if ({}.toString.call(c) === "[object Object]") {
                c = x(s, c);
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
                if (T(t, a)) {
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
              t = x({
                trimHeadFrames: 0
              }, t || {});
              if (h(e) && e.error) {
                e = e.error;
              } else {
                if (p(e) || d(e)) {
                  var n = e.name || (p(e) ? "DOMError" : "DOMException");
                  var r = e.message ? n + ": " + e.message : n;
                  return this.captureMessage(r, x(t, {
                    stacktrace: true,
                    trimHeadFrames: t.trimHeadFrames + 1
                  }));
                }
                if (f(e)) {
                  e = e;
                } else {
                  if (!g(e)) {
                    return this.captureMessage(e, x(t, {
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
              var r = x(e, {
                message: "Non-Error exception captured with keys: " + F(n),
                fingerprint: [c(n)],
                extra: e.extra || {}
              });
              r.extra.W = A(t);
              return r;
            },
            captureMessage: function (e, t) {
              if (!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(e)) {
                var n;
                var r = x({
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
                    (t = x({
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
              var t = x({
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
              if (Z) {
                if (!(e = x({
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
                var a = Z.createElement("script");
                a.async = true;
                a.src = o + "/api/embed/error-page/?" + n.join("&");
                (Z.head || Z.body).appendChild(a);
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
                if (Z.createEvent) {
                  (n = Z.createEvent("HTMLEvents")).initEvent(e, true, true);
                } else {
                  (n = Z.createEventObject()).eventType = e;
                }
                for (r in t) {
                  if (T(t, r)) {
                    n[r] = t[r];
                  }
                }
                if (Z.createEvent) {
                  Z.dispatchEvent(n);
                } else {
                  try {
                    Z.fireEvent("on" + n.eventType.toLowerCase(), n);
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
              var n = O(this.w.href);
              var r = O(t);
              var i = O(e);
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
              if (n.xhr && M()) {
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
                if (Z.addEventListener) {
                  Z.addEventListener("click", t._("click"), false);
                  Z.addEventListener("keypress", t.ba(), false);
                } else if (Z.attachEvent) {
                  Z.attachEvent("onclick", t._("click"));
                  Z.attachEvent("onkeypress", t.ba());
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
                V(["debug", "info", "warn", "error", "log"], function (e, t) {
                  H(console, t, l);
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
              V(this.r, function (t, n) {
                var r = n[0];
                var i = n[1];
                r.apply(e, [e].concat(i));
              });
            },
            G: function (e) {
              var t = I.exec(e);
              var n = {};
              var r = 7;
              try {
                while (r--) {
                  n[B[r]] = t[r] || "";
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
              if (e.stack && e.stack.length && (V(e.stack, function (t, i) {
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
                var c = x({
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
                c.exception.mechanism = x({
                  type: "generic",
                  handled: true
                }, c.exception.mechanism || {});
                this.Y(c);
              }
            },
            ha: function (e) {
              var t = this.k.maxMessageLength;
              e.message &&= k(e.message, t);
              if (e.exception) {
                var n = e.exception.values[0];
                n.value = k(n.value, t);
              }
              var r = e.request;
              if (r) {
                r.url &&= k(r.url, this.k.maxUrlLength);
                r.Referer &&= k(r.Referer, this.k.maxUrlLength);
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
                if ((n = e.values[o]).hasOwnProperty("data") && m(n.data) && !E(n.data)) {
                  r = x({}, n.data);
                  for (var a = 0; a < i.length; ++a) {
                    t = i[a];
                    if (r.hasOwnProperty(t) && r[t]) {
                      r[t] = k(r[t], this.k.maxUrlLength);
                    }
                  }
                  e.values[o].data = r;
                }
              }
            },
            ja: function () {
              if (this.c || this.b) {
                var e = {};
                if (this.c && K.userAgent) {
                  e.headers = {
                    "User-Agent": K.userAgent
                  };
                }
                if (z.location && z.location.href) {
                  e.url = z.location.href;
                }
                if (this.b && Z.referrer) {
                  e.headers ||= {};
                  e.headers.Referer = Z.referrer;
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
              return !!t && e.message === t.message && e.transaction === t.transaction && (e.stacktrace || t.stacktrace ? C(e.stacktrace, t.stacktrace) : e.exception || t.exception ? D(e.exception, t.exception) : !e.fingerprint && !t.fingerprint || Boolean(e.fingerprint && t.fingerprint) && JSON.stringify(e.fingerprint) === JSON.stringify(t.fingerprint));
            },
            oa: function (e) {
              if (!this.ma()) {
                var t = e.status;
                if (t === 400 || t === 401 || t === 429) {
                  var n;
                  try {
                    n = M() ? e.headers.get("Retry-After") : e.getResponseHeader("Retry-After");
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
              (e = x(n, e)).tags = x(x({}, this.j.tags), e.tags);
              e.extra = x(x({}, this.j.extra), e.extra);
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
              return j(e, this.k.sanitizeKeys);
            },
            ra: function () {
              return N();
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
              var t = e.url + "?" + R(e.auth);
              var n = null;
              var r = {};
              if (e.options.headers) {
                n = this.sa(e.options.headers);
              }
              if (e.options.fetchParameters) {
                r = this.sa(e.options.fetchParameters);
              }
              if (M()) {
                r.body = s(e.data);
                var i = x({}, this.l);
                var o = x(i, r);
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
                    V(n, function (e, t) {
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
                this.j[e] = x(this.j[e] || {}, t);
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
                if (p(e, n)) {
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
          function p(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }
          function d(e) {
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
          var V = 3;
          var x = 51200;
          var k = 40;
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
            hasKey: p,
            joinRegExp: d,
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
            serializeException: function E(e, t, n) {
              if (!a(e)) {
                return e;
              }
              n = typeof (t = typeof t != "number" ? V : t) != "number" ? x : n;
              var r = w(e, t);
              if (y(b(r)) > n) {
                return E(e, t - 1);
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
              t = typeof t != "number" ? k : t;
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
              var r = d(t);
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
                for (var i in d) {
                  if (d.hasOwnProperty(i)) {
                    try {
                      d[i].apply(null, [t].concat(s.call(arguments, 2)));
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
            function t(t, a, s, u, p) {
              var d = i.isErrorEvent(p) ? p.error : p;
              var f = i.isErrorEvent(t) ? t.message : t;
              if (g) {
                o.computeStackTrace.augmentStackTraceWithInitialElement(g, a, s, f);
                n();
              } else if (d && i.isError(d)) {
                e(o.computeStackTrace(d), true);
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
            var p;
            var d = [];
            var f = null;
            var m = null;
            var g = null;
            u.subscribe = function (e) {
              if (!p) {
                h = a.onerror;
                a.onerror = t;
                p = true;
              }
              d.push(e);
            };
            u.unsubscribe = function (e) {
              for (var t = d.length - 1; t >= 0; --t) {
                if (d[t] === e) {
                  d.splice(t, 1);
                }
              }
            };
            u.uninstall = function () {
              if (p) {
                a.onerror = h;
                p = false;
                h = undefined;
              }
              d = [];
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
                var p = [];
                for (var d = (/^(.*) is undefined$/.exec(e.message), 0), f = h.length; d < f; ++d) {
                  if (n = o.exec(h[d])) {
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
                  } else if (n = a.exec(h[d])) {
                    i = {
                      url: n[2],
                      func: n[1] || c,
                      args: [],
                      line: +n[3],
                      column: n[4] ? +n[4] : null
                    };
                  } else {
                    if (!(n = s.exec(h[d]))) {
                      continue;
                    }
                    if (n[3] && n[3].indexOf(" > eval") > -1 && (t = l.exec(n[3]))) {
                      n[3] = t[1];
                      n[4] = t[2];
                      n[5] = null;
                    } else if (d === 0 && !n[5] && typeof e.columnNumber != "undefined") {
                      p[0].column = e.columnNumber + 1;
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
                  p.push(i);
                }
                if (p.length) {
                  return {
                    name: e.name,
                    message: e.message,
                    url: r(),
                    stack: p
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
              var p = {};
              for (var d = false, f = n.caller; f && !d; f = f.caller) {
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
                  if (p["" + f]) {
                    d = true;
                  } else {
                    p["" + f] = true;
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
          var p = 1732584193;
          var d = -271733879;
          var f = -1732584194;
          var m = 271733878;
          for (n = 0; n < e.length; n += 16) {
            i = p;
            l = d;
            u = f;
            h = m;
            p = o(p, d, f, m, e[n], 7, -680876936);
            m = o(m, p, d, f, e[n + 1], 12, -389564586);
            f = o(f, m, p, d, e[n + 2], 17, 606105819);
            d = o(d, f, m, p, e[n + 3], 22, -1044525330);
            p = o(p, d, f, m, e[n + 4], 7, -176418897);
            m = o(m, p, d, f, e[n + 5], 12, 1200080426);
            f = o(f, m, p, d, e[n + 6], 17, -1473231341);
            d = o(d, f, m, p, e[n + 7], 22, -45705983);
            p = o(p, d, f, m, e[n + 8], 7, 1770035416);
            m = o(m, p, d, f, e[n + 9], 12, -1958414417);
            f = o(f, m, p, d, e[n + 10], 17, -42063);
            d = o(d, f, m, p, e[n + 11], 22, -1990404162);
            p = o(p, d, f, m, e[n + 12], 7, 1804603682);
            m = o(m, p, d, f, e[n + 13], 12, -40341101);
            f = o(f, m, p, d, e[n + 14], 17, -1502002290);
            p = a(p, d = o(d, f, m, p, e[n + 15], 22, 1236535329), f, m, e[n + 1], 5, -165796510);
            m = a(m, p, d, f, e[n + 6], 9, -1069501632);
            f = a(f, m, p, d, e[n + 11], 14, 643717713);
            d = a(d, f, m, p, e[n], 20, -373897302);
            p = a(p, d, f, m, e[n + 5], 5, -701558691);
            m = a(m, p, d, f, e[n + 10], 9, 38016083);
            f = a(f, m, p, d, e[n + 15], 14, -660478335);
            d = a(d, f, m, p, e[n + 4], 20, -405537848);
            p = a(p, d, f, m, e[n + 9], 5, 568446438);
            m = a(m, p, d, f, e[n + 14], 9, -1019803690);
            f = a(f, m, p, d, e[n + 3], 14, -187363961);
            d = a(d, f, m, p, e[n + 8], 20, 1163531501);
            p = a(p, d, f, m, e[n + 13], 5, -1444681467);
            m = a(m, p, d, f, e[n + 2], 9, -51403784);
            f = a(f, m, p, d, e[n + 7], 14, 1735328473);
            p = s(p, d = a(d, f, m, p, e[n + 12], 20, -1926607734), f, m, e[n + 5], 4, -378558);
            m = s(m, p, d, f, e[n + 8], 11, -2022574463);
            f = s(f, m, p, d, e[n + 11], 16, 1839030562);
            d = s(d, f, m, p, e[n + 14], 23, -35309556);
            p = s(p, d, f, m, e[n + 1], 4, -1530992060);
            m = s(m, p, d, f, e[n + 4], 11, 1272893353);
            f = s(f, m, p, d, e[n + 7], 16, -155497632);
            d = s(d, f, m, p, e[n + 10], 23, -1094730640);
            p = s(p, d, f, m, e[n + 13], 4, 681279174);
            m = s(m, p, d, f, e[n], 11, -358537222);
            f = s(f, m, p, d, e[n + 3], 16, -722521979);
            d = s(d, f, m, p, e[n + 6], 23, 76029189);
            p = s(p, d, f, m, e[n + 9], 4, -640364487);
            m = s(m, p, d, f, e[n + 12], 11, -421815835);
            f = s(f, m, p, d, e[n + 15], 16, 530742520);
            p = c(p, d = s(d, f, m, p, e[n + 2], 23, -995338651), f, m, e[n], 6, -198630844);
            m = c(m, p, d, f, e[n + 7], 10, 1126891415);
            f = c(f, m, p, d, e[n + 14], 15, -1416354905);
            d = c(d, f, m, p, e[n + 5], 21, -57434055);
            p = c(p, d, f, m, e[n + 12], 6, 1700485571);
            m = c(m, p, d, f, e[n + 3], 10, -1894986606);
            f = c(f, m, p, d, e[n + 10], 15, -1051523);
            d = c(d, f, m, p, e[n + 1], 21, -2054922799);
            p = c(p, d, f, m, e[n + 8], 6, 1873313359);
            m = c(m, p, d, f, e[n + 15], 10, -30611744);
            f = c(f, m, p, d, e[n + 6], 15, -1560198380);
            d = c(d, f, m, p, e[n + 13], 21, 1309151649);
            p = c(p, d, f, m, e[n + 4], 6, -145523070);
            m = c(m, p, d, f, e[n + 11], 10, -1120210379);
            f = c(f, m, p, d, e[n + 2], 15, 718787259);
            d = c(d, f, m, p, e[n + 9], 21, -343485551);
            p = r(p, i);
            d = r(d, l);
            f = r(f, u);
            m = r(m, h);
          }
          return [p, d, f, m];
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
        function p(e) {
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
        function d(e) {
          return unescape(encodeURIComponent(e));
        }
        function f(e) {
          return function (e) {
            return u(l(h(e), e.length * 8));
          }(d(e));
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
          }(d(e), d(t));
        }
        t.exports = function (e, t, n) {
          if (t) {
            if (n) {
              return m(t, e);
            } else {
              return function (e, t) {
                return p(m(e, t));
              }(t, e);
            }
          } else if (n) {
            return f(e);
          } else {
            return function (e) {
              return p(f(e));
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
  var Z = [{
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
  var K = navigator.userAgent;
  function L() {
    return K;
  }
  function $(e) {
    return Y(e || K, z);
  }
  function G(e) {
    return Y(e || K, Z);
  }
  function J(e, t) {
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
    } catch (Zn) {
      return null;
    }
  }
  function Y(e, t) {
    var n = null;
    var r = null;
    for (var i = -1, o = false; ++i < t.length && !o;) {
      n = t[i];
      for (var a = -1; ++a < n.patterns.length && !o;) {
        o = (r = J(e, n.patterns[a])) !== null;
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
  function X() {
    var e = this;
    var t = $();
    var n = L();
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
  X.prototype.hasEvent = function (e, t) {
    return "on" + e in (t || document.createElement("div"));
  };
  X.prototype.getScreenDimensions = function () {
    var e = {};
    for (var t in window.screen) {
      e[t] = window.screen[t];
    }
    delete e.orientation;
    return e;
  };
  X.prototype.getOrientation = function () {
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
  X.prototype.getWindowDimensions = function () {
    return [this.width(), this.height()];
  };
  X.prototype.interrogateNavigator = function () {
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
  X.prototype.supportsPST = function () {
    return document.hasPrivateToken !== undefined;
  };
  X.prototype.supportsCanvas = function () {
    var e = document.createElement("canvas");
    return !!e.getContext && !!e.getContext("2d");
  };
  X.prototype.supportsWebAssembly = function () {
    try {
      if (typeof WebAssembly == "object" && typeof WebAssembly.instantiate == "function") {
        var e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
        if (e instanceof WebAssembly.Module) {
          return new WebAssembly.Instance(e) instanceof WebAssembly.Instance;
        }
      }
    } catch (Zn) {
      return false;
    }
  };
  var q = new X();
  var Q = new function () {
    var e;
    var t;
    var n = G();
    var r = L();
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
    Browser: q,
    System: Q,
    supportsPAT: function () {
      return (Q.os === "mac" || Q.os === "ios") && q.type === "safari" && q.version >= 16.2;
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
  var pe = "missing-sitekey";
  var de = "invalid-captcha-id";
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
    assetUrl: "https://newassets.hcaptcha.com/captcha/v1/ae0386bc7f5d79cadb9f362403599996bc5a4972/static",
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
  var be = "ae0386bc7f5d79cadb9f362403599996bc5a4972";
  var _e = "prod";
  function Ve(e, t) {
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
  function xe(e) {
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
  var ke = "The captcha failed to load.";
  var Ee = [];
  function Te(e) {
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
    if (e && typeof e == "string" && Ee.indexOf(e) === -1 && !(Ee.length >= 10)) {
      var t = Te(e.trim().split("\n").slice(0, 2));
      Ee.push(t);
    }
  }
  function Re(e) {
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
    Oe("report error", "internal", "debug", t);
    De(e.message || "internal error", "error", ye.file, e);
  }
  function Ne(e) {
    return function () {
      try {
        return e.apply(this, arguments);
      } catch (zn) {
        Re(zn);
        xe(function (e) {
          Ve(e, ke);
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
      } catch (Zn) {}
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
      Oe(ye.file + "_internal", "setup", "info");
      if (e) {
        window.onerror = function (e, t, n, r, i) {
          if (!i || typeof i != "object") {
            i = {};
          }
          var o = i.name || "Error";
          var a = i.stack || "";
          Ne(Se)(a);
          if (a.indexOf("chrome-extension://") === -1 && a.indexOf("safari-extension://") === -1 && a.indexOf("moz-extension://") === -1 && a.indexOf("chrome://internal-") === -1 && a.indexOf("/hammerhead.js") === -1 && a.indexOf("eval at buildCode") === -1 && a.indexOf("u.c.b.r.o.w.s.e.r/ucbrowser_script.js") === -1) {
            Oe(e, "global", "debug", {
              name: o,
              url: t,
              line: n,
              column: r,
              stack: a
            });
            Ce("global", i, {
              message: e
            });
          }
        };
      }
    }
  }
  function De(e, t, n, r) {
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
  function Ce(e, t, n) {
    (n = n || {}).error = t;
    return De(t && t.message || "Missing error message", "error", e, n);
  }
  function Oe(e, t, n, r) {
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
        var s = Te(r);
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
        return e.concat(Ee);
      }
    };
  }
  var Me = {
    getCookie: function (e) {
      var t = document.cookie.replace(/ /g, "").split(";");
      try {
        for (var n = "", r = t.length; r-- && !n;) {
          if (t[r].indexOf(e) >= 0) {
            n = t[r];
          }
        }
        return n;
      } catch (Zn) {
        return "";
      }
    },
    hasCookie: function (e) {
      return !!Me.getCookie(e);
    },
    supportsAPI: function () {
      try {
        return "hasStorageAccess" in document && "requestStorageAccess" in document;
      } catch (Zn) {
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
      } catch (Zn) {
        return Promise.resolve();
      }
    }
  };
  var Pe = {
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
  function Fe(e) {
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.a = 1;
    this.h = 1;
    this.s = 1;
    this.l = 1;
    this.parseString(e);
  }
  function Ae(e, t, n) {
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
  Fe.hasAlpha = function (e) {
    return typeof e == "string" && (e.indexOf("rgba") !== -1 || e.length === 9 && e[0] === "#");
  };
  Fe.prototype.parseString = function (e) {
    if (e) {
      if (e.indexOf("#") === 0) {
        this.fromHex(e);
      } else if (e.indexOf("rgb") === 0) {
        this.fromRGBA(e);
      }
    }
  };
  Fe.prototype.fromHex = function (e) {
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
  Fe.prototype.fromRGBA = function (e) {
    var t = e.indexOf("rgba");
    var n = e.substr(t).replace(/rgba?\(/, "").replace(/\)/, "").replace(/[\s+]/g, "").split(",");
    var r = Math.floor(parseInt(n[0]));
    var i = Math.floor(parseInt(n[1]));
    var o = Math.floor(parseInt(n[2]));
    var a = parseFloat(n[3]);
    this.setRGBA(r, i, o, a);
  };
  Fe.prototype.setRGB = function (e, t, n) {
    this.setRGBA(e, t, n, 1);
  };
  Fe.prototype.setRGBA = function (e, t, n, r) {
    this.r = e;
    this.g = t;
    this.b = n;
    this.a = isNaN(r) ? this.a : r;
    this.updateHSL();
  };
  Fe.prototype.hsl2rgb = function (e, t, n) {
    if (t === 0) {
      var r = Math.round(n * 255);
      this.setRGB(r, r, r);
      return this;
    }
    var i = n <= 0.5 ? n * (1 + t) : n + t - n * t;
    var o = n * 2 - i;
    this.r = Math.round(Ae(o, i, e + 1 / 3) * 255);
    this.g = Math.round(Ae(o, i, e) * 255);
    this.b = Math.round(Ae(o, i, e - 1 / 3) * 255);
    this.h = e;
    this.s = t;
    this.l = n;
    return this;
  };
  Fe.prototype.updateHSL = function () {
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
  Fe.prototype.getHex = function () {
    return "#" + (16777216 + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
  };
  Fe.prototype.getRGBA = function () {
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
  };
  Fe.prototype.clone = function () {
    var e = new Fe();
    e.setRGBA(this.r, this.g, this.b, this.a);
    return e;
  };
  Fe.prototype.mix = function (e, t) {
    if (!(e instanceof Fe)) {
      e = new Fe(e);
    }
    var n = new Fe();
    var r = Math.round(this.r + t * (e.r - this.r));
    var i = Math.round(this.g + t * (e.g - this.g));
    var o = Math.round(this.b + t * (e.b - this.b));
    n.setRGB(r, i, o);
    return n;
  };
  Fe.prototype.blend = function (e, t) {
    var n;
    if (!(e instanceof Fe)) {
      e = new Fe(e);
    }
    var r = [];
    for (var i = 0; i < t; i++) {
      n = this.mix.call(this, e, i / t);
      r.push(n);
    }
    return r;
  };
  Fe.prototype.lightness = function (e) {
    if (e > 1) {
      e /= 100;
    }
    this.hsl2rgb(this.h, this.s, e);
    return this;
  };
  Fe.prototype.saturation = function (e) {
    if (e > 1) {
      e /= 100;
    }
    this.hsl2rgb(this.h, e, this.l);
    return this;
  };
  Fe.prototype.hue = function (e) {
    this.hsl2rgb(e / 360, this.s, this.l);
    return this;
  };
  var je = {
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
      } catch (Zn) {
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
  var He = {
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
        He.requestFrame = t.bind(window);
        He.cancelFrame = n.bind(window);
      } else {
        e = Date.now();
        He.requestFrame = function (t) {
          window.setTimeout(function () {
            t(Date.now() - e);
          }, He._singleFrame * 1000);
        };
        He.cancelFrame = function (e) {
          clearTimeout(e);
          return null;
        };
      }
      He._setup = true;
      He._startTime = He._lastTime = Date.now();
    },
    add: function (e, t) {
      He._renders.push({
        callback: e,
        paused: !t == false || false
      });
      if (!t == false) {
        He.start();
      }
    },
    remove: function (e) {
      for (var t = He._renders.length; --t > -1;) {
        if (He._renders[t].callback === e) {
          He._renders[t].paused = true;
          He._renders.splice(t, 1);
        }
      }
    },
    start: function (e) {
      if (He._setup === false) {
        He._init();
      }
      if (e) {
        for (var t = He._renders.length; --t > -1;) {
          if (He._renders[t].callback === e) {
            He._renders[t].paused = false;
          }
        }
      }
      if (He._running !== true) {
        He._paused = false;
        He._running = true;
        He._af = He.requestFrame(He._update);
      }
    },
    stop: function (e) {
      if (e) {
        for (var t = He._renders.length; --t > -1;) {
          if (He._renders[t].callback === e) {
            He._renders[t].paused = true;
          }
        }
      } else if (He._running !== false) {
        He._af = He.cancelFrame(He._af);
        He._paused = true;
        He._running = false;
      }
    },
    elapsed: function () {
      return Date.now() - He._startTime;
    },
    fps: function (e) {
      if (arguments.length) {
        He._fps = e;
        He._singleFrame = 1 / (He._fps || 60);
        He._adjustedLag = He._singleFrame * 2;
        He._nextTime = He.time + He._singleFrame;
        return He._fps;
      } else {
        return He._fps;
      }
    },
    isRunning: function () {
      return He._running;
    },
    _update: function () {
      if (!He._paused && (He._elapsed = Date.now() - He._lastTime, He._tick = false, He._elapsed > He._lagThreshold && (He._startTime += He._elapsed - He._adjustedLag), He._lastTime += He._elapsed, He.time = (He._lastTime - He._startTime) / 1000, He._difference = He.time - He._nextTime, He._difference > 0 && (He.frame++, He._nextTime += He._difference + (He._difference >= He._singleFrame ? He._singleFrame / 4 : He._singleFrame - He._difference), He._tick = true), He._af = He.requestFrame(He._update), He._tick === true && He._renders.length > 0)) {
        for (var e = He._renders.length; --e > -1;) {
          if (He._renders[e] && He._renders[e].paused === false) {
            He._renders[e].callback(He.time);
          }
        }
      }
    }
  };
  function Be(e) {
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
          } catch (Zn) {}
        }
        i[n] = r;
      }
    }
    return i;
  }
  function Ie(e) {
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
    Decode: Be,
    Encode: Ie
  };
  function Ze(e, t, n) {
    return Math.min(Math.max(e, t), n);
  }
  var Ke = {
    __proto__: null,
    clamp: Ze,
    range: function (e, t, n, r, i, o) {
      var a = (e - t) * (i - r) / (n - t) + r;
      if (o === false) {
        return a;
      } else {
        return Ze(a, Math.min(r, i), Math.max(r, i));
      }
    },
    toRadians: function (e) {
      return e * (Math.PI / 180);
    },
    toDegrees: function (e) {
      return e * 180 / Math.PI;
    }
  };
  function Le(e, t) {
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
  function Ge() {
    try {
      $e.apply(null, arguments);
    } catch (zn) {
      console.error("[hCaptcha] There was an error in your callback.");
      console.error(zn);
    }
  }
  function Je(e, t) {
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
  Le.prototype.getMeanPeriod = function () {
    return this._meanPeriod;
  };
  Le.prototype.getMedianPeriod = function () {
    return this._medianPeriod;
  };
  Le.prototype.getData = function () {
    this._cleanStaleData();
    return this._data;
  };
  Le.prototype.getSize = function () {
    this._cleanStaleData();
    return this._data.length;
  };
  Le.prototype.getCapacity = function () {
    if (this._period === 0) {
      return this._interval;
    } else {
      return Math.ceil(this._interval / this._period);
    }
  };
  Le.prototype.push = function (e, t) {
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
  Le.prototype._calculateMedianPeriod = function (e) {
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
  Le.prototype._rebalanceHeaps = function () {
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
  Le.prototype._fetchMedianPeriod = function () {
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
  Le.prototype._cleanStaleData = function () {
    var e = Date.now();
    for (var t = this._date.length - 1; t >= 0; t--) {
      if (e - this._date[t] >= this._interval) {
        this._date.splice(0, t + 1);
        this._data.splice(0, t + 1);
        break;
      }
    }
  };
  var Ye;
  var Xe = {
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
  function qe(e) {
    return new Promise(function (t, n) {
      e(t, n, function r() {
        e(t, n, r);
      });
    });
  }
  function Qe(e, t) {
    var n = "attempts" in (t = t || {}) ? t.attempts : 1;
    var r = t.delay || 0;
    var i = t.onFail;
    return qe(function (t, o, a) {
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
    Ye = Ye || function () {
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
      i = i >>> 8 ^ Ye[(i ^ r.charCodeAt(t)) & 255];
    }
    return (i ^ -1) >>> 0;
  }
  var tt = {
    __proto__: null,
    createErrorsAggregator: We,
    uuid: function () {
      return Math.random().toString(36).substr(2);
    },
    Render: He,
    JWT: je,
    Color: Fe,
    Shuffle: Pe,
    MathUtil: Ke,
    Storage: Me,
    Query: ze,
    TimeBuffer: Le,
    _stackTraceSet: Ee,
    toRefinedString: Te,
    reportError: Re,
    errorWrapper: Ne,
    initSentry: Ue,
    sentryMessage: De,
    sentryError: Ce,
    sentryBreadcrumb: Oe,
    renderFallback: Ve,
    forEachCaptchaNode: xe,
    callUserFunction: Ge,
    composeParams: Je,
    is: Xe,
    promiseRecursive: qe,
    promiseRetry: Qe,
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
    } catch (Zn) {
      Ce("element", Zn);
      return null;
    }
  };
  st.prototype.createElement = function (e, t) {
    try {
      var n = new st(e, t, false);
      this.appendElement.call(this, n);
      this._nodes.push(n);
      return n;
    } catch (Zn) {
      Ce("element", Zn);
      return null;
    }
  };
  st.prototype.appendElement = function (e) {
    if (e === undefined) {
      return Re({
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
    } catch (Zn) {
      Re({
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
    } catch (Zn) {
      Re({
        name: "DomElement Remove Child",
        message: Zn.message || "Failed to remove child."
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
        } else if (n && Fe.hasAlpha(t)) {
          this.dom.style[o] = new Fe(t).getHex();
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
  var pt = {
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
  var dt = {
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
      var n = mt.getBestTrans(dt);
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
      if (pt[e]) {
        return e;
      } else if (pt[t]) {
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
      return pt[e];
    },
    isShortLocale: function (e) {
      return e.length === 2 || e.length === 3;
    },
    addTable: function (e, t) {
      t ||= Object.create(null);
      if (dt[e]) {
        var n = dt[e];
        for (var r in t) {
          n[r] = t[r];
        }
      } else {
        dt[e] = t;
      }
      return dt[e];
    },
    getTable: function (e) {
      return dt[e];
    },
    addTables: function (e) {
      for (var t in e) {
        mt.addTable(t, e[t]);
      }
      return dt;
    },
    getTables: function () {
      return dt;
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
    } catch (Zn) {
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
      return Qe(function () {
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
                    Ce("http", h, {
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
              Ce("http", h, {
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
  function Vt(e, t) {
    if (typeof e == "object" && t === undefined) {
      e = (t = e).url;
    }
    if (e === null) {
      throw new Error("Url missing");
    }
    return wt("GET", e, t);
  }
  var xt = ["svg", "gif", "png"];
  function kt(e, t) {
    t = t || {};
    var n;
    var r = e;
    if (r.indexOf("data:image") === 0) {
      for (var i = false, o = xt.length, a = -1; a++ < o && !i;) {
        if (i = r.indexOf(xt[a]) >= 0) {
          n = xt[a];
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
  function Et(e, t, n) {
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
  function Rt(e, t) {
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
  function Nt(e, t, n) {
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
  kt.prototype.load = function () {
    return (this.ext === "svg" ? this._loadSvg() : this._loadImg()).catch(function (e) {
      De("Asset failed", "error", "assets", {
        error: e
      });
      throw e;
    });
  };
  kt.prototype._loadSvg = function () {
    var e;
    var t = this;
    var n = this.src;
    var r = this.id;
    if (n.indexOf("data:image/svg+xml") === 0) {
      var i = n.slice("data:image/svg+xml,".length);
      e = Promise.resolve(decodeURIComponent(i));
    } else {
      e = Vt(n).then(function (e) {
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
      Et(t.cb, "error", n);
      throw n;
    });
  };
  kt.prototype._loadImg = function () {
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
        Et(e.cb, "error", t);
        o(t);
      };
      s.onload = a;
      s.src = n;
      if (s.complete) {
        a();
      }
    });
  };
  kt.prototype._imgLoaded = function (e, t, n) {
    this.element = new st(e);
    this.width = t;
    this.height = n;
    this.aspect = t / n;
    this.loaded = true;
    Et(this.cb, "load", this);
  };
  kt.prototype.onload = function (e) {
    if (!this.error) {
      if (this.loaded) {
        e(this);
      } else {
        this.cb.load.push(e);
      }
    }
  };
  kt.prototype.onerror = function (e) {
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
  Rt.prototype.load = function () {
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
      Vt(t, o).then(function (t) {
        e.loaded = true;
        e.data = t.body;
        Nt(e.cb, "load", e);
        r(e);
      }).catch(function (t) {
        e.error = true;
        var r = (t && t.message ? t.message : "Loading Error") + ": " + n;
        Nt(e.cb, "error", r);
        i(r);
      });
    });
  };
  Rt.prototype.onload = function (e) {
    if (!this.error) {
      if (this.loaded) {
        e(this);
      } else {
        this.cb.load.push(e);
      }
    }
  };
  Rt.prototype.onerror = function (e) {
    if (!this.loaded || !!this.error) {
      if (this.error) {
        e(this);
      } else {
        this.cb.error.push(e);
      }
    }
  };
  var Ut = [];
  function Dt(e, t) {
    var n = new Rt(e, t);
    Ut.push(n);
    return n.load();
  }
  function Ct(e) {
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
  var Ot = [];
  var Wt = false;
  var Mt = false;
  function Pt() {
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", At);
      window.addEventListener("load", At);
    } else {
      document.attachEvent("onreadystatechange", Ft);
      window.attachEvent("onload", At);
    }
    Wt = true;
  }
  function Ft() {
    if (document.readyState === "interactive" || document.readyState === "loaded" || document.readyState === "complete") {
      At();
    }
  }
  function At() {
    if (Mt === false) {
      for (var e = 0; e < Ot.length; e++) {
        Ot[e].fn.apply(null, Ot[e].args);
      }
      Ot = [];
    }
    Mt = true;
    if (document.removeEventListener) {
      document.removeEventListener("DOMContentLoaded", At);
      window.removeEventListener("load", At);
    } else {
      document.detachEvent("onreadystatechange", Ft);
      window.detachEvent("onload", At);
    }
  }
  new st(document);
  var jt = new st(window);
  var Ht = {
    touchstart: "ts",
    touchend: "te",
    touchmove: "tm",
    touchcancel: "tc"
  };
  var Bt = {
    mousedown: "md",
    mouseup: "mu",
    mousemove: "mm"
  };
  var It = {
    pointermove: "pm"
  };
  var zt = {
    keydown: "kd",
    keyup: "ku"
  };
  var Zt = {
    devicemotion: "dm"
  };
  function Kt(e, t) {
    var n = Bt[e];
    var r = null;
    return function (e) {
      r = function (e) {
        return [e.windowX, e.windowY, Date.now()];
      }(e);
      t(n, r);
    };
  }
  function Lt(e, t) {
    var n = It[e];
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
    var n = Ht[e];
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
        } catch (Zn) {
          return t;
        }
      }(e);
      t(n, r);
    };
  }
  function Gt(e, t) {
    var n = zt[e];
    var r = null;
    return function (e) {
      r = function (e) {
        return [e.keyNum, Date.now()];
      }(e);
      t(n, r);
    };
  }
  function Jt(e, t) {
    var n = Zt[e];
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
  function Yt() {
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
  Yt.prototype.record = function (e, t, n, r) {
    this._manifest.st = Date.now();
    this.state.record.mouse = e === undefined ? this.state.record.mouse : e;
    this.state.record.touch = n === undefined ? this.state.record.touch : n;
    this.state.record.keys = t === undefined ? this.state.record.keys : t;
    this.state.record.motion = r === undefined ? this.state.record.motion : r;
    if (this.state.initRecord === false) {
      var i = new st(document.body);
      if (this.state.record.mouse) {
        i.addEventListener("mousedown", Kt("mousedown", this._recordEvent), true);
        i.addEventListener("mousemove", Kt("mousemove", this._recordEvent), true);
        i.addEventListener("mouseup", Kt("mouseup", this._recordEvent), true);
        i.addEventListener("pointermove", Lt("pointermove", this._recordEvent), true);
      }
      if (this.state.record.keys === true) {
        i.addEventListener("keyup", Gt("keyup", this._recordEvent), true);
        i.addEventListener("keydown", Gt("keydown", this._recordEvent), true);
      }
      if (this.state.record.touch && ee.Browser.hasEvent("touchstart", document.body) === true) {
        i.addEventListener("touchstart", $t("touchstart", this._recordEvent), true);
        i.addEventListener("touchmove", $t("touchmove", this._recordEvent), true);
        i.addEventListener("touchend", $t("touchend", this._recordEvent), true);
      }
      if (this.state.record.motion && ee.Browser.hasEvent("devicemotion", window) === true) {
        i.addEventListener("devicemotion", Jt("devicemotion", this._recordEvent), true);
      }
      this.state.initRecord = true;
    }
    this.state.recording = true;
  };
  Yt.prototype.stop = function () {
    this.state.recording = false;
  };
  Yt.prototype.time = function () {
    return this.state.loadTime;
  };
  Yt.prototype.getData = function () {
    for (var e in this.state.timeBuffers) {
      this._manifest[e] = this.state.timeBuffers[e].getData();
      this._manifest[e + "-mp"] = this.state.timeBuffers[e].getMeanPeriod();
    }
    return this._manifest;
  };
  Yt.prototype.setData = function (e, t) {
    this._manifest[e] = t;
  };
  Yt.prototype.resetData = function () {
    this._manifest = {};
    this.state.timeBuffers = {};
  };
  Yt.prototype.circBuffPush = function (e, t) {
    this._recordEvent(e, t);
  };
  Yt.prototype._recordEvent = function (e, t) {
    if (this.state.recording !== false) {
      try {
        var n = t[t.length - 1];
        this.state.timeBuffers[e] ||= new Le(16, 15000);
        this.state.timeBuffers[e].push(n, t);
      } catch (zn) {
        Ce("motion", zn);
      }
    }
  };
  var Xt;
  var qt;
  var Qt;
  var en;
  var tn = new Yt();
  try {
    Xt = function () {
      var e = {
        _pIvV3: 0,
        _clm7oyy: 0,
        _oDtgV2HxDN: [],
        _ds5bg806: [],
        _G3Kz89F: [],
        _0FfFW0SCUI: {},
        _gQRJik8SNg: window,
        _XxIqqz: [function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._WPVeYNT0[e._pIvV3++];
          var r = e._WPVeYNT0[e._pIvV3++];
          (n == -1 ? e._ds5bg806 : e._G3Kz89F[n])[r] = t;
        }, function (e) {
          var n = e._clm7oyy;
          var r = e._WPVeYNT0[e._pIvV3++];
          try {
            t(e);
          } catch (i) {
            e._oDtgV2HxDN.push(i);
            e._pIvV3 = r;
            t(e);
          }
          e._clm7oyy = n;
        }, function (e) {
          e._oDtgV2HxDN.push(tt);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n instanceof t);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n << t);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          var r = n[t];
          if (typeof r == "function") {
            r = r.bind(n);
          }
          e._oDtgV2HxDN.push(r);
        }, function (e) {
          e._oDtgV2HxDN.push(null);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n in t);
        }, function (e) {
          e._oDtgV2HxDN.push(!!e._WPVeYNT0[e._pIvV3++]);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._WPVeYNT0[e._pIvV3++];
          if (!t) {
            e._pIvV3 = n;
          }
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n | t);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n !== t);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(window[t]);
        }, function (e) {
          var t = e._WPVeYNT0[e._pIvV3++];
          var n = e._WPVeYNT0[e._pIvV3++];
          var r = e._WPVeYNT0[e._pIvV3++];
          for (var i = decodeURIComponent(atob(e._8a97b.slice(t, t + n))), o = "", a = 0; a < i.length; a++) {
            o += String.fromCharCode((256 + i.charCodeAt(a) + r) % 256);
          }
          e._oDtgV2HxDN.push(o);
        }, function (e) {
          e._pIvV3 = e._oDtgV2HxDN.splice(e._oDtgV2HxDN.length - 4, 1)[0];
          e._gQRJik8SNg = e._oDtgV2HxDN.splice(e._oDtgV2HxDN.length - 3, 1)[0];
          e._ds5bg806 = e._oDtgV2HxDN.splice(e._oDtgV2HxDN.length - 2, 1)[0];
        }, function (e) {
          e._oDtgV2HxDN.push(e._gQRJik8SNg);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n < t);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          var r = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n[t] = r);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._WPVeYNT0[e._pIvV3++];
          var r = e._WPVeYNT0[e._pIvV3++];
          e._ds5bg806[r] = t;
          for (var i = 0; i < n; i++) {
            e._ds5bg806[e._WPVeYNT0[e._pIvV3++]] = t[i];
          }
        }, function (e) {
          var t = e._WPVeYNT0[e._pIvV3++];
          e._clm7oyy = t;
        }, function (e) {
          var t = e._WPVeYNT0[e._pIvV3++];
          var n = e._WPVeYNT0[e._pIvV3++];
          var r = t == -1 ? e._ds5bg806 : e._G3Kz89F[t];
          e._oDtgV2HxDN.push(r[n]);
        }, function (e) {
          e._oDtgV2HxDN.push(undefined);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n * t);
        }, function (e) {
          e._oDtgV2HxDN.push(et);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n <= t);
        }, function (e) {
          var n = e._oDtgV2HxDN.pop();
          function r() {
            var i = false;
            var o = Array.prototype.slice.call(arguments);
            if (o.length > 0 && o[0]._l) {
              o = o.splice(1, o.length - 1);
            } else {
              i = true;
            }
            var a = e._gQRJik8SNg;
            var s = e._clm7oyy;
            var c = e._G3Kz89F;
            e._oDtgV2HxDN.push(e._pIvV3);
            e._oDtgV2HxDN.push(e._gQRJik8SNg);
            e._oDtgV2HxDN.push(e._ds5bg806);
            e._oDtgV2HxDN.push(o);
            e._oDtgV2HxDN.push(r);
            e._clm7oyy = e._pIvV3;
            e._pIvV3 = n;
            e._gQRJik8SNg = this;
            e._G3Kz89F = r._r;
            t(e);
            e._gQRJik8SNg = a;
            e._clm7oyy = s;
            e._G3Kz89F = c;
            if (i) {
              return e._oDtgV2HxDN.pop();
            }
          }
          r._l = {};
          r._r = Array.prototype.slice.call(e._G3Kz89F);
          e._oDtgV2HxDN.push(r);
        }, function (e) {
          e._oDtgV2HxDN.pop();
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n >= t);
        }, function (e) {
          var t = e._WPVeYNT0[e._pIvV3++];
          var n = e._WPVeYNT0[e._pIvV3++];
          var r = e._WPVeYNT0[e._pIvV3++];
          var i = t == -1 ? e._ds5bg806 : e._G3Kz89F[t];
          if (r) {
            e._oDtgV2HxDN.push(++i[n]);
          } else {
            e._oDtgV2HxDN.push(i[n]++);
          }
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          if (t._l !== undefined) {
            n.splice(0, 0, {
              _l: {}
            });
            t.apply(e._gQRJik8SNg, n);
          } else {
            var r = t.apply(e._gQRJik8SNg, n);
            e._oDtgV2HxDN.push(r);
          }
        }, function () {
          var t = e._oDtgV2HxDN.pop();
          var n = e._WPVeYNT0[e._pIvV3++];
          e._ds5bg806 = t;
          e._G3Kz89F[n] = t;
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n + t);
        }, function (e) {
          e._0FfFW0SCUI[e._oDtgV2HxDN[e._oDtgV2HxDN.length - 1]] = e._oDtgV2HxDN[e._oDtgV2HxDN.length - 2];
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          var r = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n[t] += r);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(!t);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._WPVeYNT0[e._pIvV3++];
          var r = e._WPVeYNT0[e._pIvV3++];
          var i = n == -1 ? e._ds5bg806 : e._G3Kz89F[n];
          e._oDtgV2HxDN.push(i[r] += t);
        }, function (e) {
          for (var t = e._WPVeYNT0[e._pIvV3++], n = [], r = 0; r < t; r++) {
            n.push(e._oDtgV2HxDN.pop());
          }
          e._oDtgV2HxDN.push(n);
        }, function (e) {
          for (var t = e._WPVeYNT0[e._pIvV3++], n = {}, r = 0; r < t; r++) {
            var i = e._oDtgV2HxDN.pop();
            n[e._oDtgV2HxDN.pop()] = i;
          }
          e._oDtgV2HxDN.push(n);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(typeof t);
        }, function (e) {
          e._oDtgV2HxDN.push(e._oDtgV2HxDN[e._oDtgV2HxDN.length - 1]);
        }, function (e) {
          e._oDtgV2HxDN.push(ee);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n > t);
        }, function () {
          var t = e._oDtgV2HxDN.pop();
          var n = e._WPVeYNT0[e._pIvV3++];
          if (e._G3Kz89F[n]) {
            e._ds5bg806 = e._G3Kz89F[n];
          } else {
            e._ds5bg806 = t;
            e._G3Kz89F[n] = t;
          }
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._WPVeYNT0[e._pIvV3++];
          var r = e._WPVeYNT0[e._pIvV3++];
          var i = n == -1 ? e._ds5bg806 : e._G3Kz89F[n];
          e._oDtgV2HxDN.push(i[r] |= t);
        }, function (e) {
          e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(undefined);
        }, function (e) {
          e._oDtgV2HxDN.push(nt);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(-t);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n === t);
        }, function () {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          var r = false;
          if (t._l !== undefined) {
            r = true;
            n.splice(0, 0, {
              _l: {}
            });
          }
          var i = new (Function.prototype.bind.apply(t, [null].concat(n)))();
          if (r) {
            e._oDtgV2HxDN.pop();
          }
          e._oDtgV2HxDN.push(i);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n - t);
        }, function (e) {
          e._oDtgV2HxDN.push(e._WPVeYNT0[e._pIvV3++]);
        }, function (e) {
          e._oDtgV2HxDN.push(st);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._WPVeYNT0[e._pIvV3++];
          var r = e._WPVeYNT0[e._pIvV3++];
          var i = n == -1 ? e._ds5bg806 : e._G3Kz89F[n];
          e._oDtgV2HxDN.push(i[r] = t);
        }, function (e) {
          var t = e._oDtgV2HxDN.pop();
          var n = e._oDtgV2HxDN.pop();
          e._oDtgV2HxDN.push(n / t);
        }, function (e) {
          e._oDtgV2HxDN.push(tt);
        }],
        _WPVeYNT0: [36, 0, 42, 0, 50, 14, 25, 0, -1, 0, 8, 0, 9, 59, 36, 0, 30, 1, 26, 18, 1, 0, 1, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 20, -1, 1, 13, 1212, 12, 6, 5, 20, -1, 1, 13, 3956, 24, -10, 5, 36, 3, 8, 0, 9, 58, 14, 50, 69, 25, 0, -1, 1, 8, 0, 9, 202, 36, 0, 30, 2, 26, 18, 1, 0, 1, 36, 0, 0, -1, 2, 36, 0, 0, -1, 3, 20, -1, 1, 13, 80, 40, 6, 5, 9, 113, 36, 0, 20, -1, 1, 13, 80, 40, 6, 5, 29, 52, -1, 3, 26, 50, 0, 0, -1, 4, 20, -1, 4, 20, -1, 3, 13, 508, 16, 9, 5, 16, 9, 194, 20, -1, 3, 20, -1, 4, 5, 0, -1, 5, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 20, -1, 5, 13, 560, 4, 16, 5, 20, -1, 5, 13, 248, 4, 20, 5, 36, 3, 36, 1, 20, -1, 2, 13, 3636, 8, -4, 5, 29, 26, 28, -1, 4, 0, 26, 8, 0, 9, 118, 20, -1, 2, 8, 0, 9, 201, 14, 50, 212, 25, 0, -1, 2, 8, 0, 9, 249, 36, 0, 30, 3, 26, 18, 1, 0, 1, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 20, -1, 1, 13, 1432, 8, -5, 5, 36, 2, 8, 0, 9, 248, 14, 50, 259, 25, 0, -1, 3, 8, 0, 9, 521, 36, 0, 30, 4, 26, 18, 1, 0, 1, 36, 0, 0, -1, 2, 1, 501, 20, -1, 1, 13, 2876, 40, -20, 5, 39, 9, 303, 26, 20, -1, 1, 13, 2876, 40, -20, 5, 13, 508, 16, 9, 5, 50, 1, 27, 9, 321, 20, -1, 1, 13, 2876, 40, -20, 5, 52, -1, 3, 26, 8, 0, 9, 363, 20, -1, 1, 13, 4652, 20, 0, 5, 39, 9, 349, 26, 20, -1, 1, 13, 4652, 20, 0, 5, 13, 508, 16, 9, 5, 50, 1, 27, 9, 363, 20, -1, 1, 13, 4652, 20, 0, 5, 52, -1, 3, 26, 20, -1, 3, 9, 488, 50, 0, 0, -1, 5, 20, -1, 5, 20, -1, 3, 13, 508, 16, 9, 5, 16, 9, 463, 20, -1, 3, 20, -1, 5, 5, 36, 1, 45, 13, 3480, 64, -18, 5, 29, 52, -1, 4, 26, 20, -1, 4, 9, 454, 20, -1, 4, 13, 560, 4, 16, 5, 20, -1, 4, 13, 248, 4, 20, 5, 20, -1, 3, 20, -1, 5, 5, 13, 2824, 32, -15, 5, 36, 3, 36, 1, 20, -1, 2, 13, 3636, 8, -4, 5, 29, 26, 28, -1, 5, 0, 26, 8, 0, 9, 373, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 36, 1, 20, -1, 2, 13, 3636, 8, -4, 5, 29, 26, 20, -1, 2, 8, 0, 9, 520, 19, 497, 8, 0, 9, 511, 0, -1, 6, 20, -1, 2, 8, 0, 9, 520, 13, 564, 36, -21, 12, 8, 0, 9, 520, 14, 50, 531, 25, 0, -1, 4, 8, 0, 9, 978, 36, 0, 30, 5, 26, 18, 2, 0, 1, 2, 20, -1, 1, 13, 2128, 20, -7, 5, 50, 0, 44, 47, 39, 34, 9, 587, 26, 20, -1, 1, 13, 2128, 20, -7, 5, 39, 9, 587, 26, 20, -1, 1, 13, 2128, 20, -7, 5, 13, 248, 4, 20, 5, 50, 0, 44, 47, 9, 618, 13, 4788, 4, 20, 50, 0, 13, 560, 4, 16, 50, 0, 13, 248, 4, 20, 50, 0, 37, 3, 20, -1, 1, 13, 2128, 20, -7, 17, 26, 20, -1, 1, 13, 372, 56, -14, 5, 50, 0, 44, 47, 39, 34, 9, 664, 26, 20, -1, 1, 13, 372, 56, -14, 5, 39, 9, 664, 26, 20, -1, 1, 13, 372, 56, -14, 5, 13, 2784, 8, 2, 5, 50, 0, 44, 47, 9, 695, 13, 664, 8, -9, 50, 0, 13, 4056, 12, 6, 50, 0, 13, 2784, 8, 2, 50, 0, 37, 3, 20, -1, 1, 13, 372, 56, -14, 17, 26, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 20, -1, 1, 13, 372, 56, -14, 5, 13, 664, 8, -9, 5, 20, -1, 1, 13, 372, 56, -14, 5, 13, 4056, 12, 6, 5, 20, -1, 1, 13, 372, 56, -14, 5, 13, 2784, 8, 2, 5, 20, -1, 1, 13, 2128, 20, -7, 5, 13, 4788, 4, 20, 5, 20, -1, 1, 13, 2128, 20, -7, 5, 13, 560, 4, 16, 5, 20, -1, 1, 13, 2128, 20, -7, 5, 13, 248, 4, 20, 5, 36, 7, 0, -1, 3, 36, 0, 0, -1, 4, 20, -1, 2, 13, 508, 16, 9, 5, 50, 0, 47, 9, 827, 20, -1, 3, 52, -1, 2, 26, 20, -1, 3, 52, -1, 4, 26, 8, 0, 9, 957, 50, 0, 0, -1, 5, 50, 0, 0, -1, 7, 20, -1, 7, 50, 6, 16, 9, 912, 20, -1, 2, 20, -1, 7, 5, 20, -1, 3, 20, -1, 7, 5, 49, 52, -1, 6, 26, 20, -1, 3, 20, -1, 7, 5, 36, 1, 20, -1, 4, 13, 3636, 8, -4, 5, 29, 26, 20, -1, 6, 36, 1, 13, 1756, 8, -9, 12, 13, 1100, 12, -18, 5, 29, 35, -1, 5, 26, 28, -1, 7, 0, 26, 8, 0, 9, 837, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 36, 1, 20, -1, 4, 13, 3636, 8, -4, 5, 29, 26, 20, -1, 3, 52, -1, 2, 26, 20, -1, 5, 50, 0, 24, 9, 957, 6, 8, 0, 9, 977, 13, 2584, 20, 13, 20, -1, 2, 13, 728, 20, -15, 20, -1, 4, 37, 2, 8, 0, 9, 977, 14, 50, 988, 25, 0, -1, 5, 8, 0, 9, 1111, 36, 0, 30, 6, 26, 18, 0, 0, 37, 0, 15, 13, 2856, 20, 6, 17, 26, 13, 3644, 28, -18, 13, 728, 20, -15, 8, 0, 13, 4368, 8, -4, 8, 0, 13, 176, 12, 12, 8, 1, 13, 1088, 12, 9, 8, 1, 37, 4, 13, 60, 20, 11, 8, 0, 13, 120, 20, 19, 8, 0, 13, 1252, 12, -11, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 13, 2304, 20, -7, 37, 0, 37, 5, 15, 13, 4448, 8, -1, 17, 26, 15, 36, 1, 15, 13, 2160, 28, 5, 5, 13, 700, 12, 9, 5, 29, 15, 13, 2160, 28, 5, 17, 26, 13, 564, 36, -21, 12, 8, 0, 9, 1110, 14, 50, 1121, 25, 0, -1, 6, 8, 0, 9, 1303, 36, 0, 30, 7, 26, 18, 1, 0, 1, 36, 0, 20, -1, 1, 13, 3228, 16, 20, 5, 13, 4840, 28, -11, 5, 29, 0, -1, 2, 20, -1, 1, 13, 1784, 4, -11, 5, 39, 34, 9, 1166, 26, 13, 772, 0, -20, 0, -1, 3, 20, -1, 1, 13, 2956, 8, 21, 5, 39, 34, 9, 1186, 26, 13, 772, 0, -20, 0, -1, 4, 20, -1, 1, 13, 2816, 8, 17, 5, 39, 34, 9, 1206, 26, 13, 772, 0, -20, 0, -1, 5, 20, -1, 1, 13, 3036, 28, -13, 5, 39, 34, 9, 1226, 26, 13, 772, 0, -20, 0, -1, 6, 20, -1, 1, 13, 1480, 24, 16, 5, 39, 34, 9, 1246, 26, 13, 772, 0, -20, 0, -1, 7, 20, -1, 1, 36, 1, 20, 0, 7, 29, 0, -1, 8, 20, -1, 2, 20, -1, 3, 31, 20, -1, 4, 31, 20, -1, 5, 31, 20, -1, 6, 31, 20, -1, 7, 31, 20, -1, 8, 31, 0, -1, 9, 20, -1, 9, 36, 1, 23, 29, 8, 0, 9, 1302, 14, 50, 1313, 25, 0, -1, 7, 8, 0, 9, 1678, 36, 0, 30, 8, 26, 18, 1, 0, 1, 20, -1, 1, 13, 1784, 4, -11, 5, 13, 772, 0, -20, 11, 9, 1359, 13, 2280, 20, -19, 20, -1, 1, 13, 1784, 4, -11, 5, 31, 13, 3608, 8, 7, 31, 8, 0, 9, 1677, 20, -1, 1, 13, 4292, 36, -17, 12, 13, 1292, 16, -13, 5, 47, 9, 1383, 13, 2544, 16, 5, 8, 0, 9, 1677, 13, 772, 0, -20, 0, -1, 2, 20, -1, 1, 13, 2984, 48, -21, 5, 9, 1670, 50, 0, 0, -1, 3, 50, 0, 0, -1, 4, 50, 0, 0, -1, 5, 20, -1, 5, 20, -1, 1, 13, 2984, 48, -21, 5, 13, 4696, 36, -19, 5, 13, 508, 16, 9, 5, 16, 9, 1511, 20, -1, 1, 13, 2984, 48, -21, 5, 13, 4696, 36, -19, 5, 20, -1, 5, 5, 0, -1, 6, 20, -1, 6, 13, 524, 24, 17, 5, 20, -1, 1, 13, 524, 24, 17, 5, 47, 9, 1502, 20, -1, 6, 20, -1, 1, 47, 9, 1497, 20, -1, 3, 50, 1, 31, 52, -1, 4, 26, 28, -1, 3, 0, 26, 28, -1, 5, 0, 26, 8, 0, 9, 1415, 13, 2956, 8, 21, 36, 1, 20, -1, 1, 13, 1512, 24, 13, 5, 29, 39, 9, 1550, 26, 13, 2956, 8, 21, 36, 1, 20, -1, 1, 13, 4548, 16, -1, 5, 29, 13, 772, 0, -20, 11, 9, 1611, 13, 1316, 4, 5, 36, 0, 20, -1, 1, 13, 524, 24, 17, 5, 13, 4840, 28, -11, 5, 29, 31, 13, 356, 16, 11, 31, 13, 2956, 8, 21, 36, 1, 20, -1, 1, 13, 4548, 16, -1, 5, 29, 31, 13, 3608, 8, 7, 31, 20, -1, 2, 31, 52, -1, 2, 26, 8, 0, 9, 1654, 13, 1316, 4, 5, 36, 0, 20, -1, 1, 13, 524, 24, 17, 5, 13, 4840, 28, -11, 5, 29, 31, 13, 2952, 4, -1, 31, 20, -1, 4, 31, 13, 1624, 4, 0, 31, 20, -1, 2, 31, 52, -1, 2, 26, 20, -1, 1, 13, 2984, 48, -21, 5, 52, -1, 1, 26, 8, 0, 9, 1390, 20, -1, 2, 8, 0, 9, 1677, 14, 50, 1688, 25, 0, -1, 8, 8, 0, 9, 1710, 36, 0, 30, 9, 26, 18, 2, 0, 1, 2, 20, -1, 1, 20, -1, 2, 10, 8, 0, 9, 1709, 14, 50, 1720, 25, 0, -1, 9, 8, 0, 9, 1857, 36, 0, 30, 10, 26, 18, 1, 0, 1, 20, -1, 1, 36, 1, 20, 0, 6, 29, 0, -1, 2, 20, 0, 42, 20, -1, 2, 5, 9, 1761, 20, 0, 42, 20, -1, 2, 5, 8, 0, 9, 1856, 20, -1, 1, 13, 4732, 40, -21, 5, 9, 1777, 50, 1, 8, 0, 9, 1779, 50, 0, 20, -1, 1, 13, 2964, 20, -18, 5, 9, 1795, 50, 1, 8, 0, 9, 1797, 50, 0, 20, -1, 1, 13, 2188, 16, 17, 5, 9, 1813, 50, 1, 8, 0, 9, 1815, 50, 0, 20, -1, 1, 36, 1, 20, 0, 11, 29, 20, -1, 1, 36, 1, 20, 0, 10, 29, 36, 5, 0, -1, 3, 20, -1, 3, 20, 0, 42, 20, -1, 2, 17, 26, 20, -1, 3, 8, 0, 9, 1856, 14, 50, 1867, 25, 0, -1, 10, 8, 0, 9, 2582, 36, 0, 30, 11, 26, 18, 1, 0, 1, 20, -1, 1, 13, 3576, 12, -10, 5, 13, 3948, 8, 7, 5, 9, 1903, 20, 0, 41, 13, 2204, 8, 11, 5, 8, 0, 9, 2581, 20, -1, 1, 13, 2816, 8, 17, 5, 39, 9, 1931, 26, 36, 0, 20, -1, 1, 13, 2816, 8, 17, 5, 13, 4840, 28, -11, 5, 29, 0, -1, 2, 36, 0, 20, -1, 1, 13, 3228, 16, 20, 5, 13, 4840, 28, -11, 5, 29, 0, -1, 3, 20, -1, 3, 13, 3832, 36, -13, 47, 9, 1975, 20, 0, 41, 13, 1112, 12, 21, 5, 8, 0, 9, 2581, 13, 252, 16, 6, 20, 0, 41, 13, 4140, 16, 4, 5, 13, 1648, 8, 18, 20, 0, 41, 13, 1448, 8, -8, 5, 13, 4460, 20, -21, 20, 0, 41, 13, 3868, 8, 12, 5, 13, 4328, 12, -7, 20, 0, 41, 13, 4240, 12, -18, 5, 13, 496, 12, 14, 20, 0, 41, 13, 1360, 12, -1, 5, 13, 428, 12, 10, 20, 0, 41, 13, 164, 12, 16, 5, 37, 6, 0, -1, 4, 20, -1, 4, 20, -1, 2, 5, 9, 2072, 20, -1, 4, 20, -1, 2, 5, 8, 0, 9, 2581, 36, 0, 20, -1, 1, 13, 2956, 8, 21, 5, 39, 34, 9, 2091, 26, 13, 772, 0, -20, 13, 4840, 28, -11, 5, 29, 0, -1, 5, 36, 0, 20, -1, 1, 13, 1784, 4, -11, 5, 39, 34, 9, 2119, 26, 13, 772, 0, -20, 13, 4840, 28, -11, 5, 29, 0, -1, 6, 36, 0, 20, -1, 1, 13, 1480, 24, 16, 5, 39, 34, 9, 2147, 26, 13, 772, 0, -20, 13, 4840, 28, -11, 5, 29, 0, -1, 7, 36, 0, 20, -1, 1, 13, 3036, 28, -13, 5, 39, 34, 9, 2175, 26, 13, 772, 0, -20, 13, 4840, 28, -11, 5, 29, 0, -1, 8, 13, 428, 12, 10, 36, 1, 20, -1, 5, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 39, 34, 9, 2227, 26, 13, 428, 12, 10, 36, 1, 20, -1, 6, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 39, 34, 9, 2251, 26, 13, 428, 12, 10, 36, 1, 20, -1, 7, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 39, 34, 9, 2275, 26, 13, 428, 12, 10, 36, 1, 20, -1, 8, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 9, 2289, 20, 0, 41, 13, 164, 12, 16, 5, 8, 0, 9, 2581, 13, 496, 12, 14, 36, 1, 20, -1, 5, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 39, 34, 9, 2332, 26, 13, 496, 12, 14, 36, 1, 20, -1, 6, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 39, 34, 9, 2356, 26, 13, 496, 12, 14, 36, 1, 20, -1, 7, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 39, 34, 9, 2380, 26, 13, 496, 12, 14, 36, 1, 20, -1, 8, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 9, 2394, 20, 0, 41, 13, 1360, 12, -1, 5, 8, 0, 9, 2581, 13, 1548, 12, 14, 36, 1, 20, -1, 5, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 39, 34, 9, 2437, 26, 13, 1548, 12, 14, 36, 1, 20, -1, 6, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 39, 34, 9, 2461, 26, 13, 1548, 12, 14, 36, 1, 20, -1, 7, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 39, 34, 9, 2485, 26, 13, 1548, 12, 14, 36, 1, 20, -1, 8, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 39, 34, 9, 2509, 26, 13, 4460, 20, -21, 36, 1, 20, -1, 5, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 39, 34, 9, 2533, 26, 13, 4460, 20, -21, 36, 1, 20, -1, 6, 13, 672, 12, 22, 5, 29, 50, 1, 46, 11, 9, 2547, 20, 0, 41, 13, 3868, 8, 12, 5, 8, 0, 9, 2581, 20, -1, 2, 13, 2744, 8, -1, 47, 9, 2569, 20, 0, 41, 13, 1112, 12, 21, 5, 8, 0, 9, 2581, 20, 0, 41, 13, 792, 8, -5, 5, 8, 0, 9, 2581, 14, 50, 2592, 25, 0, -1, 11, 8, 0, 9, 2724, 36, 0, 30, 12, 26, 18, 1, 0, 1, 13, 1480, 24, 16, 13, 276, 12, 14, 13, 2956, 8, 21, 13, 1784, 4, -11, 36, 4, 0, -1, 2, 36, 0, 0, -1, 3, 50, 0, 0, -1, 4, 20, -1, 4, 20, -1, 2, 13, 508, 16, 9, 5, 16, 9, 2716, 20, -1, 2, 20, -1, 4, 5, 0, -1, 5, 20, -1, 5, 36, 1, 20, -1, 1, 13, 1512, 24, 13, 5, 29, 9, 2694, 20, -1, 5, 36, 1, 20, -1, 1, 13, 4548, 16, -1, 5, 29, 36, 1, 23, 29, 8, 0, 9, 2695, 6, 36, 1, 20, -1, 3, 13, 3636, 8, -4, 5, 29, 26, 28, -1, 4, 0, 26, 8, 0, 9, 2632, 20, -1, 3, 8, 0, 9, 2723, 14, 50, 2734, 25, 0, -1, 12, 8, 0, 9, 2837, 36, 0, 30, 13, 26, 18, 1, 0, 1, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 20, -1, 1, 13, 3764, 36, -22, 5, 36, 1, 20, 0, 6, 29, 20, -1, 1, 13, 1212, 12, 6, 5, 9, 2792, 20, -1, 1, 13, 1212, 12, 6, 5, 8, 0, 9, 2800, 20, -1, 1, 13, 600, 12, -8, 5, 20, -1, 1, 13, 3956, 24, -10, 5, 9, 2822, 20, -1, 1, 13, 3956, 24, -10, 5, 8, 0, 9, 2830, 20, -1, 1, 13, 4588, 16, -8, 5, 36, 4, 8, 0, 9, 2836, 14, 50, 2847, 25, 0, -1, 13, 8, 0, 9, 3174, 36, 0, 30, 14, 26, 18, 1, 0, 1, 50, 0, 0, -1, 2, 20, -1, 1, 13, 1076, 12, -3, 5, 9, 2892, 20, 0, 52, 13, 4504, 16, 14, 5, 20, -1, 2, 36, 2, 20, 0, 8, 29, 52, -1, 2, 26, 20, -1, 1, 13, 4276, 16, 16, 5, 9, 2923, 20, 0, 52, 13, 3800, 20, -8, 5, 20, -1, 2, 36, 2, 20, 0, 8, 29, 52, -1, 2, 26, 20, -1, 1, 13, 4540, 8, 19, 5, 9, 2954, 20, 0, 52, 13, 2752, 16, 17, 5, 20, -1, 2, 36, 2, 20, 0, 8, 29, 52, -1, 2, 26, 20, -1, 1, 13, 1888, 20, -8, 5, 9, 2985, 20, 0, 52, 13, 1324, 16, 8, 5, 20, -1, 2, 36, 2, 20, 0, 8, 29, 52, -1, 2, 26, 20, -1, 1, 13, 692, 8, -2, 5, 13, 2916, 8, -12, 47, 9, 3021, 20, 0, 52, 13, 4040, 16, 1, 5, 20, -1, 2, 36, 2, 20, 0, 8, 29, 52, -1, 2, 26, 20, -1, 1, 13, 692, 8, -2, 5, 13, 2768, 16, -14, 47, 9, 3057, 20, 0, 52, 13, 3120, 28, 10, 5, 20, -1, 2, 36, 2, 20, 0, 8, 29, 52, -1, 2, 26, 20, -1, 1, 13, 692, 8, -2, 5, 13, 2340, 20, -14, 47, 9, 3093, 20, 0, 52, 13, 4396, 36, 22, 5, 20, -1, 2, 36, 2, 20, 0, 8, 29, 52, -1, 2, 26, 20, -1, 1, 13, 692, 8, -2, 5, 13, 2256, 20, 3, 47, 9, 3129, 20, 0, 52, 13, 1232, 20, 21, 5, 20, -1, 2, 36, 2, 20, 0, 8, 29, 52, -1, 2, 26, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 20, -1, 1, 13, 3764, 36, -22, 5, 36, 1, 20, 0, 6, 29, 20, -1, 2, 20, -1, 1, 13, 4812, 28, -13, 5, 36, 4, 8, 0, 9, 3173, 14, 50, 3184, 25, 0, -1, 14, 8, 0, 9, 3520, 36, 0, 30, 15, 26, 18, 1, 0, 1, 36, 0, 0, -1, 2, 1, 3500, 20, -1, 1, 13, 2876, 40, -20, 5, 39, 9, 3228, 26, 20, -1, 1, 13, 2876, 40, -20, 5, 13, 508, 16, 9, 5, 50, 1, 27, 9, 3246, 20, -1, 1, 13, 2876, 40, -20, 5, 52, -1, 3, 26, 8, 0, 9, 3288, 20, -1, 1, 13, 4652, 20, 0, 5, 39, 9, 3274, 26, 20, -1, 1, 13, 4652, 20, 0, 5, 13, 508, 16, 9, 5, 50, 1, 27, 9, 3288, 20, -1, 1, 13, 4652, 20, 0, 5, 52, -1, 3, 26, 20, -1, 3, 9, 3487, 50, 0, 0, -1, 5, 20, -1, 5, 20, -1, 3, 13, 508, 16, 9, 5, 16, 9, 3436, 20, -1, 3, 20, -1, 5, 5, 36, 1, 45, 13, 3480, 64, -18, 5, 29, 52, -1, 4, 26, 20, -1, 4, 9, 3427, 20, -1, 3, 20, -1, 5, 5, 13, 2824, 32, -15, 5, 36, 1, 20, -1, 2, 13, 3636, 8, -4, 5, 29, 26, 20, -1, 4, 13, 248, 4, 20, 5, 36, 1, 13, 1756, 8, -9, 12, 13, 552, 8, 5, 5, 29, 36, 1, 20, -1, 2, 13, 3636, 8, -4, 5, 29, 26, 20, -1, 4, 13, 560, 4, 16, 5, 36, 1, 13, 1756, 8, -9, 12, 13, 552, 8, 5, 5, 29, 36, 1, 20, -1, 2, 13, 3636, 8, -4, 5, 29, 26, 28, -1, 5, 0, 26, 8, 0, 9, 3298, 20, -1, 1, 13, 3764, 36, -22, 5, 36, 1, 20, 0, 6, 29, 36, 1, 20, -1, 2, 13, 3636, 8, -4, 5, 29, 26, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 36, 1, 20, -1, 2, 13, 3636, 8, -4, 5, 29, 26, 20, -1, 2, 8, 0, 9, 3519, 19, 3496, 8, 0, 9, 3510, 0, -1, 6, 20, -1, 2, 8, 0, 9, 3519, 13, 564, 36, -21, 12, 8, 0, 9, 3519, 14, 50, 3530, 25, 0, -1, 15, 8, 0, 9, 3573, 36, 0, 30, 16, 26, 18, 1, 0, 1, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 20, -1, 1, 13, 3764, 36, -22, 5, 36, 1, 20, 0, 6, 29, 36, 2, 8, 0, 9, 3572, 14, 50, 3583, 25, 0, -1, 16, 8, 0, 9, 3894, 36, 0, 30, 17, 26, 18, 1, 0, 1, 20, -1, 1, 13, 3764, 36, -22, 5, 0, -1, 2, 20, -1, 1, 13, 2816, 8, 17, 5, 13, 1440, 8, 22, 47, 9, 3630, 20, 0, 53, 13, 1748, 8, -5, 5, 8, 0, 9, 3638, 20, 0, 53, 13, 3372, 12, 11, 5, 0, -1, 3, 20, -1, 2, 13, 3200, 8, 0, 5, 39, 34, 9, 3658, 26, 13, 772, 0, -20, 0, -1, 4, 13, 2744, 8, -1, 36, 1, 20, -1, 1, 13, 1992, 36, 5, 5, 13, 4564, 24, -13, 5, 29, 0, -1, 5, 50, 0, 0, -1, 6, 20, -1, 3, 20, 0, 53, 13, 3372, 12, 11, 5, 47, 9, 3779, 20, -1, 2, 13, 3980, 24, 4, 5, 50, 0, 36, 2, 20, -1, 4, 13, 3064, 12, 12, 5, 29, 20, -1, 5, 31, 20, -1, 2, 13, 648, 16, -6, 5, 36, 1, 20, -1, 4, 13, 3064, 12, 12, 5, 29, 31, 0, -1, 7, 20, -1, 5, 13, 508, 16, 9, 5, 20, -1, 7, 13, 508, 16, 9, 5, 53, 50, 100, 22, 52, -1, 6, 26, 8, 0, 9, 3833, 20, -1, 2, 13, 648, 16, -6, 5, 20, -1, 2, 13, 3980, 24, 4, 5, 36, 2, 20, -1, 4, 13, 3064, 12, 12, 5, 29, 0, -1, 8, 20, -1, 8, 13, 508, 16, 9, 5, 20, -1, 4, 13, 508, 16, 9, 5, 53, 50, 100, 22, 52, -1, 6, 26, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 20, -1, 2, 36, 1, 20, 0, 6, 29, 20, -1, 3, 20, 0, 53, 13, 3372, 12, 11, 5, 47, 9, 3880, 20, -1, 5, 36, 1, 23, 29, 8, 0, 9, 3881, 6, 20, -1, 6, 20, -1, 3, 36, 5, 8, 0, 9, 3893, 14, 50, 3904, 25, 0, -1, 17, 8, 0, 9, 4121, 36, 0, 30, 18, 26, 18, 1, 0, 1, 50, 0, 0, -1, 2, 20, -1, 1, 13, 3764, 36, -22, 5, 13, 2096, 32, 11, 12, 3, 39, 34, 9, 3951, 26, 20, -1, 1, 13, 3764, 36, -22, 5, 13, 2668, 44, 5, 12, 3, 9, 3979, 20, -1, 1, 13, 3764, 36, -22, 5, 13, 3200, 8, 0, 5, 13, 508, 16, 9, 5, 52, -1, 2, 26, 8, 0, 9, 4034, 20, -1, 1, 13, 3764, 36, -22, 5, 13, 3444, 24, -12, 12, 3, 39, 9, 4010, 26, 20, -1, 1, 13, 3764, 36, -22, 5, 13, 2428, 92, -22, 5, 9, 4034, 20, -1, 1, 13, 3764, 36, -22, 5, 13, 772, 20, 8, 5, 13, 508, 16, 9, 5, 52, -1, 2, 26, 20, -1, 1, 13, 4480, 12, -13, 5, 9, 4061, 20, -1, 1, 13, 4480, 12, -13, 5, 13, 508, 16, 9, 5, 8, 0, 9, 4064, 50, 1, 46, 0, -1, 3, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 20, -1, 1, 13, 3764, 36, -22, 5, 36, 1, 20, 0, 6, 29, 20, -1, 1, 13, 3764, 36, -22, 5, 36, 1, 20, 0, 9, 29, 20, -1, 3, 20, -1, 2, 36, 5, 8, 0, 9, 4120, 14, 50, 4131, 25, 0, -1, 18, 8, 0, 9, 4383, 36, 0, 30, 19, 26, 18, 1, 0, 1, 20, -1, 1, 13, 2816, 8, 17, 5, 13, 4004, 20, 10, 47, 39, 9, 4165, 26, 20, -1, 1, 13, 80, 40, 6, 5, 9, 4300, 36, 0, 20, -1, 1, 13, 80, 40, 6, 5, 29, 0, -1, 2, 36, 0, 50, 4190, 25, 8, 0, 9, 4275, 36, 0, 30, 20, 0, -1, 0, 18, 1, 1, 2, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 20, -1, 2, 13, 3764, 36, -22, 5, 36, 1, 20, 0, 6, 29, 20, -1, 2, 13, 4068, 12, 1, 5, 20, -1, 2, 13, 1604, 20, 19, 5, 20, -1, 2, 13, 2040, 16, -1, 5, 20, -1, 2, 13, 600, 12, -8, 5, 20, -1, 2, 13, 4588, 16, -8, 5, 36, 7, 8, 0, 9, 4274, 14, 36, 1, 20, -1, 2, 13, 3360, 12, -17, 5, 29, 13, 44, 16, -17, 5, 29, 8, 0, 9, 4382, 8, 0, 9, 4373, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 20, -1, 1, 13, 3764, 36, -22, 5, 36, 1, 20, 0, 6, 29, 20, -1, 1, 13, 4068, 12, 1, 5, 20, -1, 1, 13, 1604, 20, 19, 5, 20, -1, 1, 13, 2040, 16, -1, 5, 20, -1, 1, 13, 600, 12, -8, 5, 20, -1, 1, 13, 4588, 16, -8, 5, 36, 7, 8, 0, 9, 4382, 13, 564, 36, -21, 12, 8, 0, 9, 4382, 14, 50, 4393, 25, 0, -1, 19, 8, 0, 9, 4546, 36, 0, 30, 21, 26, 18, 0, 0, 37, 0, 15, 13, 2856, 20, 6, 17, 26, 13, 1252, 12, -11, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 13, 4252, 24, 17, 50, 0, 13, 2648, 20, 12, 37, 0, 13, 1508, 4, 1, 37, 0, 13, 2304, 20, -7, 37, 0, 13, 3644, 28, -18, 13, 4792, 20, 8, 8, 1, 13, 2712, 32, -17, 8, 1, 13, 1472, 8, -5, 8, 1, 13, 176, 12, 12, 8, 1, 13, 4368, 8, -4, 8, 1, 13, 3468, 12, 7, 8, 1, 37, 6, 13, 60, 20, 11, 8, 0, 13, 120, 20, 19, 8, 0, 37, 8, 15, 13, 4448, 8, -1, 17, 26, 15, 36, 1, 15, 13, 2160, 28, 5, 5, 13, 700, 12, 9, 5, 29, 15, 13, 2160, 28, 5, 17, 26, 13, 564, 36, -21, 12, 8, 0, 9, 4545, 14, 50, 4556, 25, 0, -1, 20, 8, 0, 9, 4605, 36, 0, 30, 22, 26, 18, 0, 0, 1, 4587, 36, 0, 20, 0, 57, 13, 4564, 24, -13, 5, 29, 8, 0, 9, 4604, 19, 4583, 8, 0, 9, 4595, 0, -1, 1, 6, 8, 0, 9, 4604, 13, 564, 36, -21, 12, 8, 0, 9, 4604, 14, 50, 4615, 25, 0, -1, 21, 8, 0, 9, 4708, 36, 0, 30, 23, 26, 18, 0, 0, 1, 4690, 13, 2792, 24, 18, 36, 1, 13, 3244, 16, 12, 12, 13, 1908, 56, -12, 5, 29, 0, -1, 1, 20, -1, 1, 13, 508, 16, 9, 5, 50, 0, 41, 9, 4677, 20, -1, 1, 50, 0, 5, 13, 1456, 16, 1, 5, 8, 0, 9, 4707, 8, 0, 9, 4684, 50, 1, 46, 8, 0, 9, 4707, 19, 4686, 8, 0, 9, 4698, 0, -1, 2, 6, 8, 0, 9, 4707, 13, 564, 36, -21, 12, 8, 0, 9, 4707, 14, 50, 4718, 25, 0, -1, 22, 8, 0, 9, 4767, 36, 0, 30, 24, 26, 18, 0, 0, 1, 4749, 36, 0, 20, 0, 40, 13, 4564, 24, -13, 5, 29, 8, 0, 9, 4766, 19, 4745, 8, 0, 9, 4757, 0, -1, 1, 6, 8, 0, 9, 4766, 13, 564, 36, -21, 12, 8, 0, 9, 4766, 14, 50, 4777, 25, 0, -1, 23, 8, 0, 9, 4830, 36, 0, 30, 25, 26, 18, 0, 0, 1, 4812, 13, 1536, 12, 11, 12, 13, 4812, 28, -13, 5, 13, 612, 16, -20, 5, 8, 0, 9, 4829, 19, 4808, 8, 0, 9, 4820, 0, -1, 1, 6, 8, 0, 9, 4829, 13, 564, 36, -21, 12, 8, 0, 9, 4829, 14, 50, 4840, 25, 0, -1, 24, 8, 0, 9, 4893, 36, 0, 30, 26, 26, 18, 0, 0, 1, 4875, 13, 4292, 36, -17, 12, 13, 4812, 28, -13, 5, 13, 612, 16, -20, 5, 8, 0, 9, 4892, 19, 4871, 8, 0, 9, 4883, 0, -1, 1, 6, 8, 0, 9, 4892, 13, 564, 36, -21, 12, 8, 0, 9, 4892, 14, 50, 4903, 25, 0, -1, 25, 8, 0, 9, 5113, 36, 0, 30, 27, 26, 18, 1, 0, 1, 1, 5100, 20, -1, 1, 13, 4480, 12, -13, 5, 0, -1, 2, 20, -1, 2, 50, 0, 44, 11, 39, 9, 4948, 26, 20, -1, 2, 13, 756, 4, -10, 5, 50, 0, 44, 11, 9, 5094, 20, -1, 2, 13, 756, 4, -10, 5, 13, 3356, 4, 18, 47, 9, 5002, 20, -1, 1, 13, 288, 8, 0, 5, 20, -1, 1, 13, 3756, 8, 13, 5, 36, 2, 36, 1, 20, 0, 60, 50, 0, 5, 13, 3636, 8, -4, 5, 29, 26, 8, 0, 9, 5094, 20, -1, 2, 13, 756, 4, -10, 5, 13, 1504, 4, -1, 47, 9, 5046, 20, -1, 1, 13, 288, 8, 0, 5, 20, -1, 1, 13, 3756, 8, 13, 5, 36, 2, 20, 0, 60, 50, 1, 17, 26, 8, 0, 9, 5094, 20, -1, 2, 13, 756, 4, -10, 5, 13, 548, 4, -15, 47, 9, 5094, 20, -1, 2, 13, 3356, 4, 18, 5, 20, -1, 2, 13, 3920, 4, -16, 5, 36, 2, 36, 1, 20, 0, 60, 50, 2, 5, 13, 3636, 8, -4, 5, 29, 26, 19, 5096, 8, 0, 9, 5103, 0, -1, 3, 13, 564, 36, -21, 12, 8, 0, 9, 5112, 14, 50, 5123, 25, 0, -1, 26, 8, 0, 9, 5286, 36, 0, 30, 28, 26, 18, 2, 0, 1, 2, 1, 5273, 20, -1, 1, 13, 4480, 12, -13, 5, 0, -1, 3, 20, -1, 3, 50, 0, 44, 11, 39, 9, 5169, 26, 20, -1, 3, 13, 756, 4, -10, 5, 50, 0, 44, 11, 9, 5267, 20, -1, 3, 13, 756, 4, -10, 5, 13, 3196, 4, 11, 47, 9, 5267, 36, 0, 20, 0, 27, 29, 26, 13, 1676, 4, -12, 13, 3356, 4, 18, 20, 0, 58, 36, 1, 13, 3684, 8, 4, 12, 13, 296, 24, -7, 5, 29, 36, 1, 20, 0, 28, 29, 13, 3920, 4, -16, 20, -1, 2, 13, 756, 4, -10, 13, 548, 4, -15, 13, 3756, 8, 13, 13, 1964, 24, 8, 37, 4, 36, 2, 13, 1536, 12, 11, 12, 13, 4220, 12, 14, 5, 13, 2560, 24, 10, 5, 29, 26, 19, 5269, 8, 0, 9, 5276, 0, -1, 4, 13, 564, 36, -21, 12, 8, 0, 9, 5285, 14, 50, 5296, 25, 0, -1, 27, 8, 0, 9, 5375, 36, 0, 30, 29, 26, 18, 0, 0, 50, 0, 0, -1, 1, 20, -1, 1, 20, 0, 59, 13, 508, 16, 9, 5, 16, 9, 5365, 20, 0, 59, 20, -1, 1, 5, 38, 13, 20, 12, -2, 47, 9, 5356, 36, 0, 20, 0, 59, 20, -1, 1, 5, 29, 20, 0, 58, 20, -1, 1, 17, 26, 28, -1, 1, 0, 26, 8, 0, 9, 5309, 13, 564, 36, -21, 12, 8, 0, 9, 5374, 14, 50, 5385, 25, 0, -1, 28, 8, 0, 9, 5402, 36, 0, 30, 30, 26, 18, 1, 0, 1, 20, -1, 1, 8, 0, 9, 5401, 14, 50, 5412, 25, 0, -1, 29, 8, 0, 9, 5945, 36, 0, 30, 31, 26, 18, 0, 0, 1, 5885, 36, 0, 20, 0, 27, 29, 26, 50, 0, 0, -1, 1, 20, -1, 1, 20, 0, 60, 50, 0, 5, 13, 508, 16, 9, 5, 16, 9, 5513, 20, 0, 60, 50, 0, 5, 20, -1, 1, 5, 50, 1, 5, 13, 756, 4, -10, 13, 3196, 4, 11, 13, 3756, 8, 13, 13, 1964, 24, 8, 37, 2, 36, 2, 20, 0, 60, 50, 0, 5, 20, -1, 1, 5, 50, 0, 5, 13, 2560, 24, 10, 5, 29, 26, 28, -1, 1, 0, 26, 8, 0, 9, 5434, 20, 0, 58, 36, 1, 13, 3684, 8, 4, 12, 13, 296, 24, -7, 5, 29, 36, 1, 20, 0, 28, 29, 50, 0, 36, 2, 36, 1, 20, 0, 60, 50, 2, 5, 13, 3636, 8, -4, 5, 29, 26, 50, 5561, 25, 8, 0, 9, 5867, 36, 0, 30, 32, 0, -1, 0, 18, 1, 1, 2, 50, 5582, 25, 0, -1, 3, 8, 0, 9, 5848, 36, 0, 30, 33, 26, 18, 1, 0, 1, 20, 0, 60, 50, 1, 5, 0, -1, 2, 20, 0, 60, 50, 2, 5, 0, -1, 3, 20, -1, 2, 50, 0, 44, 47, 39, 34, 9, 5628, 26, 20, -1, 3, 50, 0, 44, 47, 39, 34, 9, 5644, 26, 20, -1, 3, 13, 508, 16, 9, 5, 50, 3, 16, 39, 9, 5654, 26, 20, -1, 1, 50, 30, 16, 9, 5726, 20, -1, 1, 50, 10, 16, 9, 5670, 50, 1, 8, 0, 9, 5672, 50, 3, 0, -1, 4, 20, -1, 4, 50, 5685, 25, 8, 0, 9, 5713, 36, 0, 30, 34, 0, -1, 0, 18, 0, 1, 20, 33, 1, 20, 33, 4, 31, 36, 1, 20, 32, 3, 29, 8, 0, 9, 5712, 14, 36, 2, 13, 1344, 16, 14, 12, 29, 26, 8, 0, 9, 5838, 20, -1, 2, 50, 0, 44, 11, 39, 9, 5748, 26, 20, -1, 2, 13, 508, 16, 9, 5, 50, 2, 47, 9, 5815, 13, 1988, 4, -4, 20, -1, 3, 36, 1, 13, 3684, 8, 4, 12, 13, 296, 24, -7, 5, 29, 13, 756, 4, -10, 13, 4456, 4, -6, 13, 3756, 8, 13, 13, 1964, 24, 8, 37, 3, 0, -1, 5, 20, -1, 2, 50, 1, 5, 20, -1, 5, 36, 2, 20, -1, 2, 50, 0, 5, 13, 2560, 24, 10, 5, 29, 26, 36, 0, 20, 0, 60, 50, 2, 17, 26, 50, 0, 20, 32, 2, 36, 2, 13, 1344, 16, 14, 12, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 5847, 14, 50, 0, 36, 1, 20, -1, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 5866, 14, 36, 1, 13, 4492, 12, 7, 12, 48, 8, 0, 9, 5944, 19, 5881, 8, 0, 9, 5935, 0, -1, 2, 50, 5895, 25, 8, 0, 9, 5923, 36, 0, 30, 35, 0, -1, 0, 18, 1, 1, 2, 36, 0, 20, -1, 2, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 5922, 14, 36, 1, 13, 4492, 12, 7, 12, 48, 8, 0, 9, 5944, 13, 564, 36, -21, 12, 8, 0, 9, 5944, 14, 50, 5955, 25, 0, -1, 30, 8, 0, 9, 6156, 36, 0, 30, 36, 26, 18, 1, 0, 1, 20, -1, 1, 50, 0, 47, 9, 5997, 20, 0, 25, 13, 3076, 28, -18, 36, 2, 13, 1536, 12, 11, 12, 13, 1788, 36, 5, 5, 29, 26, 8, 0, 9, 6146, 50, 6004, 25, 8, 0, 9, 6038, 36, 0, 30, 37, 0, -1, 0, 18, 1, 1, 2, 20, 36, 1, 20, -1, 2, 36, 2, 20, 0, 26, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 6037, 14, 13, 3076, 28, -18, 36, 2, 13, 1536, 12, 11, 12, 13, 1788, 36, 5, 5, 29, 26, 13, 1676, 4, -12, 13, 756, 4, -10, 13, 3356, 4, 18, 13, 3756, 8, 13, 13, 1964, 24, 8, 37, 2, 36, 2, 13, 1536, 12, 11, 12, 13, 4220, 12, 14, 5, 13, 2560, 24, 10, 5, 29, 26, 20, -1, 1, 50, 2, 47, 9, 6146, 13, 1676, 4, -12, 13, 756, 4, -10, 13, 1504, 4, -1, 13, 3756, 8, 13, 13, 1964, 24, 8, 37, 2, 36, 2, 13, 1536, 12, 11, 12, 13, 4220, 12, 14, 5, 13, 2560, 24, 10, 5, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 6155, 14, 13, 4520, 20, 9, 13, 2300, 4, 0, 13, 2324, 16, 9, 13, 1340, 4, 5, 13, 3924, 16, 19, 13, 4620, 12, -12, 13, 140, 24, -10, 13, 2276, 4, -4, 37, 4, 0, -1, 31, 13, 1272, 20, 8, 13, 3032, 4, 12, 13, 4356, 12, 14, 13, 1320, 4, -3, 13, 636, 12, -2, 13, 1204, 8, 17, 37, 3, 0, -1, 32, 13, 4004, 20, 10, 13, 2936, 4, 5, 37, 1, 0, -1, 33, 13, 1052, 24, -12, 13, 1308, 8, -8, 13, 4128, 12, -5, 13, 1640, 8, 11, 37, 2, 0, -1, 34, 13, 1372, 24, 16, 13, 3940, 8, -14, 37, 1, 0, -1, 35, 13, 3876, 44, -14, 50, 6280, 25, 8, 0, 9, 6423, 36, 0, 30, 38, 0, -1, 0, 18, 1, 1, 2, 6, 0, -1, 3, 20, 0, 31, 20, -1, 2, 5, 50, 0, 44, 11, 9, 6319, 20, 0, 31, 20, -1, 2, 5, 52, -1, 3, 26, 20, 0, 32, 20, -1, 2, 5, 50, 0, 44, 11, 9, 6343, 20, 0, 32, 20, -1, 2, 5, 52, -1, 3, 26, 20, 0, 33, 20, -1, 2, 5, 50, 0, 44, 11, 9, 6367, 20, 0, 33, 20, -1, 2, 5, 52, -1, 3, 26, 20, 0, 34, 20, -1, 2, 5, 50, 0, 44, 11, 9, 6391, 20, 0, 34, 20, -1, 2, 5, 52, -1, 3, 26, 20, 0, 35, 20, -1, 2, 5, 50, 0, 44, 11, 9, 6415, 20, 0, 35, 20, -1, 2, 5, 52, -1, 3, 26, 20, -1, 3, 8, 0, 9, 6422, 14, 13, 2056, 20, -18, 50, 6434, 25, 8, 0, 9, 6563, 36, 0, 30, 39, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 35, 20, -1, 2, 5, 0, -1, 4, 6, 0, -1, 5, 36, 0, 0, -1, 6, 50, 6472, 25, 8, 0, 9, 6558, 36, 0, 30, 40, 0, -1, 0, 18, 1, 1, 2, 20, 39, 6, 20, -1, 2, 36, 2, 20, 0, 4, 29, 52, 39, 5, 26, 20, 39, 5, 6, 47, 9, 6511, 21, 8, 0, 9, 6557, 20, 39, 5, 13, 2584, 20, 13, 5, 52, 39, 6, 26, 20, 39, 5, 13, 728, 20, -15, 5, 52, 39, 5, 26, 20, 39, 5, 20, 39, 4, 36, 2, 20, 39, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 6557, 14, 8, 0, 9, 6562, 14, 13, 4340, 16, 18, 50, 6574, 25, 8, 0, 9, 6659, 36, 0, 30, 41, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 34, 20, -1, 2, 5, 0, -1, 4, 6, 0, -1, 5, 50, 6607, 25, 8, 0, 9, 6654, 36, 0, 30, 42, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 2, 29, 52, 41, 5, 26, 20, 41, 5, 20, 41, 4, 36, 2, 20, 41, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 6653, 14, 8, 0, 9, 6658, 14, 13, 176, 12, 12, 50, 6670, 25, 8, 0, 9, 6755, 36, 0, 30, 43, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 31, 20, -1, 2, 5, 0, -1, 4, 6, 0, -1, 5, 50, 6703, 25, 8, 0, 9, 6750, 36, 0, 30, 44, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 3, 29, 52, 43, 5, 26, 20, 43, 5, 20, 43, 4, 36, 2, 20, 43, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 6749, 14, 8, 0, 9, 6754, 14, 13, 4004, 20, 10, 50, 6766, 25, 8, 0, 9, 6883, 36, 0, 30, 45, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 33, 20, -1, 2, 5, 0, -1, 4, 6, 0, -1, 5, 50, 6799, 25, 8, 0, 9, 6878, 36, 0, 30, 46, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 1, 29, 52, 45, 5, 26, 50, 0, 0, -1, 3, 20, -1, 3, 20, 45, 5, 13, 508, 16, 9, 5, 16, 9, 6868, 20, 45, 5, 20, -1, 3, 5, 20, 45, 4, 36, 2, 20, 45, 3, 29, 26, 28, -1, 3, 0, 26, 8, 0, 9, 6828, 13, 564, 36, -21, 12, 8, 0, 9, 6877, 14, 8, 0, 9, 6882, 14, 13, 1088, 12, 9, 50, 6894, 25, 8, 0, 9, 6979, 36, 0, 30, 47, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 32, 20, -1, 2, 5, 0, -1, 4, 6, 0, -1, 5, 50, 6927, 25, 8, 0, 9, 6974, 36, 0, 30, 48, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 0, 29, 52, 47, 5, 26, 20, 47, 5, 20, 47, 4, 36, 2, 20, 47, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 6973, 14, 8, 0, 9, 6978, 14, 37, 6, 0, -1, 36, 50, 16, 0, -1, 37, 50, 15, 50, 1000, 22, 0, -1, 38, 50, 7004, 25, 8, 0, 9, 7840, 36, 0, 30, 49, 0, -1, 0, 18, 4, 1, 2, 3, 4, 5, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 15, 13, 2856, 20, 6, 5, 13, 3224, 4, 10, 17, 26, 20, -1, 2, 50, 0, 44, 47, 9, 7072, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 1088, 12, 9, 5, 8, 0, 9, 7075, 20, -1, 2, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 1088, 12, 9, 17, 26, 20, -1, 4, 50, 0, 44, 47, 9, 7121, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 176, 12, 12, 5, 8, 0, 9, 7124, 20, -1, 4, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 176, 12, 12, 17, 26, 20, -1, 3, 50, 0, 44, 47, 9, 7170, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 4368, 8, -4, 5, 8, 0, 9, 7173, 20, -1, 3, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 4368, 8, -4, 17, 26, 20, -1, 5, 50, 0, 44, 47, 9, 7219, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 728, 20, -15, 5, 8, 0, 9, 7222, 20, -1, 5, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 728, 20, -15, 17, 26, 15, 13, 4448, 8, -1, 5, 13, 60, 20, 11, 5, 8, 0, 47, 9, 7816, 13, 4292, 36, -17, 12, 13, 1292, 16, -13, 5, 36, 1, 51, 48, 0, -1, 6, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 1088, 12, 9, 5, 9, 7446, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 636, 12, -2, 36, 2, 20, 0, 36, 13, 1088, 12, 9, 5, 29, 13, 636, 12, -2, 36, 3, 20, -1, 6, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 1272, 20, 8, 36, 2, 20, 0, 36, 13, 1088, 12, 9, 5, 29, 13, 1272, 20, 8, 36, 3, 20, -1, 6, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 4356, 12, 14, 36, 2, 20, 0, 36, 13, 1088, 12, 9, 5, 29, 13, 4356, 12, 14, 36, 3, 20, -1, 6, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 4004, 20, 10, 36, 2, 20, 0, 36, 13, 4004, 20, 10, 5, 29, 13, 4004, 20, 10, 36, 3, 20, -1, 6, 13, 1788, 36, 5, 5, 29, 26, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 4368, 8, -4, 5, 8, 1, 47, 9, 7545, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 1052, 24, -12, 36, 2, 20, 0, 36, 13, 4340, 16, 18, 5, 29, 13, 1052, 24, -12, 36, 3, 20, -1, 6, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 4128, 12, -5, 36, 2, 20, 0, 36, 13, 4340, 16, 18, 5, 29, 13, 4128, 12, -5, 36, 3, 20, -1, 6, 13, 1788, 36, 5, 5, 29, 26, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 176, 12, 12, 5, 39, 9, 7596, 26, 13, 4292, 36, -17, 12, 13, 1292, 16, -13, 5, 13, 140, 24, -10, 36, 2, 40, 13, 2376, 12, 12, 5, 13, 1768, 16, 11, 5, 29, 8, 1, 47, 9, 7715, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 140, 24, -10, 36, 2, 20, 0, 36, 13, 176, 12, 12, 5, 29, 13, 140, 24, -10, 36, 3, 20, -1, 6, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 2324, 16, 9, 36, 2, 20, 0, 36, 13, 176, 12, 12, 5, 29, 13, 2324, 16, 9, 36, 3, 20, -1, 6, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 3924, 16, 19, 36, 2, 20, 0, 36, 13, 176, 12, 12, 5, 29, 13, 3924, 16, 19, 36, 3, 20, -1, 6, 13, 1788, 36, 5, 5, 29, 26, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 728, 20, -15, 5, 39, 9, 7761, 26, 13, 1536, 12, 11, 12, 13, 1372, 24, 16, 36, 2, 40, 13, 2376, 12, 12, 5, 13, 1768, 16, 11, 5, 29, 8, 1, 47, 9, 7802, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 1372, 24, 16, 36, 2, 20, 0, 36, 13, 2056, 20, -18, 5, 29, 13, 1372, 24, 16, 36, 3, 20, -1, 6, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 4448, 8, -1, 5, 13, 60, 20, 11, 17, 26, 8, 1, 15, 13, 4448, 8, -1, 5, 13, 120, 20, 19, 17, 26, 13, 564, 36, -21, 12, 8, 0, 9, 7839, 14, 20, -1, 5, 13, 2520, 24, -8, 5, 13, 3644, 28, -18, 17, 26, 50, 7861, 25, 8, 0, 9, 7895, 36, 0, 30, 50, 0, -1, 0, 18, 0, 1, 8, 0, 15, 13, 4448, 8, -1, 5, 13, 120, 20, 19, 17, 26, 13, 564, 36, -21, 12, 8, 0, 9, 7894, 14, 20, -1, 5, 13, 2520, 24, -8, 5, 13, 628, 8, 17, 17, 26, 50, 7916, 25, 8, 0, 9, 7942, 36, 0, 30, 51, 0, -1, 0, 18, 0, 1, 15, 13, 4448, 8, -1, 5, 13, 1252, 12, -11, 5, 8, 0, 9, 7941, 14, 20, -1, 5, 13, 2520, 24, -8, 5, 13, 4232, 8, 21, 17, 26, 50, 7963, 25, 8, 0, 9, 8128, 36, 0, 30, 52, 0, -1, 0, 18, 0, 1, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 5, 36, 1, 13, 3744, 12, 21, 12, 13, 4368, 8, -4, 5, 29, 0, -1, 2, 20, -1, 2, 13, 508, 16, 9, 5, 0, -1, 3, 50, 0, 0, -1, 4, 20, -1, 4, 20, -1, 3, 16, 9, 8117, 20, -1, 2, 20, -1, 4, 5, 0, -1, 5, 36, 0, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 5, 20, -1, 5, 5, 13, 4564, 24, -13, 5, 29, 15, 13, 2856, 20, 6, 5, 20, -1, 5, 17, 26, 36, 0, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 5, 20, -1, 5, 5, 13, 1824, 28, 17, 5, 29, 15, 13, 2856, 20, 6, 5, 20, -1, 5, 13, 32, 4, 6, 31, 17, 26, 28, -1, 4, 0, 26, 8, 0, 9, 8016, 15, 13, 2856, 20, 6, 5, 8, 0, 9, 8127, 14, 20, -1, 5, 13, 2520, 24, -8, 5, 13, 4564, 24, -13, 17, 26, 50, 8149, 25, 8, 0, 9, 8185, 36, 0, 30, 53, 0, -1, 0, 18, 2, 1, 2, 3, 20, -1, 3, 15, 13, 2856, 20, 6, 5, 20, -1, 2, 17, 26, 13, 564, 36, -21, 12, 8, 0, 9, 8184, 14, 20, -1, 5, 13, 2520, 24, -8, 5, 13, 3104, 12, -10, 17, 26, 50, 8206, 25, 8, 0, 9, 8249, 36, 0, 30, 54, 0, -1, 0, 18, 0, 1, 37, 0, 15, 13, 2856, 20, 6, 17, 26, 37, 0, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 17, 26, 13, 564, 36, -21, 12, 8, 0, 9, 8248, 14, 20, -1, 5, 13, 2520, 24, -8, 5, 13, 3692, 40, -17, 17, 26, 50, 8270, 25, 8, 0, 9, 8308, 36, 0, 30, 55, 0, -1, 0, 18, 2, 1, 2, 3, 20, -1, 3, 20, -1, 2, 36, 2, 15, 13, 2160, 28, 5, 5, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 8307, 14, 20, -1, 5, 13, 2520, 24, -8, 5, 13, 4156, 44, -13, 17, 26, 50, 8329, 25, 8, 0, 9, 8503, 36, 0, 30, 56, 0, -1, 0, 18, 2, 1, 2, 3, 15, 13, 4448, 8, -1, 5, 13, 120, 20, 19, 5, 8, 0, 47, 9, 8362, 21, 8, 0, 9, 8502, 1, 8473, 20, -1, 3, 13, 508, 16, 9, 5, 50, 1, 49, 0, -1, 4, 20, -1, 3, 20, -1, 4, 5, 0, -1, 5, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 5, 20, -1, 2, 5, 34, 9, 8437, 20, 0, 38, 20, 0, 37, 36, 2, 2, 13, 2076, 20, -9, 5, 48, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 5, 20, -1, 2, 17, 26, 20, -1, 3, 20, -1, 5, 36, 2, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 5, 20, -1, 2, 5, 13, 3636, 8, -4, 5, 29, 26, 19, 8469, 8, 0, 9, 8493, 0, -1, 6, 20, -1, 6, 13, 728, 20, -15, 36, 2, 2, 13, 1656, 20, 5, 5, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 8502, 14, 20, -1, 5, 13, 2520, 24, -8, 5, 13, 2160, 28, 5, 17, 26, 36, 0, 20, -1, 5, 48, 0, -1, 39, 20, -1, 39, 0, -1, 40, 13, 2204, 8, 11, 50, 8, 13, 792, 8, -5, 50, 7, 13, 1448, 8, -8, 50, 6, 13, 3868, 8, 12, 50, 5, 13, 4140, 16, 4, 50, 4, 13, 4240, 12, -18, 50, 3, 13, 1112, 12, 21, 50, 2, 13, 1360, 12, -1, 50, 1, 13, 164, 12, 16, 50, 0, 37, 9, 0, -1, 41, 37, 0, 0, -1, 42, 13, 4024, 16, -11, 13, 760, 12, 18, 50, 62, 13, 1224, 8, -7, 50, 61, 13, 1264, 8, -20, 50, 60, 37, 3, 13, 2148, 12, 4, 13, 3616, 20, -11, 50, 53, 13, 2360, 16, -6, 50, 52, 13, 268, 8, 9, 50, 51, 13, 2148, 12, 4, 50, 50, 37, 4, 13, 4200, 12, -8, 13, 3372, 12, 11, 50, 41, 13, 1748, 8, -5, 50, 40, 37, 2, 13, 1740, 8, 8, 13, 684, 8, -1, 50, 30, 37, 1, 13, 1764, 4, 19, 13, 1224, 8, -7, 50, 21, 13, 1264, 8, -20, 50, 20, 37, 2, 13, 4604, 16, 22, 13, 1560, 16, 11, 50, 13, 13, 760, 12, 18, 50, 12, 13, 1224, 8, -7, 50, 11, 13, 1264, 8, -20, 50, 10, 37, 4, 13, 1628, 12, 17, 13, 36, 8, -2, 50, 3, 13, 760, 12, 18, 50, 2, 13, 228, 8, -13, 50, 1, 13, 3820, 12, 4, 50, 0, 37, 4, 37, 7, 0, -1, 43, 13, 4520, 20, 9, 20, -1, 43, 13, 1628, 12, 17, 5, 13, 36, 8, -2, 5, 13, 2324, 16, 9, 20, -1, 43, 13, 1628, 12, 17, 5, 13, 760, 12, 18, 5, 13, 3924, 16, 19, 20, -1, 43, 13, 1628, 12, 17, 5, 13, 228, 8, -13, 5, 13, 140, 24, -10, 20, -1, 43, 13, 1628, 12, 17, 5, 13, 3820, 12, 4, 5, 37, 4, 0, -1, 44, 13, 4772, 16, -5, 20, -1, 43, 13, 4604, 16, 22, 5, 13, 1560, 16, 11, 5, 13, 1272, 20, 8, 20, -1, 43, 13, 4604, 16, 22, 5, 13, 760, 12, 18, 5, 13, 4356, 12, 14, 20, -1, 43, 13, 4604, 16, 22, 5, 13, 1224, 8, -7, 5, 13, 636, 12, -2, 20, -1, 43, 13, 4604, 16, 22, 5, 13, 1264, 8, -20, 5, 37, 4, 0, -1, 45, 13, 1052, 24, -12, 20, -1, 43, 13, 1764, 4, 19, 5, 13, 1224, 8, -7, 5, 13, 4128, 12, -5, 20, -1, 43, 13, 1764, 4, 19, 5, 13, 1264, 8, -20, 5, 37, 2, 0, -1, 46, 13, 2712, 32, -17, 20, -1, 43, 13, 1740, 8, 8, 5, 13, 684, 8, -1, 5, 37, 1, 0, -1, 47, 13, 236, 12, 10, 20, -1, 43, 13, 4200, 12, -8, 5, 13, 3372, 12, 11, 5, 13, 1440, 8, 22, 20, -1, 43, 13, 4200, 12, -8, 5, 13, 1748, 8, -5, 5, 37, 2, 0, -1, 48, 13, 712, 16, 0, 20, -1, 43, 13, 2148, 12, 4, 5, 13, 3616, 20, -11, 5, 13, 1680, 60, -21, 20, -1, 43, 13, 2148, 12, 4, 5, 13, 2360, 16, -6, 5, 13, 3544, 8, 2, 20, -1, 43, 13, 2148, 12, 4, 5, 13, 268, 8, 9, 5, 13, 1472, 8, -5, 20, -1, 43, 13, 2148, 12, 4, 5, 13, 2148, 12, 4, 5, 37, 4, 0, -1, 49, 13, 4004, 20, 10, 20, -1, 43, 13, 4024, 16, -11, 5, 13, 760, 12, 18, 5, 13, 3732, 12, -5, 20, -1, 43, 13, 4024, 16, -11, 5, 13, 1224, 8, -7, 5, 13, 3588, 20, 10, 20, -1, 43, 13, 4024, 16, -11, 5, 13, 1264, 8, -20, 5, 37, 3, 0, -1, 50, 13, 3468, 12, 7, 50, 9149, 25, 8, 0, 9, 9234, 36, 0, 30, 57, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 50, 20, -1, 2, 5, 0, -1, 4, 6, 0, -1, 5, 50, 9182, 25, 8, 0, 9, 9229, 36, 0, 30, 58, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 18, 29, 52, 57, 5, 26, 20, 57, 5, 20, 57, 4, 36, 2, 20, 57, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 9228, 14, 8, 0, 9, 9233, 14, 13, 2712, 32, -17, 50, 9245, 25, 8, 0, 9, 9325, 36, 0, 30, 59, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 47, 20, -1, 2, 5, 0, -1, 4, 50, 9274, 25, 8, 0, 9, 9320, 36, 0, 30, 60, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 17, 29, 0, -1, 3, 20, -1, 3, 20, 59, 4, 36, 2, 20, 59, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 9319, 14, 8, 0, 9, 9324, 14, 13, 4792, 20, 8, 50, 9336, 25, 8, 0, 9, 9416, 36, 0, 30, 61, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 48, 20, -1, 2, 5, 0, -1, 4, 50, 9365, 25, 8, 0, 9, 9411, 36, 0, 30, 62, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 16, 29, 0, -1, 3, 20, -1, 3, 20, 61, 4, 36, 2, 20, 61, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 9410, 14, 8, 0, 9, 9415, 14, 13, 1472, 8, -5, 50, 9427, 25, 8, 0, 9, 9512, 36, 0, 30, 63, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 49, 20, -1, 2, 5, 0, -1, 4, 6, 0, -1, 5, 50, 9460, 25, 8, 0, 9, 9507, 36, 0, 30, 64, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 15, 29, 52, 63, 5, 26, 20, 63, 5, 20, 63, 4, 36, 2, 20, 63, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 9506, 14, 8, 0, 9, 9511, 14, 13, 4340, 16, 18, 50, 9523, 25, 8, 0, 9, 9608, 36, 0, 30, 65, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 46, 20, -1, 2, 5, 0, -1, 4, 6, 0, -1, 5, 50, 9556, 25, 8, 0, 9, 9603, 36, 0, 30, 66, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 13, 29, 52, 65, 5, 26, 20, 65, 5, 20, 65, 4, 36, 2, 20, 65, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 9602, 14, 8, 0, 9, 9607, 14, 13, 176, 12, 12, 50, 9619, 25, 8, 0, 9, 9704, 36, 0, 30, 67, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 44, 20, -1, 2, 5, 0, -1, 4, 6, 0, -1, 5, 50, 9652, 25, 8, 0, 9, 9699, 36, 0, 30, 68, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 14, 29, 52, 67, 5, 26, 20, 67, 5, 20, 67, 4, 36, 2, 20, 67, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 9698, 14, 8, 0, 9, 9703, 14, 13, 1088, 12, 9, 50, 9715, 25, 8, 0, 9, 9800, 36, 0, 30, 69, 0, -1, 0, 18, 2, 1, 2, 3, 20, 0, 45, 20, -1, 2, 5, 0, -1, 4, 6, 0, -1, 5, 50, 9748, 25, 8, 0, 9, 9795, 36, 0, 30, 70, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 12, 29, 52, 69, 5, 26, 20, 69, 5, 20, 69, 4, 36, 2, 20, 69, 3, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 9794, 14, 8, 0, 9, 9799, 14, 37, 7, 0, -1, 51, 13, 1232, 20, 21, 50, 1, 50, 7, 4, 13, 4396, 36, 22, 50, 1, 50, 6, 4, 13, 3120, 28, 10, 50, 1, 50, 5, 4, 13, 4040, 16, 1, 50, 1, 50, 4, 4, 13, 1324, 16, 8, 50, 1, 50, 3, 4, 13, 2752, 16, 17, 50, 1, 50, 2, 4, 13, 3800, 20, -8, 50, 1, 50, 1, 4, 13, 4504, 16, 14, 50, 1, 50, 0, 4, 37, 8, 0, -1, 52, 13, 3372, 12, 11, 50, 1, 13, 1748, 8, -5, 50, 0, 37, 2, 0, -1, 53, 50, 16, 0, -1, 54, 50, 150, 50, 1000, 22, 0, -1, 55, 13, 4200, 12, -8, 50, 1, 50, 5, 4, 13, 1740, 8, 8, 50, 1, 50, 4, 4, 13, 2148, 12, 4, 50, 1, 50, 3, 4, 13, 1628, 12, 17, 50, 1, 50, 2, 4, 13, 748, 8, 20, 50, 1, 50, 1, 4, 13, 4024, 16, -11, 50, 1, 50, 0, 4, 37, 6, 0, -1, 56, 50, 9978, 25, 8, 0, 9, 10223, 36, 0, 30, 71, 0, -1, 0, 18, 0, 1, 15, 0, -1, 2, 50, 9999, 25, 8, 0, 9, 10159, 36, 0, 30, 72, 0, -1, 0, 18, 1, 1, 2, 50, 10017, 25, 8, 0, 9, 10137, 36, 0, 30, 73, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 13, 2816, 8, 17, 5, 13, 192, 36, -21, 47, 9, 10127, 50, 0, 0, -1, 3, 20, -1, 3, 20, -1, 2, 13, 1576, 28, 4, 5, 13, 508, 16, 9, 5, 16, 9, 10127, 20, -1, 2, 13, 1576, 28, 4, 5, 20, -1, 3, 5, 0, -1, 4, 20, -1, 4, 13, 3208, 16, 5, 5, 13, 4212, 8, 5, 12, 13, 0, 20, -7, 5, 47, 9, 10118, 20, -1, 4, 36, 1, 20, 71, 2, 13, 3260, 96, -18, 5, 29, 26, 28, -1, 3, 0, 26, 8, 0, 9, 10048, 13, 564, 36, -21, 12, 8, 0, 9, 10136, 14, 36, 1, 20, -1, 2, 13, 2028, 12, 15, 5, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 10158, 14, 36, 1, 13, 440, 56, -12, 12, 48, 15, 13, 3672, 12, -2, 17, 26, 13, 2940, 12, 18, 8, 1, 13, 192, 36, -21, 8, 1, 37, 2, 13, 4292, 36, -17, 12, 13, 1292, 16, -13, 5, 36, 2, 15, 13, 3672, 12, -2, 5, 13, 2924, 12, 3, 5, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 10222, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 2212, 44, 19, 17, 26, 50, 10244, 25, 8, 0, 9, 10390, 36, 0, 30, 74, 0, -1, 0, 18, 0, 1, 37, 0, 0, -1, 2, 15, 13, 4448, 8, -1, 5, 13, 1508, 4, 1, 5, 36, 1, 13, 3744, 12, 21, 12, 13, 4368, 8, -4, 5, 29, 0, -1, 3, 50, 0, 0, -1, 4, 20, -1, 4, 20, -1, 3, 13, 508, 16, 9, 5, 16, 9, 10382, 20, -1, 3, 20, -1, 4, 5, 0, -1, 5, 20, -1, 5, 15, 13, 4448, 8, -1, 5, 13, 2648, 20, 12, 5, 7, 9, 10373, 15, 13, 4448, 8, -1, 5, 13, 2648, 20, 12, 5, 20, -1, 5, 5, 0, -1, 6, 15, 13, 4448, 8, -1, 5, 13, 1508, 4, 1, 5, 20, -1, 5, 5, 20, -1, 2, 20, -1, 6, 17, 26, 28, -1, 4, 0, 26, 8, 0, 9, 10291, 20, -1, 2, 8, 0, 9, 10389, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 1124, 80, -18, 17, 26, 50, 10411, 25, 8, 0, 9, 10565, 36, 0, 30, 75, 0, -1, 0, 18, 1, 1, 2, 15, 13, 4448, 8, -1, 5, 13, 1508, 4, 1, 5, 34, 9, 10450, 37, 0, 15, 13, 4448, 8, -1, 5, 13, 1508, 4, 1, 17, 26, 15, 13, 4448, 8, -1, 5, 13, 2648, 20, 12, 5, 34, 9, 10492, 37, 0, 15, 13, 4448, 8, -1, 5, 13, 2648, 20, 12, 17, 26, 50, 0, 15, 13, 4448, 8, -1, 5, 13, 4252, 24, 17, 17, 26, 13, 4080, 48, -7, 36, 1, 20, -1, 2, 13, 1396, 36, -8, 5, 29, 0, -1, 3, 50, 0, 0, -1, 4, 20, -1, 4, 20, -1, 3, 13, 508, 16, 9, 5, 16, 9, 10555, 20, -1, 3, 20, -1, 4, 5, 36, 1, 15, 13, 2604, 44, -14, 5, 29, 26, 28, -1, 4, 0, 26, 8, 0, 9, 10515, 13, 564, 36, -21, 12, 8, 0, 9, 10564, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 3260, 96, -18, 17, 26, 50, 10586, 25, 8, 0, 9, 10709, 36, 0, 30, 76, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 36, 1, 20, 0, 6, 29, 0, -1, 3, 20, -1, 3, 15, 13, 4448, 8, -1, 5, 13, 1508, 4, 1, 5, 7, 34, 9, 10699, 20, -1, 2, 36, 1, 20, 0, 9, 29, 0, -1, 4, 20, -1, 4, 15, 13, 4448, 8, -1, 5, 13, 1508, 4, 1, 5, 20, -1, 3, 17, 26, 15, 13, 4448, 8, -1, 5, 13, 4252, 24, 17, 5, 15, 13, 4448, 8, -1, 5, 13, 2648, 20, 12, 5, 20, -1, 3, 17, 26, 50, 1, 15, 13, 4448, 8, -1, 5, 13, 4252, 24, 17, 33, 26, 13, 564, 36, -21, 12, 8, 0, 9, 10708, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 2604, 44, -14, 17, 26, 50, 10730, 25, 8, 0, 9, 11804, 36, 0, 30, 77, 0, -1, 0, 18, 1, 1, 2, 20, -1, 2, 39, 34, 9, 10751, 26, 37, 0, 52, -1, 2, 26, 13, 4792, 20, 8, 20, -1, 2, 13, 4792, 20, 8, 5, 8, 0, 11, 13, 2712, 32, -17, 20, -1, 2, 13, 2712, 32, -17, 5, 8, 0, 11, 13, 1472, 8, -5, 20, -1, 2, 13, 1472, 8, -5, 5, 8, 0, 11, 13, 176, 12, 12, 20, -1, 2, 13, 176, 12, 12, 5, 8, 0, 11, 13, 4368, 8, -4, 20, -1, 2, 13, 4368, 8, -4, 5, 8, 0, 11, 13, 3468, 12, 7, 20, -1, 2, 13, 3468, 12, 7, 5, 8, 0, 11, 37, 6, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 17, 26, 36, 0, 13, 3384, 8, 2, 12, 13, 4376, 20, -17, 5, 29, 15, 13, 4448, 8, -1, 5, 13, 4672, 24, -9, 17, 26, 15, 13, 4448, 8, -1, 5, 13, 60, 20, 11, 5, 8, 0, 47, 9, 11780, 13, 4292, 36, -17, 12, 13, 1292, 16, -13, 5, 36, 1, 51, 48, 0, -1, 3, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 3468, 12, 7, 5, 9, 11208, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 3588, 20, 10, 36, 2, 20, 0, 51, 13, 3468, 12, 7, 5, 29, 13, 3588, 20, 10, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 4004, 20, 10, 36, 2, 20, 0, 51, 13, 3468, 12, 7, 5, 29, 13, 4004, 20, 10, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 3732, 12, -5, 36, 2, 20, 0, 51, 13, 3468, 12, 7, 5, 29, 13, 3732, 12, -5, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 636, 12, -2, 36, 2, 20, 0, 51, 13, 1088, 12, 9, 5, 29, 13, 636, 12, -2, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 1272, 20, 8, 36, 2, 20, 0, 51, 13, 1088, 12, 9, 5, 29, 13, 1272, 20, 8, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 4356, 12, 14, 36, 2, 20, 0, 51, 13, 1088, 12, 9, 5, 29, 13, 4356, 12, 14, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 4772, 16, -5, 36, 2, 20, 0, 51, 13, 1088, 12, 9, 5, 29, 13, 3552, 24, 7, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 4368, 8, -4, 5, 9, 11304, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 1052, 24, -12, 36, 2, 20, 0, 51, 13, 4340, 16, 18, 5, 29, 13, 1052, 24, -12, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 4128, 12, -5, 36, 2, 20, 0, 51, 13, 4340, 16, 18, 5, 29, 13, 4128, 12, -5, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 176, 12, 12, 5, 9, 11439, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 140, 24, -10, 36, 2, 20, 0, 51, 13, 176, 12, 12, 5, 29, 13, 140, 24, -10, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 2324, 16, 9, 36, 2, 20, 0, 51, 13, 176, 12, 12, 5, 29, 13, 2324, 16, 9, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 3924, 16, 19, 36, 2, 20, 0, 51, 13, 176, 12, 12, 5, 29, 13, 3924, 16, 19, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 4792, 20, 8, 5, 9, 11535, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 1440, 8, 22, 36, 2, 20, 0, 51, 13, 4792, 20, 8, 5, 29, 13, 1440, 8, 22, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 236, 12, 10, 36, 2, 20, 0, 51, 13, 4792, 20, 8, 5, 29, 13, 236, 12, 10, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 2712, 32, -17, 5, 9, 11592, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 2712, 32, -17, 36, 2, 20, 0, 51, 13, 2712, 32, -17, 5, 29, 13, 2712, 32, -17, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 13, 1472, 8, -5, 5, 9, 11766, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 1472, 8, -5, 36, 2, 20, 0, 51, 13, 1472, 8, -5, 5, 29, 13, 1472, 8, -5, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 3544, 8, 2, 36, 2, 20, 0, 51, 13, 1472, 8, -5, 5, 29, 13, 3544, 8, 2, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 1680, 60, -21, 36, 2, 20, 0, 51, 13, 1472, 8, -5, 5, 29, 13, 1680, 60, -21, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 2160, 28, 5, 5, 13, 712, 16, 0, 36, 2, 20, 0, 51, 13, 1472, 8, -5, 5, 29, 13, 712, 16, 0, 36, 3, 20, -1, 3, 13, 1788, 36, 5, 5, 29, 26, 8, 1, 15, 13, 4448, 8, -1, 5, 13, 60, 20, 11, 17, 26, 8, 1, 15, 13, 4448, 8, -1, 5, 13, 120, 20, 19, 17, 26, 13, 564, 36, -21, 12, 8, 0, 9, 11803, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 3644, 28, -18, 17, 26, 50, 11825, 25, 8, 0, 9, 11882, 36, 0, 30, 78, 0, -1, 0, 18, 0, 1, 15, 13, 3672, 12, -2, 5, 9, 11858, 36, 0, 15, 13, 3672, 12, -2, 5, 13, 4432, 16, -6, 5, 29, 26, 8, 0, 15, 13, 4448, 8, -1, 5, 13, 120, 20, 19, 17, 26, 13, 564, 36, -21, 12, 8, 0, 9, 11881, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 628, 8, 17, 17, 26, 50, 11903, 25, 8, 0, 9, 12059, 36, 0, 30, 79, 0, -1, 0, 18, 0, 1, 37, 0, 0, -1, 2, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 5, 36, 1, 13, 3744, 12, 21, 12, 13, 4368, 8, -4, 5, 29, 0, -1, 3, 20, -1, 3, 13, 508, 16, 9, 5, 0, -1, 4, 50, 0, 0, -1, 5, 20, -1, 5, 20, -1, 4, 16, 9, 12020, 20, -1, 3, 20, -1, 5, 5, 0, -1, 6, 36, 0, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 5, 20, -1, 6, 5, 13, 4564, 24, -13, 5, 29, 20, -1, 2, 20, -1, 6, 17, 26, 28, -1, 5, 0, 26, 8, 0, 9, 11961, 15, 13, 4448, 8, -1, 5, 13, 4672, 24, -9, 5, 36, 0, 15, 13, 1124, 80, -18, 5, 29, 20, -1, 2, 36, 0, 15, 13, 320, 36, -11, 5, 29, 36, 4, 8, 0, 9, 12058, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 4564, 24, -13, 17, 26, 50, 12080, 25, 8, 0, 9, 12116, 36, 0, 30, 80, 0, -1, 0, 18, 2, 1, 2, 3, 20, -1, 3, 15, 13, 2856, 20, 6, 5, 20, -1, 2, 17, 26, 13, 564, 36, -21, 12, 8, 0, 9, 12115, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 3104, 12, -10, 17, 26, 50, 12137, 25, 8, 0, 9, 12180, 36, 0, 30, 81, 0, -1, 0, 18, 0, 1, 37, 0, 15, 13, 2856, 20, 6, 17, 26, 37, 0, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 17, 26, 13, 564, 36, -21, 12, 8, 0, 9, 12179, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 3692, 40, -17, 17, 26, 50, 12201, 25, 8, 0, 9, 12650, 36, 0, 30, 82, 0, -1, 0, 18, 2, 1, 2, 3, 15, 13, 4448, 8, -1, 5, 13, 120, 20, 19, 5, 8, 0, 47, 9, 12234, 21, 8, 0, 9, 12649, 1, 12620, 50, 10, 20, -1, 2, 36, 2, 13, 3148, 48, -20, 12, 29, 52, -1, 2, 26, 20, -1, 3, 13, 508, 16, 9, 5, 50, 1, 49, 0, -1, 4, 20, -1, 3, 20, -1, 4, 5, 0, -1, 5, 20, -1, 3, 20, -1, 3, 13, 508, 16, 9, 5, 50, 2, 49, 5, 0, -1, 6, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 5, 20, -1, 2, 5, 34, 9, 12344, 20, 0, 55, 20, 0, 54, 36, 2, 54, 13, 2076, 20, -9, 5, 48, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 5, 20, -1, 2, 17, 26, 20, -1, 2, 20, 0, 43, 13, 1740, 8, 8, 5, 13, 684, 8, -1, 5, 27, 39, 9, 12382, 26, 20, -1, 2, 20, 0, 43, 13, 4200, 12, -8, 5, 13, 1748, 8, -5, 5, 16, 9, 12442, 20, -1, 3, 50, 2, 5, 0, -1, 7, 20, -1, 7, 15, 13, 4448, 8, -1, 5, 13, 1508, 4, 1, 5, 20, -1, 6, 17, 26, 20, -1, 3, 50, 4, 5, 20, -1, 3, 50, 3, 5, 20, -1, 3, 50, 1, 5, 20, -1, 3, 50, 0, 5, 36, 4, 52, -1, 3, 26, 20, -1, 3, 13, 508, 16, 9, 5, 50, 1, 49, 52, -1, 4, 26, 20, -1, 3, 20, -1, 4, 5, 15, 13, 4448, 8, -1, 5, 13, 4672, 24, -9, 5, 49, 20, -1, 3, 20, -1, 4, 17, 26, 20, -1, 3, 13, 508, 16, 9, 5, 50, 2, 49, 0, -1, 8, 15, 13, 4448, 8, -1, 5, 13, 2648, 20, 12, 5, 20, -1, 6, 5, 0, -1, 9, 20, -1, 9, 20, -1, 3, 20, -1, 8, 17, 26, 15, 13, 4448, 8, -1, 5, 13, 1508, 4, 1, 5, 20, -1, 6, 5, 0, -1, 10, 20, -1, 10, 34, 9, 12556, 21, 8, 0, 9, 12649, 20, -1, 10, 50, 0, 5, 0, -1, 11, 20, -1, 11, 20, 0, 41, 13, 792, 8, -5, 5, 47, 9, 12584, 21, 8, 0, 9, 12649, 20, -1, 3, 20, -1, 5, 36, 2, 15, 13, 4448, 8, -1, 5, 13, 2304, 20, -7, 5, 20, -1, 2, 5, 13, 3636, 8, -4, 5, 29, 26, 19, 12616, 8, 0, 9, 12640, 0, -1, 12, 20, -1, 12, 13, 2388, 40, -21, 36, 2, 54, 13, 1656, 20, 5, 5, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 12649, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 2160, 28, 5, 17, 26, 50, 12671, 25, 8, 0, 9, 12709, 36, 0, 30, 83, 0, -1, 0, 18, 2, 1, 2, 3, 20, -1, 3, 20, -1, 2, 36, 2, 15, 13, 2160, 28, 5, 5, 29, 26, 13, 564, 36, -21, 12, 8, 0, 9, 12708, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 3392, 52, -18, 17, 26, 50, 12730, 25, 8, 0, 9, 12899, 36, 0, 30, 84, 0, -1, 0, 18, 0, 1, 50, 0, 0, -1, 2, 15, 13, 4448, 8, -1, 5, 13, 3644, 28, -18, 5, 0, -1, 3, 20, -1, 3, 13, 3468, 12, 7, 5, 9, 12781, 20, 0, 56, 13, 4024, 16, -11, 5, 43, -1, 2, 26, 20, -1, 3, 13, 4368, 8, -4, 5, 9, 12803, 20, 0, 56, 13, 748, 8, 20, 5, 43, -1, 2, 26, 20, -1, 3, 13, 176, 12, 12, 5, 9, 12825, 20, 0, 56, 13, 1628, 12, 17, 5, 43, -1, 2, 26, 20, -1, 3, 13, 1472, 8, -5, 5, 9, 12847, 20, 0, 56, 13, 2148, 12, 4, 5, 43, -1, 2, 26, 20, -1, 3, 13, 2712, 32, -17, 5, 9, 12869, 20, 0, 56, 13, 1740, 8, 8, 5, 43, -1, 2, 26, 20, -1, 3, 13, 4792, 20, 8, 5, 9, 12891, 20, 0, 56, 13, 4200, 12, -8, 5, 43, -1, 2, 26, 20, -1, 2, 8, 0, 9, 12898, 14, 20, -1, 19, 13, 2520, 24, -8, 5, 13, 320, 36, -11, 17, 26, 36, 0, 20, -1, 19, 48, 0, -1, 57, 13, 804, 248, 11, 36, 0, 20, -1, 24, 29, 36, 0, 20, -1, 23, 29, 50, 1, 46, 36, 0, 20, -1, 21, 29, 50, 1, 46, 36, 6, 0, -1, 58, 6, 6, 50, 12964, 25, 8, 0, 9, 12979, 36, 0, 30, 85, 26, 18, 0, 0, 36, 0, 20, 0, 22, 29, 14, 6, 50, 12987, 25, 8, 0, 9, 13002, 36, 0, 30, 86, 26, 18, 0, 0, 36, 0, 20, 0, 20, 29, 14, 36, 5, 0, -1, 59, 36, 0, 50, 0, 44, 36, 0, 36, 3, 0, -1, 60, 20, -1, 57, 13, 800, 4, 4, 32, 20, -1, 40, 13, 188, 4, 4, 32, 20, -1, 29, 13, 3116, 4, -11, 32, 20, -1, 30, 13, 1852, 36, -17, 32, 20, -1, 29, 13, 4632, 20, 0, 32],
        _8a97b: "TFNMVExVJTVCZlVWS0w=aHdwZXZrcXA=J2dqRUNQRUdOdyU3RHIlQzIlODU=JTVFYyU1RWlHWlhkZ1k=YV9uJTNEaSU1QmZfbSU1RF8lNUUlM0ZwX2hubQ==X1JQJTVDX1FWJTVCVA==fnklN0ZtciU3RH5rJTdDfg==NSUzRDE5JTNDaGNpVyU1Qw==aQ==eCU3RH4lQzIlODF5YX4lQzIlODglQzIlODk=UiU1QlE=ZldpaiU1Qg==ZA==bV8lNUJsJTVEYg==OUNMSQ==VSU1RVNlZQ==b3JpZ2lueiU3QnlwdW5wbSVDMiU4MA==anB5bnpvcE56eXF0cl96TXQlN0Zxd2xyfg==UDVjVmJaMiUxNw==JUMyJTgwJTdEJUMyJTgybyVDMiU4MnclN0QlN0MlNjBvJUMyJTgycw==JTVCY1dfYg==WSVDMiU4MSVDMiU4MG0lQzIlODB1JTdCeiU1Qm4lN0ZxfiVDMiU4MnF+YlNlZWlhZFY=YyU1Q2UlNUVrXw==JTVEJTVFU1QlM0RQJTVDVA==cg==bWpwaV8=aQ==JUMyJThBJUMyJTgzeXolN0J+JUMyJTgzenk=a3RxbXYlN0NhJTdDJUMyJTg2eXo=YmMlNUVfb3F3dWdmcXlweWtya2l6b3V0S3RqcGp2dmo=U1hOT2I5UA==QlFRTVo=bWclN0I=WSU2MGUlNUI=bW91c2VsZWF2ZQ==JTdDfiVDMiU4M3h+JTdENzFFJTNGfg==JTNCJTNERDM=YWZmJTVEakwlNURwbA==VFlNSlc=JTVFLmgpJTI0byU1RSUzREFMSk4lMkNXRF9DSyhpJTJDVlhtbkxERElYJTNDJTNDLSU1QzhhJTJCOSU1QiU1Qi5WJTJDZCUyQiUyQyUzRmclM0ElM0YlNjBOZSU1QiU1RSUyNSUyQ18lMjBtQkttJTIwJTYwYUdvRmMlMjZPJTNFJTIwSW9lJTQwKmQqaiUzRiUyNCUzRSU1QidkQSUzQignaCUzRkJmOCUyQjhsWktsWk0lNUIlM0FGMg==d3ElQzIlODUlQzIlODElN0M=Znd1b05oJTdDZGZsaiU1Qw==c3QlQzIlODU=JTNGMEMlM0Y=eXclQzIlODZYJTdGZSVDMiU4NnMlQzIlODZ3aSU3QiVDMiU4NnolNUIlQzIlODB2JTdCdXclQzIlODU=JTVDUw==cWNoJTVFaXFTJTVDVw==LiUyQyUzQiUzRUo2MEQ=d3psb190eHA=WGNrYg==ZWdtayU1RGVnbiU1RA==byU3Q3ElQzIlODY=cyU3RA==Kg==cHg=RSUzREw5V0MlM0RRb2g=ZVdmRiU1Ql9XYWdmUUJUVFhQU0U=VFVmWVNVJTVEX2RZXyU1RQ==eSU3RG16JUMyJTgxJTVCbXRtayU3Q3d6SXR0cGp+U3pyTVlaYw==JTVEWlQ=Y3RxJTYwc2hubQ==a3Roeng=JTYwJTVDUVNVWF8lNUNUVWI=c2o=ZWw=JTVCVGY0Z2dlJTVDVWhnWA==bCU1RWNZZGw=YlphJTYwVw==OThBJTNFOCU0MA==JTVEJTYwJTYwYSU2MEprJTYwYW8=JTVEJTVDViU1QmFSXzZRJTVEQyUzRUQyNw==JTYwWQ==YyU2MFo=biU2MGlvbXQlNDBtbWptNg==JUMyJTgyJUMyJTg0JUMyJThBJUMyJTg4enolQzIlODMlQzIlODl6JUMyJTg3QUZITUw=SFRVJTVFVmolN0RxODJGJTVEVmglM0FrWmNpdG8=JTVDX18lNDBxJTYwaW9HZG5vJTYwaSU2MG0=VlRjJTNDVFAlNUQlM0ZUYVglNUVTJUMyJTg0JUMyJTg1ciVDMiU4MyVDMiU4NQ==dW0lN0NpU20lQzIlODE=c3ElQzIlODBReiVDMiU4MH51cSU3Rk4lQzIlODUlNjAlQzIlODUlN0NxJTYwJTVCWWhsJTVCJTYwWQ==dA==JTVFZ2RrJTVEaiU1Q21fJTNGJTVDbyU1Qw==VyU2MGM2UlRZcXBqb3Vmc1V6cWY=dnclQzIlODglN0J1dw==JTVEcnZuS35vb24lN0I=JTNESUJBJTNFY2VqaSUzQWFaYlpjaQ==aGpqbHNseWglN0JwdnU=QkslM0ZRTw==Wm0lNjAlNUVqbV8lNDBxJTYwaW8=YVQlNjBkWGFUUw==SSUzQUhJViU1QlZhJTNBYmFOYVYlNUMlNUIlM0NPJTYwUl9jUl8=JTQwJTVFbXBJbCU2MGg=eHc=QkIlM0RuUyU3Q3dQNQ==dGM=JTdCcHRsSSU3Q21tbHl6a2ZsWl9kZm0lNUM=UG9xeSVDMiU4MX5vcXM=U1UlNUJZS0tUWktYNmZja2dZZg==VyU1RWIlQzIlODQlQzIlODl+JUMyJTg0JUMyJTgzJTdGJUMyJTg5WSVDMiU4NSVDMiU4NCVDMiU4QSU3QiVDMiU4NCVDMiU4QSU1QnolN0YlQzIlOEF3eCVDMiU4MiU3Qg==eHp3JTdDdyU3QyVDMiU4MXhtKmNvaGcqJTVEal90ZmVpakMlNUJpaVclNUQlNUI=Y2VYaSU2MGJnJTVDYmE=b3JyVCU3RCVDMiU4MCU3QlN6cyU3QnMlN0MlQzIlODI=WmFTJTVDVWclNUNTYVVkQ09IR08lNjBzbyUzQ20lNjAlNUMlNDBnJTYwaCU2MGlveiU3RiVDMiU4MSVDMiU4NiVDMiU4NQ==dWZ5dQ==MCUzQkNOJTNBNEg=UnN6cyVDMiU4MnM=X2puZl8=JTVDT2RXVU9iVyU1RCU1Qw==Y2hfVA==eHN0JTdEJUMyJTgzeHV4dCVDMiU4MQ==WWclNUJoYyU2MF9tbg==JUMyJTg4JUMyJTgzJUMyJTg5dyU3Q3klQzIlODc=JTYwbW4=bF9wYm9zYg==a2g=YWNQYiU2MFNTJTVDWUxYUA==diU3QiVDMiU4NXN0fnd2JUMyJTg1diVDMiU4N3olQzIlODMlQzIlODljJUMyJTg0eXo=YWE=cHluJUMyJTgwJUMyJTgwJTVCbnpyZyU2MCU1RFdZJTdGdyVDMiU4NSVDMiU4NXN5dw==JTdEb35Oa35rfg==JTNBJTNCQiUzQkolM0JVQSUzQk8=JUMyJTg0dSVDMiU4NiVDMiU4N3klNUQlQzIlODIlQzIlODg=Z1g=dmFsdWU=aWpfJTYwT3RrJTYwaWo=JTYwTVMlM0FNWVE=ZFlmWmNmYVViV1k=JUMyJTgycyVDMiU4NCVDMiU4NXclNjB3JUMyJTg5WCVDMiU4MSVDMiU4NCU3Rld+dyU3RnclQzIlODAlQzIlODYlQzIlODU=JTYwfnIlQzIlODE=RTZISSUzQQ==Ql9yYw==JUMyJTgyJUMyJTg3JUMyJTg1elclQzIlODh3JUMyJTgwJUMyJTg2VCU2MFlYUXhxeXF6JUMyJTgwaWhiZ20lNUVrdyVDMiU4OHclQzIlODAlQzIlODZVJUMyJTgxJUMyJTgxJUMyJTg0diVDMiU4NQ==JTYwanNwJTVEJTVCZSU1Q2ViJTVDZA==bmt+ayU3RG9+ZmVfZGolNUJoWmVtZA==JTFCVg==WFolNjAlNUVQV1BMYVA=dHl3bA==JUMyJTg0d3UlQzIlODElQzIlODR2YXFkdWd0eGd0Rk9LSg==JUMyJTgzdiVDMiU4NHYlQzIlODVVciVDMiU4NXI=dXRuc3lqd3p1JTNBTVVQTl8=ZmJoZVZYJUMyJThBdyVDMiU4OCU3RCU3QiVDMiU4QQ==JTVCUFFOJTVDZ1NNYQ==T1AlM0ROUA==JUMyJTgxciVDMiU4NSVDMiU4MW4lN0Zybg==SDklNDA=dXMlQzIlODJTJUMyJTg0cyU3QyVDMiU4MlElN0Rycw==dg==YSU1Q2JQVVIlNUJRciU3Qg==bSU1RWxtJUMyJTgxc3hueSVDMiU4MWI=b2FoYV9wZWtqT3AlNURucA==ZmVfZGolNUJoY2VsJTVCJTVCWlRZX1AlNUQ=UyU0MEElNUVKRFg=JTVDX24lNUI=b3FkcnJ0cWQ=cHV3JTdDJTdCMyd6bHNsaiU3QjMnJTdCbCU3RiU3Qmh5bGg=cGp+aXQlN0NzT0ElM0ROJTNGRA==cHYlN0ZwTyVDMiU4MnNzJTVEJUMyJTgyJUMyJTgwdQ==S1RRWEpXSVpMSWpfJTYwYlNkVyU2MGY=X1RYUA==JTYwZ19UV2Q=VSU1Q05XUGJXTlglNURTVGc=Y1hZVmQlM0JVaQ==dSVDMiU4MHQlQzIlODZ+diU3RiVDMiU4NQ==dSU3Q3RpbHk=WVNnJTVFJTYwU2FhX2FnZVdnYg==b2klN0R3JTdGJUMyJTgwJUMyJTg4JTJDJTJCLTUlM0QlM0ElMkItJTJGSTUlMkZDam95aXV0dGtpeg==dHVidWY=ag==JUMyJTg5eiVDMiU4MQ==cW4lQzIlODFuSWtoZmJsJTVFNUZEJTNFUSUzRDdLa2ZsWl9aWGVaJTVDYw==TllhOFJmaGZ1QnV1c2pjdnVmdHIlQzIlODFRbiVDMiU4MW4=a3RxbXYlN0MlNjA=NzklM0YlM0QlMkY=JUMyJTgwcQ==c3VibWl0VG9JbnNwZWt0Y2hhbmdlZFRvdWNoZXM=JTdCbmx4JTdCbSU1RHJ2bg==diU3QiU3QyU3RndhJUMyJTgyd3glQzIlODY=JUMyJTg3enZ5ZCVDMiU4MyVDMiU4MSVDMiU4RQ==aXR6Z3FqaHFuaHA=Zg==JTVCZGFoWmdZaiU1Qw==eSU3Q3BuJUMyJTgxdiU3QyU3Qg==JTdGeld6JUMyJTgycCU3RE5sfnA="
      };
      function t(e) {
        while (e._pIvV3 !== e._clm7oyy) {
          var t = e._WPVeYNT0[e._pIvV3++];
          e._XxIqqz[t](e);
        }
      }
      e._clm7oyy = e._WPVeYNT0.length;
      t(e);
      return e._0FfFW0SCUI;
    }();
    qt = Xt.s;
    Qt = Xt.m;
    Xt.b;
    en = Xt.start;
  } catch (Kn) {
    De("ob-error", "error", "api", {
      message: Kn.message
    });
    function nn() {}
    qt = function () {
      return Promise.resolve();
    };
    Qt = {
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
    rn.call(this, de, "Invalid hCaptcha id: " + e);
  }
  function an() {
    rn.call(this, he, "No hCaptcha exists.");
  }
  function sn() {
    rn.call(this, pe, "Missing sitekey - https://docs.hcaptcha.com/configuration#javascript-api");
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
      Oe("Execute called", "hCaptcha", "info");
      tn.setData("exec", "api");
      Qt.setData("exec", "api");
      if (o) {
        n.setPromise(a);
      }
      n.onReady(n.initChallenge, t);
    } else if (e) {
      if (!o) {
        throw new on(e);
      }
      a.reject(de);
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
  function pn(e) {
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
    } catch (Kn) {
      t = "";
    }
    return t;
  }
  function dn(e, t, n) {
    this.target = e;
    this.setTargetOrigin(n);
    this.id = t;
    this.messages = [];
    this.incoming = [];
    this.waiting = [];
    this.isReady = true;
    this.queue = [];
  }
  dn.prototype._sendMessage = function (e, t) {
    var n = e instanceof HTMLIFrameElement;
    try {
      if (n) {
        e.contentWindow.postMessage(JSON.stringify(t), this.targetOrigin);
      } else {
        e.postMessage(JSON.stringify(t), this.targetOrigin);
      }
    } catch (zn) {
      Ce("messaging", zn);
      if (this.targetOrigin !== "*") {
        this.setTargetOrigin("*");
        this._sendMessage(e, t);
      }
    }
  };
  dn.prototype.setReady = function (e) {
    var t = this;
    t.isReady = e;
    if (t.isReady && t.queue.length) {
      t.queue.forEach(function (e) {
        t._sendMessage.apply(t, e);
      });
      t.clearQueue();
    }
  };
  dn.prototype.clearQueue = function () {
    this.queue = [];
  };
  dn.prototype.setID = function (e) {
    this.id = e;
  };
  dn.prototype.setTargetOrigin = function (e) {
    this.targetOrigin = "*";
  };
  dn.prototype.contact = function (e, t) {
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
  dn.prototype.listen = function (e, t) {
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
  dn.prototype.answer = function (e, t) {
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
  dn.prototype.send = function (e, t) {
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
  dn.prototype.check = function (e, t) {
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
  dn.prototype.respond = function (e) {
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
  dn.prototype.destroy = function () {
    this.clearQueue();
    this.messages = null;
    this.incoming = null;
    this.waiting = null;
    this.isReady = false;
    return null;
  };
  dn.prototype._contactPromise = function (e, t) {
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
  dn.prototype._addToQueue = function (e, t) {
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
      var r = new dn(e, t, n);
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
        Oe("postMessage handler error", "postMessage", "debug", {
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
    } catch (Zn) {
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
      return Vn({}, e);
    } else {
      return e;
    }
  }
  function Vn(e, t) {
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
        r[c] = Vn(e[c], t[c]);
      } else {
        r[c] = _n(t[c]);
      }
    }
    return r;
  }
  var xn = {
    transparent: "transparent",
    white: "#ffffff",
    black: "#000000"
  };
  var kn = {
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
  var En = "#4DE1D2";
  var Tn = "#00838F";
  var Sn = {
    mode: "light",
    grey: kn,
    primary: {
      main: Tn
    },
    secondary: {
      main: En
    },
    warn: {
      light: "#BF1722",
      main: "#BF1722",
      dark: "#9D1B1B"
    },
    text: {
      heading: kn[700],
      body: kn[700]
    }
  };
  var Rn = {
    mode: "dark",
    grey: kn,
    primary: {
      main: Tn
    },
    secondary: {
      main: En
    },
    text: {
      heading: kn[200],
      body: kn[200]
    }
  };
  function Nn(e, t) {
    if (t === "dark" && e in Rn) {
      return Rn[e];
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
      var n = e.primary || Nn("primary", t);
      var r = e.secondary || Nn("secondary", t);
      var i = e.warn || Nn("warn", t);
      var o = e.grey || Nn("grey", t);
      var a = e.text || Nn("text", t);
      return Vn({
        common: xn,
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
    return Vn(e, t || {});
  };
  var Dn = ["light", "dark", "contrast", "grey-red"];
  var Cn = new Un();
  Cn.add("contrast", {});
  Cn.add("grey-red", {
    component: {
      challenge: {
        main: {
          border: "#6a6a6a"
        }
      }
    }
  });
  function On(e, t) {
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
    var a = r + "/hcaptcha.html#frame=challenge&id=" + this.id + "&host=" + this._host + (t ? "&" + Ie(this.config) : "");
    var s = ee.Browser.supportsPST();
    this.setupParentContainer(t);
    this.chat = fn.createChat(this.$iframe.dom, e, o);
    this.chat.setReady(false);
    this._timeoutFailedToInitialize = setTimeout(function () {
      if (n.$iframe && n.$iframe.isConnected()) {
        De("Failed to initialize. Iframe attached", "error", "frame:challenge", {
          contentWindow: !!n.$iframe.dom.contentWindow,
          iframeSrc: a,
          supportsPST: s,
          customContainer: n._hasCustomContainer
        });
      } else {
        De("Failed to initialize. Iframe detached", "error", "frame:challenge");
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
  On.prototype.setupParentContainer = function (e) {
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
  On.prototype._hideIframe = function () {
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
  On.prototype._showIframe = function () {
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
  On.prototype.style = function () {
    var e = function (e) {
      var t = e.palette;
      var n = e.component;
      return Un.merge({
        main: {
          fill: t.common.white,
          border: t.grey[400]
        }
      }, n.challenge);
    }(Cn.get());
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
  On.prototype.setup = function (e) {
    return this.chat.send("create-challenge", e);
  };
  On.prototype.sendTranslation = function (e) {
    var t = {
      locale: e,
      table: mt.getTable(e) || {}
    };
    if (this.chat) {
      this.chat.send("challenge-translate", t);
    }
    this.translate();
  };
  On.prototype.translate = function () {
    this.$iframe.dom.title = mt.translate("Main content of the hCaptcha challenge");
  };
  On.prototype.isVisible = function () {
    return this._visible;
  };
  On.prototype.getDimensions = function (e, t) {
    if (this._visible) {
      return this.chat.contact("resize-challenge", {
        width: e,
        height: t
      });
    } else {
      return Promise.resolve(null);
    }
  };
  On.prototype.show = function () {
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
  On.prototype.focus = function () {
    this.$iframe.dom.focus();
  };
  On.prototype.close = function (e) {
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
  On.prototype.size = function (e, t, n) {
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
  On.prototype.position = function (e) {
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
      var p = this.height - 10 - 30;
      h = Math.max(Math.min(h, p), t);
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
  On.prototype.destroy = function () {
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
  On.prototype.setReady = function () {
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
  On.prototype.onReady = function (e) {
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
  On.prototype.onOverlayClick = function (e) {
    if (!this._hasCustomContainer) {
      this.$overlay.addEventListener("click", e);
    }
  };
  On.prototype.setData = function (e) {
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
    var s = i + "/hcaptcha.html#frame=checkbox&id=" + this.id + "&host=" + this._host + (n ? "&" + Ie(this.config) : "");
    this.chat = fn.createChat(this.$iframe.dom, t, a);
    this.chat.setReady(false);
    this._timeoutFailedToInitialize = setTimeout(function () {
      if (r.$iframe && r.$iframe.isConnected()) {
        De("Failed to initialize. Iframe attached", "error", "frame:checkbox", {
          contentWindow: !!r.$iframe.dom.contentWindow,
          iframeSrc: s
        });
      } else {
        De("Failed to initialize. Iframe detached", "error", "frame:checkbox");
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
  function Mn(e, t, n) {
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
  function Pn(e, t, n) {
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
    if (Dn.indexOf(n.theme) >= 0) {
      Cn.use(n.theme);
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
    this.challenge = new On(t, n);
    if (this.config.size === "invisible") {
      Oe("Invisible mode is set", "hCaptcha", "info");
      this.checkbox = new Mn(e, t, n);
    } else {
      this.checkbox = new Wn(e, t, n);
    }
  }
  function Fn(e) {
    if (e === "en") {
      return Promise.resolve();
    }
    var t = e + ".json";
    return new Promise(function (n, r) {
      Ct(t).then(function (n) {
        return n || Dt(t, {
          prefix: "https://newassets.hcaptcha.com/captcha/v1/ae0386bc7f5d79cadb9f362403599996bc5a4972/static/i18n"
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
  Mn.prototype.setResponse = function (e) {
    this.response = e;
    this.$iframe.dom.setAttribute("data-hcaptcha-response", e);
    if (ve.recaptchacompat !== "off") {
      this.$textArea0.dom.value = e;
    }
    this.$textArea1.dom.value = e;
  };
  Mn.prototype.reset = function () {};
  Mn.prototype.clearLoading = function () {};
  Mn.prototype.sendTranslation = function (e) {};
  Mn.prototype.status = function (e, t) {};
  Mn.prototype.tick = function () {};
  Mn.prototype.getTickLocation = function () {
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
  Mn.prototype.getOffset = function () {
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
  Mn.prototype.getBounding = function () {
    return this.$iframe.dom.getBoundingClientRect();
  };
  Mn.prototype.destroy = function () {
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
  Pn.prototype._resetTimer = function () {
    if (this._responseTimer !== null) {
      clearTimeout(this._responseTimer);
      this._responseTimer = null;
    }
  };
  Pn.prototype.initChallenge = function (e) {
    e ||= {};
    Oe("Initiate challenge", "hCaptcha", "info");
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
  Pn.prototype.getGetCaptchaManifest = function () {
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
  Pn.prototype.displayChallenge = function (e) {
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
        Oe("Challenge is displayed", "hCaptcha", "info");
        if (t.onOpen) {
          Ge(t.onOpen);
        }
      });
    }
  };
  Pn.prototype.resize = function (e, t, n) {
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
  Pn.prototype.position = function () {
    var e = this.checkbox;
    var t = this.challenge;
    if (!ee.System.mobile) {
      e.location.bounding = e.getBounding();
      t.position(e.location);
    }
  };
  Pn.prototype.reset = function () {
    Oe("Captcha Reset", "hCaptcha", "info");
    try {
      this.checkbox.reset();
      this.checkbox.setResponse("");
      this._resetTimer();
      this._resetState();
    } catch (Kn) {
      Ce("hCaptcha", Kn);
    }
  };
  Pn.prototype._resetState = function () {
    for (var e in this._state) {
      this._state[e] = false;
    }
  };
  Pn.prototype.closeChallenge = function (e) {
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
    Oe("Challenge has closed", "hCaptcha", "info", {
      event: e.event,
      response: e.response,
      message: e.message
    });
    switch (e.event) {
      case ne:
        this._state.escaped = true;
        n.reset();
        if (t.onClose) {
          Ge(t.onClose);
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
          Ge(t.onChalExpire);
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
        De("Failed to execute", "error", "hCaptcha", {
          error: o,
          event: e.event,
          message: e.message
        });
        if (this.onError) {
          Ge(this.onError, o);
        }
        if (t._promise) {
          t._promise.reject(o);
        }
        break;
      case te:
        this._state.passed = true;
        n.tick();
        if (this.onPass) {
          Ge(this.onPass, i);
        }
        if (t._promise) {
          t._promise.resolve({
            response: i,
            key: pn(this.id)
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
              Ce("global", zn);
            }
            if (t.onExpire) {
              Ge(t.onExpire);
            }
            t._responseTimer = null;
            t._state.expiredResponse = true;
          }, e.expiration * 1000);
        }
    }
    t._promise = null;
  };
  Pn.prototype.updateTranslation = function (e) {
    this.config.hl = e;
    this._langSet = true;
    if (this.checkbox) {
      this.checkbox.sendTranslation(e);
    }
    if (this.challenge) {
      this.challenge.sendTranslation(e);
    }
  };
  Pn.prototype.isLangSet = function () {
    return this._langSet;
  };
  Pn.prototype.isReady = function () {
    return this._ready;
  };
  Pn.prototype.setReady = function (e) {
    this._ready = e;
    if (this._ready) {
      var t;
      Oe("Instance is ready", "hCaptcha", "info");
      for (var n = this._listeners.length; --n > -1;) {
        t = this._listeners[n];
        this._listeners.splice(n, 1);
        t();
      }
    }
  };
  Pn.prototype.setPromise = function (e) {
    this._promise = e;
  };
  Pn.prototype.onReady = function (e) {
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
  Pn.prototype.destroy = function () {
    Oe("Captcha Destroy", "hCaptcha", "info");
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
  Pn.prototype.setSiteConfig = function (e) {
    var t = this;
    if ("ok" in e) {
      var n = e.ok.features || {};
      if (this.config.themeConfig && n.custom_theme) {
        var r = "custom-" + this.id;
        Cn.add(r, Cn.extend(Cn.active(), this.config.themeConfig));
        Cn.use(r);
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
  var An = 0;
  var jn = ["hl", "custom", "tplinks", "sitekey", "theme", "size", "tabindex", "challenge-container", "confirm-nav", "orientation", "mode"];
  function Hn(e, t) {
    if (e) {
      try {
        e.updateTranslation(t);
      } catch (zn) {
        Ce("translation", zn);
      }
    }
  }
  function Bn(e, t) {
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
  var In = {
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
            Oe("Render instance", "hCaptcha", "info");
            var a = Je(e, t);
            var s = An++ + Math.random().toString(36).substr(2);
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
            for (var l = 0; l < jn.length; l++) {
              var u = jn[l];
              if (u in a) {
                c[u] = a[u];
              }
            }
            var h = ve.endpoint;
            var p = c.sitekey;
            if (p === "78c843a4-f80d-4a14-b3e5-74b492762487") {
              h = me;
            }
            if (h === fe && ["pt-BR", "es-BR"].indexOf(navigator.language) === -1 && Math.random() < 0.001 && p && p.indexOf("-0000-0000-0000-") === -1) {
              h = me;
            }
            if (h !== fe) {
              c.endpoint = h;
            }
            c.theme = ve.theme;
            var d = window.location;
            var f = d.origin || d.protocol + "//" + d.hostname + (d.port ? ":" + d.port : "");
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
              } catch (Zn) {
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
                Oe("User initiated", "hCaptcha", "info");
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
              var b = new Pn(e, s, c);
            } catch (zn) {
              var _ = "Your browser plugins or privacy policies are blocking the hCaptcha service. Please disable them for hCaptcha.com";
              if (zn instanceof sn) {
                _ = "hCaptcha has failed to initialize. Please see the developer tools console for more information.";
                console.error(zn.message);
              }
              Ve(e, _);
              Ce("api", zn);
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
              Qt.setData("inv", c.size === "invisible");
              Qt.setData("size", c.size);
              Qt.setData("theme", et(c.themeConfig || c.theme));
              Qt.setData("pel", (e.outerHTML || "").replace(e.innerHTML, ""));
            } catch (Kn) {
              Ce("api", Kn);
            }
            (function (e, t) {
              if (t.size === "invisible") {
                return;
              }
              e.checkbox.chat.listen("checkbox-selected", function (t) {
                Oe("User initiated", "hCaptcha", "info");
                Bn(qt(), 100).finally(function () {
                  var n = t.action === "enter" ? "kb" : "m";
                  tn.setData("exec", n);
                  Qt.setData("exec", n);
                  e.onReady(e.initChallenge, t);
                }).catch(function (e) {
                  Ce("submitvm", e);
                });
              });
              e.checkbox.chat.listen("checkbox-loaded", function (n) {
                Oe("Loaded", "frame:checkbox", "info");
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
                  Fn(r).then(function () {
                    if (n) {
                      Hn(e, r);
                    } else {
                      mt.setLocale(r);
                      un.each(function (e) {
                        Hn(e, r);
                      });
                    }
                  }).catch(function (e) {
                    Ce("api", e, {
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
                Oe("Loaded", "frame:challenge", "info");
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
                Qt.setData("lpt", Date.now());
                e.closeChallenge(t);
              });
              e.challenge.chat.answer("get-url", function (e) {
                e.resolve(window.location.href);
              });
              e.challenge.chat.answer("getcaptcha-manifest", function (t) {
                t.resolve(e.getGetCaptchaManifest());
              });
              e.challenge.chat.answer("check-api", function (e) {
                Bn(qt(), 100).finally(function () {
                  e.resolve(tn.getData());
                }).catch(function (e) {
                  Ce("submitvm", e);
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
                e.resolve(Me.hasCookie("hc_accessibility"));
              });
            })(b, c);
            un.add(b);
            return s;
          }
          Ve(e, "Your browser is missing or has disabled Cross-Window Messaging. Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> or enable it for hCaptcha.com");
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
    getRespKey: pn,
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
      Oe("Set data", "hCaptcha", "info");
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
      In.nodes.each(function (r) {
        if (r.visible) {
          r.resize(e, t, n);
        }
      });
    }
    function c(e) {
      l();
      In.nodes.each(function (e) {
        if (e.visible) {
          e.position();
        }
      });
    }
    function l() {
      var e = [ee.Browser.scrollX(), ee.Browser.scrollY(), document.documentElement.clientWidth / ee.Browser.width(), Date.now()];
      tn.circBuffPush("xy", e);
      Qt.circBuffPush("xy", e);
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
        return In.render.apply(this, arguments);
      },
      remove: In.remove,
      execute: In.execute,
      reset: In.reset,
      close: In.close,
      setData: In.setData,
      getResponse: In.getResponse,
      getRespKey: In.getRespKey
    };
    yn.run(3000);
    (function (e) {
      var t = Array.prototype.slice.call(arguments, 1);
      if (Mt !== true && document.readyState !== "interactive" && document.readyState !== "loaded" && document.readyState !== "complete") {
        Ot.push({
          fn: e,
          args: t
        });
        if (Wt === false) {
          Pt();
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
        e = e || Be(c[1]);
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
          if (Xe.URL(e.assethost)) {
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
          Ge(n);
        }, 1);
      }
      if (!a) {
        a = true;
        (function () {
          var e = mt.getLocale();
          if (e === "en") {
            return;
          }
          Fn(e).then(function () {
            In.nodes.each(function (t) {
              if (t) {
                try {
                  if (!t.isLangSet()) {
                    t.updateTranslation(e);
                  }
                } catch (zn) {
                  Ce("translation", zn);
                }
              }
            });
          }).catch(function (t) {
            Ce("api", t, {
              locale: e
            });
          });
        })();
        if (r === false || r === "onload") {
          xe(In.render);
        } else if (r !== "explicit") {
          console.log("hcaptcha: invalid render parameter '" + r + "', using 'explicit' instead.");
        }
        (function () {
          try {
            tn.record();
            Qt.record();
            tn.setData("sc", ee.Browser.getScreenDimensions());
            tn.setData("or", ee.Browser.getOrientation());
            tn.setData("wi", ee.Browser.getWindowDimensions());
            tn.setData("nv", ee.Browser.interrogateNavigator());
            tn.setData("dr", document.referrer);
            Qt.setData("sc", ee.Browser.getScreenDimensions());
            Qt.setData("wi", ee.Browser.getWindowDimensions());
            Qt.setData("nv", ee.Browser.interrogateNavigator());
            Qt.setData("or", ee.Browser.getOrientation());
            Qt.setData("dr", document.referrer);
            u();
            l();
          } catch (zn) {
            Ce("motion", zn);
          }
        })();
        jt.addEventListener("resize", s);
        jt.addEventListener("scroll", c);
      }
    });
  })();
})();