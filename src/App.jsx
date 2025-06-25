import { BrowserRouter, Routes, Route } from "react-router-dom"
// Components
import { Footer } from "./components/Footer.jsx"
import { NavBar } from "./components/NavBar.jsx"
// Pages
import { Home } from "./pages/Home/Home.jsx"
import { About } from "./pages/About/About.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />}/>
            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
