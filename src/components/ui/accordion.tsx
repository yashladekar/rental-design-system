'use client';

import * as React from 'react';
import {
    Accordion as MuiAccordion,
    AccordionProps as MuiAccordionProps,
    AccordionSummary as MuiAccordionSummary,
    AccordionSummaryProps as MuiAccordionSummaryProps,
    AccordionDetails as MuiAccordionDetails,
    AccordionDetailsProps as MuiAccordionDetailsProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Accordion Root (The individual collapsible item)
// ----------------------------------------------------------------------
export interface AccordionProps extends MuiAccordionProps {
    className?: string;
}

// We use Emotion styled here to aggressively strip MUI's default styling
const StyledAccordion = styled((props: MuiAccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    // Remove the pseudo-element line that MUI uses for borders
    '&::before': {
        display: 'none',
    },
    // Ensure the expanded state doesn't add weird margins (MUI default behavior)
    '&.Mui-expanded': {
        margin: 0,
    },
    // Ensure the disabled state looks correct
    '&.Mui-disabled': {
        backgroundColor: 'transparent',
        opacity: 0.5,
    },
}));

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
    ({ className, sx, ...props }, ref) => (
        <StyledAccordion
            ref={ref}
            className={cn('ds-accordion-item', className)}
            sx={{ ...sx }}
            {...props}
        />
    )
);
Accordion.displayName = 'Accordion';

// ----------------------------------------------------------------------
// 2. Accordion Trigger (The clickable header)
// ----------------------------------------------------------------------
export interface AccordionTriggerProps extends MuiAccordionSummaryProps {
    className?: string;
}

const StyledAccordionSummary = styled((props: MuiAccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ChevronDown size={16} className="text-muted-foreground shrink-0 transition-transform duration-200" />}
        {...props}
    />
))(({ theme }) => ({
    padding: '16px 0', // py-4
    minHeight: 'auto',
    // Typography styling for the trigger text
    '& .MuiAccordionSummary-content': {
        margin: 0,
        fontWeight: 500, // font-medium
        fontSize: '0.875rem', // text-sm
        transition: 'all 0.2s',
        '&:hover': {
            textDecoration: 'underline',
        },
        // Prevent MUI from adding margins when expanded
        '&.Mui-expanded': {
            margin: 0,
        },
    },
    // Remove margin expansion on the root element
    '&.Mui-expanded': {
        minHeight: 'auto',
    },
    // Style the expand icon container
    '& .MuiAccordionSummary-expandIconWrapper': {
        color: theme.palette.text.secondary,
        // The internal rotation is handled by MUI, but we can override it if needed.
        // MUI rotates it 180deg by default on the .Mui-expanded class.
        '&.Mui-expanded': {
            transform: 'rotate(180deg)',
        },
    },
}));

export const AccordionTrigger = React.forwardRef<HTMLDivElement, AccordionTriggerProps>(
    ({ className, sx, children, ...props }, ref) => (
        <StyledAccordionSummary
            ref={ref}
            className={cn('ds-accordion-trigger', className)}
            sx={{ ...sx }}
            {...props}
        >
            {children}
        </StyledAccordionSummary>
    )
);
AccordionTrigger.displayName = 'AccordionTrigger';

// ----------------------------------------------------------------------
// 3. Accordion Content (The expanded body)
// ----------------------------------------------------------------------
export interface AccordionContentProps extends MuiAccordionDetailsProps {
    className?: string;
}

const StyledAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: '0 0 16px 0', // pb-4 (no top/left/right padding)
    fontSize: '0.875rem', // text-sm
    color: theme.palette.text.secondary, // text-muted-foreground
}));

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ className, sx, children, ...props }, ref) => (
        <StyledAccordionDetails
            ref={ref}
            className={cn('ds-accordion-content', className)}
            sx={{ ...sx }}
            {...props}
        >
            {children}
        </StyledAccordionDetails>
    )
);
AccordionContent.displayName = 'AccordionContent';

// ----------------------------------------------------------------------
// 4. Accordion Root Container (Optional wrapper for multiple items)
// ----------------------------------------------------------------------
// Shadcn usually groups these in a parent `<Accordion type="single" collapsible>`.
// MUI manages state per `<Accordion>` item. To manage an "only one open at a time"
// state, you wrap them in a simple Box and manage state in the parent.
// For styling consistency, we can export a simple wrapper.
export const AccordionGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('ds-accordion-group w-full', className)} {...props} />
    )
);
AccordionGroup.displayName = 'AccordionGroup';