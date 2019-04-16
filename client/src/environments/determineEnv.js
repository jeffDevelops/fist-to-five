export default function() {
  switch(window.location.host) {
    case 'localhost:3000': return 'DEV';
    case 'trilogy-fist-to-five.herokuapp.com': return 'PROD';
    // TODO: other environments here
    default: throw new Error('Environment not configured in environments/determineEnv');
  }
}