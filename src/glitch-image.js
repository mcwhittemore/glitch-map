var rand = require('./rand');
var byebyte = require('byebyte');
var Buffer = require('buffer/').Buffer;

module.exports = function(url) {
  var real = document.createElement('img');
  real.crossOrigin = 'Anonymous';
  var glitch = document.createElement('img');

  real.onload = function(){
    var tmp = document.createElement('canvas');
    var ctx = tmp.getContext('2d');
    tmp.width = real.width;
    tmp.height = real.height;
    ctx.drawImage(real, 0, 0);
    process(glitch, tmp, ctx);
  };
  real.src = url

  return glitch;
};

function process(img, canvas, ctx) {
  canvas.toBlob(function(blob) {
    var fileReader = new FileReader();
    fileReader.onload = function() {
      var arrayBuffer = this.result;
      var buffer  = Buffer.from(arrayBuffer);
      var min = rand(5,85) / 100;
      var result = byebyte.destroy(buffer, {
        min: min,
        max: min + .1
      });

      var fb = new Blob([result.buffer]);
      var url = URL.createObjectURL(fb);
      var broken = document.createElement('img');
      broken.onload = function() {
        ctx.drawImage(broken, 0, 0);
        canvas.toBlob(function(blob) {
          var url = URL.createObjectURL(blob);
          if (img.parentElement !== null) {
            img.src = url;
            requestAnimationFrame(function() {
              process(img, canvas, ctx);
            });
          }
        });
      };
      broken.src = url;
    };
    fileReader.readAsArrayBuffer(blob);
  });
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

