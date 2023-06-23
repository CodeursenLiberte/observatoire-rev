import Map from './map'
import Panel from './panel'
import About from './component/about'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <Map/>
      </section>
      <Panel/>
      <About />
    </main>
  )
}
