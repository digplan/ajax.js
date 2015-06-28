ajax.js
=======

Simple Network Requests for browser and NodeJS.  This folder can be loaded as a Chrome Extension to include in
web pages.

<script src='ajax.js'></script>    
OR    
var AJAX = require('ajax.js');    

````
// Data is stringified and sent as is (not form encoded), if not a JS object, sends as form-encoded    
// Callback contains response object and status code.

AJAX.get(url, null, callback, headers);
AJAX.head(url, data, callback, headers);
AJAX.post(url, data, callback, headers);
AJAX.put(url, data, callback, headers);
AJAX.delete(url, data, callback, headers);
AJAX.method(VERB, url, data, callback, headers);
AJAX.events(url, callback);

// sse events
var events = AJAX.events('http://http-echo.com/stream');
setTimeout(function(){
	console.log('stopping');
	events.close();
}, 15000);

// get web page and query DOM (Browser only, not available for NodeJS)
AJAX.query(url, css_selector, callback)

// call APIs based on the simple API format
AJAX.get('https://gist.githubusercontent.com/digplan/73155e11484384b14110/raw', null, function(s){
  var callapi = AJAX.apis(s);
  callapi('httpbin', 'tryget', '', console.log.bind(console))
})
````
