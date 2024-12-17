const { execSync } = require('child_process');

// Print the current working directory
console.log('Current working directory:', process.cwd());

// Print environment variables
console.log('Environment variables:', process.env);

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Run the main script
console.log('Running the main script...');
require('./create-spec-up-t-starterpack.js');