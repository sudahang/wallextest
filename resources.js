const resources = {
    urls: {
        dev: 'http://preview.airwallex.com:30001',
        stg: 'https://demo.airwallex.com:30001'
    },
    success_response: {success: 'Bank details saved'},
    no_account_number_error : {error:'\'account_number\' is required'},
    account_number_length_error : {
        us : {error: 'Length of account_number should be between 7 and 11 when bank_country_code is \'US\''},
        au : {error: 'Length of account_number should be between 6 and 9 when bank_country_code is \'AU\''},
        cn : {error: 'Length of account_number should be between 8 and 20 when bank_country_code is \'CN\''}
    },
    wrong_swift_code : {error: 'The swift code is not valid for the given bank country code: US'},
    swift_code_length_error : {error: 'Length of \'swift_code\' should be either 8 or 11'}
};

module.exports = resources;