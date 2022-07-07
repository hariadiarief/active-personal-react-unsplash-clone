import { Input } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Home() {
    let navigate = useNavigate();

    const [query, setQuery] = useState(null)

    const fetchSearchPhoto = () => {
        if (query !== null) {
            navigate({
                pathname: 'search',
                search: `?q=${query}`,
            })
        }
    }

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
        </div>
    )
}
