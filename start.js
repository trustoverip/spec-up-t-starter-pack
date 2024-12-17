const { execSync } = require('child_process');
const path = require('path');

// Print the current working directory
console.log('Current working directory:', process.cwd());

// Print environment variables
console.log('Environment variables:', process.env);

// Change to the correct directory if needed
const correctDir = path.resolve(__dirname, '..');
if (process.cwd() !== correctDir) {
    console.log(`Changing working directory to ${correctDir}`);
    process.chdir(correctDir);
}

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Run the main script
console.log('Running the main script...');
require('./create-spec-up-t-starterpack.js');