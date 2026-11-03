"use server";
import { makeRequest } from "../core/api";

// writer make ebook insert request
export const writerInsertEbook = async (ebookPayload) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/book`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(ebookPayload),
    },
  );
};

// change published and unpublished status
export const changePublishedAndUnpublishedStatus = async (id, newStatus) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/book/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
      headers: {
        "content-type": "application/json",
      },
    },
  );
};

// update ebook details
export const updateEbook = async (id, ebookPayload) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/book/update/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(ebookPayload),
      headers: {
        "content-type": "application/json",
      },
    },
  );
};

// delete ebook
export const deleteEbook = async (id) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/writer/book/delete/${id}`,
    {
      method: "DELETE",
    },
  );
};
