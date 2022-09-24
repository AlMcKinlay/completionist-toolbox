import React from "react";
import { Button, CardTitle } from 'reactstrap';
import { Completion } from "../components/completion";
import Dropdown, { DropdownEl } from "../components/dropdown";
import styled from "styled-components";
import { ThemedCard } from "../theme";
import { navigate } from "gatsby";
import { connect } from "react-redux";

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

const StyledButton = styled(Button)`
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

	goToList(link) {
		navigate(link);
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
				{this.props.list.sections.length > 0 ? (
					<Grid>
						<ConnectedCompletion total={this.total()} name={this.props.name} ></ConnectedCompletion>
						<StyledButton onClick={() => this.goToList(this.props.slug)}>View List</StyledButton>
					</Grid>
				) : (<Grid><StyledButton disabled>Coming Soon</StyledButton></Grid>)}
			</ThemedCard>
		);
	}
}