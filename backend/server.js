const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Enable CORS so the separate HTML frontend can talk to this API
app.use(cors());

// Parse incoming JSON payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/', (req, res) => {
    res.send('Portfolio Backend is running!');
});

/**
 * Handle Contact Form Submissions
 * POST /contact
 * Expects JSON: { name, email, message }
 */
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation Check on Backend
        if (!name || !email || !message) {
            return res.status(400).json({ error: true, message: "Name, email, and message are required fields." });
        }

        // Insert into MySQL database
        const sqlQuery = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
        const values = [name, email, message];

        // Execute query
        const [result] = await db.execute(sqlQuery, values);

        console.log(`New form submission inserted! DB ID: ${result.insertId}`);
        
        // Success response
        return res.status(200).json({ 
            success: true, 
            message: "Message sent successfully!" 
        });

    } catch (error) {
        console.error("Database Insert Error:", error);
        return res.status(500).json({ 
            error: true, 
            message: "Internal server error. Failed to send message." 
        });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
