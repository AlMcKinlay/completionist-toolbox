import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import './index.css';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="The Completionist Toolbox"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
    <main>
      <div className={"container mt-4"}>
        {children()}
      </div>
    </main>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
