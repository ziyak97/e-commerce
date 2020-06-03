import { createSelector } from 'reselect'

const selectShop = state => state.shop

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectShopCollection = (collectionUrlParam) => (
    createSelector(
        [selectShopCollections],
        collections => collections ? collections[collectionUrlParam] : null
    )
)

export const selectShopItemToDisplay = (collectionUrlParam1, collectionUrlParam2) => (
    createSelector(
        [selectShopCollections],
        collections => collections[collectionUrlParam1].items.filter(item => item.name === collectionUrlParam2)[0]
    )
)