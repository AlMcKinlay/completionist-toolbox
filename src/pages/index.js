import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
	<div className="row">
		<div className="col">
      <h3>Welcome</h3>
			<p>Welcome to the completionist toolbox. A place to help you in your constant need to complete things.</p>

			<p>This was designed as a place to share lists. It was inspired by postgame content in Pokémon games, as they
      are quite packed full of stuff to do, but very few instructions as to how to get to many of them. However,
      this can be extended to include other games, as well as collecting.</p>

      <p>If you see a mistake, or would like to contribute a new list, please see <Link to='/contributing'>the contributing page</Link>.</p>
		</div>
	</div>
);

export default IndexPage;
