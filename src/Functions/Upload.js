const request = require('request');
const fs = require('fs');

//Making The Upload Function
module.exports.upload = function upload(apikey, file) {
    let options = {
        method: 'POST',
        url: `https://api.file.glass/upload?access_key=${apikey}`,
        headers: {
            sender: 'api',
        },
        formData: {
            file: {
                value: fs.createReadStream(file),
                options: {
                    filename: file,
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
            case '{"message":"ERR_NO_APIKEY","failed":true}':
                console.log('ERROR 403: No API Key Provided');
                break;
            case '{"message":"ERR_INVALID_APIKEY","failed":true}':
                console.log('ERROR 403: Invalid API Key');
                break;
            case '{"message":"ThrottleException: Too Many Requests,"failed":true}':
                console.log('ERROR 429: You Are Being Rate Limited');
                break;
            default:
                console.log(response.body);
                break;
        }
    });
};