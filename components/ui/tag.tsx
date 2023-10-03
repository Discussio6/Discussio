import * as React from 'react';
import { cn } from '@/lib/utils';

const Tag = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full font-medium',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
);
export { Tag };