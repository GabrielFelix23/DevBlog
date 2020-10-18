import React from 'react'
import firebase from '../../../firebase'
import {Link} from 'react-router-dom'

import './editPerfil.css'

class EditPerfil extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nome: '',
            email: '',
            senha: '',
        }
        this.editar = this.editar.bind(this)
    }

    async editar(e){
        e.preventDefault()
        const {nome, email, senha} = this.state

        const uid = firebase.Uid()
        await firebase.app.ref('usuario').child(uid).set({
            nome: nome,
        })
    }

    async componentDidMount(){
        if(!firebase.logado()){
            await this.props.history.replace('/login')
            return null
        }
     }

    render() {
        return (
            <article id="containerEditPerfil">
                <div className="container">
                    <form onSubmit={this.editar}>
                        <label>Nome: </label><br/>
                        <input type="text" placeholder="Teste..."
                            value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})}/><br/>                        
                        <div className="containerButton">
                            <button type="submit">Editar</button>
                            <Link to={'/perfil'} className="buttonVoltar">Voltar</Link>
                        </div>
                    </form>
                </div>
            </article>
        )
    }
}

export default EditPerfil 