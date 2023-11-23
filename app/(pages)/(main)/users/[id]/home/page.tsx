import { db } from "@/lib/db";
import { User } from "@/types/schema";
import React from "react";

interface Props {
	params: {
		id: string;
	};
}

async function HomePage({ params: { id } }: Props) {
	const user = (await db.user.findUnique({
		where: {
			id,
		},
	})) as User;

	return <div>{user.name}</div>;
}

export default HomePage;
