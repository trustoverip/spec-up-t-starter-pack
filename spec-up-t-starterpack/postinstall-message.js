// load path module
const path = require('path');
// get current directory name
const dirName = path.basename(process.cwd());

process.nextTick(() => {
    console.log(`
============

Read more about Spec-Up-T on https://trustoverip.github.io/spec-up-t-website/

Type the following and press ENTER: cd ${dirName}\n

and then…

Type the following and press ENTER: npm run menu

============
`);
});