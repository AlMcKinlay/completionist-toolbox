import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from './header';
import './index.css';
import 'react-circular-progressbar/dist/styles.css';

import screenshot from './screenshot.png';

const url = "https://toolbox.yamanickill.com";

const data = {
  url: url,
  title: "The Completionist's Toolbox",
  description: "A tool for completionists of all types",
  image: `${url}${screenshot}`
}

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="image" content={data.image} />
      <meta name="keywords" content="gaming, completionists" />

      {/* OpenGraph tags */}
      <meta property="og:url" content={data.url} />
      <meta property="og:type" content="website" /> : null}
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:image" content={data.image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@TheScotBot" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content={data.image} />
    </Helmet>
    <Header />
    <main>
      <div className={"container mt-4"}>
        {children}
      </div>
    </main>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default TemplateWrapper;
