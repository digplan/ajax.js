var AJAX = {};
AJAX.version = '2015.07.05';

(function (AJAX) {

  if(!this.exports && !this.EventSource)
    EventSource = require('eventsource');

  AJAX.method = function(verb, u, d, cb, headers) {
    var XMLHttpRequest = typeof window !== 'undefined' ? window.XMLHttpRequest : require('xhr2');
    var x = new XMLHttpRequest;
    x.open(verb, u, true);

    if (typeof d === 'object') 
      d = JSON.stringify(d);

    if(d && d[0] !== '{')
      x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if(headers)
      for(var k in headers) x.setRequestHeader(k, headers[k]);

    if(verb == 'GET') d = null;
    x.send(d);
    x.onload = function(r) {
      var resp = r.target.responseText;
      try {
        resp = JSON.parse(resp);
      } catch (e) {}
      (cb || console.log.bind(console))(resp, x.status, x.getAllResponseHeaders().split(/\r?\n/));
    };

  }

  AJAX.get = AJAX.method.bind(this, 'GET');
  AJAX.head = AJAX.method.bind(this, 'HEAD');
  AJAX.post = AJAX.method.bind(this, 'POST');
  AJAX.put = AJAX.method.bind(this, 'PUT');
  AJAX.delete = AJAX.method.bind(this, 'DELETE'); 
  AJAX.events = function(endpoint, cb){
    var e = new EventSource(endpoint);
    e.onmessage = function(ev){
      (cb||console.log.bind(console))(ev.data);
    }
    return {
      close: e.close
    }
  };
  AJAX.query = function(url, selector, cb){
    this.get(url, null, function(s){
      if(typeof window !== 'undefined' && DOMParser)
        return cb(new DOMParser().parseFromString(s, 'text/html').querySelectorAll(selector));
      else
        cb('AJAX.query is not supported on nodejs or browsers without DOMParser');
    });
  }
})(typeof exports !== 'undefined' ? exports : AJAX);
