'use client';

import * as React from 'react';
import {
    SwipeableDrawer as MuiSwipeableDrawer,
    SwipeableDrawerProps as MuiSwipeableDrawerProps,
    Box,
    Typography,
} from '@mui/material';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Drawer Root (The Swipeable Drawer)
// ----------------------------------------------------------------------
export interface DrawerProps extends MuiSwipeableDrawerProps {
    className?: string;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
    ({ className, anchor = 'bottom', PaperProps, sx, children, ...props }, ref) => {
        // Determine iOS for better native swipe feel (MUI recommendation)
        const iOS =
            typeof navigator !== 'undefined' &&
            /iPad|iPhone|iPod/.test(navigator.userAgent);

        return (
            <MuiSwipeableDrawer
                ref={ref}
                anchor={anchor}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                className={cn('ds-drawer', className)}
                // Style the dark blur backdrop
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(4px)',
                        },
                    },
                }}
                // Style the sliding panel itself
                PaperProps={{
                    ...PaperProps,
                    sx: {
                        width: '100%',
                        // We assume bottom drawer is the default Shadcn use-case
                        ...(anchor === 'bottom' && {
                            height: 'auto',
                            maxHeight: '96%', // Don't cover the entire screen
                            borderTopLeftRadius: 16, // theme.shape.borderRadius * 2
                            borderTopRightRadius: 16,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                        }),
                        backgroundColor: 'background.paper',
                        backgroundImage: 'none',
                        boxShadow: '0 -10px 15px -3px rgb(0 0 0 / 0.1)',
                        ...PaperProps?.sx,
                    },
                }}
                sx={{ ...sx }}
                {...props}
            >
                {/* The little grab handle indicator at the top center */}
                {anchor === 'bottom' && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pt: 2,
                            pb: 1,
                        }}
                    >
                        <Box
                            sx={{
                                width: 48,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'action.hover', // Muted slate color
                            }}
                        />
                    </Box>
                )}
                {children}
            </MuiSwipeableDrawer>
        );
    }
);
Drawer.displayName = 'Drawer';

// ----------------------------------------------------------------------
// 2. Drawer Content Wrapper (Optional, for padding)
// ----------------------------------------------------------------------
export const DrawerContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
    ({ className, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-drawer-content', className)}
            sx={{
                px: 4, // p-4
                pb: 4, // p-4
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'auto', // Allow scrolling if content is very long
            }}
            {...props}
        />
    )
);
DrawerContent.displayName = 'DrawerContent';

// ----------------------------------------------------------------------
// 3. Drawer Header
// ----------------------------------------------------------------------
export const DrawerHeader = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
    ({ className, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-drawer-header', className)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1, // gap-2
                textAlign: 'center', // Usually centered in mobile drawers
                mb: 3,
            }}
            {...props}
        />
    )
);
DrawerHeader.displayName = 'DrawerHeader';

// ----------------------------------------------------------------------
// 4. Drawer Title
// ----------------------------------------------------------------------
export const DrawerTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<'h2'>>(
    ({ className, ...props }, ref) => (
        <Typography
            ref={ref}
            component="h2"
            className={cn('ds-drawer-title', className)}
            sx={{
                fontWeight: 600,
                fontSize: '1.125rem', // text-lg
                lineHeight: 1,
                letterSpacing: '-0.025em',
                color: 'text.primary',
            }}
            {...props}
        />
    )
);
DrawerTitle.displayName = 'DrawerTitle';

// ----------------------------------------------------------------------
// 5. Drawer Description
// ----------------------------------------------------------------------
export const DrawerDescription = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
    ({ className, ...props }, ref) => (
        <Typography
            ref={ref}
            className={cn('ds-drawer-description', className)}
            variant="body2"
            color="text.secondary"
            {...props}
        />
    )
);
DrawerDescription.displayName = 'DrawerDescription';

// ----------------------------------------------------------------------
// 6. Drawer Footer
// ----------------------------------------------------------------------
export const DrawerFooter = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
    ({ className, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-drawer-footer', className)}
            sx={{
                mt: 'auto',
                display: 'flex',
                flexDirection: 'column', // Stacked buttons usually for mobile drawers
                gap: 2, // gap-2
                pt: 2,
            }}
            {...props}
        />
    )
);
DrawerFooter.displayName = 'DrawerFooter';