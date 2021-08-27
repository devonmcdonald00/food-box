import logo from './logo.svg';
import './App.css';
import SignInPage from './pages/SignInPage';
import Appbar from './components/Appbar';
import RegisterPage from './pages/RegisterPage';
import FoodboxPage from './pages/FoodboxPage';
import AdminPage from './pages/AdminPage';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProductEditPage from './pages/ProductEditPage';
import { useState, useEffect } from 'react'
import CartPage from './pages/CartPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSummaryPage from './pages/OrderSummaryPage';

const stripePromise = loadStripe('pk_test_51HeXZCBHhe5b3zt2oVYEtSM8hHm6wnEhfjDVNdxiGOYQejWYs3UK3ZAYpNdZRQFZ50Fmp6pfyfOQJgyDxyal9Ts000FivUv3Re')


function App() {
  document.body.style = 'background: #f3f3f2';
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    if(localStorage.getItem('cart') !== null){
      let total = 0;
      for(var key in JSON.parse(localStorage.getItem('cart'))){
        total += JSON.parse(localStorage.getItem('cart'))[key]['quantity']
      }
      setCartCounter(total)
      console.log(cartCounter)
    }
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Appbar cartCounter={cartCounter}/>
            <SignInPage/>
          </Route>
          <Route exact path='/register'>
            <Appbar cartCounter={cartCounter}/>
            <RegisterPage/>
          </Route>
          <Route exact path='/food-box-home'>
            <Appbar cartCounter={cartCounter}/>
            <FoodboxPage setCartCounter={setCartCounter} cartCounter={cartCounter}/>
          </Route>
          <Route exact path='/admin'>
            <Appbar cartCounter={cartCounter}/>
            <AdminPage/>
          </Route>
          <Route exact path='/product-edit'>
            <Appbar cartCounter={cartCounter}/>
            <ProductEditPage/>
          </Route>
          <Route exact path='/cart'>
            <Appbar cartCounter={cartCounter}/>
            <Elements stripe={stripePromise}>
              <CartPage setCartCounter={setCartCounter}/>
            </Elements>
          </Route>
          <Route exact path='/order-summary'>
            <Appbar cartCounter={cartCounter}/>
            <OrderSummaryPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
