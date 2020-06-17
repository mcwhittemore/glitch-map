var GlitchImage = require('./glitch-image');

var accessToken = 'pk.eyJ1IjoibWN3aGl0dGVtb3JlIiwiYSI6IjI5Y2dTd1UifQ.7nBmjzRZ4M3bzEwoo3YIAQ';

var mymap = L.map('map').setView([43.790833, -71.411111], 12);

var tileUrl = 'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';

var attr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';

var layer = L.tileLayer(tileUrl, {
    attribution: attr,
    maxZoom: 18,
    id: 'satellite-streets-v11',
    accessToken: accessToken
  });

var base = layer.createTile.bind(layer);
layer.createTile = function(p, done) {
  done = done.bind(this);
  var url = this.getTileUrl(p);
  var o = GlitchImage(url);
  o.onload = function() {
    o.classList.add('leaflet-tile-loaded');
  }
  return o;
};

layer.addTo(mymap);

