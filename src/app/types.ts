type Departement = {
  name: string,
  code: string,
  stats: {
    total: number,
    built: number,
  }
}

enum TronçonStatus {
  Planed,
  Building,
  Built,
  Blocked,
  Unknown
}

type TronçonProperties = {
  length: number,
  departement: string|undefined,
  status: TronçonStatus,
  route: string,
  variant: boolean
}

// It’s actually a geojson, with typed properties
type Tronçon = {
  type: string,
  geometry: {type: string, coordinates: number[][][]},
  properties: TronçonProperties,
}

export type {Departement, TronçonProperties, Tronçon}
export {TronçonStatus}
