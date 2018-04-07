const fs = require('fs');
const zlib = require('zlib');
const tar = require('tar-fs');
const { LineTransform, MustacheTransform } = require('../transformers');

async function start() {
    await new Promise((resolve) => {
        fs.createReadStream('../input/electron-vue-master.tar.gz')
            .pipe(zlib.createGunzip())
            .pipe(tar.extract('../output/foo', {
                // map: (header) => {
                //     console.dir(header);
                //     header.name = header.name + 'foo';
                //     return header;
                // }
                mapStream: (fileStream, header) => {
                    return fileStream
                        .pipe(new LineTransform())
                        .pipe(new MustacheTransform({
                            spore_test: 'foobar'
                        }));
                }
            }))
            .on('finish', _ => resolve());
    });
}

module.exports.start = start;

