import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const MyLink = styled(Link)`
	padding: 0;
    color: ${props => props.theme.textColor()};
	&:hover {
		background-color: ${props => props.theme.background()};
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
        border-color: ${props => props.theme.background()};
    }
    &:focus{
        box-shadow: none;
    }
    background: ${props => props.theme.background()};
    border-color: ${props => props.theme.background()};
    color: ${props => props.theme.textColor()};
    box-shadow: none;
    ${(props) => {
        if (props.positioned !== "normal") {
            return `
            position: absolute;
            top: -40px;
            right: 0;
            `;
        }
    }};
`;

const StyledDropdownMenu = styled(DropdownMenu)`
    background-color: ${props => props.theme.background()};
    border-color: ${props => props.theme.textColor()};
`;

const StyledDropdownItem = styled(DropdownItem)`
    border-color: ${props => props.theme.textColor()};
    &:hover {
        background-color: ${props => props.theme.background()};
        color: ${props => props.theme.hoverTextcolor()};
    }
`;

const StyledUncontrolledDropdown = styled(UncontrolledDropdown)`
    ${(props) => props.positioned === "normal" && "margin: auto;"};
`;

export const DropdownDivider = () => {
    return (
        <StyledDropdownItem divider />
    )
}

export const DropdownEl = ({action, children}) => {
    return (
        <StyledDropdownItem onClick={action}>
            <NonLink className="nav-link dropdown-item" href="#">
                {children}
            </NonLink>
        </StyledDropdownItem>
    )
}

export const DropdownLink = ({action, link, children}) => {
    return (
        <StyledDropdownItem onClick={action}>
            <MyLink
                className="nav-link dropdown-item"
                to={link}
            >
                {children}
            </MyLink>
        </StyledDropdownItem>
    )
}

export default ({name, positioned, children}) => {
    return (
        <StyledUncontrolledDropdown positioned={positioned}>
            {name ? (<DropdownToggle nav caret>{name}</DropdownToggle>) : (<Menu positioned={positioned}>&#x2807;</Menu>)}
            
            <StyledDropdownMenu right>
                {children}
            </StyledDropdownMenu>
        </StyledUncontrolledDropdown>
    )
} 