import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'

import createStore from './src/createStore';

export const wrapRootElement = ({ element }) => {
	const { store, persistor } = createStore();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{element}
			</PersistGate>
		</Provider>
	);
};
