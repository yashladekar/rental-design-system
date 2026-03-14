// src/app/profile/page.tsx
'use client';

import * as React from 'react';
import { Box, Stack } from '@mui/material';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from '@/components/ui/card';

export default function ProfileForm() {
    const [bio, setBio] = React.useState('');

    return (
        <Box sx={{ maxWidth: 500, margin: '0 auto', mt: 8 }}>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription>
                        This information will be displayed publicly so be careful what you share.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Stack spacing={2}>
                        <Box>
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us a little bit about yourself"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                            {/* Helper Text */}
                            <Box sx={{ fontSize: '0.875rem', color: 'text.secondary', mt: 1 }}>
                                You can <span>@mention</span> other users and organizations to link to them.
                            </Box>
                        </Box>
                    </Stack>
                </CardContent>

                <CardFooter sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="default">Save profile</Button>
                </CardFooter>
            </Card>
        </Box>
    );
}