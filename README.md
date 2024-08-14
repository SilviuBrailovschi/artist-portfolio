# Artist Portfolio

A full-stack application for artists to showcase their portfolios. The application consists of three main components: a NestJS backend API, a React frontend application, and a MySQL database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
    - [MySQL Database](#mysql-database)
    - [Backend (NestJS API)](#backend-nestjs-api)
    - [Frontend (React App)](#frontend-react-app)
- [License](#license)

## Prerequisites

- Node.js and npm
- MySQL
- Git

## Setup

### MySQL Database

#### Installing MySQL

##### Linux

1. Update your package index:

    ```bash
    sudo apt update
    ```

2. Install MySQL:

    ```bash
    sudo apt install mysql-server
    ```

3. Secure your MySQL installation:

    ```bash
    sudo mysql_secure_installation
    ```

##### Windows

1. Download and install MySQL Community Server from the [official website](https://dev.mysql.com/downloads/windows/installer/8.0.html).

2. Follow the setup wizard to install MySQL and configure your settings.

#### Importing the Database

1. Open your command line interface.

2. Navigate to the `database` folder in your project:

    ```bash
    cd path/to/artist-portfolio/database
    ```

3. Import the SQL file into your MySQL server:

    - **Linux**:

      ```bash
      mysql -u your_username -p digital_artist < digital_artist.sql
      ```

    - **Windows**:

      ```bash
      mysql -u your_username -p digital_artist < digital_artist.sql
      ```

   Replace `your_username`, `your_database_name`, and `your_database_file.sql` with your MySQL username, the name of the database you want to create, and the name of your exported SQL file.

### Backend (NestJS API)

1. Navigate to the `backend` folder:

    ```bash
    cd path/to/artist-portfolio/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Build the application:

    ```bash
    npm run build
    ```

4. Run the application:

    ```bash
    npm run start:dev
    ```

### Frontend (React App)

1. Navigate to the `frontend` folder:

    ```bash
    cd path/to/artist-portfolio/frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

## License

