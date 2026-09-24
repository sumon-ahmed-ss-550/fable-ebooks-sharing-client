import { getAuthorization } from "@/lib/authorization";

const ReaderLayout = async ({ children }) => {
  await getAuthorization("reader");
  return children;
};

export default ReaderLayout;
