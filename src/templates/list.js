import React from "react";
import { Row } from 'reactstrap';
import { Section } from "./section";
import styled from "styled-components";
import { connect } from "react-redux"
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import { Completion } from "./completion";

const ListSection = styled.div`
	display: block !important;
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
	grid-template-columns: 10fr 1fr;
	width:100%;
`;

const CompletionLast = styled.div`
	margin-top: 15px;
	margin-bottom: 15px;
	width:5rem;
`;

const Title = styled.h2`
	margin-top: 1.5rem;
`;

const mapStateToProps = ({ lists }, {listName, name, entries}) => {
	const list = lists[listName];
	const section = (list && list.sections[name]) ? list.sections[name] : {entries: []};

	return {
		name,
		entries,
		state: section
	}
};

const mapDispatchToProps = (dispatch, {listName, name}) => {
	return {
		clickItem: (entryName) => dispatch({ type: `SET_ITEM_STATE`, listName, sectionName: name, entryName })
	}
};

const ConnectedSection = connect(mapStateToProps, mapDispatchToProps)(Section);

const getCompletionState = ({ lists }, {name}) => {
	const list = lists[name];
	const completed = list ? Object.values(list.sections).reduce((total, section) => total + section.entries.length, 0) : 0;
	return {
		completed: completed
	}
};

const ConnectedCompletion = connect(getCompletionState)(Completion);

class SectionList extends React.Component {

	constructor(props) {
		super(props);
		this.total = this.total.bind(this);

		this.state = {
			entries: props.entries,
			post: props.data.listsHJson
		}
	}

	total() {
		return Object.values(this.state.post.sections).reduce((total, section) => total + section.entries.length, 0);
	}

	render() {
		return (
			<Layout>
			<div>
				<Row>
					<Grid>
						<Title>{this.state.post.name}</Title>
						<CompletionLast><ConnectedCompletion name={this.state.post.name} total={this.total()}></ConnectedCompletion></CompletionLast>
					</Grid>
				</Row>
				<List>
					{this.state.post.sections.map((section) =>
						<ListSection key={section.name}>
							<ConnectedSection listName={this.state.post.name} name={section.name} entries={section.entries} />
						</ListSection>
					)}
				</List>
			</div>
			</Layout>
		);
	}
}

const getState = ({ lists }, {data: {listsHJson: {name}}}) => {
	return {
		entries: lists[name]
	}
};

export default connect(getState)(SectionList);

export const query = graphql`
  query EntryQuery($slug: String!) {
		listsHJson(fields: { slug: { eq: $slug } }) {
			name,
			sections {
				name,
				entries {
					value,
					help
				}
			}
		}
	}
`;