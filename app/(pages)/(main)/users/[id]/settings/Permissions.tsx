"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { postPermissions, usePostPermissions } from "@/lib/queries/permissions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Acl } from "@prisma/client";
import { revalidatePath } from "next/cache";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const permissionFormSchema = z.object({
	home: z.nativeEnum(Acl),
	favorites: z.nativeEnum(Acl),
	uploads: z.nativeEnum(Acl),
});

export type permissionsType = z.infer<typeof permissionFormSchema>;

const options = Object.keys(Acl).map((key) => key);

interface PermissionsProps {
	initialPermissions: permissionsType | null;
}

function Permissions({ initialPermissions }: PermissionsProps) {
	const { toast } = useToast();
	const form = useForm<permissionsType>({
		resolver: zodResolver(permissionFormSchema),
		defaultValues: {
			home: "PUBLIC",
			favorites: "PUBLIC",
			uploads: "PUBLIC",
			...initialPermissions,
		},
	});
	const postPermissions = usePostPermissions();

	const handleSubmit = async (values: z.infer<typeof permissionFormSchema>) => {
		postPermissions.mutate(values, {
			onSuccess: (data) => {
				form.reset(data);
				toast({ title: "Permissions updated!", variant: "success", duration: 1000 });
				revalidatePath("/users/[id]/home");
				revalidatePath("/users/[id]/favorites");
				revalidatePath("/users/[id]/uploads");
			},
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Permission Settings</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-8"
					>
						<FormField
							control={form.control}
							name="home"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Home</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger>
												<SelectValue placeholder="choose access..." />
											</SelectTrigger>
											<SelectContent>
												{options.map((option) => (
													<SelectItem key={option} value={option}>
														{option}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="favorites"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Favorites</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger>
												<SelectValue placeholder="choose access..." />
											</SelectTrigger>
											<SelectContent>
												{options.map((option) => (
													<SelectItem key={option} value={option}>
														{option}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="uploads"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Uploads</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger>
												<SelectValue placeholder="choose access..." />
											</SelectTrigger>
											<SelectContent>
												{options.map((option) => (
													<SelectItem key={option} value={option}>
														{option}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							variant="primary"
							type="submit"
							disabled={!form.formState.isDirty}
							className={cn(postPermissions.isLoading && "opacity-50 animate-pulse")}
						>
							Save changes
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export default Permissions;
