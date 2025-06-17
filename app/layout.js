import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "MarketSimplified",
    description: "Created by Jacob Delega",
};

export default function RootLayout({ children, session }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <SessionProvider session={session}>
                    {children}
                    <Toaster />
                </SessionProvider>
            </body>
        </html>
    );
}
