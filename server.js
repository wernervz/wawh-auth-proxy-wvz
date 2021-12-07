const express = require("express");
const basicAuth = require('express-basic-auth');

const bodyParser = require('body-parser');

var app = express();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// set the basic auth user and password
app.use(basicAuth({
  users: { 'apikey': 'supersecret' },
  challenge: true,
  unauthorizedResponse: (req) => { 
    return 'Unauthenticated.'
  }
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send('This is an API application and not accessible with a browsers.')
})

app.post("/api/proxy-auth/claims/pre", function (request, response) {
  response.send({ status: 'Success' });
});

app.post("/api/proxy-auth/claims/dialog", function (request, response) {
  console.log('Dialog Webhook request received.');
  console.log('Webhook Action received: %s', request.body.whAction);
  response.send({ status: 'Success', whAction: request.body.whAction });
});

app.post("/api/proxy-auth/claims/post", function (request, response) {
  response.send({ status: 'Success' });
});

app.listen(PORT, HOST, () => {
    console.log(`To view your app, open this link in your browser: http://${HOST}:${PORT}`);
});
