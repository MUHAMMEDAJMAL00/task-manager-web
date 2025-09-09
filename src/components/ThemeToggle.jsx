import { Button } from "react-bootstrap";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline-light"
      size="sm"
      onClick={toggleTheme}
      className="theme-toggle-btn d-flex align-items-center justify-content-center"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <FiMoon size={16} />
      ) : (
        <FiSun size={16} />
      )}
      <span className="d-none d-md-inline ms-2">
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </Button>
  );
}

export default ThemeToggle;