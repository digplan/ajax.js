var AJAX = {};

(function (AJAX) {

  var json2qs = function(o) {
    if (typeof o !== 'object') return o;
    var a = [];
    for (i in o) a.push(i + '=' + o[i]);
    return a.join('&');
  }
  
  AJAX.method = function(verb, u, d, cb) {
    var XMLHttpRequest = typeof window !== 'undefined' ? window.XMLHttpRequest : require('xhr2');

    var x = new XMLHttpRequest;

    if (verb == 'GET') u = u + '?' + json2qs(d);

    x.open(verb, u, true);

    if (verb != 'GET') {
      x.setRequestHeader('accept', 'application/json');
      x.setRequestHeader('Content-type', 'application/json');
      if (typeof d === 'object') d = JSON.stringify(d);
    }

    try {
      x.send(d);
    } catch(e){
      cb('AJAX.js network error cannot connect');
    }

    x.onload = function(r) {
      var resp = r.target.responseText;
      try {
        resp = JSON.parse(resp);
      } catch (e) {

      }
      var status = r.target.status;
      (cb || console.log.bind(console))(status.toString()[0] == "2" ? null : status, r.target, resp);
    };
    
  }

  AJAX.get = AJAX.method.bind(this, 'GET');
  AJAX.head = AJAX.method.bind(this, 'HEAD');
  AJAX.post = AJAX.method.bind(this, 'POST');
  AJAX.put = AJAX.method.bind(this, 'PUT');
  AJAX.delete = AJAX.method.bind(this, 'DELETE');

  if(typeof window === 'undefined') return;

  AJAX.load = function(src, cb){
    var css = s.match(/css$/);
    var i = document.body.appendChild(document.createElement(css ? 'link' : 'script'));
    i.onload = cb;
    if (css)
      css.rel = "stylesheet";
    i[css ? 'href' : 'src'] = src;
    css && cb && cb();
  }

})(typeof exports !== 'undefined' ? exports : AJAX);
