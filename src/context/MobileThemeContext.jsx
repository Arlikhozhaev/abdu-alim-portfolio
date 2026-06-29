import { createContext, useContext } from "react";
import { getMobileTheme } from "#constants/mobileTheme";

const darkTheme = getMobileTheme(true);

const MobileThemeContext = createContext(darkTheme);

/** Mobile UI is always dark — independent of desktop theme toggle. */
export const MobileThemeProvider = ({ children }) => (
  <MobileThemeContext.Provider value={darkTheme}>
    {children}
  </MobileThemeContext.Provider>
);

export const useMobileTheme = () => useContext(MobileThemeContext);

export default MobileThemeContext;
