import NavMenu from "@/components/navMenu";
import { getUser } from "@/lib/session";

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
