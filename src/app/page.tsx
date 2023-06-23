import Map from './map'
import Panel from './panel'
import About from './component/about'
import departementsGeojson from '../../data/departements-ile-de-france.geo.json'
import { Departement, TronçonStatus } from './types'
import _ from 'lodash'
import prepared_tronçons from '@/utils/prepared_tronçons'

function statsPerDepartement(code: string): {built: number, total: number} {
  const t = _.filter(prepared_tronçons(), feature => feature.properties.departement === code && !feature.properties.variant)
  const total = _(t).map('properties.length').sum()
  const built = _(t).filter(feature => feature.properties.status === TronçonStatus.Built).map('properties.length').sum()
  return {built, total}
}

function departements() : Departement[] {
  const departements = _(departementsGeojson.features)
    .map(d => ({name: d.properties.nom, code: d.properties.code, stats: statsPerDepartement(d.properties.code)}))
    .sortBy('code')
    .value()

  return departements
}

export default function Home() {
  return (
    <main>
      <section className="hero">
        <Map/>
      </section>
      <Panel departements={departements()}/>
      <About />
    </main>
  )
}
