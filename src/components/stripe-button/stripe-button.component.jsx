import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'

import {clearCart} from '../../redux/cart/cart.actions'

const StripeCheckoutButton = ({ price, clearCart }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_OgpMBqRHzjfZRUBc5U6as8SF00hRJVG3cU'

    const onToken= token => {
        console.log(token)
        clearCart()
        alert('Payment Successful!')
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is ${price}`}
            amount={priceForStripe}
            currency='INR'
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    clearCart: () => dispatch(clearCart())
})

export default connect(null ,mapDispatchToProps)(StripeCheckoutButton)