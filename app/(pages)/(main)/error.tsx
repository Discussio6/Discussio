"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);
	const router = useRouter();

	return (
		<div className="flex flex-col gap-8 mt-16 justify-center items-center">
			<h1 className="text-5xl font-bold">Oops !</h1>
			<h2 className="text-2xl font-bold">Something went wrong!</h2>
			<div className="flex gap-2 items-center">
				<Button
					variant="secondary"
					onClick={
						// Attempt to recover by trying to re-render the segment
						() => reset()
					}
				>
					Try again
				</Button>
				<Button variant="primary" onClick={() => router.back()}>
					Back to home
				</Button>
			</div>
		</div>
	);
}
