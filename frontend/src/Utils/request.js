import forEach from "lodash/forEach";
import trim from "lodash/trim";

const defaults = {
  basePath: process.env.API_BASE_PATH,
  method: 'get',
}

function parseHeaders(headers) {
  let parsed = {};
  let key;
  let val;
  let i;

  if (!headers) { return parsed; }

  forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = trim(line.substr(0, i)).toLowerCase();
    val = trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

function request(url, options) {
  return new Promise((resolve, reject) => {
    const requestOptions = { ...defaults, ...options };
    const request = new XMLHttpRequest();

    const onloadend = () => {
      const responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;

      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: requestOptions,
        request: request
      };
    }

    request.timeout = requestOptions.timeout;
    request.onabort = (error) => {
      reject(error);
      request = null;
    }
    request.onerror = (error) => {
      reject(error);
      request = null;
    }
  });
}

export default request;
export { defaults };
