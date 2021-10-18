const request = require('request');

module.exports.photoData = function photoData(ImageID) {
    let options = {
        method: 'GET',
        url: `https://api.file.glass/v3/upload/data/${ImageID}`,
    };

    //Makes the Request
    request(options, function (error, response) {
        if (error) throw new Error(error);
        //Instead Of Giving A JSON Error For Invalid Image ID It Will Log A Custom Error
        switch (response.body) {
            case '{"message":"Not Found","failed":true}':
                console.log('ERROR 404: Invalid Image ID');
                break;
            default:
                console.log(response.body);
                break;
        }
    });
};
