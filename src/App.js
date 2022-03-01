import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'

import NotFound from './Pages/NotFoud404'
import { Layout } from './Components'

import { publicRoutes } from './Routes'

export default function App() {
    return (
        <Router>
            <Suspense fallback={<Spin wrapperClassName className='spiner--wrapper' size='large' />}>
                <Layout>
                    <Routes>
                        {publicRoutes.map((route, index) => (
                            <Route exact={route.exact} path={route.path} element={route.component} key={index} />
                        ))}
                        <Route path='*' element={<NotFound />} key='404' />
                    </Routes>
                </Layout>
            </Suspense>
        </Router>
    )
}
