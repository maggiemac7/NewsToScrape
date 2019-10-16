var express = require("express");
var app = express();
var exhbs = require('express-handlebars');

//Set up some middelware --standard
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Set up route for static file serving
app.use(express.static('public'));

//set up soem middle ware for Express to use handlebars
app.engine('handlebars', exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Setting up routes
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

var PORT = process.env.PORT || 3008;
app.listen(PORT, function(err){
    if(err) throw err;
    console.log('UP AND RUNNING ON PORT ' + PORT);
})