import type { Metadata } from "next";
import "./globals.css"
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar />
        <div className="flex bg-[#212121]">
          <Sidebar />
          <div className="content p-4 w-[80vw] h-[88.5vh] overflow-auto ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}


