var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var moment = require('moment');
var path = require('path');
var request = require('request');
//require the Twilio module and create a REST client
var client = require('twilio')('AC701c5089cab000c0049d169ded1a82e0', '96a9f6f51fc65e380f6392200a64f1ba');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/')));

app.post('/twilio_endpoint', function(req, res) {
	// var msg = req.params;
	console.log(req.body.message);
	var msg = req.body.message;

	if(msg.toString() != "Help me!"){
		//Send an SMS text message
		client.sendMessage({

		    to:'+16478794447', // Any number Twilio can deliver to
		    from: '+16476910630', // A number you bought from Twilio and can use for outbound communication
		    body: msg // body of the SMS message

		}, function(err, responseData) { //this function is executed when a response is received from Twilio

		    if (!err) { // "err" is an error received during the request, if any

		        // "responseData" is a JavaScript object containing data received from Twilio.
		        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
		        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

		        console.log(responseData.from); // outputs "+14506667788"
		        console.log(responseData.body); // outputs "word to your mother."

		    }
		});
	} else{
		//Place a phone call, and respond with TwiML instructions from the given URL
		client.makeCall({

		    to:'+16478085434', // Any number Twilio can call
		    from: '+16476910630', // A number you bought from Twilio and can use for outbound communication
		    url: 'http://localhost:3000/hello.xml' // A URL that produces an XML document (TwiML) which contains instructions for the call

		}, function(err, responseData) {

		    //executed when the call has been initiated.
		    // console.log(responseData.from); // outputs "+14506667788"
		    console.log(err); // outputs "+14506667788"

		});
	}
});


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
