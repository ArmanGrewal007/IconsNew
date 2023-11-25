var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));
const port = 3000;

app.get('/', (req,res)=>{
    res.send('Give the path /icon?i="<icon_name>"');
})

app.get('/icon', async (req, res) => {
    try {
        res.send('waesafeds')
    //   const response = await handleRequest(req);
    //   res.status(response.status).send(await response.text());
    } catch (err) {
      res.status(500).send(err.stack);
    }
  });

app.get('*', async (req, res) => { res.send('ERROR 404') });

app.listen(port, ()=>{
    console.log('Server started on port 3000');
})