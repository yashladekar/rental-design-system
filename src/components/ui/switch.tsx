'use client';

import * as React from 'react';
import { Switch as MuiSwitch, SwitchProps as MuiSwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { cn } from '@/lib/utils';

export interface SwitchProps extends MuiSwitchProps {
    className?: string;
}

// ----------------------------------------------------------------------
// 1. Custom Styled Switch (Emotion)
// ----------------------------------------------------------------------
// We use Emotion's styled API because styling the complex pseudo-elements 
// and nested spans of MuiSwitch is much easier here than inline sx.
const StyledSwitch = styled(MuiSwitch)(({ theme }) => ({
    width: 44, // 11 * 4px
    height: 24, // 6 * 4px
    padding: 0,

    // 1. The Track (Background pill)
    '& .MuiSwitch-track': {
        borderRadius: 24 / 2, // Pill shape
        backgroundColor: '#e2e8f0', // Slate 200 (unchecked state)
        opacity: 1, // Kill MUI's default semi-transparency
        transition: theme.transitions.create(['background-color'], {
            duration: 200,
        }),
    },

    // 2. The Thumb (The circle that moves)
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 0 0 / 0.1)', // shadow-sm
        backgroundColor: '#ffffff', // White circle
        width: 20,
        height: 20,
        // When unchecked, the thumb sits on the left
    },

    // 3. The Base positioning of the input and thumb
    '& .MuiSwitch-switchBase': {
        padding: 2, // Spacing from the edge of the track

        // Checked State (Thumb moves right)
        '&.Mui-checked': {
            transform: 'translateX(20px)',
            color: '#fff',
            // Color the track when checked
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
            },
            // Keep the thumb white when checked
            '& .MuiSwitch-thumb': {
                backgroundColor: '#ffffff',
            },
        },

        // Focus Ring (Accessibility)
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            boxShadow: `0 0 0 2px #ffffff, 0 0 0 4px ${theme.palette.primary.main}`,
        },

        // Disabled State
        '&.Mui-disabled': {
            '& + .MuiSwitch-track': {
                opacity: 0.5,
                cursor: 'not-allowed',
            },
            '& .MuiSwitch-thumb': {
                opacity: 0.9, // Keep thumb mostly visible when disabled
            },
        },
    },
}));

// ----------------------------------------------------------------------
// 2. The Switch Wrapper
// ----------------------------------------------------------------------
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
    ({ className, sx, ...props }, ref) => (
        <StyledSwitch
            ref={ref}
            className={cn('ds-switch', className)}
            // Kill the Material ripple effect for a modern feel
            disableRipple
            sx={{ ...sx }}
            {...props}
        />
    )
);
Switch.displayName = 'Switch';