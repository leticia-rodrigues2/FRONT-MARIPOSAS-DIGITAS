import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { SecondFooter } from "../../Components/SecondFooter";
import ImagemDescriptionDash from "./Components/ImagemDescpitionDash";
import s from "./style.module.css";
import Alerts from "./Components/Alerts";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import baseUrl from "../../config";

function Dashboard() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const handleSubmit = async (event) => {
    navigate("/notification");
  };


  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${baseUrl}/user/profile/full`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "email": email,
            "token": token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();

        console.log(data); 

        if(data.mensagem){
          navigate('/perfil-create');
        }

      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []); 


  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  

  return (
    <div className={s.container}>
      <Header />
      <div className={s.content}>
        {/* <div className={s.details}>
                    <ImagemDescriptionDash />
                </div> */}
        <div className={s.containerAlerts}>
          <Alerts></Alerts>
        </div>

      </div>

      <div className={s.footer}>
        <SecondFooter />
      </div>
    </div>
  );
}

export default Dashboard;
