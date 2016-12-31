try {
  var AJAX = require('.');
} catch(e){
  var AJAX = require('ajax.js');
}

// Promise
AJAX.get('https://httpbin.org/get?a=1').then(console.log);

// Callback
AJAX.get('https://httpbin.org/get?a=1', null, (o)=>{
  console.log('lets try a callback..', o);
});

AJAX.post('https://httpbin.org/post', {data: {b: 2}}, (o)=>{
  console.log('lets try a POST..', o);
});

AJAX.post('https://httpbin.org/post', {data: {c: 3}, headers: {myMeta: 'data'}}, (o)=>{
  console.log('lets try a header..', o);
});