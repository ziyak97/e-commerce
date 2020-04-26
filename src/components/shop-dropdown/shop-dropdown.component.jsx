import React from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectDirectorySections } from '../../redux/directory/directory.selectors'

import './shop-dropdown.styles.scss'

const ShopDropdown = ({ shopDirectory }) => {
    const shopTitles = shopDirectory.map(directory => directory.title)

    return (
        <div className="contact-dropdown">
            <Link className="contact-dropdown__item" to='/shop'>ALL ITEMS</Link>
            {shopTitles.map(shopTitle => (
                <Link key={shopTitle} className="contact-dropdown__item" to={`/shop/${shopTitle}`}>{shopTitle.toUpperCase()}</Link>
            ))}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    shopDirectory: selectDirectorySections
})

export default connect(mapStateToProps)(ShopDropdown)