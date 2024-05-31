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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="reset" element={<Reset />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="help" element={<Help />} />
        <Route path="delete" element={<DeleteAccount/>} />
        <Route path="perfil-mentored" element={<MentoredPerfil/>} />

      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);