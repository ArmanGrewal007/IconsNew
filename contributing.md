## Steps for contribution

1. Clone the git repo - `git clone git@github.com:ArmanGrewal007/IconsNew.git`
2. Add an icon of your choice (must be a 256x256 svg) and put it in `./public/icons`.
  1. Its name should be `<something>-Dark.svg` (necessary) or `<something>-Light.svg` (optional).
  2. You can add `<rect width="256" height="256" fill="#242938" rx="60" />` for dark and `<rect width="256" height="256" fill="#ffff" rx="60" />` for light
  3. Your added SVG must not have a `<?xml version="1.0" encoding="UTF-8"?>` header, because we are combining these SVGs to a final SVG (according to query passed by user that how many icons be rendered), and only that final SVG should have this header, not each individual parts of it!
4. Must change the `const shortnames = {}` object in `app.js`
5. Must run `node build.js` to update `./dist/icons.json` file **(VERY IMPORTANT BECAUSE `app.js` GENRATES FINAL SVG BY READING FROM THIS JSON FILE ONLY)**
6. Must run `new.py` to automatically generate a table in `output.html`, which you can copy and paste here in our [README.md](README.md). **Note that this run is important because we are writing icons in README.md in sorted order, and in 3 columns. It is possible that you added Elasticsearch, and if you try to do it manually, you need to change all rows below it. I have given you an automated solution to that—just run `new.py`.**

TIPS - 
1. You can run locally using `nodemon app.js` --> on https://localhost:3330/icons?i=es
2. Or you can use `vercel dev` to check your vercel build --> It runs on port 3000 and calls `./api/index.js` which in-turn calls our `app.js` which is based on express.js and runs on port 3300, so final output will be on https://localhost:3000/icons?i=es
3. You can write names of files to ignore in `.gitignore` file 
