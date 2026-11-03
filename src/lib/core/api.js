export const makeRequest = async (url, config) => {
  const res = await fetch(url, config);
  if (!res.ok) {
    throw new Error(`Failed to fetch data ${res.status}`);
  }

  const responseText = await res.text();
  return responseText ? JSON.parse(responseText) : null;
};
