import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDXIm4snNfUQkOOcZvQflbrkm3l1fkkDes",
    authDomain: "estore-db-10636.firebaseapp.com",
    databaseURL: "https://estore-db-10636.firebaseio.com",
    projectId: "estore-db-10636",
    storageBucket: "estore-db-10636.appspot.com",
    messagingSenderId: "145025838971",
    appId: "1:145025838971:web:917a170ca3a495a91517de",
    measurementId: "G-TQZGKDG41W"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase