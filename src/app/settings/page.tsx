// // src/app/settings/page.tsx
// 'use client';

// import * as React from 'react';
// import { Stack, Box } from '@mui/material';
// import { RadioGroup, Radio } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';

// export default function NotificationPreferencesForm() {
//     const [value, setValue] = React.useState('all');

//     return (
//         <Box sx={{ maxWidth: 400, mt: 4 }}>
//             <Stack spacing={2}>

//                 <Box component="div" sx={{ fontWeight: 600, mb: 1 }}>
//                     Notify me about...
//                 </Box>

//                 <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
//                     {/* We use a Stack to space out the radio options vertically */}
//                     <Stack spacing={1.5}>

//                         {/* Option 1 */}
//                         <Stack direction="row" spacing={1.5} alignItems="center">
//                             <Radio value="all" id="r1" />
//                             <Label htmlFor="r1" sx={{ mb: 0, cursor: 'pointer' }}>
//                                 All new messages
//                             </Label>
//                         </Stack>

//                         {/* Option 2 */}
//                         <Stack direction="row" spacing={1.5} alignItems="center">
//                             <Radio value="mentions" id="r2" />
//                             <Label htmlFor="r2" sx={{ mb: 0, cursor: 'pointer' }}>
//                                 Direct messages and mentions
//                             </Label>
//                         </Stack>

//                         {/* Option 3 */}
//                         <Stack direction="row" spacing={1.5} alignItems="center">
//                             <Radio value="none" id="r3" />
//                             <Label htmlFor="r3" sx={{ mb: 0, cursor: 'pointer' }}>
//                                 Nothing
//                             </Label>
//                         </Stack>

//                     </Stack>
//                 </RadioGroup>

//             </Stack>
//         </Box>
//     );
// }





// // src/app/settings/page.tsx
// 'use client';

// import * as React from 'react';
// import { Box, Stack } from '@mui/material';
// import {
//     Tabs,
//     TabsList,
//     TabsTrigger,
//     TabsContent
// } from '@/components/ui/tabs';
// import {
//     Card,
//     CardHeader,
//     CardTitle,
//     CardDescription,
//     CardContent,
//     CardFooter
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export default function SettingsTabs() {
//     // 1. Manage the active tab state
//     const [activeTab, setActiveTab] = React.useState('account');

//     // MUI's onChange signature passes the event and the new value
//     const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//         setActiveTab(newValue);
//     };

//     return (
//         <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 8 }}>
//             <Tabs>

//                 {/* 2. The Tab Navigation List */}
//                 <TabsList value={activeTab} onChange={handleChange}>
//                     <TabsTrigger value="account" label="Account" />
//                     <TabsTrigger value="password" label="Password" />
//                     <TabsTrigger value="notifications" label="Notifications" />
//                 </TabsList>

//                 {/* 3. The Content Panels */}

//                 {/* Account Panel */}
//                 <TabsContent value="account" currentValue={activeTab}>
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Account</CardTitle>
//                             <CardDescription>
//                                 Make changes to your account here. Click save when you're done.
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <Stack spacing={2}>
//                                 <Box>
//                                     <Label htmlFor="name">Name</Label>
//                                     <Input id="name" defaultValue="Pedro Duarte" />
//                                 </Box>
//                                 <Box>
//                                     <Label htmlFor="username">Username</Label>
//                                     <Input id="username" defaultValue="@peduarte" />
//                                 </Box>
//                             </Stack>
//                         </CardContent>
//                         <CardFooter>
//                             <Button>Save changes</Button>
//                         </CardFooter>
//                     </Card>
//                 </TabsContent>

//                 {/* Password Panel */}
//                 <TabsContent value="password" currentValue={activeTab}>
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Password</CardTitle>
//                             <CardDescription>
//                                 Change your password here. After saving, you'll be logged out.
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <Stack spacing={2}>
//                                 <Box>
//                                     <Label htmlFor="current">Current password</Label>
//                                     <Input id="current" type="password" />
//                                 </Box>
//                                 <Box>
//                                     <Label htmlFor="new">New password</Label>
//                                     <Input id="new" type="password" />
//                                 </Box>
//                             </Stack>
//                         </CardContent>
//                         <CardFooter>
//                             <Button>Save password</Button>
//                         </CardFooter>
//                     </Card>
//                 </TabsContent>

//                 {/* Notifications Panel */}
//                 <TabsContent value="notifications" currentValue={activeTab}>
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Notifications</CardTitle>
//                             <CardDescription>
//                                 Manage your notification preferences.
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
//                                 Notification settings coming soon.
//                             </Box>
//                         </CardContent>
//                     </Card>
//                 </TabsContent>

//             </Tabs>
//         </Box>
//     );
// }

// src/app/settings/page.tsx
'use client';

import * as React from 'react';
import { Stack, Box } from '@mui/material';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SecurityForm() {
    const [twoFactor, setTwoFactor] = React.useState(false);
    const [marketing, setMarketing] = React.useState(true);

    return (
        <Box sx={{ maxWidth: 500, mt: 4, p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Stack spacing={4}>

                {/* Toggle 1 */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack spacing={0.5}>
                        {/* The cursor-pointer on the label makes the text clickable to toggle the switch */}
                        <Label htmlFor="two-factor" sx={{ mb: 0, cursor: 'pointer', fontSize: '1rem' }}>
                            Two-factor Authentication
                        </Label>
                        <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                            Secure your account with a secondary verification method.
                        </Box>
                    </Stack>

                    <Switch
                        id="two-factor"
                        checked={twoFactor}
                        onChange={(e) => setTwoFactor(e.target.checked)}
                    />
                </Stack>

                {/* Divider */}
                <Box sx={{ height: '1px', backgroundColor: 'divider', width: '100%' }} />

                {/* Toggle 2 */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack spacing={0.5}>
                        <Label htmlFor="marketing" sx={{ mb: 0, cursor: 'pointer', fontSize: '1rem' }}>
                            Marketing emails
                        </Label>
                        <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                            Receive emails about new products, features, and more.
                        </Box>
                    </Stack>

                    <Switch
                        id="marketing"
                        checked={marketing}
                        onChange={(e) => setMarketing(e.target.checked)}
                    />
                </Stack>

            </Stack>
        </Box>
    );
}