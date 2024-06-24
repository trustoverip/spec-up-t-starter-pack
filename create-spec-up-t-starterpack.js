#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// Function to copy /spec directory, specs.json, and README.md to the target directory
function setupSpecUpTStarterPack(dirName) {
    // The directory that will be the source for the starter pack
    const sourceDir = path.join(__dirname, 'spec-up-t-starterpack');
    const targetDir = path.join(process.cwd(), dirName);
    const readmeFile = path.join(targetDir, 'README.md');

    // Check if source files and directories exist
    if (fs.existsSync(targetDir)) {
        console.error(`The name you chose, “${dirName}”, already exists. Exiting...`);
        process.exit(1);
    }

    // Copy 'spec-up-starterpack' directory
    execSync(`cp -r ${sourceDir} ${targetDir}`);

    // Replace'spec-up-t-starterpack' with the name of the target directory in README.md
    fs.readFile(readmeFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const result = data.replace(/spec-up-t-starterpack/g, dirName);

        fs.writeFile(readmeFile, result, 'utf8', (err) => {
            if (err) {
                console.error(err);
            }
        });
    });

    console.log(`Spec-Up-T starterpack setup complete.\n\nNow cd into the directory that you just created and run "npm install" to install dependencies:\n\ncd ${dirName}\n\nnpm install`);
}

// Get the target directory from command line arguments or use current directory
const dirName = process.argv[2] || 'spec-up-t-starterpack';

setupSpecUpTStarterPack(dirName);
