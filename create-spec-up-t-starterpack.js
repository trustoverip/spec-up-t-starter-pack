#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to copy /spec directory, specs.json, and README.md to the target directory
function setupSpecUpTStarterPack(targetDir) {
    const starterFilesDir = path.join(__dirname, 'spec-up-t-starterpack');

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Check if source files and directories exist
    if (!fs.existsSync(starterFilesDir)) {
        console.error(`Source directory ${starterFilesDir} does not exist.`);
        process.exit(1);
    }

    // Copy 'spec-up-starterpack' directory
    execSync(`cp -r ${starterFilesDir} ${targetDir}`);

    console.log('Spec-Up-T starterpack setup complete.\n\nNow cd into the directory and run "npm install" to install dependencies:\n\ncd spec-up-starterpack\n\nnpm install\n');
}

// Get the target directory from command line arguments or use current directory
const targetDir = process.argv[2] || process.cwd();

setupSpecUpTStarterPack(targetDir);
