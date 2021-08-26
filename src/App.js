import logo from './logo.svg';
import './App.css';
import SignInPage from './pages/SignInPage';
import Appbar from './components/Appbar';
import RegisterPage from './pages/RegisterPage';
import FoodboxPage from './pages/FoodboxPage';
import AdminPage from './pages/AdminPage';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProductEditPage from './pages/ProductEditPage';

function App() {
  document.body.style = 'background: #f3f3f2';
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Appbar/>
            <SignInPage/>
          </Route>
          <Route exact path='/register'>
            <Appbar/>
            <RegisterPage/>
          </Route>
          <Route exact path='/food-box-home'>
            <Appbar/>
            <FoodboxPage/>
          </Route>
          <Route exact path='/admin'>
            <Appbar/>
            <AdminPage/>
          </Route>
          <Route exact path='/product-edit'>
            <Appbar/>
            <ProductEditPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
