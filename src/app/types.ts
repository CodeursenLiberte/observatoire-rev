import { FeatureCollection, LineString, MultiLineString } from "@turf/helpers";

export type Bounds = [number, number, number, number];

export type Departement = {
  name: string;
  code: string;
  stats: {
    total: number;
    built: number;
  };
  bounds: Bounds;
};
export type DepartementsMap = { [index: string]: Departement };

export enum TronçonStatus {
  Planned = "Planned",
  PreExisting = "PerExisting",
  Building = "Building",
  Built = "Built",
  Blocked = "Blocked",
  Unknown = "Unknown",
}

export type TronçonProperties = {
  id: string;
  length: number;
  departement: string | undefined;
  status: TronçonStatus;
  routes: string[];
  variant: boolean;
  commune: string | undefined;
  typeMOA: TypeMOA;
  moa: string;
};

// It’s actually a geojson, with typed properties
export type Tronçon = {
  type: string;
  geometry: { type: string; coordinates: number[][][] };
  properties: TronçonProperties;
};

export type LengthStats = { [index: string]: number };

export type RouteStats = {
  code: string;
  stats: LengthStats;
  total: number;
  bounds: Bounds;
};

export type RoutesMap = { [index: string]: RouteStats };

export type GlobalStats = {
  stats: LengthStats;
  total: number;
};

export type Level =
  | { level: "region" }
  | { level: "departement"; props: Departement }
  | { level: "route"; props: RouteStats }
  | { level: "segment"; props: TronçonProperties };

export type GlobalData = {
  tronçons: FeatureCollection<LineString, TronçonProperties>;
  globalBounds: [number, number, number, number];
  outlines: FeatureCollection<MultiLineString>;
  variantOutlines: FeatureCollection<MultiLineString>;
  routes: RoutesMap;
  globalStats: GlobalStats;
};

export enum TypeMOA {
  Commune = 1,
  Departement,
  EPCI,
  Unknown,
}
