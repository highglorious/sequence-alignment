// adjust letter space in "ch" units
// LS = 0  (no space)
export const LS = 0;

//computed  shifts (do not manually modify)
export const CELL = 1 + LS;
export const OFFSET = LS / 2;

// bg color for none colored cells
export const BG_COLOR = "white";

const AMINO_COLORS: Record<string, string> = {
  C: "#FFEA00",
  A: "#67E4A6",
  I: "#67E4A6",
  L: "#67E4A6",
  M: "#67E4A6",
  F: "#67E4A6",
  W: "#67E4A6",
  Y: "#67E4A6",
  V: "#67E4A6",
  P: "#67E4A6",
  G: "#C4C4C4",
  D: "#FC9CAC",
  E: "#FC9CAC",
  K: "#BB99FF",
  R: "#BB99FF",
  S: "#80BFFF",
  T: "#80BFFF",
  H: "#80BFFF",
  Q: "#80BFFF",
  N: "#80BFFF",
  "-": BG_COLOR,
};

export function getColor(char: string) {
  return AMINO_COLORS[char.toUpperCase()] || BG_COLOR;
}

export function splitByLen(top: string, bottom: string, len: number) {
  const result = [];
  for (let i = 0; i < top.length; i += len) {
    result.push({
      topSequence: top.slice(i, i + len),
      bottomSequence: bottom.slice(i, i + len),
    });
  }
  return result;
}

export function createColorStops(top = "", bottom = "") {
  const create = (seq: string, i: number, diff = true) =>
    `${diff ? getColor(seq[i]) : BG_COLOR} ${i * CELL + OFFSET}ch ${
      (i + 1) * CELL + OFFSET
    }ch`;

  const start = `${BG_COLOR} 0 ${OFFSET}ch`;
  const end = `${BG_COLOR} ${top.length * CELL + OFFSET}ch ${
    top.length * CELL + LS
  }ch`;

  const topColorStops = [start];
  const bottomColorStops = [start];

  for (let i = 0; i < top.length; i++) {
    topColorStops.push(create(top, i));
    bottomColorStops.push(
      top[i] !== bottom[i] ? create(bottom, i) : create(bottom, i, false)
    );
  }

  topColorStops.push(end);
  bottomColorStops.push(end);

  return {
    topColorStops: topColorStops.join(", "),
    bottomColorStops: bottomColorStops.join(", "),
  };
}

export function createMultilineAlignment(
  top: string,
  bottom: string,
  len: number
): {
  topSequence: string;
  bottomSequence: string;
  topColorStops: string;
  bottomColorStops: string;
}[] {
  return splitByLen(top, bottom, len).map(({ topSequence, bottomSequence }) => {
    const { topColorStops, bottomColorStops } = createColorStops(
      topSequence,
      bottomSequence
    );
    return { topSequence, topColorStops, bottomSequence, bottomColorStops };
  });
}
