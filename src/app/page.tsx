import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session?.user) redirect("/dashboard/chats");
  if (!session?.user) redirect("/login");
}
