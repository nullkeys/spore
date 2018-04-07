const { Transform } = require('stream');
const mustache = require('mustache');

const EOL_PATTERN = /.*?(?:\r\n|\r|\n)|.*?$/g;

class LineTransform extends Transform {
    constructor(options) {
        super(options);
        this.lastLine = '';
    }

    _transform(chunk, encoding, callback) {
        const lines = (this.lastLine + chunk.toString()).match(EOL_PATTERN);
        this.lastLine = lines.pop() || '';
        
        for(const line of lines)
            this.push(line);

        callback();
    }

    _flush(callback) {
        if(this.lastLine)
            this.push(this.lastLine);
        callback();
    }
}

class MustacheTransform extends Transform {
    constructor(view, options) {
        super(options);
        this.view = view;
    }

    _transform(chunk, encoding, callback) {
        this.push(mustache.render(chunk.toString(), this.view));
        callback();
    }
}

module.exports.LineTransform = LineTransform;
module.exports.MustacheTransform = MustacheTransform;
