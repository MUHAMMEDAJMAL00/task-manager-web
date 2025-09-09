import { useState } from 'react';
import {
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
  Container,
} from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiLock,
  FiMail,
  FiArrowLeft,
  FiShield,
  FiZap,
  FiSmartphone,
  FiUserPlus,
  FiUser,
} from 'react-icons/fi';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center py-5 mt-2 mx-auto px-3 px-md-5" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {/* Back to Home */}
            <div className="text-center mb-4">
              <Button
                as={Link}
                to="/"
                variant="link"
                className="text-light text-decoration-none p-0 mb-3 d-flex align-items-center justify-content-center"
              >
                <FiArrowLeft className="me-1" />
                Back to Home
              </Button>
            </div>

            <Card className="auth-card border-0 shadow-lg">
              <Card.Body className="p-4 p-sm-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="auth-icon-container mx-auto mb-3">
                    <div className="auth-icon">
                      <FiUserPlus size={28} />
                    </div>
                  </div>

                  <h2 className="auth-title mb-2">Create Account</h2>
                  <p className="auth-subtitle mb-3 text-secondary">
                    Join thousands of productive users
                  </p>
                  <div className="auth-divider mx-auto"></div>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert variant="danger" className="auth-alert mb-4">
                    {error}
                  </Alert>
                )}

                {/* Form */}
                <Form onSubmit={handleSubmit} className="auth-form">
                  <Form.Group className="mb-3">
                    <Form.Label className="auth-label">
                      <FiUser className="me-2" />
                      Full Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="auth-input"
                      required
                      autoComplete="name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="auth-label">
                      <FiMail className="me-2" />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="auth-input"
                      required
                      autoComplete="email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="auth-label">
                      <FiLock className="me-2" />
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="auth-input"
                      required
                      minLength={6}
                      autoComplete="new-password"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="auth-label">
                      <FiLock className="me-2" />
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="auth-input"
                      required
                      autoComplete="new-password"
                    />
                  </Form.Group>

                  <div className="d-grid mb-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="auth-submit-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Creating your account...
                        </>
                      ) : (
                        <>
                          <FiUserPlus className="me-2" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </div>
                </Form>

                {/* Footer */}
                <div className="text-center">
                  <div className="auth-divider-small mx-auto mb-3"></div>
                  <p className="auth-footer-text mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="auth-link">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Features Footer */}
            <div className="text-center mt-4">
              <Row className="g-3 justify-content-center">
                <Col xs={4} sm={3}>
                  <div className="feature-mini">
                    <div className="feature-mini-icon">
                      <FiShield size={18} />
                    </div>
                    <small className="text-light">Secure</small>
                  </div>
                </Col>
                <Col xs={4} sm={3}>
                  <div className="feature-mini">
                    <div className="feature-mini-icon">
                      <FiZap size={18} />
                    </div>
                    <small className="text-light">Fast</small>
                  </div>
                </Col>
                <Col xs={4} sm={3}>
                  <div className="feature-mini">
                    <div className="feature-mini-icon">
                      <FiSmartphone size={18} />
                    </div>
                    <small className="text-light">Mobile</small>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;