import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { auth } from '../../firebase/firebase.utils'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHiddden } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import AboutDropdown from '../about-dropdown/about-dropdown.component'
import ShopDropdown from '../shop-dropdown/shop-dropdown.component'

import './header.styles.scss'

const Header = ({ currentUser, hidden, toggleCartHidden }) => {
  const [shopActive, setShopActive] = useState(false)
  const [aboutActive, setAboutActive] = useState(false)

  const handleShopMouseEnter = () => {
    if (!hidden) {
      toggleCartHidden()
    }
    setShopActive(true)
  }

  const handleAboutMouseEnter = () => {
    if (!hidden) {
      toggleCartHidden()
    }
    setAboutActive(true)
  }

  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <div className={shopActive ? 'option-active option' : 'option'} onMouseEnter={handleShopMouseEnter} onMouseLeave={() => setShopActive(false)}>
          SHOP
          {shopActive ? <ShopDropdown /> : null}

        </div>
        <div className={aboutActive ? 'option-active option' : 'option'} onMouseEnter={handleAboutMouseEnter} onMouseLeave={() => setAboutActive(false)}>
          ABOUT US
          {aboutActive ? <AboutDropdown /> : null}
        </div>
        {currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
            <Link className='option' to='/signin'>
              SIGN IN
            </Link>
          )}
        <div>
          <CartIcon />
        </div>
        {hidden ? null : <CartDropdown />}
      </div>

    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHiddden
})

const mapDispatchToProps = disptach => ({
  toggleCartHidden: () => disptach(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)