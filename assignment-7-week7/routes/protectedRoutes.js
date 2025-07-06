const express = require('express');
const verify = require('../middleware/verifyToken');
const router = express.Router();

router.get('/profile', verify, async(req, res) => {
    res.json({ message: `Hello user ${req.user.email}!` });
});

module.exports = router;