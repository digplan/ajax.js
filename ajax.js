var AJAX = {};

(function (AJAX) {

  var json2qs = function(o) {
    if (typeof o !== 'object') return o;
    var a = [];
    for (i in o) a.push(i + '=' + o[i]);
    return a.join('&');
  }
  
  AJAX.prototype.method = function(verb, u, d, cb) {
    if(typeof window === 'undefined')  // node.js
      var XMLHttpRequest = require('xhr2');
    var x = new XMLHttpRequest;
    if (verb == 'GET') u = u + '?' + json2qs(d);
    x.open(verb, u, true);
    if (verb != 'GET') {
      x.setRequestHeader('accept', 'application/json');
      x.setRequestHeader('Content-type', 'application/json');
      if (typeof d === 'object') d = JSON.stringify(d);
    }
    x.send(d);
    x.onload = function(r) {
      var resp = r.target.responseText;
      try {
        resp = JSON.parse(resp);
      } catch (e) {}
      (cb || console.log.bind(console))(resp, r.target);
    };
  }

  AJAX.prototype.get = Ajax.prototype.method.bind(this, 'GET');
  AJAX.prototype.head = Ajax.prototype.method.bind(this, 'HEAD');
  AJAX.prototype.post = Ajax.prototype.method.bind(this, 'POST');
  AJAX.prototype.put = Ajax.prototype.method.bind(this, 'PUT');
  AJAX.prototype.delete = Ajax.prototype.method.bind(this, 'DELETE'); 
  
})(typeof exports !== 'undefined' ? exports : AJAX);
