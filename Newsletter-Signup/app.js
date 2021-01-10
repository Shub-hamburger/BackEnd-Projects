const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
//const port = 3000;

// express.static is used for our server to serve up static files.
// public is the name of our static folder.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({exteded: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us_.api.mailchimp.com/3.0/lists/xxxxxxx";
  const options = {
    method: "POST",
    auth: "PUT_YOUR_AUTH"
  };

                    // "request" because we want to POST data to external resource.
  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
  // Sending data to mailchimp server.
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  // redirects to homepage.
  res.redirect("/");
});

// process.env.PORT gets a dynamic port.
app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
})

// https://quiet-forest-23294.herokuapp.com/
