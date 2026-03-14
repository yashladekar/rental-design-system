'use client';

import * as React from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';
import { GripVertical } from 'lucide-react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Resizable Panel Group (The Container)
// ----------------------------------------------------------------------
type PrimitiveGroupProps = React.ComponentProps<typeof ResizablePrimitive.Group>;

export interface ResizablePanelGroupProps extends Omit<PrimitiveGroupProps, 'orientation'> {
    orientation?: 'horizontal' | 'vertical';
    direction?: 'horizontal' | 'vertical';
}

export const ResizablePanelGroup = ({
    className,
    direction,
    orientation,
    ...props
}: ResizablePanelGroupProps) => {
    const resolvedOrientation = orientation ?? direction ?? 'horizontal';

    return (
        <ResizablePrimitive.Group
            orientation={resolvedOrientation}
            className={cn('ds-resizable-panel-group', className)}
            style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                // Ensure the flex direction matches the split direction
                flexDirection: resolvedOrientation === 'vertical' ? 'column' : 'row',
            }}
            {...props}
        />
    );
};
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

// ----------------------------------------------------------------------
// 2. Resizable Panel (The individual pane)
// ----------------------------------------------------------------------
// The panel is purely headless and handles width/height math internally.
export interface ResizablePanelProps extends React.ComponentProps<typeof ResizablePrimitive.Panel> { }

const normalizePanelSize = (value: number | string | undefined) => {
    if (typeof value === 'number') {
        // Shadcn examples commonly use numeric percentage values.
        // react-resizable-panels v4 treats numbers as pixels, so normalize to percent.
        return `${value}%`;
    }

    return value;
};

export const ResizablePanel = ({
    defaultSize,
    minSize,
    maxSize,
    collapsedSize,
    ...props
}: ResizablePanelProps) => (
    <ResizablePrimitive.Panel
        defaultSize={normalizePanelSize(defaultSize)}
        minSize={normalizePanelSize(minSize)}
        maxSize={normalizePanelSize(maxSize)}
        collapsedSize={normalizePanelSize(collapsedSize)}
        {...props}
    />
);
ResizablePanel.displayName = 'ResizablePanel';

// ----------------------------------------------------------------------
// 3. Resizable Handle (The draggable divider)
// ----------------------------------------------------------------------

// We use Emotion to perfectly style the invisible hit-box, the visible 1px line, 
// and the focus states when the user interacts with the divider.
const StyledHandle = styled(ResizablePrimitive.Separator)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    width: 1, // default width for horizontal direction
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.divider,
    transition: 'background-color 0.2s',

    // Invisible hit-box to make it easier to grab the 1px line with a mouse
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 12, // 12px wide invisible grab area
        backgroundColor: 'transparent',
    },

    // When the handle is focused via keyboard
    '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 1px #ffffff, 0 0 0 3px ${theme.palette.primary.main}`,
    },

    // When dragging or hovering, darken the line slightly
    '&[data-resize-handle-state="drag"], &:hover': {
        backgroundColor: theme.palette.text.secondary,
    },

    // Logic for Vertical splits (rows stacked on top of each other)
    '&[aria-orientation="vertical"]': {
        width: '100%',
        height: 1,
        '&::after': {
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100%',
            height: 12, // 12px tall invisible grab area
        },
    },
}));

export interface ResizableHandleProps extends React.ComponentProps<typeof ResizablePrimitive.Separator> {
    withHandle?: boolean;
}

export const ResizableHandle = ({
    withHandle,
    className,
    ...props
}: ResizableHandleProps) => {
    return (
        <StyledHandle
            className={cn('ds-resizable-handle', className)}
            {...props}
        >
            {/* Optional: The tiny Shadcn grip icon box in the center of the line */}
            {withHandle && (
                <Box
                    sx={{
                        zIndex: 10,
                        display: 'flex',
                        height: 16, // h-4
                        width: 12,  // w-3
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 0.5, // rounded-sm
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',

                        // The icon inside the box
                        '& svg': {
                            width: 10,
                            height: 10,
                        },

                        // Rotate the box slightly based on orientation
                        '[aria-orientation="vertical"] &': {
                            width: 16,
                            height: 12,
                            '& svg': {
                                transform: 'rotate(90deg)'
                            }
                        }
                    }}
                >
                    <GripVertical />
                </Box>
            )}
        </StyledHandle>
    );
};
ResizableHandle.displayName = 'ResizableHandle';