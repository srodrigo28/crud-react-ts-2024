import { Link } from "react-router-dom"

export function Menu(){
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
                            <Link to="categoria">
                                <p className="nav-link active text-white" > Categorias</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="cliente">
                                <p className="nav-link active text-white"> Clientes</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="cliente">
                                <p clpssName="nav-link active text-white"> Produtos</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}