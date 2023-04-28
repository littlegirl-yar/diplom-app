import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState, useMemo } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [isThemeDark, setIsThemeDark] = React.useState(true);

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <ThemeContext.Provider value={preferences}>
      {children}
    </ThemeContext.Provider>
  );
};