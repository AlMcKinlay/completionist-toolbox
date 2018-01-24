import React from "react";
import { Row, Col } from 'reactstrap';
import { Section } from "./section";
import styled from "styled-components";

const ListSection = styled.div`
	display: block !important;
	break-inside: avoid;
	padding: 10px;
`;

const List = styled.div`
	column-count: 3; 
	column-gap: 0;
`;

export default ({ data }) => {
	const post = data.listsHJson;
	return (
		<div>
			<Row>
				<Col>
					<h2>{post.name}</h2>
				</Col>
			</Row>
			<List>
				{post.sections.map((section) =>
					<ListSection key={section.name}>
						<Section name={section.name} entries={section.entries} />
					</ListSection>
				)}
			</List>
		</div>
	);
};

export const query = graphql`
  query EntryQuery($slug: String!) {
		listsHJson(fields: { slug: { eq: $slug } }) {
			name,
			sections {
				name,
				entries {
					value,
					help
				}
			}
		}
	}
`;