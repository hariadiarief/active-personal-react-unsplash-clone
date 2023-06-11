import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        const requestBody = {
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
            client_secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
            redirect_uri: process.env.REACT_APP_UNSPLASH_CALLBACK_URL,
            code: code
        };

        axios.post('https://unsplash.com/oauth/token', requestBody)
            .then(response => {
                localStorage.setItem('token', response.data.access_token)
                navigate("/")
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <div>
            <h1>Callback...</h1>
        </div>
    );
};

export default Callback;