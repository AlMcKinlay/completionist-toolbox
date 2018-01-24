import { createStore } from 'redux'

function reducerDoesThing({lists}, {type: action, listName, sectionName, entryName}) {
	let newState = {lists: {}};
	if (action === "SET_ITEM_STATE") {
		newState = {
			lists: {
				...lists,
				[listName]: {
					sections: {
						...(lists[listName] ? lists[listName].sections : {}),
						[sectionName] : {
							...(lists[listName] && lists[listName].sections[sectionName] ? lists[listName].sections[sectionName] : {entries: []})
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
	}

	return newState;
}

const initialState = {
	lists: {
	}
};

export default () => createStore(reducerDoesThing, initialState);
