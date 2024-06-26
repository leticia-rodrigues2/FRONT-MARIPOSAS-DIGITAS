import React from 'react';
import HeaderLogoutDesktop from '../../Components/Header/HeaderLogout/HeaderLogoutDesktop';
import Style from './style.module.css';
import { Footer } from '../../Components/Fotter';
import ImagemDescpition from './ImagemDescpition';
import { Grid, CardMedia, CardContent, Typography } from '@mui/material';
const About = () => (
    <div className={Style.home}>
        <HeaderLogoutDesktop />
        <div className={Style.container}>
            <ImagemDescpition></ImagemDescpition>
            <div className={Style.description}>
                <p>A ideia do <b>Mariposas Digitais</b> nasceu de Jéssica e Letícia, acadêmicas do Bacharelado em Sistemas de Informação da Pontifícia Universidade Católica de Minas Gerais. Elas se conheceram durante o 2º período, quando eram as únicas mulheres da turma, e logo se conectaram por compartilharem o mesmo sonho: <b>tornar a área de tecnologia um ambiente acolhedor para mulheres e uma possibilidade de futuro para adolescentes do sexo feminino.</b><br /> <br /><br />
                    Como mulheres, reconhecemos como a segregação estrutural pode afastar e limitar o interesse das mulheres pela tecnologia. Como iniciativa, trabalhamos com o objetivo de conectar mulheres que já estiveram do outro lado da moeda com mulheres que têm a oportunidade de descobrir a área e explorar novos caminhos.<br /> <br /> <br />
                    Acreditamos que ter uma figura já atuante na área como guia incentiva o potencial das adolescentes para explorar o universo da tecnologia como uma opção de carreira. Nossa iniciativa busca criar uma rede de apoio e encorajar as próximas gerações de mulheres na área da tecnologia.
                </p>
            </div>

            <div className={Style['content-info']}>
                <h2>FUNDADORAS</h2>
                <Grid container spacing={2} style={{ marginTop: '40px' }}>
                    <Grid item xs={12} sm={6} md={6}>
                        <div sx={{ maxWidth: 345 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180 }}>
                                <CardMedia
                                    sx={{ height: 180, width: 180, display: 'flex' }}
                                    image="images/jessica.png"
                                    title="green iguana"
                                />
                            </div>
                            <CardContent style={{ marginTop: '20px' }}>
                                <div style={{ margin: 'auto', backgroundColor: '#fff', width: '250px', paddingBottom: '10px', paddingTop: '15px' }}>
                                    <Typography gutterBottom variant="body2" component="div">
                                        <a href="https://www.linkedin.com/in/jessicargentino/" className={Style.signup2} style={{ fontWeight: 'bold', fontSize: '15px' }}>JÉSSICA ARGENTINO</a>
                                    </Typography>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={2} md={6}>
                        <div sx={{ maxWidth: 345 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180 }}>
                                <CardMedia
                                    sx={{ height: 180, width: 190, display: 'flex' }}
                                    image="images/leticia.png"
                                    title="apadrinhamento"
                                />
                            </div>
                            <CardContent style={{ marginTop: '20px' }}>
                                <div style={{ margin: 'auto', backgroundColor: '#fff', width: '250px', paddingBottom: '10px', paddingTop: '15px' }}>
                                    <Typography gutterBottom variant="body2" component="div">
                                        <a href="https://www.linkedin.com/in/leticia-rodrigues-72b4b21a2/" className={Style.signup2} style={{ fontWeight: 'bold', fontSize: '15px' }}>LETICIA RODRIGUES</a>
                                    </Typography>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
        <Footer />
    </div>
);

export default About;
