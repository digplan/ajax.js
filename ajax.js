var AJAX = {};

(function (AJAX) {
 
  if(this.exports && !this.EventSource)
    EventSource = require('eventsource');

  AJAX.method = function(verb, u, options, cb) {
    
    var resf = (res, rej)=>{
      if(!options) options = {};
      var XMLHttpRequest = typeof window !== 'undefined' ? window.XMLHttpRequest : require('xhr2');
      var x = new XMLHttpRequest();
      x.open(verb, u, true);
      if (options.data && typeof options.data === 'object') 
        options.data = JSON.stringify(options.data);
      if(options.data && options.data[0] !== '{') 
        x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      if(options && options.headers) 
        for(var k in options.headers) x.setRequestHeader(k, options.headers[k]);
      x.onload = function(r) {
        var resp = r.target.responseText;
        try { resp = JSON.parse(resp); } catch (e){}
        res(resp, x.status, x.getAllResponseHeaders().split(/\r?\n/));
      };
      x.send(verb == 'GET' ? null : options.data);
    };
    if(cb) return resf(cb, cb);
    return new Promise(resf);
    
  };

  AJAX.get = AJAX.method.bind(this, 'GET');
  AJAX.head = AJAX.method.bind(this, 'HEAD');
  AJAX.post = AJAX.method.bind(this, 'POST');
  AJAX.put = AJAX.method.bind(this, 'PUT');
  AJAX.delete = AJAX.method.bind(this, 'DELETE'); 
  AJAX.events = function(endpoint, cb){
    var e = new EventSource(endpoint);
    e.onmessage = function(ev){
      (cb||console.log.bind(console))(ev.data);
    };
    return {
      close: e.close
    };
  };
  AJAX.query = function(url, selector, cb){
    this.get(url, null, function(s){
      if(typeof window !== 'undefined' && DOMParser){
        var es = new DOMParser().parseFromString(s, 'text/html').querySelectorAll(selector);
        var a = [].slice.call(es).map(function(n){ return n.innerText });
        return cb(a, es);
      } else {
        cb('AJAX.query is not supported on nodejs or browsers without DOMParser');
      }
    });
  };
  
})(typeof exports !== 'undefined' ? exports : AJAX);
