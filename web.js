// web.js
var express = require("express");
var app = express();
var request = require("request");

app.configure(function(){
  app.set('view engine','html');
  app.set('view options',{layout:true});
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/static', { maxAge: oneYear }));
  app.use(express.errorHandler());
});

app.get('/oembed/:tid', function(req, res) {
  var uri = 'https://embed.spotify.com/oembed/?url=spotify:track:' + req.params.tid;
  var thumb;
  request.get({url:uri, json:true, headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36'}}, function (e, r, data) {
    console.log('data: ' + data.thumbnail_url);
    thumb = data.thumbnail_url.replace('/cover/', '/120/');
    res.send('{ "thumbnail_url": "' +  thumb + '" }');
  })
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});