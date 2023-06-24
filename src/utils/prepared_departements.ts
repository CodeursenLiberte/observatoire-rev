import { Departement, TronçonStatus } from "@/app/types"
import prepared_tronçons from "./prepared_tronçons"
import departementsGeojson from '../../data/departements-ile-de-france.geo.json'
import _ from "lodash"

function statsPerDepartement(code: string): {built: number, total: number} {
  const t = _.filter(prepared_tronçons(), feature => feature.properties.departement === code && !feature.properties.variant)
  const total = _(t).map('properties.length').sum()
  const built = _(t).filter(feature => feature.properties.status === TronçonStatus.Built).map('properties.length').sum()
  return {built, total}
}

export default function departements() : Departement[] {
  const departements = _(departementsGeojson.features)
    .map(d => ({name: d.properties.nom, code: d.properties.code, stats: statsPerDepartement(d.properties.code)}))
    .sortBy('code')
    .value()

  return departements
}
