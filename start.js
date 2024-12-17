const path = require('path');
const { execSync } = require('child_process');

// Use GitHub Actions environment variable
const cwd = process.env.GITHUB_WORKSPACE || process.cwd();

console.log(`Current working directory: ${cwd}`);

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit', cwd });

// Run the main script
console.log('Running the main script...');
require(path.join(cwd, 'create-spec-up-t-starterpack.js'));
