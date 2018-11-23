import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import styled from "styled-components";
import { ListCard } from "../templates/listCard";

const ListSection = styled.div`
	display: block !important;
	break-inside: avoid;
	padding: 10px;
`;

const Title = styled.h2`
	margin-top: 3rem;
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

const getTotalItems = (sections) => sections.reduce((total, section) => total + section.entries.length, 0);

export default ({data: {allListsHJson: {edges: entries}}}) => {
	
	return (
		<Layout>
				<Title>Lists</Title>
				<List>
					{entries.map(({node: entry}) =>
						<ListSection key={entry.name}>
							<ListCard name={entry.name} slug={entry.fields.slug} total={getTotalItems(entry.sections)} />
						</ListSection>
					)}
				</List>
		</Layout>
	);
}

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