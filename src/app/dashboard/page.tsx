// // src/app/dashboard/page.tsx
// import { Stack, Box } from '@mui/material';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//     Card,
//     CardHeader,
//     CardTitle,
//     CardDescription,
//     CardContent,
//     CardFooter
// } from '@/components/ui/card';

// export default function DashboardPage() {
//     return (
//         <div>
//         // Centered layout using MUI Box
//             {/* <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 8 }}>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Create project</CardTitle>
//                         <CardDescription>Deploy your new project in one-click.</CardDescription>
//                     </CardHeader>

//                     <CardContent>
//                         <Stack spacing={2}>
//                             <Stack spacing={1}>
//                                 <Box component="label" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
//                                     Name
//                                 </Box>
//                                 <Input placeholder="Name of your project" />
//                             </Stack>
//                             <Stack spacing={1}>
//                                 <Box component="label" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
//                                     Framework
//                                 </Box>
//                                 <Input placeholder="Next.js" />
//                             </Stack>
//                         </Stack>
//                     </CardContent>

//                     <CardFooter sx={{ justifyContent: 'space-between' }}>
//                         <Button variant="outline">Cancel</Button>
//                         <Button variant="default">Deploy</Button>
//                     </CardFooter>
//                 </Card>

//             </Box> */}
//             <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 8 }}>
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Create project</CardTitle>
//                         <CardDescription>Deploy your new project in one-click.</CardDescription>
//                     </CardHeader>

//                     <CardContent>
//                         {/* Main vertical stack for the form fields */}
//                         <Stack spacing={3}>

//                             {/* Field 1: Name */}
//                             {/* We use Box here because the Label has built-in marginBottom, 
//                 so we don't need a Stack to gap them. */}
//                             <Box>
//                                 <Label htmlFor="project-name" required>Project Name</Label>
//                                 <Input id="project-name" placeholder="Name of your project" />
//                             </Box>

//                             {/* Field 2: Framework */}
//                             <Box>
//                                 <Label htmlFor="framework">Framework</Label>
//                                 <Input id="framework" placeholder="Next.js" />
//                             </Box>

//                         </Stack>
//                     </CardContent>

//                     <CardFooter sx={{ justifyContent: 'flex-end', gap: 2 }}>
//                         <Button variant="outline">Cancel</Button>
//                         <Button variant="default">Deploy</Button>
//                     </CardFooter>
//                 </Card>
//             </Box>
//         </div>
//     );
// }

// src/app/dashboard/page.tsx


// 'use client';

// import * as React from 'react';
// import { Stack, Box } from '@mui/material';
// import { Label } from '@/components/ui/label';
// import { Select, SelectItem, SelectLabel } from '@/components/ui/select';

// export default function SettingsForm() {
//     const [timezone, setTimezone] = React.useState('');

//     return (
//         <Box sx={{ maxWidth: 300, mt: 4 }}>
//             <Stack spacing={1}>
//                 <Label htmlFor="timezone-select">Timezone</Label>

//                 <Select
//                     id="timezone-select"
//                     value={timezone}
//                     onChange={(e) => setTimezone(String(e.target.value ?? ''))}
//                 >
//                     {/* By setting value="" and disabled, this acts as our Placeholder */}
//                     <SelectItem value="" disabled>
//                         Select a timezone
//                     </SelectItem>

//                     <SelectLabel sx={{ mt: 2, fontSize: '0.875rem' }}>North America</SelectLabel>
//                     <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//                     <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>

//                     <SelectLabel sx={{ mt: 2, fontSize: '0.875rem' }}>Europe</SelectLabel>
//                     <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
//                     <SelectItem value="cet">Central European Time (CET)</SelectItem>
//                 </Select>
//             </Stack>
//         </Box>
//     );
// }

// src/app/settings/page.tsx
// 'use client';

// import * as React from 'react';
// import { Stack, Box } from '@mui/material';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';

// export default function NotificationsForm() {
//     const [checked, setChecked] = React.useState(true);

//     return (
//         <Box sx={{ p: 4 }}>
//             {/* We use Stack direction="row" to align the checkbox and label horizontally */}
//             <Stack direction="row" spacing={1.5} alignItems="flex-start">

//                 {/* The Checkbox */}
//                 <Checkbox
//                     id="terms"
//                     checked={checked}
//                     onChange={(e) => setChecked(e.target.checked)}
//                     // We add a tiny bit of top margin (e.g., mt: 0.25 = 2px) to perfectly 
//                     // center the 16px checkbox with the first line of the label text.
//                     sx={{ mt: 0.25 }}
//                 />

//                 {/* The Label & Description */}
//                 <Stack spacing={0.5}>
//                     {/* Notice we set marginBottom: 0 on this Label because the Stack handles spacing */}
//                     <Label htmlFor="terms" sx={{ mb: 0, cursor: 'pointer' }}>
//                         Accept terms and conditions
//                     </Label>
//                     <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
//                         You agree to our Terms of Service and Privacy Policy.
//                     </Box>
//                 </Stack>

//             </Stack>
//         </Box>
//     );
// }


// src/app/dashboard/page.tsx

// 'use client';

// import * as React from 'react';
// import { Box, Stack } from '@mui/material';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle
// } from '@/components/ui/dialog';

// export default function EditProfilePage() {
//     const [open, setOpen] = React.useState(false);

//     return (
//         <Box sx={{ p: 4 }}>
//             {/* 1. The Trigger */}
//             <Button variant="outline" onClick={() => setOpen(true)}>
//                 Edit Profile
//             </Button>

//             {/* 2. The Modal */}
//             <Dialog open={open} onClose={() => setOpen(false)}>

//                 <DialogHeader>
//                     <DialogTitle onClose={() => setOpen(false)}>Edit profile</DialogTitle>
//                     <DialogDescription>
//                         Make changes to your profile here. Click save when you're done.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <DialogContent>
//                     <Stack spacing={3} sx={{ py: 2 }}>
//                         <Box>
//                             <Label htmlFor="name">Name</Label>
//                             <Input id="name" defaultValue="Pedro Duarte" />
//                         </Box>
//                         <Box>
//                             <Label htmlFor="username">Username</Label>
//                             <Input id="username" defaultValue="@peduarte" />
//                         </Box>
//                     </Stack>
//                 </DialogContent>

//                 <DialogFooter>
//                     {/* Note: The Footer automatically stacks these buttons vertically on mobile! */}
//                     <Button variant="outline" onClick={() => setOpen(false)}>
//                         Cancel
//                     </Button>
//                     <Button variant="default" onClick={() => setOpen(false)}>
//                         Save changes
//                     </Button>
//                 </DialogFooter>

//             </Dialog>
//         </Box>
//     );
// }


// // src/app/dashboard/page.tsx
// 'use client';

// import * as React from 'react';
// import { Box, Stack, IconButton } from '@mui/material';
// import { Plus, Settings, Trash2 } from 'lucide-react';
// import { Tooltip } from '@/components/ui/tooltip';
// import { Button } from '@/components/ui/button';

// export default function TooltipExample() {
//     return (
//         <Box sx={{ p: 8, display: 'flex', gap: 4, justifyContent: 'center' }}>

//             {/* Example 1: Wrapping a standard Button */}
//             <Tooltip content="Add to library">
//                 <Button variant="outline">
//                     <Plus size={16} className="mr-2" /> Hover me
//                 </Button>
//             </Tooltip>

//             {/* Example 2: Wrapping Icon Buttons (Very Common) */}
//             <Stack direction="row" spacing={2} sx={{ border: '1px solid', borderColor: 'divider', p: 1, borderRadius: 2 }}>

//                 <Tooltip content="Manage settings">
//                     <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
//                         <Settings size={20} />
//                     </IconButton>
//                 </Tooltip>

//                 {/* Example with a different placement and custom variant styling */}
//                 <Tooltip content="Delete project" placement="bottom">
//                     <IconButton sx={{ color: 'error.main', '&:hover': { backgroundColor: '#fee2e2' } }}>
//                         <Trash2 size={20} />
//                     </IconButton>
//                 </Tooltip>

//             </Stack>

//         </Box>
//     );
// }


// src/app/dashboard/page.tsx
'use client';

import * as React from 'react';
import { Box, Stack } from '@mui/material';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter
} from '@/components/ui/sheet';

export default function SheetExample() {
    const [open, setOpen] = React.useState(false);

    return (
        <Box sx={{ p: 4 }}>

            {/* 1. The Trigger Button */}
            <Button variant="outline" onClick={() => setOpen(true)}>
                Open Edit Profile
            </Button>

            {/* 2. The Sheet Component */}
            {/* side="right" means it slides in from the right edge of the screen */}
            <Sheet open={open} onClose={() => setOpen(false)} side="right">

                {/* We pass onClose to SheetContent so it renders the 'X' button in the top right */}
                <SheetContent onClose={() => setOpen(false)}>

                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>

                    <Separator sx={{ mx: -3, mb: 3, width: 'auto' }} /> {/* Full width separator trick */}

                    {/* Main Form Content */}
                    <Stack spacing={4} sx={{ mb: 4 }}>
                        <Box>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Pedro Duarte" />
                        </Box>
                        <Box>
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue="@peduarte" />
                        </Box>
                    </Stack>

                    {/* Footer naturally pushes to the bottom of the Sheet */}
                    <SheetFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="default" onClick={() => setOpen(false)}>
                            Save changes
                        </Button>
                    </SheetFooter>

                </SheetContent>
            </Sheet>

        </Box>
    );
}