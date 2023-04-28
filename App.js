import React from 'react';
import Navigation from './src/components/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;