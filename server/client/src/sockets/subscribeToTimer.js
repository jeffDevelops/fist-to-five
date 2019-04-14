import openSocket from 'socket.io-client';
import determineServerHostname from '../environments/determineServerHostname';

const openConnection = () => openSocket(determineServerHostname());

function subscribeToTimer(cb) {
  const socketConnection = openConnection();
  socketConnection.on('timeRemaining', timestamp => cb(null, timestamp));
  socketConnection.emit('subscribeToTimer', 1000);
}

export default subscribeToTimer;