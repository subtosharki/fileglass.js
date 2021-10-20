const request = require('request');
const fs = require('fs');
const err = require('../Errors/Errors');

module.exports.translate = function translate(apikey, file) {
    let options = {
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
        err.check(response.body);
    });
};
