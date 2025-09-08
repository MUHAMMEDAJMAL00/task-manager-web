# Task Manager App

A modern, responsive Task Manager web application built with React, Vite, and Bootstrap. This app provides a complete task management solution with user authentication, CRUD operations, and a beautiful user interface.

## Features

### Core Functionality
- ✅ **User Authentication**: Local signup/login with localStorage
- ✅ **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- ✅ **Task Filtering**: Filter tasks by status (All, Pending, Completed)
- ✅ **Task Details**: Detailed view with nested routes for editing
- ✅ **Data Persistence**: Local storage for both user data and tasks
- ✅ **API Integration**: Initial task fetching from JSONPlaceholder API

### User Interface
- 🎨 **Modern Design**: Clean, responsive interface with Bootstrap components
- 📱 **Mobile-Friendly**: Fully responsive design that works on all devices
- 🌗 **Dark Mode Support**: Automatic dark mode based on system preferences
- ⚡ **Loading States**: Smooth loading indicators and error handling
- 🎯 **Interactive Elements**: Hover effects and smooth transitions

### Technical Features
- 🔐 **Private Routes**: Protected routes requiring authentication
- 🌐 **React Router**: Client-side routing with nested routes
- 🗃️ **Context API**: Global state management with useReducer
- 📦 **Component Architecture**: Modular, reusable components
- 🎭 **Lifecycle Management**: Proper component lifecycle handling with logging

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Context API + useReducer
- **HTTP Client**: Axios
- **UI Framework**: Bootstrap 5 + React-Bootstrap
- **Styling**: SCSS with custom variables and mixins
- **Data Source**: JSONPlaceholder API (initial data)

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout with navigation
│   ├── PrivateRoute.jsx # Route protection component
│   ├── TaskEdit.jsx    # Task editing component
│   └── TaskOverview.jsx # Task overview component
├── context/            # Global state management
│   └── AppContext.jsx  # Main app context with reducer
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication logic
│   └── useTasks.js     # Task management logic
├── pages/              # Main application pages
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # User login page
│   ├── Signup.jsx      # User registration page
│   ├── TaskDetails.jsx # Individual task details
│   └── TaskList.jsx    # Main task list view
├── services/           # API and business logic
│   └── taskService.js  # Task-related API calls
├── styles/             # Styling files
│   └── App.scss        # Main stylesheet with custom styles
└── utils/              # Utility functions
```

## Usage Guide

### Getting Started

1. **Sign Up**: Create a new account using the signup form
2. **Login**: Use your credentials to access the task dashboard
3. **View Tasks**: Initial tasks are loaded from the JSONPlaceholder API

### Managing Tasks

#### Creating Tasks
- Click the "Add New Task" button on the task list page
- Enter a task title and click "Add Task"

#### Viewing Tasks
- Click on any task title to view detailed information
- Use the filter buttons to view all, pending, or completed tasks

#### Editing Tasks
- On the task details page, click the "Edit" tab
- Modify the task title and click "Update Task"

#### Task Status
- Use the checkbox next to each task to mark it as complete/incomplete
- Use the status button on the task details page for the same functionality

#### Deleting Tasks
- Click the "Delete" button next to any task in the list
- Confirm the deletion when prompted

### URL Filtering

You can filter tasks directly through the URL:
- `/tasks` - Show all tasks
- `/tasks?status=pending` - Show only pending tasks  
- `/tasks?status=completed` - Show only completed tasks

## Features in Detail

### Authentication System
- **Local Storage Based**: User data stored in browser's localStorage
- **Session Persistence**: Users remain logged in across browser sessions
- **Form Validation**: Client-side validation for all forms
- **Error Handling**: Clear error messages for invalid credentials

### Task Management
- **Initial Data**: 10 tasks loaded from JSONPlaceholder API on first use
- **Local CRUD**: All operations performed locally with localStorage persistence
- **Real-time Updates**: Immediate UI updates for all task operations
- **Data Consistency**: Proper state management ensures data consistency

### User Interface
- **Bootstrap Components**: Professional UI with consistent styling
- **Responsive Grid**: Mobile-first responsive design
- **Loading States**: Spinners and loading indicators for better UX
- **Error Boundaries**: Graceful error handling throughout the app

## Browser Compatibility

This application supports all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [React Router](https://reactrouter.com/) - Declarative routing
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake REST API for testing
