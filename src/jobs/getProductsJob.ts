import * as dotenv from 'dotenv';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import { promisify } from 'util';
import { decompressFile } from 'src/utils/decompressFile';
import { downloadFile } from 'src/utils/downloadFile';
import { processFirst100Lines } from 'src/utils/processFirst100Lines';
import { unlink } from 'fs';

const unlinkAsync = promisify(unlink);

@Injectable()
export class GetProductsJob {
    private readonly logger = new Logger(GetProductsJob.name);

    @Cron(process.env.CRON_JOB_SCHEDULER)
    async handleCron() {
        try {
            dotenv.config();
            const baseUrl = process.env.PRODUCTS_BASE_URL;
            const files = await axios({ method: 'GET', url: `${baseUrl}index.txt`, responseType: 'json' });
            const filteredFilesList = files.data.split('\n').map(fileName => fileName.split('.')[0]).filter(Boolean);

            for (const element of filteredFilesList) {
                this.logger.log(`Downloading ${element} gzipped file`);
                let url = `${baseUrl}${element}.json.gz`;
                let downloadDestination = `downloadedFiles/${element}.json.gz`;
                let decompressedDestination = `downloadedFiles/${element}.json`;
                let reducedDestination = `downloadedFiles/${element}_reduced.json`;

                await downloadFile(url, downloadDestination);
                await decompressFile(downloadDestination, decompressedDestination);
                await processFirst100Lines(decompressedDestination, reducedDestination);


                await unlinkAsync(downloadDestination);
                await unlinkAsync(decompressedDestination);

                this.logger.log(`Files for ${element} processed`);
            }
        } catch (error) {
            this.logger.error('Error:', error);
        }
    }
}
