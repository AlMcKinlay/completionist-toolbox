import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'

import createStore from './src/state/createStore';

exports.replaceRouterComponent = ({ history }) => {

	const { store, persistor } = createStore();

	return ({children}) => (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router history={history}>{children}</Router>
			</PersistGate>
		</Provider>
	);
};