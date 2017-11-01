import React from 'react';
import { Provider } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import store from '../store';
import Dashboard from './Dashboard';
import Menu from './Menu';

export default function App() {
  return (<Provider store={store}>
    <Grid>
      <Grid.Column width="three">
        <Menu />
      </Grid.Column>
      <Grid.Column width="ten">
        <Dashboard />
      </Grid.Column>
    </Grid>
  </Provider>);
}
