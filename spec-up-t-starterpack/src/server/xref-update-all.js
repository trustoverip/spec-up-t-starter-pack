require('dotenv').config();

const updateXrefs = require('spec-up-t/src/get-xrefs-data.js').updateXrefs;

updateXrefs(process.env.GITHUB_API_TOKEN, false);