# IconsNew

This site was forked from skillicons <br>
He used Webworkers, which I am not aware of <br>
1. I changed the code to use express.js for routing and url.parse() for parsing, added my own checks for parsing
2. Created a whole new project using `npm init`. Installed `npm i express morgan nodemon`
3. Created an express.js template in app.js and tested it using `nodemon app.js`
```js
var express = require('express');
var morgan = require('morgan');

const app = express()
app.use(morgan('dev'));
const port = 3300;

app.get('/', (req, res) => {
    res.send('Hello, World');
})

app.listen(port, () => {
    console.log('Server started on port 3300');
})
```
4. Added the icons, build.js --> which makes dist/icons.json and app.js --> which makes SVGs
5. Used `url.parse()` to parse URL, rest all logic was copy pasted (for changing themes, perline, genrating svgs)
6. Ran it locally and it ran fine
7. Installed vercel `npm i @vercel/node --save-dev` and `sudo npm i vercel`
8. You must have a vercel account, `vercel login` and select that on web (INTERFACE IS REAALLLLYY NICE)
9. Put all icons in `public` folder, make necessasry path changes in `build.js` and `app.js`.
10. Create a `index.js` in `api/` folder which will call our app.js script because vercel looks for that only (also express must run on a port another than 3000 because vercel dev runs on port 3000)
11. `vercel dev` will run the app on localhost:3000 where you can check it running
12. `vercel --prod` to push it to prod (your project on github)
13. Can also add github actions alongside repo, but I didn't add that
14. And debugged another issue where we were splitting on basis of ',' (on local we got localhost:3000/icons?i=es,lg) but on vercel we needed to split using '%2C' (on vercel we got localhost:3000/icons?i=es%2Clg)
15. Everything took me my whole saturday (Nov 25, 2023), URL also works (provided in side)
16. But still when I put that url in <img> tag, we get bad response. It says we are not returning .svg (Probably because we are returing svg in app.js to api/index.js to img tag, idk but I'm tired so won't continue this shit)


Test icon with icons-theta.vercel.app/icons?i=es
<img src="https://icons-theta.vercel.app/icons?i=es,lg,kb,&perline=1">
