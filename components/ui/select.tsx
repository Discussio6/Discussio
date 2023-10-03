import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';
import { ChevronDownIcon } from 'lucide-react';
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
const SelectContent = React.forwardRef<
    React.ElementRef<typeof Select.Content>,
    React.ComponentPropsWithoutRef<typeof Select.Content>
>(({ className, children, ...props }, ref) => {
    return (
        <Select.Portal>
            <Select.Content
                position='popper'
                ref={ref}
                className={cn(
                    "overflow-hidden position-absolute rounded-md border bg-popover p-2 align-middle align-middle text-popover-foreground shadow-md outline-none",
                    className
                )}
                {...props}
            >
                <Select.Viewport>
                {children}
                </Select.Viewport>
            </Select.Content>
        </Select.Portal>
    )
});
type SelectItemProps = React.ComponentPropsWithoutRef<typeof Select.Item> & {
    'data-state'?: string;
};
const SelectItem = React.forwardRef<
    React.ElementRef<typeof Select.Item>,
    SelectItemProps
>(({ children, className, ...props }, ref) => {
    
    return (
        <Select.Item
            ref={ref}
            className={cn(
                "flex flex-row text-gray-900 dark:text-white",
                className
            )}
            {...props}
        >
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator>
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    );
});
type SelectTrigger = React.ComponentPropsWithoutRef<typeof Select.Trigger> & {
    placeholder?: string;
    'data-state'?: string;
};
const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof Select.Trigger>,
    SelectTrigger
>(({ className, 
    children, 
    placeholder,
    'data-state': dataState, ...props }, ref) => {
    return (
        <Select.Trigger className={cn('bg-white rounded-lg h-10 justify-items-center border-solid border border-gray-300', className)} {...props} ref={ref}>
            <div className='flex flex-row justify-between m-2'>
            <Select.Value placeholder={placeholder}>
                {children}
            </Select.Value>
            <Select.Icon >
            <ChevronDownIcon className={`transition-transform duration-300 ease-in ${dataState === 'open' ? 'rotate-180' : ''}`} />
            </Select.Icon>
            </div>
        </Select.Trigger>
    )
});
const SelectValue = Select.Value;
export { SelectRoot, SelectItem, SelectTrigger, SelectContent, SelectValue };