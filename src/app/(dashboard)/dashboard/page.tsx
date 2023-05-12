import NavMenu from "@/components/navMenu";
import { authOptions } from "@/lib/auth";
import { getUser } from "@/lib/session";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const user = await getUser();

  return (
    user && (
      <>
        <NavMenu user={user} />
      </>
    )
  );
};

export default Dashboard;
