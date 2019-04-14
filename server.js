const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const sequelize = require('./models').sequelize;
const socketIO = require('socket.io');

sequelize.sync({ force: false }).then(() => {
  const server = app.listen(PORT, () => console.info(`✊  ✌️  ✋  running on ${PORT}`));
  const io = socketIO(server);

  io.sockets.on('connection', socket => {
    console.info('🌐  Websocket connection established.');
    socket.on('subscribeToFistToFive', id => {
      socket.join(`promptId_${id}`);
    });
  });

  // After config, export singleton io instance for consumption in controllers
  module.exports = io;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.use('/api', require('./api'));
  app.use('/slack', require('./slack'));

  if (process.env.NODE_ENV === 'production') {
    express.static('client/build');
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'client/build/index.html')));
  }

}).catch(error => console.error('Could not sync Sequelize with database: ', error));