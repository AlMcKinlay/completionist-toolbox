import React from 'react';
import {
	Collapse,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	UncontrolledDropdown,
} from 'reactstrap';
import Link from "gatsby-link";
import styled, { withTheme } from "styled-components";

const StyledDropdownMenu = styled(DropdownMenu)`
	background-color: ${props => props.theme.navbarBackground()};
	border-color: rgba(255, 255, 255, 0.5);
`;

const StyledDivider = styled(DropdownItem)`
	border-color: rgba(255, 255, 255, 0.5);
`;

const StyledDropdownItem = styled(DropdownItem)`
	&:hover {
		background-color: ${props => props.theme.navbarBackground()};
	}
`;

const MyLink = styled(Link)`
	padding: 0;
	&:hover {
		background-color: ${props => props.theme.navbarBackground()};
	}
`;

const NonLink = styled.a`
	padding: 0;
	&:hover {
		background-color: ${props => props.theme.navbarBackground()};
	}
`;

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<header>
				<Navbar color="faded" dark expand="md" style={{
					backgroundColor: this.props.theme.navbarBackground()
				}}>
					<div className="container">
						<Link to="/" className="navbar-brand">
							The Completionist's Toolbox
						</Link>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<Link
										className="nav-link"
										to="/lists/"
										innerRef={(el) => { this.myLink = el }}
									>
										Lists
									</Link>
								</NavItem>
								<UncontrolledDropdown nav inNavbar>
									<DropdownToggle nav caret>
									Options
									</DropdownToggle>
									<StyledDropdownMenu right>
										<StyledDropdownItem
												onClick={this.props.toggleDarkMode.bind(null)}>
											<NonLink
												className="nav-link dropdown-item"
												href="#"
											>
												{this.props.theme.dark ? 'Light Mode' : 'Dark Mode'}
											</NonLink>
										</StyledDropdownItem>
										<StyledDivider divider />
										<StyledDropdownItem>
											<MyLink
												className="nav-link dropdown-item"
												to="/contributing/"
												innerRef={(el) => { this.myLink = el }}
											>
												Contributing
											</MyLink>
										</StyledDropdownItem>
									</StyledDropdownMenu>
								</UncontrolledDropdown>
							</Nav>
						</Collapse>
					</div>
				</Navbar>
			</header>
		)
	}
}

export default withTheme(Header);
