export default function() {
  switch(window.location.host) {
    case 'localhost:3000': return 'DEV';
    // TODO: other environments here
    default: throw new Error('Environment not configured in environments/determineEnv');
  }
}