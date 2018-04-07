const assert = require('assert');
const { PassThrough } = require('stream');
const { describe, it } = require('mocha');
const memorystream = require('memorystream');
const { LineTransform } = require('../lib/transformers');

describe('LineTransform Tests', function() {
    for(let test of require('./data/strings').lineTransformTests) {
        it(`transforming ${JSON.stringify(test)}`, function(done) {
            const memoryStream = memorystream.createWriteStream();
            const passThrough = new PassThrough();
            passThrough.end(test);

            passThrough
                .pipe(new LineTransform())
                .pipe(memoryStream)
                .on('finish', () => {
                    assert.equal(memoryStream.toString(), test);
                    done();
                });
        });
    }
});
