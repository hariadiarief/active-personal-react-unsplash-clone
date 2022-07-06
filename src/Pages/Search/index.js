import { Input, Pagination, Spin } from 'antd'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import API from 'Services/API'
const ImageList = lazy(() => import('./ImageList'))

export default function Search() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '')

    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [per_page, setPerPage] = useState(10)


    const updateQuery = (value) => {
        if (!value) {
            fetchSearchPhoto(searchParams.get('q'))
        } else {
            setSearchParams({ q: query })
            fetchSearchPhoto(value)
        }

    }
    useEffect(updateQuery, [])

    const fetchSearchPhoto = (q) => {
        API.get('/search/photos', {
            params: { query: q, page, per_page },
        }).then((res) => {
            if (res.status === 200) setImages(res.data)
        })
    }



    return (
        <div className='container'>
            <Input.Search
                placeholder='Search free high-resolution photos'
                allowClear
                enterButton='Search'
                size='large'
                onChange={({ target: { value } }) => setQuery(value)}
                onSearch={(value) => updateQuery(value)}
                value={query}
            />

            {!images || !images?.results?.length ? null : (
                <>
                    <Suspense fallback={<Spin wrapperClassName className='spiner--wrapper' size='large' />}>
                        <ImageList images={images.results} />
                    </Suspense>
                </>
            )}
        </div>
    )
}
