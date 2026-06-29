import { createContext, useContext } from "react";
import useDarkStore from "#store/dark";
import { getMobileTheme } from "#constants/mobileTheme";

const MobileThemeContext = createContext(getMobileTheme(true));

export const MobileThemeProvider = ({ children }) => {
  const { isDark } = useDarkStore();
  const theme = getMobileTheme(isDark);

  return (
    <MobileThemeContext.Provider value={theme}>
      {children}
    </MobileThemeContext.Provider>
  );
};

export const useMobileTheme = () => useContext(MobileThemeContext);

export default MobileThemeContext;
