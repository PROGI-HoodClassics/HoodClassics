//API callovi se trebaju raditi preko enviroment varijabli jer deployana aplikacija ne salje zahtjeve na localHost
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const StyledGoogleButton: React.FC = () => {
    //const navigate = useNavigate();
      return (
        <Button
        component="a"
        href={`${API_BASE_URL}/oauth2/authorization/google`}
        variant="outlined"
        fullWidth
        sx={styles.googleButton}
        startIcon={<GoogleIcon />}
        >
        Sign in with Google
        </Button>
    );
};


const styles = {
    googleButton: {
        color: '#757575',
        borderColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        padding: '0.5rem 1rem',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        '&:hover': {
            backgroundColor: '#F5F5F5',
            borderColor: '#DADCE0',
        },
        '& .MuiButton-startIcon': {
            marginRight: '0.5rem',
        },
    },
};

export default StyledGoogleButton;
