export default function Panel() {
  return (
    <section className="section has-text-centered">
      <div className="container">
        <progress className="progress" value="15" max="100">15%</progress>
        <h3 className="subtitle is-5">au 22 juin 2023</h3>
        <h1 className="title is-3">Observatoire du Réseau Vélo Île-de-France</h1>
        <table className="table is-rounded is-bordered is-fullwidth">
          <tbody>
            <tr>
              <td><span className="icon"><i className="fa fa-eye"></i></span></td>
              <td><span>aménagements livrés</span></td>
              <td><span className="tag">12%</span></td>
            </tr>
            <tr>
              <td><span className="icon"><i className="fa fa-eye"></i></span></td>
              <td><span>validés</span></td>
              <td><span className="tag">12%</span></td>
            </tr>
            <tr>
              <td><span className="icon"><i className="fa fa-eye"></i></span></td>
              <td><span>blocages</span></td>
              <td><span className="tag">12%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container">
        <h2 className="title is-3">Informations par ligne</h2>
        <button className="button">V1</button>
        <button className="button">V2</button>
        <button className="button">V3</button>
        <button className="button">V4</button>
        <button className="button">V5</button>
        <button className="button">V6</button>
        <button className="button">V7</button>
        <button className="button">V8</button>
        <button className="button">V9</button>
        <button className="button">V10</button>
        <button className="button">V20</button>
      </div>
      <div className="container">
        <h2 className="title is-3">Informations par département</h2>
        <nav className="level">
          <div className="level-left">
            <div className="level-item has-text-centered">
              <a className="link is-info">90</a>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <p className="heading">Essonne</p>
              <p>
                <progress className="progress" value="15" max="100">15%</progress>
              </p>
            </div>
          </div>
        </nav>
        <nav className="level">
          <div className="level-left">
            <div className="level-item has-text-centered">
              <a className="link is-info">92</a>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <p className="heading">Hauts-de-Seine</p>
              <p>
                <progress className="progress" value="15" max="100">15%</progress>
              </p>
            </div>
          </div>
        </nav>
        <nav className="level">
          <div className="level-left">
            <div className="level-item has-text-centered">
              <a className="link is-info">75</a>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <p className="heading">Paris</p>
              <p>
                <progress className="progress" value="15" max="100">15%</progress>
              </p>
            </div>
          </div>
        </nav>
      </div>
      <div className="container">
        <h2 className="title is-3">À propos</h2>
        <p>Les données affichées sont mises à la disposition du public par la région Île-de-France et régulièrement mises à jour.</p>
        <p>Cet observatoire a été mis en place par le Collectif Vélo Île-de-France. Créé en mars 2019, il a pour objectif de faire de l’Île-de-France une région cyclable, où toutes et tous peuvent se déplacer à vélo de manière sûre, confortable et efficate, quels que soient leur âge et leur niveau.</p>
        <p><a>En savoir plus</a></p>
        <img/>
      </div>
    </section>
  )
}
