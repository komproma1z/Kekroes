import React from 'react';

import { Provider } from 'react-redux';
import configureStore, { history } from './redux/configureStore';

import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import HeroesBar from './components/HeroesBar';
import HeroPage from './components/HeroPage';
import KekroesFight from './components/KekroesFight';

const engine = new Styletron();
function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <StyletronProvider value={engine} debugAfterHydration>
        <ConnectedRouter history={history}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/arena">Arena</Link></li>
          </ul>
          <Switch>
            <Route exact path='/' render={() => <><HeroesBar /> <HeroPage /> </>} />
            <Route path='/arena' render={() => <KekroesFight />} />
          </Switch>
        </ConnectedRouter>
      </StyletronProvider>
    </Provider>
    
  );
}

export default App;
