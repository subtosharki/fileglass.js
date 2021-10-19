const request = require('request');
const fs = require('fs');
const err = require('../Errors/Errors');

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
        err.check(response.body);
    });
};
