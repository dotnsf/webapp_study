//. app5.js

//. Edit with valid username / password / dbname
var db_username = '';
var db_password = '';
var db_name = 'mydb';

var bodyParser = require( 'body-parser' );
var cfenv = require( 'cfenv' );
var express = require( 'express' );
var cloudantlib = require( '@cloudant/cloudant' );

var app = express();
var appEnv = cfenv.getAppEnv();

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( express.static( __dirname + '/public' ) );
app.use( express.Router() );

var db = null;
var cloudant = cloudantlib( { account: db_username, password: db_password } );
if( cloudant && db_name ){
  db = cloudant.db.use( db_name );
}

app.get( '/hello', function( req, res ){
  res.write( 'Hello Express.' );
  res.end();
});

var names = [];
app.post( '/item', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  if( db ){
    var doc = {};
    doc.name = req.body.name;
    db.insert( doc, function( err, body ){
      if( err ){
        res.status( 400 );
        res.write( JSON.stringify( { status: false, error: err } ) );
        res.end();
      }else{
        res.write( JSON.stringify( { status: true } ) );
        res.end();
      }
    });
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { status: false, error: 'db is failed to be initialized.' } ) );
    res.end();
  }
});

app.get( '/items', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  if( db ){
    db.list( { include_docs: true }, function( err, body ){
      if( err ){
        res.status( 400 );
        res.write( JSON.stringify( { status: false, error: err } ) );
        res.end();
      }else{
        var names = [];
        body.rows.forEach( function( item ){  //. item : { id: 'XXXX', rev: 'YYYY', doc: { _id: 'XXXX', _rev: 'YYYY', name: 'ZZZZ', ... } }
          names.push( item.doc.name );
        });
        res.write( JSON.stringify( { status: true, names: names } ) );
        res.end();
      }
    });
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { status: false, error: 'db is failed to be initialized.' } ) );
    res.end();
  }
});

var port = appEnv.port | 3000;
app.listen( port );

console.log( 'server starting on ' + port + ' ...' );
