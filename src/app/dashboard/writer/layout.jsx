import { getAuthorization } from "@/lib/authorization";

const WriterLayout = async ({ children }) => {
  await getAuthorization("writer");
  return children;
};

export default WriterLayout;
