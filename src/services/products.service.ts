import { Injectable } from '@nestjs/common';
import axios from 'axios';
import zlib from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

@Injectable()
export class ProductsService {
    async downloadAndProcessProducts() {
        //const filesList = await axios({ method: 'GET', url: 'https://challenges.coode.sh/food/data/json/index.txt', responseType: 'json' })
        const url = 'https://challenges.coode.sh/food/data/json/products_01.json.gz';

        const fileWriteStream = createWriteStream('downloaded_file.gz');
        const fileReadStream = createReadStream('downloaded_file.gz');

        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
            headers: {
                'Accept-Encoding': 'gzip', // Mention that you accept gzip encoding
            },
        })

        console.log(response.data)

    }
}
