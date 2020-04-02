import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './collections-overview.styles.scss'

import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors'

import CollectionPreview from '../collection-preview/collection-preview.component'

const CollectionsOverview = ({collection}) => {

    return (
        <div className='collections-overview'>
            {collection.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collection: selectCollectionsForPreview
})


export default connect(mapStateToProps)(CollectionsOverview)