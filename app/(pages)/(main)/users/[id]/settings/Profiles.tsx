"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Session } from "next-auth";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/components/common/uploadthing";
import { useSession } from "next-auth/react";
import { usePatchUser } from "@/lib/queries/users";
import { toast } from "@/components/ui/use-toast";
import { revalidatePath } from "next/cache";
import { usePathname, useRouter } from "next/navigation";
import BeatLoader from "@/components/common/BeatLoader";

const profileFormSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	image: z.string().url(),
});

export type profileType = z.infer<typeof profileFormSchema>;

function Profiles({ session }: { session: Session | null }) {
	const { update } = useSession();
	const router = useRouter();
	const patchUser = usePatchUser();
	const [edit, setEdit] = useState(false);
	const form = useForm<profileType>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			name: session?.user?.name ?? "",
			email: session?.user?.email ?? "",
			image: session?.user?.image ?? "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof profileFormSchema>) => {
		const body = { ...values, id: session?.id! };
		patchUser.mutate(body, {
			onSuccess: (data) => {
				const user = data.data;
				setEdit(false);
				form.reset(user);
				toast({
					title: "Profile updated!",
					variant: "success",
					duration: 1000,
				});
				update({
					...session,
					user: { name: user.name, email: user.email, image: user.image },
				}).then((res) => {
					router.refresh();
				});
				revalidatePath("/users/[id]/home");
				revalidatePath("/users/[id]/favorites");
				revalidatePath("/users/[id]/uploads");
			},
		});
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>Profile settings</CardTitle>
					<Button variant="outline" onClick={() => setEdit((edit) => !edit)}>
						Edit Profile
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				{!edit ? (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-3">
							<span className="text-sm font-bold">Profile Image</span>
							<Image
								className="border-2 shadow-sm"
								src={session?.user?.image || ""}
								width={96}
								height={96}
								alt="pic"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold">Name</span>
							<span className="text-sm text-slate-500">
								{session?.user?.name}
							</span>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold">Email</span>
							<span className="text-sm text-slate-500">
								{session?.user?.email}
							</span>
						</div>
					</div>
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="flex flex-col gap-4"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="your name..."
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
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="your email..."
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
								name="image"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Profile Image</FormLabel>
										<FormControl>
											<div className="flex flex-col gap-4">
												<Image
													src={field.value}
													width={128}
													height={128}
													alt="pic"
												/>
												<UploadDropzone
													endpoint="imageUploader"
													onBeforeUploadBegin={(files) => {
														const blob = files[0] as Blob;
														return [
															new File([blob], escape(blob.name), {
																type: blob.type,
															}),
														];
													}}
													onClientUploadComplete={(res) => {
														field.onChange(res[0].url);
													}}
													onUploadError={(err) => {
														toast({
															title: "Error uploading image",
															variant: "destructive",
															duration: 1000,
														});
													}}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end items-center gap-2">
								<Button variant="primary" type="submit">
									Save
								</Button>
								<Button
									variant="secondary"
									type="button"
									onClick={() => {
										setEdit(false);
										form.reset();
									}}
								>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	);
}

export default Profiles;
