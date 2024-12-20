#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const { setupCompleteMessage, errorDirExistsMessage } = require('./messages.js');

// Main setup function
async function setupSpecPack(dirName) {
    const sourceDir = path.join(__dirname, 'spec-up-t-starterpack');
    const targetDir = path.join(process.cwd(), dirName);

    try {
        if (fs.existsSync(targetDir)) {
            console.error(`${errorDirExistsMessage[0]}${dirName}${errorDirExistsMessage[1]}`);
            process.exit(1);
        }

        // Copying starter pack files
        await copyStarterPack(sourceDir, targetDir);
        await renameGitignore(targetDir);
        await updateReadme(dirName, targetDir);

        console.log(`${setupCompleteMessage[0]}`);

        // Run git init
        console.log(`Initialize git repository`);
        execSync(`git init`, { cwd: targetDir, stdio: 'inherit' });
        console.log(`Git repository initialized`);

        // Install dependencies with npm
        console.log(`Using npm to install dependencies.`);

        // Suppress npm audit and fund messages in the project-specific .npmrc
        const npmrcPath = path.join(targetDir, '.npmrc');
        await fs.writeFile(npmrcPath, 'audit=false\nfund=false\n', 'utf8');

        // Run npm install
        // execSync(`npm install`, { cwd: targetDir, stdio: 'inherit' });
        execSync(`npm install --silent`, { cwd: targetDir, stdio: 'inherit' });


    } catch (err) {
        console.error('Error during setup:', err);
        process.exit(1);
    }
}

// Helper function to copy files
async function copyStarterPack(source, target) {
    await fs.copy(source, target);
}

// Helper function to rename gitignore
async function renameGitignore(targetDir) {
    const gitignorePath = path.join(targetDir, 'gitignore');
    const dotGitignorePath = path.join(targetDir, '.gitignore');
    if (await fs.existsSync(gitignorePath)) {
        await fs.rename(gitignorePath, dotGitignorePath);
    }
}

// Helper function to update README
async function updateReadme(dirName, targetDir) {
    const readmeFile = path.join(targetDir, 'README.md');
    const data = await fs.readFile(readmeFile, 'utf8');
    const result = data.replace(/spec-up-t-starterpack/g, dirName);
    await fs.writeFile(readmeFile, result, 'utf8');
}

// Start setup process with provided directory name
const dirName = process.argv[2] || 'spec-up-t-starterpack';
setupSpecPack(dirName);
