import React from 'react';
import Layout from "../components/layout"

const IndexPage = () => (
	<Layout>
	<div className="row">
		<div className="col">
      <h3>Contributing</h3>
			<p>Currently, the site is completely static, so all lists are defined in the code on
				 the <a href='https://www.github.com/YaManicKill/completionist-toolbox'>github repository</a>, and
			they are turned into the pages you see here. If you would like to contribute, please open a pull request on the repo.
			If you see a mistake, or would like a new list, and you can't figure out adding it on github, then feel free to open
			an issue on the repository, and I'll fix/add if I have time. If you don't have an account on Github, 
			then tweet me <a href="http://www.twitter.com/TheScotBot">@TheScotBot</a> and I'll take a look into it.</p>
		</div>
	</div>
	</Layout>
);

export default IndexPage;
