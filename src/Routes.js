import { lazy } from 'react'
const Home = lazy(async () => await import('./Pages/Home'))
const Search = lazy(async () => await import('./Pages/Search'))

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
]
