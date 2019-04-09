//. app6.js
var bodyParser = require( 'body-parser' );
var cfenv = require( 'cfenv' );
var express = require( 'express' );

var app = express();
var appEnv = cfenv.getAppEnv();

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( express.static( __dirname + '/public' ) );
app.use( express.Router() );

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

var names = [];

app.get( '/', function( req, res ){
  res.render( 'index6', { names: names } );
});

app.post( '/item', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  var name = req.body.name;
  names.push( name );

  res.write( name );
  res.end();
});

/*
app.get( '/items', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  res.write( JSON.stringify( names ) );
  res.end();
});
*/

var port = appEnv.port | 3000;
app.listen( port );

console.log( 'server starting on ' + port + ' ...' );

