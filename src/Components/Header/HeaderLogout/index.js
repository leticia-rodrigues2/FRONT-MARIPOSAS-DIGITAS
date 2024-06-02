import React, { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderLogoutMobile from './HeaderLogoutMobile/index.js';
import HeaderLogoutDesktop from './HeaderLogoutDesktop/index.js';

export default function HeaderLogout() {
    const isDesktop = useMediaQuery('(min-width: 640px)', {
        initializeWithValue: false
    });

    const HeaderComponent = useMemo(() => {
       
        return !isDesktop ?  <HeaderLogoutMobile logoPrimary={true} /> :<HeaderLogoutDesktop /> ;
    }, [isDesktop]);

    return (
        <>
            {HeaderComponent}
        </>
    );
}
