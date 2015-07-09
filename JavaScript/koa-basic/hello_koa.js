var koa = require('koa');
var app = koa();

app.listen(port);

var port = process.argv[2];

app.use(function *() {
  this.body = 'hello';
});