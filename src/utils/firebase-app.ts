import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { addDoc, collection, DocumentData, FieldValue, FirestoreDataConverter, limit, orderBy, query, QueryDocumentSnapshot, Timestamp, WithFieldValue } from "firebase/firestore"

firebase.initializeApp({
    apiKey: "AIzaSyCMfYrg87bToXsS0klK_dDevBy16Z9ApaA",
    authDomain: "chat-app-69d5b.firebaseapp.com",
    projectId: "chat-app-69d5b",
    storageBucket: "chat-app-69d5b.appspot.com",
    messagingSenderId: "1060923167171",
    appId: "1:1060923167171:web:1b1507e51bb48720a9ad76",
    measurementId: "G-BRQHJ2BEVR"
})

type Message = {
    id?: string,
    text: string,
    photoURL: string | null,
    uid: string,
    name: string | null,
    createdAt: Timestamp | FieldValue,
};

const messageConverter: FirestoreDataConverter<Message> = {
    toFirestore(message: WithFieldValue<Message>): DocumentData {
        return { text: message.text, photoURL: message.photoURL, uid: message.uid, name: message.name, createdAt: firebase.firestore.FieldValue.serverTimestamp() }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Message {
        const data = snapshot.data()
        return {
            id: snapshot.id,
            text: data.text,
            photoURL: data.photoURL,
            uid: data.uid,
            name: data.name,
            createdAt: data.createdAt
        };
    },
}

const firestore = firebase.firestore()
const auth = firebase.auth()

const collectionRef = collection(firestore, 'messages')

const q = query(collectionRef, orderBy("createdAt", "desc"), limit(50))

const msgRef = () => q.withConverter(messageConverter)

const insertMessage = async (message: Message) => {
    await addDoc(collectionRef, message)
}

export { messageConverter, firestore, auth, msgRef, collectionRef, insertMessage }

export default firebase
