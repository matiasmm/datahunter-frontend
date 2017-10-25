import React from 'react';
import { Provider } from 'react-redux';
import store from '../store.js';
import Dashboard from './Dashboard.jsx';
import Menu from './Menu';
import { Grid } from 'semantic-ui-react';

export default function App() {
    return <Provider store={store}>
        <Grid>
            <Grid.Column width="three">
                <Menu/>
            </Grid.Column>
            <Grid.Column width="ten">
                <Dashboard/>
            </Grid.Column>
        </Grid>
    </Provider>
}