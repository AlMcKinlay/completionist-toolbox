const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
	const { createNodeField } = boundActionCreators;
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

const getCategories = (graphql) => graphql(`{
  allListsHJson {
    edges {
      node {
        category
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

const makeCategoryPages = (createPage, results) => {
	const categories = [];
	results.data.allListsHJson.edges.forEach(({ node }) => {
		if (!categories.includes(node.category)) {
			categories.push(node.category);
		}
	});

	categories.forEach((category) => createPage({
		path: `/lists/${category}`,
		component: path.resolve(`./src/templates/category.js`),
		context: {
			category
		},
	}));
};

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators;
	const promises = [];
	promises.push(getLists(graphql).then(makeListPages.bind(this, createPage)));
	promises.push(getCategories(graphql).then(makeCategoryPages.bind(this, createPage)));
	return Promise.all(promises);
};