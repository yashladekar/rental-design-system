// src/app/team/page.tsx
'use client';

import * as React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function TeamPage() {
    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 8 }}>
            <Stack spacing={4}>

                {/* Example 1: Individual Avatars */}
                <Card>
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>People with access to this project.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Stack spacing={3}>

                            {/* Working Image */}
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar src="https://github.com/shadcn.png" alt="@shadcn" />
                                <Box>
                                    <Typography variant="body2" fontWeight={600}>shadcn</Typography>
                                    <Typography variant="body2" color="text.secondary">m@example.com</Typography>
                                </Box>
                            </Stack>

                            {/* Broken Image -> Falls back to initials */}
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar src="https://broken-link.com/img.jpg" alt="@peduarte">
                                    <AvatarFallback>PD</AvatarFallback>
                                </Avatar>
                                <Box>
                                    <Typography variant="body2" fontWeight={600}>Pedro Duarte</Typography>
                                    <Typography variant="body2" color="text.secondary">pedro@example.com</Typography>
                                </Box>
                            </Stack>

                        </Stack>
                    </CardContent>
                </Card>

                {/* Example 2: Avatar Group */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="body2" color="text.secondary">
                                Viewed by:
                            </Typography>
                            {/* Because max=4, it will show the first 3 avatars and then a "+2" bubble 
               */}
                            <AvatarGroup max={4}>
                                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                                <Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
                                <Avatar alt="Agnes Walker" src="https://mui.com/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="https://mui.com/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                        </Stack>
                    </CardContent>
                </Card>

            </Stack>
        </Box>
    );
}