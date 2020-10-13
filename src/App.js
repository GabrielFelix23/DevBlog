import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import firebase from './firebase'

import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Cadastro from './components/Cadastro'
import Dashboard from './components/Dashboard'
import Perfil from './components/Perfil'
import Postagens from './components/Postagens'

import Error from './components/Error'
import './global.css'
import './app.css'

class App extends React.Component{

  state = {
    estaLogado: false
  }

  componentDidMount(){
    firebase.online().then((resultado) => {
      this.setState({
        estaLogado: resultado
      })
    })
  }

  render() {
    return this.state.estaLogado !== false ?(
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/cadastro" component={Cadastro}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/perfil" component={Perfil}/>
          <Route exact path="/postagens" component={Postagens}/>
          
          <Route path="*" component={Error}/>
        </Switch>
      </BrowserRouter>
    ):
    <div id="loading">
      <h1>Carregando...</h1>
    </div>
  }
}

export default App