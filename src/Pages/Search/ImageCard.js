import React, { useRef, useState } from 'react'

export default function ImageCard({ image }) {
    const { description, urls } = image
    const [spans, setSpans] = useState(0)
    const imageRef = useRef()

    const calculateSpan = () => {
        const height = imageRef.current.clientHeight
        const spans = Math.ceil(height / 10)
        setSpans(spans)
    }

    return (
        <div style={{ gridRowEnd: `span ${spans}` }}>
            <img ref={imageRef} alt={description} src={urls.small} onLoad={calculateSpan} />
        </div>
    )
}
