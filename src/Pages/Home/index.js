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

const Home = () => (
    <div className={Style.home}>
        <Header/>
            <div className={Style['image-container']}/>    
             
       

         <div className={Style.container}>
            <div className={Style['container-description']}>
                <h1>Embarque na jornada de metamorfose e voe alto com o apoio das nossas mentoras!</h1>
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
                        <a href="#" className={Style.signup2} style={{ fontWeight: 'bold' }}>REALIZE SEU CADASTRO</a>
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
                        <a href="#" className={Style.signup2} style={{ fontWeight: 'bold' }}>CONECTE-SE COM MENTORAS</a>
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontSize="16px">
                        Visualize mentoras disponíveis e manifeste abertura para apadrinhamento.
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
                        <a href="#" className={Style.signup2} style={{ fontWeight: 'bold' }}>OBTENHA APADRINHAMENTO</a>
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontSize="16px">
                        Seja apadrinhada e inicie sua jornada e tecnologia com apoio de sua mentora.
                        </Typography>
                    </CardContent>
                    </div>
                </Grid>
                </Grid>
             </div>
           
        </div>
        <div  className={Style['content-video']}> 
         <video controls autoPlay muted>
          <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
         </video>
        </div> 



        <div className={Style['contente-faq']}> 
        <Typography sx={{ textAlign: 'left', fontWeight: '800', color: 'white' }}>
            FAQ | PERGUNTAS FREQUENTES
        </Typography>

        <div>
            <Typography  sx={{ textAlign: 'center', fontWeight: '800', color: 'white' }}>
                <a href="#" className="signup2" style={{ fontWeight: 'bold' }}>CONECTE-SE COM MENTORAS</a>
            </Typography>
        </div>



        <div>
            <Typography  sx={{ textAlign: 'center', fontWeight: '800', color: 'white' }}>
                <a href="#" className="signup2" style={{ fontWeight: 'bold',color: 'white'  }}>CONECTE-SE COM MENTORAS</a>
            </Typography>
        </div>

        <div>
            <Typography  sx={{ textAlign: 'center', fontWeight: '800', color: 'white' }}>
                <a href="#" className="signup2" style={{ fontWeight: 'bold' }}>CONECTE-SE COM MENTORAS</a>
            </Typography>
        </div>
        </div>
    </div>
);

export default Home;
