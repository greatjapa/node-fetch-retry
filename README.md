# fetch-retry <a href="https://travis-ci.org/greatjapa/fetch-retry"><img alt="Travis Status" src="https://travis-ci.org/greatjapa/fetch-retry.svg?branch=master"></a> [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/greatjapa/fetch-retry/blob/master/LICENSE)

`fetch-retry` is a wrapper library that add retry over `node-fetch`.


## How to install?
```bash
npm i --save fetch-retry
```

## How to use?

The following code shows an example that does not have retry:

```javascript
const fetch = require('node-fetch');
let res = await fetch('https://google.com', { method: 'GET' })
```

The code down bellow shows how `fetch-retry` works:

```javascript
const fetch = require('fetch-retry');
let res = await fetch('https://google.com', { method: 'GET', retry: 3 })
```

If you want to add callback that will be called between the retries:

```javascript
let opts = {
    method: 'GET', 
    retry: 3,
    callback: retry => { calls.push(retry) }
}

const fetch = require('fetch-retry');
let res = await fetch('https://google.com', opts)
```