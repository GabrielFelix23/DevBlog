import React from 'react'
import firebase from '../../firebase'
import {Link, withRouter} from 'react-router-dom'

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

  login = async (e) => {
      e.preventDefault()

      const {email, senha} = this.state

      await firebase.logar(email, senha)
      .then(() => {
        window.location.reload()
        this.props.history.replace('/dashboard')
      })
      .catch((error) => {
          this.setState({
            erro: "Email ou senha incorreta."
          })
      })
  }

  componentDidMount(){
    if(firebase.logado()){
      return this.props.history.replace('/dashboard')
    }
  }

  render() {
    return (
     <section id="login">
       <div className="containerLogin">
          <h1>Login</h1>
          <h2>{this.state.erro}</h2>
          <form onSubmit={this.login}>
            <label>Email: </label><br/>
            <input type="email" placeholder="teste@teste.com" autoFocus required 
            value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/><br/>

            <label>Senha: </label><br/>
            <input type="password" placeholder="****" required autoFocus value={this.state.senha}
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

export default withRouter(Login)