const fetch = require('node-fetch');

module.exports = async (url, opts) => {
    let retry = opts && opts.retry || 3

    while (retry > 0) {
        try {
            return await fetch(url, opts)
        } catch(e) {
            if (opts.callback) {
                opts.callback(retry)
            }        
            retry = retry - 1
            if (retry == 0) {
                throw e
            }

            if (opts.pause) {
                if (!opts.silent) console.log("pausing..");
                await sleep(opts.pause);
                if (!opts.silent) console.log("done pausing...");
            }
        }
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}