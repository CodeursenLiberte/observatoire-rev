import Map from './map'
import Panel from './panel'
import About from './component/about'
import departementsGeojson from "../../data/departements-ile-de-france.geo.json"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { Departement } from './types'
import _ from 'lodash'

function departements() : Departement[] {
  const departements = _(departementsGeojson.features)
    .map(d => ({name: d.properties.nom, code: d.properties.code}))
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
