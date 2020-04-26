import React from 'react'

import { Link } from 'react-router-dom'

import './about-dropdown.styles.scss'

const AboutDropdown = () => (
    <div className="contact-dropdown">
        <Link className="contact-dropdown__item" to='/shop'>ABOUT US</Link>
        <Link className="contact-dropdown__item" to='/shop'>CONTACT US</Link>
    </div>
)

export default AboutDropdown