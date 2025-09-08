import { useAppContext } from '../context/AppContext';
import { taskService } from '../services/taskService';

export function useTasks() {
  const { tasks, dispatch } = useAppContext();

  const fetchTasks = async () => {
    dispatch({ type: 'SET_TASKS_LOADING', payload: true });
    
    try {
      const fetchedTasks = await taskService.fetchTasks();
      dispatch({ type: 'SET_TASKS', payload: fetchedTasks });
    } catch (error) {
      dispatch({ type: 'SET_TASKS_ERROR', payload: error.message });
    }
  };

  const addTask = (title) => {
    const newTask = taskService.createTask({ title });
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (taskId, updates) => {
    const updatedTask = taskService.updateTask(taskId, updates);
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const toggleTask = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const filterTasks = (status) => {
    if (!status || status === 'all') {
      return tasks.items;
    }
    
    return tasks.items.filter(task => {
      if (status === 'completed') return task.completed;
      if (status === 'pending') return !task.completed;
      return true;
    });
  };

  return {
    ...tasks,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    filterTasks,
  };
}