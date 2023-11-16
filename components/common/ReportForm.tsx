import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const reportFormSchema = z.object({
	title: z
		.string()
		.min(2, { message: "Title should be at least 2 characters" })
		.max(255, { message: "Title should be at most 255 characters" }),
	description: z
		.string()
		.max(500, { message: "Description should be at most 500 characters" }),
});

export type ReportFormType = UseFormReturn<z.infer<typeof reportFormSchema>>;

export interface ReportFormProps {
	onSubmit: (
		values: z.infer<typeof reportFormSchema>,
		form: ReportFormType
	) => void;
	onCancel?: () => void;
}

function ReportForm({ onSubmit, onCancel }: ReportFormProps) {
	const form = useForm<z.infer<typeof reportFormSchema>>({
		resolver: zodResolver(reportFormSchema),
		defaultValues: { title: "", description: "" },
	});

	const handleSubmit = async (values: z.infer<typeof reportFormSchema>) => {
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
							<FormLabel className="font-bold text-md">Reason</FormLabel>
							<FormControl>
								<Input placeholder="Reason for the report..." {...field} />
							</FormControl>
							<FormDescription>
								At least 2 chatracters and at most 255
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-bold text-md">Details</FormLabel>
							<FormControl>
								<Textarea
									className="resize-none"
									placeholder="Detailed explanation..."
									{...field}
								/>
							</FormControl>
							<FormDescription>At most 500 characters</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
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

export default ReportForm;
