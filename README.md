# Task Management App

A task management application built with **React**, **TypeScript**, and **Vite**, using the **Context API** for global state and **Auth0** for authentication. Users can register, log in, and create, view, edit, and delete tasks through a protected dashboard.

## Features

- **Task Dashboard** — view all tasks at a glance, with status and priority badges
- **Task Details** — dedicated view for a single task's full information
- **Create / Edit Tasks** — forms with inline validation (required title, valid due date)
- **Delete Tasks** — remove tasks directly from the dashboard or the details page
- **Registration & Login** — dedicated `/register` and `/login` pages, backed by Auth0's Universal Login
- **Protected routes** — unauthenticated visitors are redirected to `/login` and returned to the page they originally requested after signing in
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
- `context.ts` — the `TaskContext` object and the `TaskContextValue` interface
- `TaskReducer.ts` — a `taskReducer` handling `SET_TASKS`, `ADD_TASK`, `UPDATE_TASK`, `DELETE_TASK`, `SET_LOADING`, and `SET_ERROR`
- `TaskActions.ts` — a discriminated union of all reducer actions for exhaustive type checking
- `TaskContext.tsx` — wraps the reducer in a `TaskProvider` component
- `UseTasks.ts` — a `useTasks()` hook for consuming the context, kept in its own file so `TaskContext.tsx` only exports a component (this keeps React Fast Refresh happy)

Task state currently lives in memory (via `useReducer`) and is not yet persisted to a backend or local storage.

### Authentication (`src/hooks`, `src/utils`, `src/components`, `src/pages`)
- `Auth0ProviderWithNavigate.tsx` — wraps the app in Auth0's provider and, on successful login, navigates the user back to whichever page they originally tried to visit
- `MapAuthUser.ts` — maps the raw Auth0 `User` object into the app's typed `AppUser`
- `UseAppUser.ts` — a custom hook combining `useAuth0()` with `mapAuthUser`
- `AuthButton.tsx` — nav bar control: shows "Log In"/"Sign Up" links when signed out, or the user's name and a "Log Out" button when signed in
- `ProtectedRoute.tsx` — redirects unauthenticated users to `/login`, preserving the page they were headed to
- `Login.tsx` / `Register.tsx` — dedicated pages that trigger Auth0's hosted Universal Login (registration opens directly on the sign-up screen via `screen_hint: 'signup'`), then return the user to wherever they started

### Pages (`src/pages`)
- `Dashboard.tsx` — lists all tasks with links to view, edit, or delete
- `TaskCreate.tsx` — creates a new task tied to the authenticated user's ID
- `TaskDetails.tsx` — shows a single task's full details with edit/delete actions
- `TaskEdit.tsx` — pre-fills the task form for updating an existing task
- `Login.tsx` / `Register.tsx` — authentication entry points

### Routing (`src/App.tsx`)

| Path | Page | Protected? |
|---|---|---|
| `/login` | Login | No |
| `/register` | Register | No |
| `/` | Dashboard | Yes |
| `/tasks/new` | Create Task | Yes |
| `/tasks/:id` | Task Details | Yes |
| `/tasks/:id/edit` | Edit Task | Yes |

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

In your Auth0 application settings, add your local dev URL(s) to **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins** — for example:

```
http://localhost:5173, http://localhost:5174
```

(Vite will pick a different port if 5173 is already in use, so listing a couple of fallback ports avoids callback URL mismatches during local development.)

### Running the app

```bash
npm run dev
```

### Other scripts

```bash
npm run build    # type-check and build for production
npm run lint     # run ESLint
npm run preview  # preview the production build locally
```

## Known Limitations

- Tasks are stored only in memory for the current session and are lost on page refresh; there is no backend or persistence layer yet. I plan on adding it in the future, so stay tuned! :)
