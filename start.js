const { execSync } = require('child_process');

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Run the main script
console.log('Running the main script...');
require('./create-spec-up-t-starterpack.js');
