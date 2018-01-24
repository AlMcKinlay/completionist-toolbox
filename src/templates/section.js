import React from "react";
import { Card, CardHeader, ListGroup } from 'reactstrap';
import { Item } from "./item";

export const Section = ({ name, entries, clickItem, state }) => {
	console.log(`${name} rendered with state: ${state.entries}`);
	return (
		<Card>
			<CardHeader>{name}</CardHeader>
			<ListGroup>
				{entries.map((entry) =>
					<div key={entry.value}>
						{state.entries.includes(entry.value) ?
						<Item name={entry.value} help={entry.help} clickItem={clickItem.bind(null, entry.value)} selected />
							:
						<Item name={entry.value} help={entry.help} clickItem={clickItem.bind(null, entry.value)} />
						}
					</div>
				)}
			</ListGroup>
		</Card>
	);
};