import { FC } from 'react';
import { auth } from '../../../utils/firebase-app';
import Button from '../../Button/Button.lazy';
interface SignOutProps { }

const SignOut: FC<SignOutProps> = () => {
  return auth.currentUser && (
    <Button onClick={() => auth.signOut()}>Sign Out</Button>
  );
}


export default SignOut;
