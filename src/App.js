import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'

import HomePage from './components/pages/homepage/homepage.component'
import ShopPage from './components/pages/shop-page/shop-page.component'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  )
}

export default App
