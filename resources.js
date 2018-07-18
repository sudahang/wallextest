const resources = {
    urls: {
        dev: 'http://preview.airwallex.com:30001',
        stg: 'https://demo.airwallex.com:30001'
    },
    success_response: {success: 'Bank details saved'},
    no_account_number_error : 'account_number\' is required',
    account_number_length_error : 'Length of account_number should be between 7 and 11 when bank_country_code is \'US\'',
    wrong_swift_code : 'The swift code is not valid for the given bank country code: US',
    swift_code_length_error : 'Length of \'swift_code\' should be either 8 or 11'
};

module.exports = resources;