import styles from './page.module.css'
import Map from './map'

export default function Home() {
  return (
    <main className={styles.main}>
      <Map/>
    </main>
  )
}
