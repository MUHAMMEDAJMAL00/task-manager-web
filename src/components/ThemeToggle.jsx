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
        <FiMoon size={20} />
      ) : (
        <FiSun size={20} />
      )}
    </Button>
  );
}

export default ThemeToggle;