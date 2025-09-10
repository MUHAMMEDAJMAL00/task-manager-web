import { useOutletContext } from 'react-router-dom';
import { FiCheck, FiClock } from 'react-icons/fi';

function TaskOverview() {
  const { task } = useOutletContext();

  return (
    <div>
      <h6>Task Overview</h6>
      <p>This task is currently <strong>{task.completed ? 'completed' : 'pending'}</strong>.</p>
      <p>Task ID: {task.id}</p>
      {task.completed && (
        <div className="alert alert-success" role="alert">
          <FiCheck className="me-2" /> Congratulations! This task has been completed.
        </div>
      )}
      {!task.completed && (
        <div className="alert alert-info" role="alert">
          <FiClock className="me-2" /> This task is still pending. Don't forget to mark it as completed when done!
        </div>
      )}
    </div>
  );
}

export default TaskOverview;