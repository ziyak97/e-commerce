import React from 'react'

import './cart-item.styles.scss'

const CartItem = ({ item: { name, imageUrl, price, quantity, selectedSize } }) => (
    <div className='cart-item'>
        <img src={imageUrl} alt='item' />
        <div className='item-details'>
            <span className='name'>{name} ({selectedSize})</span>
            <span className='price'>{quantity} x ${price}</span>
        </div>
    </div>
)

export default CartItem