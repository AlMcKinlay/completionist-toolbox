import React from 'react'
import Layout from "../layout"
import Lists from "../list/lists";
import { graphql } from 'gatsby';
import { connect } from "react-redux"

const mapStateToProps = ({ lists }, {data: {allListsHJson: {edges: entries}}}) => {
	return {
		unusedLists: entries.filter((entry) => !lists[entry.node.name] || lists[entry.node.name].visible === false),
		lists: entries.filter((entry) => lists[entry.node.name] && lists[entry.node.name].visible !== false)
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		addList: (list) => dispatch({ type: `ADD_LIST`, listName: list.name }),
		hideList: (list) => dispatch({ type: `HIDE_LIST`, listName: list.name })
	}
};

const ConnectedLists = connect(mapStateToProps, mapDispatchToProps)(Lists);

const IndexPage = (data) => (
	<Layout>
	<div className="row">
		<div className="col">
			<h2>Lists</h2>
			<p>Welcome to the completionist toolbox. A place to help you in your constant need to complete things.</p>
		</div>
	</div>
	<ConnectedLists data={data.data}></ConnectedLists>
	</Layout>
);

export default IndexPage;

export const query = graphql`
	query GetAllLists {
		allListsHJson {
			edges {
				node {
					name,
					sections {
						entries{
							value
						}
					},
					fields {
						slug
					}
				}
			}
		}
	}
`;