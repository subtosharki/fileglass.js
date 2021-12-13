import request from 'request';
import { check } from '../Errors/Errors';

const photoData = (ImageID: string) => {
    let options = {
        method: 'GET',
        url: `https://api.file.glass/v3/upload/data/${ImageID}`,
    };
    return new Promise((resolve, reject) => {
        //Makes the Request
        request(options, function (error: string, response: any) {
            if (error) throw new Error(error);
            resolve(check(response.body));
        });
    });
};

export { photoData };
