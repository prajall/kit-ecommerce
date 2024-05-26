import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Providers from "@/components/Providers";
import Navbar from "@/components/nav/Navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const font = Poppins({ weight: "400", subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Kit | Easy Fashion solution",
  description: "Fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cn(
          font.className,
          "relative h-full antialiased max-w-screen-2xl text-sm mx-auto"
        )}
      >
        <Toaster />
        <MaxWidthWrapper>
          <Providers>
            <div className=" relative">
              <Navbar />

              <div className="flex-grow flex-1 mt-16 ">{children}</div>
            </div>
          </Providers>
        </MaxWidthWrapper>
      </body>
    </html>
  );
}
