import { Input, Spin } from 'antd'
import React, { Suspense, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import fetchAPI from 'Services/API';
import ModalDetail from '../../Components/ModalDetail';
import ImageCard from '../Search/ImageCard';

export default function Home() {
    let navigate = useNavigate();

    const [query, setQuery] = useState(null)

    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [per_page] = useState(10)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchSearchPhoto = () => {
        if (query !== null) {
            navigate({
                pathname: 'search',
                search: `?q=${query}`,
            })
        }
    }

    const fetchHomePhoto = () => {
        fetchAPI.get('/photos', {
            params: { page, per_page },
        }).then((res) => {
            if (res.status === 200) {
                if (page === 1) {
                    setImages(res.data)
                } else {
                    setImages(images.concat(res.data))
                }
            }
        })
    }
    useEffect(() => fetchHomePhoto(), [page])

    return (
        <>
            <div className='container home'>
                <div className="home__search">
                    <Input.Search
                        placeholder='Search free high-resolution photos'
                        allowClear
                        enterButton='Search'
                        size='large'
                        onChange={({ target: { value } }) => setQuery(value)}
                        onSearch={fetchSearchPhoto}
                        value={query}
                    />
                </div>

                <Suspense fallback={<Spin wrapperClassName className='spiner--wrapper' size='large' />} >
                    {
                        !images.length
                            ? null
                            : <InfiniteScroll
                                className='search__image-list'
                                dataLength={images.length} //This is important field to render the next data
                                next={() => setPage(page + 1)}
                                hasMore={true}
                                loader={<Spin wrapperClassName className='spiner--wrapper' size='large' />}
                            >
                                {
                                    images.map((image, index) => {
                                        return <ImageCard key={index} image={image} onClick={() => {
                                            setIsModalOpen(true)
                                            setSelectedImage(image)
                                        }} />
                                    })
                                }
                            </InfiniteScroll>
                    }
                </Suspense>
            </div>

            <ModalDetail
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedImage={selectedImage}
            />
        </>

    )
}
