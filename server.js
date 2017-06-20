var express = require('express');
var app = express();
var path = require('path');
var configAuth = require('./app/auth.js');
app.use(express.static(__dirname + '/public'));
var client =require('twilio')('AC3038174077429c331f0f7a1a51194f88','0e4748d9b1f448a4376339c152cdc33c');
/*
var mongoose = require('mongoose');
var passport=require('passport');
mongoose.connect('mongodb://localhost/test');

var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
	console.log("db connection establised");
});

var cors = require('cors');
// Add headers
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("yeahhhhhh");
  //console.log(req);
  next();
});
*/

var FacebookStrategy=require('passport-facebook').Strategy;
// viewed at http://localhost:8080
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function(req, res) {
	console.log("got the request");
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
/*
app.get('/a',function(req,res){
	console.log("got the get req");

});
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
//app.get('/auth/facebook', passport.authenticate('facebook',{scope:['email']}));
app.get('/auth/facebook',function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("this is called");
  passport.authenticate('facebook',{scope:['email']})
})

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/' }));

																			passport.use(new FacebookStrategy({
																			    clientID: configAuth.facebook.clientID,
																			    clientSecret: configAuth.facebook.clientSecret,
																			    callbackURL: configAuth.facebook.callbackURL
																			  },
																			  function(accessToken, refreshToken, profile, done) {
																			    process.nextTick(function(){
																						User.findOne({'facebook.id':profile.id},function(err,user){
																							if(err){
																								return done(err);
																							}
																							if(user){
																								return done(null,user);
																							}
																							else{
																								var newUser=new User();
																								newUser.facebook.id=profile.id;
																								newUser.facebook.token=accessToken;
																								newUser.facebook.name=profile.name.givenName+" "+profile.name.familyName,
																								newUser.facebook.email=profile.emails[0].value;
																								newUser.save(function(err){
																									if(err){
																										throw err;
																									}
																									return done(null,newUser);
																								})
																							}
																						})
																					});
																				}
																			));
*/
app.post('/sendSMS', function (req, res) {
  console.log('I received a GET request');
	console.log(req.body);
	var details=req.body;
	var sendDetail={
				to:details.countryCode+details.phoneNumber,
				from:'+17147054468',
				body:details.body
			};
console.log(sendDetail);
			client.messages.create({
				to:details.phoneNumber,
				from:'+17147054468',
				body:details.body
			},function(err,data){
				if(err){
					console.log("error occured while sending sms");
					console.log(err);
          res.status(200).send({ res: "success" });
				}else{
					console.log("sms sent successfully");
					console.log(data);
          res.status(500).send({ error: "boo:(" });
				}
			}
    )

//res.json({"res":"success"});
});




app.listen(process.env.PORT ||8080);
