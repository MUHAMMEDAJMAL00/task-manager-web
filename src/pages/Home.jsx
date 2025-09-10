import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  FiClipboard,
  FiZap,
  FiStar,
  FiSmartphone,
  FiArrowRight,
  FiTarget,
} from "react-icons/fi";

function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div
      className=" d-flex align-items-center justify-content-center min-vh-100  mt-5 pt-3 pb-5 shadow mx-auto w-100"
      style={{ minHeight: "calc(100vh - 160px)" }}
    >
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5} className="px-3 px-md-4">
            <div className="text-center mb-5 animate-fade-in">
              <div className="hero-icon-container mx-auto mb-4">
                <div className="hero-icon">
                  <FiClipboard size={60} />
                </div>
              </div>

              <h1 className="hero-title mb-3">
                <span className="text-gradient">Task</span>Manager
              </h1>
              <div className="hero-divider mx-auto mb-4"></div>

              <p className="hero-subtitle text-whitemb-5 px-2">
                Transform your productivity with our beautifully crafted task
                management experience
              </p>
            </div>

            {/* Main Card */}
            <Card className="hero-card h-60 border-0 shadow-lg">
              <Card.Body className="p-4 p-sm-5">
                {isAuthenticated ? (
                  <div className="text-center">
                    <div className="welcome-section mb-4">
                      <h3 className="welcome-title text-white mb-3">
                        Welcome back,
                        <br className="d-sm-none" />
                        <span className="text-primary fw-bold">
                          {user?.name || user?.email}
                        </span>
                        !
                      </h3>
                      <p className="welcome-text text-white">
                        Ready to conquer your tasks and boost your productivity?
                      </p>
                    </div>

                    <div className="d-grid">
                      <Button
                        as={Link}
                        to="/tasks"
                        variant="primary"
                        size="lg"
                        className="cta-button py-3"
                      >
                        <FiArrowRight className="me-2" />
                        View My Tasks
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center ">
                    <div className="features-grid mb-5">
                      <Row className="">
                        <Col xs={6} md={4}>
                          <div className="feature-item">
                            <div className="feature-icon mb-2">
                              <FiZap size={32} />
                            </div>
                            <small className="text-light">Fast</small>
                          </div>
                        </Col>
                        <Col xs={6} md={4}>
                          <div className="feature-item">
                            <div className="feature-icon mb-2">
                              <FiStar size={32} />
                            </div>
                            <small className="text-light">Beautiful</small>
                          </div>
                        </Col>
                        <Col xs={12} md={4}>
                          <div className="feature-item">
                            <div className="feature-icon mb-2">
                              <FiSmartphone size={32} />
                            </div>
                            <small className="text-light">Responsive</small>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="cta-section">
                      <div className="d-grid gap-3">
                        <Button
                          as={Link}
                          to="/login"
                          variant="primary"
                          size="lg"
                          className="cta-button py-3"
                        >
                          <FiArrowRight className="me-2" />
                          Get Started
                        </Button>
                        <Button
                          as={Link}
                          to="/signup"
                          variant="outline-primary"
                          size="lg"
                          className="cta-button-outline py-3"
                        >
                          <FiTarget className="me-2" />
                          Create Account
                        </Button>
                      </div>

                      <p className="mt-4 mb-0">
                        <small className="home-footer-text">
                          Join thousands of users who've transformed their
                          productivity
                        </small>
                      </p>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
