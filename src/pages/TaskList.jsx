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
import { FiTrash2 } from "react-icons/fi";

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

  const handleDeleteTask = (taskId, taskTitle) => {
    if (window.confirm(`Are you sure you want to delete "${taskTitle}"?`)) {
      deleteTask(taskId);
    }
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
      <div className="tasks-header ">
        <Row className="mb-3 mt-4 align-items-center g-3  ">
          <Col xs={12} sm={8} md={8}>
            <h2 className="text-light mb-0">My Tasks</h2>
          </Col>
          <Col xs={12} sm={4} md={4} className="text-sm-end">
            <Button
              variant="primary"
              onClick={() => setShowModal(true)}
              className="w-100 w-sm-auto"
              size="lg"
            >
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

      <Row className="mb-4">
        <Col xs={12}>
          <ButtonGroup className="w-100">
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
              Done ({items.filter((t) => t.completed).length})
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {filteredTasks.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-5">
            <h5>No tasks found</h5>
            <p className="text-muted">
              {searchTerm
                ? `No tasks match "${searchTerm}". Try a different search term.`
                : filter === "all"
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
                className="d-flex align-items-start align-sm-center py-3 px-2 px-sm-3"
              >
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="me-2 me-sm-3 mt-1 mt-sm-0"
                />
                <div className="task-content flex-grow-1 me-2">
                  <Link
                    to={`/tasks/${task.id}`}
                    className={`task-title text-decoration-none d-block ${
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
                  <div className="task-meta mt-1">
                    {task.completed && (
                      <Badge bg="success" className="badge small">
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="task-actions flex-shrink-0">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id, task.title)}
                    title="Delete task"
                    className="p-2"
                  >
                    <FiTrash2 size={14} />
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="add-task-modal"
      >
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
