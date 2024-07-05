
function ItemMenu( props ){ // verificar não está usando
    return(
        <Link href={props.url} className="d-flex gap-3 px-3 py-3" >
            <span className="text-zinc-200">{props.label}</span>
        </Link>
    )
}

export function Menu( props ){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#">CRUD React JS</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active text-white" aria-current="page" href="/views/categoria">Categorias</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" aria-current="page" href="#">Clientes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" aria-current="page" href="#">Produtos</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}