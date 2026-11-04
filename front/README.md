# To-Do List Application

A simple React To-Do List application demonstrating state management, form validation, and browser storage persistence.

## Features

- Add, edit, and delete tasks
- Mark tasks as completed (visually distinguished)
- Form validation: both task name and description are required
- Confirmation prompt before deleting a task
- Filter tasks by All / Active / Completed
- Persists tasks in browser `localStorage` between sessions
- Separate components: `TaskForm`, `TaskItem`, `TaskList`

## Project Structure

```
front/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx          # Entry point
    ├── index.css         # Base/global styles & variables
    ├── App.jsx           # State container & localStorage logic
    ├── App.css           # App-specific styling
    └── components/
        ├── TaskForm.jsx  # Add/edit form with validation
        ├── TaskItem.jsx  # Single task row (toggle/edit/delete)
        └── TaskList.jsx  # Filtered task list renderer
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)

### Install dependencies

```bash
cd front
npm install
```

### Run the development server

```bash
npm run dev
```

Then open the URL shown by Vite (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## How It Works

- **State**: The task list lives in `App.jsx` and is synced to `localStorage` under the key `todos`. Tasks are loaded on mount and saved on every change.
- **Validation**: `TaskForm` prevents submission unless both the task name and description are filled.
- **Editing**: Clicking "Edit" on a task pre-fills the form with that task's details; clicking "Save changes" updates it.
- **Deletion**: Clicking "Delete" shows a browser confirmation before removing the task.
- **Filtering**: Use the All / Active / Completed buttons to filter the displayed tasks.

## Notes

- No build-step TypeScript; plain JavaScript/React is used.
- `react-router-dom` was removed since this is a single-page app; `main.jsx` renders `App` directly.
