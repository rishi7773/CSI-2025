const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = 3010;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));