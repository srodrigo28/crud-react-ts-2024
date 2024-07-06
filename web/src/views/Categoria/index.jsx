import { useState, useEffect } from "react"
import axios from "axios";
import './categoria.css';
import { Menu } from "../../templates/Menu";

export function Categoria(){
    const url = "http://localhost:8080/categoria"
    const [id, setId] = useState('')
    const [nome, setNome] =  useState('')
    const [data, setData] = useState([])
    const [error, setError] = useState()

    const [classBtnInserir, setClassBtnInserir] = useState('Inserir')
    const [classBtnShow, setclassBtnShow] = useState('sumir')

    /** Listar */
    useEffect( () => {
        axios.get(url)
        .then( response => setData(response.data) )
    }, [data, setData])

    /** Inserir com validação */
    const Inserir = (e) => {
        e.preventDefault()

        if( !nome) { 
            alert("Precisa preencher o campo!")
            return false;
        }

        e.preventDefault()
        if(nome === ""){
            setError("Preencha o campo")
            alert(error)
        }

        axios.post(url, {
            nome
        })
        .then( () => {
                alert(nome + " Cadastrado com sucesso")
                setNome('')
            }
        )
        .catch( (error) => {
            console.log('erro: ' + error)
        })
    }

    /** Removendo um item */
    const Remover = ( id, nome ) => {
        console.log(nome)
        const res = window.confirm('Deseja realmente excluir? ' + nome)
       
        /** */
        if(res === true){
            axios.delete(`${url}/${id}`)
            return false
        }
        
    }

    /** Metodo Carregar campos para editar  */
    const CarregaCampos = ( id, nome ) => {
            setClassBtnInserir('sumir')
            setclassBtnShow('')
            
            setId(id)
            setNome(nome)
    }

    /** Metodo Alterar  */
    const Alterar = (e) =>{
        e.preventDefault()
        
        const res = window.confirm('Deseja realmente Alterar ? ' + nome)

        if(res){
             // axios.put(url+`/${id}`, {
            axios.put( `${url}/${id}`, {
                nome
            })
            .then( () => {
                    alert("Alterado com sucesso " + nome)
                    setNome(''), setId('');

                    setClassBtnInserir('')
                    setclassBtnShow('sumir')
                }
            )
            .catch( (error) => {
                console.log('erro: ' + error)
            })

            return false
        } 
    }

    /** Metodo Cancelar  */
    const Cancelar = (e) => {
        e.preventDefault()

        setClassBtnInserir('')
        setclassBtnShow('sumir')
    }
    
    return(
        <div className="flex">
            <Menu />
            <div className="container">
            
                <div className="flex bg-blue-700 py-10 mt-3 mb-3 justify-center ">
                    <h1 className="text-white font-bold text-3xl">Cadastro de Categorias</h1>
                </div>
                
            <form onSubmit={Inserir} className="mb-3 bg-zinc-300 py-3 p-3">
                <div className="row mb-3">
                    
                    <div className="col col-2">
                        <input 
                            disabled
                            type="text" 
                            value={id}
                            placeholder="Código"
                            className="form-control text-center"
                            onChange={ e => setId(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="text" 
                            value={nome}
                            placeholder="Nome"
                            className="form-control"
                            onChange={ e => setNome(e.target.value)}
                        />
                    </div>

                </div>
                    <button 
                        className={`btn btn-success text-white ${classBtnInserir}`}
                    >Inserir</button>
                    <button 
                        className={`btn btn-warning text-white mr-3 ${classBtnShow}`} onClick={ Alterar }
                    >Alterar</button>
                    <button 
                        className={`btn btn-danger text-white ${classBtnShow}`} onClick={ Cancelar }
                    >Cancelar</button>
            </form>

            <table className="table">
                    <thead className="">
                        <tr  className="bg-zinc-900">
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td className="w-75">{item.nome}</td>
                                <td className="d-flex gap-2">
                                    <button className="btn btn-outline-warning" onClick={ () => CarregaCampos( item.id, item.nome ) }>
                                        Alterar
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={ () => Remover(item.id, item.nome)}>
                                        Apagar
                                    </button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
            </table>
                
            </div>
        </div>
    )
}