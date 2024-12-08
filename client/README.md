# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Run the Server

```bash
mkdir server
cd server   
npm init -y 
npm install express cors
npm install nodemon -D
touch server.js
npm run dev
```

## Run the Client

```bash
npm create vite@latest
create-vite client
select react, javascript, tailwind
      
cd client
npm install
npm install axios

npm run dev
```

## Run the Both
```bash
npm init -y
npm install concurrently -D
npm run dev
```

## Set up concurrent production deployment for both client and server

####root package.json

{
  "name": "your-project-name",
  "version": "1.0.0",
  "scripts": {
    "install-all": "cd client && npm install && cd ../server && npm install",
    "build": "cd client && npm run build",
    "client:prod": "cd client && npm run preview",
    "server:prod": "cd server && npm start",
    "start": "npm run build && concurrently \"npm run server:prod\" \"npm run client:prod\"",
    "dev": "concurrently \"cd server && npm run dev\" \"cd client && npm run dev\""
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}

#### Update server.js corsOptions origin to your production domain
#### Update the client's vite.config.js for production:
```bash
build: {
  outDir: 'dist',
  assetsDir: 'assets',
},
```

#### client's package.json under scripts
```bash
"dev": "vite",
"build": "vite build",
"preview": "vite preview --port 5173",
"lint": "eslint ."
```

#### server's package.json under scripts
```bash
"start": "NODE_ENV=production node server.js",
"dev": "nodemon server.js"
```

To run in production mode:
Install dependencies:
```bash
npm run install-all
```
Start the production server:
```bash
npm run start
```

Create a .env file for environment variables: under server folder
```bash
NODE_ENV=production
PORT=3080 
```
Add environment-specific configurations:
module.exports = {
    production: {
        client_url: 'https://your-production-domain.com',
        server_url: 'https://your-api-domain.com'
    },
    development: {
        client_url: 'http://localhost:5173',
        server_url: 'http://localhost:3080'
    }
}
