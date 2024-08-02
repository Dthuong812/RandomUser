# Random User App

This project is a simple web application that displays random user details fetched from the [Random User API](https://randomuser.me/api/). The app is built with React, TypeScript, Tailwind CSS, and Redux for state management.

## Features

- Fetch and display random user details in a table format.
- Pagination to view up to 100 users.
- Sorting on Username and Full Name.
- Responsive design using Tailwind CSS.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Redux (with @reduxjs/toolkit)
- Axios

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RandomUser/random-user-app.git
   cd random-user-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running Tests

```bash
npm test
```

### Linting and Formatting

To lint the code:

```bash
npm run lint
```

To format the code:

```bash
npm run format
```

## Code Structure

- `src/`: Contains the source code of the application.
  - `components/`: Contains React components.
    - `UserTable.tsx`: Component for displaying the user table.
  - `store/`: Contains Redux store configuration.
    - `index.ts`: Sets up the Redux store.
    - `userSlice.ts`: Defines the user slice for Redux state management.
  - `App.tsx`: Main application component.
  - `index.tsx`: Entry point of the application.




