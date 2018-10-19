import React from 'react';
import Category from '../templates/categoryCard';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import styled from "styled-components";

const CategorySection = styled.div`
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
`;

export default ({data: {allListsHJson: {edges: entries}}}) => {
	
	const categoryNames = [];
	const categories = entries.map(({node: {category}}) => ({name: category, entries: []}))
		.filter(({name}) => {
			return !categoryNames.includes(name) && categoryNames.push(name);
	});
	categories.forEach((category) => {
		entries.forEach(({node: entry}) => {
			if (category.name === entry.category) {
				category.entries.push(entry);
			}
		});
	});
	return (
		<Layout>
				<h2>Lists</h2>
				<List>
					{categories.map((category) =>
						<CategorySection>
							<Category name={category.name} entries={category.entries} />
						</CategorySection>
					)}
				</List>
		</Layout>
	);
}

export const query = graphql`
	query GetAllCategories {
		allListsHJson {
			edges {
				node {
					category,
					name,
					fields {
						slug
					}
				}
			}
		}
	}
`;