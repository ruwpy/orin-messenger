import { authOptions } from "@/lib/auth";
import { getUser } from "@/lib/session";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const user = await getUser();

  return <div>Hello, {user?.name}</div>;
};

export default Dashboard;
