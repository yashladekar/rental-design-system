'use client';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { Box, Dialog, DialogProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Command Root (The Context and Styling Wrapper)
// ----------------------------------------------------------------------
// We use Emotion to aggressively style the entire cmdk component tree.
// This is necessary because cmdk injects raw unstyled divs via data attributes.

const StyledCommand = styled(CommandPrimitive)(({ theme }) => ({
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius, // rounded-md
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,

    // The Input Field Wrapper
    '& [cmdk-input-wrapper]': {
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: '0 12px', // px-3
    },

    // The Input Field
    '& [cmdk-input]': {
        display: 'flex',
        height: '44px', // h-11
        width: '100%',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'transparent',
        padding: '12px 0', // py-3
        fontSize: '0.875rem', // text-sm
        outline: 'none',
        border: 'none',
        color: theme.palette.text.primary,

        '&::placeholder': {
            color: theme.palette.text.secondary,
        },

        '&:disabled': {
            cursor: 'not-allowed',
            opacity: 0.5,
        },
    },

    // The List Container (The scrollable area)
    '& [cmdk-list]': {
        maxHeight: '300px',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '4px', // p-1
    },

    // The Empty State Message
    '& [cmdk-empty]': {
        padding: '24px 0', // py-6
        textAlign: 'center',
        fontSize: '0.875rem', // text-sm
        color: theme.palette.text.secondary,
    },

    // Group Headers (e.g., "Suggestions", "Settings")
    '& [cmdk-group-heading]': {
        padding: '8px 8px 4px 8px', // px-2 py-1.5
        fontSize: '0.75rem', // text-xs
        fontWeight: 500, // font-medium
        color: theme.palette.text.secondary,
    },

    // Individual Items
    '& [cmdk-item]': {
        position: 'relative',
        display: 'flex',
        cursor: 'default',
        userSelect: 'none',
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius / 2, // rounded-sm
        padding: '6px 8px', // px-2 py-1.5
        fontSize: '0.875rem', // text-sm
        outline: 'none',

        // The Active/Hover State (handled by cmdk via aria-selected)
        "&[aria-selected='true']": {
            backgroundColor: theme.palette.action.hover, // bg-accent
            color: theme.palette.text.primary,
        },

        // Disabled items
        "&[aria-disabled='true']": {
            pointerEvents: 'none',
            opacity: 0.5,
        },

        // Layout for icons inside items
        '& svg': {
            marginRight: '8px', // mr-2
            height: '16px', // h-4
            width: '16px', // w-4
            flexShrink: 0,
        },
    },

    // The Separator Line
    '& [cmdk-separator]': {
        margin: '4px -4px', // -mx-1 my-1
        height: '1px',
        backgroundColor: theme.palette.divider, // bg-border
    },
}));

export const Command = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
    <StyledCommand
        ref={ref}
        className={cn('ds-command', className)}
        {...props}
    />
));
Command.displayName = CommandPrimitive.displayName;

// ----------------------------------------------------------------------
// 2. Command Dialog (The Modal Wrapper for Cmd+K functionality)
// ----------------------------------------------------------------------
interface CommandDialogProps extends DialogProps { }

export const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
    return (
        <Dialog
            {...props}
            // We use MUI's Dialog for the backdrop and accessibility, 
            // but style the Paper to be a sleek, top-aligned modal.
            PaperProps={{
                sx: {
                    overflow: 'hidden',
                    p: 0, // No padding, the Command component handles its own internal layout
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', // shadow-2xl
                    borderRadius: 2, // rounded-lg
                    border: '1px solid',
                    borderColor: 'divider',

                    // Position it closer to the top of the screen (Shadcn style)
                    m: 2,
                    position: 'absolute',
                    top: '10%',
                    width: '100%',
                    maxWidth: 512, // max-w-lg

                    // Animation
                    animation: 'commandZoomIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    '@keyframes commandZoomIn': {
                        '0%': { opacity: 0, transform: 'scale(0.95)' },
                        '100%': { opacity: 1, transform: 'scale(1)' },
                    },
                }
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(4px)',
                    }
                }
            }}
        >
            <Command
                // We add styling specific to when it's rendered inside a Dialog
                sx={{
                    '& [cmdk-group-heading]': { px: 2, fontWeight: 500, color: 'text.secondary' },
                    '& [cmdk-item]': { px: 2, py: 1.5 },
                    '& [cmdk-item] svg': { height: 20, width: 20 },
                }}
            >
                {children}
            </Command>
        </Dialog>
    );
};

// ----------------------------------------------------------------------
// 3. Composable Parts (Exported for a clean API)
// ----------------------------------------------------------------------

export const CommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
    // We wrap the input in a Box to easily place the Lucide search icon
    <Box className="flex items-center" cmdk-input-wrapper="" sx={{ position: 'relative' }}>
        <Search
            className="mr-2 h-4 w-4 shrink-0 opacity-50"
            style={{ marginRight: 8, height: 16, width: 16, opacity: 0.5, color: 'inherit' }}
        />
        <CommandPrimitive.Input
            ref={ref}
            className={cn('ds-command-input', className)}
            {...props}
        />
    </Box>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

export const CommandList = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.List
        ref={ref}
        className={cn('ds-command-list', className)}
        {...props}
    />
));
CommandList.displayName = CommandPrimitive.List.displayName;

export const CommandEmpty = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Empty>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Empty
        ref={ref}
        className={cn('ds-command-empty', className)}
        {...props}
    />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export const CommandGroup = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Group>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Group
        ref={ref}
        className={cn('ds-command-group', className)}
        {...props}
    />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

export const CommandSeparator = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
        ref={ref}
        className={cn('ds-command-separator', className)}
        {...props}
    />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export const CommandItem = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Item
        ref={ref}
        className={cn('ds-command-item', className)}
        {...props}
    />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

// Shortcut key helper (e.g., "⌘P")
export const CommandShortcut = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
            style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.6 }}
            {...props}
        />
    );
};
CommandShortcut.displayName = "CommandShortcut";