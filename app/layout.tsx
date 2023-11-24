import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

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
			<body className={roboto.className}>
				<SessionProvider>
					<QueryProvider>
						{children}
						<Toaster />
					</QueryProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
