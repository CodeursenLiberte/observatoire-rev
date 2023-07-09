import './globals.scss'
import { Source_Sans_3 } from 'next/font/google'
import StateHolder from './component/state_holder'
import {routes, tronçons, outlines, globalBounds, variantOutlines, globalStats} from '@/utils/prepared_data'
import About from './component/about'
import { GlobalData } from './types'

const inter = Source_Sans_3({ subsets: ['latin'] })

export const metadata = {
  title: 'Observatoire Vélo Île-de-France',
  description: 'Suivi de l’avancée du plan vélo de la région Île-de-France',
}

export default function RootLayout() {

  const data: GlobalData = {
    routes,
    outlines,
    tronçons,
    globalBounds,
    variantOutlines,
    globalStats,
  }

  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href='https://unpkg.com/maplibre-gl@3.0.0/dist/maplibre-gl.css' rel='stylesheet' />
      </head>
      <body className={inter.className}>
        <main>
          <StateHolder data={data} />
          <About />
        </main>
      </body>
    </html>
  )
}
