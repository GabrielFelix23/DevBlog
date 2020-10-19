import React from 'react'
import {Link} from 'react-router-dom'
import Logo from './logo.png'
import firebase from '../../firebase'

import './header.css'

class Header extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      teste: null
    }
  }

  componentDidMount(){
    if(firebase.logado()){
      this.setState({
        teste: this.state.teste =  'Sair',
      })
    }else{
      this.setState({
        teste: 'Entrar'
      })
    }
  }
  
  render() {
    return (
      <header id="header">
        <Link className="logo" to={'/'}>
          <img src={Logo}/> 
          <h1>DevBlog</h1>
        </Link>
      
        <Link className="button" to={'/login'}><h3>{this.state.teste}</h3></Link>
      </header>
    );
  }
}

export default Header