// src/app/settings/page.tsx
'use client';

import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function SliderExample() {
    const [volume, setVolume] = React.useState(50);
    const [priceRange, setPriceRange] = React.useState<number[]>([25, 75]);

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 8, p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Stack spacing={6}>

                {/* Example 1: Standard Single Slider */}
                <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Label htmlFor="volume" sx={{ mb: 0 }}>System Volume</Label>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            {volume}%
                        </Typography>
                    </Stack>

                    <Slider
                        id="volume"
                        value={volume}
                        onChange={(_, newValue) => setVolume(newValue as number)}
                        aria-label="Volume"
                    />
                </Box>

                {/* Example 2: Range Slider (Dual Thumb) */}
                <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Label sx={{ mb: 0 }}>Price Range</Label>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            ${priceRange[0]} - ${priceRange[1]}
                        </Typography>
                    </Stack>

                    <Slider
                        value={priceRange}
                        onChange={(_, newValue) => setPriceRange(newValue as number[])}
                        valueLabelDisplay="auto" // Shows tooltip when dragging
                        aria-label="Price range"
                        disableSwap // Prevents thumbs from crossing over each other
                    />
                </Box>

                {/* Example 3: Discrete Slider with Steps and Marks */}
                <Box>
                    <Label sx={{ mb: 2, display: 'block' }}>Playback Speed</Label>
                    <Slider
                        defaultValue={1}
                        step={0.5}
                        marks
                        min={0.5}
                        max={2}
                        valueLabelDisplay="auto"

                    />
                </Box>

            </Stack>
        </Box>
    );
}