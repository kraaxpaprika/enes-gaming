"""
Rebuild the map data used by the games.

Sources (real geographic boundaries, no hand-drawn shapes):
  * World countries : Natural Earth 1:110m admin-0 countries (public domain)
                      https://github.com/nvkelso/natural-earth-vector
  * Turkish provinces: tr-geojson (81 provinces)
                      https://github.com/cihadturhan/tr-geojson

Usage:  python tools/build_geo.py
Output: assets/geo/world.json, assets/geo/turkey.json
"""

import json
import os
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "assets", "geo")

WORLD_URL = ("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/"
             "master/geojson/ne_110m_admin_0_countries.geojson")
TR_URL = ("https://raw.githubusercontent.com/cihadturhan/tr-geojson/"
          "master/geo/tr-cities-utf8.json")


def fetch(url, cache):
    path = os.path.join(OUT, cache)
    if not os.path.exists(path):
        print("downloading", url)
        urllib.request.urlretrieve(url, path)
    with open(path, encoding="utf8") as fh:
        return json.load(fh)


def round_coords(node, nd):
    """Round every coordinate pair in a nested GeoJSON coordinate array."""
    if isinstance(node[0], (int, float)):
        return [round(node[0], nd), round(node[1], nd)]
    return [round_coords(c, nd) for c in node]


def dedupe(geom):
    """Drop consecutive duplicate points created by rounding."""
    def clean_ring(ring):
        out = [ring[0]]
        for pt in ring[1:]:
            if pt != out[-1]:
                out.append(pt)
        if len(out) < 4:
            return None
        if out[0] != out[-1]:
            out.append(out[0])
        return out

    if geom["type"] == "Polygon":
        rings = [r for r in (clean_ring(r) for r in geom["coordinates"]) if r]
        return {"type": "Polygon", "coordinates": rings} if rings else None

    polys = []
    for poly in geom["coordinates"]:
        rings = [r for r in (clean_ring(r) for r in poly) if r]
        if rings:
            polys.append(rings)
    return {"type": "MultiPolygon", "coordinates": polys} if polys else None


def simplify(geom, nd):
    g = {"type": geom["type"], "coordinates": round_coords(geom["coordinates"], nd)}
    return dedupe(g)


def build_world():
    src = fetch(WORLD_URL, "_world.json")
    feats = []
    for f in src["features"]:
        p = f["properties"]
        iso = p.get("ISO_A2_EH") or p.get("ISO_A2") or ""
        if iso in ("-99", ""):
            iso = (p.get("ADM0_A3") or "")[:2]
        cont = p.get("CONTINENT") or ""
        if cont in ("Antarctica", "Seven seas (open ocean)"):
            continue
        geom = simplify(f["geometry"], 2)
        if not geom:
            continue
        feats.append({
            "n": p.get("NAME_LONG") or p.get("NAME"),
            "i": iso.lower(),
            "c": cont,
            "g": geom,
        })
    write("world.json", {"kind": "world", "source": "Natural Earth 110m", "features": feats})


def build_turkey():
    src = fetch(TR_URL, "_tr.json")
    feats = []
    for f in src["features"]:
        geom = simplify(f["geometry"], 3)
        if not geom:
            continue
        feats.append({"n": f["properties"]["name"], "g": geom})
    feats.sort(key=lambda x: x["n"])
    write("turkey.json", {"kind": "turkey-provinces", "source": "tr-geojson", "features": feats})


def write(name, data):
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf8") as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
    print(name, len(data["features"]), "features,", round(os.path.getsize(path) / 1024), "KB")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    build_world()
    build_turkey()
