import React from 'react';
import TaskItem from './TaskItem';

/**
 * TaskList - Renders the list of tasks filtered by completion status.
 * Delegates each task to a TaskItem component.
 *
 * @param {Object} props
 * @param {Object[]} props.tasks - Array of task objects
 * @param {string} props.filter - 'all' | 'active' | 'completed'
 * @param {Function} props.onToggle - Callback to toggle task completion
 * @param {Function} props.onEdit - Callback to edit a task
 * @param {Function} props.onDelete - Callback to delete a task
 */
export default function TaskList({ tasks, filter, onToggle, onEdit, onDelete }) {
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return <p className="empty-tasks">No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {filteredTasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={() => onToggle(t.id)}
          onEdit={() => onEdit(t)}
          onDelete={() => onDelete(t.id)}
        />
      ))}
    </div>
  );
}
