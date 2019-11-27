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
	grid-template-columns: 30fr 1fr 1fr 1fr;
	width:100%;
`;

const CompletionLast = styled.div`
	margin-top: 15px;
	margin-bottom: 15px;
	width:5rem;
	grid-column: 4;
`;

const Title = styled.h2`
	margin-top: auto;
    margin-bottom: auto;
`;

const mapStateToProps = ({ lists }, {listName, name, entries, defaultVersion, reset}) => {
	const list = lists[listName];
	const section = (list && list.sections && list.sections[name]) ? list.sections[name] : {entries: []};
	const version = (list && list.version) ? list.version : defaultVersion;

	return {
		name,
		version,
		reset,
		entries,
		state: section
	}
};

const mapDispatchToProps = (dispatch, {listName, name}) => {
	return {
		clickItem: (entryName) => dispatch({ type: `SET_ITEM_STATE`, listName, sectionName: name, entryName }),
		switchVersion: (version) => dispatch({ type: `SET_LIST_VERSION`, listName, version}),
		clearSection: () => dispatch({ type: `CLEAR_SECTION`, listName, sectionName: name }),
		hideSection: () => dispatch({ type: `HIDE_SECTION`, listName, sectionName: name }),
	}
};

const ConnectedSection = connect(mapStateToProps, mapDispatchToProps)(Section);

const getCompletionState = ({ lists }, { list, defaultVersion }) => {
	const listState = lists[list.name];
	const version = listState && listState.version ? listState.version : defaultVersion;
	const sections = listState ? listState.sections : [];
	const completed = list && list.sections ? Object.values(list.sections).reduce((total, section) => {
		const sectionState = sections && sections[section.name];
		if ((sectionState && sectionState.hidden) || !sectionState) {
			return total;
		} else {
			return total + section.entries.filter((entry) => sectionState.entries.includes(entry.value) && (!entry.version || entry.version === version)).length
		}
	}, 0) : 0;
	const total = list && list.sections ? Object.values(list.sections).reduce((total, section) => {
		const sectionState = sections[section.name];
		if (sectionState && sectionState.hidden) {
			return total;
		} else {
			return total + section.entries.filter((entry) => !entry.version || entry.version === version).length
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

const getVisibility = ({lists}, {listName, sectionName}) => {
	const list = lists[listName];
	const section = list && list.sections && list.sections[sectionName];
	const hidden = section ? section.hidden : false;
	return { 
		hidden
	}
}

const ConnectedListSection = connect(getVisibility)(ListSection);

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
			const socket = new WebSocket(`${protocol}://${location}`);
			socket.onmessage = (event) => {
				const message = JSON.parse(event.data);
				switch(message.event) {
					case "registered":
						props.setId(message.id);
						break;
					case "init":
						// TODO: Check to see if the data is newer or older
						if (message.data) {
							props.setAllData(message.data);
						} else {
							socket.send(JSON.stringify({command: "set", data: props.listState}));
						}
						break;
					case "listUpdate":
						props.setAllData(message.data);
						break;
					default:
						break;
				}
			};
			subscribe(`lists.${list.name}`, (state) => {
				if (state.lists[list.name].server) {
					return;
				}
				socket.send(JSON.stringify({command: "set", data: state.lists[list.name]}));
			});
			socket.onopen = () => socket.send(JSON.stringify({command: "register", data: {id}}));
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
			sections {
				name,
				reset,
				entries {
					value,
					help,
					version,
					display
				}
			}
		}
	}
`;