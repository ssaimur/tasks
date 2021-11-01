import { useGlobalContext } from './context';
import Register from './pages/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const { user } = useGlobalContext();
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            {user ? <Home /> : <Redirect to='/login' />}
          </Route>
          <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
          <Route path='/register'>
            {user ? <Redirect to='/' /> : <Register />}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
