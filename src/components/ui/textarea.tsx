'use client';

import * as React from 'react';
import { InputBase, InputBaseProps } from '@mui/material';
import { cn } from '@/lib/utils';

export interface TextareaProps extends InputBaseProps {
    className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, sx, ...props }, ref) => {
        return (
            <InputBase
                ref={ref}
                // 1. Tell MUI to render a <textarea> instead of an <input>
                multiline
                // 2. Set a reasonable default height (Shadcn usually defaults to around 3 rows)
                minRows={3}
                className={cn('ds-textarea', className)}
                fullWidth
                sx={{
                    // Base Styling (Matches our Input component)
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2, // theme.shape.borderRadius
                    backgroundColor: 'transparent',
                    fontSize: '0.875rem', // text-sm
                    transition: 'border-color 0.2s, box-shadow 0.2s',

                    // Hover State
                    '&:hover': {
                        borderColor: 'text.secondary',
                    },

                    // Focus State (The Shadcn Ring)
                    '&.Mui-focused': {
                        borderColor: 'primary.main',
                        boxShadow: (theme) => `0 0 0 1px ${theme.palette.primary.main}`,
                    },

                    // Disabled State
                    '&.Mui-disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                        backgroundColor: 'action.hover', // Muted background when disabled
                    },

                    // 3. Target the internal textarea element specifically
                    '& .MuiInputBase-inputMultiline': {
                        padding: '8px 12px', // standard px-3 py-2
                        resize: 'vertical', // Allow the user to drag the bottom corner to resize
                        lineHeight: 1.5,

                        // Placeholder styling
                        '&::placeholder': {
                            color: 'text.secondary',
                            opacity: 0.8,
                        },
                    },
                    ...sx,
                }}
                {...props}
            />
        );
    }
);

Textarea.displayName = 'Textarea';