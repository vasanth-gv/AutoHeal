const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;
const VERSION = process.env.APP_VERSION || "1.0.0";

app.use(express.json());

// Home page
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>AutoHeal</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #0f172a;
                    color: white;
                    text-align: center;
                    padding-top: 100px;
                }

                .status {
                    color: #22c55e;
                    font-size: 24px;
                    font-weight: bold;
                }

                .card {
                    background: #1e293b;
                    padding: 30px;
                    margin: auto;
                    width: 400px;
                    border-radius: 15px;
                }
            </style>
        </head>

        <body>
            <div class="card">
                <h1>🚀 AutoHeal</h1>
                <h2>Self-Healing Web Application</h2>

                <p class="status">● SYSTEM HEALTHY</p>

                <p>Version: ${VERSION}</p>
                <p>DevOps Automation Platform</p>
            </div>
        </body>
        </html>
    `);
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        application: "AutoHeal",
        version: VERSION,
        timestamp: new Date().toISOString()
    });
});

// Application status
app.get("/api/status", (req, res) => {
    res.json({
        application: "AutoHeal",
        status: "running",
        version: VERSION,
        environment: process.env.NODE_ENV || "development"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 AutoHeal running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});