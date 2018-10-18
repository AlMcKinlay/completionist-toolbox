import React from "react";
import { Card, CardTitle, Button,  ListGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Item } from "./item";

export class Section extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		}

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render() {
		console.log(`${this.props.name} rendered with state: ${this.props.state.entries}`);

		return (
			<Card body className="text-center">
				<CardTitle>{this.props.name}</CardTitle>
				
				<Button onClick={this.toggle}>Open</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>{this.props.name}</ModalHeader>
					<ModalBody>
						<ListGroup>
							{this.props.entries.map((entry) =>
								<div key={entry.value}>
									{this.props.state.entries.includes(entry.value) ?
									<Item name={entry.value} help={entry.help} clickItem={this.props.clickItem.bind(null, entry.value)} selected />
										:
									<Item name={entry.value} help={entry.help} clickItem={this.props.clickItem.bind(null, entry.value)} />
									}
								</div>
							)}
						</ListGroup>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.toggle}>Close</Button>
					</ModalFooter>
				</Modal>
			</Card>
		);
	}
}