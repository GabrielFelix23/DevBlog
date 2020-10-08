import React from 'react'
import firebase from '../../firebase'
import './home.css'

class Home extends React.Component{
  state = {
    posts: [],
  }

  componentDidMount(){
    firebase.app.ref('posts').on('value', (snapshot) => {
      let state = this.state
      state.posts = []

      snapshot.forEach((childItem) => {
        state.posts.push({
          key: childItem.key,
          autor: childItem.val().autor,
          descricao: childItem.val().descricao,
          image: childItem.val().image
        })
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
                <p className="titulo">Autor: {posts.autor}</p>
                <img src={posts.image} alt="Capa do post"/>
                <p className="descricao">Descrição: {posts.descricao}</p>
            </article>  
          )
        })}
      </section>
    );
  }
}

export default Home