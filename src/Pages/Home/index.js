import { Input, Pagination, Spin } from 'antd'
import React, { lazy, Suspense, useEffect, useState } from 'react'

import API from 'Services/API'
const ImageList = lazy(() => import('../ImageList'))

export default function Home() {
    const [query, setQuery] = useState(null)
    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [per_page, setPerPage] = useState(10)

    const paginate = (newPage, newPageSize) => {
        if (page !== newPage) setPage(newPage)
        if (per_page !== newPageSize) setPerPage(newPageSize)
    }

    const fetchSearchPhoto = () => {
        if (query !== null) {
            API.get('/search/photos', {
                params: { query, page, per_page },
            }).then((res) => {
                if (res.status === 200) setImages(res.data)
            })
        }
    }
    useEffect(fetchSearchPhoto, [page, per_page])

    return (
        <div className='container home'>
            <Input.Search
                placeholder='Search free high-resolution photos'
                allowClear
                enterButton='Search'
                size='large'
                onChange={({ target: { value } }) => setQuery(value)}
                onSearch={fetchSearchPhoto}
                value={query}
            />
            {!images || !images?.results?.length ? null : (
                <>
                    <Suspense fallback={<Spin wrapperClassName className='spiner--wrapper' size='large' />}>
                        <ImageList images={images.results} />
                    </Suspense>
                    <Pagination
                        responsive={true}
                        pageSize={per_page}
                        current={page}
                        total={images.total}
                        showTotal={(total) => `Total ${total} items`}
                        onChange={paginate}
                    />
                </>
            )}
        </div>
    )
}
