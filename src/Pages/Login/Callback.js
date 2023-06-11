import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const config = {
    unsplash: {
        accessKey: 'S0eywkacHJBqhhAz8tbtsHRykLcbxgoAR2q2YJrREdc',
        secretKey: 'sSd8EQAhsYpt3ZWmyPA6AokiSnP4v70C0NxWO5H2odc',
        callbackUrl: 'http://localhost:3000/callback' // Ganti dengan URL callback yang sesuai
    }
};

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

            }).then(() => navigate("/"))
            .catch(error => {
                console.error(error);
            }).finally(() => {
                console.log('123', localStorage.getItem('token'))
            }
            );
    }, []);

    return (
        <div>
            <h1>Callback...</h1>
        </div>
    );
};

export default Callback;