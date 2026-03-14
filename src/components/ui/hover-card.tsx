'use client';

import * as React from 'react';
import {
    Popover as MuiPopover,
    PopoverProps as MuiPopoverProps,
    Box,
} from '@mui/material';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. HoverCard Root (Context Provider)
// ----------------------------------------------------------------------
// Since HoverCard requires managing hover state (open delay, close delay),
// we create a custom context to handle this logic cleanly and share it
// between the Trigger and the Content.

interface HoverCardContextValue {
    isOpen: boolean;
    anchorEl: HTMLElement | null;
    handleMouseEnter: (event: React.MouseEvent<HTMLElement>) => void;
    handleMouseLeave: () => void;
}

const HoverCardContext = React.createContext<HoverCardContextValue | undefined>(undefined);

export interface HoverCardProps {
    children: React.ReactNode;
    /**
     * Delay in milliseconds before the hover card opens.
     * @default 300
     */
    openDelay?: number;
    /**
     * Delay in milliseconds before the hover card closes after the mouse leaves.
     * @default 200
     */
    closeDelay?: number;
}

export const HoverCard = ({ children, openDelay = 300, closeDelay = 200 }: HoverCardProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const enterTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const leaveTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            // Clear any pending close actions
            if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);

            const target = event.currentTarget;

            enterTimeoutRef.current = setTimeout(() => {
                setAnchorEl(target);
                setIsOpen(true);
            }, openDelay);
        },
        [openDelay]
    );

    const handleMouseLeave = React.useCallback(() => {
        // Clear any pending open actions
        if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);

        leaveTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            setAnchorEl(null);
        }, closeDelay);
    }, [closeDelay]);

    // Clean up timeouts on unmount
    React.useEffect(() => {
        return () => {
            if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
            if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
        };
    }, []);

    const value = React.useMemo(
        () => ({ isOpen, anchorEl, handleMouseEnter, handleMouseLeave }),
        [isOpen, anchorEl, handleMouseEnter, handleMouseLeave]
    );

    return (
        <HoverCardContext.Provider value={value}>
            {children}
        </HoverCardContext.Provider>
    );
};

// ----------------------------------------------------------------------
// 2. HoverCard Trigger
// ----------------------------------------------------------------------
export const HoverCardTrigger = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }>(
    ({ className, children, asChild, onMouseEnter, onMouseLeave, ...props }, ref) => {
        const context = React.useContext(HoverCardContext);

        if (!context) {
            throw new Error('HoverCardTrigger must be used within a HoverCard');
        }

        if (asChild && React.isValidElement(children)) {
            const child = children as React.ReactElement<{ className?: string; onMouseEnter?: React.MouseEventHandler; onMouseLeave?: React.MouseEventHandler }>;

            return React.cloneElement(child, {
                ...props,
                className: cn('ds-hover-card-trigger', className, child.props.className),
                onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
                    onMouseEnter?.(event as unknown as React.MouseEvent<HTMLDivElement>);
                    child.props.onMouseEnter?.(event);
                    context.handleMouseEnter(event);
                },
                onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
                    onMouseLeave?.(event as unknown as React.MouseEvent<HTMLDivElement>);
                    child.props.onMouseLeave?.(event);
                    context.handleMouseLeave();
                },
            });
        }

        return (
            <Box
                ref={ref}
                className={cn('ds-hover-card-trigger inline-block', className)}
                sx={{ display: 'inline-block', cursor: 'pointer' }}
                onMouseEnter={(event) => {
                    onMouseEnter?.(event);
                    context.handleMouseEnter(event);
                }}
                onMouseLeave={(event) => {
                    onMouseLeave?.(event);
                    context.handleMouseLeave();
                }}
                {...props}
            >
                {children}
            </Box>
        );
    }
);
HoverCardTrigger.displayName = 'HoverCardTrigger';

// ----------------------------------------------------------------------
// 3. HoverCard Content
// ----------------------------------------------------------------------
export interface HoverCardContentProps extends Omit<MuiPopoverProps, 'open' | 'anchorEl'> {
    className?: string;
    align?: 'center' | 'end' | 'start';
    sideOffset?: number;
}

export const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
    ({ className, sx, align = 'center', sideOffset = 4, children, ...props }, ref) => {
        const context = React.useContext(HoverCardContext);

        if (!context) {
            throw new Error('HoverCardContent must be used within a HoverCard');
        }

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
                open={context.isOpen}
                anchorEl={context.anchorEl}
                anchorOrigin={anchorOrigin as MuiPopoverProps['anchorOrigin']}
                transformOrigin={transformOrigin as MuiPopoverProps['transformOrigin']}
                // Important: We must also attach mouse enter/leave to the popover itself
                // so it doesn't close when the user moves their mouse from the trigger into the card.
                onMouseEnter={context.handleMouseEnter as unknown as React.MouseEventHandler<HTMLDivElement>}
                onMouseLeave={context.handleMouseLeave}
                // Disable generic backdrop behaviors since this is hover-based
                disableRestoreFocus
                sx={{
                    pointerEvents: 'none', // Prevent the backdrop from blocking interactions
                    ...sx,
                }}
                className={cn('ds-hover-card-content', className)}
                elevation={0}
                slotProps={{
                    paper: {
                        sx: {
                            mt: `${sideOffset}px`,
                            p: 2, // 16px padding
                            width: 320, // w-80 (slightly wider than generic popover)
                            pointerEvents: 'auto', // Re-enable pointer events on the card itself
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                            color: 'text.primary',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // shadow-md
                            outline: 'none',

                            animation: 'hoverCardZoomIn 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                            '@keyframes hoverCardZoomIn': {
                                '0%': { opacity: 0, transform: 'scale(0.95) translateY(-4px)' },
                                '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
                            },
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
HoverCardContent.displayName = 'HoverCardContent';