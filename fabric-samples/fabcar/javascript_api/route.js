//*** (IMPORTS STARTS ) ****
var invoke = require('./invoke.js');
var query = require('./query.js');
//***  IMPORTS ENDS ****
exports.invoke = function (request,reply) {
	var header = request.body.header;
	console.log(">>>>>>>>>>userCard", request.headers, request.header);
	var userCard = request.headers.usercard  || 'appUser';
	var arraycarvalues = request.body.arraycarvalues;
	invoke.invokeSDK(header, arraycarvalues,userCard, reply);
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


exports.queryCar = function (request,reply) {
    var fnName = "queryCar";
    query.querySDK(fnName, request, reply);
    }

