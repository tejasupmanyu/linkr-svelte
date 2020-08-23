export const fetchRequest = (
  method,
  url,
  params,
  headers = {},
  baseURL = window ? window.location.origin : "/"
) => {
  const allHeaders = {
    ...headers,
    "Content-Type": "application/json",
  };
  return fetch(`${baseURL}${url}`, {
    method,
    body: JSON.stringify(params),
    headers: allHeaders,
  });
};

const get = (url, params, headers, baseURL) => {
  return fetchRequest("GET", url, params, headers, baseURL);
};

const post = (url, params, headers, baseURL) => {
  return fetchRequest("POST", url, params, headers, baseURL);
};

const del = (url, params, headers, baseURL) => {
  return fetchRequest("DELETE", url, params, headers, baseURL);
};

const patch = (url, params, headers, baseURL) => {
  return fetchRequest("PATCH", url, params, headers, baseURL);
};

const put = (url, params, headers, baseURL) => {
  return fetchRequest("PUT", url, params, headers, baseURL);
};

export default { get, post, del, patch, put };
