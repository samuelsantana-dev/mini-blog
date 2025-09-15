import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Components
import { Footer } from "./components/Footer.jsx";
import { NavBar } from "./components/NavBar.jsx";
// Context
import { AuthProvider } from "./context/AuthContext.jsx";
// Pages
import { Home } from "./pages/Home/Home.jsx";
import { About } from "./pages/About/About.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { Register } from "./pages/Register/Register.jsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.jsx";
import { CreatePost } from "./pages/CreatePost/CreatePost.jsx";
import { Post } from "./pages/Post/Post.jsx";
import { EditPost } from "./pages/EditPost/EditPost.jsx";
// Hook
import { useEffect, useState } from "react";
import { useAuthentication } from "./hook/useAuthentication.js";
// FireBase
import { onAuthStateChanged } from "firebase/auth";
import { Search } from "./pages/Search/Search";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={!user ? <Login /> :  <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> :  <Navigate to="/" />}
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/create-post"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/edit-post/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />
              <Route
                path="/search"
                element={user ? <Search /> : <Navigate to="/login" />}
              />
              <Route
                path="/posts/:id"
                element={user ? <Post /> : <Navigate to="/login" />}
              />
              <Route
                path={"/dashboard"}
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              {/* <Route path="*"></Route> */}
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
