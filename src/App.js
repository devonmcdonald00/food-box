import logo from './logo.svg';
import './App.css';
import SignInPage from './pages/SignInPage';
import Appbar from './components/Appbar';
import RegisterPage from './pages/RegisterPage';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  document.body.style = 'background: #f3f3f2';
  return (
    <div className="App">
      <Appbar/>
      <Router>
        <Switch>
          <Route exact path='/'>
            <SignInPage/>
          </Route>
          <Route exact path='/register'>
            <RegisterPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
