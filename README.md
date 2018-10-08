# fetchRetry <a href="https://travis-ci.org/greatjapa/fetchRetry"><img alt="Travis Status" src="https://travis-ci.org/greatjapa/fetchRetry.svg?branch=master"></a> [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/greatjapa/fetchRetry/blob/master/LICENSE)

`fetchRetry` is a wrapper library that add retry over `node-fetch`.


## How to install?
```bash
npm i --save fetchRetry
```

## How to use?

The following code shows an example that does not have retry:

```javascript
const fetch = require('node-fetch');
let res = await fetch('https://google.com', { method: 'GET' })
```

The code down bellow shows how `fetchRetry` works:

```javascript
const fetchRetry = require('fetchRetry');
let res = await fetchRetry('https://google.com', { method: 'GET', retry: 3 })
```

If you want to add callback that will be called between the retries:

```javascript
let opts = {
    method: 'GET', 
    retry: 3,
    callback: retry => { calls.push(retry) }
}

const fetchRetry = require('fetchRetry');
let res = await fetchRetry('https://google.com', opts)
```