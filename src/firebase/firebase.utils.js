import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
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

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)
    const batch = firestore.batch()

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })
    return await batch.commit()
}

export const addDocument = async (title) => {
    const collectionRef = firestore.collection('collections')
    const newDocRef = collectionRef.doc()
    const snapshot = await newDocRef.get()
    if(!snapshot.exists) {
        try {
            await newDocRef.set({
                title,
                items: []
            })
        } catch (e) {
            console.error('Error creating document.', e.message)
        }
    }
}

export const addItemsToDocument = async (title, item) => {
    const collectionRef = await firestore.collection('collections').get()
    let docId = ''
    collectionRef.docs.forEach(doc => {
        if(doc.data().title.toLowerCase() === title) {
            docId = doc.id
        }
    })
    if(!docId) return
    const docRef = firestore.doc(`collections/${docId}`)
    const snapshot = await docRef.get()
    console.log(snapshot)
}

export const collectionsSnapshotToMap = collections => {
    const transformedCollections = collections.map(doc => {
        const { title, items } = doc.data()
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformedCollections.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection
        return acc
    }, {})
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