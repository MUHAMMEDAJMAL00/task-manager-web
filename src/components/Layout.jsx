import { Outlet } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import {
  FiHome,
  FiCheckSquare,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
} from "react-icons/fi";

function Layout() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        className="mb-3 mb-md-4 fixed-top"
      >
        <Container fluid>
          <div
            className="navbar-content mx-auto"
            style={{ maxWidth: "1200px", width: "100%" }}
          >
            <Navbar.Brand as={Link} to="/" className="fw-bold">
              <FiCheckSquare className="me-2" />
              TaskManager
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <Nav.Link
                  as={Link}
                  to="/"
                  className="px-3 d-flex align-items-center"
                >
                  <FiHome className="me-2" />
                  Home
                </Nav.Link>
                {isAuthenticated && (
                  <Nav.Link
                    as={Link}
                    to="/tasks"
                    className="px-3 d-flex align-items-center"
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
                      className="px-3 d-flex align-items-center"
                    >
                      <FiLogIn className="me-2" />
                      Login
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/signup"
                      className="px-3 d-flex align-items-center"
                    >
                      <FiUserPlus className="me-2" />
                      Sign Up
                    </Nav.Link>
                  </>
                )}
              </Nav>
              <Nav className="align-items-lg-center">
                <div className="d-flex align-items-center gap-2">
                  <ThemeToggle />
                  {isAuthenticated && (
                    <>
                      <Navbar.Text className="d-none d-lg-block me-3 small">
                        Welcome, {user?.name || user?.email}!
                      </Navbar.Text>
                      <div className="d-lg-none mb-2 text-light small">
                        Welcome, {user?.name || user?.email}!
                      </div>
                      <Button
                        variant="outline-light"
                        size="sm"
                        onClick={handleLogout}
                        className="w-100 w-lg-auto d-flex align-items-center justify-content-center"
                      >
                        <FiLogOut className="me-2" />
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
      <div style={{ paddingTop: "80px" }}>
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
