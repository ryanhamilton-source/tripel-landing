"use client";

import { ComposableMap, Geographies, Geography, Graticule, Sphere } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap() {
  return (
    <ComposableMap
      projection="geoNaturalEarth1"
      projectionConfig={{ scale: 185, center: [10, 10] }}
      width={800}
      height={600}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Outer sphere glow */}
      <Sphere
        id="sphere"
        fill="transparent"
        stroke="rgba(99,102,241,0.08)"
        strokeWidth={0.5}
      />

      {/* Lat/lon grid lines */}
      <Graticule stroke="rgba(99,102,241,0.07)" strokeWidth={0.4} />

      {/* Country outlines */}
      <Geographies geography={GEO_URL}>
        {({ geographies }: { geographies: any[] }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="rgba(99,102,241,0.06)"
              stroke="rgba(129,140,248,0.28)"
              strokeWidth={0.5}
              style={{
                default: { outline: "none" },
                hover: { outline: "none", fill: "rgba(99,102,241,0.12)" },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}
