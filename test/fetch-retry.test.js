require('should');

const timeoutSignal = require('timeout-signal');
const fetch = require('..');

describe('node-fetch-retry test ', async function () {
    it('should raise an error by timeout', async function () {
        this.timeout(10000);

        let opts = {
            retry: 3,
            signal: timeoutSignal(2),
        }
        try {
            await fetch('https://google.com', opts)
            should.fail('no timeout error was thrown for low timeout')
        } catch (e) {
            // do nothing
        }
    });

    it('should raise an error by timeout with callback', async function () {
        this.timeout(10000);

        let calls = []
        let opts = {
            retry: 3,
            signal: timeoutSignal(2),
            callback: retry => {
                calls.push(retry)
            }
        }
        try {
            await fetch('https://google.com', opts)
            should.fail('no timeout error was thrown for low timeout')
        } catch (e) {
            calls.should.have.lengthOf(3)
        }
    });

    it('should work properly with default timeout', async function () {
        this.timeout(10000);

        let opts = {
            retry: 3
        }
        try {
            await fetch('https://google.com', opts)
        } catch (e) {
            should.fail('error was thrown when it should not')
        }
    });

    it('should raise an error because could not find URL', async function () {
        let calls = []
        let opts = {
            retry: 5,
            callback: retry => {
                calls.push(retry)
            }
        }
        try {
            await fetch('https://fakeURLfake', opts)
            should.fail('no error was thrown when for fake URL')
        } catch (e) {
            calls.should.have.lengthOf(5)
        }
    });

    it('should work properly with pause and silent', async function () {
        this.timeout(10000);

        let calls = []
        let opts = {
            retry: 3,
            pause: 1000, // in milliseconds
            callback: retry => {
                calls.push(new Date().getTime())
            },
            silent: true
        }
        let cntr = 0;
        console.log = () => {
            cntr++;
        }
        try {
            await fetch('https://fakeURLfake', opts)
        } catch (e) {
            should.equal(true, calls[1] - calls[0] >= 1000);
            should.equal(true, calls[2] - calls[1] >= 1000);
        }
        should.equal(cntr, 0);
    });

    it('should work properly with pause and not silent', async function () {
        this.timeout(10000);

        let calls = []
        let opts = {
            retry: 3,
            pause: 1000, // in milliseconds
            callback: retry => {
                calls.push(new Date().getTime())
            }
        }
        let cntr = 0;
        console.log = (message) => {
            cntr++;
        }
        try {
            await fetch('https://fakeURLfake', opts)
        } catch (e) {
            should.equal(true, calls[1] - calls[0] >= 1000);
            should.equal(true, calls[2] - calls[1] >= 1000);
        }
        should.equal(cntr, 4);
    });
})
