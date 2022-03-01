import { lazy } from 'react'
const Home = lazy(() => import('./Pages/Home'))

export const publicRoutes = [
    {
        component: <Home />,
        path: '/',
        exact: true,
    },
]
