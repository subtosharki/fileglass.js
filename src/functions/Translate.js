const request = require('request');
const fs = require('fs');

module.exports.translate = function translate(apikey, file) {
    var options = {
        method: 'POST',
        url: `https://api.file.glass/v3/common/translation/upload?access_key=${apikey}`,
        headers: {},
        formData: {
            form: {
                value: fs.createReadStream(file),
                options: {
                    filename: 'filename',
                    contentType: null,
                },
            },
        },
    };

    //Makes the Request
    request(options, function (error, response) {
        if (error) throw new Error(error);
        //Instead Of Giving A JSON Error It Will Log A Custom Error
        switch (response.body) {
            case '{"message":"Request is not multipart","failed":true}':
                console.log('ERROR 400: No File Provided');
                break;
            case '{"message":"File is not TypeScript","failed":true}':
                console.log('ERROR 415: Invalid File Type');
                break;
            case '{"message":"File is to large, it shouldn\'t be more than 0.5 megabytes.","failed":true}':
                console.log('ERROR 413: File To Large');
                break;
            case '{"message":"ERR_NO_APIKEY","failed":true}':
                console.log('ERROR 403: No API Key Provided');
                break;
            case '{"message":"ERR_INVALID_APIKEY","failed":true}':
                console.log('ERROR 403: Invalid API Key');
                break;
            default:
                console.log(response.body);
                break;
        }
    });
};
