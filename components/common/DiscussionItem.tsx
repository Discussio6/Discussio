"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Badge } from "../ui/badge";

function DiscussionItem() {
	return (
		<div className="flex flex-col gap-1 border p-4 rounded-lg">
			<div className="text-lg font-bold line-clamp-2 text-blue-500 hover:text-blue-700 cursor-pointer transition-all duration-200 ease-in-out">
				Pandas: Merge two dataframes with different dates, using interpolate for
				numeric values and ffill for dates and boolean data
			</div>
			<div className="text-sm line-clamp-2">
				I have two pandas dataframes to merge with intwo pandas dataframes to
				merge with intwo pandas dataframes to merge with intwo pandas dataframes
				to merge with interpolate() on the missing numeric data and with ffill()
				on boolean data and dates. The source data looks like this: df1 Date
				Unemployment Rate ...I have two pandas dataframes to merge with
				interpolate() on the missing numeric data and with ffill() on boolean
				data and dates. The source data looks like this: df1 Date Unemployment
				Rate ... have two pandas dataframes to merge with interpolate() on the
				missing numeric data and with ffill() on boolean data and dates. The
				source data looks like this: df1 Date Unemployment Rate ...I have two
				pandas dataframes to merge with interpolate() on the missing numeric
				data and with ffill() on boolean data and dates. The source data looks
				like this: df1 Date Unemployment Rate ...
			</div>
			<div className="flex items-center gap-2 text-sm text-slate-500">
				<div>조회 0</div>
				<div>추천 0</div>
			</div>
			<div className="mt-2 flex justify-between items-center">
				<div className="space-x-2 line-clamp-1 flex-1">
					<Badge className="p-2 rounded-lg text-blue-600 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-200">
						컴퓨터 공학
					</Badge>
					<Badge className="p-2 rounded-lg text-blue-600 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-200">
						컴퓨터 공학
					</Badge>
					<Badge className="p-2 rounded-lg text-blue-600 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-200">
						컴퓨터 공학
					</Badge>
				</div>
				<div className="flex items-center gap-4 shrink-0">
					<div className="flex gap-1 items-center">
						<Avatar className="w-8 h-8">
							<AvatarImage src="/images/google-login-icon.svg"></AvatarImage>
						</Avatar>
						<div className="shrink-0 flex items-center gap-2 text-blue-600">
							chanhwi
						</div>
					</div>
					<div className="shrink-0 flex items-center gap-2 text-xs text-slate-500">
						1시간 전
					</div>
				</div>
			</div>
		</div>
	);
}

export default DiscussionItem;
