'use client';

import * as React from 'react';
import {
    Tabs as MuiTabs,
    TabsProps as MuiTabsProps,
    Tab as MuiTab,
    TabProps as MuiTabProps,
    Box,
    BoxProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Tabs Root (The context provider, usually invisible)
// ----------------------------------------------------------------------
// MUI doesn't have a strict "Root" wrapper that manages state like Radix;
// Instead, you manage the `value` state in your parent component.
// But we can export a standard Box to act as the container for consistency.
export interface TabsProps extends BoxProps { }

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
    ({ className, ...props }, ref) => (
        <Box ref={ref} className={cn('ds-tabs-root', className)} {...props} />
    )
);
Tabs.displayName = 'Tabs';

// ----------------------------------------------------------------------
// 2. Tabs List (The gray pill container)
// ----------------------------------------------------------------------
export interface TabsListProps extends MuiTabsProps {
    className?: string;
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiTabs
            ref={ref}
            className={cn('ds-tabs-list', className)}
            // 1. Remove the default MUI indicator (the colored line under the active tab)
            // We will style the active tab background directly instead.
            TabIndicatorProps={{
                sx: { display: 'none' },
            }}
            sx={{
                // 2. The Shadcn Container Styling
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2, // theme.shape.borderRadius (8px)
                backgroundColor: '#f1f5f9', // Slate 100 (muted background)
                padding: '4px', // p-1
                minHeight: 'auto', // Override MUI's default 48px minHeight

                // Ensure flex container behavior overrides MUI defaults
                '& .MuiTabs-flexContainer': {
                    gap: 0.5, // Slight gap between tabs
                },
                ...sx,
            }}
            {...props}
        />
    )
);
TabsList.displayName = 'TabsList';

// ----------------------------------------------------------------------
// 3. Tabs Trigger (The individual button)
// ----------------------------------------------------------------------
export interface TabsTriggerProps extends MuiTabProps {
    className?: string;
    value: string | number; // Force value to be required
}

// We use Emotion styled here because targeting the Mui-selected state 
// inline with sx can sometimes be brittle with the Tab component.
const StyledTab = styled(MuiTab)(({ theme }) => ({
    minHeight: 'auto',
    minWidth: 'auto',
    padding: '6px 12px', // px-3 py-1.5
    textTransform: 'none', // Kill uppercase
    fontWeight: 500,
    fontSize: '0.875rem', // text-sm
    borderRadius: 4, // 4px radius for the inner pill
    color: theme.palette.text.secondary, // Muted text for inactive
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transition

    // Hover state (inactive)
    '&:hover': {
        color: theme.palette.text.primary,
    },

    // The Active State (Shadcn style)
    '&.Mui-selected': {
        backgroundColor: '#ffffff', // White background
        color: theme.palette.text.primary, // Dark text
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // shadow-sm
    },

    // Focus ring for accessibility
    '&.Mui-focusVisible': {
        boxShadow: `0 0 0 2px #ffffff, 0 0 0 4px ${theme.palette.primary.main}`,
    },

    // Disabled state
    '&.Mui-disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
}));

export const TabsTrigger = React.forwardRef<HTMLDivElement, TabsTriggerProps>(
    ({ className, sx, ...props }, ref) => (
        <StyledTab
            ref={ref}
            className={cn('ds-tabs-trigger', className)}
            disableRipple // Kill the Material ripple
            sx={{ ...sx }}
            {...props}
        />
    )
);
TabsTrigger.displayName = 'TabsTrigger';

// ----------------------------------------------------------------------
// 4. Tabs Content (The panel that shows when active)
// ----------------------------------------------------------------------
export interface TabsContentProps extends BoxProps {
    value: string | number;
    currentValue: string | number; // We need to know the parent's current state to hide/show
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, sx, value, currentValue, children, ...props }, ref) => {

        // Only render the content if this tab is the currently selected one
        if (value !== currentValue) return null;

        return (
            <Box
                ref={ref}
                role="tabpanel"
                id={`tabpanel-${value}`}
                aria-labelledby={`tab-${value}`}
                className={cn('ds-tabs-content', className)}
                sx={{
                    marginTop: 2, // mt-2 (Space below the tab list)
                    animation: 'fadeIn 0.2s ease-in-out', // Optional slight fade in
                    '@keyframes fadeIn': {
                        '0%': { opacity: 0 },
                        '100%': { opacity: 1 },
                    },
                    ...sx,
                }}
                {...props}
            >
                {children}
            </Box>
        );
    }
);
TabsContent.displayName = 'TabsContent';