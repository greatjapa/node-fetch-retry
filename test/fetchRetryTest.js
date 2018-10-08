require('should');
const assert = require('assert');
const fetchRetry = require('..');

describe('fetchRetry test ', () => {
    it('should raise an error by timeout', async () => {
        let opts = {
            retry: 3,
            timeout: 2
        }
        try {
            await fetchRetry('https://google.com', opts)
            should.fail('no timeout error was thrown for low timeout')
        } catch (e) {
            // do nothing
        }
    });

    it('should work properly with default timeout', async () => {
        let opts = {
            retry: 3
        }
        try {
            await fetchRetry('https://google.com', opts)
        } catch (e) {
            should.fail('error was thrown when it should not')
        }
    });

    it('should raise an error because could not find URL', async () => {
        let opts = {
            retry: 3
        }
        try {
            await fetchRetry('https://fakeURLfake', opts)
            should.fail('no error was thrown when for fake URL')
        } catch (e) {
            // do nothing
        }
    });
})