import { Box, Container, Stack } from "@mui/material";
import InputForm, { type InputData } from "./components/input-form";
import { useState } from "react";
import SequencePair from "./components/sequence-pair";
import { createMultilineAlignment } from "./utils/alignment";
import { useResponsiveLen } from "./hooks/useResponsiveLen";

const App = () => {
  const [ref, maxSequenceLen] = useResponsiveLen();

  const [alignment, setAlignment] = useState<InputData | null>(null);

  const handleSubmit = (data: InputData) => {
    setAlignment(data);
  };

  console.log(maxSequenceLen);

  return (
    <Container fixed>
      <Box sx={{ mt: 1 }} ref={ref}>
        <InputForm onSubmit={handleSubmit} />
        {alignment && (
          <Stack spacing={1} sx={{ mt: 3 }}>
            {createMultilineAlignment(
              alignment.top,
              alignment.bottom,
              maxSequenceLen
            ).map((pair, i) => (
              <SequencePair key={i} {...pair} />
            ))}
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default App;
