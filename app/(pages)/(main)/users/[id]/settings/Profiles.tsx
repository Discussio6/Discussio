"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Session } from "next-auth";

import Image from "next/image";

function Profiles({ session }: { session: Session | null }) {
	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>Profile settings</CardTitle>
					<Button variant="outline">Edit Profile</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
					<div className="flex flex-col gap-3">
						<span className="text-sm font-bold">Profile Image</span>
						<Image
							className="rounded-full"
							src={session?.user?.image || ""}
							width={96}
							height={96}
							alt="pic"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-sm font-bold">Name</span>
						<span className="text-sm text-slate-500">
							{session?.user?.name}
						</span>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-sm font-bold">Email</span>
						<span className="text-sm text-slate-500">
							{session?.user?.email}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default Profiles;
