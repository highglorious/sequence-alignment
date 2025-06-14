import { Alert, Box, Snackbar, type SnackbarCloseReason } from "@mui/material";
import { useState } from "react";
import { LS } from "../../utils/alignment";

type SequencePairProps = {
  topSequence: string;
  bottomSequence: string;
  topColorStops: string;
  bottomColorStops: string;
};

const SequencePair = ({
  topSequence,
  bottomSequence,
  topColorStops,
  bottomColorStops,
}: SequencePairProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleMouseUp = () => {
    const selected = window.getSelection()?.toString().trim();
    if (selected) {
      navigator.clipboard.writeText(selected).then(() => {
        setIsCopied(true);
        window.getSelection()?.removeAllRanges();
      });
    }
  };

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsCopied(false);
  };

  return (
    <>
      <Box
        onMouseUp={handleMouseUp}
        sx={{
          fontFamily: "monospace",
          fontSize: 18,
          userSelect: "text",
          // whiteSpace: "pre-wrap",
          // wordBreak: "break-word",
          mt: 10,
          backgroundColor: "pink",
        }}
      >
        <div
          style={{
            background: `linear-gradient(to right, ${topColorStops})`,
            letterSpacing: `${LS}ch`,
            textIndent: `${LS}ch`,
          }}
        >
          {topSequence}
        </div>
        <div
          style={{
            background: `linear-gradient(to right, ${bottomColorStops})`,
            letterSpacing: `${LS}ch`,
            textIndent: `${LS}ch`,
          }}
        >
          {bottomSequence}
        </div>
      </Box>
      <Snackbar open={isCopied} autoHideDuration={1000} onClose={handleClose}>
        <Alert severity="info" variant="filled" sx={{ width: "100%" }}>
          Скопировано
        </Alert>
      </Snackbar>
    </>
  );
};

export default SequencePair;
