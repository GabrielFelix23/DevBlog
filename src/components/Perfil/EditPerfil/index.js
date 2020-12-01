import React from 'react'
import firebase from '../../../firebase'
import {Link} from 'react-router-dom'
import semFoto from './perfil.png'

import './editPerfil.css'

class EditPerfil extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nome: localStorage.nome,
            imagem: null,
            url: '',
            progress: 0
        }
        this.editar = this.editar.bind(this)
    }

    async editar(e){
        e.preventDefault()
        const {nome} = this.state

        const uid = firebase.Uid()
        await firebase.app.ref('usuario').child(uid).set({
            nome: nome,
        })
        .then(() => {
            this.props.history.replace("/dashboard")
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
                    <h1>Foto de perfil: </h1>

                    <form onSubmit={this.editar}>  
                        <div className="containerFotoPerfil">
                            {!localStorage.fotoPerfil ?
                                <img src={semFoto} className="semFoto" alt="foto de perfil"/>
                                :
                                <img src={localStorage.fotoPerfil} className="semFoto" alt="foto de perfil"/>
                            }
                            
                            <Link to={'/fotoPerfil'} className="buttonFotoPerfil">Foto de Perfil</Link>
                        </div>          
                        <label>Nome: </label>
                        <input type="text" placeholder="Gabriel..."
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