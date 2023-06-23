export default function DepartementStats({name, code, progress}: {name: string, code: string, progress: number}) {
    return(
    <nav className="level">
      <div className="level-left">
        <div className="level-item has-text-centered">
          <a className="link is-info">{code}</a>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <p className="heading">{name}</p>
          <p>
            <progress className="progress" value="15" max="100">{progress}%</progress>
          </p>
        </div>
      </div>
    </nav>
    )
}
