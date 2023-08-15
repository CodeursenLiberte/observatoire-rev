import Link from "next/link";

export default function About() {
  return (
    <section className="section">
      <div className="vif-container vif-container--about">
        <h2 className="title is-size-4 has-text-centered">À propos</h2>
        <p className="block has-text-centered">
          Les données affichées sont mises à la disposition du public par la
          région Île-de-France et régulièrement mises à jour.
        </p>
        <p className="block has-text-centered">
          Cet observatoire a été mis en place par le{" "}
          <Link href="https://velo-iledefrance.fr/">
            Collectif Vélo Île-de-France
          </Link>
          . Créé en mars 2019, il a pour objectif de faire de l’Île-de-France
          une région cyclable, où toutes et tous peuvent se déplacer à vélo de
          manière sûre, confortable et efficate, quels que soient leur âge et
          leur niveau.
        </p>

        <figure className="vif-about--logo">
          <img
            src="logo_cvidf.png"
            alt="Logo du collectif vélo Île-de-France"
          />
        </figure>
      </div>
    </section>
  );
}
