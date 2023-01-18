import './App.css'

import firebase from './utils/firebase-app'
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatRoom from './components/ChatRoom/ChatRoom.lazy'
import SignOut from './components/Auth/SignOut/SignOut'
import SignIn from './components/Auth/SignIn/SignIn'

const auth = firebase.auth()

function App() {
  const [user] = useAuthState(auth as any)
  return (
    <div className="App">
      <header>
        {user && <SignOut />}
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  )
}

export default App
