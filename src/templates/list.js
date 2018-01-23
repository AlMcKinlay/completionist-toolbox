import React from "react";
import { Row, Col } from 'reactstrap';
import { Section } from "./section";

export default ({ data }) => {
	const post = data.listsHJson;
	return (
		<div>
			<Row>
				<Col>
					<h1>{post.name}</h1>
				</Col>
			</Row>
			<Row>
				{post.sections.map((section) =>
					<Col key={section.name}>
						<Section name={section.name} entries={section.entries} />
					</Col>
				)}
			</Row>
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