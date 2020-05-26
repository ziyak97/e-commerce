import React, {useState} from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import Carousel from 'nuka-carousel'
import CustomButton from '../custom-button/custom-button.component'

import { addItem } from '../../redux/cart/cart.actions'

import './collection-item.styles.scss'

const CollectionItem = ({ item, addItem, history, match, title }) => {
    const { name, price, imageUrl } = item
    const [carouselControls, setCarouselControls] = useState(true)
    console.log(carouselControls)
    const handleClick = () => {
        if (!match.params.collectionId) {
            console.log(title)
            history.push(`${match.url}/${title.toLowerCase()}/${name}`)
        } else {
            history.push(`${match.url}/${name}`)
        }
    }

    return (
        <div className='collection-item'>
            <div className='collection-item-image' onMouseEnter={() => setCarouselControls(false)} onMouseLeave={() => setCarouselControls(true)}>
                <Carousel
                    className='collection-item-carousel'
                    withoutControls = {carouselControls}
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
            <CustomButton onClick={handleClick} inverted>VIEW</CustomButton>
            {/* <CustomButton onClick={() => addItem(item)} inverted>ADD TO CART</CustomButton> */}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default withRouter(connect(null, mapDispatchToProps)(CollectionItem))