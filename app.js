var express = require('express');
var morgan = require('morgan');
var url = require('url'); // Add this line to import the 'url' module


var app = express();
app.use(morgan('dev'));
const port = 3300;

/**
 * @ArmanGrewal007
 * Handles fetch requests and generate appropriate SVG markups
 */

// Load icons object from icons.json
const icons = require('./public/dist/icons.json');
// List if unique icon names derived from our object keys
const iconNameList = [...new Set(Object.keys(icons).map(i => i.split('-')[0]))];
// A mapping of short names to full names
const shortNames = {
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    tailwind: 'tailwindcss',
    insta: 'instagram',
    vue: 'vuejs',
    nuxt: 'nuxtjs',
    go: 'golang',
    cf: 'cloudflare',
    wasm: 'webassembly',
    postgres: 'postgresql',
    k8s: 'kubernetes',
    next: 'nextjs',
    mongo: 'mongodb',
    md: 'markdown',
    ps: 'photoshop',
    ai: 'illustrator',
    pr: 'premiere',
    ae: 'aftereffects',
    scss: 'sass',
    sc: 'scala',
    net: 'dotnet',
    gatsbyjs: 'gatsby',
    gql: 'graphql',
    vlang: 'v',
    amazonwebservices: 'aws',
    bots: 'discordbots',
    express: 'expressjs',
    googlecloud: 'gcp',
    mui: 'materialui',
    windi: 'windicss',
    unreal: 'unrealengine',
    nest: 'nestjs',
    ktorio: 'ktor',
    pwsh: 'powershell',
    au: 'audition',
    rollup: 'rollupjs',
    rxjs: 'reactivex',
    rxjava: 'reactivex',
    ghactions: 'githubactions',
    // Theses were added by me (n - 62 + 1)
    es: 'elasticsearch',
    kb: 'kibana',
    lg: 'logstash',
    msd: 'msdos',
    nj: 'neo4j',
    gmp: 'gimp', // change to #F4F2ED
    pod: 'podman', // change to #F4F2ED
    grunt: 'gruntjs',
    debz: 'debezium',
    ub: 'ubuntu', // change to #F4F2ED
    rhel: 'rhel',
    deb: 'debian',
    cent: 'centos',
    arch: 'archlinux',
    app: 'apple',
    and: 'android',
    gentoo: 'gentoo',
    kaggle: 'kaggle',
    brew: 'homebrew',
    influx: 'influxdb',
    terra: 'terraform',
    travis: 'travisci',
    powerbi: 'powerbi',
};
// A list of icons with themes (light/dark)
const themedIcons = [
    ...Object.keys(icons)
        .filter(i => i.includes('-light') || i.includes('-dark'))
        .map(i => i.split('-')[0]),
];

const ICONS_PER_LINE = 15;
const ONE_ICON = 48;
const SCALE = ONE_ICON / (300 - 44);

// This function takes a list of icon names and number of icons perline,
// calcualtes dimensions of resulting SVG, and generates SVG markup by arranging
// icons in a grid
function generateSvg(iconNames, perLine) {
    const iconSvgList = iconNames.map(i => icons[i]);

    const length = Math.min(perLine * 300, iconNames.length * 300) - 44;
    const height = Math.ceil(iconSvgList.length / perLine) * 300 - 44;
    const scaledHeight = height * SCALE;
    const scaledWidth = length * SCALE;

    const svg =  `
  <svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    ${iconSvgList
            .map(
                (i, index) =>
                    `
        <g transform="translate(${(index % perLine) * 300}, ${Math.floor(index / perLine) * 300
                    })">
          ${i}
        </g>
        `
            )
            .join(' ')}
  </svg>
  `;
//   console.log(svg)
  return svg
}

// This function takes a list of icon shortnames and a theme, and returns a list of
// and returns a list of modified icon names with themes appended
function parseShortNames(names, theme = 'dark') {
    return names.map(name => {
        if (iconNameList.includes(name))
            return name + (themedIcons.includes(name) ? `-${theme}` : '');
        else if (name in shortNames)
            return (
                shortNames[name] +
                (themedIcons.includes(shortNames[name]) ? `-${theme}` : '')
            );
    });
}

// This is the main request handlind function, it parses the request URL and
// extracts parameters, then calls generateSvg() to generate the SVG markup
async function handleRequest(request) {
    // const fullUrl = `${request.protocol}://${request.get('host')}${request.originalUrl}`;
    // const { pathname, query } = new URL(fullUrl);

    const { pathname, query } = url.parse(request.url);

    const path = pathname.replace(/^\/|\/$/g, '');
    if (path === 'icons' || path === 'icon') {
        // const iconParam = query.get('i') || query.get('icons');
        const iconParam = query.includes('i=') ? query.split('i=')[1] : null;
        if (!iconParam || !query)
            return new Response("You didn't specify any icons!", { status: 400 });
        // const theme = query.get('t') || query.get('theme');
        const theme = query.includes('t=') ? query.split('t=')[1] : null;
        if (theme && theme !== 'dark' && theme !== 'light')
            return new Response('Theme must be either "light" or "dark"', {
                status: 400,
            });
        // const perLine = query.get('perline') || ICONS_PER_LINE;
        const perLine = query.includes('perline=') ? query.split('perline=')[1] : ICONS_PER_LINE;
        if (isNaN(perLine) || perLine < -1 || perLine > 50)
            return new Response('Icons per line must be a number between 1 and 50', {
                status: 400,
            });

        let iconShortNames = [];
        if (iconParam === 'all') iconShortNames = iconNameList;
        else iconShortNames = iconParam.split(/,|%2C/);

        const iconNames = parseShortNames(iconShortNames, theme || undefined);
        if (!iconNames)
            return new Response("You didn't format the icons param correctly!", {
                status: 400,
            });

        const svg = generateSvg(iconNames, perLine);

        return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
    } else if (path === 'api/icons') {
        return new Response(JSON.stringify(iconNameList), {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        });
    } else if (path === 'api/svgs') {
        return new Response(JSON.stringify(icons), {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        });
    } else {
        return fetch(request);
    }
}

app.get('/', (req, res) => {
    res.send('Give the path /icon?i="<icon_name>"');
})

app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

app.get('*', async (req, res) => {
    try {
        // const { pathname, query } = url.parse(req.url);
        // res.send(query);
        const response = await handleRequest(req);
        res.status(response.status).header('Content-Type', 'image/svg+xml').send(await response.text());
    } catch (err) {
        res.status(500).send(err.stack);
    }
});


app.listen(port, () => {
    console.log('Server started on port 3300');
})

module.exports = app;