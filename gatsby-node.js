const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

const getCategories = (graphql) => graphql(`{
  allListsJson {
    edges {
      node {
        category
      }
    }
  }
}`);


const makeCategoryPages = (createPage, results) => {
	const categories = [];
	results.data.allListsJson.edges.forEach(({ node }) => {
		if (!categories.includes(node.category)) {
			categories.push(node.category);
		}
	});

	createPage({
		path: "/lists",
		component: path.resolve(`./src/templates/lists.js`),
		context: {
			categories
		},
	});
};

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators;
	const promises = [];
	promises.push(getCategories(graphql).then(makeCategoryPages.bind(this, createPage)));
	return Promise.all(promises);
};