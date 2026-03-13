'use client';

import * as React from 'react';
import { InputLabel, InputLabelProps } from '@mui/material';
import { cn } from '@/lib/utils';

export interface LabelProps extends InputLabelProps {
    /**
     * An optional custom class name that will be merged with MUI's classes.
     */
    className?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, sx, ...props }, ref) => (
        <InputLabel
            ref={ref}
            className={cn(
                'ds-label',
                // We ensure peer-disabled styling is supported via standard CSS targeting if needed
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className
            )}
            sx={{
                // 1. Shadcn Label Typography
                fontSize: '0.875rem', // text-sm
                fontWeight: 500,      // font-medium
                lineHeight: 1,        // leading-none
                color: 'text.primary',// Inherits from theme.ts (e.g., #0f172a)

                // 2. Override default MUI InputLabel behaviors
                // MUI InputLabels are absolute by default because they "float" inside TextFields.
                // We want ours to behave like standard block labels.
                position: 'relative',
                transform: 'none',
                pointerEvents: 'auto',
                marginBottom: 1, // 8px margin bottom to separate from the input

                // 3. Handle required asterisk styling (optional but recommended)
                '& .MuiInputLabel-asterisk': {
                    color: 'error.main', // Makes the '*' red
                },

                // 4. Allow developer overrides
                ...sx,
            }}
            {...props}
        />
    )
);

Label.displayName = 'Label';