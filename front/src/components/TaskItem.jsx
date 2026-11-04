import React from 'react';

/**
 * TaskItem - A single task row displaying the task name, description and actions.
 * Supports toggling completion, editing, and deleting (with a confirmation prompt
 * handled by the parent).
 *
 * @param {Object} props
 * @param {Object} props.task - The task object { id, task, description, completed }
 * @param {Function} props.onToggle - Callback to toggle the task's completed status
 * @param {Function} props.onEdit - Callback to begin editing the task
 * @param {Function} props.onDelete - Callback to delete the task
 */
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          aria-label={
            task.completed
              ? `Mark "${task.task}" as incomplete`
              : `Mark "${task.task}" as complete`
          }
        />
        <div className="task-details">
          <strong className={task.completed ? 'completed' : ''}>
            {task.task}
          </strong>
          <p className={task.completed ? 'completed' : ''}>
            {task.description}
          </p>
        </div>
      </div>
      <div className="task-actions">
        <button type="button" onClick={onEdit} className="edit-btn">
          Edit
        </button>
        <button type="button" onClick={onDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}
