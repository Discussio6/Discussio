import React from "react";
import FavoritesDetail from "./FavoritesDetail";

async function FavoritesPage() {
	return (
		<div className="flex flex-col gap-6">
			<div className="text-2xl font-bold">
				<span>Favorites</span>
			</div>
			<FavoritesDetail />
		</div>
	);
}

export default FavoritesPage;
