import React from "react";
import { CardTitle, Button,  ListGroup } from 'reactstrap';
import { Item } from "../components/item";
import { Completion } from "../components/completion";
import Dropdown, { DropdownEl } from "../components/dropdown";
import styled from "styled-components";
import { ThemedCard, ThemedModal, ThemedModalBody, ThemedModalFooter, ThemedModalHeader } from "../theme";

const Title = styled(CardTitle)`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const Grid = styled.div`
	display:grid;
	grid-auto-flow: row;
	grid-template-columns: 5rem 1fr;
	min-height: 5rem;
`;

const StyledButton = styled(Button)`
	max-height: 2.5rem;
	margin: auto;
	grid-column: 3;
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
		return this.props.entries.filter(this.entryCounts.bind(this))
	}

	entryCounts(entry) {
		return this.entryCountsVersion(entry) && this.entryCountsDLC(entry);
	}

	entryCountsVersion(entry) {
		return !entry.version || entry.version.toLowerCase().split("/").includes(this.props.version);
	}

	entryCountsDLC(entry) {
		return !entry.isDLC || this.props.dlcEnabled;
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
		return (
			<ThemedCard body className="text-center">
				<Title title={this.props.name}>{this.props.name}</Title>
				<Dropdown>
					<DropdownEl action={this.props.hideSection}>Hide Section</DropdownEl>
					<DropdownEl action={() => this.props.completeSection(this.getEntries())}>Complete Section</DropdownEl>
				</Dropdown>
				{this.getEntries().length > 0 ? (
				<Grid>
					<Completion total={this.total()} completed={this.completed()}></Completion>
					
					<StyledButton onClick={this.toggle}>View List</StyledButton>
				</Grid>
				) : (<Grid><StyledButton disabled>Coming Soon</StyledButton></Grid>)}
				<ThemedModal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ThemedModalHeader toggle={this.toggle}>{this.props.name}</ThemedModalHeader>
					<ThemedModalBody>
						<ListGroup>
							{this.getEntries().map((entry) =>
								<div key={entry.value}>
									<Item 
										name={entry.display || entry.value} 
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
		);
	}
}