import React from "react";
import CircularProgressbar from 'react-circular-progressbar';

export class Completion extends React.Component {

	constructor(props) {
		super(props);
	}

	getPercentage() {
        return 67;
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