import React from 'react';
import { ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../context/AuthContext';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#999"
        style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
      />
    );
  }
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
