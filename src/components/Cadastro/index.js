import React from 'react'
import firebase from '../../firebase'
import {Link, withRouter} from 'react-router-dom'

import './cadastro.css'

class Cadastro extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      nome: '',
      email: '',
      senha: '',
      erro: ''
    }
    this.cadastro = this.cadastro.bind(this) 
  }
  
  cadastro(e){
    const {nome, email, senha} = this.state
    firebase.cadastrar(nome, email, senha)
    .then(() => {
      this.props.history.replace('/dashboard')
    }).catch((error) => {
      this.setState({
        erro: "Ocorreu um erro ao cadastrar o seu perfil.\nTente novamente mais tarde."
      })
    })
    e.preventDefault()
  }

  render() {
    return (
     <section id="cadastro">
       <div className="containerCadastro">
          <h2>{this.state.erro}</h2>

          <form onSubmit={this.cadastro}>
            <label>Nome: </label><br/>
            <input type="text" placeholder="Seu nome: " autoFocus required value={this.state.nome}
              onChange={(e) => this.setState({nome: e.target.value})}/><br/>

            <label>Email: </label><br/>
            <input type="text" placeholder="teste@teste.com" autoFocus required value={this.state.email}
              onChange={(e) => this.setState({email: e.target.value})}/><br/>

            <label>Senha: </label><br/>
            <input type="password" placeholder="****" autoFocus required value={this.state.senha}
              onChange={(e) => this.setState({senha: e.target.value})}/><br/>

            <button type="submit">Cadastrar</button>
            <button type="submit" className="buttonCancelar"><Link to={'/login'}>Cancelar</Link></button>
          </form>

       </div>
     </section>
    )
  }
}

export default withRouter(Cadastro)