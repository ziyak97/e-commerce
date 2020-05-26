import React from 'react'
import {Link} from 'react-router-dom'

export const VerifyEmailPage = () => {
    return (
        <div>
            <h2>Welcome to the CRWN family!</h2>
            <p>We are happy to have you here!</p>
            <p>Please verify you email!</p>
            <Link to='/'>Continue Shopping!</Link>
        </div>
    )
}

export default VerifyEmailPage
