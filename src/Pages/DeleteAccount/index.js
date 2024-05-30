import React from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import "./style.module.css";
import Header from "../../Components/Header/Header";
import { padding } from "@mui/system";

export default function DeleteAccount() {
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    navigate('/Home'); 
  };

  return (
    <>  
      <Header />
      <div className="container">
        <div className="login-container">
          
          <div className="linha-rosa">
          <div className="logo-text"><img src="images/logo.png" alt="" className="borda-imagem-logo" /></div>
          </div>
          
        </div>
      </div>
          {/* <div>
          <h2>excluir conta</h2>
            <p>
                Por favor, esteja ciente de que a exclusão da sua conta é uma ação irreversível. 
                Uma vez confirmada, todos os seus dados serão permanentemente removidos do nosso sistema.
                Tem certeza de que deseja prosseguir?
          </p>
          <div style={{ padding: '20px' }}> 
            <button type="submit" onClick={handleSubmit}>Teste4</button>
          </div>

          <div > 
            <button style={{ backgroundColor: '#80BBD9' }} type="submit" onClick={handleSubmit}>Teste4</button>
          </div>
          </div> */}
         

    </>
  );
}

