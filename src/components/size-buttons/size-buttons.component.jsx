import React from 'react'

import './size-buttons.styles.scss'

const SizeButtons = ({ sizes }) => {

    const handleClick = (e) => {
        e.target.parentElement.querySelectorAll('.active').forEach(e =>
            e.classList.remove('active'))
        e.target.classList.add('active')
    }
    return (
        <div>
            {sizes.map(size => (
                <button className='size-buttons' key={size} onClick={handleClick}>{size.toUpperCase()}</button>
            ))}
        </div>
    )
}

export default SizeButtons