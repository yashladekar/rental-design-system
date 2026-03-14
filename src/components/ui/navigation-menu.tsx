'use client';

import * as React from 'react';
import { Box, Popover, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// ----------------------------------------------------------------------
// 1. NavigationMenu Context
// ----------------------------------------------------------------------
// We need context to track which menu item is currently active/hovered
interface NavigationMenuContextValue {
    activeItem: string | null;
    setActiveItem: (item: string | null) => void;
    anchorEl: HTMLElement | null;
    setAnchorEl: (el: HTMLElement | null) => void;
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | undefined>(undefined);

// ----------------------------------------------------------------------
// 2. NavigationMenu Root (The <nav> wrapper)
// ----------------------------------------------------------------------
export const NavigationMenu = React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<'nav'>
>(({ className, children, ...props }, ref) => {
    const [activeItem, setActiveItem] = React.useState<string | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const value = React.useMemo(
        () => ({ activeItem, setActiveItem, anchorEl, setAnchorEl }),
        [activeItem, anchorEl]
    );

    return (
        <NavigationMenuContext.Provider value={value}>
            <Box
                component="nav"
                ref={ref}
                className={cn('ds-navigation-menu relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
                sx={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    maxWidth: 'max-content',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                {...props}
            >
                {children}
            </Box>
        </NavigationMenuContext.Provider>
    );
});
NavigationMenu.displayName = 'NavigationMenu';

// ----------------------------------------------------------------------
// 3. NavigationMenuList (The <ul> container)
// ----------------------------------------------------------------------
export const NavigationMenuList = React.forwardRef<
    HTMLUListElement,
    React.ComponentPropsWithoutRef<'ul'>
>(({ className, ...props }, ref) => (
    <Box
        component="ul"
        ref={ref}
        className={cn('ds-navigation-menu-list group flex flex-1 list-none items-center justify-center space-x-1', className)}
        sx={{
            display: 'flex',
            flex: 1,
            listStyle: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5, // space-x-1
            margin: 0,
            padding: 0,
        }}
        {...props}
    />
));
NavigationMenuList.displayName = 'NavigationMenuList';

// ----------------------------------------------------------------------
// 4. NavigationMenuItem (The <li> wrapper)
// ----------------------------------------------------------------------
export const NavigationMenuItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentPropsWithoutRef<'li'> & { value?: string }
>(({ className, value, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const context = React.useContext(NavigationMenuContext);

    const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
        if (value && context) {
            context.setActiveItem(value);
            context.setAnchorEl(e.currentTarget);
        }
        if (onMouseEnter) onMouseEnter(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
        if (context) {
            // Small delay before clearing to allow moving mouse into the content area
            setTimeout(() => {
                // We will handle the actual closing logic in a global listener or within the content wrapper
                // for a more robust implementation. For now, we clear if they leave the item completely.
                // context.setActiveItem(null);
            }, 100);
        }
        if (onMouseLeave) onMouseLeave(e);
    };

    return (
        <Box
            component="li"
            ref={ref}
            className={cn('ds-navigation-menu-item relative', className)}
            sx={{ position: 'relative' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        />
    );
});
NavigationMenuItem.displayName = 'NavigationMenuItem';

// ----------------------------------------------------------------------
// 5. NavigationMenuTrigger (The clickable/hoverable button)
// ----------------------------------------------------------------------
const StyledTrigger = styled('button')(({ theme }) => ({
    display: 'inline-flex',
    height: '40px', // h-10
    width: 'max-content',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius, // rounded-md
    backgroundColor: 'transparent',
    padding: '8px 16px', // px-4 py-2
    fontSize: '0.875rem', // text-sm
    fontWeight: 500, // font-medium
    transition: 'background-color 0.2s, color 0.2s',
    border: 'none',
    cursor: 'pointer',
    color: theme.palette.text.primary,

    '&:hover': {
        backgroundColor: theme.palette.action.hover, // bg-accent
        color: theme.palette.text.primary,
    },

    '&:focus': {
        backgroundColor: theme.palette.action.hover,
        outline: 'none',
    },

    '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.5,
    },

    // State when the menu is open
    '&[data-state="open"]': {
        backgroundColor: theme.palette.action.hover, // bg-accent
    },
}));

export const NavigationMenuTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<'button'> & { value?: string }
>(({ className, children, value, ...props }, ref) => {
    const context = React.useContext(NavigationMenuContext);
    const isOpen = context?.activeItem === value;

    return (
        <StyledTrigger
            ref={ref}
            className={cn('ds-navigation-menu-trigger group', className)}
            data-state={isOpen ? 'open' : 'closed'}
            {...props}
        >
            {children}{' '}
            <ChevronDown
                className={cn(
                    "relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                )}
                style={{
                    position: 'relative',
                    top: '1px',
                    marginLeft: '4px',
                    height: '12px',
                    width: '12px',
                    transition: 'transform 0.2s',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
                aria-hidden="true"
            />
        </StyledTrigger>
    );
});
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

// ----------------------------------------------------------------------
// 6. NavigationMenuContent (The Dropdown Panel)
// ----------------------------------------------------------------------
export const NavigationMenuContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'> & { value?: string }
>(({ className, value, children, ...props }, ref) => {
    const context = React.useContext(NavigationMenuContext);
    const isOpen = context?.activeItem === value;

    // We use MUI's Popover to render the content relative to the trigger.
    // This avoids complex manual absolute positioning and handles z-index and off-screen boundaries automatically.
    return (
        <Popover
            open={isOpen}
            anchorEl={context?.anchorEl}
            onClose={() => context?.setActiveItem(null)}
            // Important: Allow the user to move their mouse from the trigger to the popover without it closing
            disableRestoreFocus
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            slotProps={{
                paper: {
                    sx: {
                        mt: 1, // Margin top to separate from trigger
                        p: 0,
                        borderRadius: 2, // rounded-md
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // shadow-md
                        overflow: 'hidden',
                        // Shadcn specific animation
                        animation: 'scaleIn 0.2s ease-out',
                        '@keyframes scaleIn': {
                            '0%': { opacity: 0, transform: 'scale(0.95)' },
                            '100%': { opacity: 1, transform: 'scale(1)' },
                        },
                    },
                    // We attach the mouse leave to the paper itself so it closes when they mouse off the content
                    onMouseLeave: () => context?.setActiveItem(null)
                }
            }}
        >
            <Box
                ref={ref}
                className={cn('ds-navigation-menu-content p-4 w-full md:w-[400px] lg:w-[500px]', className)}
                sx={{
                    padding: 3, // p-4 equivalent
                    width: { xs: '100vw', md: 400, lg: 500 }, // Responsive width
                    ...props.style
                }}
                {...props}
            >
                {children}
            </Box>
        </Popover>
    );
});
NavigationMenuContent.displayName = 'NavigationMenuContent';

// ----------------------------------------------------------------------
// 7. NavigationMenuLink (For standard links without dropdowns)
// ----------------------------------------------------------------------
// Shadcn provides a helper for links that look like triggers but just navigate.
export const NavigationMenuLink = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => (
    <Box
        component={Link}
        ref={ref}
        className={cn('ds-navigation-menu-link', className)}
        sx={{
            display: 'inline-flex',
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            backgroundColor: 'transparent',
            padding: '8px 16px',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'background-color 0.2s',
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
                backgroundColor: 'action.hover',
            },
        }}
        {...props}
    />
));
NavigationMenuLink.displayName = 'NavigationMenuLink';