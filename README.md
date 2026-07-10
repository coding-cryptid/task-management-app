# Task Management App

A task management application built with **React**, **TypeScript**, and **Vite**, using the **Context API** for global state and **Auth0** for authentication. Users can create, view, edit, and delete tasks through a protected dashboard.

## Features

- **Task Dashboard** — view all tasks at a glance, with status and priority badges
- **Task Details** — dedicated view for a single task's full information
- **Create / Edit Tasks** — forms with inline validation (required title, valid due date)
- **Delete Tasks** — remove tasks directly from the dashboard or the details page
- **Authentication** — Auth0-powered login/logout via Universal Login, with routes protected from unauthenticated access
- **Fully typed** — task shapes, form inputs/errors, reducer actions, and the mapped Auth0 user are all defined as TypeScript types/interfaces

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/) for routing
- [React Bootstrap](https://react-bootstrap.github.io/) + [Bootstrap 5](https://getbootstrap.com/) for UI
- [Auth0 React SDK](https://github.com/auth0/auth0-react) for authentication
- [Axios](https://axios-http.com/) (installed, available for future API integration)

## Architecture

### Types (`src/types`)
- `task.ts` — `Task`, `TaskStatus`, `TaskPriority`, `TaskFormInput`, `TaskUpdateInput`, and `TaskFormErrors`
- `user.ts` — `AppUser`, a normalized shape for the authenticated user

### State management (`src/context`)
- `TaskReducer.ts` — a `taskReducer` handling `SET_TASKS`, `ADD_TASK`, `UPDATE_TASK`, `DELETE_TASK`, `SET_LOADING`, and `SET_ERROR`
- `TaskActions.ts` — a discriminated union of all reducer actions for exhaustive type checking
- `TaskContext.tsx` — wraps the reducer in a `TaskProvider` and exposes `addTask`, `updateTask`, and `deleteTask` through a `useTasks()` hook

Task state currently lives in memory (via `useReducer`) and is not yet persisted to a backend or local storage.

### Authentication (`src/hooks`, `src/utils`, `src/components`)
- `main.tsx` wraps the app in `Auth0Provider`, configured with `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` environment variables
- `MapAuthUser.ts` maps the raw Auth0 `User` object into the app's typed `AppUser`
- `UseAppUser.ts` — a custom hook combining `useAuth0()` with `mapAuthUser`
- `AuthButton.tsx` — shows a login button when signed out, or the user's name and a logout button when signed in
- `ProtectedRoute.tsx` — redirects unauthenticated users to Auth0's login flow before rendering protected content

### Pages (`src/pages`)
- `Dashboard.tsx` — lists all tasks with links to view, edit, or delete
- `TaskCreate.tsx` — creates a new task tied to the authenticated user's ID
- `TaskDetails.tsx` — shows a single task's full details with edit/delete actions
- `TaskEdit.tsx` — pre-fills the task form for updating an existing task

### Routing (`src/App.tsx`)
All task routes are wrapped in `ProtectedRoute`:

| Path | Page |
|---|---|
| `/` | Dashboard |
| `/tasks/new` | Create Task |
| `/tasks/:id` | Task Details |
| `/tasks/:id/edit` | Edit Task |

## Getting Started

### Prerequisites
- Node.js and npm
- An [Auth0](https://auth0.com/) account with an application configured for this project

### Installation

```bash
git clone https://github.com/coding-cryptid/task-management-app.git
cd task-management-app
npm install
```

### Environment Variables

Create a `.env` file in the project root with your Auth0 application credentials:

```
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
```

In your Auth0 application settings, add your local dev URL (e.g. `http://localhost:5173`) to **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins**.

### Running the app

```bash
npm run dev
```

### Other scripts

```bash
npm run build    # type-check and build for production
npm run lint      # run ESLint
npm run preview   # preview the production build locally
```

## Known Limitations

- Tasks are stored only in memory for the current session and are lost on page refresh; there is no backend or persistence layer yet.
- Dedicated `Login` and `Register` page components exist in `src/pages` but are not currently wired into the app's routes — authentication is handled entirely through Auth0's Universal Login (`loginWithRedirect`).
