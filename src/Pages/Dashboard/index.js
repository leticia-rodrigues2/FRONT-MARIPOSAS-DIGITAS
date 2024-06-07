import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { SecondFooter } from "../../Components/SecondFooter";
import ImagemDescriptionDash from "./Components/ImagemDescpitionDash";
import s from "./style.module.css";
import Alerts from "./Components/Alerts";

function Dashboard() {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        navigate("/notification");
    };

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
