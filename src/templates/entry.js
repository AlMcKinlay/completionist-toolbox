import React from "react";

export default ({ data }) => {
	const post = data.listsJson;
	return (
		<div className="row">
			<div className="col">
				<h1>{post.name}</h1>
			</div>
		</div>
	);
};

export const query = graphql`
  query EntryQuery($slug: String!) {
		listsJson(fields: { slug: { eq: $slug } }) {
			name,
			sections {
				name
			}
		}
	}
`;