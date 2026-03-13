'use client';

import * as React from 'react';
import { InputBase, InputBaseProps } from '@mui/material';
import { cn } from '@/lib/utils'; // Keep this for merging standard CSS classes if needed later

export interface InputProps extends InputBaseProps {
    /**
     * An optional custom class name that will be merged with MUI's classes.
     */
    className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, sx, ...props }, ref) => {
        return (
            <InputBase
                ref={ref}
                className={cn('ds-input', className)}
                // By default, Shadcn inputs are block-level (full width of their container)
                fullWidth
                // We pass the sx prop down so developers can make layout tweaks if absolutely necessary
                sx={sx}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';