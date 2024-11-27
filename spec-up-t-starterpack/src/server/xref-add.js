// // Version A: Get the term and external specification from the command line arguments
// const args = process.argv.slice(2);
// const term = args[0];
// const externalSpec = args[1];
// require('spec-up-t/src/get-xrefs-data.js').addAllXrefs(term, externalSpec);


// Version B: Get the term and external specification via step by step questions (interactive)
require('dotenv').config();
const readline = require('readline');
const addAllXrefs = require('spec-up-t/src/get-xrefs-data.js').addAllXrefs;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the term: ', (term) => {
    rl.question('Enter the external specification: ', (externalSpec) => {
        addAllXrefs(process.env.GITHUB_API_TOKEN);
        rl.close();
    });
});