"use client";

import { SUB_MENUS } from "@/constants/data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface IPos {
	left: number;
	right: number;
}

function SubTopNavbar() {
	const pathname = usePathname();

	const handleSelect = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
		const left = (e.target as HTMLElement).offsetLeft;
		setPos({
			left: left,
			right: (e.target as HTMLElement).offsetWidth,
		});
	}, []);

	const menuComponents = useMemo(
		() =>
			SUB_MENUS.map((item) => (
				<Link
					href={item.link}
					key={item.link}
					className="font-bold h-full flex flex-col justify-center px-4"
					onClick={handleSelect}
					ref={(node) => {
						if (item.link !== `/${pathname.split("/")?.[1]}`) return;
						setPos({
							left: node?.offsetLeft || 0,
							right: node?.offsetWidth || 0,
						});
					}}
					shallow
				>
					{item.label}
				</Link>
			)),
		[]
	);

	const [pos, setPos] = useState<IPos | null>(null);

	useEffect(() => {
		if (pathname === "/") {
			setPos(null);
		}
	}, [pathname]);

	return (
		<div className="flex flex-col relative px-4 bg-white overflow-scroll shadow-md">
			<div className="flex items-center h-[40px] w-full">{menuComponents}</div>
			<div
				className="h-[3px] bg-green absolute bottom-0 transition-all duration-300"
				style={{
					left: `${pos?.left}px`,
					width: `${pos?.right}px`,
					display: pos ? "block" : "none",
				}}
			/>
		</div>
	);
}

export default SubTopNavbar;
