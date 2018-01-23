import React from "react";
import { ListGroupItem } from 'reactstrap';
import { Icon } from "react-font-awesome-5";

export class Item extends React.Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			selected: false
		}
	}

	toggle() {
		this.setState({
			selected: !this.state.selected
		})
	}

	render() {
		return (
			<ListGroupItem onClick={this.toggle}>
				{this.state.selected ? <Icon.CheckSquare.regular /> : <Icon.Square.regular />}
				{this.props.name}
			</ListGroupItem>
		);
	}
}