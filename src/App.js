
import './App.css';
import Home from './screens/Home';
import Navbar from './components/Navbar';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './screens/Profile';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logincontext } from './context/Logincontext';
import { useState,createContext } from 'react';
import Createpost from './screens/Createpost';
import Modal from './components/Modal';
import Userprofile from './components/Userprofile';
import Myfollowingpost from './screens/Myfollowingpost';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalopen, setModalopen] = useState(false);

  return (
      <BrowserRouter>
          <div className="App">
              <Logincontext.Provider value={{ isLoggedIn, setIsLoggedIn ,setModalopen}}>
                  <Navbar login={isLoggedIn}/>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/SignIn" element={<SignIn />} />
                      <Route path="/SignUp" element={<SignUp />} />
                      <Route exac path="/Profile" element={<Profile />} />
                      <Route path="/Createpost" element={<Createpost />} />
                      <Route path="/profile/:userid" element={<Userprofile />} />
                      <Route path="/Myfollowingpost" element={<Myfollowingpost />} />
                  </Routes>
                  <ToastContainer theme="dark" />
                  {modalopen && <Modal setModalopen={setModalopen}></Modal>}
              </Logincontext.Provider>
          </div>
      </BrowserRouter>
  );
}


export default App;
