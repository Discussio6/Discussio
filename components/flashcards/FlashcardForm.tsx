"use client";

import React, { useMemo } from "react";
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
import {
	DragDropContext,
	Droppable,
	Draggable,
	OnDragEndResponder,
} from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import { Flashcard, SingleResponse } from "@/types/schema";
import { Input } from "../ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Badge } from "../ui/badge";
import { GripVerticalIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import TagAutocomplete from "../discussions/TagAutocomplete";
import { Slider } from "../ui/slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Acl } from "@prisma/client";

export const flashcardFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Title should be at least 2 characters" })
		.max(255, { message: "Title is at most 255 characters" }),
	description: z
		.string()
		.max(500, { message: "Description is at most 500 characters" }),
	acl: z.nativeEnum(Acl),
	tags: z.array(z.string()),
	contents: z.array(
		z.object({
			id: z.number().optional(),
			tid: z.number().optional(),
			question: z
				.string()
				.max(500, { message: "Question is at most 500 characters" }),
			answer: z
				.string()
				.max(500, { message: "Answer is at most 500 characters" }),
			difficulty: z
				.number()
				.min(0, { message: "Difficulty should be at least 0" })
				.max(999, { message: "Difficulty should be at most 999" }),
		})
	),
});

export type FlashcardFormType = UseFormReturn<
	z.infer<typeof flashcardFormSchema>
>;

export type onSuccess = ({
	form,
	res,
}: {
	form: FlashcardFormType;
	res: SingleResponse<Flashcard>;
}) => void;

interface FlashcardFormProps {
	initialData?: Partial<z.infer<typeof flashcardFormSchema>>;
	onSubmit: (
		values: z.infer<typeof flashcardFormSchema>,
		form: FlashcardFormType
	) => void;
}

let curId = 1;
const getId = () => curId++;

function FlashcardForm({ onSubmit, initialData }: FlashcardFormProps) {
	const data = useMemo(() => {
		if (!initialData) return;
		return {
			...initialData,
			contents: (initialData?.contents ?? []).map((content) => ({
				...content,
				tid: getId(),
			})),
		};
	}, [initialData]);
	const form = useForm<z.infer<typeof flashcardFormSchema>>({
		resolver: zodResolver(flashcardFormSchema),
		defaultValues: {
			name: "",
			description: "",
			tags: [],
			acl: "PUBLIC",
			contents: [{ question: "", answer: "", difficulty: 0, tid: 0 }],
			...data,
		},
	});
	const { fields, append, move, remove } = useFieldArray({
		control: form.control,
		name: "contents",
	});

	const handleSubmit = async (values: z.infer<typeof flashcardFormSchema>) => {
		onSubmit(values, form);
	};

	const handleDrag: OnDragEndResponder = ({ source, destination }) => {
		if (destination) {
			move(source.index, destination.index);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-bold text-md">
								Flashcard Name
							</FormLabel>
							<FormControl>
								<Input placeholder="Enter the name..." {...field} />
							</FormControl>
							<FormDescription>
								The name should be at least 2 chatracters and at most 255
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
							<FormLabel className="font-bold text-md">
								Flashcard Description
							</FormLabel>
							<FormControl>
								<MDEditor placeholder="Enter the description..." {...field} />
							</FormControl>
							<FormDescription>At most 500 characters</FormDescription>
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
				/>
				<FormField
					control={form.control}
					name="acl"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-bold text-md">
								ACL (Access Control Level)
							</FormLabel>
							<FormControl>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder="choose access..." />
									</SelectTrigger>
									<SelectContent>
										{Object.keys(Acl).map((key) => (
											<SelectItem key={key} value={key}>
												{key.toLowerCase()}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-col gap-1">
					<h2 className="font-bold text-lg">Questions & Answers</h2>
					<DragDropContext onDragEnd={handleDrag}>
						<Droppable droppableId={`droppable`}>
							{(provided, snapshot) => (
								<div
									className="flex flex-col"
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{fields.map((item, index) => {
										return (
											<Draggable
												key={item.tid}
												draggableId={item.tid!.toString()}
												index={index}
											>
												{(provided, snapshot) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														className="flex flex-col gap-4 p-4 my-2 rounded-lg bg-green-50 drop-shadow-md"
													>
														<div className="flex items-center gap-2">
															<div
																className="flex justify-between items-center flex-1"
																{...provided.dragHandleProps}
															>
																<span className="font-bold">
																	Question {index + 1}
																</span>
																<GripVerticalIcon className="text-slate-400 w-5 h-5" />
															</div>
															<Button
																size="icon"
																variant="destructive"
																type="button"
																className="shrink-0"
																onClick={() => remove(index)}
															>
																<TrashIcon className="w-4 h-4" />
															</Button>
														</div>
														<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
															<FormField
																control={form.control}
																name={`contents.${index}.question`}
																render={({ field }) => (
																	<FormItem className="">
																		<FormLabel className="font-bold text-md">
																			question
																		</FormLabel>
																		<FormControl>
																			<Input
																				value={field.value}
																				onChange={field.onChange}
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
															<FormField
																control={form.control}
																name={`contents.${index}.answer`}
																render={({ field }) => (
																	<FormItem className="">
																		<FormLabel className="font-bold text-md">
																			answer
																		</FormLabel>
																		<FormControl>
																			<Input
																				value={field.value}
																				onChange={field.onChange}
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
															<FormField
																control={form.control}
																name={`contents.${index}.difficulty`}
																render={({ field }) => (
																	<FormItem className="lg:col-span-2">
																		<FormLabel className="font-bold text-md">
																			difficulty
																		</FormLabel>
																		<FormControl>
																			<Slider
																				min={0}
																				max={10}
																				className="cursor-pointer"
																				value={[field.value]}
																				onValueChange={(value) =>
																					field.onChange(value[0])
																				}
																			/>
																		</FormControl>
																		<FormDescription>
																			{field.value} (0 - 10)
																		</FormDescription>
																		<FormMessage />
																	</FormItem>
																)}
															/>
														</div>
													</div>
												)}
											</Draggable>
										);
									})}

									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
				<Button
					type="button"
					className="flex items-center gap-2 w-full"
					variant="outline"
					onClick={() =>
						append({ question: "", answer: "", difficulty: 0, tid: getId() })
					}
				>
					<PlusIcon className="w-4 h-4" />
					Add new field
				</Button>
				<div className="flex items-center gap-2">
					<Button type="submit" variant="primary">
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}

export default FlashcardForm;
