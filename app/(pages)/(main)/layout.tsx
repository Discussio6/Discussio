import SubTopNavbar from "@/components/SubTopNavbar"
import TopNavbar from "@/components/TopNavbar"

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <TopNavbar />
      <SubTopNavbar />
      {children}
    </div>
  )
}
