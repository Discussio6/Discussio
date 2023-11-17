"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteFlashcard } from "@/lib/queries/flashcards";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface ActionBtnProps {
	id: number;
}

function ActionBtn({ id }: ActionBtnProps) {
	const router = useRouter();
	const deleteMutation = useDeleteFlashcard();

	const handleDelete = useCallback(() => {
		deleteMutation.mutate(
			{ id },
			{
				onSuccess(data, variables, context) {
					router.replace("/flashcards");
				},
			}
		);
	}, [id]);

	return (
		<AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size="icon" variant="ghost">
						<DotsHorizontalIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<Link href={`/flashcards/upload/${id}`}>
						<DropdownMenuItem className="cursor-pointer">
							<EditIcon className="w-4 h-4 mr-2" />
							<span>Edit</span>
						</DropdownMenuItem>
					</Link>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem className="cursor-pointer">
							<TrashIcon className="w-4 h-4 mr-2" />
							<span>Delete</span>
						</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete the flashcard?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Deleted flashcard cannot be recovered, and all participation records
						will also be deleted.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						className="bg-red-500 hover:bg-red-500/90"
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ActionBtn;
