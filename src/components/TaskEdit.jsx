import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';

function TaskEdit() {
  const { task } = useOutletContext();
  const { updateTask } = useTasks();
  const navigate = useNavigate();
  const [title, setTitle] = useState(task.title);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      updateTask(task.id, { ...task, title: title.trim() });
      setSuccess(true);
      setTimeout(() => {
        navigate(`/tasks/${task.id}`);
      }, 1000);
    }
  };

  return (
    <>
      <h6>Edit Task</h6>
      {success && (
        <Alert variant="success">
          Task updated successfully! Redirecting...
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={!title.trim() || title === task.title}>
          Update Task
        </Button>
        <Button 
          variant="secondary" 
          className="ms-2"
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          Cancel
        </Button>
      </Form>
    </>
  );
}

export default TaskEdit;