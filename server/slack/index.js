const express = require('express');
const router = express.Router();

const responses = require('./slackResponses');

router.use('/', responses);

module.exports = router;