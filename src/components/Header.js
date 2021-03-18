import React from 'react'
import contactImage from '../images/image1.jpg'
import './Header.css'

function Header({search}) {
   
    return (
        <div className='header'>
            <img src={contactImage} alt="" className='header__image' />
            <h1 className='header__text'>My UT Phone Book</h1>
        </div>
    )
}

export default Header
