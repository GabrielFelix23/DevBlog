import React from 'react'
import firebase from '../../firebase'
import {withRouter} from 'react-router-dom'

import './dashboard.css'
import foto from './fotos.png'
import fotoPerfil from './perfil.png'

class Dashboard extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
    this.deslogar = this.deslogar.bind(this)
  }

  deslogar(){
    firebase.deslogar().then(() => {
      this.props.history.push('/')
    })
  }

  render() {
    return (
      <section id="containerDeslogar">
        <div className="caixas">
          <div className="fotoPerfil">
            <img src={fotoPerfil} alt="foto"/>
          </div>
          <p>Nome: </p>
          <p>Email: </p>
          <button onClick={this.deslogar}>Deslogar</button>
        </div>
        
        <div className="caixas fundoVerde">
          <div className="foto">
            <img src={foto} alt="foto"/>
          </div>
          <p>Postar +</p>
          <button>Postar</button>
        </div>
      </section>
    )
  }
}

export default withRouter(Dashboard)