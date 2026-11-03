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

// get one ebook by id
export const getOneEbook = async (id) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/book/${id}`,
  );
};

// get published ebooks
export const getPublishedEbooks = async () => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/book/published`,
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
