import axios from "axios";
import { createWriteStream } from "fs";

export const downloadFile = async (url, destination) => {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
    });

    response.data.pipe(createWriteStream(destination));

    return new Promise<void>((resolve, reject) => {
        response.data.on('end', () => {
            resolve();
        });

        response.data.on('error', (err) => {
            reject(err);
        });
    });
};