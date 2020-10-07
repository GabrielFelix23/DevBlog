import React from 'react'
import firebase from '../../firebase'
import {Link} from 'react-router-dom'

import './login.css'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      senha: '',
      erro: ''
    }
    this.login = this.login.bind(this)
  }

  login(e) {
      const {email, senha} = this.state

      firebase.logar(email, senha)
      .catch((error) => {
          this.setState({
            erro: "Erro ao logar! Tente novamente mais tarde."
          })
      })
      e.preventDefault()
  }

  render() {
    return (
     <section id="login">
       <div className="containerLogin">
          <h2>{this.state.erro}</h2>
          <form onSubmit={this.login}>
            <label>Email: </label><br/>
            <input type="text" placeholder="teste@teste.com" autoFocus value={this.state.email}
              onChange={(e) => this.setState({email: e.target.value})}/><br/>

            <label>Senha: </label><br/>
            <input type="password" placeholder="****" autoFocus value={this.state.senha}
              onChange={(e) => this.setState({senha: e.target.value})}/><br/>

            <button type="submit">Entrar</button>

            <footer>
              <p>Crie seu perfil <Link to={'/cadastro'}>Aqui!</Link></p>
            </footer>
          </form>

       </div>
     </section>
    );
  }
}

export default Login