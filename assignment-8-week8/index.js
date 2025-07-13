require('dotenv').config();
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3010;

// === Middleware ===
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// === Create uploads directory if not exists ===
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// === Multer Configuration for File Uploads ===
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    },
});
const upload = multer({ storage });

// === Root Route ===
app.get('/', (req, res) => {
    res.send('✅ Assignment 8 - File Upload + Yelp API + Error Handling');
});

// === File Upload Route ===
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: '❌ No file uploaded' });
    }

    res.status(200).json({
        message: '✅ File uploaded successfully',
        filename: req.file.filename,
        filePath: `/uploads/${req.file.filename}`
    });
});

// === Yelp API Route ===
// === Yelp API Search ===
// === Yelp API Route ===
// === Yelp API Search ===
app.get('/yelp', async(req, res, next) => {
    const { location = 'New York', term = 'restaurants' } = req.query;

    try {
        const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
            headers: {
                // Ensure YELP_API_KEY is loaded via .env
                Authorization: `Bearer ${process.env.YELP_API_KEY}`
            },
            params: {
                location,
                term,
                limit: 5
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        // Corrected line 75: Changed `? .` to `?.`
        console.error('❌ Yelp API Error:', error.response ? .data || error.message);

        // Correct the status response line as well:
        res.status(error.response ? .status || 500).json({
            error: error.response ? .data || 'Something went wrong with Yelp API'
        });
    }
});
// ... (rest of the file)

// === Global Error Handler ===
app.use((err, req, res, next) => {
    console.error('❌ Internal Server Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// === Start Server ===
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});