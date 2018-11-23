import React from "react";
import { CardTitle } from 'reactstrap';
import { Completion } from "./completion";
import styled from "styled-components";
import { ThemedCard } from "../components/ThemedCard";
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
	@media only screen  and (min-width : 992px) {
		grid-template-columns: repeat(4, 1fr);
	}
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
		return (
			<ThemedCard body className="text-center">
				<Title title={this.props.name}>{this.props.name}</Title>
				<Grid>
					<ConnectedCompletion total={this.total()} name={this.props.name} ></ConnectedCompletion>

					<StyledButton className="btn btn-secondary" to={this.props.slug} onClick={this.goToList}>View List</StyledButton>
				</Grid>
			</ThemedCard>
		);
	}
}