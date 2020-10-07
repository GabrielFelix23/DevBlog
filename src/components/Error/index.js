import React from 'react'
import {Link} from 'react-router-dom'

class Error extends React.Component{
    render() {
        return (
            <div>
                <h1>Esse endereço não existe!</h1>
                <p><Link to={'/'}>Clique aqui </Link>para voltar a tela Home.</p>
            </div>
        )
    }
}

export default Error