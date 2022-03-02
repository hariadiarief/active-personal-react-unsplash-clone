import React, { useEffect, useRef, useState } from 'react'
import { useEventListener } from 'Hook/useEventListener'

export default function ImageCard({ image }) {
    const { description, urls } = image
    const [spans, setSpans] = useState(0)
    const imageRef = useRef()

    const calculateSpan = () => {
        const height = imageRef.current.clientHeight
        const spans = Math.ceil(height / 10)
        setSpans(spans)
    }

    useEffect(() => {
        imageRef.current.addEventListener('load', calculateSpan)
    }, [image])

    useEventListener('load', calculateSpan)
    return (
        <div style={{ gridRowEnd: `span ${spans}` }}>
            <img ref={imageRef} alt={description} src={urls.regular} />
        </div>
    )
}
