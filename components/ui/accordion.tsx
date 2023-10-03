import * as React from 'react';
import { cn } from '@/lib/utils';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const AccordionRoot = Accordion.Root;
const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof Accordion.Trigger>,
    React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ className, children, ...props }, ref) => {
    return (<Accordion.Header className="AccordionHeader">
        <Accordion.Trigger
            className={cn('flex flex-row', className)}
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
const AccordionItem = React.forwardRef<
    React.ElementRef<typeof Accordion.Item>,
    React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ className, children, ...props }, ref) => {
    return (<Accordion.Item
        className={cn('AccordionItem', className)}
        {...props}
        ref={ref}
    >
        {children}
    </Accordion.Item>)
});
export { AccordionRoot, AccordionTrigger, AccordionContent, AccordionItem };