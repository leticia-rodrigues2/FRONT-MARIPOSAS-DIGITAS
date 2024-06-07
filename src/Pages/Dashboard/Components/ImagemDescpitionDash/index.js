import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Style from './style.module.css';

const ImagemDescriptionDash = () => {
    const isDesktop = useMediaQuery({ query: '(min-width: 870px)' });

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            {isDesktop ? (
                <>
                    <div className={Style['container-description']}>
                        <h1>
                            As <b>mariposas digitais</b> é uma iniciativa de impacto social que tem como missão
                            fomentar o interesse e acesso à tecnologia para adolescentes do sexo feminino por meio da educação.
                        </h1>
                        <div className={Style['logo-container']}>
                            <img src="images/logo-corte-3.png" alt="Logo of Mariposas Digitais" className={Style.logo} />
                        </div>
                    </div>

                </>
            ) : (
                <>

                    <div className={Style['container-description-mobile']}>
                        <img src="images/logo-corte-3.png" alt="Logo of Mariposas Digitais" className={Style.logo2} />
                        <h1>
                            As <b>mariposas digitais</b> é uma iniciativa de impacto social que tem como missão
                            fomentar o interesse e acesso à tecnologia para adolescentes do sexo feminino por meio da educação.
                        </h1>
                    </div>

                </>
            )}
        </div>
    );
};

export default ImagemDescriptionDash;
