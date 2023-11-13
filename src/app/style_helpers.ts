import {
  ColorSpecification,
  DataDrivenPropertyValueSpecification,
  ExpressionType,
  FilterSpecification,
  LineLayerSpecification,
  PropertyValueSpecification,
} from "maplibre-gl";
import { statusIndex } from "@/utils/constants";
import { TronçonStatus } from "./types";

type Layer = LineLayerSpecification & { source: string };
type Filter = { filter: FilterSpecification };
type Cap = PropertyValueSpecification<"round">;
type ColorMaps = { [Status in TronçonStatus]: string };
type MaplibreColor = {
  "line-color": DataDrivenPropertyValueSpecification<ColorSpecification>;
};
type Visbility = {
  "line-opacity": DataDrivenPropertyValueSpecification<number>;
};
type LineWidth = {
  "line-width"?: DataDrivenPropertyValueSpecification<number>;
};

// Very basic boilerplate to create a line layer
// Use it as addLayer({...baselayer('id'), paint: {...}, filter: {....}})
export function baseLayer(id: string, setCap: boolean = true): Layer {
  const caps = setCap
    ? {
        "line-cap": "round" as Cap,
        "line-join": "round" as Cap,
      }
    : {};

  return {
    id,
    source: "vif",
    type: "line",
    layout: {
      ...caps,
      "line-sort-key": ["get", ["get", "status"], ["literal", statusIndex]],
    },
  };
}

export const onlyDoneVariants: Filter = {
  filter: [
    "all",
    ["get", "variant"],
    [
      "match",
      ["get", "status"],
      [TronçonStatus.Planned, TronçonStatus.Blocked],
      false,
      true,
    ],
  ],
};
export const onlyUpcomingVariants: Filter = {
  filter: [
    "all",
    ["get", "variant"],
    [
      "match",
      ["get", "status"],
      [TronçonStatus.Planned, TronçonStatus.Blocked],
      true,
      false,
    ],
  ],
};
export const exceptedVariants: Filter = { filter: ["!", ["get", "variant"]] };

export function colorFromStatus(colors: ColorMaps): MaplibreColor {
  return { "line-color": ["get", ["get", "status"], ["literal", colors]] };
}

export function hideWhen(state: string): Visbility {
  return {
    "line-opacity": [
      "case",
      ["boolean", ["feature-state", state], false],
      0.0,
      1,
    ],
  };
}

export function showWhen(state: string): Visbility {
  return {
    "line-opacity": [
      "case",
      ["boolean", ["feature-state", state], false],
      1,
      0.0,
    ],
  };
}

export function width(widthAtZoom10: number, widthAtZoom15: number): LineWidth {
  return {
    "line-width": [
      "interpolate",
      ["linear"],
      ["zoom"],
      10,
      widthAtZoom10,
      15,
      widthAtZoom15,
    ],
  };
}

export function widthFromStatus(
  widthAtZoom10: number,
  widthAtZoom10Narrow: number,
  widthAtZoom15: number,
  widthAtZoom15Narrow: number,
): LineWidth {
  return {
    "line-width": [
      "interpolate",
      ["linear"],
      ["zoom"],
      10,
      [
        "match",
        ["get", "status"],
        [TronçonStatus.Planned, TronçonStatus.Blocked],
        widthAtZoom10Narrow,
        widthAtZoom10,
      ],
      15,
      [
        "match",
        ["get", "status"],
        [TronçonStatus.Planned, TronçonStatus.Blocked],
        widthAtZoom15Narrow,
        widthAtZoom15,
      ],
    ],
  };
}
