import axios from 'axios'
// import toast from './axios-config'; // Sesuaikan dengan path file konfigurasi
import { toast } from 'react-toastify';


const fetchAPI = axios.create({
    baseURL: 'https://api.unsplash.com'
})

fetchAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
                },
            };
        } else {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                },
            };
        }
    },
    (error) => {
        Promise.reject(error);
    }
)

fetchAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        const expectedError =
            error.response &&
            error.response >= 400 &&
            error.response < 500;

        if (!expectedError) {
            console.log('Logging the error', error);
            toast.error(error?.message || "An unexpected error occured!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
        return Promise.reject(error);
    }
);


export default fetchAPI