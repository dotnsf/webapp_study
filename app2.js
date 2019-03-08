//. app2.js
var express = require( 'express' );

var app = express();

app.use( express.Router() );

app.get( '/hello', function( req, res ){
  res.write( 'Hello Express.' );
  res.end();
});

var port = 3000;
app.listen( port );

console.log( 'server starting on ' + port + ' ...' );

