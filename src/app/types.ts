import { Feature, FeatureCollection, LineString, MultiLineString } from "@turf/helpers"
import { Type } from "maplibre-gl"

export type Bounds = [number, number, number, number]

export type Departement = {
  name: string,
  code: string,
  stats: {
    total: number,
    built: number,
  },
  bounds: Bounds,
}
export type DepartementsMap = {[index: string]: Departement}

export enum TronçonStatus {
  Planned = 1,
  PreExisting,
  Building,
  Built,
  Blocked,
  Unknown
}

export type TronçonProperties = {
  id: string,
  length: number,
  departement: string|undefined,
  status: TronçonStatus,
  route: string,
  variant: boolean,
  commune: string|undefined,
  typeMOA: TypeMOA,
  moa: string,
}

// It’s actually a geojson, with typed properties
export type Tronçon = {
  type: string,
  geometry: {type: string, coordinates: number[][][]},
  properties: TronçonProperties,
}

export type LengthStats = {[index: number]: number}

export type RouteStats = {
  code: string,
  stats: LengthStats,
  total: number,
  bounds: Bounds
}

export type RoutesMap = {[index: string]: RouteStats}

export type GlobalStats = {[index: number]: number}


export type Level = { level: 'region' } |
                    { level: 'departement', props: Departement } |
                    { level: 'route', props: RouteStats } |
                    { level: 'segment', props: TronçonProperties}

export type GlobalData = {
  tronçons: FeatureCollection<LineString, TronçonProperties>,
  globalBounds: [number, number, number, number],
  outlines: FeatureCollection<MultiLineString>,
  variantOutlines: FeatureCollection<MultiLineString>,
  routes: RoutesMap,
}

export enum TypeMOA {
  Commune = 1,
  Departement,
  EPCI,
  Unknown
}
