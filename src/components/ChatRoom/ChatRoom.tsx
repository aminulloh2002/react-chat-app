import { addDoc, collection, DocumentData, FirestoreDataConverter, limit, onSnapshot, orderBy, query, QueryDocumentSnapshot, Timestamp, WithFieldValue } from 'firebase/firestore';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from "../../utils/firebase-app"
import Button from '../Button/Button.lazy';
import ChatMessage from '../ChatMessage/ChatMessage.lazy';
import styles from './ChatRoom.module.css';

// interface ChatRoomProps {}

// const ChatRoom: FC<ChatRoomProps> = () => (
//   <div className={styles.ChatRoom}>
//     ChatRoom Component
//   </div>
// );

const ChatRoom = () => {
  type Message = {
    id: string,
    text: string,
    photoURL: string,
    uid: string,
    name: string,
    createdAt: Timestamp,
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
        createdAt: data.created
      };
    },
  }

  const firestore = firebase.firestore()
  const auth = firebase.auth()

  const collectionRef = collection(firestore, 'messages')

  const q = query(collectionRef, orderBy("createdAt", "asc"), limit(50))

  const msgRef = useMemo(() => q.withConverter(messageConverter), []);

  const [messages] = useCollectionData(msgRef)
  const [formValue, setFormValue] = useState("")
  const bottomChatElement = useRef<HTMLDivElement>(null)

  onSnapshot(collectionRef, () => {
    if (bottomChatElement.current) {
      bottomChatElement.current.scrollIntoView({ behavior: "smooth" })
    }
  })

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (auth.currentUser) {

      const { uid, photoURL, displayName } = auth.currentUser

      await addDoc(collectionRef, {
        text: formValue,
        uid,
        photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: displayName
      })
      setFormValue("")
      bottomChatElement.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={bottomChatElement}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input type="text" value={formValue} onChange={e => setFormValue(e.target.value)} />
        <Button type='submit' disabled={!formValue}>Send</Button>
      </form>
    </>
  )
}

export default ChatRoom;


