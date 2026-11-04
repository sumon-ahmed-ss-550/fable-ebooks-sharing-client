import { makeRequest } from "./core/api";

// Exchange Better Auth session for JWT token
export const exchangeToken = async (session) => {
  if (!session?.user) return null;

  try {
    const response = await makeRequest(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/token`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          email: session.user.email,
          name: session.user.name,
          role: session.user.role,
          image: session.user.image,
        }),
      }
    );

    if (response?.token) {
      localStorage.setItem("jwt_token", response.token);
      localStorage.setItem("user_info", JSON.stringify(response.user));
      return response;
    }
    return null;
  } catch (error) {
    console.error("Token exchange failed:", error);
    return null;
  }
};

// Get stored JWT token
export const getJWTToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("jwt_token");
};

// Get stored user info
export const getUserInfo = () => {
  if (typeof window === "undefined") return null;
  const userInfo = localStorage.getItem("user_info");
  return userInfo ? JSON.parse(userInfo) : null;
};

// Clear auth data
export const clearAuthData = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("user_info");
};

// Make authenticated request
export const makeAuthRequest = async (url, config = {}) => {
  const token = getJWTToken();

  if (!token) {
    throw new Error("No authentication token");
  }

  const authConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  return await makeRequest(url, authConfig);
};
