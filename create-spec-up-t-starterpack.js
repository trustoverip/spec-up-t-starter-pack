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

        console.log(`${setupCompleteMessage[0]}`);

        /* ****************
            Hand over to the spec-up-t package, install.js
           **************** */

        const packageName = 'spec-up-t';
        const basePath = path.join(targetDir);
        const nodeModulesPath = path.join(basePath, 'node_modules');
        const packagePath = path.join(nodeModulesPath, packageName);

        // Change the current working directory to the target directory
        process.chdir(targetDir);

        /* ****************
            Select a content template
           **************** */

        // Prompt the user to choose a content template before copying boilerplate files.
        // selectTemplate() returns a template object from config-templates.js.
        // Setting process.env.SPEC_UP_T_TEMPLATE here makes install.js pick it up.
        const { selectTemplate } = require(path.join(packagePath, 'src', 'install-from-boilerplate', 'select-template.js'));
        const selectedTemplate = await selectTemplate();
        process.env.SPEC_UP_T_TEMPLATE = selectedTemplate.id;

        // Skip the postinstall message - we'll show our own after configuration
        process.env.SPEC_UP_T_SKIP_POSTINSTALL_MESSAGE = 'true';

        // Now require the installation script (copies boilerplate and adds scripts)
        require(path.join(packagePath, 'src', 'install-from-boilerplate', 'install.js'));

        /* ****************
            Run the interactive specs.json configuration (menu 6)
           **************** */

        console.log(`\n📝 Now let's configure your specs.json...\n`);
        
        // Prevent auto-run by setting environment variable BEFORE requiring the module
        process.env.SPEC_UP_T_CONFIGURATOR_AUTORUN = 'false';
        
        // Load the starterpack configurator (auto-run is disabled by env var)
        const { runStarterpackConfigurator } = require(path.join(packagePath, 'src', 'pipeline', 'configuration', 'configure-starterpack.js'));
        
        // Run the configurator and wait for it to complete
        await runStarterpackConfigurator();

        /* ****************
            Show completion message
           **************** */

        console.log(`
*************
✅ Setup complete!

Next:
👉 1: Type the following and press ENTER: cd ${dirName}
👉 2: Type the following and press ENTER: npm run menu
*************
`);


    } catch (err) {
        console.error('❌ Error during setup:', err);
        process.exit(1);
    }
}

// Start setup process with provided directory name
const dirName = process.argv[2] || 'spec-up-t-boilerplate';
setupSpecPack(dirName);
