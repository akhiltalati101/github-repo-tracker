# GitHub Repository Tracker

A modern web application that helps you track GitHub repositories and stay updated with their latest releases. The app provides a clean interface to monitor multiple repositories, view release notes, and mark releases as seen.

## Features

- Track multiple GitHub repositories
- View latest release notes in a clean, markdown-formatted interface
- Mark releases as seen to keep track of what's new
- Real-time updates on repository changes
- Modern, responsive UI built with Material-UI and Next.js

## Requirements

### System Requirements
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Development Tools
- Git
- A code editor (VS Code recommended)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd github-repo-tracker
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/github_repo_tracker
PORT=4000
GITHUB_TOKEN=your_github_personal_access_token
```

4. Set up the database:
```bash
# Create a PostgreSQL database named 'github_repo_tracker'
createdb github_repo_tracker
```

5. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Environment Variables

### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
  - Format: `postgresql://username:password@host:port/database_name`
- `PORT`: Backend server port (default: 4000)
- `GITHUB_TOKEN`: GitHub Personal Access Token
  - Required for accessing GitHub API
  - Create one at: GitHub Settings > Developer Settings > Personal Access Tokens
  - Required scopes: `repo` and `read:user`

## Development

### Backend
- Built with Node.js, Express, and Apollo Server
- Uses PostgreSQL with Knex.js for database operations
- GraphQL API for efficient data fetching

### Frontend
- Next.js for server-side rendering and routing
- Material-UI for component library
- Apollo Client for GraphQL integration
- Tailwind CSS for styling

## Future Contributions / Improvements

### Backend
- Simplified data structure for Repositories + Releases

### Frontend
- Filter option to the list of cards
- Client Side caching - check if caching can be improved upon the default Apollo provided caching.
- Authentication through Github
- Snackbar (Green/Red) for success/error on adding repositories
- More detailed release information

## License

This project is licensed under the MIT License. 