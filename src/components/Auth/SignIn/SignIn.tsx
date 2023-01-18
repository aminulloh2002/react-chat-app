import { FC } from 'react';
import styles from './SignIn.module.css';
import firebase from '../../../utils/firebase-app'
import Button from '../../Button/Button.lazy';

interface AuthSignInProps { }

const SignIn: FC<AuthSignInProps> = () => {
  const auth = firebase.auth()
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }
  return (
    <Button onClick={signInWithGoogle}>Sign in with Google</Button>
  )
}

export default SignIn;
