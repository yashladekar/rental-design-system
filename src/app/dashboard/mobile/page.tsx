// src/app/dashboard/mobile/page.tsx
'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { Progress } from '@/components/ui/progress';

export default function DrawerExample() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>

            {/* The Trigger */}
            <Button variant="outline" onClick={toggleDrawer(true)}>
                Open Mobile Drawer
            </Button>

            {/* The Drawer */}
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <DrawerContent>

                    <DrawerHeader>
                        <DrawerTitle>Move Goal</DrawerTitle>
                        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>

                    {/* Main Content Area */}
                    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h2" fontWeight={700} sx={{ letterSpacing: '-0.05em' }}>
                            350
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            calories/day
                        </Typography>

                        {/* Reusing our Progress component from earlier */}
                        <Box sx={{ width: '100%', maxWidth: 300, mt: 4 }}>
                            <Progress value={65} sx={{ height: 16 }} />
                        </Box>
                    </Box>

                    <DrawerFooter>
                        <Button onClick={toggleDrawer(false)}>Submit</Button>
                        <Button variant="outline" onClick={toggleDrawer(false)}>
                            Cancel
                        </Button>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>

        </Box>
    );
}