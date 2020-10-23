import React from 'react'
import firebase from '../../../firebase'
import {Link} from 'react-router-dom'

class Comentarios extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            key: '',
            nome: '',
            imagem: '',
            perfil: '',
            descricao: '',
            comentar: '',
            listarComentarios: []
        }
        this.comentar = this.comentar.bind(this)
        this.listarComentarios = this.listarComentarios.bind(this)
    }
    
    async componentDidMount(){
        const {id} = this.props.match.params

        await firebase.app.ref('posts').child(id).on('value', (snapshot) => {
            this.setState({
                key: snapshot.val().key,
                nome: snapshot.val().autor,
                imagem: snapshot.val().image,
                perfil: snapshot.val().perfil,
                descricao: snapshot.val().descricao
            })
        })
        this.listarComentarios()
    }

    async comentar(e){
        e.preventDefault()

        const { id } = this.props.match.params
        const user = firebase.app.ref('posts').child(id).child("comentario")
        const chave = user.push().key

        await user.child(chave).set({
            comentario: this.state.comentar
        })
    }

    async listarComentarios(){
        const { id } = this.props.match.params
        await firebase.app.ref('posts').child(id).child('comentario').on('value', (snapshot) => {
            let state = this.state
            state.listarComentarios = []
      
            snapshot.forEach((childItem) => {
              state.listarComentarios.push({
                key: childItem.key,
                perfil: localStorage.fotoPerfil,
                autor: localStorage.nome,
                comentario: childItem.val().comentario
              })
              this.setState(state)
            })
        })
    }

    render() {
        return (
            <section id="posts">  
                <article key={this.state.key}>
                    <div className="containerNomePerfil">
                        <img className="fotoDePerfil" src={this.state.perfil}/>
                        <p className="titulo">{this.state.nome}</p>
                        <div className="containerButtonVoltar">
                            <Link to={"/"}>Voltar</Link>
                        </div>
                    </div>
                    <img src={this.state.imagem} alt="Capa do post"/>
                    <p className="descricao"><small>{this.state.nome}</small> {this.state.descricao}</p>

                    {this.state.listarComentarios.map((lista) => {
                        return(
                            <article key={lista.key}>
                                <div className="containerComentarios">
                                    <div className="containerNomePerfil">
                                        <img className="fotoPerfil" src={lista.perfil}/>
                                        <p className="titulo">{lista.autor}: {lista.comentario}</p>
                                    </div>
                                </div>
                                    
                            </article>
                        )
                    })}        


                    <form onSubmit={this.comentar}>
                        <input type="text" placeholder="Adicionar comentário..."
                            value={this.state.comentar} onChange={(e) => this.setState({comentar: e.target.value})}/>
                        <button type="submit">Comentar</button>
                    </form>
                </article>
            </section>
        )
    }
}

export default Comentarios