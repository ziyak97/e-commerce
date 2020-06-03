import React, { useRef, useState } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { selectShopItemToDisplay } from '../../redux/shop/shop.selectors'
import { addItem } from '../../redux/cart/cart.actions'

import CustomButton from '../../components/custom-button/custom-button.component'
import SizeButtons from '../../components/size-buttons/size-buttons.component'

import './item-description-page.styles.scss'

const ItemDescriptionPage = ({ item, addItem, history }) => {

    const inputEl = useRef(null)
    const [sizeSelected, setSizeSelected] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const handleClick = () => {
        inputEl.current.children[0].childNodes.forEach(size => {
            if (size.classList.contains('active')) {
                item.selectedSize = (size.innerHTML)
                item.sizeId = `${item.id}/${size.innerHTML}`
                setSizeSelected(true)
                setErrorMessage(false)
            }
        })
    }

    return (
        <div className='item-description-page'>
            <div className='item-description-page__image-box'>
                <div className='item-description-page__go-back' onClick={() => history.goBack()}>&#8592; GO BACK</div>
                <img className='item-description-page__image' src={`${item.imageUrl[0]}`} alt={item.name} />
            </div>
            <div className='item-description-page__page-content'>
                <h2>{item.name}</h2>

                <div className='item-description-page__description'>{item.description}</div>

                <div className='item-description-page__sizes-container'>
                    <div ref={inputEl} onClick={handleClick}>
                        <SizeButtons sizes={item.sizes} />
                    </div>

                    {errorMessage &&
                        <div className='item-description-page__select-size-message'>Please select a size!</div>
                    }
                </div>

                {sizeSelected ?
                    <CustomButton onClick={() => addItem(item)}>ADD TO CART</CustomButton> :
                    <CustomButton onClick={() => setErrorMessage(true)}>ADD TO CART</CustomButton>
                }

            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    item: selectShopItemToDisplay(ownProps.match.params.collectionId, ownProps.match.params.itemId)(state)
})

const mapDispatchToProps = disptch => ({
    addItem: item => disptch(addItem(item))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemDescriptionPage))