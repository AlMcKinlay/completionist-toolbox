import React from "react";
import CircularProgressbar from 'react-circular-progressbar';

export class Completion extends React.Component {
	constructor(props) {
		super(props);

		this.getPercentage = this.getPercentage.bind(this);
	}

	getPercentage() {
        if (!this.props.completed || !this.props.total) {
            return 0;
        }
        const percentage = (this.props.completed / this.props.total) * 100;
        if (percentage === 100 || percentage === 0) {
            return percentage
        }
        return percentage.toFixed(2);
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