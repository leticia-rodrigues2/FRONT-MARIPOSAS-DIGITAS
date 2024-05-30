import React from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import "./style.module.css";
import DefaultHeader from "../Header/DefaultHeader/DefaultHeader.js";
import Header from "../Header/Header.js";

function Conteiner({ titulo, paragrafo='', textoBotao, textoLink, link, children, useDefaultHeader }) {
  const navigate = useNavigate();
  const HeaderComponent = useDefaultHeader ? <DefaultHeader /> : <Header />;
  
  const handleSubmit = async (event) => {
    navigate('/Home'); 
  };

  return (
    <>  
      {HeaderComponent} 
      <div className="container">
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
      </div>
    </>
  );
}

export default Conteiner;
