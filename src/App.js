import React from 'react';

import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

import HeroesBar from './components/HeroesBar';
import HeroPage from './components/HeroPage';
import KekroesFight from './components/KekroesFight';


const engine = new Styletron();
function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <StyletronProvider value={engine} debugAfterHydration>
        <HeroesBar />
        <HeroPage />
        <KekroesFight />
      </StyletronProvider>
    </Provider>
    
  );
}

export default App;
