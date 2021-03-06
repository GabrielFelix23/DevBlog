import React from 'react'
import firebase from '../../firebase'
import {Link, withRouter} from 'react-router-dom'

import IconePerfil from './perfil.png'
import './perfil.css'

class Perfil extends React.Component{
    async componentDidMount(){
       if(!firebase.logado()){
           await this.props.history.replace('/login')
           return null
       }
    }

    render() {
        return (
           <article id="containerPerfil">
               <div className="container">
                    <img src={IconePerfil} alt="incone perfil"/>
                    <Link to={'/editCadastro'}>Editar Perfil</Link>
                    <Link to={'/dashboard'} className="voltar">Voltar</Link>
               </div>
           </article>
        )
    }
}

export default withRouter(Perfil) 