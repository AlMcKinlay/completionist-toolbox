import React from "react";
import { Row } from 'reactstrap';
import {subscribe} from 'redux-subscriber';
import { Section } from "../section/sectionCard";
import styled from "styled-components";
import { connect } from "react-redux"
import { graphql } from 'gatsby';
import Layout from "../layout"
import { Completion } from "../components/completion";
import { VersionSwitch } from "../components/versionSwitch";
import { DLCSwitch } from "../components/dlcSwitch";
import Dropdown, { DropdownEl } from "../components/dropdown";

const ListSection = styled.div`
	display: ${props => props.hidden ? "none" : "block"};
	&:empty {
		display: none;
	}
	break-inside: avoid;
	padding: 10px;
`;

const List = styled.div`
	display: grid;
	grid-auto-flow: row;
	
	@media only screen  and (min-width : 768px) {
		grid-template-columns: repeat(2, 50%);
	}
	
	@media only screen  and (min-width : 992px) {
		grid-template-columns: repeat(3, 33%);
	}
`;

const Grid = styled.div`
	display:grid;
	grid-auto-flow: row;
	grid-template-columns: 30fr 1fr 2fr 1fr 1fr;
	width:100%;
`;

const CompletionLast = styled.div`
	margin-top: 15px;
	margin-bottom: 15px;
	width:5rem;
	grid-column: 5;
`;

const Title = styled.h2`
	margin-top: auto;
    margin-bottom: auto;
`;

const mapStateToProps = ({ lists }, {listName, name, entries, defaultVersion, reset}) => {
	const list = lists[listName];
	const section = (list && list.sections && list.sections[name]) ? list.sections[name] : {entries: []};
	const version = (list && list.version) ? list.version : defaultVersion;
	const dlcEnabled = list ? list.dlc : true;

	return {
		name,
		version,
		dlcEnabled,
		reset,
		entries,
		state: section
	}
};

const mapDispatchToProps = (dispatch, {listName, name}) => {
	return {
		clickItem: (entryName) => dispatch({ type: `SET_ITEM_STATE`, listName, sectionName: name, entryName }),
		switchVersion: (version) => dispatch({ type: `SET_LIST_VERSION`, listName, version}),
		toggleDLC: () => dispatch({ type: `TOGGLE_DLC`, listName}),
		clearSection: () => dispatch({ type: `CLEAR_SECTION`, listName, sectionName: name }),
		hideSection: () => dispatch({ type: `HIDE_SECTION`, listName, sectionName: name }),
		completeSection: (sectionData) => dispatch({ type: `COMPLETE_SECTION`, listName, sectionName: name, sectionData }),
	}
};

const ConnectedSection = connect(mapStateToProps, mapDispatchToProps)(Section);

const entryCounts = (entry, version, dlcEnabled) => entryCountsVersion(entry, version) && entryCountsDLC(entry, dlcEnabled)
const entryCountsVersion = (entry, version) => !entry.version || entry.version === version
const entryCountsDLC = (entry, dlcEnabled) => !entry.isDLC || dlcEnabled;

const getCompletionState = ({ lists }, { list, defaultVersion }) => {
	const listState = lists[list.name];
	const version = listState && listState.version ? listState.version : defaultVersion;
	const dlcEnabled = listState ? listState.dlc : true;
	const sections = listState ? listState.sections : [];
	const completed = list && list.sections ? Object.values(list.sections).reduce((total, section) => {
		const sectionState = sections && sections[section.name];
		if ((sectionState && sectionState.hidden) || !sectionState) {
			return total;
		} else {
			return total + section.entries.filter((entry) => entryCounts(entry, version, dlcEnabled) && sectionState.entries.includes(entry.value)).length;
		}
	}, 0) : 0;
	const total = list && list.sections ? Object.values(list.sections).reduce((total, section) => {
		const sectionState = sections[section.name];
		if (sectionState && sectionState.hidden) {
			return total;
		} else {
			return total + section.entries.filter((entry) => entryCounts(entry, version, dlcEnabled)).length
		}
	}, 0) : 0;
	return {
		completed,
		total
	}
};

const ConnectedCompletion = connect(getCompletionState)(Completion);

const getVersion = ({lists}, {listName, defaultVersion}) => {
	const list = lists[listName];
	const version = list && list.version ? list.version : defaultVersion;
	return {
		version
	}
}

const ConnectedVersionSwitch = connect(getVersion, mapDispatchToProps)(VersionSwitch);

const isDlcEnabled = ({lists}, {listName}) => {
	const list = lists[listName];
	const dlcEnabled = list ? list.dlc : true;
	return {
		dlcEnabled
	}
}

const ConnectedDLCSwitch = connect(isDlcEnabled, mapDispatchToProps)(DLCSwitch);

const getVisibility = ({lists}, {listName, sectionName}) => {
	const list = lists[listName];
	const section = list && list.sections && list.sections[sectionName];
	const hidden = section ? section.hidden : false;
	return { 
		hidden
	}
}

const ConnectedListSection = connect(getVisibility)(ListSection);

function start(websocketServerLocation, id, setSocket, props){
	const ws = new WebSocket(websocketServerLocation);
    ws.onclose = function(){
        setTimeout(() => start(websocketServerLocation, id, setSocket, props), 1000);
	};
	ws.onopen = () => ws.send(JSON.stringify({command: "register", data: {id}}));
	ws.onmessage = (event) => {
		const message = JSON.parse(event.data);
		switch(message.event) {
			case "registered":
				props.setId(message.id);
				break;
			case "init":
				if (message.data && (props.listState.saved || (props.listState.time ? message.data.time > props.listState.time : message.data.time))) { 
					props.setAllData(message.data);
				} else {
					ws.send(JSON.stringify({command: "set", data: props.listState}));
				}
				break;
			case "listUpdate":
				props.setAllData(message.data);
				break;
			default:
				break;
		}
	};
	setSocket(ws);
}

class SectionList extends React.Component {

	constructor(props) {
		super(props);
		const list = props.data.listsHJson;
		this.defaultVersion = list && list.versions ? list.versions[0] : undefined;
		
		const urlId = typeof window !== "undefined" && window.location.hash && window.location.hash.includes("id") && window.location.hash.slice(1).split("=")[1];
		const id = urlId || (props.listState && props.listState.id);

		if (typeof WebSocket !== "undefined" && WebSocket) {
			const protocol = window.location.protocol.startsWith("https") ? "wss" : "ws";
			const location = window.location.hostname.includes("toolbox.yamanickill.com") ? `${window.location.hostname}/ws` : `${window.location.hostname}:3000`;
			let socket = "test";
			start(`${protocol}://${location}`, id, (newSocket) => socket = newSocket, props);

			subscribe(`lists.${list.name}`, (state) => {
				if (state.lists[list.name].server || state.lists[list.name].saved) {
					return;
				}
				if (socket.readyState === socket.OPEN) {
					socket.send(JSON.stringify({command: "set", data: state.lists[list.name]}));
					props.setSaved();
				}
			});
		}

		this.state = {
			post: list
		}
	}

	render() {
		return (
			<Layout>
			<div>
				<Row>
					<Grid>
						<Title>{this.state.post.name}</Title>
						{
							this.state.post.dlcAvailable && (
								<ConnectedDLCSwitch listName={this.state.post.name}>
								</ConnectedDLCSwitch>
							)
						}
						{
							this.state.post.versions && (
								<ConnectedVersionSwitch 
									options={this.state.post.versions} 
									listName={this.state.post.name} 
									defaultVersion={this.defaultVersion}>
								</ConnectedVersionSwitch>
							)
						}

						<Dropdown positioned={"normal"}>
							<DropdownEl action={this.props.showAllSections}>
							Show Hidden Sections
							</DropdownEl>
						</Dropdown>
						<CompletionLast><ConnectedCompletion list={this.state.post}></ConnectedCompletion></CompletionLast>
					</Grid>
				</Row>
				<List>
					{this.state.post.sections.map((section) => (
						<ConnectedListSection key={section.name}
							listName={this.state.post.name}
							sectionName={section.name}>
							<ConnectedSection 
								listName={this.state.post.name} 
								name={section.name} 
								entries={section.entries}
								reset={section.reset}
								defaultVersion={this.defaultVersion} />
						</ConnectedListSection>
					))}
				</List>
			</div>
			</Layout>
		);
	}
}

const listDispatchProps = (dispatch, {data: {listsHJson: {name}}}) => {
	return {
		showAllSections: () => dispatch({ type: `SHOW_ALL_SECTIONS`, listName: name }),
		setAllData: (data) => dispatch({ type: `SET_ALL_DATA`, listName: name, data }),
		setId: (id) => dispatch({ type: `SET_ID`, listName: name, id }),
		setSaved: () => dispatch({ type: `SET_SAVED`, listName: name }),
	}
};

const getState = ({ lists }, {data: {listsHJson: {name}}}) => {
	return {
		listState: lists[name]
	}
};

export default connect(getState, listDispatchProps)(SectionList);

export const query = graphql`
  query EntryQuery($slug: String!) {
		listsHJson(fields: { slug: { eq: $slug } }) {
			name,
			versions,
			dlcAvailable,
			sections {
				name,
				reset,
				entries {
					value,
					help,
					version,
					isDLC,
					display
				}
			}
		}
	}
`;