require('dotenv').config();

const updateXrefs = require('spec-up-t/src/get-xtrefs-data.js').updateXTrefs;

updateXrefs(process.env.GITHUB_API_TOKEN, true);