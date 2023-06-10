import { Avatar, Button, Popover, Space, Tooltip } from 'antd'
import React, { useRef, useState } from 'react'
import { DownloadOutlined, HeartOutlined } from '@ant-design/icons';

export default function ImageCard({ image }) {
    const { description, urls, user, alt_description } = image
    const [spans, setSpans] = useState(0)
    const imageRef = useRef()

    const calculateSpan = () => {
        const height = imageRef.current.clientHeight
        const spans = Math.ceil(height)
        setSpans(spans)
    }

    const content = (
        <div>
            <Button type="primary">Hover me</Button>
            <Button type="secondary">Hover me</Button>
        </div>
    );

    return (
        <div className='image-card' style={{ gridRowEnd: `span ${spans + 10}` }}>
            <img className='image-card__thumbnail' ref={imageRef} alt={description} src={urls.small} onLoad={calculateSpan} />
            <div className='image-card__item p-2 flex flex-col' style={{ gridRowEnd: `span ${spans}` }}>
                <div>
                    <Avatar
                        src={user.profile_image.small}
                    />
                    <span className='ml-2'>{`${user.first_name} ${user.last_name} `}</span>
                </div>
                <div className='italic text-center m-auto '>{`" ${alt_description} "`}</div>
                <Space className='flex-row-reverse'>
                    <Tooltip title="download">
                        <Button type="primary" icon={< DownloadOutlined />} />
                    </Tooltip>

                    <Tooltip title="favorite">
                        <Button type="primary" icon={<HeartOutlined />} />
                    </Tooltip>
                </Space>

            </div>
        </div>
    )
}
