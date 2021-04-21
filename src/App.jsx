import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader';
import { Game } from './views/Game';
import { Rooms } from './views/Rooms';
import { HomePage } from './views/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import { getUser } from './store/actions/userActions';
import { getGames } from './store/actions/gameActions';
import { socketService } from './services/socket.service';



export function App() {

  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser())
    dispatch(getGames())
    socketService.setup();
    socketService.on('update games', () => dispatch(getGames()))
    return () => socketService.terminate();
    // eslint-disable-next-line
  }, [])

  const PrivateRoute = (props) => {
    return props.user ? <Route {...props} /> : <Redirect to="/" />
  }

  return (
    <div className="main-app">
      <Router>
        <AppHeader />
        <Switch>
          <PrivateRoute user={user} path="/game/:id" component={Game}></PrivateRoute>
          <PrivateRoute user={user} path="/rooms" component={Rooms}></PrivateRoute>
          <Route path="/" component={HomePage}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
