import React from "react";

const baseUrl = process.env.REACT_APP_API_BASE;

export function apiFetch(url, options) {
  return fetch(`${baseUrl}/${url}`, options)
    .then(resp => resp.json()) // TODO: we can handle response.status errors here
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}

const useFetch = (url, options = {}) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setError(null);
    setLoading(true);
    const asyncFetch = async () => {
      const [error, response] = await apiFetch(url, options);
      if (error) setError(error);
      setResponse(response);
      setLoading(false);
    };
    asyncFetch();
  }, []);

  return { response, error, loading };
};

export default useFetch;
