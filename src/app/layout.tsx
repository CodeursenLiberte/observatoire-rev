import './globals.scss'
import { Inter } from 'next/font/google'
import Map from '../app/map'
import About from '../app/component/about'
import RouteList from './component/routes_list'
import DepartementList from './component/departements_list'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Observatoire Vélo Île-de-France',
  description: 'Suivi de l’avancée du plan vélo de la région Île-de-France',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href='https://unpkg.com/maplibre-gl@3.0.0/dist/maplibre-gl.css' rel='stylesheet' />
      </head>
      <body className={inter.className}>
        <main>
          <section className="hero">
            <Map/>
          </section>
          {children}
          <RouteList />
          <DepartementList />
          <About />
        </main>
      </body>
    </html>
  )
}
