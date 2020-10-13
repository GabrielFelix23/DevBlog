import React from 'react'
import firebase from '../../../firebase'

class EditPerfil extends React.Component{
    async componentDidMount(){
        if(!firebase.logado()){
            await this.props.history.replace('/login')
            return null
        }
     }

    render() {
        return (
            <div>
                <h1>Tela Edit Perfil</h1>
            </div>
        )
    }
}

export default EditPerfil 