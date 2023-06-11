import { lazy } from 'react'
const Home = lazy(async () => await import('./Pages/Home'))
const Search = lazy(async () => await import('./Pages/Search'))
const Login = lazy(async () => await import('./Pages/Login'))
const Callback = lazy(async () => await import('./Pages/Login/Callback'))

export const publicRoutes = [
    {
        name: 'Home',
        component: <Home />,
        path: '/',
        exact: true,
    },
    {
        name: 'Search',
        component: <Search />,
        path: '/search',
    },
    {
        name: 'Search',
        component: <Login />,
        path: '/login',
    },
    {
        name: 'Callback',
        component: <Callback />,
        path: '/callback',
    },
]
