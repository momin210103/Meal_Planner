import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes,Route } from "react-router";
import Home from './Pages/home/Home.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element = {<App/>}>
      <Route path="/" element ={<Home/>}/>
      <Route path="/about" element ={<div>About</div>}/>
      <Route path="/contact" element ={<div>Contact</div>}/>
      <Route path="/login" element ={<div>Login</div>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
