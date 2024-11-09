// src/components/GoogleOAuthButton.tsx

import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
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
        (
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                    theme="outline"
                    size="large"
                    text="signin_with"
                    shape="rectangular"
                />
            </GoogleOAuthProvider>
        ))
};

export default GoogleOAuthButton;
