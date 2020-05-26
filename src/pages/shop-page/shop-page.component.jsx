import React from 'react'
import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection-page/collection-page.component'
import ItemDescriptionPage from '../item-description-page/item-description-page.component'

import './shop-page.styles.scss'

const ShopPage = ({ match }) => {

    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverview} />
            <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
            <Route exact path={`${match.path}/:collectionId/:itemId`} component={ItemDescriptionPage} />
        </div>
    )
}

export default ShopPage