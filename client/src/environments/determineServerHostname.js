import determineEnv from './determineEnv';

export default function() {
  switch (determineEnv()) {
    case 'DEV': return 'http://localhost:3001';
    // Other environements here
    default: throw new Error('Environment not configured in determineServerHostname');
  }
}