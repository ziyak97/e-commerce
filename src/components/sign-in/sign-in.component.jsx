import React from 'react'

import { Link, withRouter } from 'react-router-dom'


import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

import './sign-in.styles.scss'

class SignIn extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault()
        const email = this.state.email
        const password = this.state.password
        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: '', password: '' })

        } catch (error) {
            console.error(error)
        }

    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        value={this.state.email}
                        type="email"
                        handleChange={this.handleChange}
                        label="email"
                        required
                    />

                    <FormInput
                        name="password"
                        value={this.state.password}
                        type="password"
                        handleChange={this.handleChange}
                        label="password"
                        required
                    />
                    <Link to={`${this.props.location.pathname}/forgot-password`} className='signin__forgot-password'>Forgot Password?</Link>
                    <div className='buttons'>
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SignIn)