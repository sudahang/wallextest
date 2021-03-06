const assert   = require('chai').assert;
const expect   = require('chai').expect;
const should   = require('chai').should();
const api      = require('../walletapi');
const resources = require('../resources');


describe('wallex api test', function () {
    var basicPayload = {
        payment_method: 'SWIFT',
        bank_country_code: 'US',
        account_name: 'John Smith',
        account_number: '12345678'
    };
    var swiftCode = {swift_code: 'ICBCUSBJ'};
    var au_bsb = {bsb : '123456'};
    var us_aba = {aba : '123456789'};
    var env = process.env.ENVIRONMENT || 'dev';
    before(function() {
        // runs before all tests in this block
        console.log('runs before all tests in this block');
    });

    after(function() {
        // runs after all tests in this block
        // console.log('runs after all tests in this block');
    });
    describe('collect customers\' bank details', function() {
        this.timeout(5000);
        // this.retries(1);
        beforeEach(function() {
            // runs before each test in this block
            // console.log('runs before each tests in this block');
        });

        afterEach(function() {
            // runs after each test in this block
            // console.log('runs after each tests in this block');
        });

        context('Acceptance test cases', function () {
            it('should return 200 when all fields in the body are valid using SWIFT.', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload,basicPayload,swiftCode,us_aba);
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,200);
                    assert.equal(JSON.stringify(resources.success_response), JSON.stringify(body));
                    done()
                });
            });
            it('should return 200 when all fields in the body are valid using LOCAL.', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload, basicPayload, us_aba);
                payload['payment_method'] = 'LOCAL';
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,200);
                    assert.equal(JSON.stringify(resources.success_response), JSON.stringify(body));
                    done()
                });
            });
        });
        context('P2 test cases', function () {
            it('should return 200 when bank country = AU and method= SWIFT.', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload,basicPayload,swiftCode,au_bsb);
                payload['bank_country_code'] = 'AU';
                payload['swift_code'] = 'ICBCAUBJ';
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,200);
                    assert.equal(JSON.stringify(resources.success_response), JSON.stringify(body));
                    done()
                });
            });
            it('should return 200 when bank country = CN and method= SWIFT.', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload,basicPayload,swiftCode);
                payload['bank_country_code'] = 'CN';
                payload['swift_code'] = 'ICBCCNBJ';
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,200);
                    assert.equal(JSON.stringify(resources.success_response), JSON.stringify(body));
                    done()
                });
            });
            it('should return 200 when bank country = AU and method= LOCAL.', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload,basicPayload,au_bsb);
                payload['bank_country_code'] = 'AU';
                payload['payment_method'] = 'LOCAL';
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,200);
                    assert.equal(JSON.stringify(resources.success_response), JSON.stringify(body));
                    done()
                });
            });
            it('should return 200 when bank country = CN and method= LOCAL.', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload,basicPayload);
                payload['bank_country_code'] = 'CN';
                payload['payment_method'] = 'LOCAL';
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,200);
                    assert.equal(JSON.stringify(resources.success_response), JSON.stringify(body));
                    done()
                });
            });
        });
        context('P3 test cases', function () {
            it('should return 400 when account number is lost.', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload,basicPayload,swiftCode,us_aba);
                delete payload['account_number'];
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,400);
                    assert.equal(JSON.stringify(resources.no_account_number_error), JSON.stringify(body));
                    done()
                });
            });
            it('should return 400 when account number length is not correct for US bank', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload, basicPayload, swiftCode, us_aba);
                payload['account_number'] = '123456789a'.repeat(3);
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,400);
                    assert.equal(JSON.stringify(resources.account_number_length_error.us), JSON.stringify(body));
                    done()
                });
            });
            it('should return 400 when account number length is not correct for AU bank', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload, basicPayload, swiftCode, au_bsb);
                payload['account_number'] = '123456789a'.repeat(3);
                payload['bank_country_code'] = 'AU';
                payload['swift_code'] = 'ICBCAUBJ';
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,400);
                    assert.equal(JSON.stringify(resources.account_number_length_error.au),JSON.stringify(body));
                    done()
                });
            });
            it('should return 400 when account number length is not correct for CN bank', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload, basicPayload, swiftCode);
                payload['account_number'] = '123456789a'.repeat(3);
                payload['bank_country_code'] = 'CN';
                payload['swift_code'] = 'ICBCCNBJ';
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,400);
                    assert.equal(JSON.stringify(resources.account_number_length_error.cn),JSON.stringify(body));
                    done()
                });
            });
            it('should return 400 when swift code is not correct for US bank', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload, basicPayload, swiftCode, us_aba);
                payload['swift_code'] = 'ICBCCNBJ';
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,400);
                    assert.equal(JSON.stringify(resources.wrong_swift_code), JSON.stringify(body));
                    done()
                });
            });
            it('should return 400 when swift code length is not correct for US bank', function(done){
                // this.timeout(5000);
                var payload = {};
                Object.assign(payload, basicPayload, swiftCode, us_aba);
                payload['swift_code'] = 'ICBCUS';
                console.log(payload);
                api.postPayment(env,payload, function(error,statusCode,body){
                    // console.log(body);
                    assert.equal(statusCode,400);
                    assert.equal(JSON.stringify(resources.swift_code_length_error), JSON.stringify(body));
                    done()
                });
            });
        });
    });

});