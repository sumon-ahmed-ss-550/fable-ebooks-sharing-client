import { getAuthorization } from "@/lib/authorization";

const AdminLayout = async ({ children }) => {
  await getAuthorization("admin");
  return children;
};

export default AdminLayout;
