import Logo from "@/components/common/Logo";
import React from "react";

function NotFoundPage() {
	return (
		<div className="flex flex-col justify-center items-center gap-12 absolute top-0 bottom-0 left-0 right-0">
			<Logo />
			<div className="flex flex-col gap-4 justify-center items-center font-mono">
				<h1 className="text-8xl font-bold text-green-500">404</h1>
				<h1 className="text-6xl font-bold text-green-500">Not Found</h1>
			</div>
			<h2 className="text-slate-400">
				The page could not be found on the server!
			</h2>
		</div>
	);
}

export default NotFoundPage;
