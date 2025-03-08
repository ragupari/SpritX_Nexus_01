<div align="center">
<h1 align="center">Project 1 - SecureConnect</h1>
</div>

## Description
Welcome to SecureConnect, a secure and user-friendly authentication system! 🚀 In a world where
security is key, your mission is to create a rock-solid signup and login system with proper validation,
error handling, and user-friendly feedback.

## Project Structure
- **front-end**: Sign-up, Log-in, Home pages.
- **back-end**: The backend API for handling database operations and login, signup logic.
- **database**: Database files and configuration for storing SCM data.

### Built With
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" alt="nodejs" height="40"/> </a>
<a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
<img src="https://www.svgrepo.com/show/349330/css3.svg" alt="CSS3" width="40" />
   
## Installation

Before running the project, ensure all required dependencies are installed in the appropriate directories.

### Steps to Install:
1. **Clone the git repository**:
    ```bash
    git clone https://github.com/ragupari/SpritX_Nexus_01.git
    cd SpritX_Nexus_01
    ```
2. **Install Backend Dependencies**:
    Navigate to the `back-end` directory and install dependencies:
    ```bash
    cd customer-end
    npm install
    ```
2. **Setup .env file**:
    Create an env file as `.env` inside back-end directory with database configurations:
    ```bash
    HOST=
    USER=
    PASSWORD=
    DATABASE=SpritX_Nexus_01
    DB_PORT=

    PORT=9000
    SECRET_KEY=
    ```
    (If you want to change the default back-end port to any as you wish)

3. **Install Front-end Dependencies**:
    Navigate to the `front-end` directory and install dependencies:
    ```bash
    cd front-end
    npm install
    ```
4. **Setup data.json**:
    Navigate to the `data.json` file in `front-end` directory (if you want to change the URLs, or leave as it is with default):
    ```bash
        {
            "frontend": "http://localhost:3000",
            "backend": "http://localhost:9000"  
        }
    ```
## Running the Application


### Backend
To start the backend server on `localhost:9000`, use the following command from the `back-end` directory:
```bash
npm start
```

### Frontend
To start the React frontend server on `localhost:3000`, use the following command from the `front-end` directory:
```bash
npm start
```

## Contributors
- Team Nexus
