import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'

import HomePage from './components/pages/homepage/homepage.component'
import ShopPage from './components/pages/shop-page/shop-page.component'
import Header from './components/header/header.component'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  )
}

export default App
