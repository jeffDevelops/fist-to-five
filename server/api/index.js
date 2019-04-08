const express = require('express');
const router = express.Router();

const prompts = require('./prompts');

router.use('/prompts', prompts);

module.exports = router;