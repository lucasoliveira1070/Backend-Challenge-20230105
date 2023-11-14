import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";

export const decompressFile = (input, output) => {
    const fileContents = createReadStream(input,);
    const writeStream = createWriteStream(output);
    const unzip = createGunzip();

    fileContents.pipe(unzip).pipe(writeStream);

    return new Promise<void>((resolve, reject) => {
        writeStream.on('finish', () => {
            resolve();
        });

        writeStream.on('error', (err) => {
            reject(err);
        });
    });
};