import React from "react";
import UploadsDetail from "./UploadsDetail";

async function UploadsPage() {
	return (
		<div className="flex flex-col gap-6">
			<div className="text-2xl font-bold">
				<span>Uploads</span>
			</div>
			<UploadsDetail />
		</div>
	);
}

export default UploadsPage;
