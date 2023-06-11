import axios from 'axios'

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


export default fetchAPI