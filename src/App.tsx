import { Box, Stack } from "@mui/material";
import InputForm, { type InputData } from "./components/input-form";
import { useState } from "react";
import SequencePair from "./components/sequence-pair";

const App = () => {
  const [alignment, setAlignment] = useState<InputData | null>(null);
 

  const handleSubmit = (data: InputData) => {
    setAlignment(data);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <InputForm onSubmit={handleSubmit} />

      {alignment && (
        <Stack spacing={1}>
          <SequencePair
            topSequence={alignment.top}
            bottomColorStops=""
            bottomSequence={alignment.bottom}
            topColorStops=""
          />
        </Stack>
      )}
    </Box>
  );
};

export default App;
