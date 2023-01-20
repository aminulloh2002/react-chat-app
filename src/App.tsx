import './App.css'

import { auth } from './utils/firebase-app'
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatRoom from './components/ChatRoom/ChatRoom.lazy'
import SignIn from './components/Auth/SignIn/SignIn'
import Header from './components/Header/Header.lazy'

function App() {
  const [user] = useAuthState(auth as any)
  const defineWindowViewHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  defineWindowViewHeight()

  window.addEventListener("resize", () => {
    defineWindowViewHeight()
  })

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
