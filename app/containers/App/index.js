/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter, browserHistory } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { createSelector } from 'reselect';

import { selectLogin } from 'containers/LoginPage/selectors';
import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/" component={DashboardPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

{/* <Switch>
          <Route exact path="/login" component={LoginPage} />
          
          <Route
            path="/"
            component={DashboardPage}
            onEnter={() => this.authentication()}
          />
          
          <Route path="" component={NotFoundPage} />
        </Switch> */}