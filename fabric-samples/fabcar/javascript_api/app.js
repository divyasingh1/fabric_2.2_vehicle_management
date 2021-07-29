/* imports starts */
var express = require('express');
var route = require('./route.js');
var bodyParser = require('body-parser');
var app=express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/* post request to invoke transaction */
app.post('/createVehicle', function(req, res){
   req.body.header = "CNST_CREATE_CAR";
   route.invoke(req,res);
});

app.post('/changeOwner', function(req, res){
   req.body.header = "CNST_CHANGE_CAR_OWNER";
   route.invoke(req,res);
});

app.get('/getHistory/:arg2',function(req,res){
   route.getHistory(req,res);
})

/* GET request to query all cars information */
app.get('/query/queryAllVehicles',function(req,res){
   route.queryAllCars(req,res);
})

/* GET request to query particular car information */
app.get('/query/queryVehicle/:arg1',function(req,res){
   route.queryCar(req,res);
})


var server = app.listen(8080, function() {

  console.log('Express server listening on port 8080');

});

module.exports = app;
