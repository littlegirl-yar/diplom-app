import React, { createContext} from 'react';

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