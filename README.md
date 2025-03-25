# React App - Home24

## Project Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

### Installation
1. Clone the repository:
   ```sh
   git clone git@github.com:chathura-ranasingha/home24-bxp-frontend-test-task-lucytech.git
   cd home24-bxp-frontend-test-task-lucytech
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Mock API
This project uses `json-server` to serve mock API data. To start the mock server:
```sh
json-server --watch home24-mockdata.json --port 5000
```

### Starting the React App
Once the dependencies are installed, start the development server:
```sh
npm start
```

### Accessing the App
After running the above commands:
- Open your browser and go to `http://localhost:3000/`
- Use the following credentials to log in:
  - **Username:** `admin@example.com`
  - **Password:** `password`

## Project Structure
```
├── public/          # Static files
├── src/             # Source code
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components
│   ├── services/    # API services
│   ├── store/       # Redux store (if applicable)
│   ├── App.js       # Root component
│   ├── index.js     # Entry point
├── home24-mockdata.json  # Mock API data
├── package.json     # Dependencies & scripts
├── README.md        # Project documentation
```

## Available Scripts
### Start the Development Server
```sh
npm start
```
### Run the Mock API
```sh
json-server --watch home24-mockdata.json --port 5000
```
### Build for Production
```sh
npm run build
```

## License
This project is licensed under [MIT License](LICENSE).

