// server.js
var express = require('express');

app = express();
app.use('/images', express.static(__dirname + '/images'));
app.listen(3000);
