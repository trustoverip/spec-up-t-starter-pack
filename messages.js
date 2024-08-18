// Message shown when setup is complete. Array with two strings.
const setupCompleteMessage = [
    `Spec-Up-T setup complete.\n\n
     Now cd into the directory that you just created and run "npm install" to install dependencies:\n\ncd `,
    `\n\nnpm install`];

// Message shown when directory already exists. Array with two strings.
const errorDirExistsMessage = [
    `The name you chose, ”`,
    `”, already exists. Exiting...`

];

module.exports = {
    setupCompleteMessage, errorDirExistsMessage
};