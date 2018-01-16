import React from "react";

export default ({ data }) => {
	const post = data.listsJson;
	console.log(post);
	return (
		<div>
			<h1>{post.name}</h1>
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