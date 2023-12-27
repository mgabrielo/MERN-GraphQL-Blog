import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/home/Footer";
import Homepage from "./components/home/Homepage";
import Blogs from "./components/blogs/Blogs";
import Auth from "./components/auth/Auth";
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { authLogin, authLogout } from "./store/authSlice";
import Addblog from "./components/blogs/Addblog";
import Profile from "./components/header/user/Profile";

function App() {
  const dispatch= useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    const data : any = localStorage.getItem('userData')
    if(JSON.parse(data) !== null){
      dispatch(authLogin())
    }else{
      authLogout()
      navigate('/auth')
    }
  },[dispatch])
  return (
    <div className="App">
      <header>
      <Header/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/add" element={<Addblog/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </main>
      <footer>
      <Footer/>
      </footer>  
    </div>
  );
}

export default App;
