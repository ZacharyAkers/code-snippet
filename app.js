const express           = require('express');
const validator         = require('express-validator');
const bodyParser        = require('body-parser');
const router            = require('./routes');
const session           = require('express-session')
const path              = require('path');
const mustacheExpress = require('mustache-express');

const app = express();

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());

app.set('views','./views');
app.set('view engine','mustache');

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use( validator() );

app.use(session({
  secret: 'asdouhwad',
  resave: false,
  saveUninitialized: false,
}));

app.set('port', (process.env.PORT || 3000 ) );

app.use(router);

if(require.main === module){
  app.listen( app.get('port'), () => console.log("App running on port",app.get('port')));
}

module.exports = app;