import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default ({pathContext: {category}, data: {allListsHJson: {edges: entries}}}) => {
	return (
		<div className="row">
			<div className="col">
				<h2>{category.charAt(0).toUpperCase()}{category.slice(1)}s</h2>
				<ListGroup>
					{entries.map(({node: {name, fields: {slug}}}) =>
						<ListGroupItem tag="a" href={slug} key={slug}>
							{name.charAt(0).toUpperCase()}{name.slice(1)}
						</ListGroupItem>
					)}
				</ListGroup>
			</div>
		</div>
	);
}

export const query = graphql`
	query CategoryQuery($category: String!){
		allListsHJson(filter:{category: {eq: $category}}) {
      edges {
        node {
          name,
          fields {
            slug
          }
        }
      }
		}
	}
`;