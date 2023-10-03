"use client"
import * as React from "react";
import { cn } from "@/lib/utils";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};
const TextField = React.forwardRef<
    HTMLInputElement,
    TextFieldProps
>(({className, ...props}, ref) => (
    <input
        ref={ref}
        className={cn(
            "block text-sm font-medium text-gray-900 rounded-lg",
            className
        )}
        {...props}
    />
));
export { TextField }