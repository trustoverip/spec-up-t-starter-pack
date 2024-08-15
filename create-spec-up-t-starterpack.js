#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// Function to copy /spec directory, specs.json, and README.md to the target directory
async function setupSpecUpTStarterPack(dirName) {
    // The directory that will be the source for the starter pack
    const sourceDir = path.join(__dirname, 'spec-up-t-starterpack');
    const targetDir = path.join(process.cwd(), dirName);
    const readmeFile = path.join(targetDir, 'README.md');

    try {
        // Check if source files and directories exist
        if (await fs.existsSync(targetDir)) {
            console.error(`The name you chose, “${dirName}”, already exists. Exiting...`);
            process.exit(1);
        }

        // Copy 'spec-up-starterpack' directory
        await fs.copy(sourceDir, targetDir);

        // Rename path.join(sourceDir, 'gitignore') to path.join(targetDir, '.gitignore')
        if (await fs.existsSync(path.join(targetDir, 'gitignore'))) {
            await fs.rename(path.join(targetDir, 'gitignore'), path.join(targetDir, '.gitignore'));
        }

        // Replace'spec-up-t-starterpack' with the name of the target directory in README.md
        let data = await fs.readFile(readmeFile, 'utf8');
        const result = data.replace(/spec-up-t-starterpack/g, dirName);
        await fs.writeFile(readmeFile, result, 'utf8');

        console.log(`Spec-Up-T setup complete.\n\nNow cd into the directory that you just created and run "npm install" to install dependencies:\n\ncd ${dirName}\n\nnpm install`);
    } catch (err) {
        console.error(err);
    }
}

// Get the target directory from command line arguments or use current directory
const dirName = process.argv[2] || 'spec-up-t-starterpack';

setupSpecUpTStarterPack(dirName);
