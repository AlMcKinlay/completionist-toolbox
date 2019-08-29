import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { KEY_PREFIX, REHYDRATE } from 'redux-persist'
import List from './list/listState';
import Section from './section/sectionState';

const initialState = {
	lists: {}
};

function reducerDoesThing(state, {type: action, listName, sectionName, entryName, version}) {
	let { lists } = state;
	let newState = {...initialState};
	const oldList = lists && lists[listName] && lists[listName];
	const newList = new List(oldList);
	
	if (action === "SET_ITEM_STATE") {
		const oldSection = newList.sections[sectionName];
		const newSection = new Section(oldSection);
		newList.sections[sectionName] = newSection;
		newState = {
			lists: {
				...lists,
				[listName]: newList
			}
		};
		if (newSection.entries.includes(entryName)) {
			newSection.entries.splice(newSection.entries.indexOf(entryName), 1);
		} else {
			newSection.entries.push(entryName);
		}
		newSection.updated = Date.now()
	} else if (action === "CLEAR_SECTION") {
		const oldSection = newList.sections[sectionName];
		const newSection = new Section(oldSection);
		newList.sections[sectionName] = newSection;
		newState = {
			lists: {
				...lists,
				[listName]: newList
			}
		};
		newSection.entries = [];
		newSection.updated = Date.now();
	} else if (action === "HIDE_SECTION") {
		const oldSection = newList.sections[sectionName];
		const newSection = new Section(oldSection);
		newSection.hidden = true;
		newList.sections[sectionName] = newSection;
		newState = {
			lists: {
				...lists,
				[listName]: newList
			}
		};
	} else if (action === "SHOW_ALL_SECTIONS") {
		const newSections = {};
		Object.entries(newList.sections)
			.forEach(([key, section]) => {
				newSections[key] = new Section(section);
				newSections[key].hidden = false
			});
		newList.sections = newSections;
		newState = {
			lists: {
				...lists,
				[listName]: newList
			}
		};
	} else if (action === "SET_LIST_VERSION") {
		newList.version = version;
		newState = {
			lists: {
				...lists,
				[listName]: newList
			}
		}
	} else if (action === "ADD_LIST") {
		newList.visible = true;
		newState = {
			lists: {
				...lists,
				[listName]: newList
			}
		}
	} else if (action === "HIDE_LIST") {
		console.log("HIDE_LIST");
		console.log(listName);
		newList.visible = false;
		newState = {
			lists: {
				...lists,
				[listName]: newList
			}
		}
	} else {
		return state;
	}

	return newState;
}

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
	const store = createStore(persistedReducer, {...initialState});
	const persistor = persistStore(store);
	setUpCrossTab(store);
	return { store, persistor };
}
