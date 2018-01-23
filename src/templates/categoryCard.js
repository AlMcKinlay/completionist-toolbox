import React from 'react';
import { ListGroup, ListGroupItem, Card, CardHeader } from 'reactstrap';

export default ({name, entries}) => {
	return (
		<Card>
			<CardHeader>{name.charAt(0).toUpperCase()}{name.slice(1)}s</CardHeader>
			<ListGroup>
				{entries.map(({name, fields: {slug}}) =>
					<ListGroupItem tag="a" href={slug} key={slug}>
						{name.charAt(0).toUpperCase()}{name.slice(1)}
					</ListGroupItem>
				)}
			</ListGroup>
		</Card>
	);
}
