import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

interface RoutesAuthenticatedProps extends RouteProps {
  isPrivite?: boolean;
  component: React.ComponentType;
}

const RoutesAuthenticated: React.FC<RoutesAuthenticatedProps> = ({
  isPrivite = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isPrivite === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivite ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default RoutesAuthenticated;
