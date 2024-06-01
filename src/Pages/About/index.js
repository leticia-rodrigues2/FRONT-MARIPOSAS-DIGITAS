import React from 'react';
import Header from '../../Components/Header/Header';
import Style from './style.module.css';
import { Footer } from '../../Components/Fotter';
import ImagemDescpition from './ImagemDescpition';
import { Grid, CardMedia, CardContent, Typography } from '@mui/material';
const About = () => (
    <div className={Style.home}>
        <Header />
        <div className={Style.container}>
        <ImagemDescpition></ImagemDescpition>
        <div className={Style.description}>
        <p>A ideia do <b>Mariposas Digitais</b> partiu de Jéssica e Letícia, acadêmicas do curso de Bacharelado em Sistemas de Informação da Pontifícia Universidade Católica de Minas Gerais, que se encontraram no 2º período, enquanto as únicas mulheres da turma, e se conectaram por carregarem o mesmo sonho: <b> fazer com que a área de tecnologia seja um lugar acolhedor e uma possibilidade de futuro para adolescentes do sexo feminino.</b> <br /> <br /><br />
         Enquanto mulheres, reconhecemos como a segregação estrutural pode afastar e limitar o interesse de mulheres por tecnologia. E enquanto iniciativa, trabalhamos com o objetivo de conectar mulheres que já estiveram do outro lado da moeda, a mulheres que possuem a oportunidade de voarem por caminhos diferentes. <br /> <br /> <br />
         Acreditamos que ao proporcionar um ambiente acolhedor e inspirador, podemos incentivar o potencial das adolescentes para explorarem todo o universo da tecnologia. Nossa iniciativa não se limita apenas ao ensino de habilidades técnicas, mas também busca criar uma rede de apoio e mentoria, onde mulheres que já trilharam esse caminho possam compartilhar suas experiências e encorajar as próximas gerações de mulheres na área da tecnologia.
        </p> 
        </div>

        <div className={Style['content-info']}>
            <h2>FUNDADORAS</h2>
                <Grid container spacing={2} style={{marginTop:'40px'}}>
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
                        <div style={{ margin: 'auto', backgroundColor: '#fff', width: '250px', paddingBottom: '10px', paddingTop: '10px' }}>
                            <Typography gutterBottom variant="body2" component="div">
                                <a href="https://www.linkedin.com/in/jessicargentino/" className={Style.signup2} style={{ fontWeight: 'bold' }}>JÉSSICA ARGENTINO</a>
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
                        <div style={{ margin: 'auto', backgroundColor: '#fff', width: '250px', paddingBottom: '10px', paddingTop: '10px' }}>
                            <Typography gutterBottom variant="body2" component="div">
                                <a href="https://www.linkedin.com/in/leticia-rodrigues-72b4b21a2/" className={Style.signup2} style={{ fontWeight: 'bold' }}>LETICIA RODRIGUES</a>
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
