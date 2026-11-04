import React, { useState, useEffect } from 'react';

/**
 * TaskForm - A form for adding a new task or editing an existing one.
 * Provides input fields for task name and description. Performs validation
 * to ensure both fields are filled before allowing submission.
 *
 * @param {Object} props
 * @param {Object|null} props.initialTask - The task being edited (null when adding)
 * @param {Function} props.onSave - Callback invoked with { task, description } on valid submit
 * @param {Function} props.onCancel - Callback invoked to cancel editing mode
 */
export default function TaskForm({ initialTask, onSave, onCancel }) {
  const [task, setTask] = useState(initialTask ? initialTask.task : '');
  const [description, setDescription] = useState(
    initialTask ? initialTask.description : ''
  );
  const [error, setError] = useState('');

  // Reset form fields whenever the initialTask prop changes (e.g. switching tasks to edit)
  useEffect(() => {
    setTask(initialTask ? initialTask.task : '');
    setDescription(initialTask ? initialTask.description : '');
    setError('');
  }, [initialTask]);

  function handleSubmit(e) {
    e.preventDefault();

    // Validation: both fields must be filled
    if (!task.trim() || !description.trim()) {
      setError('Please fill in both the task name and description.');
      return;
    }

    setError('');
    onSave({ task: task.trim(), description: description.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task name"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        autoFocus
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error && <span className="form-error">{error}</span>}
      <button type="submit" className="save-btn">
        {initialTask ? 'Save changes' : 'Add task'}
      </button>
      {initialTask && (
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      )}
    </form>
  );
}
