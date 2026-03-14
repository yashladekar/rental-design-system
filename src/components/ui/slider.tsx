'use client';

import * as React from 'react';
import { Slider as MuiSlider, SliderProps as MuiSliderProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { cn } from '@/lib/utils';

export interface SliderProps extends MuiSliderProps {
    className?: string;
}

// ----------------------------------------------------------------------
// 1. Custom Styled Slider (Emotion)
// ----------------------------------------------------------------------
// We use Emotion's styled API because targeting the thumb, track, and rail
// pseudo-elements is much cleaner here than using inline sx props.

const StyledSlider = styled(MuiSlider)(({ theme }) => ({
    height: 8, // h-2 (thicker than MUI's default 4px)
    padding: '16px 0', // Increases the invisible touch target area

    // 1. The Rail (The unfilled background track)
    '& .MuiSlider-rail': {
        backgroundColor: theme.palette.action.hover, // Muted slate color
        opacity: 1, // Kill MUI's default semi-transparency
        borderRadius: 4,
    },

    // 2. The Track (The filled primary portion)
    '& .MuiSlider-track': {
        border: 'none', // MUI sometimes adds borders to the track, we remove it
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4,
    },

    // 3. The Thumb (The draggable handle)
    '& .MuiSlider-thumb': {
        height: 20, // h-5
        width: 20,  // w-5
        backgroundColor: '#ffffff', // Clean white center
        border: `2px solid ${theme.palette.primary.main}`, // Primary ring
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // shadow-sm
        transition: 'background-color 0.2s, box-shadow 0.2s, border-color 0.2s, left 0s, bottom 0s',

        // Kill the default Material hover halo/ripple effect
        '&::before': {
            display: 'none',
        },

        // Hover state (subtle shadow increase)
        '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // shadow-md
        },

        // Focus & Active Ring (Shadcn style accessibility ring)
        '&.Mui-focusVisible, &.Mui-active': {
            boxShadow: `0 0 0 2px #ffffff, 0 0 0 4px ${theme.palette.primary.main}`,
        },
    },

    // 4. Disabled State
    '&.Mui-disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        color: theme.palette.primary.main, // Retain the layout colors, just fade them
        '& .MuiSlider-thumb': {
            backgroundColor: '#ffffff', // Ensure the thumb doesn't turn gray
        },
    },

    // 5. Marks (Optional: if you use discrete steps)
    '& .MuiSlider-mark': {
        backgroundColor: theme.palette.background.paper, // Make dots cut out of the track
        height: 4,
        width: 4,
        borderRadius: '50%',
        '&.MuiSlider-markActive': {
            opacity: 0.8,
            backgroundColor: theme.palette.background.paper,
        },
    },
}));

// ----------------------------------------------------------------------
// 2. The Slider Wrapper
// ----------------------------------------------------------------------
export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
    ({ className, sx, ...props }, ref) => (
        <StyledSlider
            ref={ref}
            className={cn('ds-slider', className)}
            sx={{ ...sx }}
            {...props}
        />
    )
);
Slider.displayName = 'Slider';