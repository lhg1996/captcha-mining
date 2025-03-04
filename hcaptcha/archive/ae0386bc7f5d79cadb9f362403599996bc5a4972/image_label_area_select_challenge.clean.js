/* https://hcaptcha.com/license */
var image_label_area_select = function (t, i, e, s, o, n, h, a, r) {
  "use strict";

  function l() {
    i.Extend.self(this, i.DomComponent, "example-image");
    this.width = 0;
    this.height = 0;
    this._image = null;
    this._visible = false;
    this.$image = this.createElement(".image");
  }
  function p() {
    i.Extend.self(this, i.DomComponent, "bounding-box-example");
    this.width = 0;
    this.height = 0;
    this._visible = false;
    this.$container = this.createElement(".example-wrapper");
  }
  function c() {
    i.Extend.self(this, i.DomComponent, "challenge-prompt");
    this.state = {
      locales: null
    };
    this.width = 0;
    this.height = 0;
    this._visible = false;
    this.$copy = this.createElement("h2", ".prompt-text");
    this.$block = this.createElement(".prompt-block");
  }
  s = s && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
  n = n && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
  i.Extend.proto(l, i.DomComponent);
  l.prototype.style = function (t, i) {
    this.css({
      width: t,
      height: i,
      borderRadius: 4,
      right: 0,
      top: 0,
      position: "absolute",
      overflow: "hidden"
    });
    this.$image.css({
      opacity: this._visible ? 1 : 0
    });
    if (this._image !== null) {
      this.$image.backgroundImage(this._image, t, i, {
        cover: true,
        center: true
      });
    }
    this.width = t;
    this.height = i;
  };
  l.prototype.load = function (t) {
    var e = this;
    return i.Loader.image(t).then(function (t) {
      if (e.dom !== null) {
        e._image = t;
        e.$image.backgroundImage(e._image, e.height, e.height, {
          cover: true,
          center: true
        });
      }
    }).catch(function (t) {});
  };
  l.prototype.display = function (t) {
    this._visible = t;
    this.$image.css({
      opacity: t ? 1 : 0
    });
  };
  i.Extend.proto(p, i.DomComponent);
  p.prototype.style = function (t, i) {
    var e = this.hasExamples() ? i ? 60 : 106 : 0;
    var s = (t - (this.children.length - 1) * 5) / this.children.length;
    this.css({
      width: t,
      height: e,
      position: "absolute",
      backgroundColor: this._visible ? "#fff" : "#e6e6e6",
      overflow: "hidden",
      borderRadius: 4
    });
    this.$container.css({
      width: t,
      height: e
    });
    for (var o = -1; ++o < this.children.length;) {
      this.children[o].style(s, e);
      this.children[o].css({
        position: "absolute",
        left: o * s + o * 5
      });
    }
    this.height = e;
    this.width = t;
  };
  p.prototype.load = function (t) {
    var i;
    var e;
    var s = [];
    this.loaded = 0;
    if (Array.isArray(t) === false) {
      t = [t];
    }
    if (this.children.length > 0) {
      for (i = this.children.length; --i > -1;) {
        e = this.children[i];
        this.children.splice(i, 1);
        e.destroy();
      }
    }
    for (i = -1; ++i < t.length;) {
      e = this.initComponent(l, null, this.$container);
      s.push(e.load(t[i]));
    }
    return Promise.all(s);
  };
  p.prototype.hasExamples = function () {
    return this.children.length > 0;
  };
  p.prototype.display = function (t) {
    this._visible = t;
    this.css({
      display: this.hasExamples() ? "block" : "none",
      backgroundColor: t ? "#fff" : "#e6e6e6"
    });
    for (var i = -1; ++i < this.children.length;) {
      this.children[i].display(t);
    }
  };
  p.prototype.clear = function () {
    var t;
    var i = -1;
    if (this.children.length > 0) {
      for (i = this.children.length; --i > -1;) {
        t = this.children[i];
        this.children.splice(i, 1);
        t.destroy();
      }
    }
  };
  i.Extend.proto(c, i.DomComponent);
  c.prototype.style = function (t, i) {
    var e = i ? 14 : 16;
    var s = i ? 40 : 60;
    this.css({
      width: t,
      height: s,
      textAlign: "left",
      display: "table"
    });
    this.$copy.css({
      opacity: this._visible ? 1 : 0,
      height: s,
      verticalAlign: "middle",
      display: "table-cell",
      textAlign: "center",
      fontSize: e,
      fontWeight: 700,
      color: "#707070"
    });
    this.$block.css({
      opacity: this._visible ? 0 : 1,
      position: "absolute",
      top: s / 4,
      left: 0,
      zIndex: 5,
      width: t,
      height: s / 2,
      backgroundColor: h.Color.grey.placeholder,
      borderRadius: 4
    });
    this.width = t;
    this.height = s;
  };
  c.prototype.setLocaleDict = function (t) {
    this.state.locales = t;
  };
  c.prototype.display = function (t) {
    this._visible = t;
    this.$copy.css({
      opacity: t ? 1 : 0
    });
    this.$block.css({
      opacity: t ? 0 : 1
    });
  };
  c.prototype.setText = function () {
    var t = n.getBestTrans(this.state.locales);
    this.$copy.text(t);
  };
  var u = new Image(200, 200);
  function d() {
    i.Extend.self(this, i.DomComponent, "loading-indicator");
    this.$icon = this.createElement(".icon");
  }
  u.src = "data:image/gif;base64,R0lGODlhyADIAPQZAPb29vX19e3t7fT09Orq6vLy8u7u7vv7++np6ezs7Ovr6+jo6O/v7/r6+vj4+Pf39/Pz8/n5+fDw8PHx8fz8/P39/efn5/7+/v///+bm5gAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDM1MiwgMjAyMC8wMS8zMC0xNTo1MDozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTkwREY1NTQ4MUJFMTFFQTlBREQ5NURDNTBBRjJEQzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTkwREY1NTU4MUJFMTFFQTlBREQ5NURDNTBBRjJEQzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFOTBERjU1MjgxQkUxMUVBOUFERDk1REM1MEFGMkRDMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFOTBERjU1MzgxQkUxMUVBOUFERDk1REM1MEFGMkRDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w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";
  i.Extend.proto(d, i.DomComponent);
  d.prototype.style = function (t) {
    var i = t ? 30 : 36;
    this.css({
      width: i,
      height: i,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -i / 2,
      marginLeft: -i / 2
    });
    this.$icon.css({
      width: i,
      height: i
    });
    this.$icon.backgroundImage(u, i, i, {
      contain: true
    });
  };
  d.prototype.display = function (t) {
    this.css({
      opacity: t ? 1 : 0
    });
  };
  var y = new a.Theme();
  function g() {
    i.Extend.self(this, i.DomComponent, "image");
    this.width = 0;
    this.height = 0;
    this.state = {
      timer: null,
      visible: false
    };
    this.timer = null;
    this._image = null;
    this.loader = this.initComponent(d, null);
    this.loader.display(false);
    this.$image = this.createElement(".image");
  }
  function m(t) {
    i.Extend.self(this, i.DomComponent, "challenge-example");
    var e = this;
    function s() {
      if (e.state.active) {
        e.state.selected = !e.state.selected;
        e.emit("click");
      }
    }
    this.state = {
      active: false,
      selected: false,
      visible: false
    };
    this.image = this.initComponent(g);
    this.image.setAttribute("role", "img");
    this.image.setAttribute("aria-label", n.translate("Example image {{id}}", {
      id: t.index + 1
    }));
    this.image.setAttribute("aria-hidden", true);
    this.visible(false);
    this.addEventListener("click", s);
    this.addEventListener("enter", s);
  }
  y.add("contrast", {
    component: {
      prompt: {
        main: {
          fill: "#fff",
          text: "#000"
        }
      },
      expandButton: {
        main: {
          fill: "#000"
        }
      }
    }
  });
  y.add("grey-red", {
    component: {
      prompt: {
        main: {
          fill: "#6a6a6a"
        }
      },
      task: {
        main: {
          fill: "#fff"
        },
        selected: {
          border: "#FF0000"
        }
      },
      expandButton: {
        main: {
          fill: "#6a6a6a"
        }
      }
    }
  });
  i.Extend.proto(g, i.DomComponent);
  g.prototype.style = function (t, i, e) {
    var s = y.get().palette;
    this.css({
      width: t,
      height: i,
      borderRadius: 2,
      right: 0,
      top: 0,
      position: "absolute",
      backgroundColor: s.grey[300],
      overflow: "hidden"
    });
    this.loader.style(e);
    this.loader.css({
      zIndex: 1
    });
    this.$image.css({
      "-ms-high-contrast-adjust": "none",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 5
    });
    if (this._image !== null) {
      this.$image.backgroundImage(this._image, t, i, {
        cover: true,
        center: true
      });
    }
    this.width = t;
    this.height = i;
  };
  g.prototype.load = function (t) {
    var e = this;
    this.state.timer = setTimeout(function () {
      e.loader.display(true);
    }, 250);
    return i.Loader.image(t).then(function (t) {
      if (e.dom !== null) {
        e.loader.display(false);
        e._image = t;
        e.$image.backgroundImage(e._image, e.height, e.height, {
          cover: true,
          center: true
        });
      }
    }).catch(function (t) {}).finally(function () {
      if (e.state.timer) {
        clearTimeout(e.state.timer);
        e.state.timer = null;
      }
    });
  };
  g.prototype.visible = function (t) {
    this.state.visible = t;
    this.css({
      opacity: t ? 1 : 0
    });
  };
  g.prototype.onDestroy = function () {
    if (this.state.timer) {
      clearTimeout(this.state.timer);
      this.state.timer = null;
    }
  };
  i.Extend.proto(m, i.DomComponent);
  m.prototype.style = function (t, i) {
    this.css({
      width: t,
      height: t,
      position: "absolute",
      right: 0
    });
    this.image.style(t, t, i);
  };
  m.prototype.load = function (t) {
    return this.image.load(t);
  };
  m.prototype.visible = function (t) {
    this.state.visible = t;
    this.image.setAttribute("aria-hidden", !t);
  };
  m.prototype.displayButton = function (t) {
    this.state.active = t;
    this.css({
      cursor: t ? "pointer" : "auto"
    });
  };
  function A() {
    i.Extend.self(this, i.DomComponent, "examples");
    this.state = {
      examplesLength: 1,
      visible: false,
      size: 90,
      open: false,
      landscape: false
    };
    this.$container = this.createElement(".example-wrapper");
  }
  function f() {
    i.Extend.self(this, i.DomComponent, "challenge-prompt");
    var t = this;
    this.state = {
      visible: false,
      open: false,
      skipText: false,
      question: {}
    };
    this.$wrapper = this.createElement(".prompt-padding");
    this.$copy = this.initComponent(r.Markdown, {
      element: "h2",
      selector: ".prompt-text",
      theme: y
    }, this.$wrapper);
    this.$skip = this.$wrapper.createElement("p", ".skip");
    this.$bg = this.createElement(".prompt-bg");
    this.examples = this.initComponent(A, null);
    this.examples.on("click", function () {
      t.state.open = !t.state.open;
      var i = t.state.open ? 0 : 1;
      t.$copy.css({
        opacity: i
      });
      t.$skip.css({
        opacity: i
      });
      t.$copy.setAttribute("aria-hidden", t.state.open);
      t.$skip.setAttribute("aria-hidden", t.state.open);
      if (t.state.open) {
        t.examples.open();
      } else {
        t.examples.close();
      }
    });
  }
  function x() {
    i.Extend.self(this, i.DomComponent, "challenge-report");
    this.width = 0;
    this.height = 0;
    this.state = {
      visible: false
    };
    this.$copy = this.createElement("h2", ".report-text");
    this.$bg = this.createElement(".report-bg");
    this.$copy.setAttribute("tabindex", 0);
  }
  function v() {
    i.Extend.self(this, i.DomComponent, "challenge-header");
    this.config = {
      orientation: "portrait"
    };
    this.prompt = this.initComponent(f, null);
    this.report = this.initComponent(x, null);
    this.report.visible(false);
  }
  function b(t) {
    i.Extend.self(this, i.BaseComponent);
    this.bounding = null;
    this.dimensions = null;
    this.scale = 1;
    this._image = null;
    this._aspect = 1;
    this._visible = false;
    this._offset = 0;
    this.element = this.initComponent(o.Path);
  }
  function C() {
    i.Extend.self(this, i.BaseComponent);
    this.bounding = null;
    this._visible = false;
    this._scale = 1;
    this.image = this.initComponent(b);
    this.element = this.initComponent(o.Path);
    this.element.fillColor = "#ebebeb";
    this.element.fill = false;
  }
  i.Extend.proto(A, i.DomComponent);
  A.prototype.style = function (t, i, e, s) {
    var o;
    var n;
    var h = this.state.landscape ? 60 : s ? 70 : 90;
    this.state.size = h;
    if (!this.state.visible) {
      this.state.size = 0;
      return {
        width: 0,
        height: 0
      };
    }
    this.css({
      width: t,
      height: i,
      position: "absolute",
      top: 0,
      right: 0
    });
    for (var a = -1, r = this.state.examplesLength; ++a < r;) {
      this.children[a].style(h, s);
      n = r - 1 - a;
      o = e + (this.state.open ? h * n + n * 10 : 0);
      this.children[a].css({
        zIndex: (r - a) * 10,
        position: "absolute",
        top: e - (this.state.landscape ? 4 : 0),
        right: o,
        transition: "none"
      });
    }
    return {
      width: h,
      height: h
    };
  };
  A.prototype.load = function (t, i) {
    if (Array.isArray(t) === false) {
      t = t ? [t] : [];
    }
    if (i.orientation === "landscape") {
      this.state.landscape = true;
    }
    this.state.examplesLength = 1;
    if (t.length < this.state.examplesLength) {
      this.state.examplesLength = t.length;
    }
    var e;
    var s = [];
    var o = -1;
    if (this.children.length > 0) {
      for (o = this.children.length; --o > -1;) {
        e = this.children[o];
        this.children.splice(o, 1);
        e.destroy();
      }
    }
    for (o = -1; ++o < this.state.examplesLength;) {
      e = this.initComponent(m, {
        index: o
      }, this.$container);
      s.push(e.load(t[o]));
    }
    return Promise.all(s);
  };
  A.prototype.open = function () {
    var t;
    this.state.open = true;
    var i = this.state.examplesLength;
    for (var e = i; e--;) {
      t = i - 1 - e;
      this.children[e].visible(true);
      this.children[e].css({
        right: this.state.size * t + t * 10 + 10,
        transition: "right 0.3s cubic-bezier(0.65, 0, 0.35, 1)"
      });
    }
  };
  A.prototype.close = function () {
    this.state.open = false;
    for (var t = this.state.examplesLength; t--;) {
      if (t !== 0) {
        this.children[t].visible(false);
      }
      this.children[t].css({
        right: 10,
        transition: "right 0.25s cubic-bezier(0.33, 1, 0.68, 1)"
      });
    }
  };
  A.prototype.visible = function (t) {
    this.state.visible = t;
    this.css({
      display: t ? "block" : "none"
    });
  };
  A.prototype.getTotal = function () {
    if (this.state.visible) {
      return this.children.length;
    } else {
      return 0;
    }
  };
  i.Extend.proto(f, i.DomComponent);
  f.prototype.style = function (t, i, e, s) {
    var o = s ? 15 : 18;
    var n = s ? 12 : 14;
    var h = this.examples.state.landscape;
    var r = function (t) {
      var i = t.palette;
      var e = t.component;
      return a.Theme.merge({
        main: {
          fill: i.primary.main,
          border: i.primary.main,
          text: i.common.white
        }
      }, e.prompt);
    }(y.get());
    var l = this.examples.style(t, i, e, s);
    var p = Math.min(t - l.width - e * 3, h ? 440 : 250);
    if (this.examples.getTotal() === 0) {
      p = t - e * 2;
    }
    this.css({
      width: t,
      height: i,
      textAlign: "left",
      position: "absolute",
      top: 0
    });
    this.$wrapper.css({
      width: t - e * 2,
      height: i - e * 2,
      top: e,
      left: e,
      position: "absolute"
    });
    this.$copy.css({
      fontSize: o,
      lineHeight: "normal",
      fontWeight: "normal",
      margin: 0,
      width: p,
      color: r.main.text,
      verticalAlign: "top",
      display: "table-cell",
      position: "absolute",
      zIndex: 5,
      transition: "opacity 0.3s cubic-bezier(0.65, 0, 0.35, 1)"
    });
    this.$skip.css({
      width: p,
      color: r.main.text,
      fontSize: n,
      verticalAlign: "bottom",
      display: "table-cell",
      position: "absolute",
      margin: 0,
      bottom: 0,
      zIndex: 5,
      transition: "opacity 0.3s cubic-bezier(0.65, 0, 0.35, 1)"
    });
    this.$bg.css({
      opacity: this._visible ? 0 : 1,
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: -1,
      width: t,
      height: i,
      backgroundColor: r.main.fill,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: r.main.border
    });
  };
  f.prototype.load = function (t, i, e) {
    this.state.question = t;
    this.state.skipText = e.skipText;
    this.examples.visible(true);
    this.examples.load(i, e);
  };
  f.prototype.visible = function (t) {
    this.state.visible = t;
    this.css({
      display: t ? "table" : "none"
    });
  };
  f.prototype.setCopy = function () {
    var t = this;
    this.$copy.parseText(n.getBestTrans(this.state.question));
    if (this.state.skipText) {
      this.$skip.text(n.translate("If there are None, click Skip"));
    }
    function i(t) {
      var i;
      var e;
      var s = t.offsetHeight;
      (i = t.cloneNode(false)).style.padding = "0px";
      i.style.border = "none";
      i.innerHTML = ". <br> . <br> . <br> . <br> . <br>";
      t.parentNode.insertBefore(i, t);
      e = i.offsetHeight / 4;
      t.parentNode.removeChild(i);
      return s / e;
    }
    setTimeout(function () {
      try {
        if (!t.$copy || !t.$copy.dom) {
          return;
        }
        for (var e = 0, s = t.$copy.dom, o = t.examples.state.landscape; i(s) > 2 && parseInt(s.style.fontSize) > 12 && e < 10;) {
          s.style.fontSize = parseInt(s.style.fontSize) - (o ? 2 : 1) + "px";
          e++;
        }
        for (var n = 0, h = t.$skip.dom; i(h) - 0.1 > 1 && parseInt(h.style.fontSize) > 9 && n < 10;) {
          h.style.fontSize = parseInt(h.style.fontSize) - (o ? 2 : 1) + "px";
          n++;
        }
      } catch (a) {
        console.error("failed to resize text: ", a);
      }
    }, 20);
  };
  i.Extend.proto(x, i.DomComponent);
  x.prototype.style = function (t, i, e) {
    var s = e ? 16 : 18;
    var o = y.get().palette;
    this.css({
      fontSize: s,
      width: t,
      height: i,
      textAlign: "center",
      position: "absolute",
      top: 0
    });
    this.$copy.css({
      fontSize: "inherit",
      fontWeight: "inherit",
      opacity: 1,
      height: i,
      verticalAlign: "middle",
      display: "table-cell",
      color: o.common.white,
      textAlign: "center",
      zIndex: 5
    });
    this.$bg.css({
      opacity: this._visible ? 0 : 1,
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: -1,
      width: t,
      height: i,
      backgroundColor: o.warn.main,
      borderRadius: 2
    });
    this.height = i;
    this.width = t;
  };
  x.prototype.visible = function (t) {
    this.state.visible = t;
    this.css({
      display: t ? "table" : "none"
    });
    if (t) {
      this.$copy.focus();
    }
  };
  x.prototype.setCopy = function () {
    this.$copy.text(n.translate("Please select an image to report."));
  };
  i.Extend.proto(v, i.DomComponent);
  v.prototype.style = function (t, i, e) {
    var s = e ? 90 : 110;
    if (this.config.orientation === "landscape") {
      s = 72;
    }
    this.prompt.style(t, s, i, e);
    this.report.style(t, s, e);
    this.prompt.css({
      zIndex: 0
    });
    this.css({
      position: "relative",
      display: "block",
      width: t,
      height: s,
      marginBottom: i
    });
    return {
      width: t,
      height: s
    };
  };
  v.prototype.load = function (t, i, e) {
    this.config.orientation = e.orientation;
    this.prompt.visible(true);
    this.prompt.load(t, i, e);
  };
  v.prototype.displayReport = function (t) {
    this.prompt.visible(!t);
    this.report.visible(t);
  };
  v.prototype.setCopy = function () {
    this.prompt.setCopy();
    this.report.setCopy();
  };
  i.Extend.proto(b, i.BaseComponent);
  b.prototype.load = function (t) {
    var e = this;
    return i.Loader.image(t, {
      crossOrigin: "Anonymous"
    }).then(function (t) {
      if (e.dom !== null) {
        e._image = t;
        e._aspect = t.width / t.height;
        e.size.call(e, e.areaWidth, e.areaHeight, e._offset);
      }
    });
  };
  b.prototype.getImage = function () {
    return this._image && this._image.element.dom;
  };
  b.prototype.inBounds = function (t) {
    return t.x >= this.bounding.left && t.x <= this.bounding.right && t.y >= this.bounding.top && t.y <= this.bounding.bottom;
  };
  b.prototype.size = function (t, i, e, s) {
    var o = s !== 1 ? 10 : 20;
    var n = this._aspect;
    var h = t - o;
    var a = h / n;
    if (a > i - o) {
      h = (a = i - o) * n;
    }
    var r = (t - h) / 2;
    var l = e + (i - a) / 2;
    var p = r + h;
    var c = l + a;
    var u = [{
      x: r,
      y: l
    }, {
      x: p,
      y: l
    }, {
      x: p,
      y: c
    }, {
      x: r,
      y: c
    }];
    this.element.setPoints(u);
    this.dimensions = this.element.getDimensions();
    this.bounding = this.element.getBounding();
    this.areaWidth = t;
    this.areaHeight = i;
    this.scale = this._image ? h / this._image.width : 1;
    this._offset = e || this._offset;
  };
  b.prototype.draw = function (t) {
    if (this._visible) {
      t.ctx.save();
      t.ctx.roundedRect(this.bounding.left, this.bounding.top, this.dimensions.width, this.dimensions.height, 4);
      t.ctx.clip();
      if (this._image) {
        t.ctx.drawImage(this._image.element.dom, this.bounding.left, this.bounding.top, this.dimensions.width, this.dimensions.height);
      }
      t.ctx.restore();
    }
  };
  b.prototype.display = function (t) {
    this._visible = t;
  };
  i.Extend.proto(C, i.BaseComponent);
  C.prototype.display = function (t) {
    this._visible = t;
    this.image.display(t);
  };
  C.prototype.inImageBounds = function (t) {
    return this.image.inBounds(t);
  };
  C.prototype.inBounds = function (t) {
    return t.x >= this.bounding.left && t.x <= this.bounding.right && t.y >= this.bounding.top && t.y <= this.bounding.bottom;
  };
  C.prototype.getBounding = function () {
    return this.image.bounding;
  };
  C.prototype.size = function (t, i, e, s) {
    var o = 0 + t;
    var n = e + i;
    var h = [{
      x: 0,
      y: e
    }, {
      x: o,
      y: e
    }, {
      x: o,
      y: n
    }, {
      x: 0,
      y: n
    }];
    this.element.setPoints(h);
    this.bounding = this.element.getBounding();
    this.image.size(t, i, e, s);
    this.width = t;
    this.height = i;
    this._scale = s;
  };
  C.prototype.load = function (t) {
    return this.image.load(t);
  };
  C.prototype.render = function (t) {
    var i = this.element.getPoint(0);
    t.ctx.roundedRect(i.x, i.y, this.width, this.height, 4 / t.scale);
    t.ctx.fillStyle = this.element.fillColor;
    t.ctx.fill();
    this.image.draw(t);
  };
  var w = 1 - 4 / 3 * (Math.sqrt(2) - 1);
  function k() {
    i.Extend.self(this, i.BaseComponent);
    this.shape = "pin";
    this.x = 0;
    this.y = 0;
    this.opacity = 1;
    this.tip = false;
    this.mobile = false;
    this._minimized = false;
    this.fillColor = null;
    this.width = 100;
    this.height = 50;
    this.sale = 1;
    this.pointHeight = 10;
    this.pointWidth = 15;
    this.path = this.initComponent(o.Path);
    this.path.fill = true;
    var t = {
      x: 0,
      y: 0
    };
    for (var e = 0; e < 11; e++) {
      this.path.addPoint(t);
    }
    this.path.close(true);
    this.bounding = this.path.getBounding();
  }
  function I(t, i, e, s, o, n) {
    var h = e.x - s.width / 2;
    var a = e.x + s.width / 2;
    var r = e.y - o.height - s.height;
    var l = e.y - o.height;
    var p = function (t, i, e, s, o) {
      var n = o * w;
      var h = 0;
      var a = 0;
      var r = [];
      for (var l = 0; l < 4; l++) {
        var p = {
          x: 0,
          y: 0
        };
        var c = {
          x: 0,
          y: 0
        };
        var u = {
          x: 0,
          y: 0
        };
        var d = {
          x: 0,
          y: 0
        };
        var y = {
          x: 0,
          y: 0
        };
        var g = {
          x: 0,
          y: 0
        };
        h = l < 2 ? i : t;
        a = l === 0 || l === 3 ? e : s;
        if (l === 0) {
          p.x = h - o;
          p.y = a;
          c.x = h;
          c.y = a + o;
          u.x = p.x - n;
          u.y = p.y;
          d.x = p.x + n;
          d.y = p.y;
          y.x = c.x;
          y.y = c.y - n;
          g.x = c.x;
          g.y = c.y + n;
        } else if (l === 1) {
          p.x = h;
          p.y = a - o;
          u.x = p.x;
          u.y = p.y - n;
          d.x = p.x;
          d.y = p.y + n;
          c.x = h - o;
          c.y = a;
          y.x = c.x + n;
          y.y = c.y;
          g.x = c.x - n;
          g.y = c.y;
        } else if (l === 2) {
          p.x = h + o;
          p.y = a;
          u.x = p.x + n;
          u.y = p.y;
          d.x = p.x - n;
          d.y = p.y;
          c.x = h;
          c.y = a - o;
          y.x = c.x;
          y.y = c.y + n;
          g.x = c.x;
          g.y = c.y - n;
        } else if (l === 3) {
          p.x = h;
          p.y = a + o;
          c.x = h + o;
          c.y = a;
          u.x = p.x;
          u.y = p.y + n;
          d.x = p.x;
          d.y = p.y - n;
          y.x = c.x - n;
          y.y = c.y;
          g.x = c.x + n;
          g.y = c.y;
        }
        r.push({
          point: p,
          handleIn: u,
          handleOut: d
        });
        r.push({
          point: c,
          handleIn: y,
          handleOut: g
        });
      }
      return r;
    }(h, a, r, l, i);
    var c = function (t, i, e) {
      var s = [];
      s.push({
        point: {
          x: t + e.width / 2,
          y: i
        },
        handleIn: {
          x: t + e.width / 2 + w * 4,
          y: i
        },
        handleOut: {
          x: t + e.width / 2 - w * 4,
          y: i
        }
      });
      s.push({
        point: {
          x: t,
          y: i + e.height
        },
        handleIn: {
          x: t + w * 4,
          y: i + e.height
        },
        handleOut: {
          x: t - w * 4,
          y: i + e.height
        }
      });
      s.push({
        point: {
          x: t - e.width / 2,
          y: i
        },
        handleIn: {
          x: t - e.width / 2 + w * 4,
          y: i
        },
        handleOut: {
          x: t - e.width / 2 - w * 4,
          y: i
        }
      });
      return s;
    }(e.x, l, o);
    var u = 0;
    var d = 0;
    var y = null;
    var g = Math.floor(t.getLength() / 2);
    t.forEachPoint(function (t) {
      if (u < g - 1 || u > g + 1) {
        d = u > Math.ceil(g) ? u - Math.ceil(g / 2) : u;
        y = p[d];
        t.set.apply(t, [y.point, y.handleIn, y.handleOut]);
      } else if ((y = c[d = u - (g - 1)]).handleIn) {
        t.set.apply(t, [y.point, y.handleIn, y.handleOut]);
      } else {
        t.set(y.point);
      }
      u += 1;
    }, true);
  }
  function q() {
    i.Extend.self(this, i.BaseComponent);
    this.text = null;
    this.visible = false;
    this.scale = 1;
    this.size = 12;
    this.weight = 500;
    this.typeface = "Helvetica";
    this.color = "#fff";
    this.align = "center";
    this.baseline = "middle";
    this.x = 0;
    this.y = 0;
  }
  function E(t) {
    i.Extend.self(this, i.BaseComponent);
    this.key = null;
    this.value = null;
    this.scale = 1;
    this.width = 75;
    this.height = 20;
    this.mobile = false;
    this.color = t;
    this.exhaustedColor = t.clone().saturation(0.1).lightness(0.75).getHex();
    this.hoverColor = t.clone().lightness(0.35).getHex();
    this.defaultColor = t.getHex();
    this.pin = this.initComponent(k);
    this.text = this.initComponent(q);
    this.text.display(true);
    this.pin.setFill(this.defaultColor);
    this.pin.setPoint(0, 0);
    this.x = 0;
    this.y = 0;
    this.dimensions = null;
    this.bounding = null;
    this.coords = null;
    this.placed = 0;
    this.available = 1;
    this.exhausted = false;
  }
  i.Extend.proto(k, i.BaseComponent);
  k.prototype.size = function (t, i, e) {
    this.width = t / e;
    this.height = i / e;
    this.scale = e;
    var s = 4 / e;
    var o = {
      x: this.x,
      y: this.y
    };
    var n = {
      width: this.width,
      height: this.height
    };
    var h = {
      width: this.pointWidth / e,
      height: this.pointHeight / e
    };
    I(this.path, s, o, n, h);
    this.bounding = this.path.getBounding();
  };
  k.prototype.place = function (t, i) {
    var e = t - this.x;
    var s = i - this.y;
    this.path.move(e, s);
    this.x = t;
    this.y = i;
    this.bounding = this.path.getBounding();
  };
  k.prototype.move = function (t, i) {
    this.path.move(t, i);
    this.x += t;
    this.y += i;
    this.bounding = this.path.getBounding();
  };
  k.prototype.setPoint = function (t, i) {
    this.pointWidth = t !== undefined ? t : this.pointWidth;
    this.pointHeight = i !== undefined ? i : this.pointHeight;
    var e = 4 / this.scale;
    var s = {
      x: this.x,
      y: this.y
    };
    var o = {
      width: this.width,
      height: this.height
    };
    var n = {
      width: this.pointWidth / this.scale,
      height: this.pointHeight / this.scale
    };
    I(this.path, e, s, o, n);
    this.bounding = this.path.getBounding();
  };
  k.prototype.hitTest = function (t) {
    var i = false;
    if (this.path.hitTest(t)) {
      i = {
        action: "move",
        target: this
      };
    }
    return i;
  };
  k.prototype.draw = function (t) {
    t.ctx.save();
    t.ctx.globalAlpha = this.opacity;
    this.path.fillColor = this.fillColor;
    this.path.draw(t);
    t.ctx.restore();
  };
  k.prototype.setFill = function (t) {
    this.fillColor = t;
  };
  k.prototype.minimize = function (t) {
    this.alpha = t === true ? 0.8 : 1;
  };
  i.Extend.proto(q, i.BaseComponent);
  q.prototype.set = function (t) {
    this.text = n.getBestTrans(t);
  };
  q.prototype.place = function (t) {
    this.x = t.x;
    this.y = t.y;
  };
  q.prototype.move = function (t, i) {
    this.x += t;
    this.y += i;
  };
  q.prototype.display = function (t) {
    this.visible = t;
  };
  q.prototype.draw = function (t) {
    if (this.visible) {
      t.ctx.fillStyle = this.color;
      t.ctx.textAlign = this.align;
      t.ctx.textBaseline = this.baseline;
      t.ctx.font = this.weight + " " + this.size / this.scale + "px " + this.typeface;
      t.ctx.fillText(this.text, this.x, this.y);
    }
  };
  i.Extend.proto(E, i.BaseComponent);
  E.prototype.setData = function (t) {
    this.key = t.key;
    this.value = t.value;
    this.text.set(t.value);
  };
  E.prototype.size = function (t, i, e) {
    this.pin.size(t, i, e);
    this.bounding = this.pin.bounding;
    this.text.scale = e;
    this.text.size = 14;
    this.text.weight = 600;
    this.width = t;
    this.height = i;
    this.scale = e;
  };
  E.prototype.clone = function () {
    var t = new E(this.color);
    t.parent = this;
    t.setData({
      key: this.key,
      value: this.value
    });
    t.size(this.width, this.height, this.scale);
    return t;
  };
  E.prototype.place = function (t, i) {
    this.pin.place(t, i + this.pin.height / 2);
    var e = this.pin.bounding;
    var s = e.left + (e.right - e.left) / 2;
    var o = e.top + 17 / this.scale;
    this.text.place({
      x: s,
      y: o
    });
    this.x = t;
    this.y = i;
    this.bounding = this.pin.bounding;
    this.dimensions = this.pin.dimensions;
  };
  E.prototype.getBounding = function () {
    return this.pin.bounding;
  };
  E.prototype.move = function (t) {
    if (!this.exhausted) {
      this.pin.move(t.x, t.y);
      this.text.move(t.x, t.y);
      this.x = this.pin.x;
      this.y = this.pin.y;
      this.bounding = this.pin.bounding;
      this.dimensions = this.pin.dimensions;
    }
  };
  E.prototype.hitTest = function (t) {
    return this.pin.hitTest(t);
  };
  E.prototype.render = function (t) {
    this.pin.draw(t);
    this.text.draw(t);
  };
  E.prototype.use = function () {
    this.placed += 1;
    if (this.available === this.placed) {
      this.exhausted = true;
      this.pin.setFill(this.exhaustedColor);
    }
  };
  E.prototype.replenish = function () {
    if (this.available === this.placed) {
      this.exhausted = false;
      this.pin.setFill(this.defaultColor);
    }
    this.placed -= 1;
  };
  E.prototype.hover = function (t) {
    if (!this.exhausted) {
      this.pin.setFill(t ? this.hoverColor : this.defaultColor);
    }
  };
  var S = new e.Color("#00cabf");
  var K = new e.Color("#007bbf");
  function L() {
    i.Extend.self(this, i.BaseComponent);
    this.width = 0;
    this.height = 0;
    this.scale = 1;
    this.container = this.initComponent(o.Path);
    this.coords = {
      x: 0,
      y: 0
    };
    this.active = false;
    this.visible = false;
    this.selected = null;
    this.bounding = null;
    this.dimensions = null;
    this.items = [];
  }
  i.Extend.proto(L, i.BaseComponent);
  L.prototype.inBounds = function (t) {
    return t.x >= this.bounding.left && t.x <= this.bounding.right && t.y >= this.bounding.top && t.y <= this.bounding.bottom;
  };
  L.prototype.display = function (t) {
    this.visible = t;
  };
  L.prototype.load = function (t) {
    this.active = true;
    var i;
    var e = S.blend(K, t.length);
    for (var s = 0; s < t.length; s++) {
      (i = new E(e[s])).setData(t[s]);
      i.index = this.items.length;
      this.items.push(i);
    }
  };
  L.prototype.size = function (t, i, s, o) {
    var n = o !== 1;
    var h = this.items.length;
    var a = (h - 1) * 5;
    var r = e.MathUtil.range(h, 3, 7, 50, 10);
    var l = t - r * 2;
    var p = n ? 75 : 50;
    var c = (l - a) / h;
    c = e.MathUtil.clamp(c, 50, 75);
    var u;
    var d = s + i;
    var y = r + l;
    var g = d + p;
    var m = [{
      x: r,
      y: d
    }, {
      x: y,
      y: d
    }, {
      x: y,
      y: g
    }, {
      x: r,
      y: g
    }];
    var A = r;
    var f = d + p / 2;
    for (var x = -1; ++x < h;) {
      (u = this.items[x]).size(c, 35, o);
      if (x === 0) {
        A += u.pin.width / 2 + (l - u.pin.width * h + a) / 2;
      } else if (x > 0) {
        A += u.pin.width + 5;
      }
      u.place(A, f);
    }
    this.height = p + 5;
    this.width = t;
    this.scale = o;
    this.container.setPoints(m);
    this.bounding = this.container.getBounding();
  };
  L.prototype.check = function (t) {
    var i = false;
    for (var e = false, s = this.items.length; --s > -1 && e === false;) {
      e = this.items[s].hitTest(t);
      i = this.items[s];
    }
    return e !== false && {
      action: e.action,
      target: e.target,
      tag: i
    };
  };
  L.prototype.select = function (t) {
    if (t.exhausted === false) {
      var i = t.clone();
      i.pin.setPoint(15, 10);
      i.action = "move";
      i.place(t.x, t.y + 10 / this.scale);
      return i;
    }
    return false;
  };
  L.prototype.use = function (t) {
    for (var i = this.items.length; --i > -1;) {
      if (t.key === this.items[i].key) {
        this.items[i].use();
      }
    }
  };
  L.prototype.replenish = function (t) {
    for (var i = this.items.length; --i > -1;) {
      if (this.items[i].key === t.key) {
        this.items[i].replenish();
      }
    }
    t = null;
  };
  L.prototype.hover = function (t, i) {
    for (var e = this.items.length; --e > -1;) {
      if (this.items[e].hitTest(t) && i === "over") {
        this.items[e].hover(true);
      } else {
        this.items[e].hover(false);
      }
    }
  };
  L.prototype.render = function (t) {
    for (var i = -1; ++i < this.items.length;) {
      this.items[i].render(t);
    }
    if (this.selected) {
      this.selected.render(t);
    }
  };
  var M = 1 - 4 / 3 * (Math.sqrt(2) - 1);
  function B(t) {
    i.Extend.self(this, i.BaseComponent);
    this.type = "close";
    this.cursor = "pointer";
    this.visible = false;
    this.bounding = null;
    this.x = 0;
    this.y = 0;
    this.scale = 1;
    this.radius = 2;
    this.defaultColor = "#00bcb7";
    this.bg = this.initComponent(o.Path);
    this.line0 = this.initComponent(o.Path);
    this.line1 = this.initComponent(o.Path);
    this.bg.fill = true;
    this.line0.fill = true;
    this.line1.fill = true;
    this.bg.fillColor = this.defaultColor;
    var e = {
      x: 0,
      y: 0
    };
    for (var s = 0; s < 8; s++) {
      this.bg.addPoint(e);
    }
    this.bg.close(true);
    this.line0.close(true);
    this.line1.close(true);
  }
  function O(t) {
    i.Extend.self(this, i.BaseComponent);
    this.type = "selection";
    this.shape = "bounding_box";
    this.key = null;
    this.value = null;
    this.scale = 1;
    this.complete = false;
    this.drawing = true;
    this.topRight = null;
    this.path = this.initComponent(o.Path);
    this.close = this.initComponent(B);
    this.bounding = null;
    this.path.close(true);
    this.onDestroy = this.path.destroy;
    this.path.setPoints([t, t, t, t]);
  }
  function z(t) {
    i.Extend.self(this, i.BaseComponent);
    this.type = "selection";
    this.shape = "polygon";
    this.key = null;
    this.value = null;
    this.scale = 1;
    this.drawing = true;
    this.init = false;
    this.topRight = null;
    this.complete = false;
    this.next = null;
    this.path = this.initComponent(o.Path);
    this.close = this.initComponent(B);
    this.bounding = null;
    this.length = null;
    this.onDestroy = this.path.destroy;
  }
  function R(t) {
    i.Extend.self(this, i.BaseComponent);
    this.type = "selection";
    this.shape = "point";
    this.key = null;
    this.value = null;
    this.complete = false;
    this.drawing = true;
    this.scale = 1;
    this.point = this.initComponent(o.ReticlePoint);
    this.close = this.initComponent(B);
    this.point.x = t.x;
    this.point.y = t.y;
    this.getBounding = this.getBounding.bind(this);
    this.bounding = this.getBounding();
  }
  function Q(t) {
    i.Extend.self(this, i.BaseComponent);
    this.type = "selection";
    this.shape = "point";
    this.key = null;
    this.value = null;
    this.complete = false;
    this.drawing = true;
    this.scale = 1;
    this.bounding = null;
    this.point = this.initComponent(o.Point);
    this.pin = this.initComponent(k);
    this.text = this.initComponent(q);
    this.close = this.initComponent(B);
    this.defaultColor = "#fff";
    this.hoverColor = "#00bcb7";
    this.point.x = t.x;
    this.point.y = t.y;
    this.defaultCloseColor = "#fff";
    this.hoverCloseColor = "#00bcb7";
    this.point.stroke = true;
    this.point.fill = false;
  }
  function U(t) {
    i.Extend.self(this, i.BaseComponent);
    this.scale = 1;
    this.shape = t && t.shape_type || "bounding_box";
    this.minSelections = t && t.min_shapes_per_image || 1;
    this.maxSelections = t && t.max_shapes_per_image || 4;
    this.minSize = t && t.minimum_selection_area_per_shape || 5;
    this.minPoints = t && t.min_points || 1;
    this.maxPoints = t && t.max_points || 4;
    this.autoClose = t && t.autoClose || true;
  }
  function J(t) {
    i.Extend.self(this, i.BaseComponent);
    this.scale = 1;
    this.width = 0;
    this.height = 0;
    this.key = null;
    this.config = t.task || {};
    this.orientation = t.orientation || "portrait";
    this.shape = this.config.shape_type || "bounding_box";
    this.update = {
      type: null,
      element: null,
      parent: null
    };
    this.cursor = "default";
    this.userDraw = true;
    this.area = this.initComponent(C);
    this.selections = this.initComponent(U, this.config);
    this.labels = this.initComponent(L);
  }
  function j() {
    i.Extend.self(this, i.DomComponent, "challenge-view");
    this.scale = 1;
    this._coords = {
      x: 0,
      y: 0
    };
    this._cursor = "default";
    this._lock = false;
    this._task = null;
    this.config = {
      orientation: "portrait",
      skipText: false
    };
    this.prompt = this.initComponent(c);
    this.example = this.initComponent(p);
    this.header = this.initComponent(v);
    this.canvas = this.initComponent(o.Canvas);
    this.canvas.setAttribute("tabindex", "0");
    var t = Z.bind(this);
    var e = F.bind(this);
    this.render = this.render.bind(this);
    this.canvas.addEventListener("down", t);
    this.canvas.addEventListener("move", t);
    this.canvas.addEventListener("up", t);
    this.canvas.addEventListener("out", t);
    this.addEventListener("keydown", e);
  }
  function Z(t) {
    if (!this._lock && (t.preventDefault(), t.keyNum !== 3)) {
      var i = this._task;
      var o = "default";
      var n = {
        x: Math.round(t.elementX / this.scale),
        y: Math.round(t.elementY / this.scale)
      };
      var h = {
        x: n.x,
        y: n.y
      };
      if (i) {
        var a = i.check(n);
        var r = i.area.inImageBounds(n);
        var l = i.area.inBounds(n);
        var p = i.area.image.bounding;
        if (r) {
          o = "pointer";
        }
        if (t.action === "down") {
          if (!a && i.userDraw) {
            if (r) {
              i.create(n);
            }
          } else {
            if (i.shape === "point") {
              i.selections.toggleReticle(n);
            }
            if (a === "path") {
              if (r) {
                if (i.shape === "polygon" && i.shouldClose(n)) {
                  i.setAnswer();
                } else {
                  i.draw(n, t.action, r);
                }
              }
            } else {
              i.selectUI(n);
              i.hoverOn(n);
              if (i.isUpdating() && a === "handle") {
                o = "grabbing";
                h.x = i.update.element.x;
                h.y = i.update.element.y;
              }
            }
          }
        } else if (!l && i.userDraw || t.action === "up" || t.action === "out") {
          if (i.shape === "point") {
            i.selections.toggleReticle();
          }
          if (a) {
            if (!l && s.System.mobile && a === "path" && t.action === "move") {
              i.draw({
                x: e.MathUtil.clamp(n.x, p.left, p.right),
                y: e.MathUtil.clamp(n.y, p.top, p.bottom)
              }, "move", i.area.inImageBounds(n), true);
            } else {
              if (a === "path") {
                i.draw(n, t.action, r);
              } else {
                i.releaseUI(n);
              }
              i.hoverOff(n);
            }
          }
        } else if (t.action === "move") {
          if (a) {
            if (a === "path") {
              i.draw({
                x: e.MathUtil.clamp(n.x, p.left, p.right),
                y: e.MathUtil.clamp(n.y, p.top, p.bottom)
              }, "move", r, true);
            } else {
              i.hoverOn(n);
              if (i.isUpdating()) {
                var c = {
                  x: e.MathUtil.clamp(n.x, p.left, p.right) - e.MathUtil.clamp(this._coords.x, p.left, p.right),
                  y: e.MathUtil.clamp(n.y, p.top, p.bottom) - e.MathUtil.clamp(this._coords.y, p.top, p.bottom)
                };
                if (a === "handle") {
                  o = "grabbing";
                  i.moveHandle(c);
                  h.x = i.update.element.x;
                  h.y = i.update.element.y;
                } else if (a === "selection" || a === "label") {
                  if (a === "label") {
                    c = {
                      x: n.x - this._coords.x,
                      y: n.y - this._coords.y
                    };
                  }
                  o = "move";
                  i.moveElement(c);
                }
              }
            }
          } else {
            i.hoverOff(n);
          }
        }
      }
      this._coords = n;
      if (this._cursor !== o) {
        this._cursor = o;
        this.canvas.css({
          cursor: o
        });
      }
    }
  }
  function F(t) {
    if (t.keyNum === 9 && t.shiftKey) {
      this.emit("blur");
      if (t.stopPropagation) {
        t.stopPropagation();
      }
      if (t.preventDefault) {
        t.preventDefault();
      }
    }
  }
  i.Extend.proto(B, i.BaseComponent);
  B.prototype.size = function (t, i = 1) {
    var e;
    var s;
    var o;
    var n;
    var h;
    var a;
    var r;
    var l;
    var p = 2 / i;
    var c = 12 / i;
    e = this.x;
    s = this.y;
    var u = [{
      x: h = e - (o = p) / 2,
      y: r = s - (n = c) / 2
    }, {
      x: a = e + o / 2,
      y: r
    }, {
      x: a,
      y: l = s + n / 2
    }, {
      x: h,
      y: l
    }];
    this.line0.setPoints(u);
    this.line1.setPoints(u);
    this.line0.rotate(45);
    this.line1.rotate(-45);
    var d;
    var y = this.radius / i;
    var g = t / i / 2;
    var m = function (t, i, e, s, o) {
      var n = o * M;
      var h = 0;
      var a = 0;
      var r = [];
      for (var l = 0; l < 4; l++) {
        var p = {
          x: 0,
          y: 0
        };
        var c = {
          x: 0,
          y: 0
        };
        var u = {
          x: 0,
          y: 0
        };
        var d = {
          x: 0,
          y: 0
        };
        var y = {
          x: 0,
          y: 0
        };
        var g = {
          x: 0,
          y: 0
        };
        h = l < 2 ? i : t;
        a = l === 0 || l === 3 ? e : s;
        if (l === 0) {
          p.x = h - o;
          p.y = a;
          c.x = h;
          c.y = a + o;
          u.x = p.x - n;
          u.y = p.y;
          d.x = p.x + n;
          d.y = p.y;
          y.x = c.x;
          y.y = c.y - n;
          g.x = c.x;
          g.y = c.y + n;
        } else if (l === 1) {
          p.x = h;
          p.y = a - o;
          u.x = p.x;
          u.y = p.y - n;
          d.x = p.x;
          d.y = p.y + n;
          c.x = h - o;
          c.y = a;
          y.x = c.x + n;
          y.y = c.y;
          g.x = c.x - n;
          g.y = c.y;
        } else if (l === 2) {
          p.x = h + o;
          p.y = a;
          u.x = p.x + n;
          u.y = p.y;
          d.x = p.x - n;
          d.y = p.y;
          c.x = h;
          c.y = a - o;
          y.x = c.x;
          y.y = c.y + n;
          g.x = c.x;
          g.y = c.y - n;
        } else if (l === 3) {
          p.x = h;
          p.y = a + o;
          c.x = h + o;
          c.y = a;
          u.x = p.x;
          u.y = p.y + n;
          d.x = p.x;
          d.y = p.y - n;
          y.x = c.x - n;
          y.y = c.y;
          g.x = c.x + n;
          g.y = c.y;
        }
        r.push({
          point: p,
          handleIn: u,
          handleOut: d
        });
        r.push({
          point: c,
          handleIn: y,
          handleOut: g
        });
      }
      return r;
    }(this.x - g, this.x + g, this.y - g, this.y + g, y);
    this.bg.forEachPoint(function (t) {
      d = m[t.index];
      t.set.apply(t, [d.point, d.handleIn, d.handleOut]);
      t.tolerance = i !== 1 ? 10 : 0;
    }, true);
    this.bounding = this.bg.bounding;
    this.width = t;
    this.height = t;
    this.scale = i;
  };
  B.prototype.display = function (t) {
    this.visible = t;
  };
  B.prototype.place = function (t) {
    var i = t.x - this.x;
    var e = t.y - this.y;
    this.x = t.x;
    this.y = t.y;
    this.bg.move(i, e);
    this.line0.move(i, e);
    this.line1.move(i, e);
    this.bounding = this.bg.bounding;
  };
  B.prototype.move = function (t, i) {
    this.x += t;
    this.y += i;
    this.bg.move(t, i);
    this.line0.move(t, i);
    this.line1.move(t, i);
    this.bounding = this.bg.bounding;
  };
  B.prototype.hitTest = function (t) {
    return this.bg.hitTest(t);
  };
  B.prototype.draw = function (t) {
    if (this.visible) {
      this.bg.draw(t);
      this.line0.draw(t);
      this.line1.draw(t);
    }
  };
  B.prototype.setFill = function (t, i) {
    this.bg.fillColor = t;
    if (i) {
      this.line0.fillColor = i;
      this.line1.fillColor = i;
    }
  };
  i.Extend.proto(O, i.BaseComponent);
  O.prototype.size = function (t) {
    var i = t !== 1;
    this.close.size(18, t);
    this.path.forEachPoint(function (t) {
      t.radius = 4;
      t.tolerance = i ? 50 : 10;
      t.fillColor = "#fff";
    });
    this.path.stroke = true;
    this.path.strokeColor = "rgba(255, 255, 255, 1)";
    this.path.strokeWidth = 2;
    this.path.pointRadius = 4;
    this.scale = t;
  };
  O.prototype.draw = function (t, i, e, s) {
    var o;
    if (i === "move" && (e || !e && s)) {
      this.path.forEachPoint(function (i) {
        o = {
          x: i.x,
          y: i.y
        };
        if (i.index === 1 || i.index === 2) {
          var e = t.x - o.x;
          o.x += e;
        }
        if (i.index === 2 || i.index === 3) {
          var s = t.y - o.y;
          o.y += s;
        }
        i.set(o);
      });
      this.bounding = this.path.getBounding();
    }
  };
  O.prototype.move = function (t) {
    this.path.forEachPoint(function (i) {
      i.move(t.x, t.y);
    });
    if (this.close) {
      this.close.move(t.x, t.y);
    }
    this.bounding = this.path.getBounding();
  };
  O.prototype.adjust = function (t, i, e) {
    var s;
    var o = {
      x: t.x + i.x,
      y: t.y + i.y
    };
    var n = t.next;
    var h = t.prev;
    var a = n.y === t.y ? n.x : h.x;
    var r = n.x === t.x ? n.y : h.y;
    var l = a > t.x;
    var p = r > t.y;
    if (l && o.x > a - e || !l && o.x < a + e) {
      o.x = t.x;
    }
    if (p && o.y > r - e || !p && o.y < r + e) {
      o.y = t.y;
    }
    this.path.forEachPoint(function (i) {
      s = {
        x: i.x,
        y: i.y
      };
      if (t.prev === i || t.next === i) {
        if (t.x === i.x) {
          s.x = o.x;
        }
        if (t.y === i.y) {
          s.y = o.y;
        }
      }
      i.set(s);
    });
    t.set(o);
    this.close.place(this.topRight);
    this.bounding = this.path.getBounding();
  };
  O.prototype.hover = function (t, i) {
    if (!t) {
      this.close.setFill("#00bcb7");
      this.path.strokeColor = "#fff";
      this.path.forEachPoint(function (t) {
        t.fillColor = "#fff";
      });
      return false;
    }
    var e = this.path.hitTest(i);
    var s = this.close.hitTest(i);
    this.close.setFill(s ? "#118683" : "#00bcb7");
    this.path.strokeColor = s || e && e.type === "segment" ? "#fff" : "#00bcb7";
    this.path.forEachPoint(function (t) {
      t.fillColor = s || e && (e.type !== "segment" || e.geometry !== t) ? "#fff" : "#00bcb7";
    });
    return true;
  };
  O.prototype.set = function () {
    var t = false;
    var i = {
      x: this.bounding.right,
      y: this.bounding.top
    };
    this.path.forEachPoint(function (e) {
      if (t === false || e.getDistance(i) < t.getDistance(i)) {
        t = e;
      }
    });
    this.topRight = t;
    this.close.place(this.topRight);
    this.close.display(true);
    this.bounding = this.path.getBounding();
    this.path.showPoints = true;
    this.complete = true;
    this.drawing = false;
    return false;
  };
  O.prototype.hitTest = function (t) {
    var i = false;
    var e = this.path.hitTest(t);
    if (e) {
      i = {
        element: e.type === "path" ? this : e.geometry,
        type: e.type === "path" ? "selection" : "handle"
      };
    }
    if (this.close.visible) {
      if (this.close.hitTest(t)) {
        i = {
          element: this,
          type: "close"
        };
      }
    }
    return i;
  };
  O.prototype.getCoords = function () {
    var t = [];
    this.path.forEachPoint(function (i) {
      t.push(i.x);
      t.push(i.y);
    }, true);
    return t;
  };
  O.prototype.render = function (t) {
    this.path.draw(t);
    this.close.draw(t);
  };
  O.prototype.onDestroy = function () {
    this.path = this.path.destroy();
  };
  i.Extend.proto(z, i.BaseComponent);
  z.prototype.size = function (t) {
    var i = t !== 1;
    this.close.size(18, t);
    if (this.close.visible) {
      var e = {
        x: this.topRight.x + (i ? 35 : 15),
        y: this.topRight.y - (i ? 35 : 15)
      };
      this.close.place(e);
    }
    this.path.forEachPoint(function (t) {
      t.radius = 4;
      t.tolerance = i ? 50 : 10;
      t.fillColor = "#fff";
    });
    this.path.stroke = true;
    this.path.strokeColor = "rgba(255, 255, 255, 1)";
    this.path.strokeWidth = 2;
    this.path.showPoints = true;
    this.scale = t;
  };
  z.prototype.draw = function (t, i, e) {
    var s = this.scale !== 1;
    if (this.next) {
      this.next.set(t);
    }
    if (i === "up" && e) {
      var n = t;
      if (this.init) {
        n = {
          x: this.next.x,
          y: this.next.y
        };
        this.path.addPoint(this.next);
      } else {
        this.init = true;
        var h = this.path.addPoint(t);
        this.next = new o.Segment(t);
        h.radius = 4;
        h.tolerance = s ? 50 : 10;
        h.fillColor = "#fff";
      }
      this.next = new o.Segment(n);
      this.next.radius = 4;
      this.next.tolerance = s ? 50 : 10;
      this.next.fillColor = "#fff";
      this.length = this.path.getLength();
    }
    this.bounding = this.path.getBounding();
  };
  z.prototype.move = function (t) {
    this.path.move(t.x, t.y);
    if (this.close.visible) {
      this.close.move(t.x, t.y);
    }
    this.bounding = this.path.getBounding();
  };
  z.prototype.adjust = function (t, i) {
    t.set({
      x: t.x + i.x,
      y: t.y + i.y
    });
    this.bounding = this.path.getBounding();
    if (this.close.visible) {
      var e = {
        x: this.topRight.x + 12 / this.scale,
        y: this.topRight.y - 12 / this.scale
      };
      this.close.place(e);
    }
  };
  z.prototype.set = function () {
    var t = this.scale !== 1;
    this.bounding = this.path.getBounding();
    this.length = this.path.getLength();
    this.path.close(true);
    var i = false;
    var e = {
      x: this.bounding.right,
      y: this.bounding.top
    };
    this.path.forEachPoint(function (t) {
      if (i === false || t.getDistance(e) < i.getDistance(e)) {
        i = t;
      }
    });
    this.topRight = i;
    var s = {
      x: this.topRight.x + (t ? 20 : 15),
      y: this.topRight.y - (t ? 20 : 15)
    };
    this.close.display(true);
    this.close.place(s);
    this.complete = true;
    this.drawing = false;
    return false;
  };
  z.prototype.hitTest = function (t) {
    var i = false;
    var e = this.path.hitTest(t);
    if (e) {
      i = {
        element: e.type === "path" ? this : e.geometry,
        type: e.type === "path" ? "selection" : "handle"
      };
    }
    if (this.close.visible) {
      if (this.close.hitTest(t)) {
        i = {
          element: this,
          type: "close"
        };
      }
    }
    return i;
  };
  z.prototype.getCoords = function () {
    var t = [];
    this.path.forEachPoint(function (i) {
      t.push(i.x);
      t.push(i.y);
    }, true);
    return t;
  };
  z.prototype.render = function (t) {
    this.path.draw(t);
    this.close.draw(t);
  };
  z.prototype.hover = function (t, i) {
    if (!t) {
      this.close.setFill("#00bcb7");
      this.path.strokeColor = "#fff";
      this.path.forEachPoint(function (t) {
        t.fillColor = "#fff";
      });
      return false;
    }
    var e = this.path.hitTest(i);
    var s = this.close.hitTest(i);
    this.close.setFill(s ? "#118683" : "#00bcb7");
    this.path.strokeColor = s || e && e.type === "segment" ? "#fff" : "#00bcb7";
    this.path.forEachPoint(function (t) {
      t.fillColor = s || e && (e.type !== "segment" || e.geometry !== t) ? "#fff" : "#00bcb7";
    });
    return true;
  };
  i.Extend.proto(R, i.BaseComponent);
  R.prototype.size = function (t) {
    var i = t !== 1;
    this.close.size(18, t);
    this.close.setFill(h.Color.white, h.Color.grey.selected);
    if (this.close.visible) {
      var e = {
        x: this.point.x + 21 / this.scale,
        y: this.point.y - 21 / this.scale
      };
      this.close.place(e);
    }
    this.point.fill = true;
    this.point.strokeColor = "rgba(255, 255, 255, 1)";
    this.point.radius = 5;
    this.point.tolerance = i ? 20 : 10;
    this.scale = t;
  };
  R.prototype.draw = function (t, i, e) {
    if (i === "move" && e) {
      this.point.x = t.x;
      this.point.y = t.y;
      this.bounding = this.getBounding();
    }
  };
  R.prototype.move = function (t) {
    this.point.x += t.x;
    this.point.y += t.y;
    this.bounding = this.getBounding();
    this.close.move(t.x, t.y);
  };
  R.prototype.set = function () {
    var t = {
      x: this.point.x + 21 / this.scale,
      y: this.point.y - 21 / this.scale
    };
    this.point.fill = true;
    this.point.stroke = false;
    this.close.place(t);
    this.close.display(true);
    this.bounding = this.getBounding();
    this.complete = true;
    this.drawing = false;
    return true;
  };
  R.prototype.hitTest = function (t) {
    var i = false;
    if (this.point.hitTest(t)) {
      i = {
        element: this,
        type: "selection"
      };
    }
    if (this.close.hitTest(t)) {
      i = {
        element: this,
        type: "close"
      };
    }
    return i;
  };
  R.prototype.getCoords = function () {
    return [this.point.x, this.point.y];
  };
  R.prototype.getBounding = function () {
    return {
      left: this.point.x - this.point.radius,
      right: this.point.x + this.point.radius,
      top: this.point.y - this.point.radius,
      bottom: this.point.y + this.point.radius
    };
  };
  R.prototype.render = function (t) {
    this.point.draw(t);
    this.close.draw(t);
  };
  R.prototype.hover = function (t, i) {
    if (!t) {
      this.close.display(this.scale !== 1 && this.point.complete);
      this.close.setFill(h.Color.white, h.Color.grey.selected);
      this.point.hovered = false;
      return false;
    }
    var e = this.close.hitTest(i);
    if (e) {
      this.close.setFill(h.Color.grey.selected, h.Color.white);
    } else {
      this.close.setFill(h.Color.white, h.Color.grey.selected);
    }
    this.close.display(e || this.scale === 1);
    this.point.hovered = true;
    this.point.fillColor = h.Color.white;
    return true;
  };
  i.Extend.proto(Q, i.BaseComponent);
  Q.prototype.place = function (t) {
    this.point.x = t.x;
    this.point.y = t.y;
    this.pin.place(t.x, t.y - this.bounding.bottom);
    var i = this.pin.bounding;
    var e = i.top + 17 / this.scale;
    var s = 15 / this.scale;
    this.close.place({
      x: i.left + s,
      y: e
    });
    this.text.place({
      x: i.left + s + this.close.width + s,
      y: e
    });
    this.bounding = i;
  };
  Q.prototype.size = function (t) {
    this.pin.size(80, 35, t);
    var i = this.pin.bounding;
    var e = i.top + 17 / t;
    var s = 15 / t;
    this.close.size(18, t);
    this.close.place({
      x: i.left + s,
      y: e
    });
    this.text.scale = t;
    this.text.size = 14;
    this.text.weight = 600;
    this.text.place({
      x: i.left + s + this.close.width + s,
      y: e
    });
    this.point.radius = 5;
    this.point.strokeWidth = 2;
    this.scale = t;
    this.width = 80;
    this.height = 35;
    this.bounding = i;
  };
  Q.prototype.draw = function (t, i, e) {
    if (i === "move" && e) {
      this.point.x = t.x;
      this.point.y = t.y;
      this.bounding = this.pin.bounding;
    }
  };
  Q.prototype.move = function (t) {
    this.point.x = this.point.x + t.x;
    this.point.y = this.point.y + t.y;
    this.bounding = this.pin.bounding;
    this.pin.move(t.x, t.y);
    this.text.move(t.x, t.y);
    this.close.move(t.x, t.y);
  };
  Q.prototype.set = function () {
    this.close.display(true);
    this.text.display(true);
    this.bounding = this.pin.bounding;
    this.complete = true;
    this.drawing = false;
    return true;
  };
  Q.prototype.applyLabel = function (t) {
    this.key = t.key;
    this.value = t.value;
    this.text.set(t.value);
  };
  Q.prototype.applyColor = function (t) {
    this.color = t;
    this.hoverColor = t.clone().lightness(0.35).getHex();
    this.defaultColor = t.getHex();
    this.defaultCloseColor = t.clone().lightness(0.35).getHex();
    this.hoverCloseColor = t.clone().lightness(0.7).getHex();
    this.pin.setFill(this.defaultColor);
    this.close.setFill(this.defaultCloseColor);
    this.point.strokeColor = t.clone().saturation(0.6).lightness(0.9).getHex();
  };
  Q.prototype.hitTest = function (t) {
    var i = false;
    var e = this.point.hitTest(t);
    var s = this.pin.hitTest(t);
    if (e || s) {
      i = {
        element: this,
        type: "selection"
      };
    }
    if (this.close.visible) {
      if (this.close.hitTest(t)) {
        i = {
          element: this,
          type: "close"
        };
      }
    }
    return i;
  };
  Q.prototype.getCoords = function () {
    return [this.point.x, this.point.y];
  };
  Q.prototype.render = function (t) {
    this.point.draw(t);
    this.pin.draw(t);
    this.close.draw(t);
    this.text.draw(t);
  };
  Q.prototype.hover = function (t, i) {
    if (t === false) {
      this.close.setFill(this.defaultCloseColor);
      this.pin.setFill(this.defaultColor);
      return false;
    }
    var e = this.close.hitTest(i);
    this.close.setFill(e ? this.hoverCloseColor : this.defaultCloseColor);
    this.pin.setFill(e ? this.defaultColor : this.hoverColor);
    return true;
  };
  Q.prototype.minimize = function (t) {
    this._minimized = t;
    this.offset = t ? 0 : this.close.width + (this.mobile ? 10 : 0);
    this.pin.opacity = t ? 0.8 : 1;
    this.close.display(!t);
    this.text.display(!t);
    this.pin.minimize(t);
  };
  i.Extend.proto(U, i.BaseComponent);
  U.prototype.size = function (t, i) {
    for (var e = this.children.length; --e > -1;) {
      if (this.children[e].size) {
        this.children[e].size(i);
      }
    }
    this.scale = i;
  };
  U.prototype.create = function (t, i) {
    if (this.children.length < this.maxSelections) {
      var e = O;
      if (t === "polygon") {
        e = z;
      }
      if (t === "point") {
        e = R;
      }
      if (t === "pin") {
        e = Q;
      }
      var s = this.initComponent(e, i);
      s.size(this.scale);
      return s;
    }
    return null;
  };
  U.prototype.isComplete = function (t) {
    return t.shape === "bounding_box" || t.shape === "point" || (t.shape === "polygon" ? t.drawing && t.length === this.maxPoints && this.autoClose : undefined);
  };
  U.prototype.set = function (t) {
    var i = false;
    if (t.bounding) {
      if (t.shape === "bounding_box" || t.shape === "polygon") {
        var e = Math.abs(t.bounding.left - t.bounding.right);
        var s = Math.abs(t.bounding.top - t.bounding.bottom);
        if (!(i = e > this.minSize && s > this.minSize)) {
          this.remove.call(this, t);
          return true;
        }
      } else if (t.shape === "point") {
        i = true;
      }
      return !!i && (t.set(), true);
    }
  };
  U.prototype.check = function (t) {
    for (var i = this.children.length, e = false; --i > -1 && !e;) {
      if (e = this.children[i].hitTest(t)) {
        e.selection = this.children[i];
      }
    }
    return e;
  };
  U.prototype.remove = function (t) {
    for (var i = this.children.length; --i > -1;) {
      if (this.children[i] === t) {
        this.children.splice(i, 1);
      }
    }
    if (t.destroy) {
      t.destroy();
    }
    t = null;
  };
  U.prototype.minimize = function (t, i) {
    for (var e = this.children.length; --e > -1;) {
      if (this.children[e] !== i && this.children[e].minimize) {
        this.children[e].minimize(t);
      }
    }
  };
  U.prototype.getLength = function () {
    return this.children.length;
  };
  U.prototype.render = function (t) {
    for (var i = -1; ++i < this.children.length;) {
      this.children[i].render(t);
    }
  };
  U.prototype.hover = function (t, i) {
    for (var e = this.children.length, s = false; --e > -1;) {
      if (t === false) {
        this.children[e].hover(false);
      } else if (this.children[e].hitTest(i) && !s) {
        s = this.children[e].hover(t, i);
      } else {
        this.children[e].hover(false);
      }
    }
    return s;
  };
  U.prototype.toggleReticle = function (t) {
    for (var i = 0; i < this.children.length;) {
      this.children[i].point.complete = !t || !this.children[i].point.hitTest(t);
      i++;
    }
  };
  U.prototype.closeCheck = function (t) {
    for (var i = this.children.length, e = false; --i > -1 && !e;) {
      e = this.children[i].close.hitTest(t);
    }
    return e;
  };
  i.Extend.proto(J, i.BaseComponent);
  J.prototype.setAnswer = function () {
    if (this.update.element) {
      var t = this.update.element;
      if (this.selections.set(t)) {
        this.update.type = null;
        this.update.element = null;
        this.update.parent = null;
        this.emit("update");
      }
    }
  };
  J.prototype.display = function (t) {
    this.visible = t;
    this.area.display(t);
    if (this.labels.active) {
      this.labels.display(t);
    }
  };
  J.prototype.load = function (t) {
    var i = this;
    var e = t.task.datapoint_uri;
    var s = t.answers;
    this.display.call(this, false);
    var o = [this.area.load(e)];
    var n = [];
    for (var h in s) {
      n.push({
        key: h,
        value: s[h]
      });
    }
    if (n.length > 1 && n.length <= 7 && this.shape === "point") {
      o.push(this.labels.load(n));
      this.selections.on("remove", this.labels.replenish.bind(this.labels));
      this.userDraw = false;
    }
    this.key = t.task.task_key;
    this.options = n;
    return Promise.all(o).then(function () {
      i.display.call(i, true);
    });
  };
  J.prototype.size = function (t, i) {
    var e = 350;
    var s = 500;
    if (this.orientation === "landscape") {
      e = 215;
      s = 440;
    }
    var o = e;
    var n = s;
    this.area.size(n, o, t, i);
    this.selections.size(t, i);
    if (this.labels.active) {
      this.labels.size(n, o, t, i);
    }
    this.width = n;
    this.height = this.labels.active ? o + this.labels.height : o;
    this.scale = i;
  };
  J.prototype.check = function (t) {
    if (this.update.element) {
      return this.update.type;
    }
    if (this.labels.visible && this.labels.inBounds(t)) {
      return !!this.labels.check(t) && "label";
    }
    var i = this.selections.check(t);
    return !!i && (i.type !== "selection" || i.element.complete ? i.type : "path");
  };
  J.prototype.create = function (t) {
    var i = this.selections.create(this.shape, t);
    this.update = {
      type: "path",
      element: i,
      parent: null
    };
  };
  J.prototype.isUpdating = function () {
    return this.update.element !== null;
  };
  J.prototype.isDrawn = function () {
    return this.update.element !== null && this.update.element.complete;
  };
  J.prototype.draw = function (t, i, e, s) {
    var o = this.update.element;
    o.draw(t, i, e, s);
    if (i === "up" || i === "out") {
      if (this.selections.isComplete(o)) {
        this.setAnswer();
      }
    }
  };
  J.prototype.selectUI = function (t) {
    if (this.labels.visible && this.labels.inBounds(t)) {
      var i = this.labels.check(t);
      if (i) {
        var e = this.labels.select(i.tag);
        if (e) {
          this.update = {
            type: "label",
            element: e,
            parent: null
          };
          this.labels.use(i.tag);
          this.labels.hover(t, "out");
          this.selections.minimize(true);
        }
      }
    } else {
      var s = this.selections.check(t);
      if (s) {
        this.update = {
          type: s.type,
          element: s.element,
          parent: s.selection
        };
      }
    }
  };
  J.prototype.releaseUI = function (t) {
    var i = this.update.element;
    var e = this.update.parent;
    if (this.update.type === "close") {
      if (this.labels.visible) {
        this.labels.replenish(e);
        this.selections.minimize(false);
      }
      this.selections.remove(this.update.parent);
      this.emit("update");
    }
    if (this.update.type === "label") {
      var s = this.area.inBounds({
        x: i.x,
        y: i.y
      }) ? this.selections.create("pin", {
        x: i.x,
        y: i.bounding.bottom
      }) : null;
      if (s) {
        s.applyColor(i.color);
        s.applyLabel({
          key: i.key,
          value: i.value
        });
        s.place(s.point);
        this.selections.set(s);
        this.emit("update");
      } else {
        this.labels.replenish(i);
      }
      this.selections.minimize(false);
    }
    this.update.type = null;
    this.update.element = null;
    this.update.parent = null;
    this.cursor = "default";
  };
  J.prototype.moveHandle = function (t) {
    var i = this.update.element;
    var e = this.update.parent;
    var s = this.area.getBounding();
    if (t.x + i.x > s.right) {
      t.x = s.right - i.x;
    } else if (t.x + i.x < s.left) {
      t.x = s.left - i.x;
    }
    if (t.y + i.y > s.bottom) {
      t.y = s.bottom - i.y;
    } else if (t.y + i.y < s.top) {
      t.y = s.top - i.y;
    }
    e.adjust(i, t, this.selections.minSize);
  };
  J.prototype.moveElement = function (t) {
    var i = this.update.element;
    if (this.update.type === "selection") {
      var e = i.bounding;
      var s = this.area.getBounding();
      if (t.x + e.right > s.right) {
        t.x = s.right - e.right;
      } else if (t.x + e.left < s.left) {
        t.x = s.left - e.left;
      }
      if (t.y + e.bottom > s.bottom) {
        t.y = s.bottom - e.bottom;
      } else if (t.y + e.top < s.top) {
        t.y = s.top - e.top;
      }
    }
    i.move(t);
    this.cursor = "grabbing";
  };
  J.prototype.hoverOn = function (t) {
    var i = null;
    if (this.labels.visible && this.labels.inBounds(t)) {
      i = this.labels.check(t);
      this.labels.hover(t, i ? "over" : "out");
      this.cursor = "pointer";
      return true;
    }
    if (!this.area.inBounds(t)) {
      this.selections.hover(false);
      this.cursor = "default";
      return false;
    }
    var e = this.selections.hover(this.update.type !== "selection" || s.System.mobile, t);
    this.cursor = e ? "pointer" : "default";
    return this.cursor === "pointer";
  };
  J.prototype.hoverOff = function (t) {
    if (this.labels.visible) {
      this.labels.hover(t, "out");
    }
    this.selections.hover(false);
  };
  J.prototype.shouldClose = function (t) {
    var i = this.update.element.hitTest(t);
    return !!i && i.type === "handle" && i.element.index === 0;
  };
  J.prototype.getTaskImage = function (t) {
    return this.area.image;
  };
  J.prototype.prerender = function (t) {
    this.area.render(t);
  };
  J.prototype.render = function (t) {
    this.area.render(t);
    this.selections.render(t);
    if (this.labels.visible) {
      this.labels.render(t);
    }
    if (this.selection) {
      this.selection.render(t);
    }
    if (this.update.type === "label" && !this.update.element.complete) {
      this.update.element.render(t);
    }
  };
  J.prototype.getAnswers = function () {
    var t = [];
    var i = this.selections.children;
    var s = this.area.getBounding();
    var o = this.area.image.scale;
    e.TaskContext.set(this.key, [o, s.left || 0, s.top || 0]);
    for (var n = 0; n < i.length; n++) {
      for (var h = i[n].getCoords(), a = n, r = 0; r < h.length; r += 2) {
        h[r] = Math.round((h[r] - s.left) / o);
        h[r + 1] = Math.round((h[r + 1] - s.top) / o);
      }
      t.push({
        entity_name: a,
        entity_type: i[n].key || this.options[0].key,
        entity_coords: h
      });
    }
    return t;
  };
  i.Extend.proto(j, i.DomComponent);
  j.prototype.lock = function (t) {
    this._lock = t;
  };
  j.prototype.display = function (t) {
    var i = t && this.config.orientation === "portrait";
    this.prompt.display(i);
    this.example.display(i);
  };
  j.prototype.focus = function () {
    this.canvas.focus();
  };
  j.prototype.style = function (t, i) {
    var e = 0;
    var o = this.config.orientation === "landscape";
    var n = i ? (o ? t + 60 : t) / 500 : 1;
    if (o) {
      var h = this.header.style(t, 10, i);
      this.header.setCopy();
      e += h.height + 5;
    } else {
      this.prompt.style(t, i);
      e += this.prompt.height + 10;
      this.example.style(t, i);
      this.example.css({
        top: this.prompt.height + 10
      });
      e += this.example.height + 10;
    }
    this.top = e / n;
    this._task.size(this.top, n, i);
    this.canvas.css({
      position: "absolute",
      top: 0,
      cursor: this._cursor,
      zIndex: 10
    });
    e += this._task.height * n;
    this.canvas.dpr = s.System.mobile && this.canvas.dpr > 1 ? Math.round(this.canvas.dpr) : 2;
    this.canvas.scale = n;
    this.canvas.dimensions(t, e);
    this.css({
      width: t,
      height: e,
      borderRadius: 4,
      overflow: "hidden"
    });
    this.width = t;
    this.height = e;
    this.scale = n;
    this.mobile = i;
  };
  j.prototype.render = function () {
    if (this.canvas.ctx) {
      this.canvas.clear();
      if (this._task) {
        this._task.render(this.canvas);
      }
    }
  };
  j.prototype.clear = function () {
    this._task &&= this._task.destroy();
  };
  j.prototype.isEmpty = function () {
    return this._task.selections.getLength() === 0;
  };
  j.prototype.setup = function (t, i) {
    this.config = {
      orientation: i.orientation,
      skipText: t.show_skip_text
    };
  };
  j.prototype.createTask = function (t, i, e, s) {
    var o = this.config.orientation === "landscape";
    var n = this;
    var h = [];
    if (!o && !i) {
      this.example.clear();
    }
    if (this._task) {
      this._task = this._task.destroy();
    } else if (o) {
      if (this.prompt.dom) {
        this.prompt.destroy();
      }
      this.header.load(t, i, this.config);
      this.header.setCopy();
    } else {
      this.prompt.setLocaleDict(t);
      this.translate();
      if (i) {
        h.push(this.example.load(i));
      }
      this.prompt.style(this.width, this.mobile);
      this.example.style(this.width, this.mobile);
    }
    this._task = this.initComponent(J, {
      task: s,
      orientation: this.config.orientation
    });
    this._task.size(this.top, this.scale, this.mobile);
    this._task.on("update", function (t) {
      n.emit("update", !n.isEmpty());
    });
    h.push(n._task.load(e));
    return Promise.all(h).then(function () {
      n.style.call(n, n.width, n.mobile);
    });
  };
  j.prototype.getResults = function () {
    var t = this._task.getAnswers();
    return {
      key: this._task.key,
      answers: t
    };
  };
  j.prototype.translate = function () {
    if (this.config.orientation === "portrait") {
      this.prompt.setText();
    } else {
      this.header.setCopy();
    }
  };
  function G() {
    i.Extend.self(this, i.DomComponent, "challenge");
    this.type = "image_label_area_select";
    this.resolve = null;
    this.reject = null;
    this.breadcrumbs = 0;
    this.served = 0;
    this.mobile = false;
    this.orientation = "portrait";
    this._data = null;
    this._answers = Object.create(null);
    this._total = 0;
    this.syncCheckState = this.syncCheckState.bind(this);
    var t = this;
    this.view = this.initComponent(j);
    this.view.on("update", this.syncCheckState);
    this.view.on("blur", function () {
      t.emit("focus-check");
    });
    e.Render.add(this.view.render);
  }
  i.Extend.proto(G, i.DomComponent);
  G.prototype.style = function (t, i) {
    var e = this;
    this.mobile = t <= 650;
    var s = this.mobile ? 300 : 500;
    if (this.orientation === "landscape") {
      this.mobile = true;
      s = 440;
    }
    return new Promise(function (t, i) {
      e.view.style(s, e.mobile);
      e.css({
        width: s,
        height: e.view.height
      });
      t({
        width: s,
        height: e.view.height,
        mobile: e.mobile
      });
    });
  };
  G.prototype.setup = function (i, s) {
    var o = this;
    var n = this.view;
    this._data = i;
    this._total = i.tasklist.length;
    this._answers = Object.create(null);
    this.served = 0;
    this.breadcrumbs = this._total;
    this.view.clear();
    this.view.lock(true);
    this.view.display(false);
    this.emit("display-check", false);
    return new Promise(function (h, a) {
      if (i.tasklist && i.tasklist.length !== 0) {
        o.orientation = s || "portrait";
        var r = {
          task: i.tasklist[0],
          answers: i.requester_restricted_answer_set
        };
        n.setup(i, {
          orientation: s
        });
        n.createTask(i.requester_question, i.requester_question_example, r, i.request_config).then(function () {
          o.served += 1;
          e.Render.start(o.view.render);
          o.view.lock(false);
          o.view.display(true);
          o.syncCheckState();
        }).catch(function (i) {
          a({
            event: t.CaptchaError.CHALLENGE_ERROR,
            message: "Failed to setup task: " + o.served + " / " + o._total,
            reason: i
          });
        });
      } else {
        a({
          event: t.CaptchaError.CHALLENGE_ERROR,
          message: "Missing tasklist"
        });
      }
      o.resolve = h;
      o.reject = a;
    });
  };
  G.prototype.setFocus = function () {
    this.view.focus();
  };
  G.prototype.syncCheckState = function () {
    var t = function (t, i) {
      if (!t || t.tasklist && t.tasklist.length === 0) {
        return false;
      }
      for (var e = 0; e < t.tasklist.length; e++) {
        var s = i[t.tasklist[e].task_key];
        if (s && s.length > 0) {
          return true;
        }
      }
      return false;
    }(this._data, this._answers);
    var i = !this.view.isEmpty();
    this.emit("display-check", i || t);
  };
  G.prototype.submit = function () {
    var i = this;
    var s = this._data;
    var o = this.view.getResults();
    var n = this.served === this._total;
    this._answers[o.key] = o.answers;
    this.view.lock(true);
    if (n) {
      var h;
      e.Render.stop(this.view.render);
      var a = false;
      for (var r = 0; r < s.tasklist.length; r++) {
        h = s.tasklist[r].task_key;
        if (!this._answers[h]) {
          a = true;
          break;
        }
      }
      if (!this._answers || a) {
        this.reject({
          event: t.CaptchaError.CHALLENGE_ERROR,
          message: "Answers are incomplete"
        });
      } else {
        this.resolve(this._answers);
      }
    } else {
      var l = {
        task: s.tasklist[this.served],
        answers: s.requester_restricted_answer_set
      };
      this.view.createTask(s.requester_question, s.requester_question_example, l, s.request_config).then(function () {
        i.served += 1;
        i.view.lock(false);
        i.syncCheckState();
      }).catch(function (e) {
        i.reject({
          event: t.CaptchaError.CHALLENGE_ERROR,
          message: "Failed to setup task: " + i.served + " / " + i._total,
          reason: e
        });
      });
    }
  };
  G.prototype.translate = function () {
    this.view.translate();
  };
  G.prototype.onDestroy = function () {
    e.Render.stop(this.view.render);
  };
  return G;
}(_sharedLibs.packages.constants, _sharedLibs.packages.core, _sharedLibs.packages.utils, _sharedLibs.packages.device, _sharedLibs.packages.canvas, _sharedLibs.packages.language, _sharedLibs.packages.config, _sharedLibs.packages.theme, _sharedLibs.packages.ui);