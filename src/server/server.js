import express from 'express';
// import graphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
// import {mongo} from './mongoService';
import Schema from './Data/Schema';
import bodyParser from 'body-parser';
import log from "../shared/consoleLog"

const APP_PORT = 3000;
const app = express();

// set up Jade
app.set('views', './views');  
app.set('view engine', 'jade');

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  // execute GraphQL!
  log(req.body);
  graphql(Schema, req.body)
    .then( result => res.send(JSON.stringify(result, null, 2)));
});

app.get('/', function (req, res) {
  var query = '{ users {id,name}}';
  graphql(Schema, req.body)
    .then( result => {
      res.render('index', { content: 'Users' });  
    });
  });

app.listen(APP_PORT, 
  () => log(`Example app listening at http://localhost:${APP_PORT}`));