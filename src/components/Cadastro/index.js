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
  
  cadastro = async (e) =>{
    e.preventDefault()
    const {nome, email, senha} = this.state
    await firebase.cadastrar(nome, email, senha)
    .then(() => {
      this.props.history.replace('/fotoPerfil')
    }).catch((error) => {
      this.setState({
        erro: "Ocorreu um erro ao cadastrar o seu perfil.\nTente novamente mais tarde."
      })
    })
    
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
            <input type="email" placeholder="teste@teste.com" autoFocus required value={this.state.email}
              onChange={(e) => this.setState({email: e.target.value})}/><br/>

            <label>Senha: </label><br/>
            <input type="password" placeholder="****" autoFocus required value={this.state.senha}
              onChange={(e) => this.setState({senha: e.target.value})}/><br/>

            <button type="submit">Cadastrar</button>
            <Link to={'/login'} className="buttonCancelar">Cancelar</Link>
          </form>

       </div>
     </section>
    )
  }
}

export default withRouter(Cadastro)