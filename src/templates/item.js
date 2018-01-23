import React from "react";
import { ListGroupItem } from 'reactstrap';

export const Item = ({ name, help }) => {
	return (
		<ListGroupItem>
			{name}
		</ListGroupItem>
	);
};