// src/app/dashboard/media/page.tsx
'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

export default function CarouselExample() {
    return (
        <Box sx={{ p: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>

            {/* Example 1: Basic Single Slide Carousel */}
            <Box sx={{ width: '100%', maxWidth: 300 }}>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 2, textAlign: 'center' }}>
                    Single Slide
                </Typography>

                <Carousel>
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <Card sx={{ p: 1 }}>
                                    <CardContent sx={{ display: 'flex', aspectRatio: '1/1', alignItems: 'center', justifyContent: 'center', p: 6 }}>
                                        <Typography variant="h3" fontWeight={600}>
                                            {index + 1}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </Box>

            {/* Example 2: Multi-Slide Carousel (Responsive) */}
            <Box sx={{ width: '100%', maxWidth: 600 }}>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 2, textAlign: 'center' }}>
                    Multiple Slides (3 up)
                </Typography>

                <Carousel
                    opts={{
                        align: 'start', // Aligns slides to the left edge rather than center
                        loop: true,     // Infinite scroll
                    }}
                >
                    <CarouselContent>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <CarouselItem key={index} sx={{ flexBasis: { xs: '100%', sm: '50%', md: '33.333%' } }}>
                                <Box sx={{ p: 1 }}>
                                    <Card>
                                        <CardContent sx={{ display: 'flex', aspectRatio: '1/1', alignItems: 'center', justifyContent: 'center', p: 6 }}>
                                            <Typography variant="h5" fontWeight={600}>
                                                {index + 1}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </Box>

        </Box>
    );
}