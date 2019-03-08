//. app3.js
var cfenv = require( 'cfenv' );
var express = require( 'express' );

var app = express();
var appEnv = cfenv.getAppEnv();

app.use( express.static( __dirname + '/public' ) );
app.use( express.Router() );

app.get( '/hello', function( req, res ){
  res.write( 'Hello Express.' );
  res.end();
});

var port = appEnv.port | 3000;
app.listen( port );

console.log( 'server starting on ' + port + ' ...' );

