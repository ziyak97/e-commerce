import React, { useState } from 'react'
import firebase from '../../firebase/firebase.utils'

const AdminCollectionItems = ({ collection }) => {
    const [form, setForm] = useState({})
    const [files, setFiles] = useState([])
    const regexSizes = /^([a-z]+)(,\s*[a-z]+)*$/i  // validate sizes are seperated by comma.

    const validateFormAndTransformData = () => {
        if (!(form.name, form.id, form.description, form.sizes, form.price)) {
            alert("Input all feilds!")
            return
        }
        if (!regexSizes.test(form.sizes)) {
            alert('Please input sizes in the correct format!')
            return
        }
    }

    const handleChangeImage = e => {
        const allFiles = e.target.files
        const arr = []
        for (let i = 0; i < allFiles.length; i++) {
            arr.push(allFiles[i])
        }
        console.log(arr)
        setFiles([...arr])
    }

    const handleChange = e => {
        const { name, value } = e.target
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))

        console.log(files)
    }

    const handleSubmit = () => {
        validateFormAndTransformData()
        const storageRef = firebase.storage().ref();
        files.forEach(async file => {
            const imageRef = storageRef.child(`${collection}/${form.name}/${file.name}`)

            try {
                const snapshot = await imageRef.put(file)
                const downloadUrl = await snapshot.ref.getDownloadURL()
                console.log(downloadUrl)
            } catch (e) {
                console.error(e.message)
            }
        })
    }
    return (
        <div>
            <div>

                <input type="text" value={form.id || ''} name='id' placeholder='id' onChange={handleChange} />
                <input type="text" value={form.name || ''} name='name' placeholder='name' onChange={handleChange} />
                <input type="text" value={form.description || ''} name='description' placeholder='description' onChange={handleChange} />
                <input type="number" value={form.price || ''} name='price' min='0' placeholder='price' onChange={handleChange} />
                <input type="file" name='imageUrl' placeholder='imageUrls' onChange={handleChangeImage} multiple />
                <input type="text" value={form.sizes || ''} name='sizes' placeholder='sizes' onChange={handleChange} />
                <button onClick={handleSubmit}>Add</button>

            </div>
        </div>
    )
}

export default AdminCollectionItems