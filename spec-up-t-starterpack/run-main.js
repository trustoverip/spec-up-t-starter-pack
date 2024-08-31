/**
 * Cross-Platform Execution: By using Node.js and the exec function, you can execute shell scripts in a way that works on both Unix-based systems and Windows.
 * 
 * Shell Command Adjustment: The enhanced script adjusts the shell command based on the detected platform, ensuring compatibility with Windows (using bash if available) and Unix-based systems (using sh).
 * 
 * This approach ensures that main.sh can be executed regardless of the operating system, provided that an appropriate shell environment is available on Windows.
 */

const { exec } = require('child_process');
const path = require('path');
const os = require('os');

// Path to the main.sh script
const mainScript = path.join(__dirname, 'main.sh');

// Determine the shell command based on the platform
const shellCommand = os.platform() === 'win32' ? `bash ${mainScript}` : `sh ${mainScript}`;

// Execute the main.sh script
exec(shellCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing main.sh: ${error.message}`);
        process.exit(1);
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
});