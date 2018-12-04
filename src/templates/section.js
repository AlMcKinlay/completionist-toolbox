import React from "react";
import { CardTitle, Button,  ListGroup, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, } from 'reactstrap';
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

const NonLink = styled.a`
	padding: 0;
	color: ${props => props.theme.textColor()};
	&:hover {
		background-color: ${props => props.theme.background()};
	}
`;

const Grid = styled.div`
	display:grid;
	grid-auto-flow: row;
	grid-template-columns: repeat(3, 1fr);
	@media only screen  and (min-width : 992px) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

const StyledButton = styled(Button)`
	max-height: 2.5rem;
	margin: auto;
	grid-column: 3;
	@media only screen  and (min-width : 992px) {
		grid-column: 4;
	}
`;

const Menu = styled(DropdownToggle)`
	&:hover{
		background: ${props => props.theme.background()};
		border: ${props => props.theme.background()};
	}
	&:focus{
		box-shadow: none;
	}
	background: ${props => props.theme.background()};
	border: ${props => props.theme.background()};
	color: ${props => props.theme.textColor()}
	box-shadow: none;
	position: absolute;
    top: -40px;
    right: 0;
`;

const StyledDropdownMenu = styled(DropdownMenu)`
	background-color: ${props => props.theme.background()};
	border-color: rgba(255, 255, 255, 0.5);
`;

const StyledDropdownItem = styled(DropdownItem)`
	&:hover {
		background-color: ${props => props.theme.background()};
	}
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
		return this.getEntries().length;
	}
	
	completed() {
		return this.getEntries().filter((entry) => this.props.state.entries.includes(entry.value)).length;
	}

	getEntries() {
		return this.props.entries.filter((entry) => !entry.version || entry.version === this.props.version)
	}

	setUpInterval() {
		if (this.interval) {
			this.clearInterval();
		}
		console.log("Setting up interval");
		this.interval = setInterval(() => {
			this.checkIfWeNeedReset();
		}, 10000);
	}

	clearInterval() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	checkIfWeNeedReset() {
		console.log("Checking if the day has flipped");
			
		const now = new Date(Date.now());
		const updated = new Date(this.props.state.updated);
		if (this.props.reset === "daily" && updated.getDate() < now.getDate()) {
			console.log("The day has flipped, clearing section");
			this.props.clearSection();
		}
	}

	componentDidMount() {
		if (this.props.reset) {
			this.checkIfWeNeedReset();
			this.setUpInterval();
		}
	}

	componentWillUnmount() {
		this.clearInterval();
	}

	render() {
		return (this.getEntries().length > 0 ?
			<ThemedCard body className="text-center">
				<Title title={this.props.name}>{this.props.name}</Title>
				<UncontrolledDropdown>
					<Menu>&#x2807;</Menu>
					<StyledDropdownMenu right>
						<StyledDropdownItem onClick={this.props.hideSection}>
							<NonLink href="#">
								Hide
							</NonLink>
						</StyledDropdownItem>
					</StyledDropdownMenu>
				</UncontrolledDropdown>
				<Grid>
					<Completion total={this.total()} completed={this.completed()}></Completion>
					
					<StyledButton onClick={this.toggle}>View List</StyledButton>
				</Grid>
				<ThemedModal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ThemedModalHeader toggle={this.toggle}>{this.props.name}</ThemedModalHeader>
					<ThemedModalBody>
						<ListGroup>
							{this.getEntries().map((entry) =>
								<div key={entry.value}>
									<Item 
										name={entry.value} 
										help={entry.help} 
										clickItem={this.props.clickItem.bind(null, entry.value)} 
										selected={this.props.state.entries.includes(entry.value)}
										/>
								</div>
							)}
						</ListGroup>
					</ThemedModalBody>
					<ThemedModalFooter>
						<Button color="primary" onClick={this.toggle}>Close</Button>
					</ThemedModalFooter>
				</ThemedModal>
			</ThemedCard>
		: null);
	}
}