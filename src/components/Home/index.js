import React from 'react'
import firebase from '../../firebase'
import {Link} from 'react-router-dom'
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
                <div className="containerNomePerfil">
                  <img className="fotoDePerfil" src={posts.perfil}/>
                  <p className="titulo">{posts.autor}</p>
                </div>
                <img src={posts.image} alt="Capa do post"/>
                <p className="descricao"><small>{posts.autor}</small> {posts.descricao}</p>
                <Link className="buttonMaisSobre" to={`/comentarios/${posts.key}`}>Mais sobre</Link>
            </article>  
          )
        })}
      </section>
    )
  }
}

export default Home