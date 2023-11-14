import * as dotenv from 'dotenv'
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { unlink } from 'fs';
import { decompressFile } from 'src/utils/decompressFile';
import { downloadFile } from 'src/utils/downloadFile';
import { processFirst100Lines } from 'src/utils/processFirst100Lines';

@Injectable()
export class ProductsService {
    async downloadAndProcessProducts(): Promise<void> {
        dotenv.config()
        const baseUrl = process.env.PRODUCTS_BASE_URL
        const files = await axios({ method: 'GET', url: `${baseUrl}index.txt`, responseType: 'json' })
        const filteredFilesList = files.data.split('\n').map(fileName => fileName.split('.')[0]).filter(Boolean);

        for (const element of filteredFilesList) {
            console.log(`downloading ${element} gzipped file`)
            let url = `${baseUrl}${element}.json.gz`;
            let downloadDestination = `downloadedFiles/${element}.json.gz`;
            let decompressedDestination = `downloadedFiles/${element}.json`;
            let reducedDestination = `downloadedFiles/${element}_reduced.json`;

            try {
                await downloadFile(url, downloadDestination);
                await decompressFile(downloadDestination, decompressedDestination);
                await processFirst100Lines(decompressedDestination, reducedDestination);

                // Remove downloaded files
                unlink(downloadDestination, async (err) => {
                    if (err) {
                        console.error('Error deleting the file:', err);
                    } else {
                        console.log('Original downloaded file deleted:', downloadDestination);
                    }
                });
                unlink(decompressedDestination, async (err) => {
                    if (err) {
                        console.error('Error deleting the file:', err);
                    } else {
                        console.log('Original decompressed file deleted:', downloadDestination);
                    }
                });
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
}
