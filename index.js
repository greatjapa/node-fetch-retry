module.exports = async (url, opts) => {
    let retry = opts && opts.retry || 3

    while (retry > 0) {
        try {
            return await import('node-fetch').then(({ default: fetch }) => fetch(url, opts))
        } catch(e) {
            if (opts && opts.callback) {
                opts.callback(retry)
            }
            retry = retry - 1
            if (retry === 0) {
                throw e
            }

            if (opts && opts.pause) {
                if (opts && !opts.silent) console.log("pausing..");
                await sleep(opts.pause);
                if (opts && !opts.silent) console.log("done pausing...");
            }
        }
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
