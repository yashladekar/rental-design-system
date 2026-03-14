'use client';

import * as React from 'react';
import {
    Popover as MuiPopover,
    PopoverProps as MuiPopoverProps,
    Box,
} from '@mui/material';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Popover Root (Context Provider)
// ----------------------------------------------------------------------
// In Shadcn/Radix, <Popover> manages state. In MUI, state is managed by 
// the parent (anchorEl, open, onClose). 
// However, to keep the API structurally similar, we export a simple React 
// Context to tie the Trigger and Content together if developers want to 
// build complex abstractions later, or we just export standard wrappers.
// For the most robust MUI implementation, we rely on the parent state.

export interface PopoverProps extends MuiPopoverProps {
    className?: string;
    /**
     * Optional custom offset for the popover from the anchor element.
     * Maps to MUI's margin/transform logic.
     */
    align?: 'center' | 'end' | 'start';
    sideOffset?: number;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverProps>(
    ({ className, sx, align = 'center', sideOffset = 4, children, ...props }, ref) => {

        // Map Shadcn 'align' to MUI's anchorOrigin/transformOrigin logic
        // We assume the default 'side' is 'bottom' (opening downwards)
        let anchorOrigin = props.anchorOrigin || {
            vertical: 'bottom',
            horizontal: align,
        };

        let transformOrigin = props.transformOrigin || {
            vertical: 'top',
            horizontal: align,
        };

        return (
            <MuiPopover
                ref={ref}
                anchorOrigin={anchorOrigin as MuiPopoverProps['anchorOrigin']}
                transformOrigin={transformOrigin as MuiPopoverProps['transformOrigin']}
                className={cn('ds-popover-content', className)}
                // Remove default MUI shadows
                elevation={0}
                // Define the gap/offset between trigger and popover using sx
                slotProps={{
                    paper: {
                        sx: {
                            mt: `${sideOffset}px`, // Apply the sideOffset as margin-top
                            p: 2, // Default padding inside the popover (16px)
                            width: 280, // Default Shadcn width (w-72)
                            borderRadius: 2, // theme.shape.borderRadius
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                            color: 'text.primary',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // shadow-md
                            outline: 'none',

                            // Shadcn Animation: Zoom in slightly
                            animation: 'popoverZoomIn 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                            '@keyframes popoverZoomIn': {
                                '0%': { opacity: 0, transform: 'scale(0.95) translateY(-4px)' },
                                '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
                            },
                            ...sx,
                        },
                    },
                }}
                {...props}
            >
                {children}
            </MuiPopover>
        );
    }
);
PopoverContent.displayName = 'PopoverContent';

// ----------------------------------------------------------------------
// 2. Popover Trigger (Optional Wrapper)
// ----------------------------------------------------------------------
// MUI doesn't technically need a dedicated Trigger wrapper because you just
// attach an onClick handler to any button to set the anchorEl. 
// We provide a semantic Box wrapper just in case developers want to group things.
export const PopoverTrigger = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
    ({ className, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-popover-trigger inline-block', className)}
            sx={{ display: 'inline-block' }}
            {...props}
        />
    )
);
PopoverTrigger.displayName = 'PopoverTrigger';