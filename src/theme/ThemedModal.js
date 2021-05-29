import styled from "styled-components";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const ThemedModal = styled(Modal)`
	background-color: ${props => props.theme.background()};
	color: ${props => props.theme.textColor()};
  
	${props => props.theme.dark && 'border-color: rgba(255, 255, 255, 0.25);'}
`;

export const ThemedModalHeader = styled(ModalHeader)`
	background-color: ${props => props.theme.background()};
  
	${props => props.theme.dark && 'border-color: rgba(255, 255, 255, 0.25);'}

	.close, .close span {
		color: ${props => props.theme.textColor()};
		background-color: ${props => props.theme.background()};
		border: none;
	}
`;

export const ThemedModalBody = styled(ModalBody)`
	background-color: ${props => props.theme.background()};
  
	${props => props.theme.dark && 'border-color: rgba(255, 255, 255, 0.25);'}
`;

export const ThemedModalFooter = styled(ModalFooter)`
	background-color: ${props => props.theme.background()};
  
	${props => props.theme.dark && 'border-color: rgba(255, 255, 255, 0.25);'}
`;