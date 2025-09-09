import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  ListGroup,
  Badge,
  Spinner,
  Alert,
  Modal,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import SearchBar from "../components/SearchBar";

function TaskList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState(searchParams.get("status") || "all");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    items,
    loading,
    error,
    fetchTasks,
    addTask,
    deleteTask,
    toggleTask,
    filterTasks,
  } = useTasks();

  useEffect(() => {
    console.log("TaskList mounted");

    if (items.length === 0) {
      fetchTasks();
    }

    return () => {
      console.log("TaskList unmounted");
    };
  }, []);

  useEffect(() => {
    const currentFilter = searchParams.get("status") || "all";
    setFilter(currentFilter);
  }, [searchParams]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (newFilter === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ status: newFilter });
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle("");
      setShowModal(false);
    }
  };

  const filteredTasks = filterTasks(filter).filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error loading tasks</Alert.Heading>
        <p>{error}</p>
        <Button variant="outline-danger" onClick={fetchTasks}>
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <div className="tasks-header">
        <Row className="mb-3 mt-4">
          <Col>
            <h2>My Tasks</h2>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Add New Task
            </Button>
          </Col>
        </Row>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        placeholder="Search tasks by title..."
      />

      <Row className="mb-3">
        <Col>
          <ButtonGroup>
            <Button
              variant={filter === "all" ? "primary" : "outline-primary"}
              onClick={() => handleFilterChange("all")}
            >
              All ({items.length})
            </Button>
            <Button
              variant={filter === "pending" ? "warning" : "outline-warning"}
              onClick={() => handleFilterChange("pending")}
            >
              Pending ({items.filter((t) => !t.completed).length})
            </Button>
            <Button
              variant={filter === "completed" ? "success" : "outline-success"}
              onClick={() => handleFilterChange("completed")}
            >
              Completed ({items.filter((t) => t.completed).length})
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {filteredTasks.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-5">
            <h5>No tasks found</h5>
            <p className="text-muted">
              {searchTerm ? 
                `No tasks match "${searchTerm}". Try a different search term.` :
                filter === "all"
                ? "Start by adding your first task!"
                : `No ${filter} tasks to display.`}
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Card className="task-list">
          <ListGroup variant="flush">
            {filteredTasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                className="d-flex align-items-center"
              >
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="me-3"
                />
                <div className="task-content flex-grow-1">
                  <Link
                    to={`/tasks/${task.id}`}
                    className={`task-title text-decoration-none ${
                      task.completed ? "text-muted" : ""
                    }`}
                  >
                    <span
                      className={
                        task.completed ? "text-decoration-line-through" : ""
                      }
                    >
                      {task.title}
                    </span>
                  </Link>
                  <div className="task-meta">
                    {task.completed && (
                      <Badge bg="success" className="badge">
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="task-actions">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} className="add-task-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddTask}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title..."
                autoFocus
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!newTaskTitle.trim()}
            >
              Add Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default TaskList;
