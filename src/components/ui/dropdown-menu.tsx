'use client';

import * as React from 'react';
import {
    Menu as MuiMenu,
    MenuProps as MuiMenuProps,
    MenuItem as MuiMenuItem,
    MenuItemProps as MuiMenuItemProps,
    ListSubheader as MuiListSubheader,
    ListSubheaderProps as MuiListSubheaderProps,
    Divider as MuiDivider,
    DividerProps as MuiDividerProps,
    Box,
} from '@mui/material';
import { cn } from '@/lib/utils';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------
// 1. DropdownMenu Content (The Menu Popup)
// ----------------------------------------------------------------------
export interface DropdownMenuContentProps extends MuiMenuProps {
    className?: string;
    /**
     * Optional custom offset for the dropdown from the anchor element.
     * Maps to MUI's margin/transform logic.
     */
    align?: 'center' | 'end' | 'start';
    sideOffset?: number;
}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
    ({ className, sx, align = 'center', sideOffset = 4, children, ...props }, ref) => {

        // Map Shadcn 'align' to MUI's anchorOrigin/transformOrigin logic
        let anchorOrigin = props.anchorOrigin || {
            vertical: 'bottom',
            horizontal: align,
        };

        let transformOrigin = props.transformOrigin || {
            vertical: 'top',
            horizontal: align,
        };

        return (
            <MuiMenu
                ref={ref}
                anchorOrigin={anchorOrigin as MuiMenuProps['anchorOrigin']}
                transformOrigin={transformOrigin as MuiMenuProps['transformOrigin']}
                className={cn('ds-dropdown-menu-content', className)}
                elevation={0}
                slotProps={{
                    paper: {
                        sx: {
                            mt: `${sideOffset}px`,
                            minWidth: 224, // w-56
                            borderRadius: 1.5, // 6px
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                            color: 'text.primary',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // shadow-md

                            // Remove padding on the list itself, handled by items
                            '& .MuiList-root': {
                                padding: 0.5, // p-1
                            },

                            // Animation overrides
                            animation: 'dropdownZoomIn 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                            '@keyframes dropdownZoomIn': {
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
            </MuiMenu>
        );
    }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

// ----------------------------------------------------------------------
// 2. DropdownMenu Item (The clickable option)
// ----------------------------------------------------------------------
export interface DropdownMenuItemProps extends MuiMenuItemProps {
    className?: string;
    /**
     * Optional inset padding for items that don't have an icon, 
     * but sit alongside items that do.
     */
    inset?: boolean;
}

const StyledMenuItem = styled(MuiMenuItem)(({ theme }) => ({
    borderRadius: 4, // sm
    padding: '6px 8px', // px-2 py-1.5
    margin: '2px',
    fontSize: '0.875rem', // text-sm
    fontWeight: 400,
    minHeight: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: theme.palette.text.primary,

    // Custom hover state (Shadcn aesthetic)
    '&:hover': {
        backgroundColor: theme.palette.action.hover, // subtle gray
        color: theme.palette.text.primary,
    },

    // Focus state (when using keyboard navigation)
    '&.Mui-focusVisible': {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.text.primary,
    },

    // Disabled state
    '&.Mui-disabled': {
        opacity: 0.5,
        pointerEvents: 'none',
    },
}));

export const DropdownMenuItem = React.forwardRef<HTMLLIElement, DropdownMenuItemProps>(
    ({ className, sx, inset, children, ...props }, ref) => (
        <StyledMenuItem
            ref={ref}
            className={cn('ds-dropdown-menu-item', className)}
            disableRipple // Kill material ripple
            sx={{
                paddingLeft: inset ? 4 : '8px', // pl-8 if inset
                ...sx,
            }}
            {...props}
        >
            {children}
        </StyledMenuItem>
    )
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

// ----------------------------------------------------------------------
// 3. DropdownMenu Label (Section header)
// ----------------------------------------------------------------------
export interface DropdownMenuLabelProps extends MuiListSubheaderProps {
    className?: string;
    inset?: boolean;
}

export const DropdownMenuLabel = React.forwardRef<HTMLLIElement, DropdownMenuLabelProps>(
    ({ className, sx, inset, children, ...props }, ref) => (
        <MuiListSubheader
            ref={ref}
            className={cn('ds-dropdown-menu-label', className)}
            disableSticky
            sx={{
                padding: '6px 8px', // px-2 py-1.5
                paddingLeft: inset ? 4 : '8px',
                fontSize: '0.875rem', // text-sm
                fontWeight: 600, // font-semibold
                lineHeight: 1,
                backgroundColor: 'transparent',
                color: 'text.primary',
                ...sx,
            }}
            {...props}
        >
            {children}
        </MuiListSubheader>
    )
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

// ----------------------------------------------------------------------
// 4. DropdownMenu Separator
// ----------------------------------------------------------------------
export interface DropdownMenuSeparatorProps extends MuiDividerProps {
    className?: string;
}

export const DropdownMenuSeparator = React.forwardRef<HTMLHRElement, DropdownMenuSeparatorProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiDivider
            ref={ref}
            className={cn('ds-dropdown-menu-separator', className)}
            sx={{
                margin: '4px -4px', // -mx-1 my-1 (pull out to the edges of the p-1 list container)
                borderColor: 'divider',
                ...sx,
            }}
            {...props}
        />
    )
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

// ----------------------------------------------------------------------
// 5. DropdownMenu Shortcut (Tiny right-aligned text)
// ----------------------------------------------------------------------
export const DropdownMenuShortcut = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn(
                "ds-dropdown-menu-shortcut ml-auto text-xs tracking-widest text-muted-foreground opacity-60",
                className
            )}
            style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.6 }}
            {...props}
        />
    )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

// ----------------------------------------------------------------------
// 6. DropdownMenu Trigger (Optional Wrapper)
// ----------------------------------------------------------------------
export const DropdownMenuTrigger = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
    ({ className, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-dropdown-menu-trigger inline-block', className)}
            sx={{ display: 'inline-block' }}
            {...props}
        />
    )
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';