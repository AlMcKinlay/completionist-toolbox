import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from './header';
import './index.css';
import 'react-circular-progressbar/dist/styles.css';

import screenshot from './screenshot.png';
import styled, { ThemeProvider } from 'styled-components';

import { Theme } from '../state';

const url = "https://toolbox.yamanickill.com";

const data = {
  url: url,
  title: "The Completionist's Toolbox",
  description: "A tool for completionists of all types",
  image: `${url}${screenshot}`
}

const Container = styled.div`
  background-color: ${props => props.theme.background()};
  height: 100vh;
  color: ${props => props.theme.textColor()};
`;

const Main = styled.main`
  border-top: 1px solid rgba(255, 255, 255, 0.25);
`;

class TemplateWrapper extends React.Component {
	constructor(props) {
		super(props);

    this.toggleDarkMode = this.toggleDarkMode.bind(this);

    this.state = {
      children: props.children,
      theme: {
        ...Theme
      }
    }

    Theme.watchLocalStorage((theme) => this.setState({theme: {...this.state.theme, ...theme}}));
  }

	toggleDarkMode() {
		this.setState({
			theme: {
        ...this.state.theme,
        ...Theme.toggleDarkMode()
      }
		});
	}

  render() {
    return (
      <div>
        <Helmet>
          <title>{data.title}</title>
          <meta name="description" content={data.description} />
          <meta name="image" content={data.image} />
          <meta name="keywords" content="gaming, completionists" />
    
          {/* OpenGraph tags */}
          <meta property="og:url" content={data.url} />
          <meta property="og:type" content="website" />
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
        <ThemeProvider theme={this.state.theme}>
          <Container>
            <Header toggleDarkMode={this.toggleDarkMode}></Header>
            <Main>
              <div className={"container mt-4"}>
                {this.state.children}
              </div>
            </Main>
          </Container>
        </ThemeProvider>
      </div>
    )
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default TemplateWrapper;
