// load path module
const path = require('path');
// get current directory name
const dirName = path.basename(process.cwd());

// postinstall-message.js
console.log(`\n\n\n============`);
console.info(`\n   Type the following and press ENTER: cd ${dirName}\n`);
console.log(`and then…`);
console.log(`\n   Type the following and press ENTER: npm run menu\n`);
console.log(`============\n\n\n`);