import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default ({pathContext: {categories}}) => {
	return (
		<div className="row">
			<div className="col">
				<h2>Lists</h2>
				<ListGroup>
					{categories.map((category) =>
						<ListGroupItem tag="a" href={`/lists/${category}`} key={category}>
							{category.charAt(0).toUpperCase()}{category.slice(1)}s
						</ListGroupItem>
					)}
				</ListGroup>
			</div>
		</div>
	);
}