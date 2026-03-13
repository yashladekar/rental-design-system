'use client';

import * as React from 'react';
import {
    Tooltip as MuiTooltip,
    TooltipProps as MuiTooltipProps,
    tooltipClasses
} from '@mui/material';
import { styled } from '@mui/material/styles';

export interface TooltipProps extends Omit<MuiTooltipProps, 'title' | 'content'> {
    /**
     * The content to display inside the tooltip (maps to MUI's 'title' prop).
     */
    content: React.ReactNode;
}

// ----------------------------------------------------------------------
// 1. Custom Styled Tooltip (Emotion)
// ----------------------------------------------------------------------
// We use Emotion's styled API because targeting the tooltip portal classes 
// (which render outside the standard DOM tree) is much more reliable this way.
const StyledTooltip = styled(({ className, ...props }: MuiTooltipProps) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    // 1. Style the Tooltip Bubble
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.primary.main, // Dark slate background
        color: theme.palette.primary.contrastText,   // White text
        fontSize: '0.75rem', // text-xs
        fontWeight: 500,
        padding: '6px 12px', // px-3 py-1.5
        borderRadius: theme.shape.borderRadius, // Matches global border radius (e.g., 6px)
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // shadow-md

        // Animation overrides (Shadcn has a distinct snap-in feel)
        animation: 'zoomIn 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        '@keyframes zoomIn': {
            '0%': { opacity: 0, transform: 'scale(0.95)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
        },
    },

    // 2. Style the Arrow (if enabled)
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.primary.main, // Match the arrow color to the bubble
    },
}));

// ----------------------------------------------------------------------
// 2. The Tooltip Wrapper
// ----------------------------------------------------------------------
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
    ({ content, children, ...props }, ref) => {
        return (
            <StyledTooltip
                ref={ref}
                title={content}
                // Enable the arrow by default, as it looks great in this design system
                arrow
                // Default placement is top, but can be overridden
                placement="top"
                // Slight delay before showing matches standard OS behavior
                enterDelay={300}
                {...props}
            >
                {/* MUI requires the child to be able to hold a ref. 
            If passing a custom component, ensure it uses forwardRef. */}
                {children}
            </StyledTooltip>
        );
    }
);

Tooltip.displayName = 'Tooltip';