const express = require('express');
const router = express.Router();
const io = require('../server');
const db = require('../models');

const fistToFiveStillActive = require('../modules/fistToFIveStillActive');

router.post('/', async (req, res) => {
  const requestBody = JSON.parse(req.body.payload);

  // TODO: Security measure: validate the X-Slack-Signature header value--if it doesn't match, don't respond with 200 OK
  const slackSignature = req.headers['x-slack-signature']; // TODO: what do I do with this?

  const prompt = requestBody.original_message.text;
  const promptId = Number(requestBody.callback_id); // specified in the client-side webhook declaration--identifies which prompt is being responded to

  console.log({ promptId });

  const stuResponse = requestBody.actions[0].selected_options[0].value;
  const fieldToUpdate = determineFieldToIncrementFrom(stuResponse);

  // Exception handling if a front-end dev adds a new option without updating the server side
  if (fieldToUpdate instanceof Error) {
    console.error(fieldToUpdate);
    return res.json({
      "response_type": "ephemeral",
      "replace_original": true,
      "text": `The server was not able to process your answer. Our development team is on it! Challenge question: where do you think the application went wrong?`
    });
  }

  // Find the Prompt record at the callback id
  const promptToUpdate = await db.Prompt
    .findOne({ where: { id: promptId }})
    .catch(error => console.log('Something went wrong trying to find the prompt by id: ', error));

  // Respond with out-of-time message if Fist To Five no longer active
  if (!fistToFiveStillActive(promptToUpdate.promptCreatedAt)) {
    return res.json({
      "response_type": "ephemeral",
      "replace_original": true,
      "text": "Sorry, you ran out of time to answer that Fist To Five. Your TAs are standing by for help, so don't hesitate to ask!"
    });
  }

  // Sum the responses
  const responses = promptToUpdate.fists
    + promptToUpdate.ones
    + promptToUpdate.twos
    + promptToUpdate.threes
    + promptToUpdate.fours
    + promptToUpdate.fives;

  const updateData = {
    [fieldToUpdate]: promptToUpdate[fieldToUpdate] + 1,
    responses
  }; // increment the appropriate field
  const updatedPrompt = await promptToUpdate
    .update(updateData)
    .catch(error => console.error('Something went wrong updating the prompt record: ', error));

  // Formulate response to Slack
  const numericalRes = numericalResponseFrom(stuResponse);

  // Exception handling if a front-end dev adds a new option without updating the server side
  if (numericalRes instanceof Error) {
    console.error(numericalRes);
    return res.json({
      "response_type": "ephemeral",
      "replace_original": true,
      "text": `The server was not able to process your answer. Our development team is on it! Challenge question: where do you think the application went wrong?`
    });
  }

  // Emit the updated prompt to subscribed sockets
  io.to(`promptId_${updatedPrompt.id}`).emit('subscribeToFistToFive', updatedPrompt);

  // Slack Responses
  let conditionalText = `🎉 That's awesome! Now's your chance to further your understanding by explaining it to fellow students! *#learnByTeaching*`;
  if (numericalRes <= 3) conditionalText = `It's perfectly understandable to still be digesting it. This stuff is hard! Feel free to reach out during office hours for help, and if everybody's a little shaky, we'll spend some more time on it.`

  return res.json({
    "response_type": "ephemeral",
    "replace_original": true,
    "text": `You responded *${stuResponse}* to *${prompt}*. ${conditionalText}`
  });
});

module.exports = router;

function numericalResponseFrom(response) {
  switch(response) {
    case "Fist": return 0;
    case "One": return 1;
    case "Two": return 2;
    case "Three": return 3;
    case "Four": return 4;
    case "Five": return 5;
    default: return new Error(`1Unhandled exception: numerical response convertor received value it didn\'t expect: ${response}`);
  }
}

function determineFieldToIncrementFrom(response) {
  switch(response) {
    case "Fist": return "fists";
    case "One": return "ones";
    case "Two": return "twos";
    case "Three": return "threes";
    case "Four": return "fours";
    case "Five": return "fives";
    default: return new Error(`Unhandled exception: response -> field-to-increment convertor received value it didn\'t expect: ${response}`);
  }
}