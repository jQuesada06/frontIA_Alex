import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { AuthRoutes } from './pages/auth/AuthRoutes';
import MenuAppBar from './pages/Home';


function App() {

  const init = () => {
    const UserLogged = localStorage.getItem("isLogged");
    return UserLogged;
  }

  const UserLogged = init();
  const [logged, setLogged] = useState(init());
  

  useEffect(() => {
    const UserLogged = localStorage.getItem("isLogged");
    if (UserLogged === "true") {
      setLogged(true);
    }
  }, [UserLogged]);

  return (
    <>
      {
        logged === true ? 
        (<MenuAppBar setLogged={setLogged} ></MenuAppBar>)
        :
        (
          <AuthRoutes setLogged={setLogged} />
        )
      }
    </>
  )
}

export default App
