import { Timestamp } from 'firebase/firestore';
import { FC } from 'react';
import { auth } from '../../utils/firebase-app'
import styles from './ChatMessage.module.css';

export interface ChatMessageProps { message: { text: string, uid: string, photoURL: string, name: string, createdAt: Timestamp }[] }

const ChatMessage: FC<ChatMessageProps> = (props: ChatMessageProps) => {

  const { uid } = props.message[0]

  const messageClass = uid === auth.currentUser?.uid ? styles.messageRight : styles.messageLeft

  return (
    <div className={styles.groupedChat}>
      {props.message.map(msg => (
        <div key={msg.uid + Math.random()} className={`${styles.messageBox} ${messageClass}`}>
          <div className={styles.messagePic}>
            <img src={msg.photoURL} referrerPolicy="no-referrer" alt="img" />
          </div>
          <span className={styles.messageCard}>
            <span className={styles.messageName}>{msg.name}</span>
            <div className={styles.textTime}>
              <div className={styles.messageTextBox}>
                <p className={`${styles.messageText} ${styles.newLine}`}>{msg.text}</p>
              </div>
              <span className={styles.messageTime}>{msg.createdAt?.toDate().toLocaleDateString('id-ID')}</span>
            </div>
          </span>
        </div>
      ))}
    </div>
  )
}


export default ChatMessage;
