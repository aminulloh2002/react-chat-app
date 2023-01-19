import { FormEvent, useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase, { auth, insertMessage, msgRef } from "../../utils/firebase-app"
import Button from '../Button/Button.lazy';
import ChatMessage from '../ChatMessage/ChatMessage.lazy';
import styles from './ChatRoom.module.css';

const ChatRoom = () => {
  const [messages] = useCollectionData(msgRef())
  const [formValue, setFormValue] = useState("")
  const [mappedMessage, setMappedMessage] = useState<any[]>([])
  const bottomChatElement = useRef<HTMLDivElement>(null)

  const scrollToBottomChat = () => {
    bottomChatElement.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setTimeout(() => {
      console.log("scroll down run here")
      scrollToBottomChat()
    }, 250)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      scrollToBottomChat()
    }, 50)
  }, [messages])

  useEffect(() => {
    const mapped: any[] = [];

    messages?.map(message => {
      mapped.length && (mapped.at(-1).at(-1)?.uid === message.uid) ? mapped.at(-1).push(message) : mapped.push([message])
    })

    setMappedMessage(mapped)

  }, [messages])


  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (auth.currentUser) {

      const { uid, photoURL, displayName } = auth.currentUser

      await insertMessage({
        text: formValue,
        uid,
        photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: displayName
      })

      setFormValue("")
      scrollToBottomChat()
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
