import './App.css'

import firebase from './utils/firebase-app'
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatRoom from './components/ChatRoom/ChatRoom.lazy'
import SignIn from './components/Auth/SignIn/SignIn'
import Header from './components/Header/Header.lazy'

const auth = firebase.auth()

function App() {
  const [user] = useAuthState(auth as any)
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  return (
    <div className="App">
      {user && <Header />}
      <section className='section'>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  )
}

export default App
