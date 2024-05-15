import React from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import "./StyleContainer.css";
import ResponsiveNavbar from "../Menu/NavBar.js";
import HeaderMobile from "../Header/HeaderMobile/HeaderMobile.js";

function Conteiner({ titulo, paragrafo='', textoBotao, textoLink, link ,children}) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    navigate('/Home'); 
  };

  return (
    <><HeaderMobile /><div className="container">
          <div className="login-container">
              <img src="images/logo.png" alt="" className="borda-imagem" />
              <h2>{titulo}</h2>
              <p>{paragrafo}</p>
              <div className="login-row">
                  {children}
              </div>
              <div className="button-submit">
                  <button type="submit" onClick={handleSubmit}>{textoBotao}</button>
              </div>

          </div>
          <div className="signup-link">
              <a href={link} className="signup">{textoLink}</a>
          </div>
      </div></>
  );
}

export default Conteiner;
