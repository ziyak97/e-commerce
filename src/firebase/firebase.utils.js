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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()
    if (!snapshot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user.', error.message)
        }
    }
    return userRef
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