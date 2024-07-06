import { useEffect, useState } from "react";
import './produto.css'
// import { Menu } from "../../templates/Menu";
import axios from "axios";

export function Produto(){
    const url = "http://localhost:8080/produto"
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [id, setId] = useState()

    /** Controles dos inputs */
    const [nome, setNome] = useState('')
    const [quantidade, setQuantidade] = useState(0)
    const [preco, setPreco] = useState(0)

    const [classBtnInserir, setClassBtnInserir] = useState('Inserir')
    const [classBtnShow, setClassBtnShow] = useState('sumir')

    /** Listar todos */
    useEffect(() => {
        axios.get(url)
       .then( response => setData(response.data) )
    }, [data, setData])

    const Inserir = (e) => {
        e.preventDefault()

        console.log( "Nome: " + nome, " Qtd: " + quantidade, " Preço: " + preco)

        if( !nome || !quantidade || !preco ){
            alert("Todos os campos devem ser preenchidos!")
            return false;
        }else{
            axios.post(url, {
                nome, quantidade, preco}
            )
           .then( () => {
                alert("Nome: " + nome )
                setNome('')
                setQuantidade(0)
                setPreco(0)
           })
           .catch( () => {
             alert("Erro ao cadastrar!")
           })
        }

    }

    const Remover = (id, nome) => {

        const res = window.confirm('Deseja apagar? ' + nome)

        if(res === true){
            axios.delete(url + "/" + id)
       
            .then( () => {
                alert("Apagado com sucesso!")
            })
        }
    }

    const CarregarInput = (id, nome, quantidade, preco) => {
        setClassBtnInserir('sumir')
        setClassBtnShow('')

        setId(id)
        setNome(nome)
        setQuantidade(quantidade)
        setPreco(preco)
    }

    const Alterar = (e) => {
        e.preventDefault()

        const res = window.confirm('Deseja realmente Alterar ? ' + nome )

        if(res){
            axios.put(url + "/" + id, {
                nome, quantidade, preco
            })
    
           .then( () => {
             alert("Alterado com sucesso!")
             setNome('')
             setQuantidade(0)
             setPreco(0)

             setClassBtnInserir('')
             setClassBtnShow('sumir')
 
           })
            .catch( () => {
             alert("Erro ao alterar!")
           })
        }
        
    }

    const Cancelar = (e) => {
        e.preventDefault()

        setNome('')
        setPreco('')
        setQuantidade('')

        setClassBtnInserir('')
        setClassBtnShow('sumir')
    }

    return(
        <div className="">
            {/* <Menu /> */}
            <div className="container">
                <div className="bg-success p-3 text-white mt-3 text-center">
                    <h1>Cadastrar Produto</h1>
                </div>
                
                <form className="d-flex flex-column mt-3">
                    <div className="row">
                        <div className="col-6">
                            <input 
                                type="text" 
                                value={nome}
                                placeholder="nome" 
                                className="form-control"
                                onChange={ e => setNome(e.target.value) }
                            />
                        </div>
                        <div className="col">
                            <input 
                                type="text" 
                                value={quantidade}
                                placeholder="quantidade" 
                                className="form-control"
                                onChange={ e => setQuantidade(e.target.value) }
                            />
                        </div>
                        <div className="col">
                            <input 
                                type="text" 
                                value={preco}
                                placeholder="preço" 
                                className="form-control"
                                onChange={ e => setPreco(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col d-flex gap-2">
                            <button 
                                className="btn btn-outline-success"
                                onClick={Inserir}>Inserir</button>
                            <button className={`btn btn-outline-warning ${classBtnShow}`} onClick={ Alterar }>Alterar</button>
                            <button className={`btn btn-outline-danger ${classBtnShow}`} onClick={ Cancelar }>Cancelar</button>
                        </div>
                    </div>
                </form>

                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th className="w-25">Nome</th>
                            <th>QTD</th>
                            <th>Preço</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map( (item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{item.preco}</td>
                                    <td className="d-flex gap-2">
                                        <button 
                                            onClick={ () => CarregarInput(item.id, item.nome, item.quantidade, item.preco) }
                                            className="btn btn-sm btn-outline-primary w-25"
                                            >Edit</button>
                                        <button 
                                            onClick={ () => Remover(item.id, item.nome) }
                                            className="btn btn-sm btn-outline-danger w-25"
                                        >Del</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}