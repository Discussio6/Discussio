import SubTopNavbar from "@/components/SubTopNavbar";
import TopNavbar from "@/components/TopNavbar";

export default function LandingPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-full">
			<div className="sticky top-0 z-50">
				<TopNavbar />
				<SubTopNavbar />
			</div>
			{children}
		</div>
	);
}
