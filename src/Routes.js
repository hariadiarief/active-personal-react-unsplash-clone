import { lazy } from 'react'
import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom'

import Layout from './Components/Layout'
import Home from './Pages/Home'
import Search from './Pages/Search'
import Callback from './Pages/Login/Callback'
import Favorite from './Pages/Favorite'
import NotFound from './Pages/NotFoud404'

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