import { useOutletContext } from 'react-router-dom';

function TaskOverview() {
  const { task } = useOutletContext();

  return (
    <div>
      <h6>Task Overview</h6>
      <p>This task is currently <strong>{task.completed ? 'completed' : 'pending'}</strong>.</p>
      <p>Task ID: {task.id}</p>
      {task.completed && (
        <div className="alert alert-success" role="alert">
          🎉 Congratulations! This task has been completed.
        </div>
      )}
      {!task.completed && (
        <div className="alert alert-info" role="alert">
          ⏳ This task is still pending. Don't forget to mark it as completed when done!
        </div>
      )}
    </div>
  );
}

export default TaskOverview;