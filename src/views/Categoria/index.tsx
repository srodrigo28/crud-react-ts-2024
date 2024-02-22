import { useState, useEffect } from "react"
import axios from "axios";

type CategoriaTypes = {
    id?: string
    nome: string,
}

export function Categoria(){
    const url = "http://localhost:3000/categoria"
    const [id, setId] = useState<String>()
    const [nome, setNome] =  useState('')
    const [data, setData] = useState<CategoriaTypes[]>([])
    const [error, setError] = useState<string | null>(null)
    const [classBtnInserir, setClassBtnInserir] = useState('Inserir')
    const [classBtnAlterar, setClassBtnAlterar] = useState('sumir')

    /** Listar */
    useEffect( () => {
        axios.get(url)
        .then( response => setData(response.data) )
    }, [data, setData])

    /** Inserir com validação */
    const Inserir = (e: any) => {
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
    const Remover = ( { id, nome  } : CategoriaTypes) => {
        const res = window.confirm('Deseja realmente excluir? ' + nome)
        if(res === true){
            axios.delete(`${url}/${id}`)
            return false
        }
    }

    /** Metodo Carregar campos para editar  */
    const CarregaCampos = ( {nome, id}: CategoriaTypes) => {
            setClassBtnInserir('sumir')
            setClassBtnAlterar('')
            setNome(nome), setId(id);
    }

    /** Metodo Alterar  */
    const Alterar = (e: any) =>{
        e.preventDefault()
        console.log( "Nome = " + nome );
        
        // axios.put(url+`/${id}`, {
        axios.put( `${url}/${id}`, {
            nome
        })
        .then( () => {
                alert("Alterado com sucesso " + nome)
                setNome(''), setId('');

                setClassBtnInserir('')
                setClassBtnAlterar('sumir')
            }
        )
        .catch( (error) => {
            console.log('erro: ' + error)
        })
        
    }
    
    return(
        <div className="container">
            <h1 className="mt-5">Cadastro de Categorias</h1>
            
           <form onSubmit={Inserir}>
            <div className="row mb-3">
                <div className="col">
                    <input 
                        type="text" 
                        value={nome}
                        placeholder="Nome"
                        className="form-control"
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
            </div>
            <div className="btn-group gap-3">
                <button className={`btn btn-success ${classBtnInserir}`}>Inserir</button>
                <button className={`btn btn-warning ${classBtnAlterar}`}>Alterar</button>
            </div>
           </form>

           <table>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
           </table>
            
        </div>
    )
}