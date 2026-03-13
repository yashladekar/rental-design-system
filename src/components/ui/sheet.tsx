'use client';

import * as React from 'react';
import {
    Drawer as MuiDrawer,
    DrawerProps as MuiDrawerProps,
    Box,
    BoxProps,
    Typography,
    TypographyProps,
    IconButton
} from '@mui/material';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Sheet Root (The Drawer)
// ----------------------------------------------------------------------
export interface SheetProps extends MuiDrawerProps {
    className?: string;
    /**
     * Which side the sheet slides in from. Maps to MUI's 'anchor'.
     * @default "right"
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
}

export const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
    ({ className, side = 'right', PaperProps, sx, ...props }, ref) => (
        <MuiDrawer
            ref={ref}
            anchor={side}
            className={cn('ds-sheet', className)}
            // 1. Dark, blurred backdrop (Shadcn style)
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(4px)',
                    },
                },
            }}
            // 2. Style the sliding panel itself
            PaperProps={{
                ...PaperProps,
                sx: {
                    // Fixed widths for left/right, auto for top/bottom
                    width: side === 'left' || side === 'right' ? { xs: '100%', sm: 400 } : 'auto',
                    height: side === 'top' || side === 'bottom' ? 'auto' : '100%',
                    maxHeight: side === 'top' || side === 'bottom' ? '80vh' : 'none',

                    p: 0, // Reset padding, handled by SheetContent
                    backgroundImage: 'none',
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', // shadow-2xl
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                    ...PaperProps?.sx,
                },
            }}
            sx={{ ...sx }}
            {...props}
        />
    )
);
Sheet.displayName = 'Sheet';

// ----------------------------------------------------------------------
// 2. Sheet Content (The inner wrapper containing the close button)
// ----------------------------------------------------------------------
export interface SheetContentProps extends BoxProps {
    className?: string;
    onClose?: () => void; // Passing onClose renders the top-right 'X'
}

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
    ({ className, sx, children, onClose, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-sheet-content', className)}
            sx={{
                p: 3, // 24px padding all around
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflowY: 'auto', // Allow scrolling if content is too long
                ...sx,
            }}
            {...props}
        >
            {/* Shadcn auto-includes a close 'X' button in the SheetContent */}
            {onClose && (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: 'text.secondary',
                        opacity: 0.7,
                        transition: 'opacity 0.2s',
                        p: 0.5,
                        '&:hover': {
                            opacity: 1,
                            backgroundColor: 'action.hover',
                        },
                        '&.Mui-focusVisible': {
                            boxShadow: (theme) => `0 0 0 2px #ffffff, 0 0 0 4px ${theme.palette.primary.main}`,
                        },
                    }}
                >
                    <X size={16} />
                </IconButton>
            )}
            {children}
        </Box>
    )
);
SheetContent.displayName = 'SheetContent';

// ----------------------------------------------------------------------
// 3. Sheet Header
// ----------------------------------------------------------------------
export interface SheetHeaderProps extends BoxProps { }

export const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
    ({ className, sx, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-sheet-header', className)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                mb: 4, // Margin bottom to separate from main content
                textAlign: { xs: 'center', sm: 'left' }, // Center on mobile, left on desktop
                // Add right padding so text doesn't overlap the absolute close button
                pr: 4,
                ...sx,
            }}
            {...props}
        />
    )
);
SheetHeader.displayName = 'SheetHeader';

// ----------------------------------------------------------------------
// 4. Sheet Title
// ----------------------------------------------------------------------
export interface SheetTitleProps extends TypographyProps {
    className?: string;
}

export const SheetTitle = React.forwardRef<HTMLSpanElement, SheetTitleProps>(
    ({ className, sx, ...props }, ref) => (
        <Typography
            ref={ref}
            component="h2"
            className={cn('ds-sheet-title', className)}
            sx={{
                fontWeight: 600,
                fontSize: '1.125rem', // text-lg
                lineHeight: 1,
                color: 'text.primary',
                letterSpacing: '-0.025em',
                ...sx,
            }}
            {...props}
        />
    )
);
SheetTitle.displayName = 'SheetTitle';

// ----------------------------------------------------------------------
// 5. Sheet Description
// ----------------------------------------------------------------------
export interface SheetDescriptionProps extends TypographyProps {
    className?: string;
}

export const SheetDescription = React.forwardRef<HTMLSpanElement, SheetDescriptionProps>(
    ({ className, sx, ...props }, ref) => (
        <Typography
            ref={ref}
            className={cn('ds-sheet-description', className)}
            variant="body2"
            color="text.secondary"
            sx={{ ...sx }}
            {...props}
        />
    )
);
SheetDescription.displayName = 'SheetDescription';

// ----------------------------------------------------------------------
// 6. Sheet Footer
// ----------------------------------------------------------------------
export interface SheetFooterProps extends BoxProps {
    className?: string;
}

export const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
    ({ className, sx, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-sheet-footer', className)}
            sx={{
                mt: 'auto', // Pushes the footer to the very bottom of the flex container
                pt: 3,
                display: 'flex',
                flexDirection: { xs: 'column-reverse', sm: 'row' }, // Stack on mobile
                justifyContent: { sm: 'flex-end' },
                gap: 2, // Space between buttons
                ...sx,
            }}
            {...props}
        />
    )
);
SheetFooter.displayName = 'SheetFooter';