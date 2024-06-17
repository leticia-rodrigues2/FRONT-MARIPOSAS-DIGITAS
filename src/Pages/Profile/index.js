import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import HeaderMobile from "../../Components/Header/HeaderMobile/HeaderMobile";
import { SecondFooter } from "../../Components/SecondFooter";
import s from "./style.module.css";
import ContainerPerfil from "../../Components/ContainerPerfil";
import { Button } from "@mui/material";
import baseUrl from "../../config";

const convertBlobToImageDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error); // Handle error from blob conversion
    };
  });
};

function Profile() {
  const navigate = useNavigate();
  const handleEdit = async (event) => {
    navigate("/perfil-create");
  };

  const [profile, setProfile] = useState({});
  const [image, setImage]= useState("")

  async function fetchData() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    try {
      const response = await fetch(`${baseUrl}/user/profile`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "token": token,
          "email": email
        },
      });

      if (response.ok) {


        const data = await response.json();


        console.log("imageeeeeem",data.image)
        if (data.image) {
          const image2 = await convertBlobToImageDataUrl(
            new Blob([new Uint8Array(data.image)])
          );
          data.image = image2;
          setImage(image2)
          setProfile(data);
          console.log("PROFILE", data);
        } else {
          console.log('Dados retornados pela API não são válidos:', data);
          setImage(null)
        }
      } else {
        console.log('Erro ao buscar dados dos alunos:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar dados dos alunos:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
console.log(profile);
  const { name, age, menteeLevel, degree, profile: description, type } = profile;
  const displayName = name 
  const displayAge = age 
  const displayLevel = menteeLevel 
  const displayDegree = degree 
  const displayDescription = description 
  const displayType = type 
  const displayImage = image 
  return (
    <div className={s.pageContainer}>
      <HeaderMobile />
      <div className={s.container}>
        <div className={s.content}>
          <ContainerPerfil imageUrl={displayImage}>
            <div className={s.centeredContent}>
              <div className={s.title}>
                {displayName}, {displayAge}
              </div>
              <div className={s.details}>
                {displayType === 'CASULO' ? (
                  <><img src="images/casulo.png" alt="nivel" className={s.nivel} /><div className={s.text}>  CASULO - PRIMEIRO CONTATO COM TECNOLOGIA</div></>
                ) : (
                  <><img src="images/borbo.png" alt="nivel" className={s.nivelButterfly} /><div className={s.text}> LAGARTA - ALGUM CONHECIMENTO SOBRE TECNOLOGIA</div></>
                )}
               
                <div className={s.text}>
                   {displayDegree}
                </div>
              </div>
              <div className={s.description}>
                <div className={s.text}>{displayDescription}</div>
                <div className={s.edit}>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleEdit}
                    className={s.editButton}
                  >
                    EDITAR PERFIL
                  </Button>
                </div>
              </div>
            </div>
          </ContainerPerfil>
        </div>
      </div>
      <div className={s.footer}>
        <SecondFooter />
      </div>
    </div>
  );
}

export default Profile;
