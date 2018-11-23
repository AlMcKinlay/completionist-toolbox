const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;
	if (node.internal.owner === `gatsby-transformer-hjson`) {
		const fileNode = getNode(node.parent);
		if (fileNode.dir.includes("/data/")) {
			const slug = createFilePath({ node, getNode, basePath: `pages` });
			createNodeField({
				node,
				name: `slug`,
				value: slug,
			});
		}
	}
};

const getLists = (graphql) => graphql(`{
	allListsHJson {
		edges {
			node {
				fields {
					slug
				}
			}
		}
	}
}`);

const makeListPages = (createPage, result) => {
	if (!result || !result.data) {
		return;
	}
	return result.data.allListsHJson.edges.forEach(({ node }) => {
		createPage({
			path: node.fields.slug,
			component: path.resolve(`./src/templates/list.js`),
			context: {
				slug: node.fields.slug,
			},
		});
	});
};

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;
	const promises = [];
	promises.push(getLists(graphql).then(makeListPages.bind(this, createPage)));
	return Promise.all(promises);
};