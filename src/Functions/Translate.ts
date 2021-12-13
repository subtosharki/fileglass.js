import * as fs from 'fs';
import request from 'request';
import { check } from '../Errors/Errors';

const translate = (apikey: string, file: any) => {
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

    return new Promise((resolve, reject) => {
        //Makes the Request
        request(options, function (error: string, response: any) {
            if (error) throw new Error(error);
            resolve(check(response.body));
        });
    });
};
export { translate };