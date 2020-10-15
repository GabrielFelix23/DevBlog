import React from 'react'
import firebase from '../../../firebase'
import {Link, withRouter} from 'react-router-dom'

import './fotoPerfil.css'

class FotoDePerfil extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            imagem: null,
            url: '',
            progress: 0
        }
        this.foto = this.foto.bind(this)
        this.fotoUser = this.fotoUser.bind(this)
        this.salvarFoto = this.salvarFoto.bind(this)
    }

    foto = async (e) => {
        e.preventDefault()
        const uid = firebase.auth.currentUser.uid

        firebase.app.ref('fotoUser').child(uid).set({
            fotoPerfil: this.state.url
        })
    }

    fotoUser = async (e) => { 
        if(e.target.files[0]){
            const image = e.target.files[0]
            if(image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg'){
                await this.setState({imagem: image})
                await this.salvarFoto()
            }
            else{
                alert("Apenas fotos png, jpeg ou jpg.")
                this.setState({imagem: null})
                return null
            }
        }
    }

    salvarFoto = async () => {
        const {imagem} = this.state
        const uid = firebase.Uid()
    
        const salvandoImg = firebase.storage.ref(`fotoDePerfil/${uid}/${imagem.name}`).put(imagem)
        await salvandoImg.on('state_changed',(snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
              this.setState({progress: progress})
        }, (erro) => {
            console.log("Erro: " + erro)
            
        }, () => {
            firebase.storage.ref(`fotoDePerfil/${uid}`)
            .child(imagem.name).getDownloadURL()
            .then((url) => {
                this.setState({
                    url: url
                })
            })
        })
    }

    async componentDidMount(){
        if(!firebase.logado()){
            await this.props.history.replace('/login')
            return null
        }
     }

    render() {
        return (
            <article id="containerfotoPerfil">
                <div className="container">
                    <form onSubmit={this.foto}>
                        <input type="file" onChange={this.fotoUser} required/>
                        {this.state.url !== '' ? 
                            <img src={this.state.url} alt="Foto de perfil" width="150" height="150"/>
                            :
                            <progress value={this.state.progress} max="100"/>    
                        }
                        
                        <div className="containerButton">
                            <button type="submit">Pronto</button>
                            <Link to={'/perfil'} className="buttonVoltar">Voltar</Link>
                        </div>
                    </form>
                </div>
            </article>
        )
    }
}

export default withRouter(FotoDePerfil) 