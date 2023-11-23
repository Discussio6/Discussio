import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Discussio",
	description: "Community facilitating learning and discussion",
	icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider>
					<QueryProvider>{children}</QueryProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
