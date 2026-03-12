'use client';

import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import { ChevronDown } from 'lucide-react';

// ----------------------------------------------------------------------
// 1. Accordion (Root)
// Generalization: Allow 'sx' overrides and BoxProps
// ----------------------------------------------------------------------
export interface CustomAccordionRootProps extends BoxProps {
    // You can add state management here later (e.g., type="single" | "multiple")
}

const Accordion = React.forwardRef<HTMLDivElement, CustomAccordionRootProps>(
    ({ className, sx, ...props }, ref) => (
        <Box ref={ref} className={className} sx={{ width: '100%', ...sx }} {...props} />
    )
);
Accordion.displayName = 'Accordion';

// ----------------------------------------------------------------------
// 2. Accordion Item
// Generalization: Theme-aware spacing instead of hardcoded pixels
// ----------------------------------------------------------------------
const StyledMuiAccordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-of-type': {
        borderBottom: 'none',
    },
    '&::before': {
        display: 'none',
    },
}));

export interface CustomAccordionItemProps extends AccordionProps {
    value?: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, CustomAccordionItemProps>(
    ({ className, sx, value: _value, ...props }, ref) => (
        // Passing sx down allows consumers to override specific item styles
        <StyledMuiAccordion ref={ref} className={className} sx={sx} {...props} />
    )
);
AccordionItem.displayName = 'AccordionItem';

// ----------------------------------------------------------------------
// 3. Accordion Trigger
// Generalization: Allow custom icons and dynamic typography
// ----------------------------------------------------------------------
export interface CustomAccordionTriggerProps extends AccordionSummaryProps {
    /** Override the default Chevron icon */
    icon?: React.ReactNode;
    /** Hide the icon completely */
    hideIcon?: boolean;
}

const StyledMuiAccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
    padding: theme.spacing(1.5, 0), // Use theme spacing instead of '10px 0'
    minHeight: 'auto',
    '& .MuiAccordionSummary-content': {
        margin: 0,
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: theme.typography.body2.fontSize, // Adapts to your global theme
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
        color: theme.palette.text.secondary,
    },
    '&:hover': {
        textDecoration: 'underline',
    },
}));

const AccordionTrigger = React.forwardRef<HTMLDivElement, CustomAccordionTriggerProps>(
    ({ className, children, icon, hideIcon = false, sx, ...props }, ref) => {
        // Determine which icon to show
        const expandIcon = hideIcon ? null : icon || <ChevronDown size={16} />;

        return (
            <StyledMuiAccordionSummary
                ref={ref}
                className={className}
                expandIcon={expandIcon}
                sx={sx}
                {...props}
            >
                {children}
            </StyledMuiAccordionSummary>
        );
    }
);
AccordionTrigger.displayName = 'AccordionTrigger';

// ----------------------------------------------------------------------
// 4. Accordion Content
// Generalization: Theme-aware padding
// ----------------------------------------------------------------------
const StyledMuiAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0, 0, 1.5, 0),
    fontSize: theme.typography.body2.fontSize,
}));

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionDetailsProps>(
    ({ className, sx, children, ...props }, ref) => (
        <StyledMuiAccordionDetails ref={ref} className={className} sx={sx} {...props}>
            {children}
        </StyledMuiAccordionDetails>
    )
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };