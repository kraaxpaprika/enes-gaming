/* ==================================================================
   Tiny GeoJSON renderer - draws real boundaries as SVG paths.
   No external library: projection + path building are done here.

   Data files live in assets/geo/ and are rebuilt with tools/build_geo.py
   ================================================================== */
(function () {

  /* ---------- projections (lon/lat -> flat x/y) ---------- */
  var projections = {
    // Web-Mercator-ish, the shape most people recognise from map apps
    mercator: function (lon, lat) {
      var l = Math.max(-82, Math.min(82, lat)) * Math.PI / 180;
      return [lon, -Math.log(Math.tan(Math.PI / 4 + l / 2)) * 180 / Math.PI];
    },
    // equal spacing; good for a single country
    equirect: function (lon, lat, refLat) {
      return [lon * Math.cos((refLat || 0) * Math.PI / 180), -lat];
    }
  };

  function projectFeature(geom, proj, refLat) {
    var polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
    return polys.map(function (poly) {
      return poly.map(function (ring) {
        return ring.map(function (pt) { return proj(pt[0], pt[1], refLat); });
      });
    });
  }

  function bboxOf(list) {
    var b = [Infinity, Infinity, -Infinity, -Infinity];
    list.forEach(function (polys) {
      polys.forEach(function (poly) {
        poly.forEach(function (ring) {
          ring.forEach(function (p) {
            if (p[0] < b[0]) b[0] = p[0];
            if (p[1] < b[1]) b[1] = p[1];
            if (p[0] > b[2]) b[2] = p[0];
            if (p[1] > b[3]) b[3] = p[1];
          });
        });
      });
    });
    return b;
  }

  function pathFor(polys, sx, sy, ox, oy) {
    var d = "";
    polys.forEach(function (poly) {
      poly.forEach(function (ring) {
        for (var i = 0; i < ring.length; i++) {
          var x = (ring[i][0] - ox) * sx;
          var y = (ring[i][1] - oy) * sy;
          d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
        }
        d += "Z";
      });
    });
    return d;
  }

  /* ------------------------------------------------------------------
     render(svg, features, options)

     features : [{ n: name, g: geometry, ...extra }]
     options  : {
       projection: "mercator" | "equirect",
       width, height   : viewBox size
       padding         : px inside the viewBox
       className       : class put on every path
       group           : function(feature) -> group key (e.g. continent)
       title           : function(feature) -> tooltip text
     }
     Returns { byName: {name: [paths]}, byGroup: {key: [paths]}, all: [paths] }
     ------------------------------------------------------------------ */
  function render(svg, features, opts) {
    opts = opts || {};
    var W = opts.width || 1000, H = opts.height || 520, pad = opts.padding == null ? 10 : opts.padding;
    var projName = opts.projection || "mercator";
    var refLat = opts.refLat || 0;
    var proj = projections[projName];

    var projected = features.map(function (f) { return projectFeature(f.g, proj, refLat); });
    var b = bboxOf(projected);
    var scale = Math.min((W - pad * 2) / (b[2] - b[0]), (H - pad * 2) / (b[3] - b[1]));
    // centre the drawing inside the viewBox
    var ox = b[0] - (W / scale - (b[2] - b[0])) / 2;
    var oy = b[1] - (H / scale - (b[3] - b[1])) / 2;

    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    var out = { byName: {}, byGroup: {}, all: [] };
    var NS = "http://www.w3.org/2000/svg";

    features.forEach(function (f, i) {
      var p = document.createElementNS(NS, "path");
      p.setAttribute("d", pathFor(projected[i], scale, scale, ox, oy));
      p.setAttribute("class", opts.className || "land");
      p.dataset.name = f.n;
      if (f.i) p.dataset.iso = f.i;
      var key = opts.group ? opts.group(f) : null;
      if (key) p.dataset.group = key;
      if (opts.title) {
        var t = document.createElementNS(NS, "title");
        t.textContent = opts.title(f);
        p.appendChild(t);
      }
      svg.appendChild(p);

      out.all.push(p);
      (out.byName[f.n] = out.byName[f.n] || []).push(p);
      if (key) (out.byGroup[key] = out.byGroup[key] || []).push(p);
    });

    return out;
  }

  /* ------------------------------------------------------------------
     Pinch / drag / wheel zooming for a rendered map.
     Works by moving the SVG viewBox, so the paths stay crisp.
     A drag never counts as a click on a country.
     ------------------------------------------------------------------ */
  function enablePanZoom(svg, opts) {
    opts = opts || {};
    var vb = svg.getAttribute("viewBox").split(/[\s,]+/).map(Number);
    var home = { x: vb[0], y: vb[1], w: vb[2], h: vb[3] };
    var view = { x: home.x, y: home.y, w: home.w, h: home.h };
    var MIN_W = home.w / (opts.maxZoom || 12);

    function apply() {
      svg.setAttribute("viewBox", view.x + " " + view.y + " " + view.w + " " + view.h);
    }

    /* screen pixels -> viewBox units */
    function toView(clientX, clientY) {
      var r = svg.getBoundingClientRect();
      return {
        x: view.x + (clientX - r.left) / r.width * view.w,
        y: view.y + (clientY - r.top) / r.height * view.h
      };
    }

    function zoomAt(factor, cx, cy) {
      var p = toView(cx, cy);
      var nw = Math.min(home.w, Math.max(MIN_W, view.w * factor));
      var k = nw / view.w;
      view.x = p.x - (p.x - view.x) * k;
      view.y = p.y - (p.y - view.y) * k;
      view.w = nw;
      view.h = view.h * k;
      clamp();
      apply();
    }

    function clamp() {
      view.x = Math.max(home.x, Math.min(home.x + home.w - view.w, view.x));
      view.y = Math.max(home.y, Math.min(home.y + home.h - view.h, view.y));
    }

    var pointers = {}, dragged = false, last = null, pinchStart = null;

    svg.addEventListener("pointerdown", function (e) {
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      svg.setPointerCapture(e.pointerId);
      if (Object.keys(pointers).length === 1) { last = { x: e.clientX, y: e.clientY }; dragged = false; }
      else { pinchStart = null; }
    });

    svg.addEventListener("pointermove", function (e) {
      if (!pointers[e.pointerId]) return;
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pointers);

      if (ids.length >= 2) {
        // pinch
        var a = pointers[ids[0]], b = pointers[ids[1]];
        var dist = Math.hypot(a.x - b.x, a.y - b.y);
        var mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        if (pinchStart) { zoomAt(pinchStart / dist, mid.x, mid.y); dragged = true; }
        pinchStart = dist;
        e.preventDefault();
        return;
      }

      if (!last) return;
      var dx = e.clientX - last.x, dy = e.clientY - last.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) dragged = true;
      if (!dragged) return;
      var r = svg.getBoundingClientRect();
      view.x -= dx / r.width * view.w;
      view.y -= dy / r.height * view.h;
      clamp(); apply();
      last = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    });

    function up(e) {
      delete pointers[e.pointerId];
      if (!Object.keys(pointers).length) { last = null; pinchStart = null; }
    }
    svg.addEventListener("pointerup", up);
    svg.addEventListener("pointercancel", up);

    // a drag must not select a country
    svg.addEventListener("click", function (e) {
      if (dragged) { e.stopPropagation(); e.preventDefault(); dragged = false; }
    }, true);

    svg.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoomAt(e.deltaY > 0 ? 1.18 : 0.85, e.clientX, e.clientY);
    }, { passive: false });

    var api = {
      zoomIn: function () { var r = svg.getBoundingClientRect(); zoomAt(0.7, r.left + r.width / 2, r.top + r.height / 2); },
      zoomOut: function () { var r = svg.getBoundingClientRect(); zoomAt(1.4, r.left + r.width / 2, r.top + r.height / 2); },
      reset: function () { view = { x: home.x, y: home.y, w: home.w, h: home.h }; apply(); },
      /* bring one path fully into view (used to show the answer) */
      focus: function (paths, pad) {
        if (!paths || !paths.length) return;
        var b = null;
        paths.forEach(function (p) {
          var bb = p.getBBox();
          if (!b) b = { x1: bb.x, y1: bb.y, x2: bb.x + bb.width, y2: bb.y + bb.height };
          else {
            b.x1 = Math.min(b.x1, bb.x); b.y1 = Math.min(b.y1, bb.y);
            b.x2 = Math.max(b.x2, bb.x + bb.width); b.y2 = Math.max(b.y2, bb.y + bb.height);
          }
        });
        var m = pad == null ? 1.8 : pad;
        var w = Math.min(home.w, (b.x2 - b.x1) * m), h = Math.min(home.h, (b.y2 - b.y1) * m);
        var ratio = home.w / home.h;
        if (w / h > ratio) h = w / ratio; else w = h * ratio;
        view.w = Math.max(MIN_W, w); view.h = view.w / ratio;
        view.x = (b.x1 + b.x2) / 2 - view.w / 2;
        view.y = (b.y1 + b.y2) / 2 - view.h / 2;
        clamp(); apply();
      }
    };
    return api;
  }

  function load(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("Could not load " + url);
      return r.json();
    });
  }

  window.EGGeo = { load: load, render: render, enablePanZoom: enablePanZoom, projections: projections };
})();
