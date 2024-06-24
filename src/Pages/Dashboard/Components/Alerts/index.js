import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

export default function Alerts() {
    const [open, setOpen] = React.useState(true);

    return (
        <Box sx={{ width: '100%', marginTop: "20px", padding: "20px", width: '625px' }}>
            <Collapse in={open}>
                <Alert
                    icon={false}
                    variant="outlined"
                    sx={{
                        mb: 2,
                        backgroundColor: '#D457D2',
                        color: 'white',
                        borderColor: 'white',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div>
                        <img src="images/borbo.png" alt="nivel" width='25px' height='20px' style={{ marginRight: '8px' }} />
                        <div style={{ fontSize: '20px', textTransform: 'uppercase' }}>Seja bem-vinda às Mariposas Digitais.</div>
                    </div>
                </Alert>
            </Collapse>
        </Box>
    );
}
