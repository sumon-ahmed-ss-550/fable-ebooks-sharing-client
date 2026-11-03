import { makeRequest } from "../core/api";

// get ebooks by writerId
export const getEbooksByWriterId = async (writerId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/book?writerId=${writerId}`,
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
