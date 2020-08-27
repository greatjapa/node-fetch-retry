const fetch = require('node-fetch');

module.exports = async (url, opts) => {
    let retry = opts && opts.retry || 3
    let pause = (opts && opts.pause && opts.pause > 0) || 0

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
                console.log("pausing..");
                await sleep(opts.pause);
                console.log("done pausing...");
            }
        }
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}