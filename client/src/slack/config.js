module.exports = {
  DEV: {
    callbackID: 'http://7e7ad2c3.ngrok.io', // TODO: enter your development ngrok url here from the Interactive Components page
    responseUrl: 'https://hooks.slack.com/services/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',
    channel: 'fisttofive' // TODO: enter the channel you configured to receive Interactive Messages (the demo uses 'fisttofive')
  },
  PROD: {
    callbackID: 'https://trilogy-fist-to-five.herokuapp.com',
    responseUrl: 'https://hooks.slack.com/services/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',
    channel: 'fisttofive'
  }
}