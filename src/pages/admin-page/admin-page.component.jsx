import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import AdminCollectionItems from '../../components/admin-collection-items/admin-collection-items.component'

import { addDocument, addItemsToDocument } from '../../firebase/firebase.utils'

import { selectShopCollections } from '../../redux/shop/shop.selectors'

const AdminPage = ({ collections }) => {
    const [collection, setCollection] = useState('')

    const collectionNames = Object.keys(collections)

    const handleSubmit = () => {
        addDocument(collection)
        setCollection('')
    }
    return (
        <div>
            {collectionNames.map(collection => (
                <div key={collection}>
                    {collection} delete
                    <AdminCollectionItems collection={collection} />
                </div>
            ))}
                <input type="text" value={collection} onChange={e => setCollection(e.target.value)} placeholder='Add Collection' />
                <button onClick={handleSubmit}>Add Collection</button>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollections
})

export default connect(mapStateToProps)(AdminPage)
