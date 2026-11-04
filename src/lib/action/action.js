import { makeRequest } from "../core/api";

// --- WRITER ACTIONS ---

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

// --- READER ACTIONS ---

// reader complete ebook purchase
export const readerMakePurchase = async (purchasePayload) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reader/purchase`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(purchasePayload),
    },
  );
};

// toggle bookmark
export const readerToggleBookmark = async (userId, ebookId) => {
  console.log("Sending bookmark toggle request:", { userId, ebookId });
  const result = await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reader/bookmark/toggle`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId, ebookId }),
    },
  );
  console.log("Bookmark toggle response:", result);
  return result;
};

// update profile
export const readerUpdateProfile = async (userId, payload) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reader/profile/${userId}`,
    {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
};

// --- ADMIN ACTIONS ---

// change user role
export const adminChangeUserRole = async (userId, newRole) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${userId}/role`,
    {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    },
  );
};

// delete user
export const adminDeleteUser = async (userId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${userId}`,
    {
      method: "DELETE",
    },
  );
};

// admin toggle ebook status
export const adminChangeEbookStatus = async (ebookId, newStatus) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/ebooks/${ebookId}/status`,
    {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    },
  );
};

// admin delete ebook
export const adminDeleteEbook = async (ebookId) => {
  return await makeRequest(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/ebooks/${ebookId}`,
    {
      method: "DELETE",
    },
  );
};
