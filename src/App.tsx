import { Box, Card, CardContent, Container, Stack } from "@mui/material";
import InputForm, { type InputData } from "./components/input-form";
import { useState } from "react";
import SequencePair from "./components/sequence-pair";
import { createMultilineAlignment } from "./utils/alignment";

const App = () => {
  const [alignment, setAlignment] = useState<InputData | null>(null);

  const handleSubmit = (data: InputData) => {
    setAlignment(data);
  };

  return (
    <Container fixed>
      <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
        <InputForm onSubmit={handleSubmit} />

        {alignment && (
          <Stack spacing={1}>
            {createMultilineAlignment(alignment.top, alignment.bottom, 30).map(
              (pair, i) => (
                <SequencePair key={i} {...pair} />
              )
            )}
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default App;
