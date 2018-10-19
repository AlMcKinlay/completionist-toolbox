import React from "react";
import CircularProgressbar from 'react-circular-progressbar';

export class Completion extends React.Component {

	getPercentage() {
        if (!this.props.completed || !this.props.total) {
            return 0;
        }
        return ((this.props.completed / this.props.total) * 100).toFixed(2);
    } 

	render() {
		return (
            <CircularProgressbar
                percentage={this.getPercentage()}
                text={`${this.getPercentage()}%`}
            />
		);
	}
}