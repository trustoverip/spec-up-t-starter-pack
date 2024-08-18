// Message shown when setup is complete. Array with two strings.
const setupCompleteMessage = [

    `Spec-Up-T setup complete.\n\n
Read more about Spec-Up-T on https://blockchainbird.github.io/spec-up-t-website/\n\n
Now cd into the directory that you just created and run "npm install" to install dependencies:\n\n
cd `,

    `\n\nnpm install`

];

// Message shown when directory already exists. Array with two strings.
const errorDirExistsMessage = [

    `The name you chose, ”`,

    `”, already exists. Exiting...`

];

module.exports = {
    setupCompleteMessage, errorDirExistsMessage
};