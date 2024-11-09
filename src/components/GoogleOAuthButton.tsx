// src/components/GoogleOAuthButton.tsx

import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button } from '@mui/material';
import axios from 'axios';

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

const GoogleOAuthButton: React.FC = () => {
    const handleSuccess = async (credentialResponse: any) => {
        const token = credentialResponse.credential;
        try {
            const response = await axios.post('/api/auth/google', { token });
            const { user, accessToken } = response.data;

            // Store token in local storage or cookie
            localStorage.setItem('accessToken', accessToken);
            alert(`Welcome ${user.name}!`);
        } catch (error) {
            console.error('OAuth Login Error:', error);
        }
    };

    const handleFailure = () => {
        console.error('OAuth Login Failed');
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin
            onSuccess={handleSuccess}
    onError={handleFailure}
    render={(renderProps: { onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; }) => (
        <Button
            onClick={renderProps.onClick}
    variant="contained"
    color="primary"
    fullWidth
    >
    Sign in with Google
    </Button>
        )}
    />
    </GoogleOAuthProvider>
);
};

export default GoogleOAuthButton;
