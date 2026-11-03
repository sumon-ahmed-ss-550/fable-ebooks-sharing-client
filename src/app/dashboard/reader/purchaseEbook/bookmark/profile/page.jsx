import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileManager from "@/components/reader/ProfileManager";

const ReaderProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      <ProfileManager user={user} />
    </div>
  );
};

export default ReaderProfilePage;
