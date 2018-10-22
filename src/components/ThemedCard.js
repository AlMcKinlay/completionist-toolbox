import styled from "styled-components";
import { Card, CardHeader } from 'reactstrap';

export const ThemedCard = styled(Card)`
	background-color: ${props => props.theme.background()};
  
	${props => props.theme.dark && 'border-color: rgba(255, 255, 255, 0.25);'}
`;

export const ThemedCardHeader = styled(CardHeader)`
	background-color: ${props => props.theme.background()};
  
	${props => props.theme.dark && 'border-color: rgba(255, 255, 255, 0.25);'}
`;