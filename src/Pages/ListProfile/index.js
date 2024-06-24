import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { SecondFooter } from "../../Components/SecondFooter";
import { Button } from "@mui/material";
import s from "./style.module.css";
import baseUrl from "../../config";

// Função para converter Blob em Data URL
const convertBlobToImageDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

async function tratarDadoUsuario(data) {
  try {
    const image = await convertBlobToImageDataUrl(new Blob([new Uint8Array(data.image)]));
    data.image = image;
  } catch (error) {
    data.image = null;
  }
  return data;
}

function ListProfile() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState([]);

  const handleSubmit = (email) => {
    navigate("/profile-client/" + email, { emailUser: email });
  };

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    try {
      const response = await fetch(`${baseUrl}/sponsorship/profile`, {
        method: 'GET',
        headers: {
          "token": token,
          "email": email,
        },
      });
      console.log(email)
      if (response.ok) {
        let data = await response.json();
        if (Array.isArray(data)) {
          data = await Promise.all(data.map(async (s) => {
            // try {
            //   const image = await convertBlobToImageDataUrl(new Blob([new Uint8Array(s.image)]));
            //   s.image = image;
            // } catch (error) {
            //   s.image = null;
            // }
            // return s;
            return await tratarDadoUsuario(s);
          }));
          setProfileData(data);
        } else {
          setProfileData([await tratarDadoUsuario(data)]);
        }
      } else {
        console.log('Erro ao buscar dados dos alunos:',);
      }
    } catch (error) {
      console.error('Erro ao buscar dados dos alunos:');
    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={s.container}>
      <Header />
      <div className={s.content}>
        {profileData.map((profile, index) => (
          <div key={index} className={s.conteinerInfo}>

            <div className={s.details}>
              <img
                src={profile.image ? profile.image : 'images/EllipseNull.png'}
                alt="photo"
                className={s.photo}
                onError={(e) => {
                  e.target.src = 'images/EllipseNull.png';
                }}
              />
              <div className={s.containerDescription}>
                <div className={s.title}>{profile.name}</div>
                <div className={s.text}>Para obter mais informações, consulte o perfil desta mariposa.</div>
              </div>
            </div>
            <Button
              size="small"
              onClick={() => handleSubmit(profile.email)}
              className={s.button3}
              variant="contained"
              style={{ backgroundColor: '#D457D2', color: '#fff', width: 200, marginBottom: "5px" }}
            >
              VER PERFIL
            </Button>
          </div>
        ))}
      </div>
      <div className={s.footer}>
        <SecondFooter />
      </div>
    </div>
  );
}

export default ListProfile;
