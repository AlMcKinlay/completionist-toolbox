import React from 'react';
import { ListGroup, ListGroupItem, Card, CardHeader } from 'reactstrap';
import Link from "gatsby-link";

export default ({name, entries}) => {
	return (
		<Card>
			<CardHeader>{name.charAt(0).toUpperCase()}{name.slice(1)}s</CardHeader>
			<ListGroup>
				{entries.map(({name, fields: {slug}}) =>
					<ListGroupItem key={slug}>
						<Link to={slug}>
							{name.charAt(0).toUpperCase()}{name.slice(1)}
						</Link>
					</ListGroupItem>
				)}
			</ListGroup>
		</Card>
	);
}
