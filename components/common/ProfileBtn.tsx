import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";

function ProfileBtn() {
	return (
		<Popover>
			<PopoverTrigger asChild className="cursor-pointer">
				<Avatar>
                    <AvatarImage src="" />
					<AvatarFallback>P</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent>Hello world</PopoverContent>
		</Popover>
	);
}

export default ProfileBtn;
