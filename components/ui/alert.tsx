"use client"
import * as React from "react";
import { cn } from "@/lib/utils";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
interface AlertProps extends React.ComponentPropsWithoutRef<typeof AlertDialog.Root> {
    children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = (props) => (
    <AlertDialog.Root
        {...props}
    />
);
const AlertTrigger = React.forwardRef<
    React.ElementRef<typeof AlertDialog.Trigger>,
    React.ComponentPropsWithoutRef<typeof AlertDialog.Trigger>
>((props, ref) => (
    <AlertDialog.Trigger
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700",
            props.className
        )}
        {...props}
    />
));

export { Alert, AlertTrigger };
