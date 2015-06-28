function loadem(fn){
  var s = document.createElement('script');
  s.src = chrome.extension.getURL(fn);
  s.onload = function() {
    this.parentNode.removeChild(this);
  };
  (document.head || document.documentElement).appendChild(s);
}

["ajax.js"].map(loadem);
