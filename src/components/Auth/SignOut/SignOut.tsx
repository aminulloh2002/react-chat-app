import { FC } from 'react';
import styles from './Auth/SignOut.module.css';
import firebase from '../../../utils/firebase-app';
import Button from '../../Button/Button.lazy';
interface SignOutProps { }

const SignOut: FC<SignOutProps> = () => {
  const auth = firebase.auth()
  return auth.currentUser && (
    <Button onClick={() => auth.signOut()}>Sign Out</Button>
  );
}


export default SignOut;
