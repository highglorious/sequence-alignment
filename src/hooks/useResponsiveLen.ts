import React, { useEffect, useRef, useState } from "react";
import { getMaxLen } from "../utils/getMaxLen";

export const useResponsiveLen = <T extends HTMLElement>():[React.RefObject<T | null>, number] => {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateWidth = () => setWidth(element.offsetWidth);
    updateWidth();
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const len = getMaxLen(width);

  return [ref, len];
};
