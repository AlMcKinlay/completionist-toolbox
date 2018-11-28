import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { KEY_PREFIX, REHYDRATE } from 'redux-persist'

function reducerDoesThing(state, {type: action, listName, sectionName, entryName, version}) {
	let { lists } = state;
	let newState = {lists: {}};
	if (action === "SET_ITEM_STATE") {
		newState = {
			lists: {
				...lists,
				[listName]: {
					...lists[listName],
					sections: {
						...(lists[listName] ? lists[listName].sections : {}),
						[sectionName] : {
							...(lists[listName] && lists[listName].sections && lists[listName].sections[sectionName] ? lists[listName].sections[sectionName] : {entries: []})
						}
					}
				}
			}
		};
		const newEntries = newState.lists[listName].sections[sectionName].entries.slice();
		if (newEntries.includes(entryName)) {
			newEntries.splice(newEntries.indexOf(entryName), 1);
		} else {
			newEntries.push(entryName);
		}
		newState.lists[listName].sections[sectionName].entries = newEntries;
	} else if (action === "SET_LIST_VERSION") {
		newState = {
			lists: {
				...lists,
				[listName]: {
					...lists[listName],
					version
				}
			}
		}
	} else {
		return state;
	}

	return newState;
}

const initialState = {
	lists: {
	}
};

const persistConfig = {
	key: 'root',
	storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducerDoesThing);

const setUpCrossTab = (store) => {
	if (typeof window === "undefined" || window) {
		return;
	}
	window.addEventListener("storage", handleStorageEvent, false);

	function handleStorageEvent(e){
		if(e.key && e.key.indexOf(KEY_PREFIX) === 0){

			if (e.oldValue === e.newValue) {
				return;
			}

			const state = JSON.parse(e.newValue);
			Object.keys(state).forEach((key) => state[key] = JSON.parse(state[key]));

			store.dispatch({
				key: persistConfig.key,
				payload: state,
				type: REHYDRATE,
			});
		}
	}
};

export default () => {
	const store = createStore(persistedReducer, initialState);
	const persistor = persistStore(store);
	setUpCrossTab(store);
	return { store, persistor };
}
