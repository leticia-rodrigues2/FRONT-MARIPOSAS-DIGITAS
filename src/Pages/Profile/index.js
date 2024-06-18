import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import HeaderMobile from "../../Components/Header/HeaderMobile/HeaderMobile";
import { SecondFooter } from "../../Components/SecondFooter";
import s from "./style.module.css";
import ContainerPerfil from "../../Components/ContainerPerfil";
import { Button } from "@mui/material";
import baseUrl from "../../config";

// Function to convert a Blob to a data URL
const convertBlobToImageDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState("");

  const handleEdit = () => {
    navigate("/perfil-create");
  };

  const fetchData = async () => {
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

        if (data.image) {
          const imageDataUrl = await convertBlobToImageDataUrl(
            new Blob([new Uint8Array(data.image)])
          );
          data.image = imageDataUrl;
          setImage(imageDataUrl);
        } else {
          console.log('No valid image data returned by the API:', data);
          setImage(null);
        }

        setProfile(data);
      } else {
        console.log('Failed to fetch user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { name, age, menteeLevel, degree, profile: description } = profile;
  const displayImage = image;

  return (
    <div className={s.pageContainer}>
      <HeaderMobile />
      <div className={s.container}>
        <div className={s.content}>
          <ContainerPerfil imageUrl={displayImage}>
            <div className={s.centeredContent}>
              <div className={s.title}>
                {name}, {age}
              </div>
              <div className={s.details}>
                {menteeLevel === 'CASULO' ? (
                  <>
                    <img src="images/casulo.png" alt="nivel" className={s.nivel} />
                    <div className={s.text}>CASULO - PRIMEIRO CONTATO COM TECNOLOGIA</div>
                  </>
                ) : (
                  <>
                    <img src="images/borbo.png" alt="nivel" className={s.nivelButterfly} />
                    <div className={s.text}>LAGARTA - ALGUM CONHECIMENTO SOBRE TECNOLOGIA</div>
                  </>
                )}
                <div className={s.text}>{degree}</div>
              </div>
              <div className={s.description}>
                <div className={s.text}>{description}</div>
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
