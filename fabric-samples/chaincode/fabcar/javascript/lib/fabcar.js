/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        console.info('============= END : Initialize Ledger ===========');
	return;
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, vehicle_id, manufacture, model, color, owner, manufacture_date, engine_no, chassis_no) {
        console.info('============= START : Create Vehicle ===========');

        const car = {
            color,
            docType: 'vehicle',
	    isSold: false,
            manufacture,
            model,
            owner,
	    manufacture_date,
	    engine_no,
	    chassis_no
        };

        await ctx.stub.putState(vehicle_id, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Vehicle ===========');
    }

    async queryAllCars(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner, sold_price, sold_date) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;
	car.sold_price = sold_price;
	car.sold_date = sold_date

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

	async sellCar(ctx, carNumber, newOwner, registration_no, sold_price, insurance_id, sold_date){
		console.info('============= START : sell car ===========');
		const carAsBytes = await ctx.stub.getState(carNumber);
		if (!carAsBytes || carAsBytes.length === 0) {
			throw new Error(`${carNumber} does not exist`);
		}
		const car = JSON.parse(carAsBytes.toString());
		car.owner = newOwner;
		car.registration_no = registration_no;
		car.sold_price = sold_price,
		car.insurance_id = insurance_id,
		car.isSold = true,
		car.sold_date = sold_date,
		await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
		console.info('============= END : sell car ===========');
	}

	async serviceVehicle(ctx, carNumber, service_id, service_date){
                console.info('============= START : service vehicle ===========');
                const carAsBytes = await ctx.stub.getState(carNumber);
                if (!carAsBytes || carAsBytes.length === 0) {
                        throw new Error(`${carNumber} does not exist`);
                }
                const car = JSON.parse(carAsBytes.toString());
                car.service_id = service_id;
                car.service_date = service_date;
                await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
                console.info('============= END : service vehicle ===========');
        }

        async vehicleCondition(ctx, carNumber, certificate_fitness){
                console.info('============= START :add vehicle condition ===========');
                const carAsBytes = await ctx.stub.getState(carNumber);
                if (!carAsBytes || carAsBytes.length === 0) {
                        throw new Error(`${carNumber} does not exist`);
                }
                const car = JSON.parse(carAsBytes.toString());
                car.certificate_fitness = certificate_fitness;
                await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
                console.info('============= END : add vehicle condition ===========');
        }

	async trafic_voilations(ctx, carNumber, traffic_voilation_id){
                console.info('============= START : trafic_voilations ===========');
                const carAsBytes = await ctx.stub.getState(carNumber);
                if (!carAsBytes || carAsBytes.length === 0) {
                        throw new Error(`${carNumber} does not exist`);
                }
                const car = JSON.parse(carAsBytes.toString());
                car.traffic_voilation_id = traffic_voilation_id;
                await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
                console.info('============= END : trafic_voilations ===========');
        }

        async modifyVehicle (ctx,  carNumber, color){
		console.info('============= START : modifyVehicle ===========');
		const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
		if (!carAsBytes || carAsBytes.length === 0) {
			throw new Error(`${carNumber} does not exist`);
                }
		const car = JSON.parse(carAsBytes.toString());
		car.color = color;
		await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
                console.info('============= END : modifyVehicle ===========');

	}

	async retrieveHistory(ctx, key) {
		console.info('getting history for key: ' + key);
		let iterator = await ctx.stub.getHistoryForKey(key);
		let result = [];
		let res = await iterator.next();
		while (!res.done) {
			if (res.value && res.value.value.toString()) {
				console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
				let jsonRes = {};
                                jsonRes.TxId = res.value.txId;
                                jsonRes.Timestamp = res.value.timestamp;
                                jsonRes.IsDelete = res.value.isDelete;
                                try {
                                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                                } catch (err) {
                                        console.log(err);
                                        jsonRes.Value = res.value.value.toString('utf8');
                                }

//				const obj = JSON.parse(res.value.value.toString('utf8'));
				result.push(jsonRes);
			}
			res = await iterator.next();
		}
		await iterator.close();
		return result;
	}


	async scrapVehicle(ctx, key){
		console.info('=============START: Delete vehiclle===================', key);
		if (!key) {
			throw new Error('Incorrect number of arguments. Expecting name of the vehicle to be delete');
		}
		await ctx.stub.deleteState(key);
		return "SUCCESS"
	}
}

module.exports = FabCar;
