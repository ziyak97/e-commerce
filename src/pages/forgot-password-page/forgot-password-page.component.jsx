import React, { useState } from 'react'

import { auth } from '../../firebase/firebase.utils'


export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    const [emailNotExist, setEmailNotExist] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await auth.sendPasswordResetEmail(email)
            setEmailSent(true)
        } catch (e) {
            if (e.code === 'auth/user-not-found') {
                setEmailNotExist(true)
            }
            console.error(e)
        }

    }

    return (
        <div>
            <p>Give us your email id and we'll send you an email to reset your password.</p>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter email' required />
                <button type='submit'>Get Password</button>
            </form>
            {emailSent &&
                <p>Please check your inbox and follow the instructions to change your email!</p>
            }
            {emailNotExist &&
                <p>This email id does not exist!</p>
            }
        </div>
    )
}

export default ForgotPasswordPage