import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
} from 'reactstrap';
import Link from "gatsby-link";

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
								<NavItem>
									<Link
										className="nav-link"
										to="/contributing/"
										innerRef={(el) => { this.myLink = el }}
									>
										Contributing
									</Link>
								</NavItem>
							</Nav>
						</Collapse>
					</div>
				</Navbar>
			</header>
		)
	}
}
