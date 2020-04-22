import React from 'react'
import { connect } from 'react-redux'

import Carousel from 'nuka-carousel'

import CustomButton from '../custom-button/custom-button.component'
import { addItem } from '../../redux/cart/cart.actions'

import './collection-item.styles.scss'

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item

    return (
        <div className='collection-item'>
            <div className='collection-item-image'>
                <Carousel
                    className='collection-item-carousel'
                    defaultControlsConfig={{
                        nextButtonText: '→',
                        prevButtonText: '←',
                        pagingDotsStyle: {
                            display: 'none'
                        }
                    }}
                >
                    {imageUrl.map(image => <img key={image} src={image} className='image' alt="item" />)}
                </Carousel>
            </div>


            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton onClick={() => addItem(item)} inverted>ADD TO CART</CustomButton>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)

const smallest = (arr) => {
    const smallest = Math.min(arr[0], arr[1])
    const largest = Math.max(arr[0], arr[1])

    let div = largest

    while(true) {
        let isSmallest = true
        for(let i = smallest; i <= largest; i++) {
            if(div % i !== 0) {
                isSmallest = false
                break
            }
        }

        if(isSmallest) {
            return div
        } else {
            div++
        }
    }
}

console.log(smallest([1,5]))