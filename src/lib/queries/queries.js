import { makeRequest } from "../core/api";

// --- WRITER QUERIES ---

// get ebooks by writerId
export const getEbooksByWriterId = async (writerId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/book?writerId=${writerId}`,
  );
};

// get writer sales
export const getWriterSales = async (writerId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/sales?writerId=${writerId}`,
  );
};

// get all writers with stats
export const getAllWriters = async () => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/all`,
  );
};

// get writer profile with books
export const getWriterProfile = async (writerId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/${writerId}`,
  );
};

// get one ebook by id
export const getOneEbook = async (id) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/book/${id}`,
  );
};

// get published ebooks with pagination and filters
export const getPublishedEbooks = async (params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ebook/published${queryParams ? `?${queryParams}` : ""}`,
  );
};

// --- READER QUERIES ---

// get reader purchases
export const getReaderPurchases = async (readerId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reader/purchase?readerId=${readerId}`,
  );
};

// get reader purchased ebooks
export const getReaderPurchasedEbooks = async (readerId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reader/purchased-ebooks?readerId=${readerId}`,
  );
};

// check if reader purchased book
export const checkReaderPurchased = async (readerId, ebookId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reader/purchase-status?readerId=${readerId}&ebookId=${ebookId}`,
  );
};

// get user bookmarks
export const getReaderBookmarks = async (userId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reader/bookmark?userId=${userId}`,
  );
};

// get user bookmark ids
export const getReaderBookmarkIds = async (userId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reader/bookmark/ids?userId=${userId}`,
  );
};

// --- ADMIN QUERIES ---

// get all users
export const getAdminUsers = async () => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users`,
  );
};

// get all ebooks
export const getAdminAllEbooks = async () => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/ebooks`,
  );
};

// get all transactions
export const getAdminTransactions = async () => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/transactions`,
  );
};

// get admin dashboard stats
export const getAdminStats = async () => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/stats`,
  );
};

// --- PAYMENT QUERIES ---

// create ebook checkout session
export const createEbookCheckoutSession = async (userId, ebookId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment/create-checkout-session`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId, ebookId }),
    }
  );
};

// create writer verification checkout session
export const createVerificationCheckoutSession = async (userId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment/create-verification-session`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId }),
    }
  );
};

// get session status
export const getSessionStatus = async (sessionId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment/session/${sessionId}`,
  );
};

// --- IMAGE QUERIES ---

// upload image to ImgBB
export const uploadImage = async (imageData) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/image/upload`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ image: imageData }),
    }
  );
};

// --- EBOOK CONTENT QUERIES ---

// get ebook content (protected)
export const getEbookContent = async (ebookId, userId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ebook/${ebookId}/content?userId=${userId}`,
  );
};
