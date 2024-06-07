import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/index.js"
import Cadastro from "./Pages/Cadastro/index.js"
import Reset from "./Pages/ResetPassword/index.js"
import Forgot from "./Pages/Forgot"
import Help from "./Pages/Help/index.js"
import Home from "./Pages/Home/index.js";
import DeleteAccount from "./Pages/DeleteAccount/index.js";
import './global.css'
import MentoredPerfil from "./Pages/MentoredPerfil/index.js";
import About from "./Pages/About/index.js";
import Contact from "./Pages/Contact/index.js";
import Notification from "./Pages/Notification/index.js";
import Profile from "./Pages/Profile/index.js";
import Dashboard from "./Pages/Dashboard/index.js";
import ListProfile from "./Pages/ListProfile/index.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="reset" element={<Reset />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="help" element={<Help />} />
        <Route path="delete" element={<DeleteAccount />} />
        <Route path="perfil-create" element={<MentoredPerfil />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="Notification" element={<Notification />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="list-profile" element={<ListProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);