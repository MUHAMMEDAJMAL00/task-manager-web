import { useState, useEffect } from "react";
import { useParams, Outlet, useNavigate, Link } from "react-router-dom";
import { Card, Button, Badge, Row, Col, Nav } from "react-bootstrap";
import { useTasks } from "../hooks/useTasks";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, toggleTask, deleteTask } = useTasks();
  const [task, setTask] = useState(null);

  useEffect(() => {
    console.log(`TaskDetails mounted for task ${id}`);

    const foundTask = items.find((t) => t.id === parseInt(id));
    setTask(foundTask);

    if (!foundTask && items.length > 0) {
      navigate("/tasks");
    }

    return () => {
      console.log(`TaskDetails unmounted for task ${id}`);
    };
  }, [id, items, navigate]);

  const handleToggle = () => {
    toggleTask(parseInt(id));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(parseInt(id));
      navigate("/tasks");
    }
  };

  if (!task) {
    return (
      <Card>
        <Card.Body className="text-center">
          <h5>Task not found</h5>
          <Button as={Link} to="/tasks" variant="primary">
            Back to Tasks
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Row className="mb-4 ">
        <Col>
          <Button
            as={Link}
            to="/tasks"
            variant="outline-secondary"
            className="mb-3"
          >
            ← Back to Tasks
          </Button>
        </Col>
      </Row>

      <Card className="task-details">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Task Details</h4>
            <div>
              {task.completed ? (
                <Badge bg="success">Completed</Badge>
              ) : (
                <Badge bg="warning">Pending</Badge>
              )}
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="task-details-title">
            <h5
              className={
                task.completed ? "text-decoration-line-through text-muted" : ""
              }
            >
              {task.title}
            </h5>
          </div>

          <Row className="mt-3">
            <Col md={6}>
              <div className="task-meta-info">
                <p>
                  <strong>Status:</strong>{" "}
                  {task.completed ? "Completed" : "Pending"}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(task.createdAt).toLocaleDateString()}
                </p>
                {task.updatedAt && (
                  <p>
                    <strong>Updated:</strong>{" "}
                    {new Date(task.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Col>
          </Row>

          <div className="task-details-actions mt-4">
            <Button
              variant={task.completed ? "warning" : "success"}
              onClick={handleToggle}
              className="me-2"
            >
              <span className="d-none d-md-inline">
                {task.completed ? "Mark as Pending" : "Mark as Completed"}
              </span>
              <span className="d-md-none">
                {task.completed ? "Pending" : "Complete"}
              </span>
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <span className="d-none d-md-inline">Delete Task</span>
              <span className="d-md-none">Delete</span>
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link as={Link} to={`/tasks/${id}`} end>
                Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={`/tasks/${id}/edit`}>
                Edit
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Outlet context={{ task, setTask }} />
        </Card.Body>
      </Card>
    </>
  );
}

export default TaskDetails;
