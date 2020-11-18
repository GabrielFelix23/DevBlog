import React from 'react'
import firebase from '../../firebase'
import {Link, withRouter} from 'react-router-dom'

import './dashboard.css'
import foto from './fotos.png'
import perfil from './perfil.png'

class Dashboard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      nome: localStorage.nome,
      fotoPerfil: localStorage.fotoPerfil,
      semFoto: ''
    }
    this.foto = this.foto.bind(this)
    this.deslogar = this.deslogar.bind(this)
  }

  async componentDidMount(){
    if(!firebase.logado()){
      this.props.history.replace("/login")
      return null
    }

    await firebase.nomeUser((info)=>{
      localStorage.nome = info.val().nome
      this.setState({nome: localStorage.nome })
    })
    this.foto()
  }
 
  async foto(){
    await firebase.fotoPerfil((foto) => {
      localStorage.fotoPerfil = foto.val().fotoPerfil
      this.setState({fotoPerfil: localStorage.fotoPerfil})
    })

    if(!localStorage.fotoPerfil){
      this.setState({
        semFoto: <img src={perfil} alt="foto" className="semfoto"/>
      })
    }   
  }

  deslogar(){
    firebase.deslogar().then(() => {
      this.props.history.push('/')
      localStorage.removeItem('fotoPerfil')
      window.location.reload()
    })
  }

  render() {
    return (
      <section id="containerDeslogar">
        <div className="caixas">
          <div className="fotoPerfil">
            {this.state.semFoto !== '' ? 
              <p>{this.state.semFoto}</p>
              :
              <img src={this.state.fotoPerfil} alt="Foto de perfil" className="perfil"/>  
            }
          </div>
          <p>Olá {this.state.nome}</p>
          <p>Logado: {firebase.logado()}</p>
          <Link to={'/perfil'}>Perfil</Link>
          <button onClick={this.deslogar}>Deslogar</button>
        </div>
        
        <div className="caixas fundoVerde">
          <div className="foto">
            <img src={foto} alt="foto"/>
          </div>
          <p>Suas atividades</p>
          <Link to={'/'}>Feed de noticias</Link>
          <Link to={'/postagens'}>Postar +</Link>
        </div>
      </section>
    )
  }
}

export default withRouter(Dashboard)