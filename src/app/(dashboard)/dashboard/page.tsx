import NavMenu from "@/components/navMenu";
import { getUser } from "@/lib/session";
import { ReactNode } from "react";

const Dashboard = async ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Dashboard;
