import React from 'react';
import { Row, Col } from 'reactstrap';
import Category from '../templates/categoryCard';

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
		<div className="row">
			<div className="col">
				<h2>Lists</h2>
				<Row>
					{categories.map((category) =>
						<Col key={category.name}>
							<Category name={category.name} entries={category.entries} />
						</Col>
					)}
				</Row>
			</div>
		</div>
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