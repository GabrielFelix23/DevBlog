import React from 'react'
import firebase from '../../firebase'
import {Link, withRouter} from 'react-router-dom'

import './postagens.css'

class Postagens extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      perfil: '',
      imagem: null,
      comentario: '',
      sucesso: '',
      erro: '',
      url: '',
      progress: 0
    }
    this.postar = this.postar.bind(this)
    this.fotoPost = this.fotoPost.bind(this)
    this.salvarFoto = this.salvarFoto.bind(this)
  }

  postar(e){
    let post = firebase.app.ref('posts')
    let chave = post.push().key

    post.child(chave).set({
      autor: localStorage.nome,
      descricao: this.state.comentario,
      image: this.state.imagem,
      perfil: this.state.perfil
    })
    .then(() => {
      this.props.history.replace('/')
    }).catch((Erro) => {
      this.setState({
        erro: "Houve um erro ao postar! Tente novamente mais tarde."
      })
    })
    e.preventDefault()
  }

  fotoPost = async (e) => {
    if(e.target.files[0]){
      const image = e.target.files[0]
      if(image.type == 'image/png' || image.type == 'image/jpg' || image.type == 'image/jpeg'){
        await this.setState({imagem: image})
        this.salvarFoto()
      }else{
        alert("Apenas arquivos PNG e jPEG.")
        this.setState({imagem: null})
        return null
      }
    }
  }

  salvarFoto = async () => {
    const {imagem} = this.state
    const uid = firebase.Uid()
    const salvandoImg = firebase.storage.ref(`images/${uid}/${imagem.name}`).put(imagem)

    await salvandoImg.on('state_change', (snapshot) => {
      //progresso
      const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({progress: progress})

    }, (erro) => {
      //Erro
      console.log("Erro: " + erro)

    }, (sucesso) => {
      //Pegando a url da imagem para postar no feed
      firebase.storage.ref(`images/${uid}`)
      .child(imagem.name).getDownloadURL()
      .then((url) => {
        this.setState({url: url})
      })
    })
  }

  componentDidMount(){
    if(!firebase.logado()){
      this.props.history.replace('login')
      return null
    }
  }

  render() {
    return (
     <section id="postagem">
       <div className="containerpostagem">
          <h2 className="sucesso">{this.state.sucesso}</h2>
          <h2>{this.state.erro}</h2>

          <h1>Postagem:</h1>
          <form onSubmit={this.postar}>
            <input type="file" onChange={this.fotoPost}/>
            {this.state.url != '' ? 
              <img src={this.state.url} width="250" height="150" alt="Capa do post"/>  
              :
              <progress value={this.state.progress} max="100"/>
            }
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