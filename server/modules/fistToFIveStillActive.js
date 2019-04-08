const responseTimeLimit = require('../config/responseTimeLimit');
const moment = require('moment');

module.exports = function(dbTimestamp) {
  const now = moment().local();
  const nowFormatted = now.format("dddd, MMMM Do YYYY, h:mm:ss a");

  const convertedTimestamp = moment(dbTimestamp).local();
  const convertedTimestampFormatted = convertedTimestamp.format("dddd, MMMM Do YYYY, h:mm:ss a");

  console.log({ nowFormatted, convertedTimestampFormatted });

  const secondsPassed = moment.duration(now.diff(convertedTimestamp)).as('seconds');

  console.log({ secondsPassed });

  if (secondsPassed > responseTimeLimit) return false;
  return true;
}