export const makeRequest = async (url, config) => {
  console.log("=== API Request ===");
  console.log("URL:", url);
  console.log("Config:", config);

  // Add JWT token if available (for protected routes)
  let authConfig = { ...config };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jwt_token");
    console.log("JWT Token:", token ? token.substring(0, 20) + "..." : "NOT SET");
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

  console.log("Final request config:", authConfig);

  try {
    const res = await fetch(url, authConfig);
    console.log("Response status:", res.status);
    console.log("Response ok:", res.ok);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error ${res.status}:`, errorText);
      throw new Error(`Failed to fetch data ${res.status}: ${errorText}`);
    }

    const responseText = await res.text();
    const data = responseText ? JSON.parse(responseText) : null;
    console.log("Response data:", data);
    console.log("=== API Request Complete ===");
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
