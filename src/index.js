//Importing Request
const request = require('request');
//Importing fs
const fs = require('fs');

//Making The Upload Function
module.exports.upload = function upload(apikey, file) {
    //Getting The Options For The Request
    var options = {
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
        //Instead Of Giving A JSON Error For Invalid API Key It Will Log A Custom Error
        if (response.body == '{"message":"ERR_INVALID_APIKEY","failed":true}')
            //Custom Error for Invalid API Key Gets Logged
            console.log('ERROR: Invalid API Key');
        //Else Statement
        else {
            //If No Error, Logs The URL
            console.log(response.body);
        }
    });
};

//Making The Fetch Function
module.exports.fetch = function fetch(imagename) {
    //Getting The Options For The Request
    var options = {
        //Method Of Request
        method: 'GET',
        //The API URL Plus The Image Name
        url: `https://api.file.glass/v3/upload/data/${imagename}`,
    };
    //Makes the Request
    request(options, function (error, response) {
        //If There Is An Error In The JS Funtion, Such As Not Supplying A Parameter, It Will Log The Error
        if (error) throw new Error(error);
        //Instead Of Giving A JSON Error For Invalid API Key It Will Log A Custom Error
        if (response.body == '{"message":"Not Found","failed":true}')
            //Custom Error for Invalid API Key Gets Logged
            console.log('ERROR: Invalid Image Name');
        //Else Statement
        else {
            //If No Error, Logs The URL
            console.log(response.body);
        }
    });
};
