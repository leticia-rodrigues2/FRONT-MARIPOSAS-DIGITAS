import React, { useMemo } from 'react';
import HeaderDesktop from './HeaderDesktop/HeaderDesktop.js';
import HeaderMobile from './HeaderMobile/HeaderMobile.js';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Header() {
    const isDesktop = useMediaQuery('(min-width: 640px)', {
        initializeWithValue: false
    });

    const HeaderComponent = useMemo(() => {
       
        return !isDesktop ?  <HeaderMobile /> :<HeaderDesktop /> ;
    }, [isDesktop]);

    return (
        <>
            {HeaderComponent}
        </>
    );
}
