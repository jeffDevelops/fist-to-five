const express = require('express');
const router = express.Router();

const prompts = require('../controllers/prompts');

router.route('/')
  .get(/* TODO: isAuthenticated, */ prompts.get)
  .post(/* TODO: isAuthenticated, */ prompts.post);

module.exports = router;