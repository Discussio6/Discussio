"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useForm } from "react-hook-form";
import { Discussion, SingleResponse } from "@/types/schema";
import { Input } from "../ui/input";
import MDEditor from "@uiw/react-md-editor";
import { usePostDiscussion } from "@/lib/queries/discussions";
import TagAutocomplete from "./TagAutocomplete";
import { Badge } from "../ui/badge";
import { XIcon } from "lucide-react";

export const discussionFormSchema = z.object({
	title: z
		.string()
		.min(3, { message: "제목은 3글자 이상이어야 합니다" })
		.max(255, { message: "제목은 최대 255자입니다" }),
	content: z.string().max(5000, { message: "내용은 최대 5000자입니다" }),
	tags: z.array(z.string()),
});

export type DiscussionFormType = UseFormReturn<
	z.infer<typeof discussionFormSchema>
>;

export type onSuccess = ({
	form,
	res,
}: {
	form: DiscussionFormType;
	res: SingleResponse<Discussion>;
}) => void;

interface DiscussionFormProps {
	initialData?: Partial<z.infer<typeof discussionFormSchema>>;
	onSubmit: (
		values: z.infer<typeof discussionFormSchema>,
		form: DiscussionFormType
	) => void;
	onCancel?: () => void;
}

function DiscussionForm({
	onSubmit,
	onCancel,
	initialData,
}: DiscussionFormProps) {
	const form = useForm<z.infer<typeof discussionFormSchema>>({
		resolver: zodResolver(discussionFormSchema),
		defaultValues: { title: "", content: "", tags: [], ...initialData },
	});

	const handleSubmit = async (values: z.infer<typeof discussionFormSchema>) => {
		onSubmit(values, form);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-bold text-md">Title</FormLabel>
							<FormControl>
								<Input placeholder="Enter the title..." {...field} />
							</FormControl>
							<FormDescription>
								The title should be at least 3 chatracters and at most 255
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-bold text-md">Contents</FormLabel>
							<FormControl>
								<MDEditor placeholder="Enter the contents..." {...field} />
							</FormControl>
							<FormDescription>At most 5000 characters</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tags"
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel className="font-bold text-md">Tags</FormLabel>
							<FormControl>
								<div className="flex flex-col gap-4">
									<TagAutocomplete
										value={value}
										onSelect={(newValue) => {
											onChange([...value, newValue]);
										}}
									/>
									<div className="flex gap-2">
										{value.map((tag) => (
											<Badge
												key={tag}
												className="p-2 rounded-lg text-blue-600 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-200"
												onClick={() =>
													onChange(value.filter((item) => item !== tag))
												}
											>
												{tag}
												<XIcon className="w-4 h-4" />
											</Badge>
										))}
									</div>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
				<div className="flex items-center gap-2">
					<Button type="submit" variant="primary">
						Submit
					</Button>
					{onCancel && (
						<Button type="button" variant="secondary" onClick={onCancel}>
							Cancel
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
}

export default DiscussionForm;
