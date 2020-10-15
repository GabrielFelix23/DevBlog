import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyAwMlHK3aMbSc9uiXgd6_jhoA9n8B8t3-U",
    authDomain: "devblog-964d8.firebaseapp.com",
    databaseURL: "https://devblog-964d8.firebaseio.com",
    projectId: "devblog-964d8",
    storageBucket: "devblog-964d8.appspot.com",
    messagingSenderId: "179892401896",
    appId: "1:179892401896:web:b397003e6fe154f33e7b5d"
}

class Firebase{
    constructor(){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
        }
        this.app = firebase.database()
        this.auth = firebase.auth()
        this.storage = firebase.storage() 
    }

    //Login
    logar(email, senha){
        return firebase.auth().signInWithEmailAndPassword(email, senha)
    }
    
    //Cadastrar
    async cadastrar(nome, email, senha){
        await firebase.auth().createUserWithEmailAndPassword(email, senha)

        const uid = firebase.auth().currentUser.uid

        return firebase.database().ref('usuario').child(uid).set({
            nome: nome
        })
    }

    //Para se manter conectado
    logado(){
        return firebase.auth().currentUser && firebase.auth().currentUser.email
    }

    //Pegando UID
    Uid(){
        return firebase.auth().currentUser && firebase.auth().currentUser.uid
    }

    //deslogar
    deslogar(){
        return firebase.auth().signOut()
    }

    //Nome do user logado
    async nomeUser(callback){
        if(!firebase.auth().currentUser){
            return null
        }
        const uid = firebase.auth().currentUser.uid
        await firebase.database().ref("usuario").child(uid).once('value').then(callback)
    }

    async fotoPerfil(call){
        if(!firebase.auth().currentUser){
            return null
        }

        const uid = firebase.auth().currentUser.uid
        await firebase.database().ref('fotoUser').child(uid).once('value').then(call)
    }

    //Para ver se o user está online
    online(){
        return new Promise((logado) => {
            firebase.auth().onAuthStateChanged(logado)
        })
    }
}

export default new Firebase()