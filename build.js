/**
 * @ArmanGrewal007
 * Process icons directory and create icons.json file in dist directory
 */

const fs = require('fs');

// Synchronously read contents of icons directory, and stores list of files in iconsDir
const iconsDir = fs.readdirSync('./icons');
// Loop through each .svg file and populate icons object with elasticsearch-dark:SVG_CONTENT pairs
const icons = {};
for (const icon of iconsDir) {
  const name = icon.replace('.svg', '').toLowerCase();
  icons[name] = String(fs.readFileSync(`./icons/${icon}`));
}
// Create a dist directory if it doesn't exist, then write our data to icons.json in that directory
if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');
fs.writeFileSync('./dist/icons.json', JSON.stringify(icons));
