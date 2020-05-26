import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './App.css'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop-page/shop-page.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout-page/checkout-page.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'
import VerifyEmailPage from './pages/verify-email-page/verify-email-page.comonent'
import ForgotPasswordPage from './pages/forgot-password-page/forgot-password-page.component'
import AdminPage from './pages/admin-page/admin-page.component'

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }

      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() =>
            this.props.currentUser ?
              (
                <Redirect to='/' />
              ) :
              (
                <SignInAndSignUpPage />
              )
          } />
            <Route exact path='/secret-admin-page' render={() =>
            this.props.currentUser && this.props.currentUser.isAdmin ?
              (
                <AdminPage />
                
              ) :
              (
               <Redirect to='/' />
              )
          } />
          <Route path='/signin/verify' component={VerifyEmailPage} />
          <Route path='/signin/forgot-password' component={ForgotPasswordPage} />
        </Switch>
        {
          this.props.currentUser && this.props.currentUser.isAdmin &&
          <Link to='/secret-admin-page'>Admin Page</Link>
        }
      </div>
    )
  }
}

const mapStateToProp = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(App)