import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import styled from "styled-components";

const ProgressBar = styled(CircularProgressbar)`
    path.CircularProgressbar-path {
        stroke: ${props => props.value >= 100 ? 'rgba(46, 139, 87)' : `rgba(62, 152, 199)`};
    }
    text {
        fill: ${props => props.value >= 100 ? 'rgba(46, 139, 87)' : `rgba(62, 152, 199, 100)`};
    }
`;

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
            <ProgressBar
                value={this.getPercentage()}
                text={`${this.getPercentage()}%`}
            />
		);
	}
}