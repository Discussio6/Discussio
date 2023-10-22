import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfileCardProps {
	name: string;
	image: string;
}

function ProfileCard({ name, image }: ProfileCardProps) {
	return (
		<div className="flex items-center gap-2 w-fit">
			<Avatar className="">
				<AvatarImage src={image} />
				<AvatarFallback>{name}</AvatarFallback>
			</Avatar>
			<h3 className="text-sm text-blue-500">{name}</h3>
		</div>
	);
}

export default ProfileCard;
