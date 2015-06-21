var AJAX = {};

(function (AJAX) {

  if(this.exports && !this.EventSource)
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
  AJAX.apis = function(s){
    var api = {};
    s.split('\n').forEach(function(c){
      var arr = c.split(' ');
      var name = arr.shift().split('.')
      api[name[0]] = api[name[0]] || {};
      api[name[0]][name[1]] = {};
      api[name[0]][name[1]].def = arr.join(' ');
      api[name[0]][name[1]].params = arr.join(' ').match(/{{.*}}/g);
    });
    return function(svc, name, data, cb){
      var def = api[svc][name].def;
      if(data){
        for(i in data) def = def.replace('{{'+i+'}}', data[i]);
      }
      def = def.split(' ');
      AJAX[def[0]](def[1], def[3], cb, JSON.parse(def[2]));
    }
  };
/*
  AJAX.get('https://gist.githubusercontent.com/digplan/73155e11484384b14110/raw',null, function(s){
    var callapi = AJAX.apis(s);
    callapi('httpbin', 'tryget', '', console.log.bind(console))
  })
*/
})(typeof exports !== 'undefined' ? exports : AJAX);
