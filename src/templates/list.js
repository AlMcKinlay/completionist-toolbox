import React from "react";
import { Row, Col } from 'reactstrap';
import { Section } from "./section";
import styled from "styled-components";
import { connect } from "react-redux"
import { graphql } from 'gatsby';
import Layout from "../components/layout"

const ListSection = styled.div`
	display: block !important;
	break-inside: avoid;
	padding: 10px;
`;

const List = styled.div`
	display: grid;
	grid-auto-flow: row;
	
	@media only screen  and (min-width : 480px) {
		grid-template-columns: repeat(2, 50%);
	}
	
	@media only screen  and (min-width : 768px) {
		grid-template-columns: repeat(3, 33%);
	}
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

export default ({ data }) => {
	const post = data.listsHJson;
	return (
		<Layout>
		<div>
			<Row>
				<Col>
					<h2>{post.name}</h2>
				</Col>
			</Row>
			<List>
				{post.sections.map((section) =>
					<ListSection key={section.name}>
						<ConnectedSection listName={post.name} name={section.name} entries={section.entries} />
					</ListSection>
				)}
			</List>
		</div>
		</Layout>
	);
};

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