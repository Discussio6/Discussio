import { Session } from "next-auth";

import Profiles from "./Profiles";
import Permissions, { permissionsType } from "./Permissions";

interface SettingsDetailProps {
	session: Session | null;
	permissions: permissionsType | null;
}

function SettingsDetail({ session, permissions }: SettingsDetailProps) {
	return (
		<div className="flex flex-col gap-8">
			<Profiles session={session} />
			<Permissions initialPermissions={permissions} />
		</div>
	);
}

export default SettingsDetail;
