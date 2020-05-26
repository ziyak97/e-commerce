import React, { useRef, useState } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { selectShopItemToDisplay } from '../../redux/shop/shop.selectors'
import { addItem } from '../../redux/cart/cart.actions'

import CustomButton from '../../components/custom-button/custom-button.component'
import SizeButtons from '../../components/size-buttons/size-buttons.component'

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
        <div>
            {item.name}
            <img src={`${item.imageUrl[0]}`} alt="" />
            {errorMessage &&
                <div>Please select a size!</div>}
            {sizeSelected ?
                <CustomButton onClick={() => addItem(item)}>ADD TO CART</CustomButton> :
                <CustomButton onClick={() => setErrorMessage(true)}>ADD TO CART</CustomButton>
            }

            <div onClick={() => history.goBack()}>GO BACK</div>
            <div ref={inputEl} onClick={handleClick}>
                <SizeButtons sizes={item.sizes} />
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