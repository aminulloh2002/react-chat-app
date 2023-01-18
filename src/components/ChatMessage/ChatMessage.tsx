import { FC } from 'react';
import firebase from '../../utils/firebase-app'
import styles from './ChatMessage.module.css';

export interface ChatMessageProps { message: { text: string, uid: string, photoURL: string, name: string } }

const ChatMessage: FC<ChatMessageProps> = (props: ChatMessageProps) => {

  const auth = firebase.auth()

  const { text, uid, photoURL, name } = props.message

  const messageClass = uid === auth.currentUser?.uid ? 'message-right' : 'message-left'


  return (
    <>
      <div className={`message ${messageClass}`}>
        <span>{name}</span>
        <img src={photoURL} referrerPolicy="no-referrer" alt="" />
        <p>{text}</p>
      </div>
    </>
  )
}


export default ChatMessage;
