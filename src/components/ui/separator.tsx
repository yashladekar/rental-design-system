'use client';

import * as React from 'react';
import { Divider as MuiDivider, DividerProps as MuiDividerProps } from '@mui/material';
import { cn } from '@/lib/utils';

export interface SeparatorProps extends MuiDividerProps {
    /**
     * The orientation of the separator.
     * @default "horizontal"
     */
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
    ({ className, orientation = 'horizontal', sx, ...props }, ref) => {
        return (
            <MuiDivider
                ref={ref}
                orientation={orientation}
                // Radix/Shadcn uses decorative=true by default for separators to hide them from screen readers.
                // MUI handles this via the role="separator" or aria-hidden attributes if needed, 
                // but for a purely visual divider, we can just let MUI do its thing or add aria-hidden.
                aria-hidden="true"
                className={cn(
                    'ds-separator',
                    // We can use Tailwind-like utility classes here if we were using it, 
                    // but since we are strict MUI, we handle dimensions via sx.
                    className
                )}
                sx={{
                    // Shadcn styling: use the divider color from the theme
                    borderColor: 'divider',

                    // Handle thickness and dimensions based on orientation
                    ...(orientation === 'horizontal'
                        ? {
                            width: '100%',
                            borderBottomWidth: '1px',
                            height: 0,
                        }
                        : {
                            height: '100%',
                            borderRightWidth: '1px',
                            width: 0,
                        }),

                    // Ensure flex items don't squash the vertical divider
                    flexShrink: 0,

                    ...sx,
                }}
                {...props}
            />
        );
    }
);

Separator.displayName = 'Separator';