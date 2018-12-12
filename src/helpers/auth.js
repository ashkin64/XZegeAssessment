//This configuration is copied from prescottprue/react-redux-firebase\blob\master\docs\recipes\routing.md
//from react-router v4 + redux-auth-wrapper v2

import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import LoadingScreen from '../components/layout/Spinner';

const locationHelper = locationHelperBuilder({});

export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: LoadingScreen,
  allowRedirectBack: true,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/login',
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  AuthenticatingComponent: LoadingScreen,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty
});
