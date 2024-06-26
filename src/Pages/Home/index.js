import React from 'react';
import Header from '../../Components/Header/Header';

import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { color } from 'style-value-types';
import Style from "./style.module.css";
import Faq from '../../Components/Faq';
import { Footer } from '../../Components/Fotter';
import HeaderLogout from '../../Components/Header/HeaderLogout';

const Home = () => (
    <div className={Style.home}>
        <HeaderLogout />
        <div className={Style['image-container']} />



        <div className={Style.container}>
            <div className={Style['container-description']}>
                <h1>Embarque na jornada de metamorfose e voe alto com o apoio das nossas madrinhas!</h1>
            </div>

            <div className={Style['content-info']}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <div sx={{ maxWidth: 345 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180 }}>
                                <CardMedia
                                    sx={{ height: 180, width: 150, display: 'flex' }}
                                    image="images/cadastro.png"
                                    title="green iguana"
                                />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="body2" component="div">
                                    <div className={Style.signup2} style={{ fontWeight: 'bold' }}>REALIZE SEU CADASTRO</div>
                                </Typography>
                                <Typography variant="caption" color="text.secondary" fontSize="16px">
                                    Preencha seus dados e realize seu cadastro em nossa plataforma.
                                </Typography>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div sx={{ maxWidth: 345 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180 }}>
                                <CardMedia
                                    sx={{ height: 180, width: 150, display: 'flex' }}
                                    image="images/icone-apadrinhamento.png"
                                    title="apadrinhamento"
                                />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="body2" component="div">
                                    <div className={Style.signup2} style={{ fontWeight: 'bold' }}>COMPLETE SEU PERFIL</div>
                                </Typography>
                                <Typography variant="caption" color="text.secondary" fontSize="16px">
                                    Insira informações adicionais ao seu perfil e aguarde para ser apadrinhada.
                                </Typography>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div sx={{ maxWidth: 345 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180 }}>
                                <CardMedia
                                    sx={{ height: 180, width: 150, display: 'flex' }}
                                    image="images/icone-mentoria.png"
                                    title="mentoria"
                                />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="body2" component="div">
                                    <div className={Style.signup2} style={{ fontWeight: 'bold' }}>OBTENHA APADRINHAMENTO</div>
                                </Typography>
                                <Typography variant="caption" color="text.secondary" fontSize="16px">
                                    Seja apadrinhada e inicie sua jornada em tecnologia com apoio de uma madrinha.
                                </Typography>
                            </CardContent>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>
        <div className={Style['content-video']}>
            <video controls autoPlay muted>
                <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>



        <div id="section-faq" className={Style['contente-faq']}>
            <Typography sx={{ textAlign: 'left', fontWeight: '800', fontSize: '20px', color: 'white', marginBottom: 10 }}>
                FAQ | PERGUNTAS FREQUENTES
            </Typography>

            <Faq></Faq>
        </div>

        <Footer></Footer>
    </div>
);

export default Home;
