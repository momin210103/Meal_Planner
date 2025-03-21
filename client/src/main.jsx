import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx';
import Home from './Pages/home/Home.jsx';
import "./index.css"
import LoginPage from './Pages/login/LoginPage.jsx';
import SignupPage from './Pages/signup/SignupPage.jsx';
import UserDashBoard from './Pages/User/UserDashBoard.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<div>About</div>} />
        <Route path="contact" element={<div>Contact</div>} />
        <Route path="login" element={<LoginPage/>} />
        <Route path="signup" element={<SignupPage/>} />
        <Route path="dashboard" element={<UserDashBoard/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
