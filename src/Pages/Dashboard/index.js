import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { SecondFooter } from "../../Components/SecondFooter";
import ImagemDescriptionDash from "./Components/ImagemDescpitionDash";
import s from "./style.module.css";
import Alerts from "./Components/Alerts";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Dashboard() {
  
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const handleSubmit = async (event) => {
        navigate("/notification");
    };


    useEffect(() => {
      const token = localStorage.getItem('token');
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
                <div className={s.details}>
                    <ImagemDescriptionDash />
                </div>
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
