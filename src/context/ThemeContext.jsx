import { createContext, useContext, useReducer, useEffect } from "react";

const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  theme: localStorage.getItem("theme") || "light",
};

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const setTheme = (theme) => {
    dispatch({ type: "SET_THEME", payload: theme });
  };

  return (
    <ThemeContext.Provider value={{ ...state, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}