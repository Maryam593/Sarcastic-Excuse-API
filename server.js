import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
// Import the new dynamic function
import { getDynamicExcuse } from './excuse-source.js';

const ExcuseAPI = express();
ExcuseAPI.use(bodyParser.json());

const startServer = async () => {
    console.log('Excuse API server starting...');

    // GET endpoint: Now dynamic
    ExcuseAPI.get('/error/:code', async (req, res) => {
        const code = Number(req.params.code);
        if (isNaN(code)) {
            return res.status(400).json({ error: "Invalid error code provided." });
        }
        
        // Get the combined excuse dynamically for the requested code
        const message = await getDynamicExcuse(code);

        res.status(code).json({
            code: code,
            message,
            sarcasmLevel: "high"
        });
    });

    // POST endpoint: Now dynamic
    ExcuseAPI.post('/excuseApi/detect', async (req, res) => {
        const { responseCode, responseText } = req.body;
        let code;

        if (responseCode !== undefined) {
            code = Number(responseCode);
        } else if (responseText) {
            if (/ok|success/i.test(responseText)) code = 200;
            else if (/error|fail/i.test(responseText)) code = 500;
            else code = 404; // Default for unknown text
        } else {
            code = 404; // Default if nothing is provided
        }

        if (isNaN(code)) {
            return res.status(400).json({ 
                code: 400,
                message: "Invalid code provided in request.",
                sarcasmLevel: "high",
                timestamp: new Date().toISOString()
            });
        }

        // Get the combined excuse dynamically
        const message = await getDynamicExcuse(code);

        res.status(code).json({
            code: code,
            message: message,
            sarcasmLevel: "high",
            timestamp: new Date().toISOString()
        });
    });

    // Start the server
    ExcuseAPI.listen(3000, () => {
        console.log('Pro Excuse API is running on http://localhost:3000');
    });
};

startServer();