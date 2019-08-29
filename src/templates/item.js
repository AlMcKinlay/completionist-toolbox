import React from "react";
import { Tooltip } from 'reactstrap';
import { ThemedListItem } from '../components/ThemedList';
import { Icon } from "react-font-awesome-5";

const selectedStyle = {
	color: 'gray'
};

export class Item extends React.Component {

	constructor(props) {
		super(props);

		this.copy = this.copy.bind(this);
		this.toggle = this.toggle.bind(this);
		this.state = {
			copied: false,
			tooltipOpen: false
		}
	}
	toggle() {
	  this.setState({
		tooltipOpen: !this.state.tooltipOpen
	  });
	}

	copy(e) {
		const help = this.helpText;
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(help);
		selection.removeAllRanges();
		selection.addRange(range);
		document.execCommand("copy", true);
		selection.removeAllRanges();
		this.setState({
			copied: true
		});
		setTimeout(() => this.setState({
			copied: false
		}), 1000);
		e.stopPropagation();
	}

	getName() {
		return this.props.name.replace(/(\s|\(|\))/g, "-").replace("'", "");
	}

	render() {
		return (
			<ThemedListItem onClick={this.props.clickItem} style={this.props.selected ? selectedStyle : null}>
				{this.props.checkbox !== false && (this.props.selected  ? <Icon.CheckSquare.regular /> : <Icon.Square.regular />)}
				{" " + this.props.name}
				{this.props.help &&
					<span className="float-right" onClick={this.copy}>
						<Icon.QuestionCircle.regular id={`item-tooltip-${this.getName()}`} />
						<Tooltip isOpen={this.state.tooltipOpen} placement="right" target={`item-tooltip-${this.getName()}`} toggle={this.toggle} >
							<span>
								<span ref={(helpText) => { this.helpText = helpText; }}>{this.props.help}</span>
								{this.props.help.startsWith("http") ? this.state.copied ? " (copied)" : " (click to copy)" : ""}
							</span>
						</Tooltip >
					</span>
				}
			</ThemedListItem>
		);
	}
}