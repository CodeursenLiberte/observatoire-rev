import troncons from '../../data/vif.json'
import departements from '../../data/departements-ile-de-france.geo.json'
import booleanWithin from '@turf/boolean-within'
import {TronçonProperties, TronçonStatus, Tronçon} from '../app/types'
import { lineString } from '@turf/helpers'

export default function(): Tronçon[] {
  return troncons.features.map( (feature) => {
    // booleanWithin doesn’t support MultiLineString
    const simpleLineString = lineString(feature.geometry.coordinates[0])
    const dep = departements.features.find((dep) => booleanWithin(simpleLineString, dep.geometry))
    const properties: TronçonProperties = {
      length: feature.properties.LONGUEUR,
      departement: dep?.properties.code,
      route: feature.properties.NUM_LIGNE,
      variant: feature.properties.NIVEAU_VALID_SUPPORT_VIAIRE != "Itinéraire validé",
      status: {
        "A l'étude": TronçonStatus.Planned,
        "En travaux": TronçonStatus.Building,
        "Mis en service": TronçonStatus.Built,
      }[feature.properties.NIVEAU_VALID_AMENAG || ""] || TronçonStatus.Unknown
    }

    return {
      type: feature.type,
      geometry: feature.geometry,
      properties,
    }
  })
}
