const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");   

// Production cors settings
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? "your-production-domain.com"  // Replace with your domain
        : "http://localhost:5173",
};
app.use(cors(corsOptions));

// API routes
app.get("/api", (req, res) => {
  res.send("Hello World");
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
    });
}

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});