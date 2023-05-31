import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Jost } from "next/font/google";
import { Icons } from "@/components/icons";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "orin - A messenger app",
  description:
    "Instant messaging app for text communication between users, with real-time delivery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        {children}
        <Toaster
          toastOptions={{
            style: {
              background: "var(--cotton)",
              color: "var(--midnight)",
              fontSize: "20px",
              padding: "8px 12px 8px 22px",
              textAlign: "center",
            },
            success: {
              icon: <Icons.check />,
            },
            error: {
              icon: <Icons.cross />,
            },
          }}
        />
      </body>
    </html>
  );
}
