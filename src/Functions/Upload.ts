import * as fs from 'fs';
import request from 'request';
import { check } from '../Errors/Errors';

//Making The Upload Function
const upload = (apikey: string, file: any) => {
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

    return new Promise((resolve, reject) => {
        //Makes the Request
        request(options, function (error: string, response: any) {
            if (error) throw new Error(error);
            resolve(check(response.body));
        });
    });
};

export { upload };
