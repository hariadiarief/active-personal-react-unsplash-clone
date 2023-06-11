import { Avatar, Button, Popover, Space, Tooltip } from 'antd'
import React, { useRef, useState } from 'react'
import { DownloadOutlined, HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import fetchAPI from 'Services/API';
import ModalDetail from '../../Components/ModalDetail';

export default function ImageCard({ image }) {
    const { description, urls, user, alt_description, liked_by_user, id } = image

    const imageRef = useRef()
    const [spans, setSpans] = useState(0)
    const [isLiked, setIsLiked] = useState(liked_by_user)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const calculateSpan = () => {
        const height = imageRef.current.clientHeight
        const spans = Math.ceil(height)
        setSpans(spans)
    }

    const likePhoto = () => {
        fetchAPI.post(`/photos/${id}/like`, { params: { id } }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => {
                if (res.status === 201) {
                    console.log({ res });
                    setIsLiked(true)
                }
            })
    }

    const unLikePhoto = () => {
        fetchAPI.delete(`/photos/${id}/like`, { params: { id } }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => {
                if (res.status === 200) {
                    console.log({ res });
                    setIsLiked(false)
                }
            })
    }

    return (
        <>
            <div className='image-card' style={{ gridRowEnd: `span ${spans + 10}` }} >
                <img className='image-card__thumbnail' ref={imageRef} alt={description} src={urls.small} onLoad={calculateSpan} />
                <div className='image-card__item p-2 flex flex-col ' style={{ gridRowEnd: `span ${spans}` }}>
                    <div className='flex flex-col grow' onClick={() => { setIsModalOpen(true) }}>
                        <div>
                            <Avatar
                                src={user.profile_image.small}
                            />
                            <span className='ml-2 pb-3'>{`${user.first_name} ${user.last_name} `}</span>
                        </div>
                        <div className='italic text-center m-auto '>{`" ${alt_description} "`}</div>
                    </div>
                    <Space className='image-card__action flex-row-reverse'>
                        <Tooltip title="download">
                            <a href={urls.full} download>
                                <Button icon={< DownloadOutlined />} />
                            </a>
                        </Tooltip>

                        <Tooltip title="favorite">
                            <Button
                                onClick={isLiked ? unLikePhoto : likePhoto}
                                style={isLiked ? { backgroundColor: "#f15151" } : {}}
                                icon={
                                    isLiked
                                        ? <HeartTwoTone twoToneColor="#f15151" />
                                        : < HeartOutlined />
                                }
                            />
                        </Tooltip>
                    </Space>
                </div>
            </div>

            <ModalDetail
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedImage={image}
            />
        </>
    )
}
