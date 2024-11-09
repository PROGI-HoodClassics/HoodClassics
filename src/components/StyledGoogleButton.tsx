// src/components/StyledGoogleButton.tsx

import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const StyledGoogleButton: React.FC = () => {
    const handleClick = async () => {
        try {
            // Make a GET request to your backend endpoint
            const response = await axios.get('/users/list');
            const users = response.data;
            console.log('User List:', users);
            alert(`Fetched ${users.length} users from the server.`);
        } catch (error) {
            console.error('Error fetching user list:', error);
            alert('Failed to fetch user list. Please try again later.');
        }
    };

    return (
        <Button
            onClick={handleClick}
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
