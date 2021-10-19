const request = require('request');
const err = require('../Errors/Errors');

module.exports.photoData = function photoData(ImageID) {
    let options = {
        method: 'GET',
        url: `https://api.file.glass/v3/upload/data/${ImageID}`,
    };

    //Makes the Request
    request(options, function (error, response) {
        if (error) throw new Error(error);
        err.check(response.body);
    });
};
