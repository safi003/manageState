import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const STORAGE_KEY = 'todos';

/**
 * App - Top-level container for the To-Do List application.
 *
 * Manages the global state:
 *   - tasks: array of task objects persisted in browser localStorage
 *   - filter: current task filter ('all' | 'active' | 'completed')
 *   - editingId: id of the task currently being edited (null when adding)
 *
 * Tasks are loaded from localStorage on initialization and saved back to
 * localStorage whenever the task list changes, so data persists between sessions.
 */
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);

  // Load tasks from localStorage when the application initializes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load tasks from localStorage', err);
    }
  }, []);

  // Persist tasks to localStorage whenever the task list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save tasks to localStorage', err);
    }
  }, [tasks]);

  const editingTask = tasks.find((t) => t.id === editingId);

  /**
   * addTask - Creates a new task and prepends it to the list.
   */
  function addTask({ task, description }) {
    const newTask = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      task,
      description,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setEditingId(null);
  }

  /**
   * updateTask - Updates the currently edited task with new values.
   */
  function updateTask({ task, description }) {
    if (!editingId) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingId ? { ...t, task, description } : t
      )
    );
    setEditingId(null);
  }

  /**
   * toggleTask - Flips the completed status of a task.
   */
  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  /**
   * deleteTask - Removes a task after a confirmation prompt.
   */
  function deleteTask(id) {
    if (
      !window.confirm('Are you sure you want to delete this task?')
    ) {
      return;
    }
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  /**
   * startEdit - Enters editing mode for the given task.
   */
  function startEdit(task) {
    setEditingId(task.id);
  }

  /**
   * cancelEdit - Exits editing mode and clears the form.
   */
  function cancelEdit() {
    setEditingId(null);
  }

  return (
    <div className="app">
      <h1>To-Do List</h1>

      <TaskForm
        initialTask={editingTask}
        onSave={editingId ? updateTask : addTask}
        onCancel={cancelEdit}
      />

      <div className="filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <TaskList
        tasks={tasks}
        filter={filter}
        onToggle={toggleTask}
        onEdit={startEdit}
        onDelete={deleteTask}
      />

      <p className="footer">
        Tasks are saved in browser localStorage and persist between sessions.
      </p>
    </div>
  );
}
