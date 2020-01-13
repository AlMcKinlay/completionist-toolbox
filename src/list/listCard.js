import React from "react";
import { CardTitle } from 'reactstrap';
import { Completion } from "../components/completion";
import Dropdown, { DropdownEl } from "../components/dropdown";
import styled from "styled-components";
import { ThemedCard } from "../theme";
import { Link } from "gatsby"
import { connect } from "react-redux"

const Title = styled(CardTitle)`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const Grid = styled.div`
	display:grid;
	grid-auto-flow: row;
	grid-template-columns: repeat(3, 1fr);
	margin: auto;
`;

const StyledButton = styled(Link)`
	max-height: 2.5rem;
	margin: auto;
	grid-column: 3;
	@media only screen  and (min-width : 992px) {
		grid-column: 4;
	}
`;

const getCompletionState = ({ lists }, {name}) => {
	const list = lists[name];
	const completed = list ? Object.values(list.sections).reduce((total, section) => total + section.entries.length, 0) : 0;
	return {
		completed: completed
	}
};

const ConnectedCompletion = connect(getCompletionState)(Completion);

export class ListCard extends React.Component {
	
	total() {
		return this.props.total;
	}

	render() {
		if (this.props.type === "blank") {
			return (
				<ThemedCard body className="text-center" type={this.props.type}> 
					<Grid>
						<div></div>
						<div>+ Choose List</div>
						<div></div>
					</Grid>
				</ThemedCard>
			);
		}
		return (
			<ThemedCard body className="text-center" type={this.props.type}> 
				<Title title={this.props.displayName}>{this.props.displayName}</Title>
				<Dropdown>
					<DropdownEl action={this.props.hideList}>Hide List</DropdownEl>
				</Dropdown>
				<Grid>
					<ConnectedCompletion total={this.total()} name={this.props.name} ></ConnectedCompletion>
					<StyledButton className="btn btn-secondary" to={this.props.slug} onClick={this.goToList}>View List</StyledButton>
				</Grid>
			</ThemedCard>
		);
	}
}