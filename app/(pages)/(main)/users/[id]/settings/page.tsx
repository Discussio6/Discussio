import SettingsDetail from "./SettingsDetail";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function SettingsPage() {
  const session = await getServerSession(authOptions);
	return <SettingsDetail session={session} />;
}

export default SettingsPage;
