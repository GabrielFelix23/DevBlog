import React from 'react'
import firebase from '../../firebase'
import './home.css'

class Home extends React.Component{
  state = {
    posts: [],
  }

  async componentDidMount(){
    await firebase.app.ref('posts').on('value', (snapshot) => {
      let state = this.state
      this.state.posts = []

      snapshot.forEach((childItem) => {
        state.posts.push({
          key: childItem.key,
          autor: childItem.val().autor,
          descricao: childItem.val().descricao,
          image: childItem.val().image,
          titulo: childItem.val().titulo,
          perfil: childItem.val().perfil
        })
        state.posts.reverse()
        this.setState(state)
      })
    })
  }

  render() {
    return (
      <section id="posts">
        {this.state.posts.map((posts) => {
          return(   
            <article key={posts.key}>
                <div className="containerPerfil">
                  <img className="fotoDePerfil" src={posts.perfil}/>
                  <p className="titulo">{posts.autor}</p>
                </div>
                <p>Titulo: {posts.titulo}</p>
                <img src={posts.image} alt="Capa do post"/>
                <p className="descricao">Comentário: {posts.descricao}</p>
            </article>  
          )
        })}
      </section>
    );
  }
}

export default Home