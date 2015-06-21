ajax.js
=======

[![Join the chat at https://gitter.im/digplan/ajax.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/digplan/ajax.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Simple Network Requests for browser and NodeJS

<script src='ajax.js'></script>    
OR    
var AJAX = require('ajax.js');    

````
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
````

Data is stringified and sent as is (not form encoded), if not a JS object, sends as form-encoded    
Callback contains response object and status code.
