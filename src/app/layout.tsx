import "./globals.scss";
import { Source_Sans_3 } from "next/font/google";
import StateHolder from "./component/state_holder";
import { prepareData } from "@/utils/prepared_data";

const inter = Source_Sans_3({ subsets: ["latin"] });

export const metadata = {
  title: "Observatoire Vélo Île-de-France",
  description: "Suivi de l’avancée du plan vélo de la région Île-de-France",
};

export default async function RootLayout() {
  const data = await prepareData()
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://unpkg.com/maplibre-gl@3.0.0/dist/maplibre-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <main className="cocarto-main">
          <StateHolder data={data} />
        </main>
      </body>
    </html>
  );
}
