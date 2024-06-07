import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function Alerts() {
    const [open, setOpen] = React.useState(true);

    return (
        <Box sx={{ width: '100%', marginTop: "20px", padding: "20px" }}>
            <Collapse in={open}>
                <Alert
                    icon={false}
                    variant="outlined"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon fontSize="inherit" sx={{ color: 'white' }} />
                        </IconButton>
                    }
                    sx={{ mb: 2, backgroundColor: '#D457D2', color: 'white', borderColor: 'white', textAlign: 'center' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="images/borbo.png" alt="nivel" width='25px' height='20px' />
                    </div>
                    Seja bem-vinda às Mariposas Digitais.<br />
                </Alert>
            </Collapse >
        </Box >
    );
}
