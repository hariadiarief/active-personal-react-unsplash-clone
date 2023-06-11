import { Outlet, NavLink } from 'react-router-dom'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { ReactComponent as IconMenu } from 'Assets/menu.svg'
import { ReactComponent as IconMenuOpen } from 'Assets/menu-open.svg'
import { useWindowDimention } from 'Hook'

export default function Layout() {
    const { width } = useWindowDimention()
    const myRef = useRef(null)

    const [isMobileNavShow, setIsMobileNavShow] = useState(null)
    const [positionScrollY, setPositionScrollY] = useState(0)
    const [isAutorizedAuthorized, setIsAutorizedAuthorized] = useState(undefined)

    useEffect(() => {
        setIsMobileNavShow(width >= 768) // 768px : Medium devices base on bootstrap
    }, [width])

    const onScroll = () => {
        setPositionScrollY(window.scrollY)

        if (myRef.current) {
            if (window.scrollY === 0) {
                // top of page condition
                myRef.current.style.top = '0px'
                myRef.current.style.boxShadow = 'none'
            } else if (positionScrollY > myRef.current.clientHeight) {
                // scrolled condition
                if (positionScrollY > window.scrollY) {
                    // scrolling top
                    myRef.current.style.top = '0px'
                    myRef.current.style.boxShadow =
                        '-0px 5px 5px -5px rgba(0, 0, 0, 0.75)'
                } else {
                    // scrolling down
                    myRef.current.style.top = `-${myRef.current.clientHeight}px`
                    myRef.current.style.boxShadow = 'none'
                }
            }
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [positionScrollY])

    // useLayoutEffect(() => {
    //     console.log('token', localStorage.getItem('token'));
    //     setIsAutorizedAuthorized(localStorage.getItem('token') ? true : false)
    // }, [localStorage.getItem('token')])

    useEffect(() => {
        function handleStorage() {
            setIsAutorizedAuthorized(!!localStorage.getItem('token'))
        }
        window.addEventListener('storage', handleStorage)
        handleStorage()
        return () => { window.removeEventListener('storage', handleStorage) }
    }, []);


    const handleLogin = () => {
        const oauthUrl = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&redirect_uri=${process.env.REACT_APP_UNSPLASH_CALLBACK_URL}&response_type=code&scope=&scope=public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections`;
        setIsAutorizedAuthorized(true)
        window.location.href = oauthUrl;
    };

    const handleLogout = () => {
        localStorage.clear()
        setIsAutorizedAuthorized(false)

    };

    return (
        <div className='layout'>
            <div ref={myRef} className='layout__header'>
                {renderMenu()}
            </div>
            <main>
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    )

    function renderMenu() {
        return (
            <>
                {/* menu for mobile only */}
                <div className='layout__header__menu-btn'>
                    <i
                        onClick={() => {
                            setIsMobileNavShow(!isMobileNavShow)
                        }}
                    >
                        {isMobileNavShow ? <IconMenuOpen /> : <IconMenu />}
                    </i>
                </div>
                <div
                    className='layout__header__navigations'
                    style={
                        isMobileNavShow === true
                            ? { display: 'flex' }
                            : { display: 'none' }
                    }
                >
                    <NavLink to='/' className='layout__header__navigation'>
                        <img
                            className='layout__header__navigation--logo'
                            src={require('Assets/logo.png')}
                            alt=''
                        />
                    </NavLink>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            isActive
                                ? 'layout__header__navigation--active'
                                : 'layout__header__navigation'
                        }
                    >
                        Home
                    </NavLink>
                    {
                        !isAutorizedAuthorized
                            ? null
                            : <NavLink to='/favorite' className={(navData) => (navData.isActive ? 'layout__header__navigation--active' : 'layout__header__navigation')}>
                                Favorite
                            </NavLink>
                    }

                    {
                        !isAutorizedAuthorized
                            ? <NavLink onClick={handleLogin} className='layout__header__navigation'>
                                Login
                            </NavLink>
                            : <NavLink onClick={handleLogout} className='layout__header__navigation'>
                                Logout
                            </NavLink>
                    }
                </div>
            </>
        )
    }
}