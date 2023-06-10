import { Input, Spin } from 'antd'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import API from 'Services/API'
const ImageCard = lazy(async () => await import('./ImageCard'))

export default function Search() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '')

    const [images, setImages] = useState([])
    const [pagination, setPagination] = useState({
        total: 0,
        total_pages: 0
    })

    const [page, setPage] = useState(1)
    const [per_page] = useState(10)

    const resetState = () => {
        setImages([])
        setPage(1)
        setPagination({
            total: 0,
            total_pages: 0
        })
    }

    const updateQ = () => {
        setSearchParams({ q: query })
        resetState()
    }

    const fetchSearchPhoto = () => {
        API.get('/search/photos', {
            params: { query, page, per_page },
        }).then((res) => {
            if (res.status === 200) {
                if (page === 1) {
                    setImages(res.data.results)
                } else {
                    setImages(images.concat(res.data.results))
                }
                setPagination({
                    total: res.data.total,
                    total_pages: res.data.total_pages,
                })
            }
        })
    }
    useEffect(() => fetchSearchPhoto(), [page, searchParams.get('q')])

    return (
        <div className='container'>
            <Input.Search
                placeholder='Search free high-resolution photos'
                allowClear
                enterButton='Search'
                size='large'
                onChange={({ target: { value } }) => setQuery(value)}
                onSearch={(value) => updateQ(value)}
                value={query}
            />
            <Suspense fallback={<Spin wrapperClassName className='spiner--wrapper' size='large' />}>
                <InfiniteScroll
                    className='search__image-list'
                    dataLength={images.length} //This is important field to render the next data
                    next={() => setPage(page + 1)}
                    hasMore={page <= pagination.total_pages}
                    loader={<Spin wrapperClassName className='spiner--wrapper' size='large' />}
                >
                    {
                        images.map((image, index) => {
                            return <ImageCard key={index} image={image} />
                        })
                    }
                </InfiniteScroll>
            </Suspense>




        </div >
    )
}
