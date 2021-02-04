import React, { useEffect, useState } from 'react'
import './NavBar.css'

function NavBar() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 140) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        })
    }, [])

    return (
        <div className={`nav ${show && 'scrolled'}`}>
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Finvestormint.com%2Fwp-content%2Fuploads%2F2017%2F07%2Fnetflix-logo-sq.png&f=1&nofb=1" alt="Netflix" className='nav__logo' />
            <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" className='nav__avatar' alt="" />
        </div>
    )
}

export default NavBar
