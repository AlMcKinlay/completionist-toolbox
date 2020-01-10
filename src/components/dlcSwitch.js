import React from "react";
import { Label, Input,  } from 'reactstrap';
import styled from "styled-components";

const Wrapper = styled.div`
    margin: auto;
    padding-right: 10px;
`;

export class DLCSwitch extends React.Component {

	render() {
		return (
            <Wrapper>
                <Label check>
                    <Input type="checkbox"
                        checked={this.props.dlcEnabled}
                        onChange={this.props.toggleDLC}  />{' '}
                    DLC
                </Label>
            </Wrapper>
		);
	}
}