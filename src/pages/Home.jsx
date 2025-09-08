import { Card, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Card className="text-center">
          <Card.Body>
            <Card.Title as="h1" className="mb-4">
              Welcome to Task Manager
            </Card.Title>
            {isAuthenticated ? (
              <>
                <Card.Text className="lead">
                  Hello {user?.name || user?.email}! Ready to manage your tasks?
                </Card.Text>
                <Button as={Link} to="/tasks" variant="primary" size="lg">
                  View My Tasks
                </Button>
              </>
            ) : (
              <>
                <Card.Text className="lead">
                  Organize your tasks efficiently and stay productive.
                </Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Button as={Link} to="/login" variant="primary" size="lg">
                    Login
                  </Button>
                  <Button as={Link} to="/signup" variant="outline-primary" size="lg">
                    Sign Up
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Home;