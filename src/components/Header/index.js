import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Logo from './logo.png'
import firebase from '../../firebase'

import './header.css'

class Header extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      botaoEntrar: ''
    }
    this.deslogar = this.deslogar.bind(this)
  }

  componentDidMount(){
    if(firebase.logado()){
      this.setState({
        botaoEntrar: 'Sair'
      })
    }else{
      this.setState({
        botaoEntrar: 'Entrar'
      })
    }
  }

  deslogar(){
    firebase.deslogar().then(() => {
      this.props.history.push('/')
      localStorage.removeItem('nome')
      localStorage.removeItem('fotoPerfil')
      window.location.reload()
    })
  }
  
  render() {
    return (
      <header id="header">
        <Link className="logo" to={'/'}>
          <img src={Logo}/> 
          <h1>DevBlog</h1>
        </Link>
        {this.state.botaoEntrar === 'Sair' ? 
          <div className="containerBotao">
            <Link className="button dash" to={'/dashboard'}><h3>Dashboard</h3></Link>

            <Link onClick={this.deslogar} className="button" to={'/login'}><h3>{this.state.botaoEntrar}</h3></Link>
          </div>
          :
          <div className="containerButton">
            <Link className="button" to={'/login'}><h3>{this.state.botaoEntrar}</h3></Link>
          </div>
        }
      </header>
    );
  }
}

export default withRouter(Header)