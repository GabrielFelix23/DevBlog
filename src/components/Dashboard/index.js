import React from 'react'
import firebase from '../../firebase'
import {Link, withRouter} from 'react-router-dom'

import './dashboard.css'
import foto from './fotos.png'
import fotoPerfil from './perfil.png'

class Dashboard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      nome: localStorage.nome,
    }
    this.deslogar = this.deslogar.bind(this)
  }

  async componentDidMount(){
    if(!firebase.logado()){
      this.props.history.replace("/login")
      return null
    }

    firebase.nomeUser((info)=>{
      localStorage.nome = info.val().nome
      this.setState({nome: localStorage.nome })
    })
  }


  deslogar(){
    firebase.deslogar().then(() => {
      this.props.history.push('/')
      localStorage.removeItem('nome')
    })
  }

  render() {
    return (
      <section id="containerDeslogar">
        <div className="caixas">
          <div className="fotoPerfil">
            <img src={fotoPerfil} alt="foto"/>
          </div>
          <p>Olá {this.state.nome}</p>
          <p>Logado: {firebase.logado()}</p>
          <button onClick={this.deslogar}>Deslogar</button>
        </div>
        
        <div className="caixas fundoVerde">
          <div className="foto">
            <img src={foto} alt="foto"/>
          </div>
          <p>Postar +</p>
          <Link to={'/postagens'}>Postar</Link>
        </div>
      </section>
    )
  }
}

export default withRouter(Dashboard)