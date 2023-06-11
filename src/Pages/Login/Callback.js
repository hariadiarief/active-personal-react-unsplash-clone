import React, { useEffect } from 'react';
import axios from 'axios';

const config = {
    unsplash: {
        accessKey: 'S0eywkacHJBqhhAz8tbtsHRykLcbxgoAR2q2YJrREdc',
        secretKey: 'sSd8EQAhsYpt3ZWmyPA6AokiSnP4v70C0NxWO5H2odc',
        callbackUrl: 'http://localhost:3000/callback' // Ganti dengan URL callback yang sesuai
    }
};

const Callback = () => {
    useEffect(() => {
        const { accessKey, secretKey, callbackUrl } = config.unsplash;
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        const requestBody = {
            grant_type: 'authorization_code',
            client_id: accessKey,
            client_secret: secretKey,
            redirect_uri: callbackUrl,
            code: code
        };

        axios.post('https://unsplash.com/oauth/token', requestBody)
            .then(response => {
                // Simpan token akses (response.data.access_token) ke local storage atau state aplikasi untuk digunakan dalam permintaan API selanjutnya
                console.log(response.data.access_token);
            })
            .catch(error => {
                // Tangani kesalahan
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Callback...</h1>
        </div>
    );
};

export default Callback;