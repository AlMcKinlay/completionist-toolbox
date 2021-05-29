import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
} from 'reactstrap';
import Link from "gatsby-link";
import { withTheme } from "styled-components";
import Dropdown, { DropdownDivider, DropdownLink, DropdownEl } from '../components/dropdown';

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
				<Navbar color="faded" dark={this.props.theme.dark} light={!this.props.theme.dark} expand="md" style={{
					backgroundColor: this.props.theme.navbarBackground()
				}}>
					<div className="container">
						<Link to="/" className="navbar-brand">
							The Completionist's Toolbox
						</Link>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar className="flex-grow-0">
							<Nav className="ml-auto" navbar>
								<NavItem>
									<Link
										className="nav-link"
										to="/"
										innerRef={(el) => { this.myLink = el }}
									>
										All Lists
									</Link>
								</NavItem>

								<Dropdown name={"Options"}>
									<DropdownEl action={this.props.toggleDarkMode.bind(null)}>
										{this.props.theme.dark ? 'Light Mode' : 'Dark Mode'}
									</DropdownEl>
									<DropdownDivider />
									<DropdownLink link="/contributing/">
										Contributing
									</DropdownLink>
								</Dropdown>
							</Nav>
						</Collapse>
					</div>
				</Navbar>
			</header>
		)
	}
}

export default withTheme(Header);
