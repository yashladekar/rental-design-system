'use client';

import * as React from 'react';
import {
    LinearProgress as MuiLinearProgress,
    LinearProgressProps as MuiLinearProgressProps
} from '@mui/material';
import { cn } from '@/lib/utils';

export interface ProgressProps extends MuiLinearProgressProps {
    className?: string;
    /**
     * The progress value from 0 to 100.
     */
    value?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ className, sx, value, ...props }, ref) => {
        return (
            <MuiLinearProgress
                ref={ref}
                // If a value is provided, it's determinate. Otherwise, it's indeterminate (animated).
                variant={value !== undefined ? 'determinate' : 'indeterminate'}
                value={value}
                className={cn('ds-progress', className)}
                sx={{
                    height: 10, // h-2.5 (Shadcn default is usually 8px or 10px)
                    borderRadius: 5, // Fully rounded ends
                    backgroundColor: 'action.hover', // Muted slate track background

                    // Style the inner filling bar
                    '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        backgroundColor: 'primary.main', // Uses your theme's primary color
                    },
                    ...sx,
                }}
                {...props}
            />
        );
    }
);

Progress.displayName = 'Progress';