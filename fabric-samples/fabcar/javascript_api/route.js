//*** (IMPORTS STARTS ) ****
var invoke = require('./invoke.js');
var invoke2 = require('./invoke2.js')
var query = require('./query.js');
var registerUser = require('./registerUser3.js');
//***  IMPORTS ENDS ****
exports.invoke = function (request,reply) {
	var header = request.body.header;
	console.log(">>>>>>>>>>userCard", request.headers, request.header);
	var userCard = request.headers.usercard  || 'manufacturer';
	var arraycarvalues = request.body.arraycarvalues;
	invoke2.invokeSDK(header, arraycarvalues,userCard, reply);
}

// ***  ( QUERY SDK METHODS STARTS ) ***//      
exports.queryAllCars = function (request,reply) {
	var fnName = "queryAllCars";
	query.querySDK(fnName, request, reply);
}

exports.getHistory = function (request,reply) {
        var fnName = "retrieveHistory";
        query.querySDK(fnName, request, reply);
}

exports.registerUser = function (request,reply) {
        var fnName = "registerUser";
        registerUser.registerUserSDK(fnName, request, reply);
}

exports.scrapVehicle = function (request,reply) {
	var header = request.body.header;
	var arraycarvalues = request.body.arraycarvalues;
	var userCard = request.headers.usercard  || 'appUser';
        invoke.invokeSDK(header, arraycarvalues, userCard, reply);
}

exports.modifyVehicle = function (request,reply) {
        var header = request.body.header;
        var arraycarvalues = request.body.arraycarvalues;
        var userCard = request.headers.usercard  || 'appUser';
        invoke.invokeSDK(header, arraycarvalues, userCard, reply);
}

exports.sellCar = function (request,reply) {
        var header = request.body.header;
        var arraycarvalues = request.body.arraycarvalues;
        var userCard = request.headers.usercard  || 'appUser';
        invoke.invokeSDK(header, arraycarvalues, userCard, reply);
}

exports.serviceVehicle = function (request,reply) {
        var header = request.body.header;
        var arraycarvalues = request.body.arraycarvalues;
        var userCard = request.headers.usercard  || 'appUser';
        invoke.invokeSDK(header, arraycarvalues, userCard, reply);
}

exports.vehicleCondition = function (request,reply) {
        var header = request.body.header;
        var arraycarvalues = request.body.arraycarvalues;
        var userCard = request.headers.usercard  || 'appUser';
        invoke.invokeSDK(header, arraycarvalues, userCard, reply);
}

exports.trafic_voilations = function (request,reply) {
        var header = request.body.header;
        var arraycarvalues = request.body.arraycarvalues;
	var userCard = request.headers.usercard  || 'appUser';
        invoke.invokeSDK(header, arraycarvalues, userCard, reply);
}


exports.queryCar = function (request,reply) {
    var fnName = "queryCar";
    query.querySDK(fnName, request, reply);
    }

