import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';

export default class Header extends React.Component {
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
					backgroundColor: "#0099C6"
				}}>
					<div className="container">
						<NavbarBrand href="/">The Completionist's Toolbox</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink href="/lists/">Lists</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="/contributing/">Contributing</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</div>
				</Navbar>
			</header>
		)
	}
}
