import styled from "styled-components";
import { ListGroup, ListGroupItem } from 'reactstrap';

export const ThemedListGroup = styled(ListGroup)`
	background-color: ${props => props.theme.background()};
  
	${props => props.theme.dark && 'border-color: rgba(255, 255, 255, 0.25);'}
`;

export const ThemedListItem = styled(ListGroupItem)`
	background-color: ${props => props.theme.background()};
  
	${props => props.theme.dark && 'border-color: rgba(255, 255, 255, 0.25);'}

	&:hover{
		cursor: pointer;
		background-color: ${props => props.theme.hoverBackground()};
	}
`;