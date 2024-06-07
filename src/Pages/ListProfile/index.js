import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import ProfileNotification from "../ProfileNotification";
import { SecondFooter } from "../../Components/SecondFooter";
import { Button } from "@mui/material";
import s from "./style.module.css";

const profileData = [
    {
        name: "Ana Carolina",
        age: 25,
        level: "Mariposa Mestra",
        degree: "Bacharel em Sistemas de Informação",
        imageUrl: "images/Ellipse.png",
        description:
            "Me chamo Ana Carolina, sou bacharel em Sistemas de Informação e tenho 25 anos. Estou muito empolgada por ter a oportunidade de ser mentora de meninas interessadas em aprender sobre programação e tecnologia. Desde que entrei nessa área, percebi o quão gratificante é compartilhar conhecimento e ajudar outras pessoas a descobrirem o vasto mundo da tecnologia. Mal posso esperar para orientar e inspirar essas meninas, mostrando-lhes todas as possibilidades emocionantes que a programação oferece.",
        type: "cocoon",
    },
    {
        name: "Ana Carolina",
        age: 25,
        level: "Mariposa Mestra",
        degree: "Bacharel em Sistemas de Informação",
        imageUrl: "images/Ellipse.png",
        description:
            "Me chamo Ana Carolina, sou bacharel em Sistemas de Informação e tenho 25 anos. Estou muito empolgada por ter a oportunidade de ser mentora de meninas interessadas em aprender sobre programação e tecnologia. Desde que entrei nessa área, percebi o quão gratificante é compartilhar conhecimento e ajudar outras pessoas a descobrirem o vasto mundo da tecnologia. Mal posso esperar para orientar e inspirar essas meninas, mostrando-lhes todas as possibilidades emocionantes que a programação oferece.",
        type: "cocoon",
    },
    {
        name: "Carol",
        age: 25,
        level: "Mariposa Mestra",
        degree: "Bacharel em Sistemas de Informação",
        imageUrl: "images/Ellipse.png",
        description:
            "Me chamo Ana Carolina, sou bacharel em Sistemas de Informação e tenho 25 anos. Estou muito empolgada por ter a oportunidade de ser mentora de meninas interessadas em aprender sobre programação e tecnologia. Desde que entrei nessa área, percebi o quão gratificante é compartilhar conhecimento e ajudar outras pessoas a descobrirem o vasto mundo da tecnologia. Mal posso esperar para orientar e inspirar essas meninas, mostrando-lhes todas as possibilidades emocionantes que a programação oferece.",
        type: "cocoon",
    },
    {
        name: "Carolina",
        age: 25,
        level: "Mariposa Mestra",
        degree: "Bacharel em Sistemas de Informação",
        imageUrl: "images/Ellipse.png",
        description:
            "Me chamo Ana Carolina, sou bacharel em Sistemas de Informação e tenho 25 anos. Estou muito empolgada por ter a oportunidade de ser mentora de meninas interessadas em aprender sobre programação e tecnologia. Desde que entrei nessa área, percebi o quão gratificante é compartilhar conhecimento e ajudar outras pessoas a descobrirem o vasto mundo da tecnologia. Mal posso esperar para orientar e inspirar essas meninas, mostrando-lhes todas as possibilidades emocionantes que a programação oferece.",
        type: "cocoon",
    }, {
        name: "Ana Carolina",
        age: 25,
        level: "Mariposa Mestra",
        degree: "Bacharel em Sistemas de Informação",
        imageUrl: "images/Ellipse.png",
        description:
            "Me chamo Ana Carolina, sou bacharel em Sistemas de Informação e tenho 25 anos. Estou muito empolgada por ter a oportunidade de ser mentora de meninas interessadas em aprender sobre programação e tecnologia. Desde que entrei nessa área, percebi o quão gratificante é compartilhar conhecimento e ajudar outras pessoas a descobrirem o vasto mundo da tecnologia. Mal posso esperar para orientar e inspirar essas meninas, mostrando-lhes todas as possibilidades emocionantes que a programação oferece.",
        type: "cocoon",
    },
    {
        name: "Carol",
        age: 25,
        level: "Mariposa Mestra",
        degree: "Bacharel em Sistemas de Informação",
        imageUrl: "images/Ellipse.png",
        description:
            "Me chamo Ana Carolina, sou bacharel em Sistemas de Informação e tenho 25 anos. Estou muito empolgada por ter a oportunidade de ser mentora de meninas interessadas em aprender sobre programação e tecnologia. Desde que entrei nessa área, percebi o quão gratificante é compartilhar conhecimento e ajudar outras pessoas a descobrirem o vasto mundo da tecnologia. Mal posso esperar para orientar e inspirar essas meninas, mostrando-lhes todas as possibilidades emocionantes que a programação oferece.",
        type: "cocoon",
    },
    {
        name: "Carolina",
        age: 25,
        level: "Mariposa Mestra",
        degree: "Bacharel em Sistemas de Informação",
        imageUrl: "images/Ellipse.png",
        description:
            "Me chamo Ana Carolina, sou bacharel em Sistemas de Informação e tenho 25 anos. Estou muito empolgada por ter a oportunidade de ser mentora de meninas interessadas em aprender sobre programação e tecnologia. Desde que entrei nessa área, percebi o quão gratificante é compartilhar conhecimento e ajudar outras pessoas a descobrirem o vasto mundo da tecnologia. Mal posso esperar para orientar e inspirar essas meninas, mostrando-lhes todas as possibilidades emocionantes que a programação oferece.",
        type: "cocoon",
    },
];

function ListProfile() {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        navigate("/notification");
    };

    return (
        <div className={s.container}>
            <Header />
            <div className={s.content}>
                {profileData.map((profile, index) => (
                    <div key={index} className={s.conteinerInfo}>
                        <div className={s.details}>
                            <img src={profile.imageUrl} alt="photo" className={s.photo} />
                            <div className={s.containerDescription}>
                                <div className={s.title}>{profile.name}</div>
                                <div className={s.text}>Deseja ser falar com sua apadrinhada ?</div>
                            </div>
                        </div>
                        <Button size="small" onClick={handleSubmit} className={s.button3} variant="contained" style={{ backgroundColor: '#D457D2', color: '#fff', width: 150 }}>VER PERFIL</Button>
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
