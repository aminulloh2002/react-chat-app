import { FC, FormEvent, KeyboardEvent, useState } from 'react';
import firebase, { auth, insertMessage } from "../../utils/firebase-app"
import Button from '../Button/Button.lazy';
import styles from './ChatForm.module.css';

interface ChatFormProps {
  scrollToBottom: () => void
}

const ChatForm: FC<ChatFormProps> = (props) => {
  const [formValue, setFormValue] = useState("")

  const sendMessage = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
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
      props.scrollToBottom()
    }
  }

  const onKeyDownListener = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") sendMessage()
  }


  return (
    <form onSubmit={sendMessage} className={styles.form}>
      <textarea cols={30} rows={1} placeholder="type your chat..." className={styles.input} onKeyDown={onKeyDownListener} onChange={e => setFormValue(e.target.value)} value={formValue}></textarea>
      <Button type='submit' disabled={!formValue}>Send</Button>
    </form>
  )
}

export default ChatForm;
