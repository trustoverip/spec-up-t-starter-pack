#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const { setupCompleteMessage, errorDirExistsMessage } = require('./messages.js');

// Main setup function
async function setupSpecPack(dirName) {
    const packageSpecUpT = path.join(__dirname, 'package.spec-up-t.json');
    const targetDir = path.join(process.cwd(), dirName);

    try {

        /* ****************
            Handle file system operations
           **************** */

        if (fs.existsSync(targetDir)) {
            console.error(`❌ ${errorDirExistsMessage[0]}${dirName}${errorDirExistsMessage[1]}`);
            process.exit(1);
        }
                
        // Create targetDir if it doesn't exist
        if (!fs.existsSync(targetDir)) {
            await fs.mkdir(targetDir);
            console.log(`✅ Created directory: ${dirName}`);
        }


        /* ****************
            Initialize Git
           **************** */

        // Run git init
        console.log(`ℹ️ Initialize git repository`);
        execSync(`git init`, { cwd: targetDir, stdio: 'inherit' });
        console.log(`✅ Git repository initialized`);


        /* ****************
            Initialize NPM
           **************** */

        // Copy package.spec-up-t.json to targetDir
        await fs.copy(packageSpecUpT, path.join(targetDir, 'package.json'));

        console.log(`ℹ️ Using npm to install dependencies`);

        // Suppress npm audit and fund messages in the project-specific .npmrc
        const npmrcPath = path.join(targetDir, '.npmrc');
        await fs.writeFile(npmrcPath, 'audit=false\nfund=false\n', 'utf8');

        // Run npm install
        // execSync(`npm install`, { cwd: targetDir, stdio: 'inherit' });
        execSync(`npm install --silent`, { cwd: targetDir, stdio: 'inherit' });

        console.log(`✅ ${setupCompleteMessage[0]}`);

        /* ****************
            Hand over to the spec-up-t package, install.js
           **************** */

        const packageName = 'spec-up-t';
        const basePath = path.join(targetDir);
        const nodeModulesPath = path.join(basePath, 'node_modules');
        const packagePath = path.join(nodeModulesPath, packageName);

        require(path.join(packagePath, 'src', 'install-from-boilerplate', 'install.js'));


    } catch (err) {
        console.error('❌ Error during setup:', err);
        process.exit(1);
    }
}

// Start setup process with provided directory name
const dirName = process.argv[2] || 'spec-up-t-boilerplate';
setupSpecPack(dirName);
