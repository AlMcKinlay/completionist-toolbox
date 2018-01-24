module.exports = {
  siteMetadata: {
    title: 'The Completionist Toolbox',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `data`,
				path: `${__dirname}/src/data`,
			},
		},
		'gatsby-transformer-hjson',
		'gatsby-plugin-styled-components',
  ],
};
