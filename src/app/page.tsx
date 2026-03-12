import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>

      <Box
        sx={{
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 10px 35px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="overline" color="text.secondary">
            Material UI is configured
          </Typography>
          <Typography variant="h3" component="h1">
            Rental Design System
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You can now build components using Material UI with theme support in
            the Next.js App Router.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained">Primary Action</Button>
            <Button variant="outlined">Secondary Action</Button>
          </Stack>
        </Stack>
      </Box>
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </AccordionContent>
        </AccordionItem>
      </Accordion>


    </Container >
  );
}
