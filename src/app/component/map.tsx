"use client";
import React, { useRef, useEffect, useState } from "react";
import maplibregl, { LngLatBounds, GeoJSONFeature } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import _ from "lodash";
import { FeatureCollection, LineString } from "geojson";
import { Level, TronçonProperties, TronçonStatus } from "../types";
import {
  fadedStatusColor,
  fadedBorderStatusColor,
  borderStatusColor,
  statusColor,
} from "@/utils/constants";
import {
  baseLayer,
  exceptedVariants,
  onlyDoneVariants,
  onlyUpcomingVariants,
  colorFromStatus,
  showWhen,
  hideWhen,
  width,
  widthFromStatus,
} from "../style_helpers";
import { Protocol } from "pmtiles";

const vifLayers = [
  {
    ...baseLayer("base-outer-white"),
    paint: {
      ...width(10, 30),
      "line-color": "#fff",
    }
  },
  {
    ...baseLayer("hover-overlay"),
    paint: {
      ...width(10, 30),
      "line-color": "#aaa",
      ...showWhen("hover")
    },
  },
  {
    ...baseLayer("outline-grey-inactive"),
    paint: {
      ...width(7, 16),
      ...colorFromStatus(fadedBorderStatusColor),
    },
  },
  {
    ...baseLayer("inner-white"),
    paint: {
      ...width(5, 10),
      "line-color": "#fff",
    },
  },
  {
    ...baseLayer("couleur-inactive-variant-done", false),
    ...onlyDoneVariants,
    paint: {
      "line-dasharray" : [.4, .4],
      ...widthFromStatus(4, 2.5, 10, 3),
      ...colorFromStatus(fadedStatusColor),
    },
  },
  {
    ...baseLayer("couleur-inactive-variant-upcoming", false),
    ...onlyUpcomingVariants,
    paint: {
      "line-dasharray" : [1, 1],
      ...widthFromStatus(4, 2.5, 10, 3),
      ...colorFromStatus(fadedStatusColor),
    },
  },
  {
    ...baseLayer("couleur-inactive"),
    ...exceptedVariants,
    paint: {
      ...widthFromStatus(4, 2.5, 10, 3),
      ...colorFromStatus(fadedStatusColor),
      ...showWhen("inactive")
    },
  },
  {
    ...baseLayer("outline-grey-active"),
    paint: {
      ...width(7, 16),
      ...colorFromStatus(borderStatusColor),
      ...hideWhen("inactive")
    },
  },
  {
    ...baseLayer("inner-white-active"),
    paint: {
      ...width(5, 10),
      "line-color": "#fff",
      ...hideWhen("inactive")
    },
  },
  {
    ...baseLayer("couleur-active-variant-done", false),
    ...onlyDoneVariants,
    paint: {
      "line-dasharray" : [.4, .4],
      ...widthFromStatus(4, 2.5, 10, 3),
      ...colorFromStatus(statusColor),
      ...hideWhen("inactive")
    },
  },
  {
    ...baseLayer("couleur-active-variant-upcoming", false),
    ...onlyUpcomingVariants,
    paint: {
      "line-dasharray" : [1, 1],
      ...widthFromStatus(4, 2.5, 10, 3),
      ...colorFromStatus(statusColor),
      ...hideWhen("inactive")
    },
  },
  {
    ...baseLayer("couleur-active"),
    ...exceptedVariants,
    paint: {
      ...widthFromStatus(4, 2.5, 10, 3),
      ...colorFromStatus(statusColor),
      ...hideWhen("inactive")
    },
  }
];

function moveLabelLayersOnTop(map) {
  const layersOnTop = [
    "Town labels",
    "City labels",
    "Road labels"
  ];
  layersOnTop.forEach((layerId) => {
    map.getLayer(layerId) && map.moveLayer(layerId)
  });
}

function isActive(level: Level, feature: GeoJSONFeature): boolean {
  if (level.level === "route") {
    return JSON.parse(feature.properties.route).includes(level.props.code);
  } else if (level.level === "phase") {
    return feature.properties.phase == level.props.phase;
  } else if (level.level === "segment") {
    return feature.properties.id === level.props.id;
  } else {
    return true;
  }
}

function setBounds(
  map: maplibregl.Map,
  bounds: [number, number, number, number],
  paddingRatio: number,
) {
  const xPadding = map.getContainer().offsetWidth / paddingRatio;
  const yPadding = map.getContainer().offsetHeight / paddingRatio;
  map.fitBounds(bounds, {
    padding: {
      top: yPadding,
      bottom: yPadding,
      left: xPadding,
      right: xPadding,
    },
    maxZoom: 15,
  });
}

function setActiveSegments(map: maplibregl.Map, level: Level) {
  const features = map.querySourceFeatures("vif"); // querySourceFeatures depends on the current map viewport
  features.forEach((feature) => {
    const active = isActive(level, feature);
    map.setFeatureState(
      {
        id: feature.id,
        source: "vif",
      },
      {
        inactive: !active,
      },
    );
  });
}

type Props = {
  bounds: [number, number, number, number];
  segments: FeatureCollection<LineString, TronçonProperties>;
  level: Level;
  setHash: (hash: string) => void;
};

export default function Map({ bounds, segments, level, setHash }: Props) {
  const DEFAULT_MAP_STYLE = "maplibre-styles/default.json";
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<null | maplibregl.Map>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapViewport, setMapViewport] = useState<null | LngLatBounds>(null);
  const [mapStyle, setMapStyle] = useState(DEFAULT_MAP_STYLE);

  let protocol = new Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  useEffect(() => {
    if (map.current) return;

    // prettier-ignore
    const newMap = new maplibregl.Map({
      container: mapContainer.current || "",
      bounds: new LngLatBounds(bounds),
      style: DEFAULT_MAP_STYLE,
    });
    let hoveredSegment: null | string | number = null;

    newMap.on("load", () => {
      console.log("map.onload");
      newMap.addSource("vif", {
        type: "geojson",
        data: segments,
        promoteId: "id"
      });
      vifLayers.forEach(layer => newMap.addLayer(layer));
      moveLabelLayersOnTop(newMap);

      newMap.on("moveend", () => { setMapViewport(newMap.getBounds()) })
      newMap.on("click", () => setHash("region") )
      newMap.on("click", "base-outer-white", (tronçon) => {
        if (tronçon.features !== undefined && tronçon.features.length > 0) {
          setHash(`segment/${tronçon.features[0].id}`);
        }
      })
      newMap.on("mousemove", "base-outer-white", (tronçon) => {
        if (tronçon.features !== undefined && tronçon.features.length > 0) {
          newMap.getCanvas().style.cursor = "pointer";
          if (hoveredSegment) {
            newMap.setFeatureState(
                {source: 'vif', id: hoveredSegment},
                {hover: false}
            );
          }
          hoveredSegment = tronçon.features[0].id || null;
          newMap.setFeatureState(
            {source: 'vif', id: tronçon.features[0].id},
            {hover: true}
          );
        }
      });
      newMap.on('mouseleave', 'base-outer-white', () => {
        newMap.getCanvas().style.cursor = "";
        if (hoveredSegment) {
            newMap.setFeatureState(
                {source: 'vif', id: hoveredSegment},
                {hover: false}
            );
        }
        hoveredSegment = null;
      });
    });

    newMap.once("idle", () => {
      setMapReady(true);
    });

    map.current = newMap;
  });

  const oldLevel = useRef<Level>(level);

  useEffect(() => {
    if (map.current !== null) {
      if (oldLevel.current.level === "segment" && level.level === "region") {
        // When exiting a segment, only zoom out a bit, do not return to the whole region.
        let newZoom = Math.min(map.current.getZoom(), 12)
        map.current.flyTo({zoom: newZoom});
      } else {
        let paddingRatio = 1000;
        if (level.level === "segment") {
          paddingRatio = 4;
        } else if (level.level === "route") {
          paddingRatio = 10;
        }
        setBounds(map.current, bounds, paddingRatio);
      }
      oldLevel.current = level;
    }
  }, [mapReady, level, bounds]);

  useEffect(() => {
    if (map.current !== null) {
      setActiveSegments(map.current, level);
    }
  }, [mapViewport, level]);

  // Change the map style when the style selector changes
  useEffect(() => {
    console.log(`map.current.getStyle() = ${map.current.getStyle()}`);
    let newMap = map.current;
    if (typeof newMap.getStyle() !== "undefined") {
      console.log(`map.current.setStyle(${mapStyle})`);

      newMap.setStyle(mapStyle, { diff: false, transformStyle: (previousStyle, nextStyle) => ({
        ...nextStyle,
        sources: {
          ...nextStyle.sources,
          vif: previousStyle.sources.vif
        },
        layers: [
          ...nextStyle.layers,
          ...vifLayers
        ]
      })});
      //vifLayers.forEach(layer => newMap.addLayer(layer));
      newMap.once("idle", () => {
        moveLabelLayersOnTop(newMap);
      });

      console.log(`map layers:`);
      console.log(newMap.getLayersOrder());
      console.log(`map style:`);
      console.log(newMap.getStyle());
    }
  }, [mapStyle]);

  return (
    <div ref={mapContainer} className="vif-map">
      <div className="vif-map--chrome vif-map--styles">
        <label htmlFor="vif-map--style-select">Style</label>
        <select id="vif-map--style-select" value={mapStyle} onChange={e => setMapStyle(e.target.value)}>
          <option value="maplibre-styles/default.json">Défaut</option>
          <option value="maplibre-styles/bright.json">Contraste élevé</option>
        </select>
      </div>
      <picture className="vif-map--chrome vif-map--logo">
        <img src="logo_cvidf.png" alt="Logo du collectif vélo Île-de-France" />
      </picture>
    </div>
  );
}
