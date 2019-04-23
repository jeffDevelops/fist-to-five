import determineEnv from '../environments/determineEnv';
import config from './config';

export default (prompt, user, promptId, channel) => {
  const callback_id = config[determineEnv()].callbackId;
  const response_url = config[determineEnv()].responseUrl;
  return {
    "title": `${prompt}`,
    "type": "interactive_message",
    "text": `${prompt}`,
    "callback_id": callback_id,
    "response_type": "ephemeral",
    "response_url": response_url,
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
  }
}