export const makeRequest = async (url, config) => {
  // Add JWT token if available (for protected routes)
  let authConfig = { ...config };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      authConfig = {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
  }

  const res = await fetch(url, authConfig);
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`API Error ${res.status}:`, errorText);
    throw new Error(`Failed to fetch data ${res.status}`);
  }

  const responseText = await res.text();
  return responseText ? JSON.parse(responseText) : null;
};
