import { addDoc, collection, DocumentData, FirestoreDataConverter, limit, onSnapshot, orderBy, query, QueryDocumentSnapshot, Timestamp, WithFieldValue } from 'firebase/firestore';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from "../../utils/firebase-app"
import Button from '../Button/Button.lazy';
import ChatMessage from '../ChatMessage/ChatMessage.lazy';
import styles from './ChatRoom.module.css';

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
        createdAt: data.createdAt
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
  const [mappedMessage, setMappedMessage] = useState<any[]>([])
  const bottomChatElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      bottomChatElement.current?.scrollIntoView({ behavior: "smooth" })
    }, 50)

  }, [messages])

  useEffect(() => {
    const mapped: any[] = [];

    messages?.map(message => {
      if (!mapped.length)
        mapped.push([message])
      else
        if (mapped.at(-1).at(-1)?.uid === message.uid)
          mapped.at(-1).push(message)
        else
          mapped.push([message])
    })

    setMappedMessage(mapped)

  }, [messages])


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
        {messages && mappedMessage.map(msg => <ChatMessage key={msg[0].id} message={msg} />)}
        <div ref={bottomChatElement}></div>
      </main>

      <form onSubmit={sendMessage} className={styles.form}>
        <textarea cols={30} rows={1} placeholder="type your chat..." className={styles.input} onChange={e => setFormValue(e.target.value)} value={formValue}></textarea>
        <Button type='submit' disabled={!formValue}>Send</Button>
      </form>
    </>
  )
}

export default ChatRoom;
