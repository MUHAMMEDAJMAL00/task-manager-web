import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import {
  FiHome,
  FiCheckSquare,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

function Layout() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check current page is login or signup/
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Show navbar only if not on auth pages */}
      {!isAuthPage && (
        <Navbar bg="primary" variant="dark" className="mb-3 mb-md-4 fixed-top">
          <Container fluid>
            <div
              className="navbar-content mx-auto d-flex justify-content-between align-items-center w-100"
              style={{ maxWidth: "1200px" }}
            >
              <Navbar.Brand as={Link} to="/" className="fw-bold">
                <FiCheckSquare className="me-2" />
                TaskManager
              </Navbar.Brand>

              {/* Desktop Menu */}
              <div className="d-none d-lg-flex align-items-center gap-3">
                <Nav.Link
                  as={Link}
                  to="/"
                  className="px-3 d-flex align-items-center text-light"
                >
                  <FiHome className="me-2" />
                  Home
                </Nav.Link>
                {isAuthenticated && (
                  <Nav.Link
                    as={Link}
                    to="/tasks"
                    className="px-3 d-flex align-items-center text-light"
                  >
                    <FiCheckSquare className="me-2" />
                    Tasks
                  </Nav.Link>
                )}
                {!isAuthenticated && (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/login"
                      className="px-3 d-flex align-items-center text-light"
                    >
                      <FiLogIn className="me-2" />
                      Login
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/signup"
                      className="px-3 d-flex align-items-center text-light"
                    >
                      <FiUserPlus className="me-2" />
                      Sign Up
                    </Nav.Link>
                  </>
                )}
                <ThemeToggle />
                {isAuthenticated && (
                  <>
                    <Navbar.Text className="me-3 small text-light">
                      Welcome, {user?.name || user?.email}!
                    </Navbar.Text>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={handleLogout}
                      className="d-flex align-items-center"
                    >
                      <FiLogOut className="me-2" />
                      Logout
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Dropdown Menu */}
              <div className="d-lg-none">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="outline-light"
                    size="sm"
                    className="border-0 d-flex align-items-center"
                  >
                    <FiMenu size={18} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to="/"
                      className="d-flex align-items-center"
                    >
                      <FiHome className="me-2" />
                      Home
                    </Dropdown.Item>
                    {isAuthenticated && (
                      <Dropdown.Item
                        as={Link}
                        to="/tasks"
                        className="d-flex align-items-center"
                      >
                        <FiCheckSquare className="me-2" />
                        Tasks
                      </Dropdown.Item>
                    )}
                    {!isAuthenticated && (
                      <>
                        <Dropdown.Item
                          as={Link}
                          to="/login"
                          className="d-flex align-items-center"
                        >
                          <FiLogIn className="me-2" />
                          Login
                        </Dropdown.Item>
                        <Dropdown.Item
                          as={Link}
                          to="/signup"
                          className="d-flex align-items-center"
                        >
                          <FiUserPlus className="me-2" />
                          Sign Up
                        </Dropdown.Item>
                      </>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item className="d-flex align-items-center justify-content-between">
                      <span>Theme</span>
                      <ThemeToggle />
                    </Dropdown.Item>
                    {isAuthenticated && (
                      <>
                        <Dropdown.Divider />
                        <Dropdown.Item disabled className="small">
                          Welcome, {user?.name || user?.email}!
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={handleLogout}
                          className="d-flex align-items-center text-danger"
                        >
                          <FiLogOut className="me-2" />
                          Logout
                        </Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Container>
        </Navbar>
      )}

      {/* Floating theme toggle for auth pages */}
      {isAuthPage && (
        <div className="auth-theme-toggle">
          <ThemeToggle />
        </div>
      )}

      <div style={{ paddingTop: isAuthPage ? "0" : "80px" }}>
        <Container fluid>
          <div className="page-content mx-auto" style={{ maxWidth: "1200px" }}>
            <Outlet />
          </div>
        </Container>
      </div>
    </>
  );
}

export default Layout;
