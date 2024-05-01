import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/index.js" 
import Cadastro from "./Pages/Cadastro/index.js" 
import Home from "./Pages/Home/index.js"
import Reset from "./Pages/ResetPassword/ResetPassword.js"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="reset" element={<Reset />} />

      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);