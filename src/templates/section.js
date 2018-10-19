import React from "react";
import { Card, CardTitle, Button,  ListGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Item } from "./item";
import { Completion } from "./completion";
import styled from "styled-components";

const Title = styled(CardTitle)`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const Grid = styled.div`
	display:grid;
	grid-auto-flow: row;
	grid-template-columns: repeat(4, 1fr);
`;

const StyledButton = styled(Button)`
	margin-top: 15px;
	margin-bottom: 15px;
	grid-column: 4;
`;

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
	
	total() {
		return this.props.entries.length;
	}
	
	completed() {
		return this.props.state.entries.length;
	}

	render() {
		console.log(`${this.props.name} rendered with state: ${this.props.state.entries}`);

		return (
			<Card body className="text-center">
				<Title title={this.props.name}>{this.props.name}</Title>
				<Grid>
					<Completion total={this.total()} completed={this.completed()}></Completion>
					
					<StyledButton onClick={this.toggle}>Open</StyledButton>
				</Grid>
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