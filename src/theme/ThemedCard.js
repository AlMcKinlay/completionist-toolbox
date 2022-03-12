import styled from "styled-components";
import { Card, CardHeader } from 'reactstrap';

export const ThemedCard = styled(Card)`
	height: 100%;

	background-color: ${props => props.theme.background()};
	${props => props.theme.dark && 'border-color: rgba(255, 255, 255, 0.25)'};

	${props => props.type === "blank" && 'border-style: dashed'};
	${props => props.type === "blank" && 'cursor: pointer'};
	&:hover {
		${props => props.type === "blank" && `background-color: ${props.theme.hoverBackground()}`};
	}
`;

export const ThemedCardHeader = styled(CardHeader)`
	background-color: ${props => props.theme.background()};
  
	${props => props.theme.dark && 'border-color: rgba(255, 255, 255, 0.25)'};
`;