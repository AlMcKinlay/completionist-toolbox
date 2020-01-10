module.exports = {
  siteMetadata: {
    title: 'The Completionist Toolbox',
  },
	pathPrefix: `/`,
  plugins: [
    'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `data`,
				path: `${__dirname}/src/data`,
			},
		},
		{
			resolve: `gatsby-transformer-json`,
			options: {
			  typeName: "List"
			},
		},
  ],
};
