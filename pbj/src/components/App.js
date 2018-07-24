import React from 'react';

import View from './View';

import prices from '../customizationData/prices.json';
import options from '../customizationData/options.json';
import { version } from '../../package.json';

class App extends React.Component {
  render() {
    return <View options={options} prices={prices} version={version} />;
  }
}

export default App;
