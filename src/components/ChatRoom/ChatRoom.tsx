import { useCallback, useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { msgRef } from "../../utils/firebase-app"
import ChatForm from '../ChatForm/ChatForm.lazy';
import ChatMessage from '../ChatMessage/ChatMessage.lazy';
import styles from './ChatRoom.module.css';

const ChatRoom = () => {
  const [messages] = useCollectionData(msgRef())
  const [mappedMessage, setMappedMessage] = useState<any[]>([])
  const bottomChatElement = useRef<HTMLDivElement>(null)

  const scrollToBottomChat = useCallback(() => {
    bottomChatElement.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    const mapped: any[] = [];

    const reversedMessages = messages?.reverse() ?? []

    reversedMessages?.map(message => {
      mapped.length && (mapped.at(-1).at(-1)?.uid === message.uid) ? mapped.at(-1).push(message) : mapped.push([message])
    })

    setMappedMessage(mapped)

    const timeout = setTimeout(() => {
      scrollToBottomChat()
    }, 10)

    return () => {
      clearTimeout(timeout)
    }

  }, [messages, scrollToBottomChat])

  useEffect(() => {

    const timeout = setTimeout(() => {
      scrollToBottomChat()
    }, 500)

    return () => {
      clearTimeout(timeout)
    }

  }, [scrollToBottomChat])

  return (
    <>
      <main className={styles.main}>
        {messages && mappedMessage.map(msg => <ChatMessage key={msg[0].id} message={msg} />)}
        <div ref={bottomChatElement}></div>
      </main>

      <ChatForm scrollToBottom={scrollToBottomChat} />
    </>
  )
}

export default ChatRoom;
