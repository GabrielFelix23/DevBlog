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
    }

    logar(email, senha){
        return firebase.auth().signInWithEmailAndPassword(email, senha)
    }


    Logado(){
        return new Promise((logado) => {
            firebase.auth().onAuthStateChanged(logado)
        })
    }
}

export default new Firebase()