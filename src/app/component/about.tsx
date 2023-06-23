import Link from 'next/link'

export default function About() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-3">À propos</h2>
        <p className="block">Les données affichées sont mises à la disposition du public par la région Île-de-France et régulièrement mises à jour.</p>
        <p className="block">Cet observatoire a été mis en place par le <Link href="https://velo-iledefrance.fr/">Collectif Vélo Île-de-France</Link>. Créé en mars 2019, il a pour objectif de faire de l’Île-de-France une région cyclable, où toutes et tous peuvent se déplacer à vélo de manière sûre, confortable et efficate, quels que soient leur âge et leur niveau.</p>

        <div className="container has-text-centered">
          <figure className="image is-128x128 is-inline-block">
            <img
              src="logo_cvidf.png"
              alt="Logo du collectif vélo Île-de-France"
              />
          </figure>
        </div>
      </div>
    </section>
  )
}
