import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import { cn } from '@/lib/utils';

const SelectRoot = React.forwardRef<
    React.ElementRef<typeof Select.Root>,
    React.ComponentPropsWithoutRef<typeof Select.Root>
>((props) => {
    return (
        <Select.Root
            {...props}
        />
    );
});
const SelectItem = React.forwardRef<
    React.ElementRef<typeof Select.Item>,
    React.ComponentPropsWithoutRef<typeof Select.Item>
>(({children, className, ...props}, ref) => {
    return (
        <Select.Item
            ref={ref}
            className={cn(
                "text-gray-900 dark:text-white",
                className
            )}
            {...props}
        >
            <Select.ItemText>{children}</Select.ItemText>
        </Select.Item>
    );
});
const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof Select.Trigger>,
    React.ComponentPropsWithoutRef<typeof Select.Trigger>
>(({className, ...props}, ref) => {
    return (
        <Select.Trigger
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700",
                className
            )}
            {...props}
        />
    )
});
export { SelectRoot, SelectItem, SelectTrigger };