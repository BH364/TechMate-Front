import NavBar from "./components/NavBar"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import './index.css';
import {Provider} from 'react-redux'
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
// import Error from "./components/Error";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
// import Setting from "./components/Setting";
import { useChatStore } from "./store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import Chat from "./components/Chat";
import Landing from "./components/Landing";
function App() {
    const {checkAuth,onlineUsers} = useAuthStore()
   
   useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return (

    <div >
      <Provider store={appStore}>
      <BrowserRouter basename="/">

      <Routes>
        <Route path="/" element={<Body />}>
           <Route path='/' element={<Feed />} />
          <Route path='/login' element={<Login />} /> 
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/error" element={<Error />} /> */}
          <Route path='/connections' element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/landing" element={<Landing />} />
          {/* <Route path="/settings" element={<Setting />} /> */}
        </Route>
      </Routes>

      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
