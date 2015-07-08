ajax.js
=======

Simple Network Requests for browser and NodeJS.  This folder can be loaded as a Chrome Extension to include in
web pages.

<script src='ajax.js'></script>    
OR    
var AJAX = require('ajax.js');    

````
<script src="ajax.js"></script>
 
$ npm i digplan/ajax.js
var AJAX = require('ajax.js')
 
// Data is stringified and sent as is (not form encoded), if not a JS object, sends as form-encoded    
// Callback contains response object and status code.
 
AJAX.get(url, null, callback, headers);
AJAX.head(url, data, callback, headers);
AJAX.post(url, data, callback, headers);
AJAX.put(url, data, callback, headers);
AJAX.delete(url, data, callback, headers);
AJAX.patch(url, data, callback, headers);
AJAX.method(VERB, url, data, callback, headers);
 
// sse events
var events = AJAX.events('http://myserver/sse', function(e) { console.log(e) });
setTimeout(function(){
    console.log('stopping');
    events.close();
}, 15000)
 
// get web page and query DOM (Browser only, not available for NodeJS)
AJAX.query(url, css_selector, function(a, nodes){
  // array of innerHTML of nodes, nodelist
  console.log(a, nodes);
})
 
// use proxy for sites that don't use CORS
// a proxy server should fetch requests on clients behalf
// and echo the response in this format 'https://myproxyserver/https://google.com'
AJAX.proxy = 'https://myproxyserver';
````
