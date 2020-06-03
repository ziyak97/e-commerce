import React from 'react'
import { Route } from 'react-router-dom'

import { connect } from 'react-redux'

import WithSpinner from '../../components/with-spinner/with-spinner.component'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection-page/collection-page.component'
import ItemDescriptionPage from '../item-description-page/item-description-page.component'

import { updateCollections } from '../../redux/shop/shop.actions'

import { firestore, collectionsSnapshotToMap } from '../../firebase/firebase.utils'

import './shop-page.styles.scss'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
const ItemDescriptionPageWithSpinner = WithSpinner(ItemDescriptionPage)

class ShopPage extends React.Component {
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null

    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections')
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = collectionsSnapshotToMap(snapshot.docs)
            updateCollections(collectionsMap)
            this.setState({loading: false})
        })
    }

    render() {
        const { match } = this.props
        const { loading } = this.state
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={props => (<CollectionsOverviewWithSpinner isLoading={loading} {...props} />)} />
                <Route exact path={`${match.path}/:collectionId`} render={props => (<CollectionPageWithSpinner isLoading={loading} {...props} />)} />
                <Route exact path={`${match.path}/:collectionId/:itemId`} render={props => (<ItemDescriptionPageWithSpinner isLoading={loading} {...props} />)} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)