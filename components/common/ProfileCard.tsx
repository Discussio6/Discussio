import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

interface ProfileCardProps {
	name: string;
	image: string;
	id: string;
}

function ProfileCard({ name, image, id }: ProfileCardProps) {
	return (
		<Link href={`/users/${id}`} className="flex items-center gap-2 w-fit">
			<Avatar className="w-8 h-8">
				<AvatarImage src={image} />
				<AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
			</Avatar>
			<h3 className="">{name}</h3>
		</Link>
	);
}

export default ProfileCard;
