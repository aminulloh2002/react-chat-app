import { FC } from 'react';
import firebase from '../../utils/firebase-app'
import styles from './ChatMessage.module.css';

export interface ChatMessageProps { message: { text: string, uid: string, photoURL: string, name: string } }

const ChatMessage: FC<ChatMessageProps> = (props: ChatMessageProps) => {

  const auth = firebase.auth()

  const { text, uid, photoURL, name } = props.message

  const messageClass = uid === auth.currentUser?.uid ? styles.messageRight : styles.messageLeft

  return (
    <>
      <div className={`${styles.messageBox} ${messageClass}`}>
        <div className={styles.messagePic}>
          <img src={photoURL} referrerPolicy="no-referrer" alt="" />
        </div>
        <span className={styles.messageCard}>
          <span className={styles.messageName}>{name}</span>
          <div className={styles.messageTextBox}>
            <p className={styles.messageText}>{text}</p>
          </div>
        </span>
      </div>
    </>
  )
}


export default ChatMessage;
