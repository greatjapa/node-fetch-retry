# node-fetch-retry [![npm version](https://img.shields.io/npm/v/node-fetch-retry.svg?style=flat)](https://www.npmjs.com/package/node-fetch-retry) [![NPM](https://img.shields.io/npm/dt/node-fetch-retry.svg?style=flat-square&colorB=fd7463)](https://www.npmjs.com/package/node-fetch-retry) <a href="https://travis-ci.org/greatjapa/node-fetch-retry"><img alt="Travis Status" src="https://travis-ci.org/greatjapa/node-fetch-retry.svg?branch=master"></a> [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/greatjapa/node-fetch-retry/blob/master/LICENSE)

`node-fetch-retry` is a wrapper library that add retry over `node-fetch`.


## How to install?
```bash
npm i --save node-fetch-retry
```

## How to use?

The following code shows an example that does not have retry:

```javascript
const fetch = require('node-fetch');
let res = await fetch('https://google.com', { method: 'GET' })
```

The code down bellow shows how `node-fetch-retry` works:

```javascript
const fetch = require('node-fetch-retry');
let res = await fetch('https://google.com', { method: 'GET', retry: 3 })
```

A pause (in milliseconds) can be added between retry attempts using the `pause` option. Pause values < 0 are treated as 0.

The following example waits 1 seconds (1000 ms) between retry attempts.

```javascript
const fetch = require('node-fetch-retry');
let res = await fetch('https://google.com', { method: 'GET', retry: 3, pause: 1000 })
```

If you want to add callback that will be called between the retries. The callback is invoked BEFORE any (optional) pauses.

```javascript
let opts = {
    method: 'GET', 
    retry: 3,
    callback: retry => { console.log(`Trying: ${retry}`) }
}

const fetch = require('node-fetch-retry');
let res = await fetch('https://google.com', opts)
```

If you would like to silence pause messages in your console include a silent boolean in your options.
```javascript
let opts = {
    method: 'GET',
    retry: 3,
    pause: 1000,
    silent: true
}
```