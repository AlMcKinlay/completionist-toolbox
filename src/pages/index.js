import React from 'react'
import Layout from "../components/layout"
import Lists from "../templates/lists";
import { graphql } from 'gatsby';

const IndexPage = (data) => (
	<Layout>
	<div className="row">
		<div className="col">
			<h2>Lists</h2>
			<p>Welcome to the completionist toolbox. A place to help you in your constant need to complete things.</p>
		</div>
	</div>
	<Lists data={data.data}></Lists>
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