require('dotenv').config();

const addAllXrefs = require('spec-up-t/src/get-xrefs-data.js').addAllXrefs;

addAllXrefs(process.env.GITHUB_API_TOKEN);