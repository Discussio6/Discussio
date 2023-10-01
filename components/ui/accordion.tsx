import * as React from 'react';
import { cn } from '@/lib/utils';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const AccordionRoot = React.forwardRef<
    React.ElementRef<typeof Accordion.Root>,
    React.ComponentPropsWithoutRef<typeof Accordion.Root>
>((props) => {
    return (
        <Accordion.Root
            {...props}
        />
    );
});
const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof Accordion.Trigger>,
    React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ className, children, ...props }, ref) => {
    return (<Accordion.Header className="AccordionHeader">
        <Accordion.Trigger
            className={cn('AccordionTrigger', className)}
            {...props}
            ref={ref}
        >
            {children}
            <ChevronDownIcon className="AccordionChevron" aria-hidden />
        </Accordion.Trigger>
    </Accordion.Header>)
});

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof Accordion.Content>,
    React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ className, children, ...props }, ref) => {
    return (<Accordion.Content
        className={cn('AccordionContent', className)}
        {...props}
        ref={ref}
    >
        {children}
    </Accordion.Content>)
});
export { AccordionRoot, AccordionTrigger, AccordionContent };