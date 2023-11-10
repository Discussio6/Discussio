import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			// FIX: Ref should be passed to the outermost element
			<div className="flex flex-row items-left justify-left">
				<Icon icon="material-symbols:search" />
				<input
					type={type}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
SearchBar.displayName = "SearchBar";

export { SearchBar };
