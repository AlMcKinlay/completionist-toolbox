import React from "react";
import { CardTitle } from 'reactstrap';
import { Completion } from "../components/completion";
import styled from "styled-components";
import { ThemedCard } from "../theme";
import { Link } from "gatsby"
import { connect } from "react-redux"
import { DropdownToggle, DropdownItem, UncontrolledDropdown, DropdownMenu } from 'reactstrap';

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

const NonLink = styled.a`
	padding: 0;
	color: ${props => props.theme.textColor()};
	&:hover {
		background-color: ${props => props.theme.background()};
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
			<ThemedCard body className="text-center" type={this.props.type}> 
				{this.props.name && (<Title title={this.props.name}>{this.props.name}</Title>)}
				{this.props.name && (
					<UncontrolledDropdown>
						<Menu>&#x2807;</Menu>
						<StyledDropdownMenu right>
							<StyledDropdownItem onClick={this.props.hideList}>
								<NonLink href="#">
									Hide
								</NonLink>
							</StyledDropdownItem>
						</StyledDropdownMenu>
					</UncontrolledDropdown>
				)}
				{this.props.type !== "blank" ? (
					<Grid>
						<ConnectedCompletion total={this.total()} name={this.props.name} ></ConnectedCompletion>
						<StyledButton className="btn btn-secondary" to={this.props.slug} onClick={this.goToList}>View List</StyledButton>
					</Grid>
				) : (
					
					<Grid>
						<div></div>
						<div>+ Add List</div>
						<div></div>
					</Grid>
				)}
			</ThemedCard>
		);
	}
}