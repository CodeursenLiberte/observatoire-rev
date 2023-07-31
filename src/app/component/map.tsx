"use client";
import React, { useRef, useEffect, useState } from "react";
import maplibregl, { LngLatBounds, MapGeoJSONFeature } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "../page.module.css";
import _ from "lodash";
import { FeatureCollection, LineString } from "@turf/helpers";
import { Level, TronçonProperties, TronçonStatus } from "../types";
import { fadedStatusColor, statusColor } from "@/utils/constants";

function isActive(level: Level, feature: MapGeoJSONFeature): boolean {
  if (level.level === "route") {
    // Not sure why, but it seems that the array gets serialized as a string
    return JSON.parse(feature.properties.routes).includes(level.props.code);
  } else if (level.level === "segment") {
    return feature.properties.id === level.props.id;
  } else {
    return true;
  }
}

function setActiveSegments(map: maplibregl.Map, level: Level) {
  map.querySourceFeatures("vif").forEach((feature) => {
    map.setFeatureState(
      {
        id: feature.id,
        source: "vif",
      },
      { inactive: !isActive(level, feature) }
    );
  });

  map.querySourceFeatures("outline").forEach((feature) => {
    map.setFeatureState(
      {
        id: feature.id,
        source: "outline",
      },
      { inactive: !isActive(level, feature) }
    );
  });
}

type Props = {
  outlines: FeatureCollection;
  variantOutlines: FeatureCollection;
  bounds: [number, number, number, number];
  segments: FeatureCollection<LineString, TronçonProperties>;
  level: Level;
  setHash: (hash: string) => void;
};

export default function Map({
  outlines,
  variantOutlines,
  bounds,
  segments,
  level,
  setHash,
}: Props) {
  const mapContainer = useRef<null | HTMLElement>(null);
  const map = useRef<null | maplibregl.Map>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (map.current) return;

    // prettier-ignore
    const newMap = new maplibregl.Map({
      container: mapContainer.current || "",
      bounds: new LngLatBounds(bounds),
      style: `https://api.maptiler.com/maps/dataviz/style.json?key=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
    })
      .on("load", () => {
        newMap.fitBounds(new LngLatBounds(bounds));
        newMap
          .addSource("vif", {
            type: "geojson",
            data: segments,
            promoteId: "id",
          })
          .addSource("outline", {
            type: "geojson",
            data: outlines,
            generateId: true,
          })
          .addSource("variant-outline", {
            type: "geojson",
            data: variantOutlines,
          })
          .addLayer({ id: "base-outer-white-variant",
            source: "vif",
            type: "line",
            paint: {
              "line-width": ["interpolate", ["linear"], ["zoom"],
                10, 7,
                15, 26,
              ],
              "line-color": "#fff",
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            filter: ["get", "variant"],
          })
          .addLayer({ id: "base-outer-white",
            source: "vif",
            type: "line",
            paint: {
              "line-width": ["interpolate", ["linear"], ["zoom"],
                10, 8,
                15, 30,
              ],
              "line-color": "#fff",
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            filter: ["!", ["get", "variant"]],
          })
          .addLayer({ id: "variant-outline-grey",
            source: "vif",
            type: "line",
            paint: {
              "line-width": ["interpolate", ["linear"], ["zoom"],
                10, 4,
                15, 10
              ],
              "line-color": "#7f7f7f",
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            filter: ["get", "variant"],
          })
          .addLayer({ id: "outline-grey",
            source: "vif",
            type: "line",
            paint: {
              "line-width": ["interpolate", ["linear"], ["zoom"],
                10, 5,
                15, 16
              ],
              "line-color": "#7f7f7f",
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            filter: ["!", ["get", "variant"]],
          })
          .addLayer({ id: "variant-inner-white",
            source: "vif",
            type: "line",
            paint: {
              "line-width": ["interpolate", ["linear"], ["zoom"],
                10, 3,
                15, 8
              ],
              "line-color": "#fff",
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            filter: ["get", "variant"],
          })
          .addLayer({ id: "inner-white",
            source: "vif",
            type: "line",
            paint: {
              "line-width": ["interpolate", ["linear"], ["zoom"],
                10, 4,
                15, 10
              ],
              "line-color": "#fff",
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            filter: ["!", ["get", "variant"]],
          })
          .addLayer({ id: "variantes",
            source: "vif",
            type: "line",
            paint: {
              "line-width": ["interpolate", ["linear"], ["zoom"],
                10, 1,
                15, 3
              ],
              "line-dasharray": [2, 1],
              "line-opacity": [
                "case",
                ["boolean", ["feature-state", "inactive"], false],
                0.2,
                1,
              ],
            },
            filter: ["get", "variant"],
          })
          .addLayer({ id: "couleur",
            source: "vif",
            type: "line",
            paint: {
              "line-width": [
                "interpolate",
                ["linear"],
                ["zoom"],
                // at zoom level 10, the line-width is either 3 or 2
                10, [ "match", ["get", "status"],
                  TronçonStatus.PreExisting, 3,
                  TronçonStatus.Built, 3,
                  TronçonStatus.Building, 3,
                  2,
                ],
                15, [ "match", ["get", "status"],
                  TronçonStatus.PreExisting, 10,
                  TronçonStatus.Built, 10,
                  TronçonStatus.Building, 10,
                  6,
                ],
              ],
              "line-color": [ "get", ["get", "status"],
                ["case",
                  ["boolean", ["feature-state", "inactive"], false],
                  ["literal", fadedStatusColor],
                  ["literal", statusColor]
                ]
              ],
              "line-opacity": [ "case",
                ["boolean", ["feature-state", "inactive"], false],
                0.5,
                1,
              ],
            },
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            filter: ["!", ["get", "variant"]],
          });
        })
      .on("click", "couleur", (tronçon) => {
        if (tronçon.features !== undefined && tronçon.features.length > 0) {
          setHash(`segment/${tronçon.features[0].id}`);
        }
      })
    // TODO: find a better way to know if everything is loaded
    setTimeout(() => setMapReady(true), 3000);
    map.current = newMap;
  });

  useEffect(() => {
    if (map.current !== null) {
      map.current.fitBounds(bounds, { padding: 10 });
      setActiveSegments(map.current, level);
    }
  }, [level, bounds]);

  useEffect(() => {
    if (map.current !== null) {
      setActiveSegments(map.current, level);
      map.current.fitBounds(bounds, { padding: 10 });
    }
  }, [mapReady]);

  return (
    <div ref={(el) => (mapContainer.current = el)} className={styles.map} />
  );
}
