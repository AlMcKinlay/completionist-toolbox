import React, {useState} from 'react';
import styled from "styled-components";
import { ListCard } from "./listCard";
import { ThemedModal, ThemedModalBody, ThemedModalFooter, ThemedModalHeader } from "../components/ThemedModal";
import { Button, ListGroup } from 'reactstrap';
import { Item } from "./item";

const ListSection = styled.div`
	display: block !important;
	break-inside: avoid;
	padding: 10px;
`;

const List = styled.div`
	display: grid;
	grid-auto-flow: row;
	grid-auto-rows: 1fr;
	
	@media only screen  and (min-width : 768px) {
		grid-template-columns: repeat(2, 50%);
	}
	
	@media only screen  and (min-width : 992px) {
		grid-template-columns: repeat(3, 33%);
	}
`;

const getTotalItems = (sections) => sections.reduce((total, section) => total + section.entries.length, 0);

export default ({lists = [], unusedLists = [], addList, hideList}) => {
	const [modal, setModal] = useState(false);


	const toggle = () => {
		setModal(!modal);
	}

	return (
		<div>
		<List>
			{lists.map(({node: list}) =>
				<ListSection key={list.name}>
					<ListCard name={list.name} slug={list.fields.slug} total={getTotalItems(list.sections)} hideList={hideList.bind(this, list)} />
				</ListSection>
			)}
			<ListSection key={"Add List"} onClick={toggle}>
				<ListCard type={"blank"} />
			</ListSection>

			<ThemedModal isOpen={modal} toggle={toggle}>
				<ThemedModalHeader toggle={toggle}>Add List</ThemedModalHeader>
				<ThemedModalBody>
					<ListGroup>
						{unusedLists.map(({node: list}) =>
							<div key={list.name}>
								<Item 
									name={list.name}
									checkbox={false}
									clickItem={() => {
										addList(list);
										toggle();
									}} 
									/>
							</div>
						)}
					</ListGroup>
				</ThemedModalBody>
				<ThemedModalFooter>
					<Button color="primary" onClick={toggle}>Close</Button>
				</ThemedModalFooter>
			</ThemedModal>
		</List>
		</div>
	);
}