import ManageEbooks from "@/components/writer/ManageEbooks";
import { auth } from "@/lib/auth";
import { getEbooksByWriterId } from "@/lib/queries/queries";
import { headers } from "next/headers";

const WriterHomePage = async () => {
  // user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const ebook = await getEbooksByWriterId(user?.id);

  return (
    <div className="min-h-screen p-4 md:p-8 text-zinc-100">
      <div className="max-w-6xl mx-auto">
        <ManageEbooks ebook={ebook} />
      </div>
    </div>
  );
};

export default WriterHomePage;
