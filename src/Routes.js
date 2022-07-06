import { lazy } from 'react'
const Home = lazy(() => import('./Pages/Home'))
const Search = lazy(() => import('./Pages/Search'))

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
