"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface TopSearchBarProps {
	onSearchCallback?: (keyword: string) => void;
}

function TopSearchBar({ onSearchCallback }: TopSearchBarProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [keyword, setKeyword] = useState("");
	const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && keyword) {
			onSearchCallback?.(keyword);
			router.push(`/search?key=${keyword}`);
		}
	};

	useEffect(() => {
		setKeyword(searchParams.get("key") || "");
	}, [searchParams]);

	return (
		<input
			className="w-full drop-shadow-md border-slate-100 border-2 outline-none text-sm caret-green-700 rounded-md py-1 px-2 focus:border-green-700 focus:ring-2 transition-all duration-150 ease-in-out"
			placeholder="🔎 Search for contents"
			value={keyword}
			onChange={(e) => setKeyword(e.target.value)}
			onKeyDown={onSearch}
		/>
	);
}

export default TopSearchBar;
