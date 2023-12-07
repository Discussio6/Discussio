"use client";

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import {
	Command,
	CommandInput,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "../ui/command";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useGetTags, usePostTag } from "@/lib/queries/tags";
import { useDebounce } from "@/hooks/useDebounce";

interface TagAutocompleteProps {
	value: string[];
	onSelect: (value: string) => void;
}

export function TagAutocomplete({ value, onSelect }: TagAutocompleteProps) {
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const postTag = usePostTag();
	const debouncedInputValue = useDebounce(inputValue, 200);
	const { data: tags } = useGetTags({ keyword: debouncedInputValue });
	const filteredTags = tags?.hits.filter((tag) => !value?.includes(tag.name));

	const handleCreateTag = useCallback(() => {
		postTag.mutate(
			{ name: inputValue },
			{
				onSuccess: (data, variables, context) => {
					onSelect(variables.name);
					setOpen(false);
				},
				onError: (err) => {
					alert("에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
				},
			}
		);
	}, [inputValue, postTag]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[250px] justify-between"
				>
					Add tags
					<PlusIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[250px] p-0">
				<Command>
					<CommandInput
						value={inputValue}
						onValueChange={setInputValue}
						placeholder="Search tags..."
					/>
					<CommandEmpty>
						<div className="flex flex-col gap-4 text-slate-400">
							<span>No search results</span>
							<Button
								className="w-fit mx-auto flex items-center gap-1 text-slate-600"
								variant="ghost"
								onClick={handleCreateTag}
							>
								<PlusCircleIcon className="w-4 h-4" />
								<span>Add a new tag</span>
							</Button>
						</div>
					</CommandEmpty>
					<CommandGroup>
						{(filteredTags ?? []).map((option) => (
							<CommandItem
								key={option.name}
								value={option.name}
								className="cursor-pointer"
								onSelect={() => {
									onSelect(option.name);
									setInputValue("");
									setOpen(false);
								}}
							>
								{option.name}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default TagAutocomplete;
