import { BrowserRouter, Routes, Route } from "react-router-dom"
// Components
import { Footer } from "./components/Footer.jsx"
import { NavBar } from "./components/NavBar.jsx"
// Context
import { AuthProvider } from "./context/AuthContext.jsx"
// Pages
import { Home } from "./pages/Home/Home.jsx"
import { About } from "./pages/About/About.jsx"
import { Login } from "./pages/Login/Login.jsx"
import { Register } from "./pages/Register/Register.jsx"
import { Dashboard } from "./pages/Dashboard/Dashboard.jsx"
import { CreatePost } from "./pages/CreatePost/CreatePost.jsx"
// Hook
import { useEffect, useState } from "react"
import { useAuthentication } from "./hook/useAuthentication.jsx"
// FireBase
import { onAuthStateChanged } from "firebase/auth"

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();  
  const loadingUser = user === undefined;

 useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    setUser(user)
  })
}, [auth])

  // Nao vai exibir nada antes do usuario ser carregado
  if(loadingUser){
    return <p>Carregando...</p>
  }
  return (
    <>
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/about" element={<About />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/register" element={<Register />}/>
                <Route path="/create-post" element={<CreatePost/>}/>
                  <Route path={"/dashboard"} element={<Dashboard />} />
              </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
