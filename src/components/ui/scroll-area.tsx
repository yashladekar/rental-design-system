'use client';

import * as React from 'react';
import { Box, BoxProps } from '@mui/material';
import { cn } from '@/lib/utils';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------
// 1. ScrollArea Root Wrapper
// ----------------------------------------------------------------------
export interface ScrollAreaProps extends BoxProps {
    className?: string;
    /**
     * The orientation of the scrollbar.
     * @default "vertical"
     */
    orientation?: 'vertical' | 'horizontal' | 'both';
}

// We use Emotion styled here to apply the cross-browser Webkit scrollbar CSS.
// Note: This relies on standard Webkit styling which covers Chrome, Safari, Edge.
// Firefox uses standard CSS properties (scrollbar-width, scrollbar-color).
const StyledScrollArea = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'orientation',
})<{ orientation?: 'vertical' | 'horizontal' | 'both' }>(({ theme, orientation }) => ({
    // Define overflow behavior based on orientation
    overflowX: orientation === 'horizontal' || orientation === 'both' ? 'auto' : 'hidden',
    overflowY: orientation === 'vertical' || orientation === 'both' ? 'auto' : 'hidden',

    // Firefox Support (thin scrollbar, transparent track, visible thumb)
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.divider} transparent`,

    // Webkit Support (Chrome, Safari, Edge)
    '&::-webkit-scrollbar': {
        width: '8px',  // Vertical scrollbar width
        height: '8px', // Horizontal scrollbar height
    },

    // The Track (the background path the thumb slides on)
    '&::-webkit-scrollbar-track': {
        background: 'transparent', // Usually invisible in modern UI
        margin: '4px', // Slight margin so it doesn't touch the very edges of the container
    },

    // The Thumb (the draggable piece)
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.divider, // Uses the theme's subtle gray border color
        borderRadius: '4px', // Rounded pill shape
        border: '2px solid transparent', // Creates a "padding" effect inside the track
        backgroundClip: 'content-box', // Crucial: ensures the border is transparent, making the thumb look thinner

        '&:hover': {
            background: theme.palette.text.secondary, // Darken slightly on hover
            border: '2px solid transparent',
            backgroundClip: 'content-box',
        },
    },

    // The Corner (where horizontal and vertical scrollbars meet)
    '&::-webkit-scrollbar-corner': {
        background: 'transparent',
    },
}));

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
    ({ className, sx, orientation = 'vertical', children, ...props }, ref) => {
        return (
            <StyledScrollArea
                ref={ref}
                orientation={orientation}
                className={cn('ds-scroll-area', className)}
                sx={{
                    // Ensure the scroll area has a relative position so absolute children work
                    position: 'relative',
                    ...sx,
                }}
                {...props}
            >
                {children}
            </StyledScrollArea>
        );
    }
);
ScrollArea.displayName = 'ScrollArea';

// ----------------------------------------------------------------------
// 2. ScrollBar Component (Optional syntax sugar)
// ----------------------------------------------------------------------
// In Shadcn, you explicitly render a <ScrollBar /> inside the <ScrollArea>. 
// Since we achieve this entirely via CSS on the wrapper container in this MUI port,
// the <ScrollBar> component isn't strictly necessary for functionality. 
// However, to maintain API compatibility if developers copy/paste Shadcn code, 
// we can export a dummy component that renders nothing but satisfies the syntax.
export interface ScrollBarProps extends React.ComponentPropsWithoutRef<'div'> {
    orientation?: 'vertical' | 'horizontal';
}

export const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
    ({ className, orientation, ...props }, ref) => (
        <div ref={ref} className={cn('ds-scrollbar-dummy hidden', className)} aria-hidden="true" {...props} />
    )
);
ScrollBar.displayName = 'ScrollBar';