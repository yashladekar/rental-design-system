// src/app/faq/page.tsx
'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import {
    Accordion,
    AccordionContent,
    AccordionGroup,
    AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQPage() {
    // State to track which accordion is currently open (for "single" mode)
    // If you want "multiple" mode, just remove this state and the onChange handlers.
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 8, p: 4 }}>

            <Typography variant="h4" fontWeight={600} gutterBottom>
                Frequently Asked Questions
            </Typography>

            <AccordionGroup>

                {/* Item 1 */}
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern. All focus states and keyboard navigation work out of the box thanks to Material UI's robust foundation.
                    </AccordionContent>
                </Accordion>

                {/* Item 2 */}
                <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                >
                    <AccordionTrigger>Is it styled with Tailwind CSS?</AccordionTrigger>
                    <AccordionContent>
                        No. It completely avoids Tailwind CSS and relies entirely on Material UI's `sx` prop and Emotion's `styled` engine, ensuring a strict, cohesive theming system without massive utility class strings.
                    </AccordionContent>
                </Accordion>

                {/* Item 3 */}
                <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                >
                    <AccordionTrigger>Can I animate the icon?</AccordionTrigger>
                    <AccordionContent>
                        Absolutely. The chevron icon automatically rotates 180 degrees when the panel expands, driven by the native `.Mui-expanded` class.
                    </AccordionContent>
                </Accordion>

            </AccordionGroup>
        </Box>
    );
}