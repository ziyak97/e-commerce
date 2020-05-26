export const addItemsToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.sizeId === cartItemToAdd.sizeId)

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.sizeId === existingCartItem.sizeId
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const removeItemsFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.sizeId === cartItemToRemove.sizeId)
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.sizeId !== existingCartItem.sizeId)
    }
    return cartItems.map(cartItem => {
        return cartItem.sizeId === existingCartItem.sizeId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    })
}