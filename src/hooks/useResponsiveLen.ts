import { useMediaQuery, useTheme } from "@mui/material";
import { LS } from "../utils/alignment";

function getMaxLen(len: number) {
  return Math.ceil(len / (1 + LS));
}

export const useResponsiveLen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(460));
  const isXs = useMediaQuery(theme.breakpoints.between(460, "sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  // if (isMobile) return 14;
  // if (isXs) return 18;
  // if (isSm) return 26;
  // if (isMd) return 42;
  // if (isLg) return 58;

  if (isMobile) return getMaxLen(28);
  if (isXs) return getMaxLen(42);
  if (isSm) return getMaxLen(54);
  if (isMd) return getMaxLen(84);
  if (isLg) return getMaxLen(116);

  return 16;
};
