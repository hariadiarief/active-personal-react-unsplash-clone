import { lazy } from 'react'
import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom'

const Layout = lazy(async () => await import('./Components/Layout'))
const Home = lazy(async () => await import('./Pages/Home'))
const Search = lazy(async () => await import('./Pages/Search'))
const Callback = lazy(async () => await import('./Pages/Login/Callback'))
const Favorite = lazy(async () => await import('./Pages/Favorite'))
const NotFound = lazy(async () => await import('./Pages/NotFoud404'))

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes >
                <Route path='/' element={<Layout />} >
                    <Route path="*" element={<NotFound />} />
                    <Route
                        index
                        element={<Home />}
                    />
                    <Route
                        path='/search'
                        element={<Search />}
                    />

                    <Route
                        path='/favorite'
                        element={<Favorite />}
                    />
                </Route>
                <Route
                    path='/callback'
                    element={<Callback />}
                />
            </Routes>
        </BrowserRouter>
    );
}