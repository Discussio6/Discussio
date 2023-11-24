import React from "react";

function Blocking() {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="w-full h-full flex flex-col justify-center items-center">
				<h1 className="text-3xl font-bold text-center">
					This is a private profile.
				</h1>
				<p className="text-lg text-center">
					You do not have permission to view this profile.
				</p>
			</div>
		</div>
	);
}

export default Blocking;
