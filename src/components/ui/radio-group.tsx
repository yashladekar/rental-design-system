'use client';

import * as React from 'react';
import {
    Radio as MuiRadio,
    RadioProps as MuiRadioProps,
    RadioGroup as MuiRadioGroup,
    RadioGroupProps as MuiRadioGroupProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Radio Group (The Container)
// ----------------------------------------------------------------------
export interface RadioGroupProps extends MuiRadioGroupProps {
    className?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
    ({ className, ...props }, ref) => {
        return (
            <MuiRadioGroup
                ref={ref}
                className={cn('ds-radio-group', className)}
                {...props}
            />
        );
    }
);
RadioGroup.displayName = 'RadioGroup';

// ----------------------------------------------------------------------
// 2. Custom Styled Icons using Emotion (Robust Theme Access)
// ----------------------------------------------------------------------

// The Unchecked State (An empty circle with a border)
const StyledRadioIcon = styled('span')(({ theme }) => ({
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: `1px solid ${theme.palette.divider}`, // Uses theme palette directly
    backgroundColor: 'transparent',
    transition: 'border-color 0.2s',
}));

// The Checked State (A circle with a smaller filled circle inside)
const StyledRadioCheckedIcon = styled(StyledRadioIcon)(({ theme }) => ({
    borderColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // The inner dot
    '&::before': {
        content: '""',
        display: 'block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
    },
}));

// ----------------------------------------------------------------------
// 3. The Radio Component
// ----------------------------------------------------------------------
export interface RadioProps extends MuiRadioProps {
    className?: string;
}

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiRadio
            ref={ref}
            className={cn('ds-radio', className)}
            // 1. Swap the default Material SVGs with our styled ones
            icon={<StyledRadioIcon className="ds-radio-unchecked" />}
            checkedIcon={<StyledRadioCheckedIcon />}

            // 2. Kill the Material ripple effect
            disableRipple

            // 3. Style overrides for layout and focus
            sx={{
                padding: 0,

                // Hover state (target the unchecked icon via the class name)
                '&:hover:not(.Mui-checked):not(.Mui-disabled) .ds-radio-unchecked': {
                    borderColor: 'primary.main',
                },

                // Focus ring (Shadcn style)
                '&.Mui-focusVisible': {
                    boxShadow: (theme) => `0 0 0 2px #ffffff, 0 0 0 4px ${theme.palette.primary.main}`,
                    borderRadius: '50%', // Must be round for radio buttons
                },

                // Disabled state
                '&.Mui-disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed',
                },

                ...sx,
            }}
            {...props}
        />
    )
);
Radio.displayName = 'Radio';