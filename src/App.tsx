import React from "react";
import { Box } from "@mui/material";
import InputForm from "./components/input-form";

const App: React.FC = () => {
  const handleSubmit = () => {};

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <InputForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default App;
