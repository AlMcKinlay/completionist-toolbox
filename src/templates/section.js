import React from "react";
import { Card, CardHeader, ListGroup } from 'reactstrap';
import { Item } from "./item";

export const Section = ({ name, entries }) => {
	return (
		<Card>
			<CardHeader>{name}</CardHeader>
			<ListGroup>
				{entries.map((entry) =>
					<div key={entry.value}>
						<Item name={entry.value} help={entry.help} />
					</div>
				)}
			</ListGroup>
		</Card>
	);
};