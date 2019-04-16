export default (prompt, user, promptId, channel) => ({
  "title": `${prompt}`,
  "type": "interactive_message",
  "text": `${prompt}`,
  "callback_id": "https://trilogy-fist-to-five.herokuapp.com/slack",
  "response_type": "ephemeral",
  "response_url": "https://hooks.slack.com/services/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",
  "channel": "@Jeffery Reynolds",
  "attachments": [
    {
      "attachment_type": "default",
      "color": "#32D7EE",
      "text": `Fist To Five, how well do you understand *${prompt}*? Your response is anonymous, and is used to fuel topics for future review sessions.`,
      "author_name": `Prompted by: ${user.userAccount.firstName} ${user.userAccount.lastName}`,
      "callback_id": `${promptId}`, // This field is used to tell Sequelize which prompt the answer to the Slack message is referring to
      "actions": [
        {
          "name": "action",
          "type": "select",
          "text": "Fist To Five?",
          "options": [
            {
              "text": "Fist",
              "value": "Fist",
            },
            {
              "text": "One",
              "value": "One",
            },
            {
              "text": "Two",
              "value": "Two",
            },
            {
              "text": "Three",
              "value": "Three",
            },
            {
              "text": "Four",
              "value": "Four",
            },
            {
              "text": "Five",
              "value": "Five",
            }
          ]
        },
      ]
    }
  ]
})