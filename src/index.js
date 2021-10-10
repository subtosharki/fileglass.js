//Importing Request
const request = require('request');
//Importing fs
const fs = require('fs');

//Making The Upload Function
module.exports.Upload = function Upload(apikey, file) {
    //Getting The Options For The Request
    let options = {
        //Method Of Request
        method: 'POST',
        //The API URL Plus API Key
        url: `https://api.file.glass/upload?access_key=${apikey}`,
        //Headers for the request
        headers: {
            //Puts Sender as "api", By Request Of Jesus
            sender: 'api',
        },
        //Gets Form Data For Request, AKA The File To Upload To API
        formData: {
            //Like I Said In Above Comment, The File
            file: {
                //Reads The File Put In The Function
                value: fs.createReadStream(file),
                //Just Options Needed For the Request
                options: {
                    filename: file,
                    contentType: null,
                },
            },
        },
    };

    //Makes the Request
    request(options, function (error, response) {
        //If There Is An Error In The JS Funtion, Such As Not Supplying A Parameter, It Will Log The Error
        if (error) throw new Error(error);
        //Instead Of Giving A JSON Error It Will Log A Custom Error
        switch (response.body) {
            //Custom Error for No API Key Gets Logged
            case '{"message":"ERR_NO_APIKEY","failed":true}':
                console.log('ERROR 403: No API Key Provided');
                break;
            //Custom Error for Invalid API Key Gets Logged
            case '{"message":"ERR_INVALID_APIKEY","failed":true}':
                console.log('ERROR 403: Invalid API Key');
                break;
            //Custom Error for Rate Limit Gets Logged
            case '{"message":"ThrottleException: Too Many Requests,"failed":true}':
                console.log('ERROR 429: You Are Being Rate Limited');
            //If There Is No Error
            default:
                console.log(response.body);
        }
    });
};

//Making The Data Function
module.exports.PhotoData = function PhotoData(ImageID) {
    //Getting The Options For The Request
    let options = {
        //Method Of Request
        method: 'GET',
        //The API URL Plus The Image Name
        url: `https://api.file.glass/v3/upload/data/${ImageID}`,
    };

    //Makes the Request
    request(options, function (error, response) {
        //If There Is An Error In The JS Funtion, Such As Not Supplying A Parameter, It Will Log The Error
        if (error) throw new Error(error);
        //Instead Of Giving A JSON Error For Invalid Image ID It Will Log A Custom Error
        switch (response.body) {
            //Custom Error For Invalid Image ID Gets Logged
            case '{"message":"Not Found","failed":true}':
                console.log('ERROR 404: Invalid Image ID');
                break;
            //If There Is No Error
            default:
                console.log(response.body);
        }
    });
};
