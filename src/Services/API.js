import axios from 'axios'

const fetchAPI = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS}`,
    },
})

let isRefreshing = false;

let subscribers = [];

const GenerateRefreshToken = (refreshToken) => {
    return fetchAPI.post('agent/refresh-token', {
        headers: {
            'refresh-token': refreshToken,
        }
    });
}

const subscriberTokenRefresh = (callabck) => {
    subscribers.push(callabck);
}

const onRefreshed = (token) => {
    subscribers.map((callback) => callback(token));
}

fetchAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        return {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            },
        };
    },
    (error) => {
        Promise.reject(error);
    }
)

fetchAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        const { config, response: { status } } = error;

        const originalRequest = config;

        const refreshToken = localStorage.getItem('refresh-token');

        if (status === 401) {
            if (refreshToken !== null) {
                if (!isRefreshing) {
                    isRefreshing = true;

                    GenerateRefreshToken(refreshToken)
                        .then(async (res) => {
                            isRefreshing = false;

                            const { data } = res;

                            localStorage.setItem('token', data.data.token);
                            localStorage.setItem('refresh-token', data.data.token);

                            onRefreshed(data.data.token);
                            subscribers = [];
                        });
                }

                return new Promise((resolve) => {
                    subscriberTokenRefresh((token) => {
                        originalRequest.headers.Authorization = token;
                        resolve(fetchAPI(originalRequest));
                    })
                })
            }
        }
    },
)

export default fetchAPI