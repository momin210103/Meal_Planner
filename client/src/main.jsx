import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx';
import Home from './Pages/home/Home.jsx';
import "./index.css"
import LoginPage from './Pages/login/LoginPage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<div>About</div>} />
        <Route path="contact" element={<div>Contact</div>} />
        <Route path="login" element={<LoginPage/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
