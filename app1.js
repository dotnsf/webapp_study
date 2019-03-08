//. app1.js
var name = 'World';
if( process.argv.length > 2 ){
  name = process.argv[2];
}
console.log( 'Hello ' + name + '.' );

