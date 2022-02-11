import forEach from 'lodash/forEach'
import trim from 'lodash/trim'

const defaults = {
  basePath: process.env.API_BASE_PATH,
  method: 'get',
}

const ignoreDuplicateOf = [
  'age',
  'authorization',
  'content-length',
  'content-type',
  'etag',
  'expires',
  'from',
  'host',
  'if-modified-since',
  'if-unmodified-since',
  'last-modified',
  'location',
  'max-forwards',
  'proxy-authorization',
  'referer',
  'retry-after',
  'user-agent',
]

function parseHeaders(headers) {
  let parsed = {}
  let key
  let val
  let i

  if (!headers) {
    return parsed
  }

  forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':')
    key = trim(line.substr(0, i)).toLowerCase()
    val = trim(line.substr(i + 1))

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val])
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val
      }
    }
  })

  return parsed
}

function request(url, options) {
  return new Promise((resolve, reject) => {
    const requestOptions = { ...defaults, ...options }
    let request = new XMLHttpRequest()
    let requestData = requestOptions.data
    let responseType = requestOptions.responseType
    let requestHeaders= requestOptions.headers

    const onloadend = () => {
      if (request) {
        const responseHeaders =
          'getAllResponseHeaders' in request
            ? parseHeaders(request.getAllResponseHeaders())
            : null
        const responseData =
          !responseType || responseType === 'text' || responseType === 'json'
            ? request.responseText
            : request.response

        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: requestOptions,
          request: request,
        }

        resolve(response)
        request = null
      }
    }

    request.open(requestOptions.method, requestOptions.basePath + url, true);

    if ('setRequestHeader' in request) {
      forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          delete requestHeaders[key];
        } else {
          request.setRequestHeader(key, val);
        }
      });
    }

    if ('onloadend' in request) {
      request.onloadend = onloadend
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return
        }
        if (
          request.status === 0 &&
          !(request.responseURL && request.responseURL.indexOf('file:') === 0)
        ) {
          return
        }
        setTimeout(onloadend)
      }
    }

    // Handle progress if needed
    if (typeof requestOptions.onDownloadProgress === 'function') {
      request.addEventListener('progress', requestOptions.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof requestOptions.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', requestOptions.onUploadProgress);
    }

    request.timeout = requestOptions.timeout
    request.onabort = (error) => {
      reject(error)
      request = null
    }
    request.onerror = (error) => {
      reject(error)
      request = null
    }

    if (!requestData) {
      requestData = null
    }

    request.send(requestData)
  })
}

export default request
export { defaults }
