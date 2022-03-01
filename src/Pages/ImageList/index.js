import React from 'react'
import ImageCard from './ImageCard'

export default function ImageList({ images }) {
    const imagesItem = images.map((image) => {
        return <ImageCard key={image.id} image={image} />
    })
    return <div className='image-list'>{imagesItem}</div>
}
