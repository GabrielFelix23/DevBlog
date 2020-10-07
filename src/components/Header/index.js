import React from 'react'
import {Link} from 'react-router-dom'
import Logo from './logo.png'

import './header.css'

class Header extends React.Component{
  render() {
    return (
      <header id="header">
        <Link className="logo" to={'/'}>
          <img src={Logo}/> 
          <h1>DevBlog</h1>
        </Link>
      
        <Link className="button" to={'/login'}><h3>Entrar</h3></Link>
      </header>
    );
  }
}

export default Header