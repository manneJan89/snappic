# Angular Project with Node.js Backend

This project is a modern Angular application built with the latest version of Angular and relies on a Node.js backend for its API services. Below, you'll find instructions to set up, run, and develop this application.

---

## Prerequisites

Ensure the following are installed on your system before proceeding:

- [Node.js](https://nodejs.org/) (version 16 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli) (latest version recommended)

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Angular Project Dependencies

Navigate to the Angular project folder and install dependencies:

```bash
cd angular-app
npm install
```

### 3. Set Up the Node.js Backend

Navigate to the Node.js backend folder and install dependencies:

```bash
cd ../node-backend
npm install
```

---

## Running the Application

### 1. Start the Node.js Backend

Run the following command in the `node-backend` folder to start the backend server:

```bash
npm start
```

By default, the server runs on `http://localhost:3000`. Ensure this server is running before starting the Angular application.

### 2. Start the Angular Frontend

Run the following command in the angular-app folder to start the Angular development server:

```bash
ng serve
```

By default, the Angular application runs on `http://localhost:4200`.

---

## Development Workflow

### Backend Development

- Make changes in the `node-backend` folder for API updates.
- Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test endpoints.

### Frontend Development

- Make changes in the `angular-app` folder for UI and client-side logic updates.
- The Angular CLI automatically reloads the application on file changes.

---

## Features

1. **Modern Angular Framework**:
   - Built with the latest Angular version, using standalone components and modern RxJS patterns.

2. **Node.js Backend**:
   - Provides a RESTful API for seamless data exchange.

3. **Easy Setup**:
   - Simplified installation and setup process.

4. **Live Development**:
   - Angular CLI provides live reload during development.

---

## Folder Structure

### Angular Application (`angular-app`)
angular-app/ ├── src/ │ ├── app/ # Angular application logic │ ├── assets/ # Static assets │ ├── environments/ # Environment configuration │ └── main.ts # Angular entry point ├── angular.json # Angular CLI configuration ├── package.json # Dependencies and scripts └── tsconfig.json # TypeScript configuration

shell
Copy code

### Node.js Backend (`node-backend`)
node-backend/ ├── src/ │ ├── controllers/ # Route controllers │ ├── models/ # Data models │ ├── routes/ # API routes │ └── app.js # Express application entry point ├── package.json # Dependencies and scripts └── server.js # Server startup script

--- 

## API Integration

The Angular application communicates with the Node.js backend using RESTful API endpoints. 

### How it Works
1. The Angular frontend sends HTTP requests to the Node.js backend to fetch or manipulate data.
2. Ensure the Node.js backend server is running before interacting with the Angular application.
3. The default backend server URL is `http://localhost:8000`.

### Example API Flow
1. **Frontend Request**:
   - The Angular app makes a `GET` request to `http://localhost:8000/api/streams` to fetch stream data.

2. **Backend Processing**:
   - The Node.js backend processes the request and fetches data from the database.

3. **Response to Frontend**:
   - The backend returns a JSON response that the Angular app uses to update the UI.

---

## Scripts

### Angular Project Scripts

- **Start Development Server**:
  ```bash
  ng serve
  ```

Starts the Angular development server. The application will be available at `http://localhost:4200`.

- Build for Production

```bash
ng build --configuration production
```

Compiles the Angular application for production. The output will be placed in the dist/ folder.