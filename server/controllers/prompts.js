const db = require('../models');

async function get(req, res) {
  console.log({ promptsGetController: req.body })
}

async function post(req, res) {
  const { prompt, cohort, promptedBy } = req.body;

  const newPrompt = {
    prompt: prompt.prompt,
    promptCreatedAt: db.Sequelize.fn('NOW'),
    cohort,
    promptedBy,
  }

  db.Prompt.create(newPrompt)
    .then(createdPrompt => res.json(createdPrompt))
    .catch(error => {
      console.error(error);
      return res.status(500).json({ error });
  });
}

module.exports = {
  get,
  post
}