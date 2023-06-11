import { Spin } from 'antd'
import React, { Suspense, useEffect } from 'react'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import fetchAPI from '../../Services/API'
import ImageCard from '../Search/ImageCard'

export default function Favorite() {
    const [like, setLike] = useState([])
    const [page, setPage] = useState(1)
    const per_page = 100

    const [isNext, setIsNext] = useState(true)


    const fetchLike = () => {
        fetchAPI.get('/users/hariadiarief/likes', {
            params: { username: 'hariadiarief', order_by: 'latest', page, per_page },
        }).then((res) => {
            if (res.status === 200) {
                if (page === 1) {
                    setLike(res.data)
                } else {
                    setLike(like.concat(res.data))
                }
                if (res.data.length === 0) {
                    setIsNext(false)
                    console.log('hai');
                }
                console.log({ res });
            }
        })
    }
    useEffect(fetchLike, [page])

    return (
        <Suspense fallback={<Spin wrapperClassName className='spiner--wrapper' size='large' />} >
            {
                !like.length
                    ? null
                    : <InfiniteScroll
                        className='search__image-list'
                        dataLength={like.length} //This is important field to render the next data
                        next={() => setPage(page + 1)}
                        hasMore={isNext}
                        loader={!isNext ? null : <Spin wrapperClassName className='spiner--wrapper' size='large' />}
                    >
                        {
                            like.map((image, index) => {
                                return <ImageCard key={index} image={image} />
                            })
                        }
                    </InfiniteScroll>
            }
        </Suspense>
    )
}
