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
        switch (response.body) {
            case '{"message":"Request is not multipart","failed":true}':
                throw new Error('400 No File Provided');
                break;
            case '{"message":"File is not TypeScript","failed":true}':
                throw new Error('415 Invalid File Type');
                break;
            case '{"message":"File is to large, it shouldn\'t be more than 0.5 megabytes.","failed":true}':
                throw new Error('413 File To Large');
                break;
            case '{"message":"ERR_NO_APIKEY","failed":true}':
                throw new Error('403 No API Key Provided');
                break;
            case '{"message":"ERR_INVALID_APIKEY","failed":true}':
                throw new Error('403 Invalid API Key');
                break;
            case '{"message":"Not Found","failed":true}':
                throw new Error('404 Invalid Image ID');
                break;
            case '{"message":"ThrottleException: Too Many Requests,"failed":true}':
                throw new Error('429 You Are Being Rate Limited');
                break;
            default:
                const result = JSON.parse(response.body);
                return result;
                break;
        }
    });
};
