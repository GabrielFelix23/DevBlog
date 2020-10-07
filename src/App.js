import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Cadastro from './components/Cadastro'
import Dashboard from './components/Dashboard'
import Postagens from './components/Postagens'

import Error from './components/Error'
import './global.css'

class App extends React.Component{
  render() {
    return (
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/cadastro" component={Cadastro}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/postagens" component={Postagens}/>
          
          <Route path="*" component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App