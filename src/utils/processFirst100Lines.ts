import { createReadStream, createWriteStream } from "fs";
import { createInterface } from "readline";

export const processFirst100Lines = async (inputPath, outputPath) => {
    let lineCount = 0;
    const readInterface = createInterface({
        input: createReadStream(inputPath),
        crlfDelay: Infinity,
    });

    const writeStream = createWriteStream(outputPath);

    readInterface.on('line', (line) => {
        if (lineCount < 100) {
            writeStream.write(line + '\n');
            lineCount++;
        } else {
            readInterface.close();
        }
    });

    readInterface.on('close', () => {
        writeStream.end();
        console.log('First 100 lines written to', outputPath);
    });
};