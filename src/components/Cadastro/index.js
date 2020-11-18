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
      confirmarSenha: '',
      erro: ''
    }
    this.cadastro = this.cadastro.bind(this) 
  }
  
  cadastro = async (e) =>{
    e.preventDefault()
    const {nome, email, senha, confirmarSenha} = this.state

    await firebase.cadastrar(nome, email, senha)
    .then(() => {
      this.props.history.replace('/fotoPerfil')
    })
    .catch((error) => {
      if(confirmarSenha != senha){
        this.setState({
          erro: "As senhas não estão iguais!"
        })
      }
    })
  }

  render() {
    return (
     <section id="cadastro">
       <div className="containerCadastro">
          <h1>Cadastre-se</h1>
          <h2>{this.state.erro}</h2>

          <form onSubmit={this.cadastro}>

            <label>Nome: </label>
            <div className="containerInputs">
              <input type="text" placeholder="Seu nome: " autoFocus required value={this.state.nome}
                onChange={(e) => this.setState({nome: e.target.value})}/><br/>
                <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
            </div>
            
            <label>Email: </label>
            <div className="containerInputs">
              <input type="email" placeholder="teste@teste.com" autoFocus required 
                value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/><br/>
                <i class="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i>
            </div>

            <label>Senha: </label>
            <div className="containerInputs">
              <input type="password" placeholder="****" autoFocus required value={this.state.senha}
                onChange={(e) => this.setState({senha: e.target.value})}/><br/>
                <i class="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i>
            </div>

            <label>Confirmar senha: </label>
            <div className="containerInputs">
              <input type="password" placeholder="****" autoFocus required value={this.state.confirmarSenha} onChange={(e) => this.setState({confirmarSenha: e.target.value})}/><br/>
                <i class="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i>
            </div>

            <button type="submit">Cadastrar</button>
            <Link to={'/login'} className="buttonCancelar">Cancelar</Link>
          </form>

       </div>
     </section>
    )
  }
}

export default withRouter(Cadastro)