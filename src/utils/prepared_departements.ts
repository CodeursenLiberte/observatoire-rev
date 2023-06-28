import { Departement, TronçonStatus } from "@/app/types"
import {preparedAndCached} from "./prepared_tronçons"
import departementsGeojson from '../../data/departements-ile-de-france.geo.json'
import _ from "lodash"
import bbox from "@turf/bbox"
import {cache} from 'react'
import { LngLatBounds } from "maplibre-gl"

const allDepartements = cache(() => _(departementsGeojson.features)
  .map(d => {
    const t = _.filter(preparedAndCached(), feature => feature.properties.departement === d.properties.code)
    const total = _(t).map('properties.length').sum()
    const built = _(t).filter(feature => feature.properties.status === TronçonStatus.Built).map('properties.length').sum()
    const [xmin, ymin, xmax, ymax] = bbox(d)
    return {
      name: d.properties.nom,
      code: d.properties.code,
      bbox: new LngLatBounds([[xmin, ymin], [xmax, ymax]]),
      stats: {built, total}
    }
  })
  .sortBy('code')
  .value()
)

export function statsPerDepartement(code: string): Departement|undefined {
  return allDepartements().find(dep => dep.code === code)
}

export default allDepartements
