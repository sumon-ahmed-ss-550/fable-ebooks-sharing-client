import { redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";

export const getAuthorization = async (role) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return redirect("/signIn");
  }

  if (user?.role !== role) {
    return redirect("/unauthorized");
  }
};
