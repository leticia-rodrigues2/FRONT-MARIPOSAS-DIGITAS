import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import ProfileNotification from "../ProfileNotification";
import { SecondFooter } from "../../Components/SecondFooter";
import s from "./style.module.css";
import ContainerPerfil from "../../Components/ContainerPerfil";
import { Button } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HeaderMobile from "../../Components/Header/HeaderMobile/HeaderMobile";

const profileData = [
    {
        name: "Ana Carolina",
        age: 25,
        level: "Mariposa Mestra",
        degree: "Bacharel em Sistemas de Informação",
        imageUrl: "images/Ellipse.png",
        description: "Me chamo Ana Carolina, sou bacharel em Sistemas de Informação e tenho 25 anos. Estou muito empolgada por ter a oportunidade de ser mentora de meninas interessadas em aprender sobre programação e tecnologia. Desde que entrei nessa área, percebi o quão gratificante é compartilhar conhecimento e ajudar outras pessoas a descobrirem o vasto mundo da tecnologia. Mal posso esperar para orientar e inspirar essas meninas, mostrando-lhes todas as possibilidades emocionantes que a programação oferece.",
        type: 'cocoon'
    }
];

function Profile() {
    const navigate = useNavigate();
    const handleEdit = async (event) => {
        navigate('/perfil-create');
    };

    const { name, age, level, degree, description, type, imageUrl } = profileData[0]; // Destructuring para obter os dados do perfil

    return (
        <div className={s.container}>
            <HeaderMobile />
            <div className={s.content}>
                <ContainerPerfil imageUrl={imageUrl}>
                    <div className={s.centeredContent}>
                        <div className={s.title}>{name}, {age}</div>
                        <div className={s.details}>
                            {type === 'cocoon' ? (
                                <img src="images/casulo.png" alt="nivel" className={s.nivel} />
                            ) : (
                                <img src="images/borbo.png" alt="nivel" className={s.nivelButterfly} />
                            )}
                            <div className={s.text}>{level}  {degree}</div>

                        </div>
                        <div className={s.description}>
                            <div className={s.text}> {description}</div>
                            <div className={s.edit}>

                                <EditOutlinedIcon className={s.iconEdit} />
                                <Button type="submit" variant="contained" onClick={handleEdit} style={{ color: '#D457D2', backgroundColor: '#fff', width: 390 }}>EDITAR PERFIL</Button>
                                <div >

                                </div>

                            </div>
                        </div>

                    </div>

                </ContainerPerfil>

            </div>
            <div className={s.footer}>
                <SecondFooter />
            </div>
        </div>
    );
}

export default Profile;
