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
const { config } = require('process');
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
    tableau: 'tableau',
    splunk: 'splunk',
    excel: 'msexcel',
    sv: 'systemverilog',
    ink: 'inkscape',
    medium: 'medium',
    dragonflybsd: 'dragonflybsd',
    dragonflydb: 'dragonflydb',
    osi: 'osi',
    oracledb: 'oracledb',
    sqlserver: 'mssqlserver',
    scylla: 'scylladb',
    snowflake: 'snowflakedb',
    dgraph: 'dgraph',
    couchbase: 'couchbase',
    couchdb: 'couchdb',
    math: 'mathematics',
    geogebra: 'geogebra',
    wa: 'webassembly',
    zookeeper: 'apachezookeeper',
    tkinter: 'pythontkinter',
    swing: 'javaswing',
    s3: 'awss3',
    lambda: 'awslambda',
    lambda2: 'awslambda2',
    rds: 'awsrds',
    dynamo: 'awsdynamodb',
    iam: 'awsiam',
    cloudfront: 'awscloudfront',
    cloudwatch: 'awscloudwatch',
    cognito: 'awscognito',
    sns: 'awssns',
    tf: 'tensorflow',
    ml: 'machinelearning',
    'c++': 'cpp',
    'c#': 'csharp',
    cs: 'csharp',
    gz: 'gzip',
    puml: 'plantuml',
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
    console.log(iconSvgList.length);
    const length = Math.min(perLine * 300, iconNames.length * 300) - 44;
    const height = Math.ceil(iconSvgList.length / perLine) * 300 - 44;
    const scaledHeight = height * SCALE;
    const scaledWidth = length * SCALE;

    const svg = `
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
    const { pathname, query } = url.parse(request.url, true); // `true` parses the query string automatically
    const path = pathname.replace(/^\/|\/$/g, ''); // Trim leading and trailing slashes

    if (path === 'icons' || path === 'icon') {
        const queryParams = new URLSearchParams(query); // Parse query parameters

        // Extract parameters
        const iconParam = queryParams.get('i'); // Get icons list
        const theme = queryParams.get('t') || 'dark'; // Default theme is dark
        const perLine = parseInt(queryParams.get('perline') || ICONS_PER_LINE, 10); // Default icons per line

        // Validate `iconParam`
        if (!iconParam) {
            return new Response("You didn't specify any icons!", { status: 400 });
        }

        // Validate `theme`
        if (theme !== 'dark' && theme !== 'light') {
            return new Response('Theme must be either "light" or "dark"', { status: 400 });
        }

        // Validate `perLine`
        if (isNaN(perLine) || perLine < 1 || perLine > 50) {
            return new Response('Icons per line must be a number between 1 and 50', { status: 400 });
        }

        // Parse icon short names
        const iconShortNames =
            iconParam === 'all'
                ? iconNameList.map(name => name.toLowerCase())
                : iconParam
                    .split(/,|%2C/)
                    .filter(name => name.trim() !== '')
                    .map(name => name.toLowerCase());


        if (iconShortNames.length === 0) {
            return new Response("You didn't specify any valid icons!", { status: 400 });
        }

        console.log('iconShortNames:', iconShortNames);

        // Map short names to full icon names with themes
        const iconNames = parseShortNames(iconShortNames, theme);
        if (!iconNames || iconNames.length === 0) {
            return new Response("No valid icons were found!", { status: 400 });
        }

        // Generate SVG markup
        const svg = generateSvg(iconNames, perLine);

        // Return SVG response
        return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
    } else if (path === 'api/icons') {
        return new Response(JSON.stringify(iconNameList), {
            headers: { 'content-type': 'application/json;charset=UTF-8' },
        });
    } else if (path === 'api/svgs') {
        return new Response(JSON.stringify(icons), {
            headers: { 'content-type': 'application/json;charset=UTF-8' },
        });
    } else {
        return new Response('Endpoint not found!', { status: 404 });
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