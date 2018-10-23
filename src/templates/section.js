import React from "react";
import { CardTitle, Button,  ListGroup } from 'reactstrap';
import { Item } from "./item";
import { Completion } from "./completion";
import styled from "styled-components";
import { ThemedCard } from "../components/ThemedCard";
import { ThemedModal, ThemedModalBody, ThemedModalFooter, ThemedModalHeader } from "../components/ThemedModal";

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
			<ThemedCard body className="text-center">
				<Title title={this.props.name}>{this.props.name}</Title>
				<Grid>
					<Completion total={this.total()} completed={this.completed()}></Completion>
					
					<StyledButton onClick={this.toggle}>View List</StyledButton>
				</Grid>
				<ThemedModal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ThemedModalHeader toggle={this.toggle}>{this.props.name}</ThemedModalHeader>
					<ThemedModalBody>
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
					</ThemedModalBody>
					<ThemedModalFooter>
						<Button color="primary" onClick={this.toggle}>Close</Button>
					</ThemedModalFooter>
				</ThemedModal>
			</ThemedCard>
		);
	}
}