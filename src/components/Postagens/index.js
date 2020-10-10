import React from 'react'
import firebase from '../../firebase'
import {Link, withRouter} from 'react-router-dom'

import './postagens.css'

class Postagens extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      senha: '',
      erro: ''
    }
  }

  render() {
    return (
     <section id="postagen">
       <div className="containerpostagen">
          <h2>{this.state.erro}</h2>
          <h1>Postagem:</h1>
          <form onSubmit={this.postar}>
            <label>Nome: </label><br/>
            <input type="text" placeholder="Jorge..." autoFocus value={this.state.nome}
              onChange={(e) => this.setState({nome: e.target.value})}/><br/>

            <label>Foto de perfil: </label><br/>
            <input type="text" placeholder="https://..." autoFocus value={this.state.perfil}
              onChange={(e) => this.setState({perfil: e.target.value})}/><br/>

            <label>Imagem do Post: </label><br/>
            <input type="text" placeholder="https://..." autoFocus value={this.state.imagem}
              onChange={(e) => this.setState({imagem: e.target.value})}/><br/>

            <label>Comentário: </label><br/>
            <input type="text" placeholder="Está imagem é..." autoFocus value={this.state.comentario}
              onChange={(e) => this.setState({comentario: e.target.value})}/><br/>

            <button type="submit">Postar</button>
           <Link to={'/dashboard'} className="buttonCancelar">Cancelar</Link>
          </form>

       </div>
     </section>
    );
  }
}

export default withRouter(Postagens)