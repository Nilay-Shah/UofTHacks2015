var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var moment = require('moment');
var path = require('path');
var request = require('request');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});