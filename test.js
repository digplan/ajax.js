var AJAX = require('./ajax.js');
var baseURI = 'http://http-echo.com';

AJAX.get(baseURI, {}, function(e, r, b){
  console.log(e, r, b);
});
/*
AJAX.head(baseURI, {}, function(e, r, b){
  console.log(r._headers);
});

AJAX.post(baseURI, {}, function(r, x){
  console.log(r);
});

AJAX.put(baseURI, {}, function(r, x){
  console.log(r);
});

AJAX.delete(baseURI, {}, function(r, x){
  console.log(r);
});
*/