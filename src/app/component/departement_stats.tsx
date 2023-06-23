export default function DepartementStats({name, code, progress}: {name: string, code: string, progress: number}) {
    return(
    <div className="columns is-mobile is-vcentered">
      <div className="column is-2 is-size-3 pr-0">
          <a className="link is-info">{code}</a>
      </div>
      <div className="column has-text-left pl-0">
        <p className="heading is-size-6 mb-0">{name}</p>
        <p>
          <progress className="progress" value="15" max="100">{progress}%</progress>
        </p>
      </div>
    </div>
    )
}
