import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes,Route } from "react-router";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element = {<App/>}>
      <Route path="/" element ={<div>Home</div>}/>
      <Route path="/about" element ={<div>About</div>}/>
      <Route path="/contact" element ={<div>Contact</div>}/>
      <Route path="/login" element ={<div>Login</div>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
